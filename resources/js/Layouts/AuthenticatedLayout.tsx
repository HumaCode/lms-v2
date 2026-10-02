import AppToast, { ToastType } from '@/components/AppToast';
import Footer from '@/components/Footer';
import Sidebar from '@/components/Sidebar';
import Topbar from '@/components/Topbar';
import { initTheme } from '@/global';
import { PageProps } from '@/types';
import { usePage } from '@inertiajs/react';
import { PropsWithChildren, ReactNode, useEffect, useState } from 'react';

interface AuthenticatedLayoutProps extends PropsWithChildren {
    header?: ReactNode;
    breadcrumbParent?: string;
    breadcrumbCurrent?: string;
}

export default function AuthenticatedLayout({
    children,
    breadcrumbParent,
    breadcrumbCurrent,
}: AuthenticatedLayoutProps) {
    const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
    const { flash } = usePage<PageProps>().props;

    const [toast, setToast] = useState<{
        show: boolean;
        type: ToastType;
        title?: string;
        message?: string;
    }>({
        show: false,
        type: 'success',
    });

    useEffect(() => {
        initTheme();
    }, []);

    // Listen to flash changes from Inertia
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
                title: 'Terjadi Kesalahan',
                message: flash.error,
            });
        } else if (flash?.warning) {
            setToast({
                show: true,
                type: 'warning',
                title: 'Peringatan',
                message: flash.warning,
            });
        } else if (flash?.info) {
            setToast({
                show: true,
                type: 'info',
                title: 'Informasi',
                message: flash.info,
            });
        }
    }, [flash]);

    return (
        <div className="min-h-screen bg-surface font-sans text-on-surface antialiased flex flex-col">
            {/* Top Dynamic Island Toast Notification */}
            <AppToast
                show={toast.show}
                type={toast.type}
                title={toast.title}
                message={toast.message}
                onClose={() => setToast((prev) => ({ ...prev, show: false }))}
            />

            {/* Sidebar Navigation */}
            <Sidebar
                isOpenMobile={isMobileSidebarOpen}
                onCloseMobile={() => setIsMobileSidebarOpen(false)}
            />

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col lg:pl-72 w-full min-w-0 transition-all">
                <Topbar
                    onToggleMobileSidebar={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
                    breadcrumbParent={breadcrumbParent}
                    breadcrumbCurrent={breadcrumbCurrent}
                />

                <main className="flex-1 pt-16 w-full px-5 sm:px-6 lg:px-8 py-6">
                    {children}
                </main>

                <Footer />
            </div>
        </div>
    );
}
