import { ReactNode } from 'react';
import Topbar from './Topbar';
import Footer from './Footer';

interface FrontendLayoutProps {
    children: ReactNode;
}

export default function FrontendLayout({ children }: FrontendLayoutProps) {
    return (
        <div className="bg-slate-50 text-slate-900 antialiased min-h-screen flex flex-col selection:bg-teal-500/20 selection:text-teal-700">
            {/* Topbar Navigasi Reusable */}
            <Topbar />

            {/* Konten Halaman */}
            <main className="w-full pt-16 flex-1">
                {children}
            </main>

            {/* Footer Reusable */}
            <Footer />
        </div>
    );
}
