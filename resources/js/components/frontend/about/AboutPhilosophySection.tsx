export default function AboutPhilosophySection() {
    const pillars = [
        {
            number: 'PILAR 01',
            title: 'Mudah Dipahami',
            icon: 'psychology_alt',
            iconColor: 'bg-teal-50 text-teal-600',
            textColor: 'text-teal-700',
            subText: 'Zero Jargon Wall',
            bottomIcon: 'sentiment_satisfied',
            description: (
                <>
                    Membongkar konsep abstrak seperti{' '}
                    <span className="font-mono text-xs font-semibold text-teal-700 bg-teal-50 px-1.5 py-0.5 rounded">
                        Closure
                    </span>
                    ,{' '}
                    <span className="font-mono text-xs font-semibold text-teal-700 bg-teal-50 px-1.5 py-0.5 rounded">
                        Event Loop
                    </span>
                    , atau{' '}
                    <span className="font-mono text-xs font-semibold text-teal-700 bg-teal-50 px-1.5 py-0.5 rounded">
                        Asynchronous
                    </span>{' '}
                    dengan perumpamaan kehidupan sehari-hari khas HC. Bahasa yang hangat dan bebas istilah asing yang mengintimidasi.
                </>
            ),
        },
        {
            number: 'PILAR 02',
            title: 'Berorientasi Praktik',
            icon: 'terminal',
            iconColor: 'bg-amber-50 text-amber-600',
            textColor: 'text-amber-700',
            subText: 'Real-World Case Study',
            bottomIcon: 'construction',
            description: (
                <>
                    Coding tidak dipelajari dengan hanya menonton pasif. Setiap baris kode diuji lewat studi kasus aplikasi nyata: dari toko online berbasis payment gateway lokal, REST API scalable, hingga dashboard analitik modern siap deploy.
                </>
            ),
        },
        {
            number: 'PILAR 03',
            title: 'Komunitas Gotong-Royong',
            icon: 'handshake',
            iconColor: 'bg-indigo-50 text-indigo-600',
            textColor: 'text-indigo-700',
            subText: 'Discord Active 24/7',
            bottomIcon: 'diversity_1',
            description: (
                <>
                    Ruang interaksi inklusif di Discord dan forum belajar di mana senior, alumni, dan pemula saling berdiskusi tanpa penghakiman. Ketika kamu menghadapi bug rumit pukul 2 pagi, selalu ada kawan HC yang siap mengulurkan solusi.
                </>
            ),
        },
    ];

    return (
        <div id="filosofi" className="py-20 max-w-[1280px] mx-auto px-4 lg:px-8">
            {/* Header */}
            <div className="text-center max-w-2xl mx-auto mb-16">
                <span className="text-xs font-bold text-teal-600 uppercase tracking-widest block mb-2">
                    Pondasi Pedagogi
                </span>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
                    Tiga Pilar Filosofi Belajar di HC Course
                </h2>
                <p className="text-sm lg:text-base text-slate-500 mt-3 leading-relaxed">
                    Kami menentang budaya belajar hafalan sintaks yang membuat frustrasi. Di HC Course, kamu dibimbing menyelami cara berpikir computational thinker yang tenang dan sistematis.
                </p>
            </div>

            {/* 3 Pillars Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
                {pillars.map((pillar, idx) => (
                    <div
                        key={idx}
                        className="bg-white border border-slate-200/70 p-8 rounded-2xl flex flex-col justify-between relative overflow-hidden group hover:border-slate-300 hover:shadow-sm transition-all"
                    >
                        <div>
                            <div
                                className={`w-13 h-13 w-12 h-12 rounded-2xl ${pillar.iconColor} flex items-center justify-center mb-6 group-hover:scale-105 transition-transform`}
                            >
                                <span className="material-symbols-outlined text-2xl sm:text-3xl">
                                    {pillar.icon}
                                </span>
                            </div>

                            <div className="flex items-center gap-2 mb-2">
                                <span className={`text-xs font-mono font-bold ${pillar.textColor}`}>
                                    {pillar.number}
                                </span>
                                <span className="h-px w-6 bg-slate-200" />
                            </div>

                            <h3 className="text-xl font-bold text-slate-900 mb-3">
                                {pillar.title}
                            </h3>

                            <p className="text-sm text-slate-600 leading-relaxed">
                                {pillar.description}
                            </p>
                        </div>

                        <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-medium">
                            <span className="font-mono text-slate-400">{pillar.subText}</span>
                            <span className={`material-symbols-outlined ${pillar.textColor} text-base`}>
                                {pillar.bottomIcon}
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Visual Interactive Spotlight: Studio Workflow & Code snippet */}
            <div className="bg-slate-900 text-white rounded-3xl p-8 lg:p-12 relative overflow-hidden shadow-xl border border-slate-800">
                {/* Background decorative glow */}
                <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-teal-500/10 rounded-full blur-[100px] pointer-events-none" />

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
                    <div className="lg:col-span-6 flex flex-col gap-4">
                        <span className="text-xs font-mono font-bold text-teal-400 uppercase tracking-widest">
                            Studio Workflow
                        </span>
                        <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight">
                            Dirancang Khusus untuk Deep Work &amp; Late-Night Coding
                        </h3>
                        <p className="text-sm lg:text-base text-slate-300 leading-relaxed">
                            Bukan hanya materi kuliah, tapi juga ritme visual yang kami perhitungkan. Palet warna berfokus pada estetika bersih dan ergonomis dengan kontras teks presisi untuk meminimalkan kelelahan mata bagi programmer yang tekun di malam hari.
                        </p>

                        <div className="flex flex-col gap-3 pt-2">
                            <div className="flex items-center gap-3">
                                <span className="material-symbols-outlined text-teal-400 text-xl">
                                    check_circle
                                </span>
                                <span className="text-sm text-slate-200">
                                    Snippet kode dapat langsung disalin dengan struktur rapi
                                </span>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="material-symbols-outlined text-teal-400 text-xl">
                                    check_circle
                                </span>
                                <span className="text-sm text-slate-200">
                                    Player video minim distraksi dengan kontrol kecepatan keyboard
                                </span>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="material-symbols-outlined text-teal-400 text-xl">
                                    check_circle
                                </span>
                                <span className="text-sm text-slate-200">
                                    Akses modul seumur hidup tanpa tagihan langganan tersembunyi
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Code Snapshot Graphic */}
                    <div className="lg:col-span-6 bg-slate-950/90 rounded-2xl p-5 border border-slate-800 shadow-2xl relative">
                        <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
                            <div className="flex items-center gap-2">
                                <span className="w-3 h-3 rounded-full bg-rose-500/80" />
                                <span className="w-3 h-3 rounded-full bg-amber-500/80" />
                                <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
                                <span className="text-xs font-mono text-slate-400 ml-2">
                                    hc-mindset.js
                                </span>
                            </div>
                            <span className="text-[11px] font-mono text-teal-400 flex items-center gap-1">
                                <span className="material-symbols-outlined text-xs">code</span> ESNext
                            </span>
                        </div>

                        <pre className="font-mono text-xs sm:text-sm text-slate-300 overflow-x-auto leading-relaxed">
                            <code>
                                <span className="text-purple-400">const</span>{' '}
                                <span className="text-teal-300">belajarCoding</span> ={' '}
                                <span className="text-purple-400">async</span> (siswa) =&gt; &#123;{'\n'}
                                {'  '}<span className="text-slate-500">// Jangan takut error, error adalah teman belajar terbaik</span>{'\n'}
                                {'  '}<span className="text-purple-400">while</span> (!siswa.<span className="text-amber-300">pahamKonsep</span>) &#123;{'\n'}
                                {'    '}<span className="text-purple-400">await</span> siswa.<span className="text-amber-300">nontonVideoHC</span>(&#123; mode: <span className="text-teal-300">'santai'</span> &#125;);{'\n'}
                                {'    '}siswa.<span className="text-amber-300">ngodingSendiri</span>();{'\n'}
                                {'    '}siswa.<span className="text-amber-300">tanyaDiDiscord</span>();{'\n'}
                                {'  '}&#125;{'\n'}
                                {'\n'}
                                {'  '}<span className="text-purple-400">return</span> &#123;{'\n'}
                                {'    '}status: <span className="text-emerald-400">'Siap Bangun Proyek Riil'</span>,{'\n'}
                                {'    '}mental: <span className="text-emerald-400">'Problem Solver Tangguh'</span>{'\n'}
                                {'  '}&#125;;{'\n'}
                                &#125;;
                            </code>
                        </pre>

                        <div className="mt-4 pt-3 flex items-center justify-between text-slate-400 font-mono text-xs border-t border-slate-800">
                            <span>OUTPUT: Success (0 Errors)</span>
                            <span className="text-emerald-400 flex items-center gap-1.5 font-sans font-semibold">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                                Execution Verified
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
