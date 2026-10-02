import React, { useEffect } from 'react';

export interface DeleteConfirmModalProps {
    show: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title?: string;
    subtitle?: string;
    itemName?: string;
    itemSubtext?: string;
    itemAvatar?: string;
    warningMessage?: string;
    confirmLabel?: string;
    cancelLabel?: string;
    loadingLabel?: string;
    isDeleting?: boolean;
}

export default function DeleteConfirmModal({
    show,
    onClose,
    onConfirm,
    title = 'Hapus Data?',
    subtitle = 'Tindakan ini permanen dan tidak dapat dibatalkan.',
    itemName,
    itemSubtext,
    itemAvatar,
    warningMessage = 'Data dan riwayat yang terkait akan dihapus secara permanen dari sistem.',
    confirmLabel = 'Ya, Hapus',
    cancelLabel = 'Batal',
    loadingLabel = 'Sedang proses...',
    isDeleting = false,
}: DeleteConfirmModalProps) {
    useEffect(() => {
        if (!show) return;
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && !isDeleting) {
                onClose();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [show, isDeleting, onClose]);

    if (!show) return null;

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto p-4">
            {/* Backdrop with smooth blur and fade */}
            <div
                className="fixed inset-0 bg-slate-900/60 backdrop-blur-md animate-modal-backdrop transition-opacity cursor-pointer"
                onClick={() => {
                    if (!isDeleting) onClose();
                }}
            />

            {/* Vertical Centering Container */}
            <div className="flex min-h-full items-center justify-center pointer-events-none">
                {/* Modal Card with spring-in entrance */}
                <div className="relative w-full max-w-md bg-surface-container-lowest rounded-3xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.35)] border border-surface-container overflow-hidden z-10 my-auto animate-modal-card p-6 pointer-events-auto">
                    {/* Decorative Ambient Glow Top Center */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-rose-500/15 rounded-full blur-2xl pointer-events-none" />

                    {/* Animated Danger Beacon Icon */}
                    <div className="relative mx-auto flex items-center justify-center w-16 h-16 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-600 mb-4">
                        {/* Pulsing ring */}
                        <span className="absolute -inset-1 rounded-2xl bg-rose-500/20 animate-ping opacity-60 duration-1000" />
                        <div className="relative w-12 h-12 rounded-xl bg-gradient-to-br from-rose-500 to-red-600 flex items-center justify-center text-white shadow-md shadow-rose-500/30 animate-modal-icon">
                            <span className="material-symbols-outlined text-[26px]">
                                delete_forever
                            </span>
                        </div>
                    </div>

                    {/* Title & Subtitle */}
                    <div className="text-center mb-4">
                        <h3 className="font-heading text-lg font-bold text-on-surface tracking-tight">
                            {title}
                        </h3>
                        <p className="text-xs text-outline mt-1 font-normal">
                            {subtitle}
                        </p>
                    </div>

                    {/* Target Item Card Preview */}
                    {itemName && (
                        <div className="p-3 rounded-2xl bg-surface-container-low border border-surface-container flex items-center gap-3 mb-4 shadow-2xs">
                            {itemAvatar ? (
                                <img
                                    src={itemAvatar}
                                    alt={itemName}
                                    className="w-11 h-11 rounded-xl object-cover shrink-0 ring-2 ring-white shadow-xs border border-surface-container bg-surface"
                                />
                            ) : (
                                <div className="w-11 h-11 rounded-xl bg-rose-500/10 text-rose-600 flex items-center justify-center shrink-0 border border-rose-500/20">
                                    <span className="material-symbols-outlined text-[20px]">
                                        person
                                    </span>
                                </div>
                            )}
                            <div className="flex-1 min-w-0">
                                <h4 className="text-xs sm:text-sm font-bold text-on-surface truncate">
                                    {itemName}
                                </h4>
                                {itemSubtext && (
                                    <p className="text-[11px] text-outline truncate mt-0.5">
                                        {itemSubtext}
                                    </p>
                                )}
                            </div>
                            <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-rose-700 bg-rose-100 px-2 py-0.5 rounded-full shrink-0">
                                Akan Dihapus
                            </span>
                        </div>
                    )}

                    {/* Warning Callout Box */}
                    <div className="p-3 rounded-xl bg-rose-500/5 border border-rose-500/15 flex items-start gap-2.5 text-xs text-on-surface-variant mb-6">
                        <span className="material-symbols-outlined text-[18px] text-rose-600 shrink-0 mt-0.5">
                            warning
                        </span>
                        <p className="text-xs leading-relaxed text-on-surface-variant">
                            {warningMessage}
                        </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            disabled={isDeleting}
                            className="flex-1 py-2.5 px-4 rounded-xl text-xs font-semibold bg-surface-container hover:bg-surface-container-high text-on-surface transition-all active:scale-95 disabled:opacity-50 cursor-pointer text-center border border-surface-container-high"
                        >
                            {cancelLabel}
                        </button>
                        <button
                            type="button"
                            onClick={onConfirm}
                            disabled={isDeleting}
                            className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-semibold bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white shadow-md shadow-rose-600/25 transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
                        >
                            {isDeleting ? (
                                <>
                                    <span className="material-symbols-outlined text-[16px] animate-spin">
                                        progress_activity
                                    </span>
                                    <span>{loadingLabel}</span>
                                </>
                            ) : (
                                <>
                                    <span className="material-symbols-outlined text-[16px]">
                                        delete
                                    </span>
                                    <span>{confirmLabel}</span>
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
