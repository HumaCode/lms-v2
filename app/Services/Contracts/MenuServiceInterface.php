<?php

namespace App\Services\Contracts;

use App\Models\Menu;
use Illuminate\Database\Eloquent\Collection;

interface MenuServiceInterface
{
    /**
     * Get hierarchical list of menus, optionally filtered by category and search.
     *
     * @return array{items: Collection, metrics: array, categories: array, parentMenus: Collection}
     */
    public function getMenuData(?string $category = null, ?string $search = null): array;

    /**
     * Create a new menu.
     */
    public function createMenu(array $data): Menu;

    /**
     * Update an existing menu.
     */
    public function updateMenu(Menu $menu, array $data): Menu;

    /**
     * Delete a menu and its submenus.
     */
    public function deleteMenu(Menu $menu): bool;

    /**
     * Reorder menus and update parent-child relationships.
     *
     * @param array<int, array{id: string, orders: int, main_menu_id?: string|null}> $items
     */
    public function reorderMenus(array $items): void;

    /**
     * Toggle active state of a menu.
     */
    public function toggleActive(Menu $menu): Menu;

    /**
     * Purge navigation cache for edge & application.
     */
    public function purgeCache(): void;

    /**
     * Get menu metrics and counts for tabs.
     */
    public function getMetrics(): array;
}
