<?php

namespace App\Policies;

use App\Models\Menu;
use App\Models\User;

class MenuPolicy
{
    /**
     * Perform pre-authorization checks: developer bypasses everything.
     */
    public function before(User $user, string $ability): ?bool
    {
        if ($user->hasRole('dev') || $user->hasRole('developer') || $user->hasRole('superadmin')) {
            return true;
        }

        return null;
    }

    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        return $user->can('read manajemen-menu');
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, ?Menu $model = null): bool
    {
        return $user->can('read manajemen-menu');
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        return $user->can('create manajemen-menu');
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, ?Menu $model = null): bool
    {
        return $user->can('update manajemen-menu');
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, ?Menu $model = null): bool
    {
        return $user->can('delete manajemen-menu');
    }
}
