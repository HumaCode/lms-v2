import Dropdown from '@/components/Dropdown';
import LogoutConfirmModal from '@/components/LogoutConfirmModal';
import { toggleDarkMode } from '@/global';
import { PageProps } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';

interface TopbarProps {
    onToggleMobileSidebar: () => void;
    breadcrumbParent?: string;
    breadcrumbCurrent?: string;
}

export default function Topbar({
    onToggleMobileSidebar,
    breadcrumbParent = 'ADMIN CONSOLE',
    breadcrumbCurrent = 'DASHBOARD UTAMA',
}: TopbarProps) {
    const user = usePage<PageProps>().props?.auth?.user ?? {};
    const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

    return (
        <>
            <header className="fixed top-0 left-0 lg:left-72 right-0 h-16 bg-surface/80 backdrop-blur-xl z-40 border-b border-surface-container-high shadow-[0_1px_8px_rgba(0,0,0,0.04)] px-5 sm:px-6 lg:px-8 flex items-center justify-between gap-4 transition-all">
                {/* Left: Mobile Toggle & Breadcrumbs */}
                <div className="flex items-center gap-3">
                    <button
                        type="button"
                        onClick={onToggleMobileSidebar}
                        className="p-2 rounded-lg text-on-surface-variant hover:bg-surface-container lg:hidden"
                        aria-label="Toggle menu"
                    >
                        <span className="material-symbols-outlined text-[24px]">menu</span>
                    </button>

                    <div className="hidden sm:flex items-center gap-2 text-[0.75rem] font-medium tracking-wide">
                        <span className="font-semibold text-outline">{breadcrumbParent}</span>
                        <span className="text-outline">/</span>
                        <span className="font-semibold text-primary">{breadcrumbCurrent}</span>
                    </div>
                </div>

                {/* Center: Search Field */}
                <div className="flex-1 max-w-md mx-2 sm:mx-4">
                    <div className="relative flex items-center w-full">
                        <span className="material-symbols-outlined absolute left-3 text-[18px] text-outline pointer-events-none">
                            search
                        </span>
                        <input
                            type="text"
                            placeholder="Cari metrik, pengguna, transaksi, kursus..."
                            className="w-full pl-9 pr-4 py-2 bg-surface-container-lowest text-on-surface placeholder:text-outline rounded-lg text-[0.8125rem] focus:outline-none focus:ring-2 focus:ring-primary shadow-[0_1px_3px_rgba(0,0,0,0.02)] transition-all border border-surface-container"
                        />
                    </div>
                </div>

                {/* Right: Quick actions & Profile */}
                <div className="flex items-center gap-2 sm:gap-3">
                    <button
                        type="button"
                        onClick={toggleDarkMode}
                        className="p-2 rounded-lg text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors"
                        title="Ganti Tema"
                    >
                        <span className="material-symbols-outlined text-[20px]">light_mode</span>
                    </button>

                    <button
                        type="button"
                        className="relative p-2 rounded-lg text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors"
                        title="Notifikasi"
                    >
                        <span className="material-symbols-outlined text-[20px]">notifications</span>
                        <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-error ring-2 ring-surface"></span>
                    </button>

                    <div className="hidden sm:block h-6 w-px bg-outline-variant/30 mx-1"></div>

                    {/* Profile menu dropdown */}
                    <Dropdown>
                        <Dropdown.Trigger>
                            <button
                                type="button"
                                className="flex items-center gap-2.5 pl-1.5 pr-2 py-1 rounded-lg hover:bg-surface-container-low transition-colors text-left group"
                            >
                                {user.avatar_url ? (
                                    <img
                                        src={user.avatar_url}
                                        alt={user.name}
                                        className="h-8.5 w-8.5 rounded-full object-cover ring-2 ring-primary/20 shrink-0"
                                    />
                                ) : (
                                    <div className="h-8.5 w-8.5 rounded-full bg-primary flex items-center justify-center text-on-primary font-semibold text-xs shrink-0 shadow-xs">
                                        {user.name.charAt(0).toUpperCase()}
                                    </div>
                                )}

                                <div className="hidden md:block">
                                    <span className="block text-[0.8125rem] font-semibold text-on-surface leading-tight truncate max-w-[120px]">
                                        {user.name}
                                    </span>
                                    <span className="block text-[0.6875rem] text-on-surface-variant capitalize truncate">
                                        {user.role || 'Superadmin'}
                                    </span>
                                </div>

                                <span className="material-symbols-outlined text-[18px] text-outline group-hover:text-on-surface transition-colors hidden md:block">
                                    expand_more
                                </span>
                            </button>
                        </Dropdown.Trigger>

                        <Dropdown.Content align="right" width="64" contentClasses="p-1.5 bg-white divide-y divide-surface-container">
                            {/* User Header Summary */}
                            <div className="px-3 py-2.5 mb-1 bg-surface-container-low/50 rounded-lg">
                                <p className="text-[0.8125rem] font-bold text-on-surface truncate">
                                    {user.name}
                                </p>
                                <p className="text-[0.6875rem] text-on-surface-variant truncate">
                                    {user.email}
                                </p>
                                <div className="mt-1.5 inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-secondary-container/60 text-on-secondary-container text-[0.6875rem] font-semibold">
                                    <span className="h-1.5 w-1.5 rounded-full bg-primary"></span>
                                    <span className="capitalize">{user.role || 'Superadmin'}</span>
                                </div>
                            </div>

                            {/* Main Navigation Items */}
                            <div className="py-1 space-y-0.5">
                                <Dropdown.Link
                                    href={route('profile.edit')}
                                    className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-[0.8125rem] font-medium text-on-surface hover:bg-surface-container-low hover:text-primary transition-colors group"
                                >
                                    <span className="material-symbols-outlined text-[19px] text-outline group-hover:text-primary transition-colors">
                                        person
                                    </span>
                                    <span>Profil Akun</span>
                                </Dropdown.Link>

                                <Dropdown.Link
                                    href="#"
                                    onClick={(e) => e.preventDefault()}
                                    className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-[0.8125rem] font-medium text-on-surface hover:bg-surface-container-low hover:text-primary transition-colors group"
                                >
                                    <span className="material-symbols-outlined text-[19px] text-outline group-hover:text-primary transition-colors">
                                        settings
                                    </span>
                                    <span>Pengaturan</span>
                                </Dropdown.Link>
                            </div>

                            {/* Logout Action */}
                            <div className="pt-1 mt-1">
                                <button
                                    type="button"
                                    onClick={() => setShowLogoutConfirm(true)}
                                    className="flex w-full items-center gap-2.5 px-3 py-2 rounded-lg text-[0.8125rem] font-medium text-error hover:bg-error-container/40 transition-colors group text-left"
                                >
                                    <span className="material-symbols-outlined text-[19px] text-error">
                                        logout
                                    </span>
                                    <span>Keluar</span>
                                </button>
                            </div>
                        </Dropdown.Content>
                    </Dropdown>
                </div>
            </header>

            {/* Interactive Logout Confirm Modal */}
            <LogoutConfirmModal
                show={showLogoutConfirm}
                onClose={() => setShowLogoutConfirm(false)}
            />
        </>
    );
}
