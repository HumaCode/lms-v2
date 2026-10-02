import { ReactNode, useEffect } from 'react';

export interface AppModalProps {
    show: boolean;
    onClose: () => void;
    title: string;
    description?: string;
    icon?: string;
    children: ReactNode;
    maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';
    headerVariant?: 'primary' | 'emerald' | 'blue' | 'rose';
    footer?: ReactNode;
}

const maxWidthClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
    '3xl': 'max-w-3xl',
};

const headerBgClasses = {
    primary: 'bg-primary text-on-primary',
    emerald: 'bg-emerald-700 text-white',
    blue: 'bg-blue-700 text-white',
    rose: 'bg-rose-700 text-white',
};

export default function AppModal({
    show,
    onClose,
    title,
    description,
    icon,
    children,
    maxWidth = '2xl',
    headerVariant = 'primary',
    footer,
}: AppModalProps) {
    useEffect(() => {
        if (!show) return;
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [show, onClose]);

    if (!show) return null;

    const maxWidthClass = maxWidthClasses[maxWidth] || maxWidthClasses['2xl'];
    const headerBg = headerBgClasses[headerVariant] || headerBgClasses.primary;

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto p-3 sm:p-4">
            {/* Backdrop with fade-in and smooth blur */}
            <div
                className="fixed inset-0 bg-slate-900/60 backdrop-blur-md animate-modal-backdrop transition-opacity cursor-pointer"
                onClick={onClose}
            />

            {/* Vertical Centering Container */}
            <div className="flex min-h-full items-center justify-center pointer-events-none">
                {/* Modal Card with spring-in entrance */}
                <div
                    className={`relative w-full ${maxWidthClass} max-h-[calc(100vh-2rem)] sm:max-h-[calc(100vh-3rem)] bg-surface-container-lowest rounded-2xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.35)] border border-surface-container overflow-hidden z-10 my-auto animate-modal-card flex flex-col pointer-events-auto`}
                >
                    {/* Modern Thematic Interactive Header */}
                    <div
                        className={`flex items-start justify-between px-5 py-4 ${headerBg} relative overflow-hidden shadow-sm shrink-0`}
                    >
                        {/* Background Pattern / Animated Glow */}
                        <div className="absolute -right-8 -top-8 w-32 h-32 bg-white/10 rounded-full blur-xl pointer-events-none animate-modal-glow" />
                        <div className="absolute right-12 bottom-0 w-24 h-24 bg-white/5 rounded-full blur-lg pointer-events-none" />

                        <div className="flex items-center gap-3 relative z-10 min-w-0 pr-3">
                            {icon && (
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/15 text-white backdrop-blur-xs border border-white/20 shadow-xs animate-modal-icon">
                                    <span className="material-symbols-outlined text-[20px]">
                                        {icon}
                                    </span>
                                </div>
                            )}
                            <div className="flex flex-col min-w-0">
                                <h3 className="font-heading text-base sm:text-lg font-bold tracking-tight text-white truncate">
                                    {title}
                                </h3>
                                {description && (
                                    <p className="text-xs text-white/85 font-normal mt-0.5 line-clamp-1 leading-relaxed">
                                        {description}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Close Button with interactive hover */}
                        <button
                            type="button"
                            onClick={onClose}
                            className="relative z-10 shrink-0 rounded-xl p-1.5 text-white/80 hover:text-white hover:bg-white/20 transition-all hover:scale-105 active:scale-95 cursor-pointer border border-transparent hover:border-white/20 focus:outline-none"
                            title="Tutup Modal (Esc)"
                        >
                            <span className="material-symbols-outlined text-[20px] block">close</span>
                        </button>
                    </div>

                    {/* Modal Body (Scrollable) */}
                    <div className="flex-1 overflow-y-auto">{children}</div>

                    {/* Modal Optional Footer */}
                    {footer && (
                        <div className="px-5 py-3.5 bg-surface-container-low border-t border-surface-container flex items-center justify-end gap-3 shrink-0">
                            {footer}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
