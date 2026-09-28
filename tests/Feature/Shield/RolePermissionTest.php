<?php

use App\Models\Shield\Permission;
use App\Models\Shield\Role;
use App\Models\User;

test('roles and permissions can be created with ulids and custom attributes', function () {
    $role = Role::create([
        'name' => 'admin',
        'slug' => 'admin',
        'keterangan' => 'Administrator platform',
        'guard_name' => 'web',
        'is_active' => true,
    ]);

    expect($role->id)->toBeString()
        ->and(strlen($role->id))->toBe(26)
        ->and($role->slug)->toBe('admin')
        ->and($role->keterangan)->toBe('Administrator platform')
        ->and($role->is_active)->toBeTrue();

    $permission = Permission::create([
        'name' => 'users.view',
        'guard_name' => 'web',
        'is_active' => true,
    ]);

    expect($permission->id)->toBeString()
        ->and(strlen($permission->id))->toBe(26)
        ->and($permission->is_active)->toBeTrue();

    $role->givePermissionTo($permission);
    expect($role->hasPermissionTo('users.view'))->toBeTrue();

    $user = User::factory()->create();
    expect($user->id)->toBeString()
        ->and(strlen($user->id))->toBe(26);

    $user->assignRole($role);
    expect($user->hasRole('admin'))->toBeTrue()
        ->and($user->hasPermissionTo('users.view'))->toBeTrue();
});
