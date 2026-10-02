import { UserData } from '@/types';

interface UserDeleteModalProps {
    user: UserData | null;
    onClose: () => void;
    onConfirm: () => void;
}

export default function UserDeleteModal({
    user,
    onClose,
    onConfirm,
}: UserDeleteModalProps) {
    if (!user) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
                className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
                onClick={onClose}
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
                    <strong className="text-on-surface">{user.name}</strong> ({user.email})?
                </p>

                <div className="flex items-center justify-end gap-3">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 text-xs font-semibold rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface transition-colors cursor-pointer"
                    >
                        Batal
                    </button>
                    <button
                        type="button"
                        onClick={onConfirm}
                        className="px-5 py-2 text-xs font-semibold rounded-lg bg-error hover:bg-error/90 text-on-error transition-all shadow-xs cursor-pointer"
                    >
                        Ya, Hapus
                    </button>
                </div>
            </div>
        </div>
    );
}
