import AppToast from '@/components/AppToast';
import DeleteConfirmModal from '@/components/DeleteConfirmModal';
import PopupLoader from '@/components/PopupLoader';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { MenuItem, MenuMetrics, PageProps, UserRole } from '@/types';
import { Head, router, usePage } from '@inertiajs/react';
import React, { useEffect, useState } from 'react';
import MenuCacheStatusBar from './partials/MenuCacheStatusBar';
import MenuCategoryTabs, { CategoryKey } from './partials/MenuCategoryTabs';
import MenuFormPanel from './partials/MenuFormPanel';
import MenuHeader from './partials/MenuHeader';
import MenuLivePreviewModal from './partials/MenuLivePreviewModal';
import MenuTipBanner from './partials/MenuTipBanner';
import MenuTree from './partials/MenuTree';

interface Props {
    menuItems: MenuItem[];
    metrics: MenuMetrics;
    categories: string[];
    parentMenus: MenuItem[];
    filters: {
        search?: string;
        category?: string;
    };
    roles: UserRole[];
    can: {
        create: boolean;
        update: boolean;
        delete: boolean;
    };
}

export default function MenuIndex({
    menuItems: initialMenus,
    metrics: initialMetrics,
    categories,
    parentMenus: initialParentMenus,
    filters: initialFilters,
    roles,
    can,
}: Props) {
    const { flash } = usePage<PageProps>().props;

    const [activeCategory, setActiveCategory] = useState<CategoryKey>(
        (initialFilters?.category as CategoryKey) || 'all'
    );
    const [searchQuery, setSearchQuery] = useState(initialFilters?.search || '');
    const [menusList, setMenusList] = useState<MenuItem[]>(initialMenus || []);
    const [isLoading, setIsLoading] = useState(false);
    const [isOrderDirty, setIsOrderDirty] = useState(false);
    const [isSavingOrder, setIsSavingOrder] = useState(false);
    const [isPurging, setIsPurging] = useState(false);
    const [isSubmittingForm, setIsSubmittingForm] = useState(false);
    const searchTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);

    // Selected menu currently active in the right Inspector panel
    const [selectedMenu, setSelectedMenu] = useState<MenuItem | null>(null);
    const [formKey, setFormKey] = useState<number>(0);

    // Expanded tree items
    const [expandedParents, setExpandedParents] = useState<Record<string, boolean>>({});

    // Popup loader for status toggle
    const [statusLoader, setStatusLoader] = useState<{
        show: boolean;
        title?: string;
        message?: string;
    }>({
        show: false,
    });

    // Modals
    const [showLivePreview, setShowLivePreview] = useState(false);
    const [deleteModal, setDeleteModal] = useState<{
        show: boolean;
        menu: MenuItem | null;
        isDeleting: boolean;
    }>({
        show: false,
        menu: null,
        isDeleting: false,
    });

    // Toast Notification
    const [toast, setToast] = useState<{
        show: boolean;
        type: 'success' | 'danger' | 'warning' | 'info';
        title?: string;
        message?: string;
    }>({
        show: false,
        type: 'success',
    });

    // Update menusList when prop changes from server
    useEffect(() => {
        setMenusList(initialMenus || []);
        setIsOrderDirty(false);
        setIsLoading(false);
    }, [initialMenus]);

    // Handle Flash messages from Laravel
    useEffect(() => {
        if (flash?.success) {
            setToast({
                show: true,
                type: 'success',
                title: 'Berhasil!',
                message: flash.success,
            });
        } else if (flash?.error) {
            setToast({
                show: true,
                type: 'danger',
                title: 'Gagal',
                message: flash.error,
            });
        }
    }, [flash]);

    // Filter by category or search via Inertia visit
    const handleCategoryChange = (cat: CategoryKey) => {
        setActiveCategory(cat);
        setIsLoading(true);
        router.get(
            route('manajemen-menu.index'),
            {
                category: cat,
                search: searchQuery || undefined,
            },
            {
                preserveState: true,
                preserveScroll: true,
                onFinish: () => setIsLoading(false),
            }
        );
    };

    const handleSearchChange = (q: string) => {
        setSearchQuery(q);
        setIsLoading(true);
        if (searchTimeoutRef.current) {
            clearTimeout(searchTimeoutRef.current);
        }
        searchTimeoutRef.current = setTimeout(() => {
            router.get(
                route('manajemen-menu.index'),
                {
                    category: activeCategory,
                    search: q || undefined,
                },
                {
                    preserveState: true,
                    preserveScroll: true,
                    onFinish: () => setIsLoading(false),
                }
            );
        }, 300);
    };

    const handleExpandAll = () => {
        const next: Record<string, boolean> = {};
        menusList.forEach((m) => {
            next[m.id] = true;
        });
        setExpandedParents(next);
    };

    const handleCollapseAll = () => {
        const next: Record<string, boolean> = {};
        menusList.forEach((m) => {
            next[m.id] = false;
        });
        setExpandedParents(next);
    };

    const handleToggleExpand = (menuId: string) => {
        setExpandedParents((prev) => ({
            ...prev,
            [menuId]: prev[menuId] === false ? true : false,
        }));
    };

    // Reordering handlers
    const handleMoveUp = (menuId: string, parentId?: string | null) => {
        if (!parentId) {
            const index = menusList.findIndex((m) => m.id === menuId);
            if (index <= 0) return;
            const updated = [...menusList];
            const temp = updated[index];
            updated[index] = updated[index - 1];
            updated[index - 1] = temp;
            setMenusList(updated);
            setIsOrderDirty(true);
        } else {
            const updated = menusList.map((parent) => {
                if (parent.id === parentId) {
                    const subList = [...(parent.sub_menus || parent.subMenus || [])];
                    const sIndex = subList.findIndex((s) => s.id === menuId);
                    if (sIndex <= 0) return parent;
                    const sTemp = subList[sIndex];
                    subList[sIndex] = subList[sIndex - 1];
                    subList[sIndex - 1] = sTemp;
                    return {
                        ...parent,
                        sub_menus: subList,
                        subMenus: subList,
                    };
                }
                return parent;
            });
            setMenusList(updated);
            setIsOrderDirty(true);
        }
    };

    const handleMoveDown = (menuId: string, parentId?: string | null) => {
        if (!parentId) {
            const index = menusList.findIndex((m) => m.id === menuId);
            if (index === -1 || index >= menusList.length - 1) return;
            const updated = [...menusList];
            const temp = updated[index];
            updated[index] = updated[index + 1];
            updated[index + 1] = temp;
            setMenusList(updated);
            setIsOrderDirty(true);
        } else {
            const updated = menusList.map((parent) => {
                if (parent.id === parentId) {
                    const subList = [...(parent.sub_menus || parent.subMenus || [])];
                    const sIndex = subList.findIndex((s) => s.id === menuId);
                    if (sIndex === -1 || sIndex >= subList.length - 1) return parent;
                    const sTemp = subList[sIndex];
                    subList[sIndex] = subList[sIndex + 1];
                    subList[sIndex + 1] = sTemp;
                    return {
                        ...parent,
                        sub_menus: subList,
                        subMenus: subList,
                    };
                }
                return parent;
            });
            setMenusList(updated);
            setIsOrderDirty(true);
        }
    };

    const handleSaveOrder = () => {
        setIsSavingOrder(true);
        const payloadItems: Array<{ id: string; orders: number; main_menu_id?: string | null }> = [];

        menusList.forEach((parent, pIndex) => {
            payloadItems.push({
                id: parent.id,
                orders: pIndex + 1,
                main_menu_id: null,
            });
            const subList = parent.sub_menus || parent.subMenus || [];
            subList.forEach((sub, sIndex) => {
                payloadItems.push({
                    id: sub.id,
                    orders: sIndex + 1,
                    main_menu_id: parent.id,
                });
            });
        });

        router.post(
            route('manajemen-menu.reorder'),
            { items: payloadItems },
            {
                preserveScroll: true,
                onSuccess: () => {
                    setIsOrderDirty(false);
                    setIsSavingOrder(false);
                    setToast({
                        show: true,
                        type: 'success',
                        title: 'Berhasil!',
                        message: 'Urutan menu navigasi berhasil disimpan.',
                    });
                },
                onError: () => {
                    setIsSavingOrder(false);
                    setToast({
                        show: true,
                        type: 'danger',
                        title: 'Gagal',
                        message: 'Tidak dapat menyimpan urutan menu.',
                    });
                },
            }
        );
    };

    // Toggle active state
    const handleToggleActive = (menu: MenuItem) => {
        const targetAction = menu.active ? 'Menonaktifkan' : 'Mengaktifkan';
        setStatusLoader({
            show: true,
            title: `${targetAction} Menu...`,
            message: `Sedang memperbarui status visibilitas "${menu.name}".`,
        });

        router.patch(
            route('manajemen-menu.toggle', menu.id),
            {},
            {
                preserveScroll: true,
                onSuccess: () => {
                    setStatusLoader({ show: false });
                    setToast({
                        show: true,
                        type: 'success',
                        title: 'Berhasil!',
                        message: `Status menu "${menu.name}" berhasil diubah.`,
                    });
                },
                onError: () => {
                    setStatusLoader({ show: false });
                    setToast({
                        show: true,
                        type: 'danger',
                        title: 'Gagal',
                        message: `Tidak dapat mengubah status menu "${menu.name}".`,
                    });
                },
                onFinish: () => {
                    setStatusLoader({ show: false });
                },
            }
        );
    };

    // Save menu from right panel (create or update)
    const handleSaveForm = (data: Partial<MenuItem>) => {
        setIsSubmittingForm(true);

        let targetCategory = data.category;
        if (!targetCategory || targetCategory === 'all') {
            targetCategory = activeCategory !== 'all' ? activeCategory : 'MAIN MENU';
        }

        const payload: Record<string, any> = {
            name: data.name,
            url: data.url,
            type: data.type || 'standard',
            target: data.target || '_self',
            category: targetCategory,
            icon: data.icon || 'link',
            main_menu_id: data.main_menu_id || null,
            description: data.description || '',
            badge_label: data.badge_label || '',
            badge_color: data.badge_color || 'primary',
            roles: data.roles || ['administrator', 'developer'],
            permissions: data.permissions || ['menu', 'read', 'create', 'update', 'delete'],
            active: data.active ?? true,
        };

        if (data.id) {
            // Update
            router.put(route('manajemen-menu.update', data.id), payload, {
                preserveScroll: true,
                onSuccess: () => {
                    setIsSubmittingForm(false);
                    setSelectedMenu(null);
                    setFormKey((k) => k + 1);
                    if (payload.main_menu_id) {
                        setExpandedParents((prev) => ({ ...prev, [payload.main_menu_id]: true }));
                    }
                    setToast({
                        show: true,
                        type: 'success',
                        title: 'Berhasil!',
                        message: `Menu "${payload.name}" berhasil diperbarui.`,
                    });
                },
                onError: (errors) => {
                    setIsSubmittingForm(false);
                    setToast({
                        show: true,
                        type: 'danger',
                        title: 'Gagal Memperbarui',
                        message: Object.values(errors)[0] || 'Periksa kembali isian form Anda.',
                    });
                },
            });
        } else {
            // Create
            router.post(route('manajemen-menu.store'), payload, {
                preserveScroll: true,
                onSuccess: () => {
                    setIsSubmittingForm(false);
                    setSelectedMenu(null);
                    setFormKey((k) => k + 1);
                    if (payload.main_menu_id) {
                        setExpandedParents((prev) => ({ ...prev, [payload.main_menu_id]: true }));
                    }
                    setToast({
                        show: true,
                        type: 'success',
                        title: 'Berhasil!',
                        message: `Menu "${payload.name}" berhasil ditambahkan.`,
                    });
                },
                onError: (errors) => {
                    setIsSubmittingForm(false);
                    setToast({
                        show: true,
                        type: 'danger',
                        title: 'Gagal Menambahkan',
                        message: Object.values(errors)[0] || 'Periksa kembali isian form Anda.',
                    });
                },
            });
        }
    };

    // Delete menu
    const handleConfirmDelete = () => {
        if (!deleteModal.menu) return;
        setDeleteModal((prev) => ({ ...prev, isDeleting: true }));

        router.delete(route('manajemen-menu.destroy', deleteModal.menu.id), {
            preserveScroll: true,
            onSuccess: () => {
                setDeleteModal({ show: false, menu: null, isDeleting: false });
                if (selectedMenu?.id === deleteModal.menu?.id) {
                    setSelectedMenu(null);
                }
                setToast({
                    show: true,
                    type: 'success',
                    title: 'Berhasil Dihapus',
                    message: 'Menu navigasi berhasil dihapus dari sistem.',
                });
            },
            onError: () => {
                setDeleteModal((prev) => ({ ...prev, isDeleting: false }));
                setToast({
                    show: true,
                    type: 'danger',
                    title: 'Gagal Menghapus',
                    message: 'Terjadi kesalahan saat menghapus menu.',
                });
            },
        });
    };

    // Purge Cache
    const handlePurgeCache = () => {
        setIsPurging(true);
        router.post(
            route('manajemen-menu.purge-cache'),
            {},
            {
                preserveScroll: true,
                onSuccess: () => {
                    setIsPurging(false);
                    setToast({
                        show: true,
                        type: 'success',
                        title: 'Cache Dibersihkan!',
                        message: 'Cache navigasi edge CDN & aplikasi telah diperbarui.',
                    });
                },
                onError: () => {
                    setIsPurging(false);
                    setToast({
                        show: true,
                        type: 'danger',
                        title: 'Gagal',
                        message: 'Tidak dapat membersihkan cache navigasi.',
                    });
                },
            }
        );
    };

    const handleAddSubmenu = (parentMenu: MenuItem) => {
        setSelectedMenu({
            id: '',
            name: '',
            url: '',
            type: 'standard',
            target: '_self',
            category: parentMenu.category,
            icon: 'subdirectory_arrow_right',
            main_menu_id: parentMenu.id,
            description: '',
            badge_label: '',
            badge_color: 'primary',
            roles: parentMenu.roles || ['administrator', 'developer'],
            permissions: ['create', 'read', 'update', 'delete', 'menu'],
            active: true,
        });
        setFormKey((k) => k + 1);
    };

    return (
        <AuthenticatedLayout breadcrumbParent="Admin Area" breadcrumbCurrent="Manajemen Menu">
            <Head title="Manajemen Menu &amp; Navigasi Dinamis" />

            {/* In-page Toast Notification */}
            <AppToast
                show={toast.show}
                type={toast.type}
                title={toast.title}
                message={toast.message}
                onClose={() => setToast((prev) => ({ ...prev, show: false }))}
            />

            {/* Top Page Header */}
            <MenuHeader
                onAddNew={() => {
                    setSelectedMenu(null);
                    setFormKey((k) => k + 1);
                }}
                onLivePreview={() => setShowLivePreview(true)}
                canCreate={can.create}
            />

            {/* Tips & Guide Info Banner */}
            <MenuTipBanner onOpenGuide={() => setShowLivePreview(true)} />

            {/* 2-Column Responsive Layout (8 Cols Tree + 4 Cols Form) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
                {/* LEFT COLUMN: Tabs, Search, Hierarchy Tree */}
                <div className="lg:col-span-8 flex flex-col gap-6 min-w-0">
                    <MenuCategoryTabs
                        activeCategory={activeCategory}
                        onSelectCategory={handleCategoryChange}
                        metrics={initialMetrics}
                        searchQuery={searchQuery}
                        onSearchChange={handleSearchChange}
                        onExpandAll={handleExpandAll}
                        onCollapseAll={handleCollapseAll}
                        onSaveOrder={handleSaveOrder}
                        isOrderDirty={isOrderDirty}
                        isSavingOrder={isSavingOrder}
                        availableCategories={categories}
                    />

                    <MenuTree
                        menus={menusList}
                        selectedMenuId={selectedMenu?.id || null}
                        expandedParents={expandedParents}
                        isLoading={isLoading}
                        onToggleExpand={handleToggleExpand}
                        onSelectMenu={(menu) => setSelectedMenu(menu)}
                        onAddSubmenu={handleAddSubmenu}
                        onToggleActive={handleToggleActive}
                        onDeleteMenu={(menu) => setDeleteModal({ show: true, menu, isDeleting: false })}
                        onMoveUp={handleMoveUp}
                        onMoveDown={handleMoveDown}
                        canCreate={can.create}
                        canUpdate={can.update}
                        canDelete={can.delete}
                    />
                </div>

                {/* RIGHT COLUMN: Inspector / Quick Edit Form Panel */}
                <div className="lg:col-span-4 flex flex-col min-w-0">
                    <MenuFormPanel
                        key={formKey}
                        editingMenu={selectedMenu}
                        parentMenus={initialParentMenus}
                        currentCategory={activeCategory}
                        availableCategories={categories}
                        rolesList={roles}
                        onSave={handleSaveForm}
                        onReset={() => {
                            setSelectedMenu(null);
                            setFormKey((k) => k + 1);
                        }}
                        isSubmitting={isSubmittingForm}
                    />
                </div>
            </div>

            {/* Bottom Status & CDN Sync Bar */}
            <MenuCacheStatusBar
                metrics={initialMetrics}
                allMenus={menusList}
                onPurgeCache={handlePurgeCache}
                isPurging={isPurging}
            />

            {/* Delete Confirmation Modal */}
            <DeleteConfirmModal
                show={deleteModal.show}
                isDeleting={deleteModal.isDeleting}
                title="Hapus Menu Navigasi?"
                subtitle="Menu dan seluruh anak menu di dalamnya akan dihapus dari sistem."
                itemName={deleteModal.menu?.name}
                itemSubtext={deleteModal.menu ? `Path: /${deleteModal.menu.url}` : undefined}
                warningMessage="Pastikan tidak ada tautan aktif di aplikasi yang mengandalkan menu ini."
                confirmLabel="Ya, Hapus Menu"
                loadingLabel="Sedang menghapus menu..."
                onClose={() => setDeleteModal({ show: false, menu: null, isDeleting: false })}
                onConfirm={handleConfirmDelete}
            />

            {/* Live Navigation Preview Simulation Modal */}
            <MenuLivePreviewModal
                show={showLivePreview}
                onClose={() => setShowLivePreview(false)}
                menus={menusList}
            />

            {/* Popup Loader Modal for Status Toggle */}
            <PopupLoader
                show={statusLoader.show}
                title={statusLoader.title}
                message={statusLoader.message}
            />
        </AuthenticatedLayout>
    );
}
