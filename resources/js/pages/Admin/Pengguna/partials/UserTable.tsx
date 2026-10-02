import Tooltip from '@/components/Tooltip';
import { UserData } from '@/types';
import { ChangeEvent } from 'react';

interface UserTableProps {
    users: UserData[];
    selectedIds: string[];
    onToggleSelect: (id: string) => void;
    onSelectAll: (e: ChangeEvent<HTMLInputElement>) => void;
    allSelected: boolean;
    isLoading: boolean;
    can: {
        update: boolean;
        delete: boolean;
    };
    onEdit: (user: UserData) => void;
    onView: (user: UserData) => void;
    onDelete: (user: UserData) => void;
}

export default function UserTable({
    users,
    selectedIds,
    onToggleSelect,
    onSelectAll,
    allSelected,
    isLoading,
    can,
    onEdit,
    onView,
    onDelete,
}: UserTableProps) {
    return (
        <div className="overflow-x-auto w-full relative">
            {isLoading && (
                <div className="absolute inset-0 bg-surface/50 backdrop-blur-[1px] flex items-center justify-center z-10">
                    <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-surface-container-lowest shadow-md border border-surface-container text-xs font-semibold text-primary">
                        <span className="material-symbols-outlined text-[18px] animate-spin">
                            progress_activity
                        </span>
                        <span>Memuat data...</span>
                    </div>
                </div>
            )}

            <table className="w-full text-left text-xs text-on-surface">
                <thead className="bg-surface-container-low text-[11px] text-outline uppercase tracking-wider select-none border-b border-surface-container">
                    <tr>
                        <th className="py-3 px-6 w-10">
                            <input
                                type="checkbox"
                                checked={allSelected}
                                onChange={onSelectAll}
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
                    {users.length === 0 ? (
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
                        users.map((u) => {
                            const isSelected = selectedIds.includes(u.id);
                            const isSuspended = u.status === 'suspended';

                            return (
                                <tr
                                    key={u.id}
                                    className={`transition-colors ${
                                        isSelected
                                            ? isSuspended
                                                ? 'bg-slate-200/80 hover:bg-slate-200'
                                                : 'bg-secondary-container/20 hover:bg-secondary-container/30'
                                            : isSuspended
                                            ? 'bg-slate-100/90 hover:bg-slate-200/70'
                                            : 'hover:bg-surface'
                                    }`}
                                >
                                    <td className="py-3.5 px-6">
                                        <input
                                            type="checkbox"
                                            checked={isSelected}
                                            onChange={() => onToggleSelect(u.id)}
                                            className="rounded w-4 h-4 text-primary accent-primary cursor-pointer align-middle"
                                        />
                                    </td>

                                    {/* User Info */}
                                    <td className="py-3.5 px-3">
                                        <div className="flex items-center gap-3">
                                            <img
                                                key={u.avatar_url}
                                                src={u.avatar_url}
                                                alt={u.name}
                                                className={`w-10 h-10 rounded-full object-cover shrink-0 shadow-2xs border border-surface-container ${
                                                    isSuspended ? 'opacity-85' : ''
                                                }`}
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
                                                <span className="text-outline text-xs truncate">
                                                    @{u.username}
                                                </span>
                                            </div>
                                        </div>
                                    </td>

                                    {/* Contact */}
                                    <td className="py-3.5 px-3">
                                        <div className="flex flex-col text-xs space-y-0.5">
                                            <span className="text-on-surface truncate max-w-[180px]">
                                                {u.email}
                                            </span>
                                            <span className="text-outline text-[11px]">
                                                {u.phone || 'Belum diisi'}
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
                                            className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${
                                                u.status === 'active'
                                                    ? 'bg-secondary-container/40 text-on-secondary-container'
                                                    : u.status === 'suspended'
                                                    ? 'bg-rose-50 text-rose-700 border border-rose-200/80 shadow-2xs'
                                                    : 'bg-surface-container text-on-surface-variant'
                                            }`}
                                        >
                                            <span
                                                className={`w-1.5 h-1.5 rounded-full ${
                                                    u.status === 'active'
                                                        ? 'bg-primary'
                                                        : u.status === 'suspended'
                                                        ? 'bg-rose-600'
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
                                        <div className="flex items-center justify-end gap-1.5">
                                            {/* 1. Detail / View Profile */}
                                            <Tooltip content="Lihat Profil Lengkap" variant="blue" position="top">
                                                <button
                                                    type="button"
                                                    onClick={() => onView(u)}
                                                    className="w-8 h-8 rounded-lg flex items-center justify-center bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white border border-blue-200 transition-all duration-200 cursor-pointer shadow-2xs"
                                                    aria-label="Lihat Profil Lengkap"
                                                >
                                                    <span className="material-symbols-outlined text-[17px]">
                                                        visibility
                                                    </span>
                                                </button>
                                            </Tooltip>

                                            {/* 2. Edit User */}
                                            {can.update && (
                                                <Tooltip content="Ubah Data Akun" variant="emerald" position="top">
                                                    <button
                                                        type="button"
                                                        onClick={() => onEdit(u)}
                                                        className="w-8 h-8 rounded-lg flex items-center justify-center bg-emerald-50 text-emerald-600 hover:bg-emerald-600 hover:text-white border border-emerald-200 transition-all duration-200 cursor-pointer shadow-2xs"
                                                        aria-label="Ubah Data Akun"
                                                    >
                                                        <span className="material-symbols-outlined text-[17px]">
                                                            edit
                                                        </span>
                                                    </button>
                                                </Tooltip>
                                            )}

                                            {/* 3. Delete User */}
                                            {can.delete && (
                                                <Tooltip content="Hapus Pengguna" variant="rose" position="top" align="right">
                                                    <button
                                                        type="button"
                                                        onClick={() => onDelete(u)}
                                                        className="w-8 h-8 rounded-lg flex items-center justify-center bg-rose-50 text-rose-600 hover:bg-rose-600 hover:text-white border border-rose-200 transition-all duration-200 cursor-pointer shadow-2xs"
                                                        aria-label="Hapus Pengguna"
                                                    >
                                                        <span className="material-symbols-outlined text-[17px]">
                                                            delete
                                                        </span>
                                                    </button>
                                                </Tooltip>
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
    );
}
