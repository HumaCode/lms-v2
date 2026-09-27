import { Link } from '@inertiajs/react';

export default function AboutVisionSection() {
    return (
        <section className="max-w-[1280px] mx-auto px-4 lg:px-8 pb-20 pt-6">
            <div className="relative rounded-3xl bg-gradient-to-br from-teal-800 via-teal-900 to-slate-900 p-8 lg:p-14 overflow-hidden shadow-xl text-white">
                {/* Background decorative glow */}
                <div className="absolute -right-20 -bottom-20 w-96 h-96 bg-teal-400/10 rounded-full blur-[100px] pointer-events-none" />
                <div className="absolute -left-20 -top-20 w-80 h-80 bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none" />

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
                    {/* Left: Vision Description */}
                    <div className="lg:col-span-8 flex flex-col gap-5">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 w-fit text-xs font-mono font-semibold">
                            <span className="material-symbols-outlined text-sm">rocket_launch</span>
                            <span>Visi Masa Depan &amp; Revolusi AI</span>
                        </div>

                        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight">
                            Mempersiapkan Generasi Coder yang Tidak Tergantikan oleh AI.
                        </h2>

                        <p className="text-sm lg:text-base text-teal-100/80 leading-relaxed">
                            Dunia coding bertransformasi cepat dengan hadirnya kecerdasan buatan. Di HC Course, kami tidak gentar. Kami mengintegrasikan literasi AI ke dalam alur kerja rekayasa perangkat lunak modern: mengasah kemampuan arsitektural, pemecahan masalah kritis, dan intuisi desain sistem yang mendalam.
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                            <div className="flex items-start gap-3 bg-white/10 backdrop-blur-sm p-4 rounded-2xl border border-white/10">
                                <span className="material-symbols-outlined text-teal-300 text-2xl mt-0.5 shrink-0">
                                    neurology
                                </span>
                                <div>
                                    <h4 className="text-sm font-bold text-white">
                                        Kurikulum Adaptif AI
                                    </h4>
                                    <p className="text-xs text-teal-100/70 mt-0.5 leading-relaxed">
                                        Belajar memanfaatkan LLM sebagai asisten produktif, bukan sekadar peniru kode.
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3 bg-white/10 backdrop-blur-sm p-4 rounded-2xl border border-white/10">
                                <span className="material-symbols-outlined text-amber-300 text-2xl mt-0.5 shrink-0">
                                    verified_user
                                </span>
                                <div>
                                    <h4 className="text-sm font-bold text-white">
                                        Standar Karir Global
                                    </h4>
                                    <p className="text-xs text-teal-100/70 mt-0.5 leading-relaxed">
                                        Mempersiapkanmu bersaing di bursa kerja internasional dengan portofolio teruji.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right: CTA Box Column */}
                    <div className="lg:col-span-4 flex flex-col gap-4 bg-white text-slate-900 p-6 sm:p-7 rounded-2xl shadow-lg border border-slate-100">
                        <span className="text-[11px] font-mono font-bold text-teal-600 uppercase tracking-wider">
                            Mulai Hari Ini
                        </span>
                        <h3 className="text-lg font-bold text-slate-900 leading-snug">
                            Siap Naik Kelas Bersama Ribuan Rekan Seperjuangan?
                        </h3>
                        <p className="text-xs text-slate-500 leading-relaxed">
                            Dapatkan akses langsung ke katalog kursus terstruktur, modul interaktif, dan server Discord VIP HC Course.
                        </p>

                        <div className="flex flex-col gap-2.5 pt-2">
                            <Link
                                href="/#katalog-kursus"
                                className="w-full text-center px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs sm:text-sm font-semibold shadow-xs hover:shadow transition-all"
                            >
                                Lihat Katalog Kursus
                            </Link>
                            <Link
                                href="/#bootcamp"
                                className="w-full text-center px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs sm:text-sm font-semibold transition-colors border border-slate-200"
                            >
                                Daftar Bootcamp Intensif
                            </Link>
                        </div>

                        <div className="pt-3 border-t border-slate-100 text-center">
                            <span className="text-[11px] font-mono text-slate-400 flex items-center justify-center gap-1.5">
                                <span className="material-symbols-outlined text-sm text-emerald-600">
                                    lock
                                </span>
                                Akses Fleksibel • Garansi Materi Terkini
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
