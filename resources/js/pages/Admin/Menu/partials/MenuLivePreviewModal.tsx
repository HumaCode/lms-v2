import { MenuItem } from '@/types';
import React, { useState } from 'react';

interface MenuLivePreviewModalProps {
    show: boolean;
    onClose: () => void;
    menus: MenuItem[];
}

export default function MenuLivePreviewModal({ show, onClose, menus }: MenuLivePreviewModalProps) {
    const [previewDevice, setPreviewDevice] = useState<'desktop' | 'mobile'>('desktop');
    const [openMegamenuId, setOpenMegamenuId] = useState<string | null>(null);

    if (!show) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/70 backdrop-blur-xs transition-opacity animate-in fade-in duration-200">
            <div className="bg-surface-container-lowest border border-surface-container rounded-3xl w-full max-w-5xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden">
                {/* Modal Top Header */}
                <div className="px-6 py-4 border-b border-surface-container flex items-center justify-between bg-surface-container-low/40">
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                            <span className="material-symbols-outlined text-[20px]">visibility</span>
                        </div>
                        <div>
                            <h3 className="font-bold text-base text-on-surface">Pratinjau Navigasi Live</h3>
                            <p className="text-xs text-outline">Simulasi visual tampilan menu di website</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        {/* Device Selector */}
                        <div className="flex items-center bg-surface-container rounded-xl p-0.5 border border-surface-container-high">
                            <button
                                type="button"
                                onClick={() => setPreviewDevice('desktop')}
                                className={`px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                                    previewDevice === 'desktop'
                                        ? 'bg-surface-container-lowest text-primary shadow-xs'
                                        : 'text-outline hover:text-on-surface'
                                }`}
                            >
                                <span className="material-symbols-outlined text-[15px]">desktop_windows</span>
                                <span>Desktop</span>
                            </button>
                            <button
                                type="button"
                                onClick={() => setPreviewDevice('mobile')}
                                className={`px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                                    previewDevice === 'mobile'
                                        ? 'bg-surface-container-lowest text-primary shadow-xs'
                                        : 'text-outline hover:text-on-surface'
                                }`}
                            >
                                <span className="material-symbols-outlined text-[15px]">smartphone</span>
                                <span>Mobile</span>
                            </button>
                        </div>

                        <button
                            type="button"
                            onClick={onClose}
                            className="p-1.5 rounded-xl text-outline hover:text-on-surface hover:bg-surface-container transition-colors"
                        >
                            <span className="material-symbols-outlined text-[20px]">close</span>
                        </button>
                    </div>
                </div>

                {/* Simulated Web Canvas */}
                <div className="flex-1 overflow-y-auto p-6 bg-slate-100/60 dark:bg-slate-900/40">
                    <div
                        className={`mx-auto bg-white dark:bg-slate-900 rounded-2xl shadow-md border border-slate-200 dark:border-slate-800 overflow-hidden transition-all ${
                            previewDevice === 'desktop' ? 'w-full' : 'max-w-sm'
                        }`}
                    >
                        {/* Simulated Browser Bar */}
                        <div className="bg-slate-100 dark:bg-slate-800/80 px-4 py-2 flex items-center gap-2 border-b border-slate-200 dark:border-slate-700/60">
                            <span className="w-2.5 h-2.5 rounded-full bg-rose-400"></span>
                            <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
                            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
                            <div className="mx-auto px-6 py-0.5 rounded-md bg-white dark:bg-slate-900 text-[11px] text-slate-500 font-mono border border-slate-200 dark:border-slate-700">
                                https://wpu-course.id
                            </div>
                        </div>

                        {/* Topbar Navigation Bar Simulation */}
                        <header className="h-16 px-6 flex items-center justify-between border-b border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 sticky top-0 z-20">
                            <div className="flex items-center gap-6">
                                <div className="flex items-center gap-2 font-bold text-primary">
                                    <span className="w-7 h-7 rounded-lg bg-primary text-white flex items-center justify-center text-xs">
                                        W
                                    </span>
                                    <span className="text-slate-900 dark:text-white font-extrabold text-sm tracking-tight">
                                        WPU<span className="text-primary">Course</span>
                                    </span>
                                </div>

                                {previewDevice === 'desktop' && (
                                    <nav className="flex items-center gap-5">
                                        {menus.map((m) => {
                                            const subItems = m.sub_menus || m.subMenus || [];
                                            const isMegamenu = m.type === 'megamenu' && subItems.length > 0;
                                            const isOpen = openMegamenuId === m.id;

                                            return (
                                                <div key={m.id} className="relative">
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            isMegamenu
                                                                ? setOpenMegamenuId(isOpen ? null : m.id)
                                                                : undefined
                                                        }
                                                        className="flex items-center gap-1 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:text-primary transition-colors py-1"
                                                    >
                                                        <span>{m.name}</span>
                                                        {isMegamenu && (
                                                            <span
                                                                className={`material-symbols-outlined text-[15px] transition-transform ${
                                                                    isOpen ? 'rotate-180 text-primary' : 'text-slate-400'
                                                                }`}
                                                            >
                                                                expand_more
                                                            </span>
                                                        )}
                                                    </button>

                                                    {/* Megamenu Dropdown Simulation */}
                                                    {isMegamenu && isOpen && (
                                                        <div className="absolute left-0 top-full mt-2 w-[480px] bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-700 p-4 grid grid-cols-2 gap-3 z-30 animate-in fade-in duration-150">
                                                            {subItems.map((sub) => (
                                                                <div
                                                                    key={sub.id}
                                                                    className="p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700/60 transition-colors flex items-start gap-2.5 cursor-pointer"
                                                                >
                                                                    <div className="w-8 h-8 rounded-lg bg-teal-50 dark:bg-teal-950/60 text-primary flex items-center justify-center shrink-0 overflow-hidden">
                                                                        {(() => {
                                                                            const icon = (sub.icon || 'link').trim();
                                                                            if (icon.startsWith('bi-') || icon.startsWith('bi ') || icon.includes('-')) {
                                                                                const cleanName = icon.replace(/^bi(-|\s)+/, '');
                                                                                return <i className={`bi bi-${cleanName} text-[16px]`} />;
                                                                            }
                                                                            return <span className="material-symbols-outlined text-[17px]">{icon}</span>;
                                                                        })()}
                                                                    </div>
                                                                    <div className="min-w-0">
                                                                        <div className="flex items-center gap-1.5">
                                                                            <span className="font-semibold text-xs text-slate-900 dark:text-white truncate">
                                                                                {sub.name}
                                                                            </span>
                                                                            {sub.badge_label && (
                                                                                <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-200">
                                                                                    {sub.badge_label}
                                                                                </span>
                                                                            )}
                                                                        </div>
                                                                        <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2 mt-0.5">
                                                                            {sub.description || 'Akses modul pembelajaran'}
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>
                                            );
                                        })}
                                    </nav>
                                )}
                            </div>

                            <div className="flex items-center gap-2">
                                <button
                                    type="button"
                                    className="px-3 py-1.5 rounded-lg bg-primary text-white text-xs font-semibold shadow-xs"
                                >
                                    Masuk
                                </button>
                            </div>
                        </header>

                        {/* Page Body Placeholder */}
                        <div className="p-8 text-center bg-slate-50/50 dark:bg-slate-900/50">
                            <span className="material-symbols-outlined text-4xl text-slate-300 dark:text-slate-700">
                                dashboard
                            </span>
                            <h4 className="font-bold text-sm text-slate-800 dark:text-slate-200 mt-2">
                                Konten Halaman Web
                            </h4>
                            <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1">
                                Ini adalah simulasi visual bagaimana navigasi yang Anda susun akan tampil secara nyata kepada pengunjung dan member.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="px-6 py-3.5 border-t border-surface-container flex items-center justify-between bg-surface-container-low/40">
                    <span className="text-xs text-outline">
                        Menampilkan {menus.length} menu utama navigasi
                    </span>
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 rounded-xl bg-primary text-on-primary text-xs font-semibold hover:bg-primary-container transition-colors"
                    >
                        Tutup Pratinjau
                    </button>
                </div>
            </div>
        </div>
    );
}
