export default function HeroSection() {
    return (
        <section className="max-w-[1280px] mx-auto px-4 lg:px-8 pt-8 pb-16 lg:pt-14 lg:pb-20">
            <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-14">
                {/* Hero Left Column */}
                <div className="w-full lg:w-7/12 flex flex-col items-start gap-5">
                    {/* Notification Pill */}
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100/80 text-slate-700 text-xs font-medium border border-slate-200/50">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                        <span className="text-teal-800 font-semibold tracking-wide">
                            Batch 2025
                        </span>
                        <span className="text-slate-300">•</span>
                        <span>Bootcamp Full-Stack Dibuka</span>
                        <span className="material-symbols-outlined text-sm text-slate-400">
                            arrow_forward
                        </span>
                    </div>

                    {/* Hero Headline */}
                    <h1 className="text-3xl sm:text-4xl lg:text-[46px] font-extrabold text-slate-900 tracking-tight leading-[1.18]">
                        Belajar Pemrograman dari Nol Sampai{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-700 via-teal-600 to-indigo-600">
                            Siap Kerja
                        </span>{' '}
                        di Industri.
                    </h1>

                    {/* Hero Subtitle */}
                    <p className="text-base lg:text-lg text-slate-600 max-w-2xl leading-relaxed">
                        Kurikulum terstruktur tanpa basa-basi, praktek studi kasus nyata dunia kerja, mentoring langsung oleh praktisi terpercaya, serta jejaring lebih dari{' '}
                        <strong className="text-slate-800 font-semibold">100.000+ developer</strong> di ekosistem WPU.
                    </p>

                    {/* Dual CTA */}
                    <div className="w-full flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-1">
                        <a
                            href="#katalog-kursus"
                            className="px-6 py-3 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-medium text-sm transition-all duration-150 shadow-xs flex items-center justify-center gap-2 group"
                        >
                            <span>Jelajahi Kursus</span>
                            <span className="material-symbols-outlined text-lg group-hover:translate-x-0.5 transition-transform">
                                arrow_forward
                            </span>
                        </a>
                        <a
                            href="#bootcamp"
                            className="px-6 py-3 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 hover:text-slate-900 border border-slate-200/70 font-medium text-sm transition-all duration-150 flex items-center justify-center gap-2 group"
                        >
                            <span className="material-symbols-outlined text-teal-600 text-xl">
                                play_circle
                            </span>
                            <span>Silabus Bootcamp</span>
                        </a>
                    </div>

                    {/* Value Props Micro-list */}
                    <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-3 w-full text-slate-500 text-xs sm:text-sm">
                        <div className="flex items-center gap-1.5">
                            <span className="material-symbols-outlined text-teal-600 text-base">
                                check_circle
                            </span>
                            <span>100% Bahasa Indonesia</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <span className="material-symbols-outlined text-teal-600 text-base">
                                check_circle
                            </span>
                            <span>Proyek Portofolio Riil</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <span className="material-symbols-outlined text-teal-600 text-base">
                                check_circle
                            </span>
                            <span>Review Kode Langsung</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <span className="material-symbols-outlined text-teal-600 text-base">
                                check_circle
                            </span>
                            <span>Sertifikat Kelulusan</span>
                        </div>
                    </div>
                </div>

                {/* Hero Right Column: Developer Code IDE Mockup */}
                <div className="w-full lg:w-5/12 flex flex-col gap-3">
                    {/* IDE Mockup */}
                    <div className="rounded-2xl bg-slate-900 border border-slate-800/80 shadow-md overflow-hidden">
                        {/* Header IDE */}
                        <div className="bg-slate-800/60 px-4 py-2.5 flex items-center justify-between border-b border-slate-700/40">
                            <div className="flex items-center gap-2">
                                <span className="w-2.5 h-2.5 rounded-full bg-slate-600 inline-block"></span>
                                <span className="w-2.5 h-2.5 rounded-full bg-slate-600 inline-block"></span>
                                <span className="w-2.5 h-2.5 rounded-full bg-slate-600 inline-block"></span>
                                <span className="ml-2 font-mono text-[11px] text-slate-400">
                                    App.jsx
                                </span>
                            </div>
                            <span className="font-mono text-[10px] px-2 py-0.5 rounded-md bg-teal-950/80 text-teal-400">
                                React 19
                            </span>
                        </div>

                        {/* Code Editor Body */}
                        <div className="p-5 font-mono text-xs sm:text-[13px] overflow-x-auto text-slate-300 leading-relaxed select-none">
                            <div className="flex items-start gap-3">
                                <span className="text-slate-600 select-none">1</span>
                                <span>
                                    <span className="text-teal-400">import</span> &#123; useState &#125; <span className="text-teal-400">from</span> <span className="text-amber-300">&apos;react&apos;</span>;
                                </span>
                            </div>
                            <div className="flex items-start gap-3">
                                <span className="text-slate-600 select-none">2</span>
                                <span>
                                    <span className="text-teal-400">import</span> &#123; MentorReview &#125; <span className="text-teal-400">from</span> <span className="text-amber-300">&apos;@hccourse/core&apos;</span>;
                                </span>
                            </div>
                            <div className="flex items-start gap-3">
                                <span className="text-slate-600 select-none">3</span>
                                <span></span>
                            </div>
                            <div className="flex items-start gap-3">
                                <span className="text-slate-600 select-none">4</span>
                                <span>
                                    <span className="text-teal-400">export default function</span> <span className="text-amber-200">CareerPath</span>() &#123;
                                </span>
                            </div>
                            <div className="flex items-start gap-3">
                                <span className="text-slate-600 select-none">5</span>
                                <span className="pl-4">
                                    <span className="text-teal-400">const</span> [skills] = useState([<span className="text-amber-300">&apos;React 19&apos;</span>, <span className="text-amber-300">&apos;Laravel&apos;</span>]);
                                </span>
                            </div>
                            <div className="flex items-start gap-3">
                                <span className="text-slate-600 select-none">6</span>
                                <span className="pl-4">
                                    <span className="text-teal-400">return</span> &lt;<span className="text-teal-300">MentorReview</span> stack=&#123;skills&#125; status=<span className="text-amber-300">&quot;Siap Kerja&quot;</span> /&gt;;
                                </span>
                            </div>
                            <div className="flex items-start gap-3">
                                <span className="text-slate-600 select-none">7</span>
                                <span>&#125;</span>
                            </div>
                        </div>

                        {/* Terminal Footer Bar */}
                        <div className="bg-slate-950/80 px-4 py-2 flex items-center justify-between text-slate-400 border-t border-slate-800/60">
                            <div className="flex items-center gap-2 font-mono text-[11px]">
                                <span className="text-emerald-400">●</span>
                                <span className="text-slate-400">Ready on port 3000</span>
                            </div>
                            <span className="font-mono text-[11px] text-slate-500">Fast Refresh</span>
                        </div>
                    </div>

                    {/* Micro-Card */}
                    <div className="rounded-2xl bg-white border border-slate-200/60 p-4 flex items-center justify-between shadow-xs">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-teal-50 flex items-center justify-center text-teal-700">
                                <span className="material-symbols-outlined text-2xl">code_blocks</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-sm font-semibold text-slate-800">
                                    12 Proyek Studi Kasus Nyata
                                </span>
                                <span className="text-xs text-slate-500">
                                    E-commerce, API Gateway, Realtime &amp; SaaS
                                </span>
                            </div>
                        </div>
                        <span className="text-xs px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 font-medium">
                            Praktik Riil
                        </span>
                    </div>
                </div>
            </div>

            {/* Stats Bar */}
            <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 bg-white border border-slate-200/60 rounded-2xl p-6 shadow-xs">
                <div className="flex flex-col gap-1 items-start pl-2">
                    <div className="flex items-baseline gap-1">
                        <span className="text-2xl lg:text-3xl font-bold text-slate-900">150K</span>
                        <span className="text-teal-600 font-bold text-xl">+</span>
                    </div>
                    <span className="text-xs text-slate-500 font-medium">Alumni Terdaftar</span>
                </div>
                <div className="flex flex-col gap-1 items-start pl-2">
                    <div className="flex items-baseline gap-1">
                        <span className="text-2xl lg:text-3xl font-bold text-slate-900">45</span>
                        <span className="text-teal-600 font-bold text-xl">+</span>
                    </div>
                    <span className="text-xs text-slate-500 font-medium">Kursus Terstruktur</span>
                </div>
                <div className="flex flex-col gap-1 items-start pl-2">
                    <div className="flex items-baseline gap-1">
                        <span className="text-2xl lg:text-3xl font-bold text-slate-900">4.92</span>
                        <span className="material-symbols-outlined text-amber-500 text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>
                            star
                        </span>
                    </div>
                    <span className="text-xs text-slate-500 font-medium">Rating Kepuasan</span>
                </div>
                <div className="flex flex-col gap-1 items-start pl-2">
                    <div className="flex items-baseline gap-1">
                        <span className="text-2xl lg:text-3xl font-bold text-slate-900">92</span>
                        <span className="text-teal-600 font-bold text-xl">%</span>
                    </div>
                    <span className="text-xs text-slate-500 font-medium">Terserap Industri</span>
                </div>
            </div>
        </section>
    );
}
