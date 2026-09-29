<?php

namespace App\Traits;

use App\Models\Menu;
use App\Models\Shield\Permission;
use App\Models\Shield\Role;

trait HasMenuPermission
{
    /**
     * Attach CRUD permissions to a menu and optionally assign them to roles by slug.
     *
     * @param  array<int, string>|null  $permissions
     * @param  array<int, string|Role>|null  $roles Array of role slugs or Role instances
     */
    public function attachMenupermission(Menu $menu, ?array $permissions = null, ?array $roles = null): void
    {
        if (! is_array($permissions) || empty($permissions)) {
            $permissions = ['create', 'read', 'update', 'delete'];
        }

        // Clean leading slash for uniform permission naming: e.g. "read settings/users"
        $cleanUrl = ltrim($menu->url, '/');

        // Resolve roles by slug or instance
        $resolvedRoles = null;
        if (! empty($roles)) {
            $slugs = [];
            $roleModels = [];

            foreach ($roles as $role) {
                if ($role instanceof Role) {
                    $roleModels[] = $role;
                } elseif (is_string($role)) {
                    $slugs[] = $role;
                }
            }

            if (! empty($slugs)) {
                $foundRoles = Role::whereIn('slug', $slugs)
                    ->orWhereIn('name', $slugs)
                    ->get();
                $resolvedRoles = $foundRoles->merge($roleModels);
            } else {
                $resolvedRoles = collect($roleModels);
            }
        }

        foreach ($permissions as $item) {
            $permissionName = trim($item.' '.$cleanUrl);
            $permission = Permission::firstOrCreate([
                'name' => $permissionName,
                'guard_name' => 'web',
            ]);

            if (! $permission->menus()->where('menu_id', $menu->id)->exists()) {
                $permission->menus()->attach($menu->id);
            }

            if ($resolvedRoles && $resolvedRoles->isNotEmpty()) {
                $permission->assignRole($resolvedRoles);
            }
        }
    }
}
