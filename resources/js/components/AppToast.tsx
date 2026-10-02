import React, { useEffect, useState } from 'react';

export type ToastType = 'success' | 'warning' | 'danger' | 'error' | 'info';

export interface ToastProps {
    show?: boolean;
    type?: ToastType;
    title?: string;
    message?: string;
    duration?: number;
    onClose?: () => void;
}

export default function AppToast({
    show = false,
    type = 'success',
    title,
    message,
    duration = 4000,
    onClose,
}: ToastProps) {
    const [visible, setVisible] = useState(show);
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        setVisible(show);
    }, [show]);

    useEffect(() => {
        if (!visible || duration <= 0 || isHovered) return;

        const timer = setTimeout(() => {
            handleClose();
        }, duration);

        return () => clearTimeout(timer);
    }, [visible, duration, isHovered]);

    const handleClose = () => {
        setVisible(false);
        if (onClose) {
            onClose();
        }
    };

    if (!visible) return null;

    // Normalisasi 'danger' & 'error'
    const normalizedType: 'success' | 'warning' | 'danger' | 'info' =
        type === 'error' ? 'danger' : type;

    // Tema konfigurasi sesuai type
    const themeConfig = {
        success: {
            title: title || 'Berhasil',
            icon: 'check_circle',
            // Emerald themed
            islandBg: 'bg-emerald-950/95 dark:bg-emerald-950/95',
            islandBorder: 'border-emerald-500/40 shadow-[0_12px_32px_rgba(16,185,129,0.25)]',
            iconBg: 'bg-emerald-500/20 text-emerald-400',
            iconRing: 'ring-1 ring-emerald-500/30',
            pulseBg: 'bg-emerald-400',
            titleText: 'text-emerald-200',
            subText: 'text-emerald-100/90',
            closeHover: 'hover:bg-emerald-800/40 text-emerald-300',
        },
        warning: {
            title: title || 'Peringatan',
            icon: 'warning',
            // Amber themed
            islandBg: 'bg-amber-950/95 dark:bg-amber-950/95',
            islandBorder: 'border-amber-500/40 shadow-[0_12px_32px_rgba(245,158,11,0.25)]',
            iconBg: 'bg-amber-500/20 text-amber-400',
            iconRing: 'ring-1 ring-amber-500/30',
            pulseBg: 'bg-amber-400',
            titleText: 'text-amber-200',
            subText: 'text-amber-100/90',
            closeHover: 'hover:bg-amber-800/40 text-amber-300',
        },
        danger: {
            title: title || 'Gagal',
            icon: 'error',
            // Rose themed
            islandBg: 'bg-rose-950/95 dark:bg-rose-950/95',
            islandBorder: 'border-rose-500/40 shadow-[0_12px_32px_rgba(244,63,94,0.25)]',
            iconBg: 'bg-rose-500/20 text-rose-400',
            iconRing: 'ring-1 ring-rose-500/30',
            pulseBg: 'bg-rose-400',
            titleText: 'text-rose-200',
            subText: 'text-rose-100/90',
            closeHover: 'hover:bg-rose-800/40 text-rose-300',
        },
        info: {
            title: title || 'Informasi',
            icon: 'info',
            // Blue themed
            islandBg: 'bg-blue-950/95 dark:bg-blue-950/95',
            islandBorder: 'border-blue-500/40 shadow-[0_12px_32px_rgba(59,130,246,0.25)]',
            iconBg: 'bg-blue-500/20 text-blue-400',
            iconRing: 'ring-1 ring-blue-500/30',
            pulseBg: 'bg-blue-400',
            titleText: 'text-blue-200',
            subText: 'text-blue-100/90',
            closeHover: 'hover:bg-blue-800/40 text-blue-300',
        },
    }[normalizedType];

    return (
        <div className="fixed top-5 inset-x-0 z-[100] flex justify-center pointer-events-none px-4">
            <div
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className={`pointer-events-auto max-w-lg w-full sm:w-auto min-w-[320px] sm:min-w-[380px] p-3 sm:p-3.5 rounded-2xl sm:rounded-3xl border backdrop-blur-2xl transition-all duration-300 animate-in fade-in slide-in-from-top-4 flex items-start sm:items-center gap-3.5 ${themeConfig.islandBg} ${themeConfig.islandBorder}`}
                style={{
                    animationTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
                }}
            >
                {/* Dynamic Island Animated Icon Container with Bounce & Pulse */}
                <div className="relative shrink-0 flex items-center justify-center">
                    {/* Glowing pulse ring */}
                    <span
                        className={`absolute -inset-1 rounded-full opacity-60 animate-ping duration-1000 ${themeConfig.pulseBg}`}
                    ></span>

                    {/* Icon container with bounce animation */}
                    <div
                        className={`relative w-10 h-10 rounded-full flex items-center justify-center animate-bounce ${themeConfig.iconBg} ${themeConfig.iconRing}`}
                        style={{
                            animationDuration: '1.2s',
                        }}
                    >
                        <span className="material-symbols-outlined text-[22px]">
                            {themeConfig.icon}
                        </span>
                    </div>
                </div>

                {/* Content: Title & Subtitle */}
                <div className="flex-1 min-w-0 pr-1">
                    <div className="flex items-center gap-2">
                        <h4 className={`text-xs font-bold tracking-wide uppercase ${themeConfig.titleText}`}>
                            {themeConfig.title}
                        </h4>
                        <span className="w-1.5 h-1.5 rounded-full bg-white/40"></span>
                        <span className="text-[10px] text-white/50 font-medium">Baru Saja</span>
                    </div>
                    {message && (
                        <p className={`text-xs font-medium mt-1 leading-relaxed break-words whitespace-normal ${themeConfig.subText}`}>
                            {message}
                        </p>
                    )}
                </div>

                {/* Close Button */}
                <button
                    type="button"
                    onClick={handleClose}
                    className={`p-1.5 rounded-full transition-colors cursor-pointer shrink-0 ${themeConfig.closeHover}`}
                    aria-label="Tutup notifikasi"
                >
                    <span className="material-symbols-outlined text-[18px]">close</span>
                </button>
            </div>
        </div>
    );
}
