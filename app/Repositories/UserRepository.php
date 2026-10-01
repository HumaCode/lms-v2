<?php

namespace App\Repositories;

use App\Models\Shield\Role;
use App\Models\User;
use App\Repositories\Contracts\UserRepositoryInterface;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class UserRepository implements UserRepositoryInterface
{
    /**
     * Get paginated users with filters and eager-loaded roles.
     */
    public function getPaginatedUsers(array $filters = [], int $perPage = 10): LengthAwarePaginator
    {
        $query = User::query()
            ->with(['roles', 'media']);

        // 1. Search by name, email, or username
        if (! empty($filters['search'])) {
            $search = trim($filters['search']);
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                    ->orWhere('email', 'like', "%{$search}%")
                    ->orWhere('username', 'like', "%{$search}%")
                    ->orWhere('phone', 'like', "%{$search}%");
            });
        }

        // 2. Filter by role
        if (! empty($filters['role']) && $filters['role'] !== 'all') {
            $roleSlug = $filters['role'];
            $query->whereHas('roles', function ($q) use ($roleSlug) {
                $q->where('slug', $roleSlug)
                    ->orWhere('name', $roleSlug);
            });
        }

        // 3. Filter by status
        if (! empty($filters['status']) && $filters['status'] !== 'all') {
            $status = $filters['status'];
            if ($status === 'unverified') {
                $query->whereNull('email_verified_at');
            } elseif ($status === 'verified') {
                $query->whereNotNull('email_verified_at');
            } else {
                $query->where('status', $status);
            }
        }

        // 4. Sorting
        $sort = $filters['sort'] ?? 'latest';
        match ($sort) {
            'name_asc' => $query->orderBy('name', 'asc'),
            'name_desc' => $query->orderBy('name', 'desc'),
            'oldest' => $query->orderBy('created_at', 'asc'),
            default => $query->orderBy('created_at', 'desc'),
        };

        return $query->paginate($perPage)->withQueryString();
    }

    /**
     * Get statistical counts and metrics for the dashboard header.
     */
    public function getUserMetrics(): array
    {
        $totalUsers = User::count();
        $activeStudents = User::role('user')->where('status', 'active')->count();
        $instructorsCount = User::role(['instructor', 'dev', 'admin'])->count();
        $unverifiedCount = User::whereNull('email_verified_at')->count();

        // Role counts for tab pills
        $roleCounts = [
            'all' => $totalUsers,
            'student' => User::role('user')->count(),
            'instructor' => User::role('instructor')->count(),
            'admin' => User::role('admin')->count(),
            'developer' => User::role('dev')->count(),
        ];

        return [
            'total_users' => $totalUsers,
            'active_students' => $activeStudents,
            'instructors_count' => $instructorsCount,
            'unverified_count' => $unverifiedCount,
            'role_counts' => $roleCounts,
        ];
    }

    public function findById(string $id): ?User
    {
        return User::with(['roles', 'media'])->find($id);
    }

    public function create(array $data): User
    {
        $role = $data['role'] ?? null;
        unset($data['role']);

        $user = User::create($data);

        if ($role) {
            $user->assignRole($role);
        }

        return $user;
    }

    public function update(User $user, array $data): bool
    {
        if (isset($data['role'])) {
            $user->syncRoles([$data['role']]);
            unset($data['role']);
        }

        return $user->update($data);
    }

    public function delete(User $user): bool
    {
        return (bool) $user->delete();
    }

    public function bulkUpdateStatus(array $ids, string $status): int
    {
        return User::whereIn('id', $ids)->update(['status' => $status]);
    }

    public function bulkDelete(array $ids): int
    {
        return User::whereIn('id', $ids)->delete();
    }
}
