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
        title: 'Main Menu',
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
        title: 'Administrasi',
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
                    className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-xs transition-opacity lg:hidden"
                />
            )}

            <aside
                className={`fixed top-0 left-0 z-50 flex h-screen w-70 flex-col bg-white dark:bg-slate-900 border-r border-slate-200/80 dark:border-slate-800 transition-transform duration-200 lg:translate-x-0 ${
                    isOpenMobile ? 'translate-x-0' : '-translate-x-full'
                }`}
            >
                {/* Brand Header */}
                <div className="flex h-16 items-center gap-3 px-6 border-b border-slate-100 dark:border-slate-800/80">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-teal-700 text-white font-bold text-sm shadow-xs">
                        W
                    </div>
                    <div className="flex flex-col min-w-0">
                        <span className="font-heading text-[1.05rem] font-bold tracking-tight text-slate-900 dark:text-slate-100 truncate">
                            WPU Course
                        </span>
                        <span className="text-[0.6875rem] font-medium text-slate-500 dark:text-slate-400 truncate">
                            Console • Admin &amp; Instruktur
                        </span>
                    </div>
                </div>

                {/* Navigation Links */}
                <div className="sidebar-scroll flex-1 overflow-y-auto px-3.5 py-4 space-y-5">
                    {MENU_SECTIONS.map((section) => (
                        <div key={section.title} className="space-y-1">
                            <div className="px-2.5 pb-1">
                                <span className="text-[0.6875rem] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                                    {section.title}
                                </span>
                            </div>

                            {section.items.map((item) => {
                                const hasChildren = item.children && item.children.length > 0;
                                const isActive = isCurrentRoute(item.path);
                                const isSubmenuOpen = openSubmenus[item.name];

                                if (hasChildren) {
                                    return (
                                        <div key={item.name} className="space-y-0.5">
                                            <button
                                                type="button"
                                                onClick={() => toggleSubmenu(item.name)}
                                                className="flex w-full items-center justify-between px-2.5 py-2 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-100/80 dark:hover:bg-slate-800/60 transition-colors text-[0.875rem] font-medium"
                                            >
                                                <div className="flex items-center gap-2.5">
                                                    <span className="material-symbols-outlined text-[19px] text-teal-700 dark:text-teal-400">
                                                        {item.icon}
                                                    </span>
                                                    <span>{item.name}</span>
                                                </div>
                                                <span
                                                    className={`material-symbols-outlined text-[17px] text-slate-400 transition-transform duration-200 ${
                                                        isSubmenuOpen ? 'rotate-180' : ''
                                                    }`}
                                                >
                                                    expand_more
                                                </span>
                                            </button>

                                            {isSubmenuOpen && (
                                                <div className="space-y-0.5 pl-8 pr-1 pt-0.5">
                                                    {item.children?.map((child) => (
                                                        <a
                                                            key={child.name}
                                                            href="#"
                                                            onClick={(e) => e.preventDefault()}
                                                            className="block px-2.5 py-1.5 rounded-md text-[0.8125rem] text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/80 hover:text-slate-900 dark:hover:text-slate-100 transition-colors font-normal"
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
                                        className={`group flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-[0.875rem] transition-all font-medium ${
                                            isActive
                                                ? 'bg-teal-700 text-white font-semibold shadow-xs'
                                                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100/80 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-slate-100'
                                        }`}
                                    >
                                        <span
                                            className={`material-symbols-outlined text-[19px] ${
                                                isActive
                                                    ? 'text-white'
                                                    : 'text-slate-400 group-hover:text-teal-700 dark:group-hover:text-teal-400'
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
                </div>

                {/* Bottom User Card */}
                <div className="p-3 border-t border-slate-100 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-900/50">
                    <div className="flex items-center justify-between p-2 rounded-xl bg-white dark:bg-slate-800/80 border border-slate-200/60 dark:border-slate-700/60 shadow-xs">
                        <div className="flex items-center gap-2.5 min-w-0">
                            {user.avatar_url ? (
                                <img
                                    src={user.avatar_url}
                                    alt={user.name}
                                    className="h-8.5 w-8.5 rounded-full object-cover shrink-0 ring-1 ring-slate-200 dark:ring-slate-700"
                                />
                            ) : (
                                <div className="h-8.5 w-8.5 rounded-full bg-teal-700 flex items-center justify-center shrink-0 text-white text-xs font-semibold">
                                    {user.name.charAt(0).toUpperCase()}
                                </div>
                            )}
                            <div className="min-w-0 flex-1">
                                <p className="text-[0.75rem] font-semibold text-slate-800 dark:text-slate-200 truncate">
                                    {user.name}
                                </p>
                                <div className="flex items-center gap-1.5">
                                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 shrink-0"></span>
                                    <span className="text-[0.6875rem] text-slate-500 dark:text-slate-400 truncate capitalize">
                                        {user.role || 'Superadmin'}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <Link
                            href={route('logout')}
                            method="post"
                            as="button"
                            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                            title="Logout"
                        >
                            <span className="material-symbols-outlined text-[19px]">logout</span>
                        </Link>
                    </div>
                </div>
            </aside>
        </>
    );
}
