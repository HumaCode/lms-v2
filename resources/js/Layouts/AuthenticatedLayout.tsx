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
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 font-sans text-slate-800 dark:text-slate-100 antialiased flex flex-col selection:bg-teal-100 selection:text-teal-900">
            {/* Sidebar Navigation */}
            <Sidebar
                isOpenMobile={isMobileSidebarOpen}
                onCloseMobile={() => setIsMobileSidebarOpen(false)}
            />

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col lg:pl-70 w-full min-w-0 transition-all">
                <Topbar
                    onToggleMobileSidebar={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
                    breadcrumbParent={breadcrumbParent}
                    breadcrumbCurrent={breadcrumbCurrent}
                />

                <main className="flex-1 pt-16 w-full">
                    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                        {children}
                    </div>
                </main>

                <Footer />
            </div>
        </div>
    );
}
