import { MenuItem } from '@/types';
import React from 'react';

interface MenuTreeProps {
    menus: MenuItem[];
    selectedMenuId: string | null;
    expandedParents: Record<string, boolean>;
    isLoading?: boolean;
    onToggleExpand: (menuId: string) => void;
    onSelectMenu: (menu: MenuItem) => void;
    onAddSubmenu: (parentMenu: MenuItem) => void;
    onToggleActive: (menu: MenuItem) => void;
    onDeleteMenu: (menu: MenuItem) => void;
    onMoveUp: (menuId: string, parentId?: string | null) => void;
    onMoveDown: (menuId: string, parentId?: string | null) => void;
    canUpdate: boolean;
    canDelete: boolean;
    canCreate: boolean;
}

export default function MenuTree({
    menus,
    selectedMenuId,
    expandedParents,
    isLoading = false,
    onToggleExpand,
    onSelectMenu,
    onAddSubmenu,
    onToggleActive,
    onDeleteMenu,
    onMoveUp,
    onMoveDown,
    canUpdate,
    canDelete,
    canCreate,
}: MenuTreeProps) {
    const isEmpty = !menus || menus.length === 0;

    const renderRolesBadge = (roles?: string[]) => {
        if (!roles || roles.length === 0 || roles.includes('public')) {
            return (
                <span className="bg-surface-container text-on-surface px-2.5 py-0.5 rounded-full text-[11px] font-medium">
                    Semua Publik
                </span>
            );
        }
        if (roles.includes('student') && roles.includes('instructor')) {
            return (
                <span className="bg-secondary-container/40 text-on-secondary-container px-2.5 py-0.5 rounded-full text-[11px] font-semibold">
                    Publik &amp; Member
                </span>
            );
        }
        if (roles.includes('student')) {
            return (
                <span className="bg-primary/10 text-primary px-2.5 py-0.5 rounded-full text-[11px] font-semibold">
                    Member Khusus
                </span>
            );
        }
        return (
            <span className="bg-surface-container-high text-on-surface-variant px-2.5 py-0.5 rounded-full text-[11px] font-medium">
                Admin / HR
            </span>
        );
    };

    const renderBadgeTag = (label?: string | null, color?: string | null) => {
        if (!label) return null;
        let colorClasses = 'bg-primary-fixed text-on-primary-fixed-variant';
        if (color === 'secondary') colorClasses = 'bg-secondary-fixed text-on-secondary-fixed-variant';
        if (color === 'error' || color === 'rose') colorClasses = 'bg-rose-100 text-rose-700';
        if (color === 'tertiary' || color === 'amber') colorClasses = 'bg-amber-100 text-amber-800';

        return (
            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${colorClasses}`}>
                {label}
            </span>
        );
    };

    const renderMenuIcon = (iconName?: string | null, defaultIcon = 'link', className = 'text-[17px]') => {
        const icon = (iconName || defaultIcon).trim();

        // Check if it is a Bootstrap Icon
        const isBs =
            icon.startsWith('bi-') ||
            icon.startsWith('bi ') ||
            icon.includes('-') ||
            ['award', 'book', 'gear', 'bell', 'tools', 'server', 'database', 'film', 'image', 'mic', 'people', 'share', 'lock'].includes(icon);

        if (isBs) {
            const cleanBsName = icon.replace(/^bi(-|\s)+/, '');
            return <i className={`bi bi-${cleanBsName} ${className}`} />;
        }

        return <span className={`material-symbols-outlined ${className}`}>{icon}</span>;
    };

    return (
        <div className="relative min-h-[160px]">
            {isLoading && (
                <div className="absolute inset-0 bg-surface/50 backdrop-blur-[1px] flex items-center justify-center z-20 rounded-2xl min-h-[180px]">
                    <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-surface-container-lowest shadow-md border border-surface-container text-xs font-semibold text-primary">
                        <span className="material-symbols-outlined text-[18px] animate-spin">
                            progress_activity
                        </span>
                        <span>Memuat data...</span>
                    </div>
                </div>
            )}

            {isEmpty ? (
                <div className="bg-surface-container-lowest rounded-2xl p-12 text-center border border-surface-container shadow-2xs">
                    <div className="w-14 h-14 rounded-2xl bg-surface-container flex items-center justify-center text-outline mx-auto mb-3">
                        <span className="material-symbols-outlined text-3xl">menu_open</span>
                    </div>
                    <h3 className="font-semibold text-base text-on-surface">Belum Ada Menu di Kategori Ini</h3>
                    <p className="text-xs sm:text-sm text-outline max-w-sm mx-auto mt-1">
                        Silakan klik tombol <strong>Tambah Menu Baru</strong> di sebelah kanan atas untuk mulai membuat struktur navigasi.
                    </p>
                </div>
            ) : (
                <div className="bg-surface-container-lowest rounded-2xl p-5 shadow-2xs border border-surface-container space-y-4">
                    {menus.map((item, index) => {
                const subItems = Array.isArray(item.sub_menus)
                    ? item.sub_menus
                    : Array.isArray(item.subMenus)
                    ? item.subMenus
                    : [];
                const hasSub = subItems.length > 0;
                const isExpanded = expandedParents[item.id] !== false; // expanded by default
                const isSelected = selectedMenuId === item.id;
                const isMegamenu = item.type === 'megamenu';

                return (
                    <div
                        key={item.id}
                        className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                            isSelected
                                ? 'bg-primary/5 border-primary shadow-xs ring-1 ring-primary/30'
                                : 'bg-surface-container-lowest hover:bg-surface-container-low/40 border-surface-container'
                        }`}
                    >
                        {/* Parent Row (Level 1) */}
                        <div className="p-3.5 sm:p-4 flex flex-col md:flex-row md:items-center justify-between gap-3 group">
                            {/* Left: Drag Handle, Icon, Details */}
                            <div className="flex items-center gap-3 min-w-0 flex-1">
                                {/* Up / Down Order Buttons */}
                                <div className="flex flex-col items-center gap-0.5 shrink-0">
                                    <button
                                        type="button"
                                        title="Pindah ke Atas"
                                        disabled={index === 0}
                                        onClick={() => onMoveUp(item.id, null)}
                                        className="p-0.5 rounded text-outline hover:text-primary hover:bg-surface-container disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
                                    >
                                        <span className="material-symbols-outlined text-[14px]">arrow_upward</span>
                                    </button>
                                    <button
                                        type="button"
                                        title="Pindah ke Bawah"
                                        disabled={index === menus.length - 1}
                                        onClick={() => onMoveDown(item.id, null)}
                                        className="p-0.5 rounded text-outline hover:text-primary hover:bg-surface-container disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
                                    >
                                        <span className="material-symbols-outlined text-[14px]">arrow_downward</span>
                                    </button>
                                </div>

                                {/* Expand / Collapse chevron toggle if hasSub */}
                                {hasSub ? (
                                    <button
                                        type="button"
                                        onClick={() => onToggleExpand(item.id)}
                                        className="w-7 h-7 rounded-lg flex items-center justify-center text-outline hover:text-primary hover:bg-surface-container transition-all cursor-pointer shrink-0"
                                        title={isExpanded ? 'Ciutkan Submenu' : 'Buka Submenu'}
                                    >
                                        <span
                                            className={`material-symbols-outlined text-[20px] transition-transform duration-200 ${
                                                isExpanded ? 'rotate-90 text-primary' : ''
                                            }`}
                                        >
                                            chevron_right
                                        </span>
                                    </button>
                                ) : (
                                    <div className="w-2 shrink-0"></div>
                                )}

                                {/* Menu Icon */}
                                <div
                                    className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 shadow-2xs border overflow-hidden ${
                                        isMegamenu
                                            ? 'bg-primary-container text-on-primary-container border-primary/20'
                                            : 'bg-surface-container text-primary border-surface-container-high'
                                    }`}
                                >
                                    {renderMenuIcon(item.icon, 'link', 'text-[18px]')}
                                </div>

                                {/* Label & Meta */}
                                <div className="min-w-0 flex-1">
                                    <div className="flex items-center gap-2 flex-wrap">
                                        <span
                                            onClick={() => onSelectMenu(item)}
                                            className="font-bold text-sm text-on-surface hover:text-primary cursor-pointer truncate"
                                        >
                                            {item.name}
                                        </span>

                                        {hasSub && (
                                            <span
                                                onClick={() => onToggleExpand(item.id)}
                                                className="bg-primary/10 text-primary hover:bg-primary/20 transition-colors px-2 py-0.5 rounded-full text-[11px] font-bold cursor-pointer inline-flex items-center gap-1 shrink-0"
                                                title="Klik untuk buka/tutup submenu"
                                            >
                                                <i className="bi bi-arrow-return-right text-[11px]" />
                                                <span>{subItems.length} Submenu</span>
                                            </span>
                                        )}

                                        {item.category && (
                                            <span className="bg-surface-container-high/80 text-on-surface-variant px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider shrink-0">
                                                {item.category}
                                            </span>
                                        )}

                                        {isMegamenu && (
                                            <span className="bg-secondary-container text-on-secondary-container px-2 py-0.5 rounded-full text-[11px] font-semibold shrink-0">
                                                Mega Menu
                                            </span>
                                        )}

                                        {renderBadgeTag(item.badge_label, item.badge_color)}

                                        <span className="bg-surface-container px-1.5 py-0.5 rounded text-outline font-mono text-[11px] truncate max-w-[150px] shrink-0">
                                            /{item.url?.replace(/^\//, '')}
                                        </span>
                                    </div>

                                    {item.description && (
                                        <p className="text-xs text-on-surface-variant truncate mt-0.5">
                                            {item.description}
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* Right: Roles Badge, Active Switch, Quick Actions */}
                            <div className="flex items-center justify-between md:justify-end gap-3 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-surface-container">
                                {renderRolesBadge(item.roles)}

                                {/* Active Toggle Switch */}
                                <div
                                    onClick={() => canUpdate && onToggleActive(item)}
                                    title={item.active ? 'Menu Aktif' : 'Menu Nonaktif'}
                                    className={`w-9 h-5 rounded-full relative p-0.5 cursor-pointer flex items-center transition-colors ${
                                        item.active ? 'bg-primary justify-end' : 'bg-surface-container-high justify-start'
                                    } ${!canUpdate ? 'opacity-50 pointer-events-none' : ''}`}
                                >
                                    <div className="w-4 h-4 bg-white rounded-full shadow-sm"></div>
                                </div>

                                {/* Actions: Expand Toggle (if has sub), Add Submenu, Edit, Delete */}
                                <div className="flex items-center gap-1">
                                    {hasSub && (
                                        <button
                                            type="button"
                                            onClick={() => onToggleExpand(item.id)}
                                            className="p-1.5 text-outline hover:text-primary rounded-lg hover:bg-surface-container transition-colors cursor-pointer"
                                            title={isExpanded ? 'Ciutkan Submenu' : 'Buka Submenu'}
                                        >
                                            <span className="material-symbols-outlined text-[17px]">
                                                {isExpanded ? 'expand_less' : 'expand_more'}
                                            </span>
                                        </button>
                                    )}

                                    {canCreate && (
                                        <button
                                            type="button"
                                            onClick={() => onAddSubmenu(item)}
                                            className="p-1.5 text-outline hover:text-primary rounded-lg hover:bg-surface-container transition-colors cursor-pointer"
                                            title="Tambah Submenu"
                                        >
                                            <span className="material-symbols-outlined text-[17px]">add_circle</span>
                                        </button>
                                    )}

                                    {canUpdate && (
                                        <button
                                            type="button"
                                            onClick={() => onSelectMenu(item)}
                                            className="p-1.5 text-outline hover:text-primary rounded-lg hover:bg-surface-container transition-colors cursor-pointer"
                                            title="Edit Menu"
                                        >
                                            <span className="material-symbols-outlined text-[17px]">edit</span>
                                        </button>
                                    )}

                                    {canDelete && (
                                        <button
                                            type="button"
                                            onClick={() => onDeleteMenu(item)}
                                            className="p-1.5 text-outline hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors cursor-pointer"
                                            title="Hapus Menu"
                                        >
                                            <span className="material-symbols-outlined text-[17px]">delete</span>
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Nested Sub-items (Level 2) */}
                        {hasSub && isExpanded && (
                            <div className="px-3.5 pb-3.5 pt-1 pl-7 sm:pl-10 relative space-y-2 bg-surface-container-low/30 border-t border-surface-container/60">
                                {/* Connecting Guide Line */}
                                <div className="absolute left-6 sm:left-8 top-0 bottom-4 w-0.5 bg-outline-variant/30 rounded-full"></div>

                                {subItems.map((sub, sIndex) => {
                                    const isSubSelected = selectedMenuId === sub.id;
                                    return (
                                        <div
                                            key={sub.id}
                                            className={`relative flex flex-col md:flex-row md:items-center justify-between p-2.5 sm:p-3 rounded-xl border transition-all gap-2.5 ${
                                                isSubSelected
                                                    ? 'bg-primary/10 border-primary ring-1 ring-primary/20'
                                                    : 'bg-surface-container-lowest hover:bg-surface-container-low border-surface-container'
                                            }`}
                                        >
                                            {/* Sub item info */}
                                            <div className="flex items-center gap-3 min-w-0 flex-1">
                                                {/* Up / Down reorder for sub item */}
                                                <div className="flex flex-col items-center gap-0.5 shrink-0">
                                                    <button
                                                        type="button"
                                                        title="Pindah ke Atas"
                                                        disabled={sIndex === 0}
                                                        onClick={() => onMoveUp(sub.id, item.id)}
                                                        className="p-0.5 rounded text-outline hover:text-primary disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
                                                    >
                                                        <span className="material-symbols-outlined text-[12px]">arrow_upward</span>
                                                    </button>
                                                    <button
                                                        type="button"
                                                        title="Pindah ke Bawah"
                                                        disabled={sIndex === subItems.length - 1}
                                                        onClick={() => onMoveDown(sub.id, item.id)}
                                                        className="p-0.5 rounded text-outline hover:text-primary disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
                                                    >
                                                        <span className="material-symbols-outlined text-[12px]">arrow_downward</span>
                                                    </button>
                                                </div>

                                                <div className="w-7 h-7 rounded-lg bg-surface-container-high text-primary flex items-center justify-center shrink-0 overflow-hidden">
                                                    {renderMenuIcon(sub.icon, 'arrow-return-right', 'text-[14px]')}
                                                </div>

                                                <div className="min-w-0 flex-1">
                                                    <div className="flex items-center gap-2 flex-wrap">
                                                        <span
                                                            onClick={() => onSelectMenu(sub)}
                                                            className="font-semibold text-xs sm:text-sm text-on-surface hover:text-primary cursor-pointer truncate"
                                                        >
                                                            {sub.name}
                                                        </span>
                                                        {renderBadgeTag(sub.badge_label, sub.badge_color)}
                                                        <span className="text-outline text-[11px] font-mono bg-surface-container/60 px-1.5 py-0.5 rounded shrink-0">
                                                            /{sub.url?.replace(/^\//, '')}
                                                        </span>
                                                    </div>
                                                    {sub.description && (
                                                        <p className="text-[11px] text-outline truncate mt-0.5">
                                                            {sub.description}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Sub item actions */}
                                            <div className="flex items-center justify-between md:justify-end gap-2 shrink-0 pt-1.5 md:pt-0 border-t md:border-t-0 border-surface-container/40">
                                                {renderRolesBadge(sub.roles)}

                                                {/* Sub item active switch */}
                                                <div
                                                    onClick={() => canUpdate && onToggleActive(sub)}
                                                    className={`w-7 h-4 rounded-full relative p-0.5 cursor-pointer flex items-center transition-colors ${
                                                        sub.active ? 'bg-primary justify-end' : 'bg-surface-container-high justify-start'
                                                    }`}
                                                >
                                                    <div className="w-3 h-3 bg-white rounded-full shadow-sm"></div>
                                                </div>

                                                {canUpdate && (
                                                    <button
                                                        type="button"
                                                        onClick={() => onSelectMenu(sub)}
                                                        className="p-1 text-outline hover:text-primary rounded hover:bg-surface-container transition-colors cursor-pointer"
                                                        title="Edit Submenu"
                                                    >
                                                        <span className="material-symbols-outlined text-[15px]">edit</span>
                                                    </button>
                                                )}

                                                {canDelete && (
                                                    <button
                                                        type="button"
                                                        onClick={() => onDeleteMenu(sub)}
                                                        className="p-1 text-outline hover:text-rose-600 rounded hover:bg-rose-50 transition-colors cursor-pointer"
                                                        title="Hapus Submenu"
                                                    >
                                                        <span className="material-symbols-outlined text-[15px]">delete</span>
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                );
            })}
                </div>
            )}
        </div>
    );
}
