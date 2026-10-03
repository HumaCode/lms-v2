import React, { useEffect } from 'react';

export interface PopupLoaderProps {
    show: boolean;
    title?: string;
    message?: string;
    variant?: 'card' | 'pill';
}

export default function PopupLoader({
    show,
    title = 'Memproses...',
    message = 'Mohon tunggu sebentar, sistem sedang memperbarui data.',
    variant = 'card',
}: PopupLoaderProps) {
    useEffect(() => {
        if (show) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [show]);

    if (!show) return null;

    if (variant === 'pill') {
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-xs transition-opacity animate-in fade-in duration-150">
                <div className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-surface-container-lowest shadow-xl border border-surface-container text-xs sm:text-sm font-semibold text-primary">
                    <span className="material-symbols-outlined text-[20px] animate-spin">
                        progress_activity
                    </span>
                    <span>{title || message || 'Memuat data...'}</span>
                </div>
            </div>
        );
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/45 backdrop-blur-xs transition-opacity animate-in fade-in duration-150">
            <div className="bg-surface-container-lowest border border-surface-container rounded-3xl p-6 sm:p-7 shadow-2xl max-w-xs sm:max-w-sm w-full mx-4 flex flex-col items-center text-center transform scale-100 animate-in zoom-in-95 duration-150">
                {/* Spinner Icon */}
                <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary mb-4 shadow-sm">
                    <span className="material-symbols-outlined text-3xl animate-spin">
                        progress_activity
                    </span>
                </div>

                {/* Title */}
                <h3 className="font-bold text-base text-on-surface mb-1">
                    {title}
                </h3>

                {/* Message */}
                {message && (
                    <p className="text-xs text-outline leading-relaxed max-w-[260px]">
                        {message}
                    </p>
                )}

                {/* Indeterminate moving progress bar */}
                <div className="w-full bg-surface-container-high h-1.5 rounded-full overflow-hidden mt-5 relative">
                    <div className="bg-primary animate-progress-indeterminate absolute h-full top-0 rounded-full"></div>
                </div>

                <style>{`
                    @keyframes progressIndeterminateAnim {
                        0% {
                            left: -40%;
                            width: 40%;
                        }
                        50% {
                            left: 25%;
                            width: 60%;
                        }
                        100% {
                            left: 100%;
                            width: 40%;
                        }
                    }
                    .animate-progress-indeterminate {
                        animation: progressIndeterminateAnim 1.25s cubic-bezier(0.4, 0, 0.2, 1) infinite !important;
                    }
                `}</style>
            </div>
        </div>
    );
}
