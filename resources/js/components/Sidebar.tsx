import LogoutConfirmModal from '@/components/LogoutConfirmModal';
import { MenuItem, PageProps } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { useMemo, useState } from 'react';

interface SidebarProps {
    isOpenMobile: boolean;
    onCloseMobile: () => void;
}

export default function Sidebar({ isOpenMobile, onCloseMobile }: SidebarProps) {
    const { auth, menus = {} } = usePage<PageProps>().props;
    const user = auth.user;
    const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

    // Helper to format or resolve URL path
    const resolveHref = (url?: string) => {
        if (!url || url === '#') return '#';
        if (url.startsWith('http://') || url.startsWith('https://')) return url;
        if (url === 'dashboard') {
            try {
                return route('dashboard');
            } catch {
                return '/dashboard';
            }
        }
        return url.startsWith('/') ? url : `/${url}`;
    };

    const isCurrentRoute = (url?: string) => {
        if (!url) return false;
        try {
            if (url === 'dashboard' && route().current('dashboard')) return true;
            const currentPath = window.location.pathname.replace(/^\/|\/$/g, '');
            const cleanUrl = url.replace(/^\/|\/$/g, '');
            return currentPath === cleanUrl || (cleanUrl !== '' && currentPath.startsWith(cleanUrl));
        } catch {
            return false;
        }
    };

    // State for open submenus: only open by default if one of child routes is active
    const [openSubmenus, setOpenSubmenus] = useState<Record<string, boolean>>(() => {
        const initialOpen: Record<string, boolean> = {};
        if (menus && typeof menus === 'object') {
            Object.values(menus).forEach((items) => {
                const list = Array.isArray(items) ? items : Object.values(items);
                list.forEach((item: MenuItem) => {
                    const children = item.subMenus || item.sub_menus || [];
                    if (children.length > 0) {
                        const hasActiveChild = children.some((child) => isCurrentRoute(child.url));
                        if (hasActiveChild) {
                            initialOpen[item.name] = true;
                        }
                    }
                });
            });
        }
        return initialOpen;
    });

    const toggleSubmenu = (title: string) => {
        setOpenSubmenus((prev) => ({
            ...prev,
            [title]: !prev[title],
        }));
    };

    // Transform menus object/collection into structured categories
    const menuSections = useMemo(() => {
        if (!menus || typeof menus !== 'object') return [];
        return Object.entries(menus).map(([category, items]) => ({
            category,
            items: Array.isArray(items) ? items : Object.values(items),
        }));
    }, [menus]);

    return (
        <>
            {/* Mobile backdrop */}
            {isOpenMobile && (
                <div
                    onClick={onCloseMobile}
                    className="fixed inset-0 z-40 bg-black/40 backdrop-blur-xs transition-opacity lg:hidden"
                />
            )}

            <aside
                className={`fixed top-0 left-0 z-50 flex h-screen w-72 flex-col bg-surface-container-lowest shadow-[0_1px_8px_rgba(0,0,0,0.04)] border-r border-surface-container-high transition-transform duration-200 lg:translate-x-0 ${
                    isOpenMobile ? 'translate-x-0' : '-translate-x-full'
                }`}
            >
                {/* Brand Header */}
                <div className="flex h-16 items-center gap-3 px-6 bg-surface-container-lowest border-b border-surface-container">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary text-on-primary font-bold text-base shadow-[0_2px_4px_rgba(0,104,95,0.2)]">
                        W
                    </div>
                    <div className="flex flex-col min-w-0">
                        <span className="font-heading text-[1.125rem] font-bold text-on-surface leading-tight truncate">
                            WPU Course
                        </span>
                        <span className="text-[0.6875rem] font-medium text-on-surface-variant truncate">
                            Console • Admin &amp; Instruktur
                        </span>
                    </div>
                </div>

                {/* Navigation Links */}
                <div className="sidebar-scroll flex-1 overflow-y-auto px-4 py-3 space-y-4">
                    <nav className="space-y-1">
                        {menuSections.map((section) => (
                            <div key={section.category} className="space-y-1">
                                <div className="px-2 pt-3 pb-1">
                                    <span className="text-[0.6875rem] font-semibold uppercase tracking-wider text-outline">
                                        {section.category}
                                    </span>
                                </div>

                                {section.items.map((item: MenuItem) => {
                                    const children = item.subMenus || item.sub_menus || [];
                                    const hasChildren = children.length > 0;
                                    const href = resolveHref(item.url);
                                    const hasActiveChild = children.some((child) => isCurrentRoute(child.url));
                                    const isActive = isCurrentRoute(item.url) || hasActiveChild;
                                    const isSubmenuOpen = !!openSubmenus[item.name];

                                    if (hasChildren) {
                                        return (
                                            <div key={item.id || item.name} className="space-y-1">
                                                <button
                                                    type="button"
                                                    onClick={() => toggleSubmenu(item.name)}
                                                    className={`group flex w-full items-center justify-between px-2.5 py-2 rounded-lg transition-colors text-[0.875rem] ${
                                                        isActive
                                                            ? 'text-primary font-semibold bg-surface-container-low'
                                                            : 'text-on-surface hover:bg-surface-container-low'
                                                    }`}
                                                >
                                                    <div className="flex items-center gap-2.5">
                                                        <span
                                                            className={`material-symbols-outlined text-[20px] ${
                                                                isActive ? 'text-primary' : 'text-outline group-hover:text-primary'
                                                            } transition-colors`}
                                                        >
                                                            {item.icon || 'folder'}
                                                        </span>
                                                        <span>{item.name}</span>
                                                    </div>
                                                    <span
                                                        className={`material-symbols-outlined text-[18px] text-outline transition-transform duration-200 ${
                                                            isSubmenuOpen ? 'rotate-180' : ''
                                                        }`}
                                                    >
                                                        expand_more
                                                    </span>
                                                </button>

                                                {isSubmenuOpen && (
                                                    <div className="space-y-1 pl-8 pr-1 pt-0.5">
                                                        {children.map((child: MenuItem) => {
                                                            const childHref = resolveHref(child.url);
                                                            const isChildActive = isCurrentRoute(child.url);

                                                            return (
                                                                <Link
                                                                    key={child.id || child.name}
                                                                    href={childHref}
                                                                    className={`block px-2.5 py-1.5 rounded-lg text-[0.8125rem] transition-colors ${
                                                                        isChildActive
                                                                            ? 'bg-primary-container/60 text-primary font-semibold'
                                                                            : 'text-on-surface-variant hover:bg-surface-container hover:text-on-surface'
                                                                    }`}
                                                                >
                                                                    {child.name}
                                                                </Link>
                                                            );
                                                        })}
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    }

                                    return (
                                        <Link
                                            key={item.id || item.name}
                                            href={href}
                                            className={`group flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-[0.875rem] transition-all ${
                                                isActive
                                                    ? 'bg-primary-container text-on-primary font-semibold shadow-xs'
                                                    : 'text-on-surface-variant hover:bg-surface-container hover:text-on-surface'
                                            }`}
                                        >
                                            <span
                                                className={`material-symbols-outlined text-[20px] ${
                                                    isActive
                                                        ? 'text-on-primary'
                                                        : 'text-outline group-hover:text-primary'
                                                } transition-colors`}
                                            >
                                                {item.icon || 'circle'}
                                            </span>
                                            <span>{item.name}</span>
                                        </Link>
                                    );
                                })}
                            </div>
                        ))}
                    </nav>
                </div>

                {/* Bottom User Card */}
                <div className="p-3 bg-surface-container-lowest border-t border-surface-container shadow-[0_-1px_6px_rgba(0,0,0,0.03)]">
                    <div className="flex items-center justify-between p-2 rounded-xl bg-surface-container-low">
                        <div className="flex items-center gap-2.5 min-w-0">
                            {user.avatar_url ? (
                                <img
                                    src={user.avatar_url}
                                    alt={user.name}
                                    className="h-9 w-9 rounded-full object-cover shrink-0 ring-1 ring-primary/20"
                                />
                            ) : (
                                <div className="h-9 w-9 rounded-full bg-primary flex items-center justify-center shrink-0 text-on-primary">
                                    <span className="material-symbols-outlined text-[18px]">person</span>
                                </div>
                            )}
                            <div className="min-w-0 flex-1">
                                <p className="text-[0.75rem] font-semibold text-on-surface truncate">
                                    {user.name}
                                </p>
                                <div className="flex items-center gap-1.5">
                                    <span className="h-1.5 w-1.5 rounded-full bg-primary shrink-0"></span>
                                    <span className="text-[0.6875rem] text-on-surface-variant truncate capitalize">
                                        {user.role || 'Superadmin'}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <button
                            type="button"
                            onClick={() => setShowLogoutConfirm(true)}
                            className="p-1.5 rounded-lg text-outline hover:text-error hover:bg-surface-container-high transition-colors"
                            title="Logout"
                        >
                            <span className="material-symbols-outlined text-[20px]">logout</span>
                        </button>
                    </div>
                </div>
            </aside>

            {/* Logout Confirm Modal */}
            <LogoutConfirmModal
                show={showLogoutConfirm}
                onClose={() => setShowLogoutConfirm(false)}
            />
        </>
    );
}
