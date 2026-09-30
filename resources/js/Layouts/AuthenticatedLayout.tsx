import Footer from '@/components/Footer';
import Sidebar from '@/components/Sidebar';
import Topbar from '@/components/Topbar';
import { initTheme } from '@/global';
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

    useEffect(() => {
        initTheme();
    }, []);

    return (
        <div className="min-h-screen bg-surface font-sans text-on-surface antialiased flex flex-col">
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
