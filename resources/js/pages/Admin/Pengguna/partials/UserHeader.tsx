interface UserHeaderProps {
    canCreate: boolean;
    onAddUser: () => void;
}

export default function UserHeader({ canCreate, onAddUser }: UserHeaderProps) {
    return (
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
                {canCreate && (
                    <button
                        type="button"
                        onClick={onAddUser}
                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-primary text-on-primary text-sm font-semibold hover:bg-primary-container transition-all shadow-sm cursor-pointer"
                    >
                        <span className="material-symbols-outlined text-[18px]">person_add</span>
                        <span>Tambah Pengguna Baru</span>
                    </button>
                )}
            </div>
        </div>
    );
}
