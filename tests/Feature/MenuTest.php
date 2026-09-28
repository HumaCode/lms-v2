<?php

use App\Models\Menu;

test('menu can be created with ulid and self-referencing hierarchy', function () {
    $parent = Menu::create([
        'name' => 'Pengaturan',
        'url' => '/settings',
        'category' => 'System',
        'icon' => 'settings',
        'active' => true,
        'orders' => 1,
    ]);

    expect($parent->id)->toBeString()
        ->and(strlen($parent->id))->toBe(26)
        ->and($parent->name)->toBe('Pengaturan')
        ->and($parent->active)->toBeTrue();

    $child = Menu::create([
        'name' => 'Kelola Role',
        'url' => '/settings/roles',
        'category' => 'System',
        'icon' => 'shield',
        'active' => true,
        'orders' => 1,
        'main_menu_id' => $parent->id,
    ]);

    expect($child->id)->toBeString()
        ->and(strlen($child->id))->toBe(26)
        ->and($child->main_menu_id)->toBe($parent->id)
        ->and($child->parent->name)->toBe('Pengaturan')
        ->and($parent->subMenus->first()->id)->toBe($child->id);
});
