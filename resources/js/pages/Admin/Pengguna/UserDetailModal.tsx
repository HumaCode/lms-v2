import { UserData } from '@/types';

interface UserDetailModalProps {
    show: boolean;
    onClose: () => void;
    user: UserData | null;
}

export default function UserDetailModal({
    show,
    onClose,
    user,
}: UserDetailModalProps) {
    if (!show || !user) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
                onClick={onClose}
            />

            {/* Modal Card */}
            <div className="relative w-full max-w-lg bg-surface-container-lowest rounded-2xl shadow-xl border border-surface-container overflow-hidden z-10 my-8">
                {/* Header Profile Cover */}
                <div className="h-24 bg-gradient-to-r from-primary to-primary-container p-4 relative">
                    <button
                        type="button"
                        onClick={onClose}
                        className="absolute top-3 right-3 rounded-lg p-1.5 text-white/80 hover:text-white hover:bg-black/20 transition-colors"
                    >
                        <span className="material-symbols-outlined text-[20px]">close</span>
                    </button>
                </div>

                {/* Avatar & Summary */}
                <div className="px-6 pb-6 pt-0 relative">
                    <div className="flex items-end justify-between -mt-10 mb-4">
                        <img
                            src={user.avatar_url}
                            alt={user.name}
                            className="h-20 w-20 rounded-2xl object-cover ring-4 ring-surface-container-lowest shadow-md bg-surface"
                        />
                        <span
                            className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${
                                user.status === 'active'
                                    ? 'bg-secondary-container text-on-secondary-container'
                                    : user.status === 'suspended'
                                      ? 'bg-error-container text-on-error-container'
                                      : 'bg-surface-container-high text-on-surface-variant'
                            }`}
                        >
                            <span
                                className={`w-1.5 h-1.5 rounded-full ${
                                    user.status === 'active'
                                        ? 'bg-primary'
                                        : user.status === 'suspended'
                                          ? 'bg-error'
                                          : 'bg-outline'
                                }`}
                            ></span>
                            <span className="capitalize">{user.status}</span>
                        </span>
                    </div>

                    <div className="flex items-center gap-2">
                        <h3 className="font-heading text-xl font-bold text-on-surface">
                            {user.name}
                        </h3>
                        {user.is_verified && (
                            <span
                                className="material-symbols-outlined text-[18px] text-tertiary"
                                style={{ fontVariationSettings: "'FILL' 1" }}
                                title="Terverifikasi"
                            >
                                verified
                            </span>
                        )}
                    </div>
                    <p className="text-xs text-outline font-medium">@{user.username || 'user'}</p>

                    {user.bio && (
                        <p className="mt-3 text-sm text-on-surface-variant bg-surface p-3 rounded-xl border border-surface-container-high">
                            {user.bio}
                        </p>
                    )}

                    {/* Metadata Grid */}
                    <div className="mt-5 grid grid-cols-2 gap-3 text-xs">
                        <div className="p-3 rounded-xl bg-surface-container-low border border-surface-container">
                            <span className="text-outline uppercase font-semibold tracking-wider block mb-1">
                                Email
                            </span>
                            <span className="font-medium text-on-surface break-all">{user.email}</span>
                        </div>

                        <div className="p-3 rounded-xl bg-surface-container-low border border-surface-container">
                            <span className="text-outline uppercase font-semibold tracking-wider block mb-1">
                                WhatsApp / Telepon
                            </span>
                            <span className="font-medium text-on-surface">
                                {user.phone || 'Belum diisi'}
                            </span>
                        </div>

                        <div className="p-3 rounded-xl bg-surface-container-low border border-surface-container">
                            <span className="text-outline uppercase font-semibold tracking-wider block mb-1">
                                Peran / Role
                            </span>
                            <span className="font-semibold text-primary capitalize">
                                {user.role?.name || user.role?.slug || 'Siswa / Member'}
                            </span>
                        </div>

                        <div className="p-3 rounded-xl bg-surface-container-low border border-surface-container">
                            <span className="text-outline uppercase font-semibold tracking-wider block mb-1">
                                Terdaftar Sejak
                            </span>
                            <span className="font-medium text-on-surface">{user.created_at}</span>
                        </div>
                    </div>

                    <div className="mt-6 flex justify-end">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-5 py-2 text-xs font-semibold rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface transition-colors"
                        >
                            Tutup
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
