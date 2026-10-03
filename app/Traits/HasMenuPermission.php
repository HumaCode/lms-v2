<?php

namespace App\Traits;

use App\Models\Menu;
use App\Models\Shield\Permission;
use App\Models\Shield\Role;

trait HasMenuPermission
{
    /**
     * Abilities mapped from standard controller CRUD and HasPermission trait.
     */
    protected array $defaultAbilities = [
        'menu',
        'read',
        'create',
        'update',
        'delete',
    ];

    /**
     * Attach or sync CRUD permissions for a menu and optionally assign them to roles.
     *
     * @param  array<int, string>|null  $permissions Array of abilities (e.g. ['read','create']) or full names (e.g. ['read pengguna'])
     * @param  array<int, string|Role>|null  $roles Array of role slugs/names or Role instances
     */
    public function syncMenuPermissions(Menu $menu, ?array $permissions = null, ?array $roles = null): void
    {
        if (empty($menu->url)) {
            return;
        }

        if (! is_array($permissions) || empty($permissions)) {
            $permissions = ['menu', 'read', 'create', 'update', 'delete'];
        }

        $cleanUrl = ltrim(trim($menu->url), '/');
        if (empty($cleanUrl)) {
            return;
        }

        // Resolve roles if provided
        $resolvedRoles = null;
        if (! empty($roles)) {
            $slugs = [];
            $roleModels = [];

            foreach ($roles as $role) {
                if ($role instanceof Role) {
                    $roleModels[] = $role;
                } elseif (is_string($role) && ! empty($role)) {
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

        $permissionIds = [];

        foreach ($permissions as $permission) {
            $permission = trim($permission);
            if (empty($permission)) {
                continue;
            }

            // Generate name: e.g. "create {$menu->url}"
            $permissionName = str_contains($permission, ' ')
                ? $permission
                : "{$permission} {$cleanUrl}";

            $permModel = Permission::firstOrCreate([
                'name' => $permissionName,
                'guard_name' => 'web',
            ]);

            $permissionIds[] = $permModel->id;

            if ($resolvedRoles && $resolvedRoles->isNotEmpty()) {
                $permModel->assignRole($resolvedRoles);
            }
        }

        // Sync with menu_permission pivot table
        $menu->permissions()->sync($permissionIds);
    }

    /**
     * Backward compatibility wrapper for attachMenupermission.
     *
     * @param  array<int, string>|null  $permissions
     * @param  array<int, string|Role>|null  $roles
     */
    public function attachMenupermission(Menu $menu, ?array $permissions = null, ?array $roles = null): void
    {
        $this->syncMenuPermissions($menu, $permissions, $roles);
    }
}

