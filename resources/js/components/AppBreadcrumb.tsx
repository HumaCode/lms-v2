import { Link } from '@inertiajs/react';
import React from 'react';

export interface BreadcrumbItem {
    label: string;
    href?: string;
    icon?: string;
    current?: boolean;
}

interface AppBreadcrumbProps {
    items: BreadcrumbItem[];
    className?: string;
}

export default function AppBreadcrumb({ items, className = '' }: AppBreadcrumbProps) {
    if (!items || items.length === 0) return null;

    return (
        <nav aria-label="Breadcrumb" className={`flex items-center select-none ${className}`}>
            <ol className="inline-flex items-center gap-1.5 text-[11px] font-semibold tracking-wider uppercase">
                {items.map((item, index) => {
                    const isLast = index === items.length - 1;
                    const isCurrent = item.current ?? isLast;

                    return (
                        <li key={`${item.label}-${index}`} className="inline-flex items-center gap-1.5">
                            {index > 0 && (
                                <span className="material-symbols-outlined text-[14px] text-outline/40 select-none">
                                    chevron_right
                                </span>
                            )}

                            {isCurrent || !item.href ? (
                                <span
                                    className="text-primary font-bold flex items-center gap-1"
                                    aria-current={isCurrent ? 'page' : undefined}
                                >
                                    {item.icon && (
                                        <span className="material-symbols-outlined text-[14px]">
                                            {item.icon}
                                        </span>
                                    )}
                                    <span>{item.label}</span>
                                </span>
                            ) : (
                                <Link
                                    href={item.href}
                                    className="text-outline hover:text-on-surface transition-colors flex items-center gap-1 py-0.5"
                                >
                                    {item.icon && (
                                        <span className="material-symbols-outlined text-[14px]">
                                            {item.icon}
                                        </span>
                                    )}
                                    <span>{item.label}</span>
                                </Link>
                            )}
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
}
