import Select2, { Select2Option } from '@/components/Select2';
import { MenuItem, UserRole } from '@/types';
import React, { FormEvent, useEffect, useMemo, useState } from 'react';

interface MenuFormPanelProps {
    editingMenu: MenuItem | null;
    parentMenus: MenuItem[];
    currentCategory: string;
    availableCategories?: string[];
    rolesList: UserRole[];
    onSave: (data: Partial<MenuItem>) => void;
    onReset: () => void;
    isSubmitting: boolean;
}

export const DEFAULT_ABILITIES = [
    { key: 'create', label: 'Create' },
    { key: 'read', label: 'Read' },
    { key: 'update', label: 'Update' },
    { key: 'delete', label: 'Delete' },
    { key: 'menu', label: 'Menu' },
];

export default function MenuFormPanel({
    editingMenu,
    parentMenus,
    currentCategory,
    availableCategories,
    rolesList,
    onSave,
    onReset,
    isSubmitting,
}: MenuFormPanelProps) {
    const isEditMode = Boolean(editingMenu?.id);

    const defaultCategory =
        currentCategory && currentCategory !== 'all' ? currentCategory : 'MAIN MENU';

    const defaultAbilities = ['create', 'read', 'update', 'delete', 'menu'];

    const normalizeAbilities = (perms?: string[]): string[] => {
        if (!perms || perms.length === 0) {
            return defaultAbilities;
        }
        return perms.map((p) => p.trim().split(' ')[0].toLowerCase());
    };

    const [formData, setFormData] = useState<Partial<MenuItem>>({
        name: '',
        url: '',
        type: 'standard',
        target: '_self',
        category: defaultCategory,
        icon: 'link',
        main_menu_id: null,
        description: '',
        badge_label: '',
        badge_color: 'primary',
        roles: ['administrator', 'developer'],
        permissions: defaultAbilities,
        active: true,
    });

    const [formErrors, setFormErrors] = useState<Record<string, string>>({});

    // Populate or reset form whenever editingMenu or currentCategory changes
    useEffect(() => {
        const cat =
            currentCategory && currentCategory !== 'all' ? currentCategory : 'MAIN MENU';

        if (editingMenu) {
            setFormData({
                id: editingMenu.id,
                name: editingMenu.name || '',
                url: editingMenu.url || '',
                type: editingMenu.type || 'standard',
                target: editingMenu.target || '_self',
                category: editingMenu.category || cat,
                icon: editingMenu.icon || 'link',
                main_menu_id: editingMenu.main_menu_id || null,
                description: editingMenu.description || '',
                badge_label: editingMenu.badge_label || '',
                badge_color: editingMenu.badge_color || 'primary',
                roles:
                    Array.isArray(editingMenu.roles) && editingMenu.roles.length > 0
                        ? editingMenu.roles
                        : ['administrator', 'developer'],
                permissions: normalizeAbilities(editingMenu.permissions),
                active: editingMenu.active ?? true,
            });
        } else {
            setFormData({
                name: '',
                url: '',
                type: 'standard',
                target: '_self',
                category: cat,
                icon: 'link',
                main_menu_id: null,
                description: '',
                badge_label: '',
                badge_color: 'primary',
                roles: ['administrator', 'developer'],
                permissions: defaultAbilities,
                active: true,
            });
        }
        setFormErrors({});
    }, [editingMenu, currentCategory]);

    const handleAbilityToggle = (key: string) => {
        const current = formData.permissions || [];
        if (current.includes(key)) {
            setFormData((prev) => ({
                ...prev,
                permissions: current.filter((k) => k !== key),
            }));
        } else {
            setFormData((prev) => ({
                ...prev,
                permissions: [...current, key],
            }));
        }
    };

    const handleRoleToggle = (roleKey: string) => {
        const currentRoles = formData.roles || [];
        if (currentRoles.includes(roleKey)) {
            setFormData((prev) => ({
                ...prev,
                roles: currentRoles.filter((r) => r !== roleKey),
            }));
        } else {
            setFormData((prev) => ({
                ...prev,
                roles: [...currentRoles, roleKey],
            }));
        }
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        const errors: Record<string, string> = {};

        if (!formData.name?.trim()) {
            errors.name = 'Nama / Label menu wajib diisi.';
        }
        if (!formData.url?.trim()) {
            errors.url = 'URL target / path wajib diisi.';
        }

        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
            return;
        }

        setFormErrors({});
        onSave(formData);
    };

    type PresetCategory = {
        label: string;
        bsIcon: string;  // category header Bootstrap Icon
        icons: string[];
    };

    const presetCategories: PresetCategory[] = [
        {
            label: 'Navigasi',
            bsIcon: 'compass',
            icons: ['house', 'house-door', 'grid', 'grid-3x3-gap', 'list', 'layout-text-sidebar', 'arrow-left-right', 'link-45deg'],
        },
        {
            label: 'Pendidikan',
            bsIcon: 'mortarboard',
            icons: ['book', 'journal-text', 'journal-bookmark', 'mortarboard', 'backpack', 'pencil-square', 'file-earmark-text', 'trophy'],
        },
        {
            label: 'Media & Konten',
            bsIcon: 'play-circle',
            icons: ['camera-video', 'play-circle', 'mic', 'image', 'file-earmark-image', 'film', 'music-note-beamed', 'collection-play'],
        },
        {
            label: 'Bisnis',
            bsIcon: 'briefcase',
            icons: ['briefcase', 'building', 'shop', 'cart', 'cash-coin', 'credit-card', 'currency-dollar', 'receipt'],
        },
        {
            label: 'Komunikasi',
            bsIcon: 'chat-dots',
            icons: ['chat-dots', 'envelope', 'telephone', 'bell', 'megaphone', 'hand-thumbs-up', 'people', 'share'],
        },
        {
            label: 'Sistem',
            bsIcon: 'gear',
            icons: ['gear', 'shield-check', 'lock', 'person-circle', 'tools', 'sliders', 'server', 'database'],
        },
    ];

    const [activeIconCategory, setActiveIconCategory] = useState<number>(0);
    const allPresetIcons = presetCategories.flatMap((c) => c.icons);

    const colorPresets = [
        { key: 'primary', label: 'Primary (Teal)', bg: 'bg-primary' },
        { key: 'secondary', label: 'Secondary (Sage)', bg: 'bg-secondary' },
        { key: 'error', label: 'Rose / Hot', bg: 'bg-rose-500' },
        { key: 'tertiary', label: 'Amber / Promo', bg: 'bg-amber-500' },
        { key: 'sky', label: 'Sky / Info', bg: 'bg-sky-500' },
    ];

    const allCategoryOptions = useMemo(() => {
        return Array.from(
            new Set([
                'MAIN MENU',
                'ADMINISTRASI',
                ...(availableCategories || []),
                ...(formData.category ? [formData.category] : []),
            ])
        );
    }, [availableCategories, formData.category]);

    // Available roles configuration
    const displayRoles = useMemo(() => {
        const base = [
            { key: 'public', label: 'Publik / Tamu', bsIcon: 'globe2' },
            { key: 'student', label: 'Member Siswa', bsIcon: 'mortarboard-fill' },
            { key: 'instructor', label: 'Mentor / Guru', bsIcon: 'person-video3' },
            { key: 'admin', label: 'Superadmin', bsIcon: 'shield-fill-check' },
        ];

        if (!rolesList || rolesList.length === 0) {
            return base;
        }

        const customRoles: typeof base = [
            { key: 'public', label: 'Publik / Tamu', bsIcon: 'globe2' },
        ];

        rolesList.forEach((r) => {
            const key = r.slug || r.name;
            if (key === 'public' || customRoles.some((x) => x.key === key)) return;

            let bsIcon = 'shield-person';
            if (key.includes('admin') || key.includes('dev')) bsIcon = 'shield-fill-check';
            else if (key.includes('teach') || key.includes('instruct') || key.includes('mentor'))
                bsIcon = 'person-video3';
            else if (key.includes('stud') || key.includes('user') || key.includes('member'))
                bsIcon = 'mortarboard-fill';

            customRoles.push({ key, label: r.name, bsIcon });
        });

        return customRoles;
    }, [rolesList]);

    const getBadgeTagClasses = (color?: string | null) => {
        switch (color) {
            case 'secondary':
                return 'bg-secondary-fixed text-on-secondary-fixed-variant';
            case 'error':
            case 'rose':
                return 'bg-rose-100 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300';
            case 'tertiary':
            case 'amber':
                return 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300';
            case 'sky':
                return 'bg-sky-100 text-sky-800 dark:bg-sky-950/60 dark:text-sky-300';
            case 'primary':
            default:
                return 'bg-primary-fixed text-on-primary-fixed-variant';
        }
    };

    return (
        <div className="bg-surface-container-lowest rounded-2xl shadow-xs border border-surface-container flex flex-col sticky top-24 overflow-hidden">
            {/* Header & Mode Badge */}
            <div className="p-4 sm:p-5 border-b border-surface-container/70 bg-gradient-to-r from-surface-container-low/40 to-transparent flex items-start justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                    <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border ${
                            isEditMode
                                ? 'bg-primary/10 text-primary border-primary/20'
                                : 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20'
                        }`}
                    >
                        <span className="material-symbols-outlined text-[20px]">
                            {isEditMode ? 'edit_square' : 'add_circle'}
                        </span>
                    </div>
                    <div className="min-w-0">
                        <h2 className="font-bold text-sm sm:text-base text-on-surface truncate">
                            Konfigurasi Item Menu
                        </h2>
                        <p className="text-xs text-outline truncate mt-0.5">
                            {isEditMode ? (
                                <span>
                                    Mengedit:{' '}
                                    <strong className="text-primary font-semibold">
                                        {formData.name || 'Menu'}
                                    </strong>
                                </span>
                            ) : (
                                'Tambah item menu baru ke navigasi'
                            )}
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                    {isEditMode && (
                        <button
                            type="button"
                            onClick={onReset}
                            className="px-2 py-1 rounded-lg text-xs font-semibold text-outline hover:text-rose-500 hover:bg-rose-500/10 transition-colors flex items-center gap-1 cursor-pointer"
                            title="Batalkan edit dan kembali ke mode tambah"
                        >
                            <span className="material-symbols-outlined text-[15px]">close</span>
                            <span className="hidden sm:inline">Batal</span>
                        </button>
                    )}
                    <span
                        className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                            isEditMode
                                ? 'bg-primary text-on-primary shadow-xs'
                                : 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30'
                        }`}
                    >
                        {isEditMode ? 'Mode Edit' : 'Mode Tambah'}
                    </span>
                </div>
            </div>

            {/* Form Scroll Container */}
            <form
                onSubmit={handleSubmit}
                className="p-4 sm:p-5 flex flex-col gap-5 overflow-y-auto max-h-[calc(100vh-145px)] custom-scrollbar"
            >
                {/* SECTION 1: Identitas & Hirarki Menu */}
                <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-outline">
                        <span className="material-symbols-outlined text-[16px] text-primary">feed</span>
                        <span>Identitas &amp; Hirarki</span>
                        <div className="h-px bg-surface-container-high flex-1 ml-1" />
                    </div>

                    {/* Nama / Label Menu */}
                    <div>
                        <label className="block text-xs font-semibold text-on-surface mb-1.5">
                            Nama / Label Menu <span className="text-rose-500">*</span>
                        </label>
                        <input
                            type="text"
                            value={formData.name || ''}
                            onChange={(e) => {
                                setFormData((prev) => ({ ...prev, name: e.target.value }));
                                if (formErrors.name) setFormErrors((prev) => ({ ...prev, name: '' }));
                            }}
                            placeholder="Contoh: Kursus & Modul, Bootcamp, Blog..."
                            className={`w-full px-3.5 py-2.5 rounded-xl bg-surface-container-low text-on-surface text-xs sm:text-sm focus:outline-none focus:bg-surface-container-lowest transition-all border ${
                                formErrors.name
                                    ? 'border-rose-500 ring-2 ring-rose-500/20'
                                    : 'border-surface-container-high focus:border-primary focus:ring-1 focus:ring-primary'
                            }`}
                        />
                        {formErrors.name && (
                            <span className="text-[11px] text-rose-600 font-medium mt-1 flex items-center gap-1">
                                <span className="material-symbols-outlined text-[14px]">error</span>
                                {formErrors.name}
                            </span>
                        )}
                    </div>

                    {/* URL Target / Path */}
                    <div>
                        <label className="block text-xs font-semibold text-on-surface mb-1.5">
                            URL Target / Path Navigasi <span className="text-rose-500">*</span>
                        </label>
                        <div
                            className={`flex items-stretch rounded-xl bg-surface-container-low overflow-hidden transition-all border ${
                                formErrors.url
                                    ? 'border-rose-500 ring-2 ring-rose-500/20'
                                    : 'border-surface-container-high focus-within:border-primary focus-within:ring-1 focus-within:ring-primary'
                            }`}
                        >
                            <span className="px-3 text-outline text-xs font-mono font-bold bg-surface-container flex items-center border-r border-surface-container-high select-none">
                                /
                            </span>
                            <input
                                type="text"
                                value={formData.url || ''}
                                onChange={(e) => {
                                    setFormData((prev) => ({ ...prev, url: e.target.value }));
                                    if (formErrors.url) setFormErrors((prev) => ({ ...prev, url: '' }));
                                }}
                                placeholder="kursus, #dropdown-program, atau blog"
                                className="w-full px-3.5 py-2.5 bg-transparent text-on-surface text-xs sm:text-sm focus:outline-none"
                            />
                        </div>
                        {formErrors.url && (
                            <span className="text-[11px] text-rose-600 font-medium mt-1 flex items-center gap-1">
                                <span className="material-symbols-outlined text-[14px]">error</span>
                                {formErrors.url}
                            </span>
                        )}
                    </div>

                    {/* Kategori Menu & Parent in 2-Column Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {/* Kategori Menu — Select2 */}
                        <div>
                            <label className="block text-xs font-semibold text-on-surface mb-1.5">
                                Kategori Penempatan
                            </label>
                            <Select2
                                options={allCategoryOptions.map((cat): Select2Option => ({
                                    value: cat,
                                    label: cat,
                                    icon: cat === 'MAIN MENU' ? 'menu' : cat === 'ADMINISTRASI' ? 'admin_panel_settings' : 'label',
                                    iconColor: 'text-primary',
                                }))}
                                value={formData.category || 'MAIN MENU'}
                                onChange={(val) =>
                                    setFormData((prev) => ({
                                        ...prev,
                                        category: val || 'MAIN MENU',
                                    }))
                                }
                                searchable={false}
                                placeholder="Pilih kategori..."
                            />
                        </div>

                        {/* Menu Induk (Parent) — Select2 */}
                        <div>
                            <label className="block text-xs font-semibold text-on-surface mb-1.5">
                                Menu Induk (Parent)
                            </label>
                            <Select2
                                options={[
                                    {
                                        value: '',
                                        label: 'Level 1 (Tanpa Induk)',
                                        icon: 'account_tree',
                                        iconColor: 'text-outline',
                                    },
                                    ...parentMenus
                                        .filter((p) => !formData.id || p.id !== formData.id)
                                        .map((p): Select2Option => ({
                                            value: String(p.id),
                                            label: p.name,
                                            sublabel: p.type === 'megamenu' ? 'Megamenu' : undefined,
                                            icon: p.type === 'megamenu' ? 'dashboard_customize' : 'subdirectory_arrow_right',
                                            iconColor: p.type === 'megamenu' ? 'text-secondary' : 'text-outline',
                                        })),
                                ]}
                                value={formData.main_menu_id ? String(formData.main_menu_id) : ''}
                                onChange={(val) =>
                                    setFormData((prev) => ({
                                        ...prev,
                                        main_menu_id: val || null,
                                    }))
                                }
                                searchable={true}
                                searchThreshold={3}
                                clearable={Boolean(formData.main_menu_id)}
                                placeholder="Level 1 (Tanpa Induk)"
                                searchPlaceholder="Cari menu induk..."
                            />
                        </div>
                    </div>
                </div>

                {/* SECTION 2: Tipe & Navigasi */}
                <div className="flex flex-col gap-3 pt-1">
                    <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-outline">
                        <span className="material-symbols-outlined text-[16px] text-primary">navigation</span>
                        <span>Format &amp; Navigasi</span>
                        <div className="h-px bg-surface-container-high flex-1 ml-1" />
                    </div>

                    {/* Tipe Navigasi (Segmented Control) */}
                    <div>
                        <label className="block text-xs font-semibold text-on-surface mb-1.5">
                            Tipe Tampilan Menu
                        </label>
                        <div className="grid grid-cols-3 gap-1 p-1 bg-surface-container-low rounded-xl border border-surface-container-high">
                            <button
                                type="button"
                                onClick={() => setFormData((prev) => ({ ...prev, type: 'standard' }))}
                                className={`py-1.5 px-2 rounded-lg text-xs font-semibold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                                    formData.type === 'standard' || !formData.type
                                        ? 'bg-surface-container-lowest text-primary shadow-xs ring-1 ring-surface-container-high/60'
                                        : 'text-outline hover:text-on-surface'
                                }`}
                            >
                                <span className="material-symbols-outlined text-[16px]">link</span>
                                <span>Standar</span>
                            </button>
                            <button
                                type="button"
                                onClick={() => setFormData((prev) => ({ ...prev, type: 'megamenu' }))}
                                className={`py-1.5 px-2 rounded-lg text-xs font-semibold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                                    formData.type === 'megamenu'
                                        ? 'bg-surface-container-lowest text-primary shadow-xs ring-1 ring-surface-container-high/60'
                                        : 'text-outline hover:text-on-surface'
                                }`}
                            >
                                <span className="material-symbols-outlined text-[16px]">dashboard_customize</span>
                                <span>Megamenu</span>
                            </button>
                            <button
                                type="button"
                                onClick={() => setFormData((prev) => ({ ...prev, type: 'divider' }))}
                                className={`py-1.5 px-2 rounded-lg text-xs font-semibold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                                    formData.type === 'divider'
                                        ? 'bg-surface-container-lowest text-primary shadow-xs ring-1 ring-surface-container-high/60'
                                        : 'text-outline hover:text-on-surface'
                                }`}
                            >
                                <span className="material-symbols-outlined text-[16px]">horizontal_rule</span>
                                <span>Divider</span>
                            </button>
                        </div>
                    </div>

                    {/* Target Jendela (Segmented Control) */}
                    <div>
                        <label className="block text-xs font-semibold text-on-surface mb-1.5">
                            Target Jendela (Browser)
                        </label>
                        <div className="grid grid-cols-2 gap-2">
                            <button
                                type="button"
                                onClick={() => setFormData((prev) => ({ ...prev, target: '_self' }))}
                                className={`py-2 px-3 rounded-xl border text-xs font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                                    formData.target === '_self' || !formData.target
                                        ? 'bg-primary/10 border-primary text-primary ring-1 ring-primary/20 shadow-xs'
                                        : 'bg-surface-container-low border-surface-container-high text-outline hover:text-on-surface'
                                }`}
                            >
                                <span className="material-symbols-outlined text-[16px]">tab</span>
                                <span>Tab Sama (_self)</span>
                            </button>

                            <button
                                type="button"
                                onClick={() => setFormData((prev) => ({ ...prev, target: '_blank' }))}
                                className={`py-2 px-3 rounded-xl border text-xs font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                                    formData.target === '_blank'
                                        ? 'bg-primary/10 border-primary text-primary ring-1 ring-primary/20 shadow-xs'
                                        : 'bg-surface-container-low border-surface-container-high text-outline hover:text-on-surface'
                                }`}
                            >
                                <span className="material-symbols-outlined text-[16px]">open_in_new</span>
                                <span>Tab Baru (_blank)</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* SECTION 3: Ikon & Visual Badge */}
                <div className="flex flex-col gap-3 pt-1">
                    <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-outline">
                        <span className="material-symbols-outlined text-[16px] text-primary">palette</span>
                        <span>Ikon &amp; Tampilan Visual</span>
                        <div className="h-px bg-surface-container-high flex-1 ml-1" />
                    </div>

                    {/* Ikon Menu: Live Preview Box + Input */}
                    <div>
                        <div className="flex items-center justify-between mb-1.5">
                            <label className="block text-xs font-semibold text-on-surface">
                                Ikon Representasi
                            </label>
                            <span className="text-[11px] font-mono text-outline">
                                aktif:{' '}
                                <span className="text-primary font-bold">{formData.icon || 'house'}</span>
                            </span>
                        </div>

                        <div className="flex items-center gap-2 mb-2.5">
                            {/* Live Icon Avatar — Bootstrap Icons */}
                            <div
                                className="w-11 h-11 rounded-xl bg-primary/10 text-primary border border-primary/20 flex items-center justify-center shadow-xs shrink-0"
                                title={`Ikon aktif: ${formData.icon || 'house'}`}
                            >
                                <i className={`bi bi-${formData.icon || 'house'}`} style={{ fontSize: '22px' }} />
                            </div>

                            {/* Text Input */}
                            <input
                                type="text"
                                value={formData.icon || ''}
                                onChange={(e) =>
                                    setFormData((prev) => ({ ...prev, icon: e.target.value }))
                                }
                                placeholder="Ketik nama Bootstrap Icon, e.g. house-door"
                                className="flex-1 px-3 py-2 rounded-xl bg-surface-container-low text-on-surface text-xs font-mono focus:outline-none border border-surface-container-high focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                            />
                        </div>

                        {/* Category Filter Tabs */}
                        <div className="flex gap-1 flex-wrap mb-2">
                            {presetCategories.map((cat, idx) => (
                                <button
                                    key={cat.label}
                                    type="button"
                                    onClick={() => setActiveIconCategory(idx)}
                                    className={`flex items-center gap-1 px-2 py-1 rounded-lg text-[11px] font-semibold transition-all cursor-pointer ${
                                        activeIconCategory === idx
                                            ? 'bg-primary text-on-primary shadow-xs'
                                            : 'bg-surface-container-low border border-surface-container-high text-outline hover:text-on-surface'
                                    }`}
                                >
                                    <i className={`bi bi-${cat.bsIcon}`} style={{ fontSize: '12px' }} />
                                    <span>{cat.label}</span>
                                </button>
                            ))}
                        </div>

                        {/* Quick Presets Grid — Bootstrap Icons */}
                        <div className="grid grid-cols-8 gap-1.5 p-1.5 bg-surface-container-low/70 rounded-xl border border-surface-container-high/60">
                            {presetCategories[activeIconCategory].icons.map((ico) => {
                                const isSelected = formData.icon === ico;
                                return (
                                    <button
                                        key={ico}
                                        type="button"
                                        onClick={() => setFormData((prev) => ({ ...prev, icon: ico }))}
                                        title={ico}
                                        className={`h-8 rounded-lg flex items-center justify-center transition-all cursor-pointer ${
                                            isSelected
                                                ? 'bg-primary text-on-primary shadow-xs ring-2 ring-primary/30 scale-105'
                                                : 'bg-surface-container-lowest text-outline hover:text-primary hover:bg-surface-container border border-surface-container'
                                        }`}
                                    >
                                        <i className={`bi bi-${ico}`} style={{ fontSize: '16px' }} />
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Badge Label & Warna */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                        <div>
                            <div className="flex items-center justify-between mb-1.5">
                                <label className="block text-xs font-semibold text-on-surface">
                                    Label Badge (Opsional)
                                </label>
                                {formData.badge_label && (
                                    <span
                                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${getBadgeTagClasses(
                                            formData.badge_color
                                        )}`}
                                    >
                                        {formData.badge_label}
                                    </span>
                                )}
                            </div>
                            <input
                                type="text"
                                value={formData.badge_label || ''}
                                onChange={(e) =>
                                    setFormData((prev) => ({
                                        ...prev,
                                        badge_label: e.target.value,
                                    }))
                                }
                                placeholder="e.g. BARU, POPULER, HOT"
                                className="w-full px-3 py-2 rounded-xl bg-surface-container-low text-on-surface text-xs focus:outline-none border border-surface-container-high focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-on-surface mb-2">
                                Pilihan Warna Badge
                            </label>
                            <div className="flex items-center gap-2.5 py-1">
                                {colorPresets.map((c) => {
                                    const isSelected = formData.badge_color === c.key;
                                    return (
                                        <button
                                            key={c.key}
                                            type="button"
                                            title={c.label}
                                            onClick={() =>
                                                setFormData((prev) => ({
                                                    ...prev,
                                                    badge_color: c.key,
                                                }))
                                            }
                                            className={`w-6 h-6 rounded-full ${c.bg} transition-all cursor-pointer relative flex items-center justify-center ${
                                                isSelected
                                                    ? 'ring-2 ring-primary ring-offset-2 scale-110 shadow-xs'
                                                    : 'opacity-70 hover:opacity-100 hover:scale-105'
                                            }`}
                                        >
                                            {isSelected && (
                                                <span className="material-symbols-outlined text-[13px] text-white font-bold drop-shadow">
                                                    check
                                                </span>
                                            )}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>

                {/* SECTION 4: Hak Akses (Permissions & Role) & Keterangan */}
                <div className="flex flex-col gap-3.5 pt-1">
                    <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-outline">
                        <span className="material-symbols-outlined text-[16px] text-primary">security</span>
                        <span>Hak Akses &amp; Permissions</span>
                        <div className="h-px bg-surface-container-high flex-1 ml-1" />
                    </div>

                    {/* Hak Akses CRUD (Abilities: Create, Read, Update, Delete, Menu) */}
                    <div>
                        <label className="block text-xs font-semibold text-on-surface mb-2">
                            Hak Akses (Permissions)
                        </label>

                        <div className="flex flex-wrap items-center gap-5 py-1">
                            {DEFAULT_ABILITIES.map((item) => {
                                const isChecked = formData.permissions?.includes(item.key);
                                return (
                                    <label
                                        key={item.key}
                                        className="flex items-center gap-2 cursor-pointer select-none group"
                                    >
                                        <input
                                            type="checkbox"
                                            checked={isChecked}
                                            onChange={() => handleAbilityToggle(item.key)}
                                            className="w-4 h-4 rounded border-outline/40 text-primary focus:ring-primary focus:ring-offset-0 cursor-pointer accent-primary"
                                        />
                                        <span
                                            className={`text-xs transition-colors ${
                                                isChecked
                                                    ? 'text-on-surface font-semibold'
                                                    : 'text-outline group-hover:text-on-surface'
                                            }`}
                                        >
                                            {item.label}
                                        </span>
                                    </label>
                                );
                            })}
                        </div>
                    </div>

                    {/* Penugasan Hak Akses ke Role */}
                    <div className="pt-2 border-t border-surface-container/60">
                        <div className="flex items-center justify-between mb-1.5">
                            <label className="block text-xs font-semibold text-on-surface">
                                Tugaskan Permission ke Role
                            </label>
                            <span className="text-[11px] text-outline">
                                {formData.roles?.length || 0} role dipilih
                            </span>
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                            {displayRoles.map((role) => {
                                const isChecked = formData.roles?.includes(role.key);
                                return (
                                    <div
                                        key={role.key}
                                        onClick={() => handleRoleToggle(role.key)}
                                        className={`p-2.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-2 select-none ${
                                            isChecked
                                                ? 'bg-primary/10 border-primary/40 text-on-surface ring-1 ring-primary/20 shadow-2xs'
                                                : 'bg-surface-container-low/60 border-surface-container-high text-outline hover:border-outline/40 hover:text-on-surface'
                                        }`}
                                    >
                                        <div className="flex items-center gap-2 min-w-0">
                                            <i
                                                className={`bi bi-${role.bsIcon} text-[16px] shrink-0 ${
                                                    isChecked ? 'text-primary' : 'text-outline'
                                                }`}
                                            />
                                            <span className="text-xs font-medium truncate">
                                                {role.label}
                                            </span>
                                        </div>
                                        <div
                                            className={`w-4 h-4 rounded flex items-center justify-center shrink-0 border transition-all ${
                                                isChecked
                                                    ? 'bg-primary border-primary text-on-primary'
                                                    : 'border-surface-container-high bg-surface-container-lowest'
                                            }`}
                                        >
                                            {isChecked && (
                                                <span className="material-symbols-outlined text-[12px] font-bold">
                                                    check
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Sub-deskripsi Ringkas (Mega Menu) */}
                    <div>
                        <label className="block text-xs font-semibold text-on-surface mb-1.5">
                            Deskripsi Ringkas (Mega Menu / Tooltip)
                        </label>
                        <textarea
                            rows={2}
                            value={formData.description || ''}
                            onChange={(e) =>
                                setFormData((prev) => ({ ...prev, description: e.target.value }))
                            }
                            placeholder="Keterangan singkat yang muncul di bawah nama menu saat dibuka..."
                            className="w-full px-3.5 py-2 rounded-xl bg-surface-container-low text-on-surface text-xs focus:outline-none focus:bg-surface-container-lowest border border-surface-container-high focus:border-primary focus:ring-1 focus:ring-primary transition-colors resize-none"
                        />
                    </div>
                </div>

                {/* Form Action Buttons */}
                <div className="pt-3 border-t border-surface-container/70 flex items-center gap-2.5">
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="flex-1 py-2.5 px-4 rounded-xl bg-primary text-on-primary hover:bg-primary-container font-semibold text-xs sm:text-sm transition-all shadow-xs hover:shadow-md hover:shadow-primary/20 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
                    >
                        {isSubmitting ? (
                            <>
                                <span className="material-symbols-outlined text-[18px] animate-spin">
                                    progress_activity
                                </span>
                                <span>Menyimpan...</span>
                            </>
                        ) : isEditMode ? (
                            <>
                                <span className="material-symbols-outlined text-[18px]">save</span>
                                <span>Simpan Perubahan</span>
                            </>
                        ) : (
                            <>
                                <span className="material-symbols-outlined text-[18px]">add_circle</span>
                                <span>Tambah Menu</span>
                            </>
                        )}
                    </button>

                    <button
                        type="button"
                        onClick={onReset}
                        className="px-3.5 py-2.5 rounded-xl bg-surface-container-low hover:bg-surface-container text-on-surface font-semibold text-xs sm:text-sm transition-colors border border-surface-container-high flex items-center justify-center gap-1.5 cursor-pointer text-outline hover:text-on-surface"
                        title="Kosongkan form"
                    >
                        <span className="material-symbols-outlined text-[18px]">restart_alt</span>
                        <span className="hidden sm:inline">Reset</span>
                    </button>
                </div>
            </form>
        </div>
    );
}
