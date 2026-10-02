import DeleteConfirmModal from '@/components/DeleteConfirmModal';
import { UserData } from '@/types';

interface UserDeleteModalProps {
    user: UserData | null;
    onClose: () => void;
    onConfirm: () => void;
    isDeleting?: boolean;
}

export default function UserDeleteModal({
    user,
    onClose,
    onConfirm,
    isDeleting = false,
}: UserDeleteModalProps) {
    if (!user) return null;

    return (
        <DeleteConfirmModal
            show={!!user}
            onClose={onClose}
            onConfirm={onConfirm}
            title="Hapus Pengguna?"
            subtitle="Tindakan ini permanen dan tidak dapat dibatalkan."
            itemName={user.name}
            itemSubtext={`${user.email}${user.username ? ` • @${user.username}` : ''}`}
            itemAvatar={user.avatar_url}
            warningMessage="Seluruh data akun, akses hak peran, dan riwayat aktivitas pengguna ini akan dihapus secara permanen dari sistem."
            confirmLabel="Ya, Hapus Pengguna"
            cancelLabel="Batal"
            loadingLabel="Sedang proses..."
            isDeleting={isDeleting}
        />
    );
}
