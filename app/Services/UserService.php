<?php

namespace App\Services;

use App\Models\User;
use App\Repositories\Contracts\UserRepositoryInterface;
use App\Services\Contracts\UserServiceInterface;
use App\Traits\fileUploadTrait;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UserService implements UserServiceInterface
{
    use fileUploadTrait;

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
            $avatar = $data['avatar'] ?? null;
            unset($data['avatar']);

            if (! empty($data['password'])) {
                $data['password'] = Hash::make($data['password']);
            } else {
                $data['password'] = Hash::make('password123');
            }

            if (! empty($data['email_verified']) && $data['email_verified'] === true) {
                $data['email_verified_at'] = now();
            }

            unset($data['email_verified']);

            $user = $this->userRepository->create($data);

            if ($avatar instanceof \Illuminate\Http\UploadedFile) {
                $this->fileUpload($user, $avatar, 'avatar', '5120');
            }

            return $user;
        });
    }

    public function updateUser(User $user, array $data): bool
    {
        return DB::transaction(function () use ($user, $data) {
            $avatar = $data['avatar'] ?? null;
            unset($data['avatar']);

            if (! empty($data['password'])) {
                $data['password'] = Hash::make($data['password']);
            } else {
                unset($data['password']);
            }

            if (isset($data['email_verified'])) {
                $data['email_verified_at'] = $data['email_verified'] ? now() : null;
                unset($data['email_verified']);
            }

            $updated = $this->userRepository->update($user, $data);

            if ($avatar instanceof \Illuminate\Http\UploadedFile) {
                $this->fileUpload($user, $avatar, 'avatar', '5120');
            }

            return $updated;
        });
    }

    public function deleteUser(User $user): bool
    {
        // Cek apakah ada avatar, jika ada maka unlink gambarnya dari filesystem
        $this->removeMedia($user, 'avatar');

        return $this->userRepository->delete($user);
    }

    public function bulkSetStatus(array $ids, string $status): int
    {
        return $this->userRepository->bulkUpdateStatus($ids, $status);
    }

    public function bulkDeleteUsers(array $ids): int
    {
        $users = User::whereIn('id', $ids)->get();
        foreach ($users as $user) {
            // Cek apakah ada avatar, jika ada maka unlink gambarnya dari filesystem
            $this->removeMedia($user, 'avatar');
        }

        return $this->userRepository->bulkDelete($ids);
    }
}
