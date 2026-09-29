<?php

use App\Repositories\MenuRepository;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Gate;

if (! function_exists('filterKata')) {
    /**
     * Normalize URL path for permission naming: trim slashes and convert to lowercase.
     */
    function filterKata(?string $url): string
    {
        return trim((string) $url, '/');
    }
}

if (! function_exists('urlMenu')) {
    /**
     * Get flat array of menu URLs (clean without leading slash).
     *
     * @return array<int, string>
     */
    function urlMenu(): array
    {
        $urls = Cache::get('urlMenu');
        if (is_array($urls)) {
            return $urls;
        }

        $groupedMenus = menus();
        $menus = $groupedMenus instanceof Collection ? $groupedMenus->flatten(1) : collect($groupedMenus);

        $urls = [];
        foreach ($menus as $mm) {
            if (is_array($mm) && ! empty($mm['url'])) {
                $urls[] = filterKata($mm['url']);
            } elseif (is_object($mm) && ! empty($mm->url)) {
                $urls[] = filterKata($mm->url);
            }

            $subMenus = is_array($mm) ? ($mm['sub_menus'] ?? $mm['subMenus'] ?? []) : ($mm->subMenus ?? []);
            if (! empty($subMenus)) {
                foreach ($subMenus as $sm) {
                    if (is_array($sm) && ! empty($sm['url'])) {
                        $urls[] = filterKata($sm['url']);
                    } elseif (is_object($sm) && ! empty($sm->url)) {
                        $urls[] = filterKata($sm->url);
                    }
                }
            }
        }

        $uniqueUrls = array_values(array_unique($urls));
        Cache::forever('urlMenu', $uniqueUrls);

        return $uniqueUrls;
    }
}

if (! function_exists('clearMenuCache')) {
    /**
     * Clear cached menus and URL list.
     */
    function clearMenuCache(): void
    {
        Cache::forever('menu_cache_version', time());
        Cache::forget('menus');
        Cache::forget('menus_web');
        Cache::forget('urlMenu');
    }
}

if (! function_exists('menus')) {
    /**
     * Get active menus grouped by category, filtered by user gate permissions.
     */
    function menus(): Collection
    {
        $userId = auth()->id() ?? 'guest';
        $version = Cache::rememberForever('menu_cache_version', fn () => time());
        $key = "menus_raw_{$userId}_{$version}";

        $cached = Cache::get($key);
        if ($cached instanceof Collection) {
            return $cached;
        }

        // Jika cache rusak (__PHP_Incomplete_Class dari serialized session/driver sebelumnya)
        if ($cached !== null) {
            Cache::forget($key);
        }

        $menus = (new MenuRepository)->getMenus()->groupBy('category');

        // Filter by gate: "read {url}"
        $filtered = $menus->map(function ($menuGroup) {
            return collect($menuGroup)->filter(function ($item) {
                $permName = 'read '.filterKata($item->url);

                return Gate::allows($permName);
            });
        })->filter(function ($menuGroup) {
            return $menuGroup->isNotEmpty();
        });

        // Simpan sebagai Collection terverifikasi
        Cache::put($key, $filtered, now()->addHours(1));

        return $filtered;
    }
}

if (! function_exists('filteredMenus')) {
    /**
     * Get hierarchical filtered menus and submenus for the current user.
     */
    function filteredMenus(): Collection
    {
        $userId = auth()->id() ?? 'guest';
        $version = Cache::rememberForever('menu_cache_version', fn () => time());
        $cacheKey = "filtered_menus_{$userId}_{$version}";

        $cached = Cache::get($cacheKey);
        if ($cached instanceof Collection) {
            return $cached;
        }

        if ($cached !== null) {
            Cache::forget($cacheKey);
        }

        $allMenus = (new MenuRepository)->getMenus()->groupBy('category');
        $filtered = collect();

        foreach ($allMenus as $category => $items) {
            $allowedItems = collect($items)->filter(function ($menu) {
                $subMenus = collect($menu->subMenus)->filter(function ($sm) {
                    return Gate::allows('read '.filterKata($sm->url));
                })->values();

                $menu->setRelation('subMenus', $subMenus);

                return Gate::allows('read '.filterKata($menu->url)) || $subMenus->isNotEmpty();
            });

            if ($allowedItems->isNotEmpty()) {
                $filtered->put($category, $allowedItems);
            }
        }

        Cache::forever($cacheKey, $filtered);

        return $filtered;
    }
}
