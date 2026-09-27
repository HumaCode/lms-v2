export default function AboutHeroSection() {
    return (
        <section className="relative overflow-hidden pt-12 pb-16 lg:pt-18 lg:pb-24">
            {/* Soft Ambient Background Elements */}
            <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[720px] h-[340px] bg-teal-500/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute top-80 -left-20 w-80 h-80 bg-indigo-500/5 rounded-full blur-[100px] pointer-events-none" />

            <div className="max-w-[1280px] mx-auto px-4 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
                    {/* Left: Narrative & Typography */}
                    <div className="lg:col-span-7 flex flex-col gap-6">
                        <div className="inline-flex items-center gap-2 self-start px-3.5 py-1.5 rounded-full bg-teal-50 border border-teal-200/60 text-teal-800 text-xs font-semibold">
                            <span className="w-2 h-2 rounded-full bg-teal-500 animate-ping" />
                            <span className="uppercase tracking-wider">Tentang Kami — HC Course</span>
                        </div>

                        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.2]">
                            Mendemokratisasi Akses Edukasi Teknologi Berkualitas di Seluruh{' '}
                            <span className="text-teal-600 italic">Indonesia</span>.
                        </h1>

                        <p className="text-base lg:text-lg text-slate-600 leading-relaxed">
                            Berawal pada tahun 2015 dari sebuah meja kerja sederhana dan hasrat murni seorang dosen muda, Sandhika Galih, untuk membagikan rekaman kuliah dasar pemrograman secara cuma-cuma melalui kanal YouTube{' '}
                            <strong className="text-slate-800 font-semibold">Web Programming UNPAS</strong>. Tanpa studio mewah, namun dipandu gaya penyampaian ramah, hangat, dan analogi membumi.
                        </p>

                        <p className="text-sm lg:text-base text-slate-500 leading-relaxed">
                            Kini, inisiatif santai tersebut bermutasi menjadi rumah belajar bagi ratusan ribu calon engineer, software builder, serta career switchers dari Sabang hingga Merauke. Melalui HC Course, kami menghadirkan kurikulum industri terstruktur, suasana belajar yang tenang, dan ekosistem coding yang saling merawat.
                        </p>

                        <div className="flex flex-wrap items-center gap-4 pt-2">
                            <a
                                href="#filosofi"
                                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-sm font-semibold shadow-xs hover:shadow transition-all"
                            >
                                <span>Eksplor Filosofi Belajar</span>
                                <span className="material-symbols-outlined text-base">arrow_downward</span>
                            </a>
                            <a
                                href="#mentor"
                                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white hover:bg-slate-100 text-slate-700 text-sm font-semibold border border-slate-200/80 shadow-xs transition-colors"
                            >
                                <span className="material-symbols-outlined text-teal-600 text-base">diversity_3</span>
                                <span>Kenali Tim Mentor</span>
                            </a>
                        </div>
                    </div>

                    {/* Right: Storytelling Visual Card */}
                    <div className="lg:col-span-5 relative mt-6 lg:mt-0">
                        <div className="relative rounded-3xl overflow-hidden bg-white border border-slate-200/80 shadow-md">
                            <img
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAAqUTtYLIlTL3HvDYiosndI7yHk2t1pRiFHYbOVoBySOhaGq0k2fL71Nsq_E9rjDnhG-GDMQFBrBDujVYvNQsknfTQ_KXFO1fsL-yBlcrTPIsAvCw0XTbHe6dDe4fzSjowBZyx-L_lYk5QJPBtqi2eLZqzpm3vCC3IIG5qtlu18jIe0FgyZEN6Zitzjjmo_o828nAZUpHzZ5Mne-5iuePKiMqBH3XYezEJlky4UP08pWhN4HDz559mhA"
                                alt="Sandhika Galih teaching session"
                                className="w-full h-[420px] object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-slate-900/20 to-transparent" />

                            {/* Floating Origin Badge */}
                            <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3.5 py-2 rounded-xl flex items-center gap-2.5 shadow-sm border border-slate-200/60">
                                <span className="material-symbols-outlined text-red-500 text-xl">play_circle</span>
                                <div className="flex flex-col">
                                    <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Sejak 2015</span>
                                    <span className="text-xs font-bold text-slate-800">YT: Web Programming UNPAS</span>
                                </div>
                            </div>

                            {/* Overlaid Quote Card */}
                            <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-md border border-slate-200/60">
                                <div className="flex items-start gap-3">
                                    <span className="material-symbols-outlined text-teal-600 text-2xl shrink-0 mt-0.5">
                                        format_quote
                                    </span>
                                    <div>
                                        <p className="text-xs text-slate-700 italic leading-relaxed">
                                            "Semua orang berhak belajar coding tanpa rasa takut akan istilah teknis yang rumit. Coding itu logika yang bisa dilatih siapa saja."
                                        </p>
                                        <p className="text-[11px] font-bold text-teal-700 mt-1.5 font-mono">
                                            — Sandhika Galih, Inisiator HC Course
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Decorative Floating Pill */}
                        <div className="hidden sm:flex absolute -bottom-4 -left-4 bg-white px-4 py-2 rounded-xl shadow-md border border-slate-200/80 items-center gap-2 text-teal-700 font-mono text-xs font-semibold">
                            <span className="w-2 h-2 rounded-full bg-emerald-500" />
                            <span>console.log("Halo Teman-teman!")</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
