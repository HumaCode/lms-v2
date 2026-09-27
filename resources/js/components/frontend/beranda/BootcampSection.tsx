export default function BootcampSection() {
    return (
        <section className="max-w-[1280px] mx-auto px-4 lg:px-8 py-16" id="bootcamp">
            <div className="relative rounded-3xl bg-white border border-slate-200/70 p-8 lg:p-12 shadow-xs overflow-hidden">
                <div className="absolute -right-20 -top-20 w-80 h-80 bg-teal-100/40 rounded-full blur-3xl pointer-events-none" />

                {/* Banner Header */}
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-10 border-b border-slate-100">
                    <div className="flex flex-col gap-2 max-w-2xl">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50/80 text-amber-800 border border-amber-200/60 w-fit text-xs font-medium">
                            <span className="font-semibold">Bootcamp 2025</span>
                            <span className="text-amber-300">•</span>
                            <span>Batch #14 Terbuka</span>
                        </div>
                        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                            Full-Stack Web Developer Career Accelerator
                        </h2>
                        <p className="text-sm text-slate-600 leading-relaxed">
                            Program intensif 16 minggu yang mengubahmu dari pemula menjadi Full-Stack Engineer handal. Dibimbing langsung dengan standar kode perusahaan rintisan papan atas.
                        </p>
                    </div>
                    <div className="flex flex-col sm:flex-row lg:flex-col gap-3 min-w-[200px]">
                        <a
                            href="#bootcamp"
                            className="px-6 py-3 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-medium text-sm text-center transition-all shadow-xs"
                        >
                            Daftar Batch #14
                        </a>
                        <div className="flex items-center justify-center gap-1.5 text-xs text-slate-500">
                            <span className="material-symbols-outlined text-sm text-emerald-500">
                                schedule
                            </span>
                            <span>Sisa 8 Kursi Tersedia</span>
                        </div>
                    </div>
                </div>

                {/* Roadmap 16 Minggu */}
                <div className="py-10">
                    <div className="flex items-center justify-between mb-8">
                        <h3 className="text-lg font-semibold text-slate-900">
                            Roadmap 16 Minggu Menuju Siap Kerja
                        </h3>
                        <span className="text-xs text-teal-700 font-semibold hidden sm:inline-block">
                            Live Sesi Malam &amp; Sabtu
                        </span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="rounded-2xl bg-slate-50/70 border border-slate-200/50 p-5 flex flex-col justify-between">
                            <div className="flex flex-col gap-2">
                                <span className="text-xs text-teal-700 font-semibold">
                                    Fase 1 (Minggu 1-4)
                                </span>
                                <h4 className="text-sm font-semibold text-slate-800">
                                    Core Fundamentals
                                </h4>
                                <p className="text-xs text-slate-500 leading-relaxed">
                                    Logika algoritma, Git branching &amp; collaboration, modern JS ES2024, modular UI layouting, dan problem solving dasar.
                                </p>
                            </div>
                            <div className="pt-4 mt-4 border-t border-slate-200/50 text-xs text-slate-400 font-medium">
                                Milestone: Mini Web Apps
                            </div>
                        </div>

                        <div className="rounded-2xl bg-slate-50/70 border border-slate-200/50 p-5 flex flex-col justify-between">
                            <div className="flex flex-col gap-2">
                                <span className="text-xs text-indigo-600 font-semibold">
                                    Fase 2 (Minggu 5-8)
                                </span>
                                <h4 className="text-sm font-semibold text-slate-800">
                                    Modern Frontend Mastery
                                </h4>
                                <p className="text-xs text-slate-500 leading-relaxed">
                                    React 19, Next.js App Router, State Management (Zustand), Responsive UI dengan Tailwind CSS, and Performance Optimization.
                                </p>
                            </div>
                            <div className="pt-4 mt-4 border-t border-slate-200/50 text-xs text-slate-400 font-medium">
                                Milestone: Interactive Dashboard
                            </div>
                        </div>

                        <div className="rounded-2xl bg-slate-50/70 border border-slate-200/50 p-5 flex flex-col justify-between">
                            <div className="flex flex-col gap-2">
                                <span className="text-xs text-amber-700 font-semibold">
                                    Fase 3 (Minggu 9-12)
                                </span>
                                <h4 className="text-sm font-semibold text-slate-800">
                                    Robust Backend &amp; DB
                                </h4>
                                <p className="text-xs text-slate-500 leading-relaxed">
                                    Node.js / Go RESTful API, PostgreSQL database modeling, Prisma, Redis cache, JWT Auth, Docker containerization.
                                </p>
                            </div>
                            <div className="pt-4 mt-4 border-t border-slate-200/50 text-xs text-slate-400 font-medium">
                                Milestone: Secure Backend Services
                            </div>
                        </div>

                        <div className="rounded-2xl bg-slate-50/70 border border-slate-200/50 p-5 flex flex-col justify-between">
                            <div className="flex flex-col gap-2">
                                <span className="text-xs text-emerald-700 font-semibold">
                                    Fase 4 (Minggu 13-16)
                                </span>
                                <h4 className="text-sm font-semibold text-slate-800">
                                    Capstone &amp; Showcase
                                </h4>
                                <p className="text-xs text-slate-500 leading-relaxed">
                                    Membangun produk full-stack tim skala nyata, mock technical interview, bedah resume ATS, dan showcase langsung ke hiring partner.
                                </p>
                            </div>
                            <div className="pt-4 mt-4 border-t border-slate-200/50 text-xs text-slate-400 font-medium">
                                Milestone: Hiring Partner Demo
                            </div>
                        </div>
                    </div>
                </div>

                {/* 3 Pillars Benefit */}
                <div className="pt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50/60 border border-slate-200/50">
                        <div className="w-11 h-11 rounded-xl bg-teal-50 flex items-center justify-center text-teal-700 shrink-0">
                            <span className="material-symbols-outlined text-2xl">rate_review</span>
                        </div>
                        <div className="flex flex-col">
                            <h5 className="text-sm font-semibold text-slate-800">
                                1-on-1 Code Review
                            </h5>
                            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                                Setiap baris kode dianalisis praktisi senior untuk memastikan best practices dan efisiensi.
                            </p>
                        </div>
                    </div>
                    <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50/60 border border-slate-200/50">
                        <div className="w-11 h-11 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-700 shrink-0">
                            <span className="material-symbols-outlined text-2xl">record_voice_over</span>
                        </div>
                        <div className="flex flex-col">
                            <h5 className="text-sm font-semibold text-slate-800">
                                Mock Interview HR &amp; Teknis
                            </h5>
                            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                                Simulasi interview nyata dengan feedback jujur sebelum melamar ke industri teknologi.
                            </p>
                        </div>
                    </div>
                    <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50/60 border border-slate-200/50">
                        <div className="w-11 h-11 rounded-xl bg-amber-50 flex items-center justify-center text-amber-700 shrink-0">
                            <span className="material-symbols-outlined text-2xl">verified_user</span>
                        </div>
                        <div className="flex flex-col">
                            <h5 className="text-sm font-semibold text-slate-800">
                                Komunitas VIP Seumur Hidup
                            </h5>
                            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                                Channel eksklusif lowongan kerja langsung dari jaringan alumni dan rekanan industri.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
