<?php

namespace App\Http\Controllers;

use App\Helpers\ResponseHelper;
use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Http\Resources\PaginateResource;
use App\Http\Resources\UserResource;
use App\Models\Shield\Role;
use App\Models\User;
use App\Services\Contracts\UserServiceInterface;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;
use Inertia\Response;

class UserController extends Controller
{
    public function __construct(
        protected UserServiceInterface $userService
    ) {}

    /**
     * Display a paginated listing of users in JSON format.
     */
    public function getAllPaginated(Request $request): JsonResponse
    {
        Gate::authorize('viewAny', User::class);

        try {
            $filters = $request->only(['search', 'role', 'status', 'sort']);
            $perPage = (int) $request->input('per_page', 10);
            if (! in_array($perPage, [10, 25, 50, 100], true)) {
                $perPage = 10;
            }

            $result = $this->userService->getListWithMetrics($filters, $perPage);

            return ResponseHelper::jsonResponse(
                true,
                'Data pengguna berhasil dimuat.',
                [
                    'users' => new PaginateResource($result['users'], UserResource::class),
                    'metrics' => $result['metrics'],
                ],
                200
            );
        } catch (\Throwable $e) {
            return ResponseHelper::jsonResponse(
                false,
                'Terjadi kesalahan pada server.',
                null,
                500
            );
        }
    }

    /**
     * Display a listing of the users.
     */
    public function index(Request $request): Response
    {
        Gate::authorize('viewAny', User::class);

        $filters = $request->only(['search', 'role', 'status', 'sort']);
        $perPage = (int) $request->input('per_page', 10);
        if (! in_array($perPage, [10, 25, 50, 100], true)) {
            $perPage = 10;
        }

        $result = $this->userService->getListWithMetrics($filters, $perPage);

        $roles = Role::select(['id', 'name', 'slug'])->get();

        return Inertia::render('Admin/Pengguna/Index', [
            'users' => new PaginateResource($result['users'], UserResource::class),
            'metrics' => $result['metrics'],
            'filters' => (object) $filters,
            'roles' => $roles,
            'can' => [
                'create' => $request->user()->can('create', User::class),
                'delete' => $request->user()->can('delete', User::class),
                'update' => $request->user()->can('update', User::class),
            ],
        ]);
    }

    /**
     * Store a newly created user in storage.
     */
    public function store(StoreUserRequest $request): RedirectResponse
    {
        $this->userService->createUser($request->validated());

        return back()->with('success', 'Pengguna berhasil ditambahkan.');
    }

    /**
     * Update the specified user in storage.
     */
    public function update(UpdateUserRequest $request, User $pengguna): RedirectResponse
    {
        $this->userService->updateUser($pengguna, $request->validated());

        return back()->with('success', 'Data pengguna berhasil diperbarui.');
    }

    /**
     * Display or stream user avatar from private storage.
     */
    public function avatar(User $pengguna)
    {
        $media = $pengguna->getFirstMedia('avatar');

        if (! $media || ! file_exists($media->getPath())) {
            return redirect('https://ui-avatars.com/api/?name='.urlencode($pengguna->name).'&color=7F9CF5&background=EBF4FF');
        }

        return response()->file($media->getPath(), [
            'Content-Type' => $media->mime_type ?? 'image/webp',
            'Cache-Control' => 'no-cache, private, must-revalidate',
        ]);
    }

    /**
     * Remove the specified user from storage.
     */
    public function destroy(User $pengguna): RedirectResponse
    {
        Gate::authorize('delete', $pengguna);

        $this->userService->deleteUser($pengguna);

        return back()->with('success', 'Pengguna berhasil dihapus.');
    }

    /**
     * Bulk update status for multiple users.
     */
    public function bulkStatus(Request $request): RedirectResponse
    {
        Gate::authorize('update', User::class);

        $validated = $request->validate([
            'ids' => ['required', 'array'],
            'ids.*' => ['required', 'string', 'exists:users,id'],
            'status' => ['required', 'string', 'in:active,inactive,suspended'],
        ]);

        $this->userService->bulkSetStatus($validated['ids'], $validated['status']);

        return back()->with('success', count($validated['ids']).' status pengguna berhasil diperbarui.');
    }

    /**
     * Bulk delete multiple users.
     */
    public function bulkDestroy(Request $request): RedirectResponse
    {
        Gate::authorize('delete', User::class);

        $validated = $request->validate([
            'ids' => ['required', 'array'],
            'ids.*' => ['required', 'string', 'exists:users,id'],
        ]);

        $this->userService->bulkDeleteUsers($validated['ids']);

        return back()->with('success', count($validated['ids']).' pengguna berhasil dihapus.');
    }
}

