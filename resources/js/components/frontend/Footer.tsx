import { Link } from '@inertiajs/react';

export default function Footer() {
    return (
        <footer className="w-full bg-white border-t border-slate-200/60 mt-auto">
            <div className="max-w-[1280px] mx-auto px-4 lg:px-8 py-10 lg:py-14">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-10">
                    {/* Brand Info & Mission */}
                    <div className="lg:col-span-2 flex flex-col gap-4">
                        <Link href="/" className="flex items-center gap-3">
                            <div className="relative flex items-center justify-center w-9 h-9 rounded-xl bg-teal-600 text-white shadow-xs">
                                <span className="font-bold text-sm tracking-tight select-none font-sans">
                                    HC
                                </span>
                            </div>
                            <span className="text-[17px] font-bold text-slate-800 tracking-tight">
                                HC<span className="text-teal-600">Course</span>
                            </span>
                        </Link>
                        <p className="text-xs sm:text-sm text-slate-500 max-w-sm leading-relaxed">
                            Platform edukasi pemrograman web berbahasa Indonesia terlengkap dari Web Programming UNPAS.
                            Dirancang tenang, minim distorsi, dan fokus membangun fondasi software engineer yang tangguh.
                        </p>
                        <div className="flex items-center gap-2 pt-1">
                            <a
                                aria-label="YouTube"
                                href="https://www.youtube.com/@sandhikagalihWPU"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-8 h-8 rounded-lg bg-slate-50 hover:bg-slate-100 flex items-center justify-center text-slate-500 hover:text-teal-600 transition-colors"
                            >
                                <span className="material-symbols-outlined text-base">play_circle</span>
                            </a>
                            <a
                                aria-label="Discord Community"
                                href="https://discord.gg/wpu"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-8 h-8 rounded-lg bg-slate-50 hover:bg-slate-100 flex items-center justify-center text-slate-500 hover:text-teal-600 transition-colors"
                            >
                                <span className="material-symbols-outlined text-base">forum</span>
                            </a>
                            <a
                                aria-label="GitHub Repo"
                                href="https://github.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-8 h-8 rounded-lg bg-slate-50 hover:bg-slate-100 flex items-center justify-center text-slate-500 hover:text-teal-600 transition-colors"
                            >
                                <span className="material-symbols-outlined text-base">terminal</span>
                            </a>
                            <a
                                aria-label="Instagram"
                                href="https://instagram.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-8 h-8 rounded-lg bg-slate-50 hover:bg-slate-100 flex items-center justify-center text-slate-500 hover:text-teal-600 transition-colors"
                            >
                                <span className="material-symbols-outlined text-base">share</span>
                            </a>
                        </div>
                    </div>

                    {/* Column 1: Kategori Belajar */}
                    <div className="flex flex-col gap-3">
                        <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                            Kategori Belajar
                        </span>
                        <ul className="flex flex-col gap-2.5 text-sm text-slate-600">
                            <li>
                                <a href="/#katalog-kursus" className="hover:text-teal-600 transition-colors">
                                    Frontend Development
                                </a>
                            </li>
                            <li>
                                <a href="/#katalog-kursus" className="hover:text-teal-600 transition-colors">
                                    Backend Architecture
                                </a>
                            </li>
                            <li>
                                <a href="/#katalog-kursus" className="hover:text-teal-600 transition-colors">
                                    Full-Stack JavaScript
                                </a>
                            </li>
                            <li>
                                <a href="/#katalog-kursus" className="hover:text-teal-600 transition-colors">
                                    DevOps & Linux Studio
                                </a>
                            </li>
                            <li>
                                <a href="/#katalog-kursus" className="hover:text-teal-600 transition-colors">
                                    Modern PHP & Laravel
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Column 2: Bootcamp & Karir */}
                    <div className="flex flex-col gap-3">
                        <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                            Bootcamp & Karir
                        </span>
                        <ul className="flex flex-col gap-2.5 text-sm text-slate-600">
                            <li>
                                <a href="/#bootcamp" className="hover:text-teal-600 transition-colors">
                                    Batch Terbuka 2025
                                </a>
                            </li>
                            <li>
                                <a href="/#bootcamp" className="hover:text-teal-600 transition-colors">
                                    Kurikulum Industri
                                </a>
                            </li>
                            <li>
                                <a href="/#bootcamp" className="hover:text-teal-600 transition-colors">
                                    Penyaluran Kerja
                                </a>
                            </li>
                            <li>
                                <a href="/#bootcamp" className="hover:text-teal-600 transition-colors">
                                    Portofolio & Review
                                </a>
                            </li>
                            <li>
                                <a href="/#bootcamp" className="hover:text-teal-600 transition-colors">
                                    Sertifikasi Resmi WPU
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Column 3: Dukungan & Info */}
                    <div className="flex flex-col gap-3">
                        <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                            Dukungan & Info
                        </span>
                        <ul className="flex flex-col gap-2.5 text-sm text-slate-600">
                            <li>
                                <a href="/#faqAccordion" className="hover:text-teal-600 transition-colors">
                                    Pusat Bantuan / FAQ
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-teal-600 transition-colors">
                                    Ketentuan Layanan
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-teal-600 transition-colors">
                                    Kebijakan Privasi
                                </a>
                            </li>
                            <li>
                                <a href="/#tentang-kami" className="hover:text-teal-600 transition-colors">
                                    Hubungi Mentor
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-teal-600 transition-colors">
                                    Status Server LMS
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
                    <span>
                        © {new Date().getFullYear()} Web Programming UNPAS (WPU Course). Seluruh hak cipta dilindungi.
                    </span>
                    <div className="flex items-center gap-6">
                        <span className="font-mono text-slate-500 flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                            BANDUNG, INDONESIA
                        </span>
                        <span className="font-mono text-slate-400">v2.4.0-PRO</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
