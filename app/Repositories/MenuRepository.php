<?php

namespace App\Repositories;

use App\Models\Menu;
use Illuminate\Database\Eloquent\Collection;

class MenuRepository
{
    /**
     * Get active main menus with their active subMenus.
     *
     * @return Collection<int, Menu>
     */
    public function getMenus(): Collection
    {
        return Menu::query()
            ->whereNull('main_menu_id')
            ->where('active', true)
            ->with(['subMenus' => function ($query) {
                $query->where('active', true)->orderBy('orders');
            }])
            ->orderBy('orders')
            ->get();
    }
}
