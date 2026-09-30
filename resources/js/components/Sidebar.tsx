import LogoutConfirmModal from '@/components/LogoutConfirmModal';
import { PageProps } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';

interface SidebarMenuChild {
    name: string;
    path: string;
}

interface SidebarMenuItem {
    name: string;
    path: string;
    icon: string;
    badge?: string;
    children?: SidebarMenuChild[];
}

interface SidebarSection {
    title: string;
    items: SidebarMenuItem[];
}

const MENU_SECTIONS: SidebarSection[] = [
    {
        title: 'MAIN MENU',
        items: [
            {
                name: 'Dashboard',
                path: 'dashboard',
                icon: 'grid_view',
            },
            {
                name: 'Pengguna',
                path: 'pengguna',
                icon: 'group',
            },
            {
                name: 'Kursus & Modul',
                path: 'kursus',
                icon: 'school',
                children: [
                    { name: 'Semua Kursus', path: 'kursus.index' },
                    { name: 'Buat Kursus Baru', path: 'kursus.create' },
                    { name: 'Kategori & Silabus', path: 'kursus.kategori' },
                ],
            },
            {
                name: 'Bootcamp',
                path: 'bootcamp',
                icon: 'code_blocks',
            },
            {
                name: 'E-Book',
                path: 'ebook',
                icon: 'menu_book',
            },
            {
                name: 'Blog & Artikel',
                path: 'blog',
                icon: 'article',
                children: [
                    { name: 'Semua Artikel', path: 'blog.index' },
                    { name: 'Tulis Artikel Baru', path: 'blog.create' },
                    { name: 'Kategori & Tag', path: 'blog.kategori' },
                    { name: 'Komentar & Diskusi', path: 'blog.komentar' },
                ],
            },
            {
                name: 'Tugas & Review Code',
                path: 'tugas',
                icon: 'terminal',
            },
            {
                name: 'Transaksi',
                path: 'transaksi',
                icon: 'payments',
            },
            {
                name: 'Sertifikat',
                path: 'sertifikat',
                icon: 'verified',
            },
        ],
    },
    {
        title: 'ADMINISTRASI',
        items: [
            {
                name: 'Manajemen Menu',
                path: 'admin.menus',
                icon: 'view_list',
            },
            {
                name: 'Role & Permission',
                path: 'admin.roles',
                icon: 'shield_person',
            },
            {
                name: 'Pengaturan',
                path: 'admin.settings',
                icon: 'settings',
            },
        ],
    },
];

interface SidebarProps {
    isOpenMobile: boolean;
    onCloseMobile: () => void;
}

export default function Sidebar({ isOpenMobile, onCloseMobile }: SidebarProps) {
    const user = usePage<PageProps>().props.auth.user;
    const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
    const [openSubmenus, setOpenSubmenus] = useState<Record<string, boolean>>({
        'Kursus & Modul': true,
        'Blog & Artikel': false,
    });

    const toggleSubmenu = (title: string) => {
        setOpenSubmenus((prev) => ({
            ...prev,
            [title]: !prev[title],
        }));
    };

    const isCurrentRoute = (path: string) => {
        try {
            return route().current(path) || (path === 'dashboard' && route().current('dashboard'));
        } catch {
            return path === 'dashboard';
        }
    };

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
                        {MENU_SECTIONS.map((section) => (
                            <div key={section.title} className="space-y-1">
                                <div className="px-2 pt-3 pb-1">
                                    <span className="text-[0.6875rem] font-semibold uppercase tracking-wider text-outline">
                                        {section.title}
                                    </span>
                                </div>

                                {section.items.map((item) => {
                                    const hasChildren = item.children && item.children.length > 0;
                                    const isActive = isCurrentRoute(item.path);
                                    const isSubmenuOpen = openSubmenus[item.name];

                                    if (hasChildren) {
                                        return (
                                            <div key={item.name} className="space-y-1">
                                                <button
                                                    type="button"
                                                    onClick={() => toggleSubmenu(item.name)}
                                                    className="flex w-full items-center justify-between px-2.5 py-2 rounded-lg text-on-surface hover:bg-surface-container-low transition-colors text-[0.875rem]"
                                                >
                                                    <div className="flex items-center gap-2.5">
                                                        <span className="material-symbols-outlined text-[20px] text-primary">
                                                            {item.icon}
                                                        </span>
                                                        <span className="font-semibold">{item.name}</span>
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
                                                        {item.children?.map((child) => (
                                                            <a
                                                                key={child.name}
                                                                href="#"
                                                                onClick={(e) => e.preventDefault()}
                                                                className="block px-2.5 py-1.5 rounded-lg text-[0.8125rem] text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors"
                                                            >
                                                                {child.name}
                                                            </a>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    }

                                    return (
                                        <Link
                                            key={item.name}
                                            href={item.path === 'dashboard' ? route('dashboard') : '#'}
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
                                                {item.icon}
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
