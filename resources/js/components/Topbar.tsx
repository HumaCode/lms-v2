import Dropdown from '@/components/Dropdown';
import { toggleDarkMode } from '@/global';
import { PageProps } from '@/types';
import { Link, usePage } from '@inertiajs/react';

interface TopbarProps {
    onToggleMobileSidebar: () => void;
    breadcrumbParent?: string;
    breadcrumbCurrent?: string;
}

export default function Topbar({
    onToggleMobileSidebar,
    breadcrumbParent = 'Admin Console',
    breadcrumbCurrent = 'Dashboard Utama',
}: TopbarProps) {
    const user = usePage<PageProps>().props.auth.user;

    return (
        <header className="fixed top-0 left-0 lg:left-70 right-0 h-16 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md z-40 border-b border-slate-200/80 dark:border-slate-800 shadow-[0_1px_2px_rgba(0,0,0,0.02)] transition-all">
            <div className="w-full max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
                {/* Left: Mobile Toggle & Breadcrumbs */}
                <div className="flex items-center gap-3">
                <button
                    type="button"
                    onClick={onToggleMobileSidebar}
                    className="p-1.5 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 lg:hidden"
                    aria-label="Toggle menu"
                >
                    <span className="material-symbols-outlined text-[22px]">menu</span>
                </button>

                <div className="hidden sm:flex items-center gap-2 text-[0.8125rem] text-slate-500 dark:text-slate-400 font-medium">
                    <span className="text-slate-400 dark:text-slate-500">{breadcrumbParent}</span>
                    <span className="text-slate-300 dark:text-slate-600">/</span>
                    <span className="text-slate-900 dark:text-slate-200 font-semibold">{breadcrumbCurrent}</span>
                </div>
            </div>

            {/* Center: Search Field */}
            <div className="flex-1 max-w-md mx-2 sm:mx-4">
                <div className="relative flex items-center w-full">
                    <span className="material-symbols-outlined absolute left-3 text-[18px] text-slate-400 pointer-events-none">
                        search
                    </span>
                    <input
                        type="text"
                        placeholder="Cari metrik, transaksi, kursus..."
                        className="w-full pl-9 pr-4 py-1.5 bg-slate-50 dark:bg-slate-800/80 text-slate-800 dark:text-slate-200 placeholder:text-slate-400 rounded-lg text-[0.8125rem] border border-slate-200 dark:border-slate-700/80 focus:outline-none focus:ring-1 focus:ring-teal-600 focus:border-teal-600 transition-all shadow-2xs"
                    />
                </div>
            </div>

            {/* Right: Quick actions & Profile */}
            <div className="flex items-center gap-1.5 sm:gap-2.5">
                <button
                    type="button"
                    onClick={toggleDarkMode}
                    className="p-2 rounded-lg text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                    title="Ganti Tema"
                >
                    <span className="material-symbols-outlined text-[20px]">light_mode</span>
                </button>

                <button
                    type="button"
                    className="relative p-2 rounded-lg text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                    title="Notifikasi"
                >
                    <span className="material-symbols-outlined text-[20px]">notifications</span>
                    <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-rose-500 ring-2 ring-white dark:ring-slate-900"></span>
                </button>

                <div className="hidden sm:block h-5 w-px bg-slate-200 dark:bg-slate-800 mx-1"></div>

                {/* Profile menu dropdown */}
                <Dropdown>
                    <Dropdown.Trigger>
                        <button
                            type="button"
                            className="flex items-center gap-2.5 pl-1.5 pr-2 py-1 rounded-lg hover:bg-slate-100/80 dark:hover:bg-slate-800/70 transition-colors text-left"
                        >
                            {user.avatar_url ? (
                                <img
                                    src={user.avatar_url}
                                    alt={user.name}
                                    className="h-8 w-8 rounded-full object-cover ring-1 ring-slate-200 dark:ring-slate-700 shrink-0"
                                />
                            ) : (
                                <div className="h-8 w-8 rounded-full bg-teal-700 flex items-center justify-center text-white text-xs font-semibold shrink-0">
                                    {user.name.charAt(0).toUpperCase()}
                                </div>
                            )}

                            <div className="hidden md:block">
                                <span className="block text-[0.8125rem] font-semibold text-slate-800 dark:text-slate-200 leading-tight truncate max-w-[120px]">
                                    {user.name}
                                </span>
                                <span className="block text-[0.6875rem] text-slate-500 dark:text-slate-400 capitalize truncate">
                                    {user.role || 'Superadmin'}
                                </span>
                            </div>

                            <span className="material-symbols-outlined text-[16px] text-slate-400 hidden md:block">
                                expand_more
                            </span>
                        </button>
                    </Dropdown.Trigger>

                    <Dropdown.Content align="right" width="48">
                        <Dropdown.Link href={route('profile.edit')}>
                            Profil Akun
                        </Dropdown.Link>
                        <Dropdown.Link href={route('logout')} method="post" as="button">
                            Keluar
                        </Dropdown.Link>
                    </Dropdown.Content>
                </Dropdown>
            </div>
            </div>
        </header>
    );
}
