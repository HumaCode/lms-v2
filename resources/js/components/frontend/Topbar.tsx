import { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';

export default function Topbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isProgramMenuOpen, setIsProgramMenuOpen] = useState(false);
    const [isKomunitasMenuOpen, setIsKomunitasMenuOpen] = useState(false);

    const { url, props } = usePage();
    const user = (props as any)?.auth?.user;
    const isHomePage = url === '/';
    const isAboutPage = url.startsWith('/tentang-kami');
    const isCoursePage = url.startsWith('/kursus');

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200/60">
            <div className="h-16 max-w-[1280px] mx-auto px-4 lg:px-8 flex items-center justify-between gap-6">
                {/* Brand Logo HC & Search Bar */}
                <div className="flex items-center gap-6">
                    <Link
                        href="/"
                        className="flex items-center gap-3 group shrink-0"
                    >
                        {/* Custom Modern HC Logo Icon - Soft & Organic */}
                        <div className="relative flex items-center justify-center w-9 h-9 rounded-xl bg-teal-600 text-white shadow-xs group-hover:bg-teal-700 transition-colors">
                            <span className="font-bold text-sm tracking-tight select-none font-sans">
                                HC
                            </span>
                        </div>

                        <span className="flex flex-col">
                            <span className="text-[17px] font-bold text-slate-800 tracking-tight group-hover:text-teal-600 transition-colors leading-tight">
                                HC<span className="text-teal-600">Course</span>
                            </span>
                            <span className="text-[10px] text-slate-400 font-medium tracking-wide">
                                dev studio
                            </span>
                        </span>
                    </Link>

                    <div className="hidden 2xl:flex items-center relative w-60">
                        <span className="material-symbols-outlined absolute left-3 text-slate-400 text-lg pointer-events-none">
                            search
                        </span>
                        <input
                            type="text"
                            placeholder="Cari materi coding..."
                            className="w-full bg-slate-50/80 text-slate-800 placeholder:text-slate-400 text-xs pl-9 pr-3 py-1.5 rounded-lg border border-slate-200/60 focus:outline-none focus:border-teal-500 focus:bg-white transition-all"
                        />
                    </div>
                </div>

                {/* Desktop Navigation */}
                <nav className="hidden lg:flex items-center gap-6">
                    <Link
                        href="/"
                        className={`py-1 text-sm font-medium transition-colors ${
                            isHomePage
                                ? 'text-teal-600 font-semibold border-b-2 border-teal-600'
                                : 'text-slate-600 hover:text-slate-900'
                        }`}
                    >
                        Beranda
                    </Link>
                    <Link
                        href="/kursus"
                        className={`py-1 text-sm font-medium transition-colors ${
                            isCoursePage
                                ? 'text-teal-600 font-semibold border-b-2 border-teal-600'
                                : 'text-slate-600 hover:text-slate-900'
                        }`}
                    >
                        Katalog Kursus
                    </Link>
                    <Link
                        href="/tentang-kami"
                        className={`py-1 text-sm font-medium transition-colors ${
                            isAboutPage
                                ? 'text-teal-600 font-semibold border-b-2 border-teal-600'
                                : 'text-slate-600 hover:text-slate-900'
                        }`}
                    >
                        Tentang Kami
                    </Link>

                    {/* Program Megamenu Trigger */}
                    <div className="relative group py-2">
                        <button
                            type="button"
                            className="flex items-center gap-1 text-sm font-medium text-slate-600 group-hover:text-slate-900 transition-colors py-1 focus:outline-none"
                        >
                            <span>Program</span>
                            <span className="material-symbols-outlined text-base transition-transform duration-200 group-hover:rotate-180 text-slate-400 group-hover:text-slate-700">
                                expand_more
                            </span>
                        </button>

                        {/* Megamenu Dropdown Container */}
                        <div className="absolute left-1/2 -translate-x-1/2 top-full pt-2 w-[740px] opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-200 z-50">
                            <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-6">
                                <h3 className="text-base font-bold text-slate-900 mb-5 px-1">
                                    Program
                                </h3>
                                <div className="grid grid-cols-3 gap-x-6 gap-y-6">
                                    {/* Online Course */}
                                    <Link
                                        href="/kursus"
                                        className="flex items-start gap-3.5 p-2 rounded-xl hover:bg-slate-50 transition-colors group/item"
                                    >
                                        <div className="w-10 h-10 rounded-lg bg-teal-50 flex items-center justify-center text-teal-600 shrink-0 group-hover/item:bg-teal-600 group-hover/item:text-white transition-colors">
                                            <span className="material-symbols-outlined text-2xl">
                                                videocam
                                            </span>
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-sm font-semibold text-teal-600 group-hover/item:text-teal-700 transition-colors leading-snug">
                                                Online Course
                                            </span>
                                            <span className="text-xs text-slate-500 leading-relaxed mt-0.5">
                                                Belajar melalui video, akses selamanya dan dapatkan sertifikat
                                            </span>
                                        </div>
                                    </Link>

                                    {/* Bootcamp */}
                                    <a
                                        href="/#bootcamp"
                                        className="flex items-start gap-3.5 p-2 rounded-xl hover:bg-slate-50 transition-colors group/item"
                                    >
                                        <div className="w-10 h-10 rounded-lg bg-teal-50 flex items-center justify-center text-teal-600 shrink-0 group-hover/item:bg-teal-600 group-hover/item:text-white transition-colors">
                                            <span className="material-symbols-outlined text-2xl">
                                                menu_book
                                            </span>
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-sm font-semibold text-teal-600 group-hover/item:text-teal-700 transition-colors leading-snug">
                                                Bootcamp
                                            </span>
                                            <span className="text-xs text-slate-500 leading-relaxed mt-0.5">
                                                Belajar secara interaktif untuk tingkatkan kemampuan digital kamu
                                            </span>
                                        </div>
                                    </a>

                                    {/* Partnership */}
                                    <a
                                        href="/#kontak"
                                        className="flex items-start gap-3.5 p-2 rounded-xl hover:bg-slate-50 transition-colors group/item"
                                    >
                                        <div className="w-10 h-10 rounded-lg bg-teal-50 flex items-center justify-center text-teal-600 shrink-0 group-hover/item:bg-teal-600 group-hover/item:text-white transition-colors">
                                            <span className="material-symbols-outlined text-2xl">
                                                handshake
                                            </span>
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-sm font-semibold text-teal-600 group-hover/item:text-teal-700 transition-colors leading-snug">
                                                Partnership
                                            </span>
                                            <span className="text-xs text-slate-500 leading-relaxed mt-0.5">
                                                Kerjasama dengan perusahaan untuk branding dan promosi
                                            </span>
                                        </div>
                                    </a>

                                    {/* Talks */}
                                    <a
                                        href="/#kontak"
                                        className="flex items-start gap-3.5 p-2 rounded-xl hover:bg-slate-50 transition-colors group/item"
                                    >
                                        <div className="w-10 h-10 rounded-lg bg-teal-50 flex items-center justify-center text-teal-600 shrink-0 group-hover/item:bg-teal-600 group-hover/item:text-white transition-colors">
                                            <span className="material-symbols-outlined text-2xl">
                                                mic
                                            </span>
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-sm font-semibold text-teal-600 group-hover/item:text-teal-700 transition-colors leading-snug">
                                                Talks
                                            </span>
                                            <span className="text-xs text-slate-500 leading-relaxed mt-0.5">
                                                Undang founder dan mentor untuk menjadi pembicara di event kamu
                                            </span>
                                        </div>
                                    </a>

                                    {/* AI Guru */}
                                    <div className="flex items-start gap-3.5 p-2 rounded-xl group/item">
                                        <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center text-slate-700 shrink-0">
                                            <span className="material-symbols-outlined text-2xl">
                                                psychology
                                            </span>
                                        </div>
                                        <div className="flex flex-col">
                                            <div className="flex items-center gap-1.5 flex-wrap">
                                                <span className="text-sm font-semibold text-slate-900 leading-snug">
                                                    AI Guru
                                                </span>
                                                <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-slate-500 text-white font-medium">
                                                    Segera Hadir
                                                </span>
                                            </div>
                                            <span className="text-xs text-slate-500 leading-relaxed mt-0.5">
                                                Belajar dengan mentor AI yang siap membantu kamu kapan saja.
                                            </span>
                                        </div>
                                    </div>

                                    {/* Corporate Training */}
                                    <div className="flex items-start gap-3.5 p-2 rounded-xl group/item">
                                        <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center text-slate-700 shrink-0">
                                            <span className="material-symbols-outlined text-2xl">
                                                domain
                                            </span>
                                        </div>
                                        <div className="flex flex-col">
                                            <div className="flex items-center gap-1.5 flex-wrap">
                                                <span className="text-sm font-semibold text-slate-900 leading-snug">
                                                    Corporate Training
                                                </span>
                                                <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-slate-500 text-white font-medium">
                                                    Segera Hadir
                                                </span>
                                            </div>
                                            <span className="text-xs text-slate-500 leading-relaxed mt-0.5">
                                                Tingkatkan kemampuan melalui pelatihan untuk perusahaan kamu
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Komunitas Dropdown */}
                    <div className="relative group py-2">
                        <button
                            type="button"
                            className="flex items-center gap-1 text-sm font-medium text-slate-600 group-hover:text-slate-900 transition-colors py-1 focus:outline-none"
                        >
                            <span>Komunitas</span>
                            <span className="material-symbols-outlined text-base transition-transform duration-200 group-hover:rotate-180 text-slate-400 group-hover:text-slate-700">
                                expand_more
                            </span>
                        </button>
                        <div className="absolute left-0 top-full pt-2 w-56 opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-200 z-50">
                            <div className="bg-white rounded-xl shadow-lg border border-slate-100 p-2 flex flex-col gap-1">
                                <a
                                    className="flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-slate-50 text-slate-700 hover:text-teal-600 transition-colors text-sm font-medium"
                                    href="https://discord.gg/wpu"
                                    rel="noopener noreferrer"
                                    target="_blank"
                                >
                                    <span className="material-symbols-outlined text-lg text-indigo-600">
                                        forum
                                    </span>
                                    <span>Discord Community</span>
                                </a>
                                <a
                                    className="flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-slate-50 text-slate-700 hover:text-teal-600 transition-colors text-sm font-medium"
                                    href="/#faqAccordion"
                                >
                                    <span className="material-symbols-outlined text-lg text-teal-600">
                                        live_help
                                    </span>
                                    <span>Forum Tanya Jawab</span>
                                </a>
                                <a
                                    className="flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-slate-50 text-slate-700 hover:text-teal-600 transition-colors text-sm font-medium"
                                    href="/#tentang-kami"
                                >
                                    <span className="material-symbols-outlined text-lg text-amber-600">
                                        award_star
                                    </span>
                                    <span>Showcase Portofolio</span>
                                </a>
                            </div>
                        </div>
                    </div>

                    <a
                        href="/#faqAccordion"
                        className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors py-1"
                    >
                        Kontak
                    </a>
                </nav>

                {/* Right Action Buttons (Daftar & Masuk) */}
                <div className="flex items-center gap-3">
                    <div className="hidden sm:flex items-center gap-2">
                        {user ? (
                            <Link
                                href="/dashboard"
                                className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-teal-50 hover:bg-teal-100 text-teal-800 text-sm font-semibold transition-colors border border-teal-200/60"
                            >
                                <span className="material-symbols-outlined text-base">dashboard</span>
                                <span>Dashboard</span>
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href="/register"
                                    className="px-4 py-2 rounded-lg text-slate-700 hover:text-teal-700 hover:bg-slate-100/70 text-sm font-medium transition-colors"
                                >
                                    Daftar
                                </Link>
                                <Link
                                    href="/login"
                                    className="px-4 py-2 rounded-lg bg-teal-600 hover:bg-teal-700 text-white text-sm font-medium transition-colors shadow-xs"
                                >
                                    Masuk
                                </Link>
                            </>
                        )}
                    </div>

                    {/* Mobile Hamburger Button */}
                    <button
                        aria-label="Buka Menu Navigasi"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="lg:hidden p-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition-colors"
                        type="button"
                    >
                        <span className="material-symbols-outlined text-2xl">
                            {isMobileMenuOpen ? 'close' : 'menu'}
                        </span>
                    </button>
                </div>
            </div>

            {/* Mobile Nav Drawer */}
            {isMobileMenuOpen && (
                <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-6 flex flex-col gap-4 shadow-lg animate-in fade-in duration-200">
                    <div className="flex items-center relative w-full pt-2">
                        <span className="material-symbols-outlined absolute left-3 text-slate-400 text-lg pointer-events-none">
                            search
                        </span>
                        <input
                            type="text"
                            placeholder="Cari materi coding..."
                            className="w-full bg-slate-50 text-slate-900 placeholder:text-slate-400 text-xs pl-9 pr-3 py-2 rounded-lg border border-slate-200"
                        />
                    </div>

                    <div className="flex flex-col gap-1 border-t border-slate-100 pt-2">
                        <Link
                            href="/"
                            onClick={() => setIsMobileMenuOpen(false)}
                            className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                                isHomePage
                                    ? 'bg-teal-50 text-teal-700'
                                    : 'text-slate-700 hover:bg-slate-50'
                            }`}
                        >
                            Beranda
                        </Link>
                        <Link
                            href="/kursus"
                            onClick={() => setIsMobileMenuOpen(false)}
                            className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                                isCoursePage
                                    ? 'bg-teal-50 text-teal-700'
                                    : 'text-slate-700 hover:bg-slate-50'
                            }`}
                        >
                            Katalog Kursus
                        </Link>
                        <Link
                            href="/tentang-kami"
                            onClick={() => setIsMobileMenuOpen(false)}
                            className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                                isAboutPage
                                    ? 'bg-teal-50 text-teal-700'
                                    : 'text-slate-700 hover:bg-slate-50'
                            }`}
                        >
                            Tentang Kami
                        </Link>

                        {/* Program Mobile Toggle */}
                        <div>
                            <button
                                onClick={() => setIsProgramMenuOpen(!isProgramMenuOpen)}
                                className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-slate-700 hover:bg-slate-50 font-medium text-sm"
                            >
                                <span>Program</span>
                                <span className="material-symbols-outlined text-sm">
                                    {isProgramMenuOpen ? 'expand_less' : 'expand_more'}
                                </span>
                            </button>
                            {isProgramMenuOpen && (
                                <div className="pl-4 pr-2 py-2 flex flex-col gap-2 bg-slate-50 rounded-lg my-1">
                                    <Link
                                        href="/kursus"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="text-xs font-semibold text-teal-700 py-1"
                                    >
                                        Online Course
                                    </Link>
                                    <a
                                        href="/#bootcamp"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="text-xs font-semibold text-teal-700 py-1"
                                    >
                                        Bootcamp (Batch #14)
                                    </a>
                                </div>
                            )}
                        </div>

                        {/* Komunitas Mobile Toggle */}
                        <div>
                            <button
                                onClick={() => setIsKomunitasMenuOpen(!isKomunitasMenuOpen)}
                                className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-slate-700 hover:bg-slate-50 font-medium text-sm"
                            >
                                <span>Komunitas</span>
                                <span className="material-symbols-outlined text-sm">
                                    {isKomunitasMenuOpen ? 'expand_less' : 'expand_more'}
                                </span>
                            </button>
                            {isKomunitasMenuOpen && (
                                <div className="pl-4 pr-2 py-2 flex flex-col gap-2 bg-slate-50 rounded-lg my-1">
                                    <a
                                        href="https://discord.gg/wpu"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-xs text-indigo-700 font-semibold py-1 flex items-center gap-1.5"
                                    >
                                        <span className="material-symbols-outlined text-sm">forum</span>
                                        Discord Community (100K+)
                                    </a>
                                </div>
                            )}
                        </div>

                        <a
                            href="/#faqAccordion"
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="px-3 py-2 rounded-lg text-slate-700 hover:bg-slate-50 font-medium text-sm"
                        >
                            Kontak / FAQ
                        </a>
                    </div>

                    <div className="flex gap-2 pt-2 border-t border-slate-100">
                        {user ? (
                            <Link
                                href="/dashboard"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="flex-1 py-2 rounded-lg bg-teal-600 text-white text-sm font-semibold text-center"
                            >
                                Ke Dashboard
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href="/register"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="flex-1 py-2 rounded-lg border border-teal-600 text-teal-600 text-sm font-semibold text-center"
                                >
                                    Daftar
                                </Link>
                                <Link
                                    href="/login"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="flex-1 py-2 rounded-lg bg-teal-600 text-white text-sm font-semibold text-center"
                                >
                                    Masuk
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            )}
        </header>
    );
}
