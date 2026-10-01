import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PaginatedData, PageProps, UserData, UserMetrics, UserRole } from '@/types';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { useState, useTransition } from 'react';
import UserDetailModal from './UserDetailModal';
import UserFormModal from './UserFormModal';

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
    const safeFilters = (rawProps?.filters && !Array.isArray(rawProps.filters) && typeof rawProps.filters === 'object')
        ? rawProps.filters
        : {};

    const safeMetrics = {
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

    const safeUsers = {
        data: Array.isArray(rawProps?.users?.data) ? rawProps.users.data : [],
        current_page: rawProps?.users?.current_page ?? 1,
        first_page_url: rawProps?.users?.first_page_url ?? '',
        from: rawProps?.users?.from ?? 0,
        last_page: rawProps?.users?.last_page ?? 1,
        last_page_url: rawProps?.users?.last_page_url ?? '',
        links: Array.isArray(rawProps?.users?.links) ? rawProps.users.links : [],
        next_page_url: rawProps?.users?.next_page_url ?? null,
        path: rawProps?.users?.path ?? '',
        per_page: rawProps?.users?.per_page ?? 10,
        prev_page_url: rawProps?.users?.prev_page_url ?? null,
        to: rawProps?.users?.to ?? 0,
        total: rawProps?.users?.total ?? 0,
    };

    const safeRoles = Array.isArray(rawProps?.roles) ? rawProps.roles : [];
    const safeCan = {
        create: Boolean(rawProps?.can?.create),
        update: Boolean(rawProps?.can?.update),
        delete: Boolean(rawProps?.can?.delete),
    };

    const users = safeUsers;
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

    // Apply filters
    const applyFilters = (overrides: Record<string, string> = {}) => {
        const query = {
            search: search || undefined,
            role: selectedRole !== 'all' ? selectedRole : undefined,
            status: selectedStatus !== 'all' ? selectedStatus : undefined,
            sort: selectedSort !== 'latest' ? selectedSort : undefined,
            ...overrides,
        };

        router.get(route('pengguna.index'), query, {
            preserveState: true,
            preserveScroll: true,
            replace: true,
        });
    };

    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        applyFilters({ search });
    };

    const handleRoleTabClick = (roleKey: string) => {
        setSelectedRole(roleKey);
        applyFilters({ role: roleKey !== 'all' ? roleKey : '' });
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
                onSuccess: () => setSelectedIds([]),
            }
        );
    };

    const handleBulkDelete = () => {
        if (selectedIds.length === 0) return;
        if (confirm(`Yakin ingin menghapus ${selectedIds.length} pengguna terpilih?`)) {
            router.delete(route('pengguna.bulk-destroy'), {
                data: { ids: selectedIds },
                onSuccess: () => setSelectedIds([]),
            });
        }
    };

    const handleDeleteSingle = () => {
        if (!userToDelete) return;
        router.delete(route('pengguna.destroy', userToDelete.id), {
            onSuccess: () => setUserToDelete(null),
        });
    };

    const allSelected =
        users.data.length > 0 && selectedIds.length === users.data.length;

    return (
        <AuthenticatedLayout
            breadcrumbParent="ADMIN AREA"
            breadcrumbCurrent="MANAJEMEN PENGGUNA"
        >
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
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-1.5 text-xs uppercase tracking-wider text-outline font-semibold">
                            <span>Admin Area</span>
                            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
                            <span className="text-primary">Manajemen Pengguna</span>
                        </div>
                        <h1 className="font-heading text-2xl sm:text-3xl font-bold text-on-surface tracking-tight">
                            Daftar Pengguna &amp; Anggota
                        </h1>
                        <p className="text-sm text-on-surface-variant max-w-2xl">
                            Kelola akun pengguna, hak akses peran, verifikasi status email/WhatsApp, serta pantau anggota terdaftar secara terpusat.
                        </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap items-center gap-2.5 shrink-0">
                        {can.create && (
                            <button
                                type="button"
                                onClick={() => {
                                    setEditingUser(null);
                                    setIsFormOpen(true);
                                }}
                                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-primary text-on-primary text-sm font-semibold hover:bg-primary-container transition-all shadow-sm"
                            >
                                <span className="material-symbols-outlined text-[18px]">person_add</span>
                                <span>Tambah Pengguna Baru</span>
                            </button>
                        )}
                    </div>
                </div>

                {/* 2. Metric / Summary Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {/* Card 1: Total Pengguna */}
                    <div className="bg-surface-container-lowest p-5 rounded-2xl shadow-sm border border-surface-container flex flex-col justify-between hover:shadow-md transition-shadow">
                        <div className="flex items-start justify-between">
                            <div className="flex flex-col">
                                <span className="text-xs uppercase tracking-wider text-outline font-semibold">
                                    Total Pengguna
                                </span>
                                <span className="font-heading text-2xl font-bold text-on-surface mt-1">
                                    {metrics.total_users.toLocaleString('id-ID')}
                                </span>
                            </div>
                            <div className="w-10 h-10 rounded-xl bg-secondary-container/40 flex items-center justify-center text-primary">
                                <span className="material-symbols-outlined text-[22px]">group</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-1.5 mt-3 text-xs text-primary font-medium">
                            <span className="material-symbols-outlined text-[16px]">trending_up</span>
                            <span>Akun terdaftar di sistem</span>
                        </div>
                    </div>

                    {/* Card 2: Siswa / Member */}
                    <div className="bg-surface-container-lowest p-5 rounded-2xl shadow-sm border border-surface-container flex flex-col justify-between hover:shadow-md transition-shadow">
                        <div className="flex items-start justify-between">
                            <div className="flex flex-col">
                                <span className="text-xs uppercase tracking-wider text-outline font-semibold">
                                    Siswa Aktif
                                </span>
                                <span className="font-heading text-2xl font-bold text-on-surface mt-1">
                                    {metrics.active_students.toLocaleString('id-ID')}
                                </span>
                            </div>
                            <div className="w-10 h-10 rounded-xl bg-surface-container-high flex items-center justify-center text-tertiary">
                                <span className="material-symbols-outlined text-[22px]">school</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-1.5 mt-3 text-xs text-on-surface-variant font-medium">
                            <span className="w-2 h-2 rounded-full bg-primary shrink-0"></span>
                            <span>Status siswa aktif belajar</span>
                        </div>
                    </div>

                    {/* Card 3: Instruktur & Mentor */}
                    <div className="bg-surface-container-lowest p-5 rounded-2xl shadow-sm border border-surface-container flex flex-col justify-between hover:shadow-md transition-shadow">
                        <div className="flex items-start justify-between">
                            <div className="flex flex-col">
                                <span className="text-xs uppercase tracking-wider text-outline font-semibold">
                                    Instruktur &amp; Staf
                                </span>
                                <span className="font-heading text-2xl font-bold text-on-surface mt-1">
                                    {metrics.instructors_count.toLocaleString('id-ID')}
                                </span>
                            </div>
                            <div className="w-10 h-10 rounded-xl bg-surface-container-high flex items-center justify-center text-primary-container">
                                <span className="material-symbols-outlined text-[22px]">verified_user</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-1.5 mt-3 text-xs text-on-surface-variant font-medium">
                            <span className="text-on-surface font-semibold">
                                Pengajar, Admin &amp; Dev
                            </span>
                        </div>
                    </div>

                    {/* Card 4: Menunggu Verifikasi */}
                    <div className="bg-surface-container-lowest p-5 rounded-2xl shadow-sm border border-surface-container flex flex-col justify-between hover:shadow-md transition-shadow">
                        <div className="flex items-start justify-between">
                            <div className="flex flex-col">
                                <span className="text-xs uppercase tracking-wider text-outline font-semibold">
                                    Belum Terverifikasi
                                </span>
                                <span className="font-heading text-2xl font-bold text-on-surface mt-1">
                                    {metrics.unverified_count.toLocaleString('id-ID')}
                                </span>
                            </div>
                            <div className="w-10 h-10 rounded-xl bg-error-container/60 flex items-center justify-center text-error">
                                <span className="material-symbols-outlined text-[22px]">pending_actions</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-1.5 mt-3 text-xs text-error font-medium">
                            <span className="material-symbols-outlined text-[16px]">priority_high</span>
                            <span>Perlu verifikasi email</span>
                        </div>
                    </div>
                </div>

                {/* 3. Main Table Card */}
                <div className="bg-surface-container-lowest rounded-2xl shadow-sm border border-surface-container flex flex-col overflow-hidden">
                    {/* Role Tabs */}
                    <div className="flex items-center gap-2 px-6 pt-3 border-b border-surface-container bg-surface-container-lowest overflow-x-auto">
                        <button
                            type="button"
                            onClick={() => handleRoleTabClick('all')}
                            className={`role-tab relative py-3 px-3 text-xs font-semibold flex items-center gap-2 transition-colors whitespace-nowrap ${selectedRole === 'all'
                                    ? 'text-primary'
                                    : 'text-on-surface-variant hover:text-on-surface'
                                }`}
                        >
                            <span>Semua</span>
                            <span className="px-2 py-0.5 rounded-full bg-secondary-container/40 text-on-secondary-container text-[11px]">
                                {metrics.role_counts.all ?? metrics.total_users}
                            </span>
                            {selectedRole === 'all' && (
                                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"></span>
                            )}
                        </button>

                        <button
                            type="button"
                            onClick={() => handleRoleTabClick('student')}
                            className={`role-tab relative py-3 px-3 text-xs font-semibold flex items-center gap-2 transition-colors whitespace-nowrap ${selectedRole === 'student'
                                    ? 'text-primary'
                                    : 'text-on-surface-variant hover:text-on-surface'
                                }`}
                        >
                            <span>Member / Siswa</span>
                            <span className="px-2 py-0.5 rounded-full bg-surface-container-high text-on-surface-variant text-[11px]">
                                {metrics.role_counts.student ?? 0}
                            </span>
                            {selectedRole === 'student' && (
                                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"></span>
                            )}
                        </button>

                        <button
                            type="button"
                            onClick={() => handleRoleTabClick('instructor')}
                            className={`role-tab relative py-3 px-3 text-xs font-semibold flex items-center gap-2 transition-colors whitespace-nowrap ${selectedRole === 'instructor'
                                    ? 'text-primary'
                                    : 'text-on-surface-variant hover:text-on-surface'
                                }`}
                        >
                            <span>Instruktur &amp; Pengajar</span>
                            <span className="px-2 py-0.5 rounded-full bg-surface-container-high text-on-surface-variant text-[11px]">
                                {metrics.role_counts.instructor ?? 0}
                            </span>
                            {selectedRole === 'instructor' && (
                                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"></span>
                            )}
                        </button>

                        <button
                            type="button"
                            onClick={() => handleRoleTabClick('administrator')}
                            className={`role-tab relative py-3 px-3 text-xs font-semibold flex items-center gap-2 transition-colors whitespace-nowrap ${selectedRole === 'administrator'
                                    ? 'text-primary'
                                    : 'text-on-surface-variant hover:text-on-surface'
                                }`}
                        >
                            <span>Administrator</span>
                            <span className="px-2 py-0.5 rounded-full bg-surface-container-high text-on-surface-variant text-[11px]">
                                {metrics.role_counts.admin ?? 0}
                            </span>
                            {selectedRole === 'administrator' && (
                                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"></span>
                            )}
                        </button>

                        <button
                            type="button"
                            onClick={() => handleRoleTabClick('developer')}
                            className={`role-tab relative py-3 px-3 text-xs font-semibold flex items-center gap-2 transition-colors whitespace-nowrap ${selectedRole === 'developer'
                                    ? 'text-primary'
                                    : 'text-on-surface-variant hover:text-on-surface'
                                }`}
                        >
                            <span>Developer</span>
                            <span className="px-2 py-0.5 rounded-full bg-surface-container-high text-on-surface-variant text-[11px]">
                                {metrics.role_counts.developer ?? 0}
                            </span>
                            {selectedRole === 'developer' && (
                                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"></span>
                            )}
                        </button>
                    </div>

                    {/* Filter Controls Toolbar */}
                    <div className="p-4 sm:p-5 bg-surface-container-lowest flex flex-col lg:flex-row lg:items-center justify-between gap-3 border-b border-surface-container">
                        {/* Search Input */}
                        <form
                            onSubmit={handleSearchSubmit}
                            className="relative flex-1 max-w-md"
                        >
                            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[18px]">
                                search
                            </span>
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Cari nama, email, username, atau telepon..."
                                className="w-full pl-9 pr-4 py-2 rounded-lg bg-surface border border-surface-container-high text-sm text-on-surface placeholder:text-outline focus:outline-none focus:border-primary focus:bg-surface-container-lowest transition-all"
                            />
                        </form>

                        {/* Dropdown Filters */}
                        <div className="flex flex-wrap items-center gap-2">
                            {/* Status Filter */}
                            <div className="relative">
                                <select
                                    value={selectedStatus}
                                    onChange={(e) => {
                                        setSelectedStatus(e.target.value);
                                        applyFilters({ status: e.target.value });
                                    }}
                                    className="appearance-none bg-surface border border-surface-container-high pl-3 pr-8 py-2 rounded-lg text-xs font-medium text-on-surface focus:outline-none focus:border-primary cursor-pointer"
                                >
                                    <option value="all">Semua Status</option>
                                    <option value="active">Aktif</option>
                                    <option value="verified">Email Terverifikasi</option>
                                    <option value="unverified">Menunggu Verifikasi</option>
                                    <option value="suspended">Ditangguhkan</option>
                                </select>
                                <span className="material-symbols-outlined absolute right-2 top-1/2 -translate-y-1/2 text-outline text-[16px] pointer-events-none">
                                    expand_more
                                </span>
                            </div>

                            {/* Sort Filter */}
                            <div className="relative">
                                <select
                                    value={selectedSort}
                                    onChange={(e) => {
                                        setSelectedSort(e.target.value);
                                        applyFilters({ sort: e.target.value });
                                    }}
                                    className="appearance-none bg-surface border border-surface-container-high pl-3 pr-8 py-2 rounded-lg text-xs font-medium text-on-surface focus:outline-none focus:border-primary cursor-pointer"
                                >
                                    <option value="latest">Terbaru Mendaftar</option>
                                    <option value="oldest">Paling Lama</option>
                                    <option value="name_asc">Nama (A - Z)</option>
                                    <option value="name_desc">Nama (Z - A)</option>
                                </select>
                                <span className="material-symbols-outlined absolute right-2 top-1/2 -translate-y-1/2 text-outline text-[16px] pointer-events-none">
                                    sort
                                </span>
                            </div>

                            {/* Reset / Reload Button */}
                            <button
                                type="button"
                                onClick={() => {
                                    setSearch('');
                                    setSelectedRole('all');
                                    setSelectedStatus('all');
                                    setSelectedSort('latest');
                                    router.get(route('pengguna.index'));
                                }}
                                className="w-9 h-9 rounded-lg bg-surface border border-surface-container-high flex items-center justify-center text-outline hover:text-on-surface hover:bg-surface-container transition-colors"
                                title="Reset &amp; Muat Ulang"
                            >
                                <span className="material-symbols-outlined text-[18px]">refresh</span>
                            </button>
                        </div>
                    </div>

                    {/* Batch Selection Action Bar */}
                    {selectedIds.length > 0 && (
                        <div className="px-6 py-2.5 bg-secondary-container/20 border-b border-primary/20 flex flex-wrap items-center justify-between gap-3 text-xs">
                            <div className="flex items-center gap-2 text-on-surface font-medium">
                                <span className="material-symbols-outlined text-[18px] text-primary">
                                    check_circle
                                </span>
                                <span>
                                    <strong>{selectedIds.length}</strong> pengguna terpilih
                                </span>
                            </div>

                            <div className="flex items-center gap-2">
                                <button
                                    type="button"
                                    onClick={() => handleBulkStatus('active')}
                                    className="px-3 py-1.5 rounded-lg bg-surface-container-lowest hover:bg-surface-container text-on-surface font-medium transition-colors flex items-center gap-1 shadow-xs border border-surface-container"
                                >
                                    <span className="material-symbols-outlined text-[16px] text-primary">
                                        done_all
                                    </span>
                                    <span>Aktifkan</span>
                                </button>

                                <button
                                    type="button"
                                    onClick={() => handleBulkStatus('suspended')}
                                    className="px-3 py-1.5 rounded-lg bg-surface-container-lowest hover:bg-surface-container text-on-surface font-medium transition-colors flex items-center gap-1 shadow-xs border border-surface-container"
                                >
                                    <span className="material-symbols-outlined text-[16px] text-outline">
                                        block
                                    </span>
                                    <span>Tangguhkan</span>
                                </button>

                                {can.delete && (
                                    <button
                                        type="button"
                                        onClick={handleBulkDelete}
                                        className="px-3 py-1.5 rounded-lg bg-error-container/60 hover:bg-error-container text-on-error-container font-semibold transition-colors flex items-center gap-1 shadow-xs"
                                    >
                                        <span className="material-symbols-outlined text-[16px]">
                                            delete
                                        </span>
                                        <span>Hapus Masal</span>
                                    </button>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Data Table */}
                    <div className="overflow-x-auto w-full">
                        <table className="w-full text-left text-xs text-on-surface">
                            <thead className="bg-surface-container-low text-[11px] text-outline uppercase tracking-wider select-none border-b border-surface-container">
                                <tr>
                                    <th className="py-3 px-6 w-10">
                                        <input
                                            type="checkbox"
                                            checked={allSelected}
                                            onChange={handleSelectAll}
                                            className="rounded w-4 h-4 text-primary accent-primary cursor-pointer align-middle"
                                        />
                                    </th>
                                    <th className="py-3 px-3 font-semibold">Pengguna</th>
                                    <th className="py-3 px-3 font-semibold">Kontak</th>
                                    <th className="py-3 px-3 font-semibold">Role / Peran</th>
                                    <th className="py-3 px-3 font-semibold">Status Akun</th>
                                    <th className="py-3 px-3 font-semibold">Bergabung</th>
                                    <th className="py-3 px-6 text-right font-semibold">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-surface-container">
                                {users.data.length === 0 ? (
                                    <tr>
                                        <td colSpan={7} className="py-12 text-center text-outline">
                                            <div className="flex flex-col items-center justify-center gap-2">
                                                <span className="material-symbols-outlined text-[36px] text-outline">
                                                    group_off
                                                </span>
                                                <p className="text-sm font-medium">
                                                    Tidak ada data pengguna yang ditemukan.
                                                </p>
                                            </div>
                                        </td>
                                    </tr>
                                ) : (
                                    users.data.map((u) => {
                                        const isSelected = selectedIds.includes(u.id);

                                        return (
                                            <tr
                                                key={u.id}
                                                className={`transition-colors hover:bg-surface ${isSelected ? 'bg-secondary-container/15' : ''
                                                    }`}
                                            >
                                                <td className="py-3.5 px-6">
                                                    <input
                                                        type="checkbox"
                                                        checked={isSelected}
                                                        onChange={() => handleToggleSelect(u.id)}
                                                        className="rounded w-4 h-4 text-primary accent-primary cursor-pointer align-middle"
                                                    />
                                                </td>

                                                {/* User Info */}
                                                <td className="py-3.5 px-3">
                                                    <div className="flex items-center gap-3">
                                                        <img
                                                            src={u.avatar_url}
                                                            alt={u.name}
                                                            className="w-10 h-10 rounded-full object-cover shrink-0 shadow-xs border border-surface-container"
                                                        />
                                                        <div className="flex flex-col min-w-0">
                                                            <div className="flex items-center gap-1.5">
                                                                <span className="font-semibold text-on-surface truncate text-sm">
                                                                    {u.name}
                                                                </span>
                                                                {u.is_verified && (
                                                                    <span
                                                                        className="material-symbols-outlined text-[16px] text-tertiary"
                                                                        style={{ fontVariationSettings: "'FILL' 1" }}
                                                                        title="Email Terverifikasi"
                                                                    >
                                                                        verified
                                                                    </span>
                                                                )}
                                                            </div>
                                                            <span className="text-[11px] text-outline truncate">
                                                                @{u.username || 'user'}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </td>

                                                {/* Contact */}
                                                <td className="py-3.5 px-3">
                                                    <div className="flex flex-col">
                                                        <span className="text-on-surface font-medium truncate">
                                                            {u.email}
                                                        </span>
                                                        <span className="text-[11px] text-outline">
                                                            {u.phone || '-'}
                                                        </span>
                                                    </div>
                                                </td>

                                                {/* Role */}
                                                <td className="py-3.5 px-3">
                                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-surface-container-high text-on-tertiary-fixed-variant text-[11px] font-semibold capitalize">
                                                        {u.role?.name || u.role?.slug || 'Siswa / Member'}
                                                    </span>
                                                </td>

                                                {/* Status */}
                                                <td className="py-3.5 px-3">
                                                    <span
                                                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${u.status === 'active'
                                                                ? 'bg-secondary-container/40 text-on-secondary-container'
                                                                : u.status === 'suspended'
                                                                    ? 'bg-error-container/40 text-on-error-container'
                                                                    : 'bg-surface-container text-on-surface-variant'
                                                            }`}
                                                    >
                                                        <span
                                                            className={`w-1.5 h-1.5 rounded-full ${u.status === 'active'
                                                                    ? 'bg-primary'
                                                                    : u.status === 'suspended'
                                                                        ? 'bg-error'
                                                                        : 'bg-outline'
                                                                }`}
                                                        ></span>
                                                        <span className="capitalize">{u.status}</span>
                                                    </span>
                                                </td>

                                                {/* Join Date */}
                                                <td className="py-3.5 px-3 text-outline text-[11px]">
                                                    {u.created_at}
                                                </td>

                                                {/* Action Buttons */}
                                                <td className="py-3.5 px-6 text-right">
                                                    <div className="flex items-center justify-end gap-1">
                                                        {can.update && (
                                                            <button
                                                                type="button"
                                                                onClick={() => {
                                                                    setEditingUser(u);
                                                                    setIsFormOpen(true);
                                                                }}
                                                                className="w-8 h-8 rounded-lg flex items-center justify-center text-outline hover:text-primary hover:bg-surface-container transition-colors"
                                                                title="Ubah Data Akun"
                                                            >
                                                                <span className="material-symbols-outlined text-[18px]">
                                                                    edit
                                                                </span>
                                                            </button>
                                                        )}

                                                        <button
                                                            type="button"
                                                            onClick={() => setViewingUser(u)}
                                                            className="w-8 h-8 rounded-lg flex items-center justify-center text-outline hover:text-on-surface hover:bg-surface-container transition-colors"
                                                            title="Lihat Profil Lengkap"
                                                        >
                                                            <span className="material-symbols-outlined text-[18px]">
                                                                visibility
                                                            </span>
                                                        </button>

                                                        {can.delete && (
                                                            <button
                                                                type="button"
                                                                onClick={() => setUserToDelete(u)}
                                                                className="w-8 h-8 rounded-lg flex items-center justify-center text-outline hover:text-error hover:bg-surface-container transition-colors"
                                                                title="Hapus Pengguna"
                                                            >
                                                                <span className="material-symbols-outlined text-[18px]">
                                                                    delete
                                                                </span>
                                                            </button>
                                                        )}
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Table Footer & Pagination */}
                    <div className="p-4 sm:p-5 bg-surface-container-lowest border-t border-surface-container flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                        <div className="flex items-center gap-4">
                            <span className="text-on-surface-variant">
                                Menampilkan{' '}
                                <strong className="text-on-surface">{users.from || 0}</strong> -{' '}
                                <strong className="text-on-surface">{users.to || 0}</strong> dari{' '}
                                <strong className="text-on-surface">{users.total}</strong> pengguna
                            </span>

                            <div className="flex items-center gap-1.5 text-outline">
                                <span>Per halaman:</span>
                                <select
                                    value={users.per_page}
                                    onChange={(e) => {
                                        applyFilters({ per_page: e.target.value });
                                    }}
                                    className="bg-surface border border-surface-container-high rounded px-2 py-0.5 text-on-surface focus:outline-none cursor-pointer"
                                >
                                    <option value="10">10</option>
                                    <option value="25">25</option>
                                    <option value="50">50</option>
                                </select>
                            </div>
                        </div>

                        {/* Pagination Links */}
                        <div className="flex items-center gap-1">
                            {users.links.map((link, idx) => {
                                if (link.label.includes('Previous') || link.label.includes('&laquo;')) {
                                    return (
                                        <button
                                            key={idx}
                                            disabled={!link.url}
                                            onClick={() => link.url && router.visit(link.url)}
                                            className="px-2.5 py-1.5 rounded-lg bg-surface border border-surface-container-high text-outline disabled:opacity-40 disabled:cursor-not-allowed hover:bg-surface-container transition-colors flex items-center gap-1"
                                        >
                                            <span className="material-symbols-outlined text-[16px]">
                                                chevron_left
                                            </span>
                                            <span className="hidden sm:inline">Sebelumnya</span>
                                        </button>
                                    );
                                }

                                if (link.label.includes('Next') || link.label.includes('&raquo;')) {
                                    return (
                                        <button
                                            key={idx}
                                            disabled={!link.url}
                                            onClick={() => link.url && router.visit(link.url)}
                                            className="px-2.5 py-1.5 rounded-lg bg-surface border border-surface-container-high text-outline disabled:opacity-40 disabled:cursor-not-allowed hover:bg-surface-container transition-colors flex items-center gap-1"
                                        >
                                            <span className="hidden sm:inline">Selanjutnya</span>
                                            <span className="material-symbols-outlined text-[16px]">
                                                chevron_right
                                            </span>
                                        </button>
                                    );
                                }

                                return (
                                    <button
                                        key={idx}
                                        onClick={() => link.url && router.visit(link.url)}
                                        className={`w-8 h-8 rounded-lg text-xs font-semibold flex items-center justify-center transition-colors ${link.active
                                                ? 'bg-primary text-on-primary shadow-xs'
                                                : 'text-on-surface hover:bg-surface-container'
                                            }`}
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                    />
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* 4. Bottom Insights & Operational Highlights */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                    {/* Left Card: Recent User Activities */}
                    <div className="lg:col-span-7 bg-surface-container-lowest p-5 rounded-2xl shadow-sm border border-surface-container flex flex-col">
                        <div className="flex items-center justify-between pb-3 mb-3 border-b border-surface-container">
                            <div className="flex items-center gap-2">
                                <span className="material-symbols-outlined text-primary text-[20px]">
                                    history_edu
                                </span>
                                <h2 className="font-heading text-base font-bold text-on-surface">
                                    Aktivitas Pengguna Terkini
                                </h2>
                            </div>
                        </div>

                        <div className="flex flex-col gap-3">
                            <div className="flex items-start gap-3 p-2 rounded-xl hover:bg-surface transition-colors">
                                <div className="w-8 h-8 rounded-full bg-secondary-container/40 flex items-center justify-center text-primary shrink-0 mt-0.5">
                                    <span className="material-symbols-outlined text-[16px]">how_to_reg</span>
                                </div>
                                <div className="flex flex-col flex-1 min-w-0 text-xs">
                                    <p className="text-on-surface">
                                        <strong className="font-semibold text-on-surface">
                                            Pengguna Baru
                                        </strong>{' '}
                                        telah didaftarkan ke sistem dan role akses disinkronisasi.
                                    </p>
                                    <span className="text-[11px] text-outline mt-0.5">
                                        Baru saja • Jalur Admin Console
                                    </span>
                                </div>
                            </div>

                            <div className="flex items-start gap-3 p-2 rounded-xl hover:bg-surface transition-colors">
                                <div className="w-8 h-8 rounded-full bg-surface-container-high flex items-center justify-center text-tertiary shrink-0 mt-0.5">
                                    <span className="material-symbols-outlined text-[16px]">
                                        workspace_premium
                                    </span>
                                </div>
                                <div className="flex flex-col flex-1 min-w-0 text-xs">
                                    <p className="text-on-surface">
                                        <strong className="font-semibold text-on-surface">
                                            Sertifikasi &amp; Kelas
                                        </strong>{' '}
                                        siap diakses oleh seluruh pengguna dengan status akun aktif.
                                    </p>
                                    <span className="text-[11px] text-outline mt-0.5">
                                        Otomatisasi Belajar
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Card: Security & Privilege Distribution */}
                    <div className="lg:col-span-5 bg-surface-container-lowest p-5 rounded-2xl shadow-sm border border-surface-container flex flex-col justify-between">
                        <div>
                            <div className="flex items-center justify-between pb-3 mb-3 border-b border-surface-container">
                                <div className="flex items-center gap-2">
                                    <span className="material-symbols-outlined text-primary text-[20px]">
                                        security
                                    </span>
                                    <h2 className="font-heading text-base font-bold text-on-surface">
                                        Distribusi Hak &amp; Keamanan
                                    </h2>
                                </div>
                                <span className="px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed text-[11px] font-semibold">
                                    Tersinkronisasi
                                </span>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <div className="flex justify-between text-xs mb-1.5">
                                        <span className="text-on-surface-variant font-medium">
                                            Email Terverifikasi
                                        </span>
                                        <span className="font-semibold text-on-surface">
                                            {metrics.total_users > 0
                                                ? Math.round(
                                                    ((metrics.total_users - metrics.unverified_count) /
                                                        metrics.total_users) *
                                                    100
                                                )
                                                : 100}
                                            %
                                        </span>
                                    </div>
                                    <div className="h-2 w-full rounded-full bg-surface-container-high overflow-hidden">
                                        <div
                                            className="h-full bg-primary rounded-full transition-all duration-500"
                                            style={{
                                                width: `${metrics.total_users > 0
                                                        ? ((metrics.total_users - metrics.unverified_count) /
                                                            metrics.total_users) *
                                                        100
                                                        : 100
                                                    }%`,
                                            }}
                                        ></div>
                                    </div>
                                </div>

                                <div>
                                    <div className="flex justify-between text-xs mb-1.5">
                                        <span className="text-on-surface-variant font-medium">
                                            Tingkat Keaktifan Pengguna
                                        </span>
                                        <span className="font-semibold text-on-surface">
                                            {metrics.total_users > 0
                                                ? Math.round(
                                                    (metrics.active_students / metrics.total_users) * 100
                                                )
                                                : 100}
                                            %
                                        </span>
                                    </div>
                                    <div className="h-2 w-full rounded-full bg-surface-container-high overflow-hidden">
                                        <div
                                            className="h-full bg-tertiary rounded-full transition-all duration-500"
                                            style={{
                                                width: `${metrics.total_users > 0
                                                        ? (metrics.active_students / metrics.total_users) * 100
                                                        : 100
                                                    }%`,
                                            }}
                                        ></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Quick Action Alert Box */}
                        <div className="mt-4 p-3 rounded-xl bg-surface-container-low border border-surface-container flex items-center justify-between gap-2">
                            <div className="flex items-center gap-2 min-w-0">
                                <span className="material-symbols-outlined text-primary text-[20px] shrink-0">
                                    admin_panel_settings
                                </span>
                                <span className="text-xs text-on-surface truncate">
                                    Atur izin role granular di modul <strong>Role &amp; Permission</strong>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
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
            {userToDelete && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div
                        className="fixed inset-0 bg-black/40 backdrop-blur-xs"
                        onClick={() => setUserToDelete(null)}
                    />
                    <div className="relative w-full max-w-md bg-surface-container-lowest rounded-2xl shadow-xl border border-surface-container p-6 z-10">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="h-10 w-10 rounded-xl bg-error-container/40 text-error flex items-center justify-center">
                                <span className="material-symbols-outlined text-[22px]">warning</span>
                            </div>
                            <div>
                                <h3 className="font-heading text-lg font-bold text-on-surface">
                                    Hapus Pengguna?
                                </h3>
                                <p className="text-xs text-on-surface-variant">
                                    Tindakan ini tidak dapat dibatalkan.
                                </p>
                            </div>
                        </div>

                        <p className="text-sm text-on-surface-variant mb-6">
                            Apakah Anda yakin ingin menghapus akun{' '}
                            <strong className="text-on-surface">{userToDelete.name}</strong> ({userToDelete.email})?
                        </p>

                        <div className="flex items-center justify-end gap-3">
                            <button
                                type="button"
                                onClick={() => setUserToDelete(null)}
                                className="px-4 py-2 text-xs font-semibold rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface transition-colors"
                            >
                                Batal
                            </button>
                            <button
                                type="button"
                                onClick={handleDeleteSingle}
                                className="px-5 py-2 text-xs font-semibold rounded-lg bg-error hover:bg-error/90 text-on-error transition-all shadow-sm"
                            >
                                Ya, Hapus
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </AuthenticatedLayout>
    );
}
