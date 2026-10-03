import { MenuMetrics } from '@/types';
import React from 'react';

export type CategoryKey = string;

interface MenuCategoryTabsProps {
    activeCategory: CategoryKey;
    onSelectCategory: (cat: CategoryKey) => void;
    metrics: MenuMetrics;
    searchQuery: string;
    onSearchChange: (q: string) => void;
    onExpandAll: () => void;
    onCollapseAll: () => void;
    onSaveOrder: () => void;
    isOrderDirty: boolean;
    isSavingOrder: boolean;
    availableCategories?: string[];
}

export default function MenuCategoryTabs({
    activeCategory,
    onSelectCategory,
    metrics,
    searchQuery,
    onSearchChange,
    onExpandAll,
    onCollapseAll,
    onSaveOrder,
    isOrderDirty,
    isSavingOrder,
    availableCategories,
}: MenuCategoryTabsProps) {
    const standardCategories: Array<{
        key: CategoryKey;
        label: string;
        icon: string;
        count: number;
    }> = [
        {
            key: 'all',
            label: 'Semua Menu',
            icon: 'apps',
            count: metrics?.all ?? metrics?.total ?? 0,
        },
        {
            key: 'MAIN MENU',
            label: 'Main Menu',
            icon: 'dashboard_customize',
            count: metrics?.category_counts?.['MAIN MENU'] ?? metrics?.sidebar_member ?? 0,
        },
        {
            key: 'ADMINISTRASI',
            label: 'Administrasi',
            icon: 'admin_panel_settings',
            count: metrics?.category_counts?.['ADMINISTRASI'] ?? metrics?.sidebar_admin ?? 0,
        },
    ];

    // Check for any additional categories from DB
    const extraCategories: Array<{
        key: CategoryKey;
        label: string;
        icon: string;
        count: number;
    }> = [];

    const existingKeys = new Set(standardCategories.map((c) => c.key));

    if (metrics?.category_counts) {
        Object.entries(metrics.category_counts).forEach(([catName, count]) => {
            if (!existingKeys.has(catName)) {
                let icon = 'folder';
                if (catName === 'TOPBAR UTAMA') icon = 'web';
                if (catName === 'FOOTER LINK') icon = 'dock_to_bottom';
                extraCategories.push({
                    key: catName,
                    label: catName,
                    icon,
                    count,
                });
                existingKeys.add(catName);
            }
        });
    }

    if (availableCategories) {
        availableCategories.forEach((catName) => {
            if (!existingKeys.has(catName)) {
                extraCategories.push({
                    key: catName,
                    label: catName,
                    icon: 'folder',
                    count: metrics?.category_counts?.[catName] ?? 0,
                });
                existingKeys.add(catName);
            }
        });
    }

    const tabs = [...standardCategories, ...extraCategories];

    return (
        <div className="bg-surface-container-lowest rounded-2xl p-4 shadow-2xs border border-surface-container flex flex-col gap-4">
            {/* Horizontal Area Category Tabs */}
            <div className="flex flex-wrap items-center gap-2">
                {tabs.map((tab) => {
                    const isActive = activeCategory === tab.key;
                    return (
                        <button
                            key={tab.key}
                            type="button"
                            onClick={() => onSelectCategory(tab.key)}
                            className={`inline-flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl font-semibold text-xs sm:text-sm transition-all cursor-pointer ${
                                isActive
                                    ? 'bg-primary text-on-primary shadow-sm shadow-primary/20 scale-[1.01]'
                                    : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container hover:text-on-surface border border-transparent'
                            }`}
                        >
                            <span className="material-symbols-outlined text-[18px]">{tab.icon}</span>
                            <span>{tab.label}</span>
                            <span
                                className={`px-2 py-0.5 rounded-full text-[11px] font-bold ${
                                    isActive
                                        ? 'bg-primary-container text-on-primary-container'
                                        : 'bg-surface-container-high text-on-surface'
                                }`}
                            >
                                {tab.count}
                            </span>
                        </button>
                    );
                })}
            </div>

            {/* Search Input & Tree Quick Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 border-t border-surface-container/60">
                <div className="relative w-full sm:w-80">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-outline">
                        <span className="material-symbols-outlined text-[18px]">search</span>
                    </span>
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => onSearchChange(e.target.value)}
                        placeholder="Cari label menu, route URL, permission..."
                        className="w-full pl-9 pr-3 py-2 rounded-xl bg-surface-container-low text-on-surface placeholder:text-outline text-xs sm:text-sm focus:outline-none focus:bg-surface-container-lowest focus:ring-1 focus:ring-primary border border-surface-container-high transition-all"
                    />
                    {searchQuery && (
                        <button
                            type="button"
                            onClick={() => onSearchChange('')}
                            className="absolute inset-y-0 right-0 pr-2.5 flex items-center text-outline hover:text-on-surface"
                        >
                            <span className="material-symbols-outlined text-[16px]">cancel</span>
                        </button>
                    )}
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                    <button
                        type="button"
                        onClick={onExpandAll}
                        className="px-2.5 py-1.5 rounded-lg text-on-surface-variant hover:bg-surface-container-low text-xs font-medium transition-colors cursor-pointer"
                    >
                        Ekspansi Semua
                    </button>
                    <span className="text-outline text-xs">/</span>
                    <button
                        type="button"
                        onClick={onCollapseAll}
                        className="px-2.5 py-1.5 rounded-lg text-on-surface-variant hover:bg-surface-container-low text-xs font-medium transition-colors cursor-pointer"
                    >
                        Ciutkan
                    </button>

                    <button
                        type="button"
                        onClick={onSaveOrder}
                        disabled={!isOrderDirty || isSavingOrder}
                        className={`ml-2 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl font-semibold text-xs transition-all shadow-2xs ${
                            isOrderDirty
                                ? 'bg-secondary text-white hover:bg-secondary/90 shadow-secondary/20 scale-[1.02] cursor-pointer'
                                : 'bg-surface-container-high text-outline cursor-not-allowed opacity-70'
                        }`}
                    >
                        <span
                            className={`material-symbols-outlined text-[15px] ${isSavingOrder ? 'animate-spin' : ''}`}
                        >
                            {isSavingOrder ? 'refresh' : 'swap_vert'}
                        </span>
                        <span>{isSavingOrder ? 'Menyimpan...' : 'Simpan Urutan'}</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
