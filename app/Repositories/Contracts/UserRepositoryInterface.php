<?php

namespace App\Repositories\Contracts;

use App\Models\User;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

interface UserRepositoryInterface
{
    /**
     * Get paginated users with optional search, role filter, status filter, and sorting.
     *
     * @param  array<string, mixed>  $filters
     */
    public function getPaginatedUsers(array $filters = [], int $perPage = 10): LengthAwarePaginator;

    /**
     * Get summary metrics for user statistics.
     *
     * @return array<string, mixed>
     */
    public function getUserMetrics(): array;

    /**
     * Find a user by ID.
     */
    public function findById(string $id): ?User;

    /**
     * Create a new user.
     *
     * @param  array<string, mixed>  $data
     */
    public function create(array $data): User;

    /**
     * Update an existing user.
     *
     * @param  array<string, mixed>  $data
     */
    public function update(User $user, array $data): bool;

    /**
     * Delete a user.
     */
    public function delete(User $user): bool;

    /**
     * Bulk update status for multiple users.
     *
     * @param  array<int, string>  $ids
     */
    public function bulkUpdateStatus(array $ids, string $status): int;

    /**
     * Bulk delete multiple users.
     *
     * @param  array<int, string>  $ids
     */
    public function bulkDelete(array $ids): int;
}
