import React, { useEffect } from 'react';

export type ActionConfirmVariant = 'success' | 'warning' | 'danger' | 'info';

export interface ActionConfirmModalProps {
    show: boolean;
    onClose: () => void;
    onConfirm: () => void;
    variant?: ActionConfirmVariant;
    title: string;
    subtitle?: string;
    icon?: string;
    itemName?: string;
    itemSubtext?: string;
    itemAvatar?: string;
    itemBadge?: string;
    calloutMessage?: string;
    confirmLabel?: string;
    cancelLabel?: string;
    loadingLabel?: string;
    isProcessing?: boolean;
}

export default function ActionConfirmModal({
    show,
    onClose,
    onConfirm,
    variant = 'success',
    title,
    subtitle,
    icon,
    itemName,
    itemSubtext,
    itemAvatar,
    itemBadge,
    calloutMessage,
    confirmLabel = 'Ya, Lanjutkan',
    cancelLabel = 'Batal',
    loadingLabel = 'Sedang proses...',
    isProcessing = false,
}: ActionConfirmModalProps) {
    useEffect(() => {
        if (!show) return;
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && !isProcessing) {
                onClose();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [show, isProcessing, onClose]);

    if (!show) return null;

    // Config per variant
    const config = {
        success: {
            glow: 'bg-emerald-500/15',
            beaconBg: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-600',
            pingRing: 'bg-emerald-500/20',
            iconGradient: 'bg-gradient-to-br from-emerald-500 to-teal-600 shadow-emerald-500/30',
            defaultIcon: 'check_circle',
            badgeClass: 'bg-emerald-100 text-emerald-800 border-emerald-200',
            calloutBg: 'bg-emerald-500/5 border-emerald-500/20',
            calloutIcon: 'check_circle',
            calloutIconColor: 'text-emerald-600',
            btnGradient:
                'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 shadow-emerald-600/25',
        },
        warning: {
            glow: 'bg-amber-500/15',
            beaconBg: 'bg-amber-500/10 border-amber-500/20 text-amber-600',
            pingRing: 'bg-amber-500/20',
            iconGradient: 'bg-gradient-to-br from-amber-500 to-orange-600 shadow-amber-500/30',
            defaultIcon: 'block',
            badgeClass: 'bg-amber-100 text-amber-800 border-amber-200',
            calloutBg: 'bg-amber-500/5 border-amber-500/20',
            calloutIcon: 'warning',
            calloutIconColor: 'text-amber-600',
            btnGradient:
                'bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 shadow-amber-600/25',
        },
        danger: {
            glow: 'bg-rose-500/15',
            beaconBg: 'bg-rose-500/10 border-rose-500/20 text-rose-600',
            pingRing: 'bg-rose-500/20',
            iconGradient: 'bg-gradient-to-br from-rose-500 to-red-600 shadow-rose-500/30',
            defaultIcon: 'delete_forever',
            badgeClass: 'bg-rose-100 text-rose-800 border-rose-200',
            calloutBg: 'bg-rose-500/5 border-rose-500/20',
            calloutIcon: 'warning',
            calloutIconColor: 'text-rose-600',
            btnGradient:
                'bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 shadow-rose-600/25',
        },
        info: {
            glow: 'bg-sky-500/15',
            beaconBg: 'bg-sky-500/10 border-sky-500/20 text-sky-600',
            pingRing: 'bg-sky-500/20',
            iconGradient: 'bg-gradient-to-br from-sky-500 to-blue-600 shadow-sky-500/30',
            defaultIcon: 'info',
            badgeClass: 'bg-sky-100 text-sky-800 border-sky-200',
            calloutBg: 'bg-sky-500/5 border-sky-500/20',
            calloutIcon: 'info',
            calloutIconColor: 'text-sky-600',
            btnGradient:
                'bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-500 hover:to-blue-500 shadow-sky-600/25',
        },
    }[variant];

    const displayIcon = icon || config.defaultIcon;

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto p-4">
            {/* Backdrop with smooth blur and fade */}
            <div
                className="fixed inset-0 bg-slate-900/60 backdrop-blur-md animate-modal-backdrop transition-opacity cursor-pointer"
                onClick={() => {
                    if (!isProcessing) onClose();
                }}
            />

            {/* Vertical Centering Container */}
            <div className="flex min-h-full items-center justify-center pointer-events-none">
                {/* Modal Card with spring-in entrance */}
                <div className="relative w-full max-w-md bg-surface-container-lowest rounded-3xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.35)] border border-surface-container overflow-hidden z-10 my-auto animate-modal-card p-6 pointer-events-auto">
                    {/* Decorative Ambient Glow Top Center */}
                    <div
                        className={`absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full blur-2xl pointer-events-none ${config.glow}`}
                    />

                    {/* Animated Beacon Icon */}
                    <div
                        className={`relative mx-auto flex items-center justify-center w-16 h-16 rounded-2xl border mb-4 ${config.beaconBg}`}
                    >
                        {/* Pulsing ring */}
                        <span
                            className={`absolute -inset-1 rounded-2xl animate-ping opacity-60 duration-1000 ${config.pingRing}`}
                        />
                        <div
                            className={`relative w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-md animate-modal-icon ${config.iconGradient}`}
                        >
                            <span className="material-symbols-outlined text-[26px]">
                                {displayIcon}
                            </span>
                        </div>
                    </div>

                    {/* Title & Subtitle */}
                    <div className="text-center mb-4">
                        <h3 className="font-heading text-lg font-bold text-on-surface tracking-tight">
                            {title}
                        </h3>
                        {subtitle && (
                            <p className="text-xs text-outline mt-1 font-normal">
                                {subtitle}
                            </p>
                        )}
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
                                <div
                                    className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 border ${config.beaconBg}`}
                                >
                                    <span className="material-symbols-outlined text-[20px]">
                                        {displayIcon}
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
                            {itemBadge && (
                                <span
                                    className={`inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full border shrink-0 ${config.badgeClass}`}
                                >
                                    {itemBadge}
                                </span>
                            )}
                        </div>
                    )}

                    {/* Warning/Info Callout Box */}
                    {calloutMessage && (
                        <div
                            className={`p-3 rounded-xl border flex items-start gap-2.5 text-xs text-on-surface-variant mb-6 ${config.calloutBg}`}
                        >
                            <span
                                className={`material-symbols-outlined text-[18px] shrink-0 mt-0.5 ${config.calloutIconColor}`}
                            >
                                {config.calloutIcon}
                            </span>
                            <p className="text-xs leading-relaxed text-on-surface-variant">
                                {calloutMessage}
                            </p>
                        </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex items-center gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            disabled={isProcessing}
                            className="flex-1 py-2.5 px-4 rounded-xl text-xs font-semibold bg-surface-container hover:bg-surface-container-high text-on-surface transition-all active:scale-95 disabled:opacity-50 cursor-pointer text-center border border-surface-container-high"
                        >
                            {cancelLabel}
                        </button>
                        <button
                            type="button"
                            onClick={onConfirm}
                            disabled={isProcessing}
                            className={`flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-semibold text-white shadow-md transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer ${config.btnGradient}`}
                        >
                            {isProcessing ? (
                                <>
                                    <span className="material-symbols-outlined text-[16px] animate-spin">
                                        progress_activity
                                    </span>
                                    <span>{loadingLabel}</span>
                                </>
                            ) : (
                                <>
                                    <span className="material-symbols-outlined text-[16px]">
                                        {displayIcon}
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
