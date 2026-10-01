<?php

namespace App\Services;

use App\Models\User;
use App\Repositories\Contracts\UserRepositoryInterface;
use App\Services\Contracts\UserServiceInterface;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UserService implements UserServiceInterface
{
    public function __construct(
        protected UserRepositoryInterface $userRepository
    ) {}

    public function getListWithMetrics(array $filters = [], int $perPage = 10): array
    {
        $users = $this->userRepository->getPaginatedUsers($filters, $perPage);
        $metrics = $this->userRepository->getUserMetrics();

        return [
            'users' => $users,
            'metrics' => $metrics,
        ];
    }

    public function createUser(array $data): User
    {
        return DB::transaction(function () use ($data) {
            if (! empty($data['password'])) {
                $data['password'] = Hash::make($data['password']);
            } else {
                $data['password'] = Hash::make('password123');
            }

            if (! empty($data['email_verified']) && $data['email_verified'] === true) {
                $data['email_verified_at'] = now();
            }

            unset($data['email_verified']);

            return $this->userRepository->create($data);
        });
    }

    public function updateUser(User $user, array $data): bool
    {
        return DB::transaction(function () use ($user, $data) {
            if (! empty($data['password'])) {
                $data['password'] = Hash::make($data['password']);
            } else {
                unset($data['password']);
            }

            if (isset($data['email_verified'])) {
                $data['email_verified_at'] = $data['email_verified'] ? now() : null;
                unset($data['email_verified']);
            }

            return $this->userRepository->update($user, $data);
        });
    }

    public function deleteUser(User $user): bool
    {
        return $this->userRepository->delete($user);
    }

    public function bulkSetStatus(array $ids, string $status): int
    {
        return $this->userRepository->bulkUpdateStatus($ids, $status);
    }

    public function bulkDeleteUsers(array $ids): int
    {
        return $this->userRepository->bulkDelete($ids);
    }
}
