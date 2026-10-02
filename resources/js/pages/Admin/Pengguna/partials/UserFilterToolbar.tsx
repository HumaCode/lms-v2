import { FormEvent } from 'react';

interface UserFilterToolbarProps {
    search: string;
    onSearchChange: (value: string) => void;
    onSearchSubmit: (e: FormEvent) => void;
    selectedStatus: string;
    onStatusChange: (status: string) => void;
    selectedSort: string;
    onSortChange: (sort: string) => void;
    onReset: () => void;
    isLoading: boolean;
}

export default function UserFilterToolbar({
    search,
    onSearchChange,
    onSearchSubmit,
    selectedStatus,
    onStatusChange,
    selectedSort,
    onSortChange,
    onReset,
    isLoading,
}: UserFilterToolbarProps) {
    return (
        <div className="p-4 sm:p-5 bg-surface-container-lowest flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-surface-container">
            {/* Search Input */}
            <form
                onSubmit={onSearchSubmit}
                className="relative flex-1 max-w-md w-full"
            >
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[18px] pointer-events-none">
                    search
                </span>
                <input
                    type="text"
                    autoFocus={false}
                    value={search}
                    onChange={(e) => onSearchChange(e.target.value)}
                    placeholder="Cari nama, email, username, atau telepon..."
                    className="w-full h-9 pl-9 pr-8 rounded-lg bg-surface border border-surface-container-high text-xs text-on-surface placeholder:text-outline focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary focus:bg-surface-container-lowest transition-all"
                />
                {search && (
                    <button
                        type="button"
                        onClick={() => {
                            onSearchChange('');
                        }}
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 text-outline hover:text-on-surface flex items-center justify-center cursor-pointer"
                        title="Hapus pencarian"
                    >
                        <span className="material-symbols-outlined text-[16px]">close</span>
                    </button>
                )}
            </form>

            {/* Dropdown Filters & Actions */}
            <div className="flex flex-wrap items-center gap-2">
                {/* Status Filter */}
                <div className="relative">
                    <select
                        value={selectedStatus}
                        onChange={(e) => onStatusChange(e.target.value)}
                        className="appearance-none h-9 bg-surface border border-surface-container-high pl-3 pr-8 rounded-lg text-xs font-medium text-on-surface hover:bg-surface-container/60 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary cursor-pointer transition-colors"
                    >
                        <option value="all">Semua Status</option>
                        <option value="active">Aktif</option>
                        <option value="verified">Email Terverifikasi</option>
                        <option value="unverified">Menunggu Verifikasi</option>
                        <option value="suspended">Ditangguhkan</option>
                    </select>
                    <span className="material-symbols-outlined absolute right-2.5 top-1/2 -translate-y-1/2 text-outline text-[16px] pointer-events-none">
                        expand_more
                    </span>
                </div>

                {/* Sort Filter */}
                <div className="relative">
                    <select
                        value={selectedSort}
                        onChange={(e) => onSortChange(e.target.value)}
                        className="appearance-none h-9 bg-surface border border-surface-container-high pl-3 pr-8 rounded-lg text-xs font-medium text-on-surface hover:bg-surface-container/60 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary cursor-pointer transition-colors"
                    >
                        <option value="latest">Terbaru Mendaftar</option>
                        <option value="oldest">Paling Lama</option>
                        <option value="name_asc">Nama (A - Z)</option>
                        <option value="name_desc">Nama (Z - A)</option>
                    </select>
                    <span className="material-symbols-outlined absolute right-2.5 top-1/2 -translate-y-1/2 text-outline text-[16px] pointer-events-none">
                        sort
                    </span>
                </div>

                {/* Reset / Reload Button */}
                <button
                    type="button"
                    onClick={onReset}
                    className="h-9 px-3 rounded-lg bg-surface border border-surface-container-high flex items-center justify-center gap-1.5 text-xs text-outline hover:text-on-surface hover:bg-surface-container transition-colors shadow-2xs cursor-pointer"
                    title="Reset &amp; Muat Ulang"
                >
                    <span className={`material-symbols-outlined text-[16px] ${isLoading ? 'animate-spin text-primary' : ''}`}>
                        refresh
                    </span>
                    <span className="hidden sm:inline font-medium">Reset</span>
                </button>
            </div>
        </div>
    );
}
