import React from 'react';

interface MenuHeaderProps {
    onAddNew: () => void;
    onLivePreview: () => void;
    canCreate: boolean;
}

export default function MenuHeader({ onAddNew, onLivePreview, canCreate }: MenuHeaderProps) {
    return (
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
            <div>
                <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-on-surface tracking-tight">
                        Manajemen Menu &amp; Navigasi Dinamis
                    </h1>
                    <p className="font-body-md text-sm text-on-surface-variant mt-1.5 max-w-3xl leading-relaxed">
                        Kelola struktur navigasi website, megamenu dropdown, sidebar member, hak akses peran
                        (Role-based Access), dan urutan hirarki menu secara visual dan terpusat.
                    </p>
                </div>

                <div className="flex items-center gap-3 self-start lg:self-center shrink-0">
                    <button
                        type="button"
                        onClick={onLivePreview}
                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-surface-container-low text-on-surface hover:bg-surface-container font-semibold text-sm transition-all shadow-2xs border border-surface-container-high hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
                    >
                        <span className="material-symbols-outlined text-[19px] text-primary">visibility</span>
                        <span>Lihat Pratinjau Live</span>
                    </button>

                    {canCreate && (
                        <button
                            type="button"
                            onClick={onAddNew}
                            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-on-primary hover:bg-primary-container font-semibold text-sm transition-all shadow-sm hover:shadow-md hover:shadow-primary/20 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
                        >
                            <span className="material-symbols-outlined text-[19px]">add</span>
                            <span>Tambah Menu Baru</span>
                        </button>
                    )}
                </div>
            </div>
    );
}
