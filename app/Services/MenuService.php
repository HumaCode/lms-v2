<?php

namespace App\Services;

use App\Models\Menu;
use App\Services\Contracts\MenuServiceInterface;
use App\Traits\HasMenuPermission;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;

class MenuService implements MenuServiceInterface
{
    use HasMenuPermission;

    /**
     * Category mappings between UI tabs and database category values.
     */
    protected array $categoryMap = [
        'all' => 'ALL',
        'topbar' => 'TOPBAR UTAMA',
        'sidebar_member' => 'MAIN MENU',
        'sidebar_admin' => 'ADMINISTRASI',
        'footer' => 'FOOTER LINK',
    ];

    /**
     * Get hierarchical list of menus, optionally filtered by category and search.
     */
    public function getMenuData(?string $category = null, ?string $search = null): array
    {
        $normalizedCategory = null;
        if ($category && strtolower($category) !== 'all') {
            $normalizedCategory = $this->categoryMap[$category] ?? $category;
        }

        $query = Menu::query()
            ->whereNull('main_menu_id')
            ->with([
                'permissions',
                'subMenus' => function ($subQuery) use ($search) {
                    $subQuery->with('permissions');
                    if ($search) {
                        $subQuery->where(function ($q) use ($search) {
                            $q->where('name', 'like', "%{$search}%")
                                ->orWhere('url', 'like', "%{$search}%")
                                ->orWhere('description', 'like', "%{$search}%");
                        });
                    }
                    $subQuery->orderBy('orders');
                },
            ])
            ->orderBy('orders');

        if ($normalizedCategory) {
            $query->where('category', $normalizedCategory);
        }

        if ($search) {
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                    ->orWhere('url', 'like', "%{$search}%")
                    ->orWhere('description', 'like', "%{$search}%")
                    ->orWhereHas('subMenus', function ($sq) use ($search) {
                        $sq->where('name', 'like', "%{$search}%")
                            ->orWhere('url', 'like', "%{$search}%")
                            ->orWhere('description', 'like', "%{$search}%");
                    });
            });
        }

        $items = $query->get();

        // Retrieve available parent candidates for the form select
        $parentMenus = Menu::query()
            ->whereNull('main_menu_id')
            ->orderBy('orders')
            ->select(['id', 'name', 'category', 'url', 'type'])
            ->get();

        $metrics = $this->getMetrics();

        $dbCategories = Menu::whereNotNull('category')
            ->distinct()
            ->orderBy('category')
            ->pluck('category')
            ->values()
            ->toArray();

        return [
            'items' => $items,
            'metrics' => $metrics,
            'categories' => $dbCategories,
            'parentMenus' => $parentMenus,
        ];
    }

    /**
     * Create a new menu.
     */
    public function createMenu(array $data): Menu
    {
        return DB::transaction(function () use ($data) {
            if (isset($data['category']) && isset($this->categoryMap[$data['category']])) {
                $data['category'] = $this->categoryMap[$data['category']];
            }

            if (! isset($data['orders'])) {
                $maxOrder = Menu::where('main_menu_id', $data['main_menu_id'] ?? null)->max('orders') ?? 0;
                $data['orders'] = $maxOrder + 1;
            }

            $permissions = $data['permissions'] ?? ['menu', 'read', 'create', 'update', 'delete'];
            $roles = $data['roles'] ?? ['administrator', 'developer'];

            $menu = Menu::create(Arr::except($data, ['permissions']));

            $this->syncMenuPermissions($menu, $permissions, $roles);

            $this->purgeCache();

            return $menu;
        });
    }

    /**
     * Update an existing menu.
     */
    public function updateMenu(Menu $menu, array $data): Menu
    {
        return DB::transaction(function () use ($menu, $data) {
            if (isset($data['category']) && isset($this->categoryMap[$data['category']])) {
                $data['category'] = $this->categoryMap[$data['category']];
            }

            // Prevent assigning self or children as parent
            if (isset($data['main_menu_id']) && $data['main_menu_id'] === $menu->id) {
                $data['main_menu_id'] = null;
            }

            $permissions = $data['permissions'] ?? null;
            $roles = $data['roles'] ?? null;

            $menu->update(Arr::except($data, ['permissions']));

            if ($permissions !== null || $roles !== null || isset($data['url'])) {
                $this->syncMenuPermissions($menu, $permissions, $roles);
            }

            $this->purgeCache();

            return $menu;
        });
    }

    /**
     * Delete a menu, its submenus, and all associated Spatie permissions.
     */
    public function deleteMenu(Menu $menu): bool
    {
        return DB::transaction(function () use ($menu) {
            // Eager load all submenus and permissions
            $menu->loadMissing(['subMenus.permissions', 'permissions']);

            // Gather all menus (parent and all submenus)
            $allMenus = collect([$menu])->merge($menu->subMenus);
            $menuIds = $allMenus->pluck('id')->toArray();

            foreach ($allMenus as $m) {
                // Get attached permissions
                $attachedPermissions = $m->permissions()->get();

                // Also find permissions matching clean URL pattern (e.g. "create {$m->url}")
                $cleanUrl = ltrim(trim($m->url), '/');
                if (! empty($cleanUrl)) {
                    $urlPerms = \App\Models\Shield\Permission::where('name', 'like', "% {$cleanUrl}")
                        ->orWhere('name', $cleanUrl)
                        ->get();
                    $attachedPermissions = $attachedPermissions->merge($urlPerms)->unique('id');
                }

                foreach ($attachedPermissions as $permission) {
                    // Check if permission is linked to any other menu outside this deletion set
                    $otherMenusCount = $permission->menus()
                        ->whereNotIn('menu_id', $menuIds)
                        ->count();

                    if ($otherMenusCount === 0) {
                        $permission->delete();
                    }
                }
            }

            // Delete submenus
            $menu->subMenus()->delete();

            // Delete the menu
            $deleted = $menu->delete();

            $this->purgeCache();

            return (bool) $deleted;
        });
    }

    /**
     * Reorder menus and update parent-child relationships.
     */
    public function reorderMenus(array $items): void
    {
        DB::transaction(function () use ($items) {
            foreach ($items as $index => $item) {
                if (isset($item['id'])) {
                    Menu::where('id', $item['id'])->update([
                        'orders' => $item['orders'] ?? ($index + 1),
                        'main_menu_id' => $item['main_menu_id'] ?? null,
                    ]);
                }
            }

            $this->purgeCache();
        });
    }

    /**
     * Toggle active state of a menu.
     */
    public function toggleActive(Menu $menu): Menu
    {
        $menu->update(['active' => ! $menu->active]);

        $this->purgeCache();

        return $menu;
    }

    /**
     * Purge navigation cache for edge & application.
     */
    public function purgeCache(): void
    {
        if (function_exists('clearMenuCache')) {
            clearMenuCache();
        } elseif (function_exists('clearCacheMenus')) {
            clearCacheMenus();
        }

        Cache::put('menu_cache_version', time(), now()->addDays(30));
        Cache::put('menu_last_purged_at', now()->toIso8601String(), now()->addDays(30));
        Cache::put('menu_last_purged_by', auth()->user()?->name ?? 'System', now()->addDays(30));
    }

    /**
     * Get menu metrics and counts for tabs.
     */
    public function getMetrics(): array
    {
        $allCount = Menu::whereNull('main_menu_id')->count();
        $totalCount = Menu::count();
        $activeTotal = Menu::where('active', true)->count();

        $categoryCounts = Menu::select('category', DB::raw('count(*) as count'))
            ->whereNull('main_menu_id')
            ->whereNotNull('category')
            ->groupBy('category')
            ->pluck('count', 'category')
            ->toArray();

        return [
            'all' => $allCount,
            'topbar' => $categoryCounts['TOPBAR UTAMA'] ?? 0,
            'sidebar_member' => $categoryCounts['MAIN MENU'] ?? 0,
            'sidebar_admin' => $categoryCounts['ADMINISTRASI'] ?? 0,
            'footer' => $categoryCounts['FOOTER LINK'] ?? 0,
            'total' => $totalCount,
            'active_total' => $activeTotal,
            'category_counts' => $categoryCounts,
            'last_purged_at' => Cache::get('menu_last_purged_at', now()->toIso8601String()),
            'last_purged_by' => Cache::get('menu_last_purged_by', 'Humaidi Zakaria (Superadmin)'),
        ];
    }
}
