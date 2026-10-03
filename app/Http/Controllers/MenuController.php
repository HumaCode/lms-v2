<?php

namespace App\Http\Controllers;

use App\Helpers\ResponseHelper;
use App\Http\Requests\StoreMenuRequest;
use App\Http\Requests\UpdateMenuRequest;
use App\Http\Resources\MenuResource;
use App\Models\Menu;
use App\Models\Shield\Role;
use App\Services\Contracts\MenuServiceInterface;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;
use Inertia\Response;

class MenuController extends Controller
{
    public function __construct(
        protected MenuServiceInterface $menuService
    ) {}

    /**
     * Display a listing of menus in JSON format.
     */
    public function getAllPaginated(Request $request): JsonResponse
    {
        Gate::authorize('viewAny', Menu::class);

        try {
            $category = $request->input('category');
            $search = $request->input('search');

            $result = $this->menuService->getMenuData($category, $search);

            return ResponseHelper::jsonResponse(
                true,
                'Data menu berhasil dimuat.',
                [
                    'menus' => MenuResource::collection($result['items']),
                    'metrics' => $result['metrics'],
                ],
                200
            );
        } catch (\Throwable $e) {
            return ResponseHelper::jsonResponse(
                false,
                'Terjadi kesalahan pada server.',
                null,
                500
            );
        }
    }

    /**
     * Display the menu management page.
     */
    public function index(Request $request): Response
    {
        Gate::authorize('viewAny', Menu::class);

        $filters = $request->only(['search', 'category']);
        $category = $filters['category'] ?? 'all';
        $search = $filters['search'] ?? null;

        $result = $this->menuService->getMenuData($category, $search);
        $roles = Role::select(['id', 'name', 'slug'])->get();

        return Inertia::render('Admin/Menu/Index', [
            'menuItems' => MenuResource::collection($result['items'])->resolve(),
            'metrics' => $result['metrics'],
            'categories' => $result['categories'],
            'parentMenus' => MenuResource::collection($result['parentMenus'])->resolve(),
            'filters' => (object) $filters,
            'roles' => $roles,
            'can' => [
                'create' => (bool) $request->user()?->can('create', Menu::class),
                'delete' => (bool) $request->user()?->can('delete', Menu::class),
                'update' => (bool) $request->user()?->can('update', Menu::class),
            ],
        ]);
    }

    /**
     * Store a newly created menu in storage.
     */
    public function store(StoreMenuRequest $request): RedirectResponse
    {
        $this->menuService->createMenu($request->validated());

        return back()->with('success', 'Menu berhasil ditambahkan.');
    }

    /**
     * Update the specified menu in storage.
     */
    public function update(UpdateMenuRequest $request, Menu $menu): RedirectResponse
    {
        $this->menuService->updateMenu($menu, $request->validated());

        return back()->with('success', 'Data menu berhasil diperbarui.');
    }

    /**
     * Remove the specified menu from storage.
     */
    public function destroy(Menu $menu): RedirectResponse
    {
        Gate::authorize('delete', $menu);

        $this->menuService->deleteMenu($menu);

        return back()->with('success', 'Menu berhasil dihapus.');
    }

    /**
     * Reorder menu hierarchy and sort orders.
     */
    public function reorder(Request $request): RedirectResponse
    {
        Gate::authorize('update', Menu::class);

        $validated = $request->validate([
            'items' => ['required', 'array'],
            'items.*.id' => ['required', 'string', 'exists:menus,id'],
            'items.*.orders' => ['required', 'integer'],
            'items.*.main_menu_id' => ['nullable', 'string'],
        ]);

        $this->menuService->reorderMenus($validated['items']);

        return back()->with('success', 'Urutan menu berhasil disimpan.');
    }

    /**
     * Toggle the active state of a menu.
     */
    public function toggle(Menu $menu): RedirectResponse
    {
        Gate::authorize('update', $menu);

        $this->menuService->toggleActive($menu);

        return back()->with('success', 'Status menu berhasil diperbarui.');
    }

    /**
     * Purge navigation cache and sync CDN.
     */
    public function purgeCache(Request $request): RedirectResponse
    {
        Gate::authorize('update', Menu::class);

        $this->menuService->purgeCache();

        return back()->with('success', 'Cache navigasi Edge & CDN berhasil dibersihkan.');
    }
}
