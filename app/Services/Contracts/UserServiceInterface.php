<?php

namespace App\Services\Contracts;

use App\Models\User;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

interface UserServiceInterface
{
    /**
     * Get paginated user listing with business metric stats.
     *
     * @param  array<string, mixed>  $filters
     * @return array{users: LengthAwarePaginator, metrics: array<string, mixed>}
     */
    public function getListWithMetrics(array $filters = [], int $perPage = 10): array;

    /**
     * Register a new user.
     *
     * @param  array<string, mixed>  $data
     */
    public function createUser(array $data): User;

    /**
     * Update user details.
     *
     * @param  array<string, mixed>  $data
     */
    public function updateUser(User $user, array $data): bool;

    /**
     * Delete user account.
     */
    public function deleteUser(User $user): bool;

    /**
     * Toggle or set status for multiple users.
     *
     * @param  array<int, string>  $ids
     */
    public function bulkSetStatus(array $ids, string $status): int;

    /**
     * Bulk delete users.
     *
     * @param  array<int, string>  $ids
     */
    public function bulkDeleteUsers(array $ids): int;
}
