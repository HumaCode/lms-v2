interface UserBatchActionBarProps {
    selectedCount: number;
    canDelete: boolean;
    onBulkStatus: (status: string) => void;
    onBulkDelete: () => void;
}

export default function UserBatchActionBar({
    selectedCount,
    canDelete,
    onBulkStatus,
    onBulkDelete,
}: UserBatchActionBarProps) {
    if (selectedCount === 0) return null;

    return (
        <div className="px-6 py-2.5 bg-secondary-container/20 border-b border-primary/20 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 text-on-surface font-medium">
                <span className="material-symbols-outlined text-[18px] text-primary">
                    check_circle
                </span>
                <span>
                    <strong>{selectedCount}</strong> pengguna terpilih
                </span>
            </div>

            <div className="flex items-center gap-2">
                <button
                    type="button"
                    onClick={() => onBulkStatus('active')}
                    className="px-3 py-1.5 rounded-lg bg-surface-container-lowest hover:bg-surface-container text-on-surface font-medium transition-colors flex items-center gap-1 shadow-2xs border border-surface-container cursor-pointer"
                >
                    <span className="material-symbols-outlined text-[16px] text-primary">
                        done_all
                    </span>
                    <span>Aktifkan</span>
                </button>

                <button
                    type="button"
                    onClick={() => onBulkStatus('suspended')}
                    className="px-3 py-1.5 rounded-lg bg-surface-container-lowest hover:bg-surface-container text-on-surface font-medium transition-colors flex items-center gap-1 shadow-2xs border border-surface-container cursor-pointer"
                >
                    <span className="material-symbols-outlined text-[16px] text-outline">
                        block
                    </span>
                    <span>Tangguhkan</span>
                </button>

                {canDelete && (
                    <button
                        type="button"
                        onClick={onBulkDelete}
                        className="px-3 py-1.5 rounded-lg bg-error-container/60 hover:bg-error-container text-on-error-container font-semibold transition-colors flex items-center gap-1 shadow-2xs cursor-pointer"
                    >
                        <span className="material-symbols-outlined text-[16px]">
                            delete
                        </span>
                        <span>Hapus Masal</span>
                    </button>
                )}
            </div>
        </div>
    );
}
