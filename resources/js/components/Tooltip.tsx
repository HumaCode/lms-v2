import React, { ReactNode } from 'react';

type TooltipVariant = 'emerald' | 'blue' | 'rose' | 'primary' | 'dark';
type TooltipPosition = 'top' | 'bottom' | 'left' | 'right';
type TooltipAlign = 'center' | 'left' | 'right';

interface TooltipProps {
    content: string;
    variant?: TooltipVariant;
    position?: TooltipPosition;
    align?: TooltipAlign;
    children: ReactNode;
    className?: string;
}

const variantStyles: Record<
    TooltipVariant,
    {
        bubble: string;
        arrow: string;
    }
> = {
    emerald: {
        bubble: 'bg-emerald-700 text-white shadow-emerald-950/25 border border-emerald-600/40',
        arrow: 'border-t-emerald-700',
    },
    blue: {
        bubble: 'bg-blue-700 text-white shadow-blue-950/25 border border-blue-600/40',
        arrow: 'border-t-blue-700',
    },
    rose: {
        bubble: 'bg-rose-700 text-white shadow-rose-950/25 border border-rose-600/40',
        arrow: 'border-t-rose-700',
    },
    primary: {
        bubble: 'bg-primary text-on-primary shadow-primary/25 border border-primary-container/40',
        arrow: 'border-t-primary',
    },
    dark: {
        bubble: 'bg-slate-900 text-white shadow-slate-950/25 border border-slate-800',
        arrow: 'border-t-slate-900',
    },
};

export default function Tooltip({
    content,
    variant = 'dark',
    position = 'top',
    align = 'center',
    children,
    className = '',
}: TooltipProps) {
    if (!content) return <>{children}</>;

    const selectedVariant = variantStyles[variant] || variantStyles.dark;

    // Calculate alignment classes
    let positionClass = 'bottom-full mb-2';
    let arrowClass = 'top-full border-x-transparent border-b-transparent border-t-[5px]';

    if (position === 'top') {
        if (align === 'right') {
            // Anchor to the right edge of button so tooltip expands towards left and never clips on screen edge
            positionClass = 'bottom-full right-0 mb-2';
            arrowClass = 'top-full right-3 border-x-transparent border-b-transparent border-t-[5px]';
        } else if (align === 'left') {
            positionClass = 'bottom-full left-0 mb-2';
            arrowClass = 'top-full left-3 border-x-transparent border-b-transparent border-t-[5px]';
        } else {
            positionClass = 'bottom-full left-1/2 -translate-x-1/2 mb-2';
            arrowClass = 'top-full left-1/2 -translate-x-1/2 border-x-transparent border-b-transparent border-t-[5px]';
        }
    } else if (position === 'bottom') {
        if (align === 'right') {
            positionClass = 'top-full right-0 mt-2';
            arrowClass = 'bottom-full right-3 border-x-transparent border-t-transparent border-b-[5px]';
        } else if (align === 'left') {
            positionClass = 'top-full left-0 mt-2';
            arrowClass = 'bottom-full left-3 border-x-transparent border-t-transparent border-b-[5px]';
        } else {
            positionClass = 'top-full left-1/2 -translate-x-1/2 mt-2';
            arrowClass = 'bottom-full left-1/2 -translate-x-1/2 border-x-transparent border-t-transparent border-b-[5px]';
        }
    } else if (position === 'left') {
        positionClass = 'right-full top-1/2 -translate-y-1/2 mr-2';
        arrowClass = 'left-full top-1/2 -translate-y-1/2 border-y-transparent border-r-transparent border-l-[5px]';
    } else if (position === 'right') {
        positionClass = 'left-full top-1/2 -translate-y-1/2 ml-2';
        arrowClass = 'right-full top-1/2 -translate-y-1/2 border-y-transparent border-l-transparent border-r-[5px]';
    }

    return (
        <div className={`relative inline-flex group ${className}`}>
            {children}

            {/* Tooltip Bubble */}
            <div
                role="tooltip"
                className={`pointer-events-none absolute z-50 whitespace-nowrap px-2.5 py-1 text-[11px] font-medium tracking-wide rounded-md shadow-lg backdrop-blur-xs transition-all duration-200 opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 ${positionClass} ${selectedVariant.bubble}`}
            >
                {content}

                {/* Arrow */}
                <div
                    className={`absolute w-0 h-0 border-solid border-4 ${arrowClass} ${selectedVariant.arrow}`}
                />
            </div>
        </div>
    );
}
