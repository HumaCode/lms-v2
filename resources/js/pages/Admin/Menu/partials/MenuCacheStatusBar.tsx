import { MenuItem, MenuMetrics } from '@/types';
import React, { useState } from 'react';

interface MenuCacheStatusBarProps {
    metrics: MenuMetrics;
    allMenus: MenuItem[];
    onPurgeCache: () => void;
    isPurging: boolean;
}

export default function MenuCacheStatusBar({
    metrics,
    allMenus,
    onPurgeCache,
    isPurging,
}: MenuCacheStatusBarProps) {
    const [downloading, setDownloading] = useState(false);

    const handleExportJson = () => {
        setDownloading(true);
        try {
            const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(allMenus, null, 2));
            const downloadAnchor = document.createElement('a');
            downloadAnchor.setAttribute('href', dataStr);
            downloadAnchor.setAttribute('download', `wpu_navigation_schema_${Date.now()}.json`);
            document.body.appendChild(downloadAnchor);
            downloadAnchor.click();
            downloadAnchor.remove();
        } finally {
            setTimeout(() => setDownloading(false), 500);
        }
    };

    return (
        <div className="mt-8 bg-surface-container-lowest rounded-2xl p-5 sm:p-6 shadow-2xs border border-surface-container flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-secondary-container/40 text-on-secondary-container flex items-center justify-center shrink-0 border border-secondary/20">
                    <span className="material-symbols-outlined text-2xl text-secondary">cloud_sync</span>
                </div>
                <div>
                    <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-bold text-sm sm:text-base text-on-surface">
                            Status Cache Navigasi Edge &amp; CDN
                        </span>
                        <span className="bg-emerald-50 text-emerald-700 border border-emerald-200/80 px-2.5 py-0.5 rounded-full text-[11px] font-bold">
                            Tersinkronisasi
                        </span>
                    </div>
                    <p className="text-xs text-outline mt-0.5">
                        Terakhir diperbarui oleh{' '}
                        <strong className="text-on-surface font-semibold">
                            {metrics?.last_purged_by || 'Humaidi Zakaria (Superadmin)'}
                        </strong>
                        . Perubahan diterapkan ke seluruh server edge CDN.
                    </p>
                </div>
            </div>

            <div className="flex items-center gap-2.5 w-full lg:w-auto justify-end">
                <button
                    type="button"
                    onClick={handleExportJson}
                    disabled={downloading}
                    className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-surface-container-low text-on-surface hover:bg-surface-container border border-surface-container-high font-semibold text-xs sm:text-sm transition-all hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
                >
                    <span className="material-symbols-outlined text-[18px]">download</span>
                    <span>{downloading ? 'Mengunduh...' : 'Export JSON Schema'}</span>
                </button>

                <button
                    type="button"
                    onClick={onPurgeCache}
                    disabled={isPurging}
                    className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-secondary-container text-on-secondary-container hover:bg-secondary-fixed border border-secondary-container font-semibold text-xs sm:text-sm transition-all shadow-2xs hover:shadow-xs hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 cursor-pointer"
                >
                    <span className={`material-symbols-outlined text-[18px] ${isPurging ? 'animate-spin' : ''}`}>
                        {isPurging ? 'refresh' : 'bolt'}
                    </span>
                    <span>{isPurging ? 'Membersihkan Cache...' : 'Bersihkan Cache Menu (Purge CDN)'}</span>
                </button>
            </div>
        </div>
    );
}
