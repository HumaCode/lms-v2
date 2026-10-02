import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PaginatedData, PageProps, UserData, UserMetrics, UserRole } from '@/types';
import { Head, router, usePage } from '@inertiajs/react';
import { FormEvent, useEffect, useState } from 'react';
import UserDetailModal from './UserDetailModal';
import UserFormModal from './UserFormModal';
import UserBatchActionBar from './partials/UserBatchActionBar';
import UserDeleteModal from './partials/UserDeleteModal';
import UserFilterToolbar from './partials/UserFilterToolbar';
import UserHeader from './partials/UserHeader';
import UserInsightCards from './partials/UserInsightCards';
import UserMetricCards from './partials/UserMetricCards';
import UserPagination from './partials/UserPagination';
import UserRoleTabs from './partials/UserRoleTabs';
import UserTable from './partials/UserTable';

interface Props {
    users: PaginatedData<UserData>;
    metrics: UserMetrics;
    filters: {
        search?: string;
        role?: string;
        status?: string;
        sort?: string;
    };
    roles: UserRole[];
    can: {
        create: boolean;
        update: boolean;
        delete: boolean;
    };
}

export default function PenggunaIndex(rawProps: Props) {
    // Defensively sanitize props passed from Laravel/Inertia
    const safeFilters =
        rawProps?.filters && !Array.isArray(rawProps.filters) && typeof rawProps.filters === 'object'
            ? rawProps.filters
            : {};

    const safeMetrics: UserMetrics = {
        total_users: rawProps?.metrics?.total_users ?? 0,
        active_students: rawProps?.metrics?.active_students ?? 0,
        instructors_count: rawProps?.metrics?.instructors_count ?? 0,
        unverified_count: rawProps?.metrics?.unverified_count ?? 0,
        role_counts: {
            all: rawProps?.metrics?.role_counts?.all ?? 0,
            student: rawProps?.metrics?.role_counts?.student ?? 0,
            instructor: rawProps?.metrics?.role_counts?.instructor ?? 0,
            admin: rawProps?.metrics?.role_counts?.admin ?? 0,
            developer: rawProps?.metrics?.role_counts?.developer ?? 0,
            ...(rawProps?.metrics?.role_counts || {}),
        },
    };

    const rawUsers = rawProps?.users;
    const userMeta = rawUsers?.meta;
    const safeUsers = {
        data: Array.isArray(rawUsers?.data) ? rawUsers.data : [],
        current_page: userMeta?.current_page ?? rawUsers?.current_page ?? 1,
        first_page_url: rawUsers?.first_page_url ?? '',
        from: userMeta?.from ?? rawUsers?.from ?? 0,
        last_page: userMeta?.last_page ?? rawUsers?.last_page ?? 1,
        last_page_url: rawUsers?.last_page_url ?? '',
        links: Array.isArray(userMeta?.links)
            ? userMeta.links
            : Array.isArray(rawUsers?.links)
            ? rawUsers.links
            : [],
        next_page_url: null,
        path: userMeta?.path ?? rawUsers?.path ?? '',
        per_page: userMeta?.per_page ?? rawUsers?.per_page ?? 10,
        prev_page_url: null,
        to: userMeta?.to ?? rawUsers?.to ?? 0,
        total: userMeta?.total ?? rawUsers?.total ?? 0,
    };

    const safeRoles = Array.isArray(rawProps?.roles) ? rawProps.roles : [];
    const safeCan = {
        create: Boolean(rawProps?.can?.create),
        update: Boolean(rawProps?.can?.update),
        delete: Boolean(rawProps?.can?.delete),
    };

    const [users, setUsers] = useState(safeUsers);
    const [isLoading, setIsLoading] = useState(false);

    // Keep users state in sync if Inertia reloads page props
    useEffect(() => {
        setUsers(safeUsers);
    }, [rawProps?.users]);

    const metrics = safeMetrics;
    const roles = safeRoles;
    const can = safeCan;

    const page = usePage<PageProps>();
    const flash = page.props?.flash;

    // Filter states
    const [search, setSearch] = useState(safeFilters?.search || '');
    const [selectedRole, setSelectedRole] = useState(safeFilters?.role || 'all');
    const [selectedStatus, setSelectedStatus] = useState(safeFilters?.status || 'all');
    const [selectedSort, setSelectedSort] = useState(safeFilters?.sort || 'latest');

    // Selection state for batch actions
    const [selectedIds, setSelectedIds] = useState<string[]>([]);

    // Modals
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingUser, setEditingUser] = useState<UserData | null>(null);
    const [viewingUser, setViewingUser] = useState<UserData | null>(null);
    const [userToDelete, setUserToDelete] = useState<UserData | null>(null);

    // Apply filters & pagination via AJAX without changing browser URL
    const applyFilters = async (overrides: Record<string, string> = {}) => {
        setIsLoading(true);

        const currentParams = {
            search: search || '',
            role: selectedRole !== 'all' ? selectedRole : '',
            status: selectedStatus !== 'all' ? selectedStatus : '',
            sort: selectedSort !== 'latest' ? selectedSort : '',
            per_page: String(users.per_page || 10),
            page: String(users.current_page || 1),
            ...overrides,
        };

        const params = new URLSearchParams();
        if (currentParams.search) params.append('search', currentParams.search);
        if (currentParams.role) params.append('role', currentParams.role);
        if (currentParams.status) params.append('status', currentParams.status);
        if (currentParams.sort) params.append('sort', currentParams.sort);
        if (currentParams.per_page) params.append('per_page', currentParams.per_page);
        if (currentParams.page) params.append('page', currentParams.page);

        try {
            const url = `${route('pengguna.allPagination')}?${params.toString()}`;
            const res = await fetch(url, {
                headers: {
                    Accept: 'application/json',
                    'X-Requested-With': 'XMLHttpRequest',
                },
            });
            const result = await res.json();

            if (result && result.success && result.data) {
                const responseData = result.data;
                const meta = responseData.meta || {};
                setUsers({
                    data: Array.isArray(responseData.data) ? responseData.data : [],
                    current_page: meta.current_page ?? 1,
                    first_page_url: meta.path ? `${meta.path}?page=1` : '',
                    from: meta.from ?? 0,
                    last_page: meta.last_page ?? 1,
                    last_page_url: meta.path ? `${meta.path}?page=${meta.last_page ?? 1}` : '',
                    links: Array.isArray(meta.links) ? meta.links : [],
                    next_page_url: null,
                    path: meta.path ?? '',
                    per_page: meta.per_page ?? 10,
                    prev_page_url: null,
                    to: meta.to ?? 0,
                    total: meta.total ?? 0,
                });
                setSelectedIds([]);
            }
        } catch (err) {
            console.error('Failed to fetch paginated users:', err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSearchSubmit = (e: FormEvent) => {
        e.preventDefault();
        applyFilters({ search, page: '1' });
    };

    const handleRoleTabClick = (roleKey: string) => {
        setSelectedRole(roleKey);
        applyFilters({ role: roleKey !== 'all' ? roleKey : '', page: '1' });
    };

    // Selection handlers
    const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.checked) {
            setSelectedIds(users.data.map((u) => u.id));
        } else {
            setSelectedIds([]);
        }
    };

    const handleToggleSelect = (id: string) => {
        setSelectedIds((prev) =>
            prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
        );
    };

    // Bulk actions
    const handleBulkStatus = (status: string) => {
        if (selectedIds.length === 0) return;
        router.post(
            route('pengguna.bulk-status'),
            { ids: selectedIds, status },
            {
                onSuccess: () => {
                    setSelectedIds([]);
                    applyFilters();
                },
            }
        );
    };

    const handleBulkDelete = () => {
        if (selectedIds.length === 0) return;
        if (confirm(`Yakin ingin menghapus ${selectedIds.length} pengguna terpilih?`)) {
            router.delete(route('pengguna.bulk-destroy'), {
                data: { ids: selectedIds },
                onSuccess: () => {
                    setSelectedIds([]);
                    applyFilters();
                },
            });
        }
    };

    const handleDeleteSingle = () => {
        if (!userToDelete) return;
        router.delete(route('pengguna.destroy', userToDelete.id), {
            onSuccess: () => {
                setUserToDelete(null);
                applyFilters();
            },
        });
    };

    const allSelected = users.data.length > 0 && selectedIds.length === users.data.length;

    return (
        <AuthenticatedLayout breadcrumbParent="ADMIN AREA" breadcrumbCurrent="MANAJEMEN PENGGUNA">
            <Head title="Manajemen Pengguna - Admin Console" />

            <div className="flex flex-col w-full pb-8 space-y-6">
                {/* Flash Success / Error Toast */}
                {flash?.success && (
                    <div className="flex items-center gap-2.5 p-4 rounded-xl bg-secondary-container/40 text-on-secondary-container border border-primary/20 text-sm font-medium shadow-xs">
                        <span className="material-symbols-outlined text-primary text-[20px]">
                            check_circle
                        </span>
                        <span>{flash.success}</span>
                    </div>
                )}

                {/* 1. Header & Actions Row */}
                <UserHeader
                    canCreate={can.create}
                    onAddUser={() => {
                        setEditingUser(null);
                        setIsFormOpen(true);
                    }}
                />

                {/* 2. Metric / Summary Cards */}
                <UserMetricCards metrics={metrics} />

                {/* 3. Main Table Card */}
                <div className="bg-surface-container-lowest rounded-2xl shadow-xs border border-surface-container flex flex-col overflow-hidden">
                    {/* Role Tabs */}
                    <UserRoleTabs
                        selectedRole={selectedRole}
                        onSelectRole={handleRoleTabClick}
                        counts={{
                            all: metrics.role_counts.all ?? metrics.total_users,
                            student: metrics.role_counts.student ?? 0,
                            instructor: metrics.role_counts.instructor ?? 0,
                            administrator: metrics.role_counts.admin ?? 0,
                            developer: metrics.role_counts.developer ?? 0,
                        }}
                    />

                    {/* Filter Controls Toolbar */}
                    <UserFilterToolbar
                        search={search}
                        onSearchChange={(val) => {
                            setSearch(val);
                            if (val === '') {
                                applyFilters({ search: '', page: '1' });
                            }
                        }}
                        onSearchSubmit={handleSearchSubmit}
                        selectedStatus={selectedStatus}
                        onStatusChange={(status) => {
                            setSelectedStatus(status);
                            applyFilters({ status, page: '1' });
                        }}
                        selectedSort={selectedSort}
                        onSortChange={(sort) => {
                            setSelectedSort(sort);
                            applyFilters({ sort, page: '1' });
                        }}
                        onReset={() => {
                            setSearch('');
                            setSelectedRole('all');
                            setSelectedStatus('all');
                            setSelectedSort('latest');
                            applyFilters({
                                search: '',
                                role: '',
                                status: '',
                                sort: '',
                                page: '1',
                            });
                        }}
                        isLoading={isLoading}
                    />

                    {/* Batch Selection Action Bar */}
                    <UserBatchActionBar
                        selectedCount={selectedIds.length}
                        canDelete={can.delete}
                        onBulkStatus={handleBulkStatus}
                        onBulkDelete={handleBulkDelete}
                    />

                    {/* User Data Table Component */}
                    <UserTable
                        users={users.data}
                        selectedIds={selectedIds}
                        onToggleSelect={handleToggleSelect}
                        onSelectAll={handleSelectAll}
                        allSelected={allSelected}
                        isLoading={isLoading}
                        can={{
                            update: can.update,
                            delete: can.delete,
                        }}
                        onEdit={(u) => {
                            setEditingUser(u);
                            setIsFormOpen(true);
                        }}
                        onView={(u) => setViewingUser(u)}
                        onDelete={(u) => setUserToDelete(u)}
                    />

                    {/* Table Footer & Pagination */}
                    <UserPagination
                        from={users.from || 0}
                        to={users.to || 0}
                        total={users.total || 0}
                        currentPage={users.current_page || 1}
                        lastPage={users.last_page || 1}
                        perPage={users.per_page || 10}
                        onPageChange={(pageNum) => applyFilters({ page: String(pageNum) })}
                        onPerPageChange={(perPageVal) =>
                            applyFilters({ per_page: String(perPageVal), page: '1' })
                        }
                    />
                </div>

                {/* 4. Bottom Insights & Operational Highlights */}
                <UserInsightCards metrics={metrics} />
            </div>

            {/* Modals */}
            <UserFormModal
                show={isFormOpen}
                onClose={() => {
                    setIsFormOpen(false);
                    setEditingUser(null);
                }}
                user={editingUser}
                roles={roles}
            />

            <UserDetailModal
                show={!!viewingUser}
                onClose={() => setViewingUser(null)}
                user={viewingUser}
            />

            {/* Delete Confirmation Modal */}
            <UserDeleteModal
                user={userToDelete}
                onClose={() => setUserToDelete(null)}
                onConfirm={handleDeleteSingle}
            />
        </AuthenticatedLayout>
    );
}
