<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Http\Resources\UserResource;
use App\Models\Shield\Role;
use App\Models\User;
use App\Services\Contracts\UserServiceInterface;
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
            'users' => UserResource::collection($result['users']),
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

