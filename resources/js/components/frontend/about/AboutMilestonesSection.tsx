export default function AboutMilestonesSection() {
    const milestones = [
        {
            icon: 'smart_display',
            iconBg: 'bg-red-50 text-red-600',
            badge: 'YT Community',
            metric: '1.000K+',
            label: 'Subscribers YouTube',
            description: 'Komunitas pembelajar coding mandiri terbesar dan paling aktif di Indonesia.',
            footerIcon: 'trending_up',
            footerText: '100% Organik & Gratis',
            footerColor: 'text-teal-700',
        },
        {
            icon: 'school',
            iconBg: 'bg-teal-50 text-teal-600',
            badge: 'LMS Portal',
            metric: '150K+',
            label: 'Siswa Terdaftar',
            description: 'Menyelesaikan materi intensif, quiz terarah, serta mengunggah portfolio.',
            footerIcon: 'verified',
            footerText: 'Portfolio Ready',
            footerColor: 'text-emerald-600',
        },
        {
            icon: 'history_edu',
            iconBg: 'bg-amber-50 text-amber-600',
            badge: 'Dedikasi',
            metric: '10+ Th',
            label: 'Membimbing Bangsa',
            description: 'Satu dekade konsisten meremajakan kurikulum sesuai dinamika industri web.',
            footerIcon: 'schedule',
            footerText: 'Berdiri Sejak 2015',
            footerColor: 'text-amber-700',
        },
        {
            icon: 'video_library',
            iconBg: 'bg-indigo-50 text-indigo-600',
            badge: 'Knowledge Base',
            metric: '500+',
            label: 'Video Modul Lengkap',
            description: 'Dari syntax dasar variabel, DOM, framework modern, hingga cloud deployment.',
            footerIcon: 'auto_stories',
            footerText: '1.200+ Jam Pembelajaran',
            footerColor: 'text-indigo-600',
        },
    ];

    return (
        <section className="w-full bg-slate-100/70 border-y border-slate-200/60 py-16">
            <div className="max-w-[1280px] mx-auto px-4 lg:px-8">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
                    <div>
                        <span className="text-xs font-bold text-teal-600 uppercase tracking-widest block mb-1">
                            Jejak Dampak Nyata
                        </span>
                        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                            Angka di Balik Gerakan Belajar HC Course
                        </h2>
                    </div>
                    <p className="text-sm text-slate-500 max-w-md leading-relaxed">
                        Konsistensi mengalirkan ilmu terapan dari Bandung ke seluruh penjuru Nusantara hingga diaspora di mancanegara.
                    </p>
                </div>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {milestones.map((item, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-2xl p-6 border border-slate-200/70 shadow-xs hover:shadow-md hover:border-slate-300 transition-all flex flex-col justify-between group"
                        >
                            <div>
                                <div className="flex items-center justify-between mb-4">
                                    <span
                                        className={`w-10 h-10 rounded-xl ${item.iconBg} flex items-center justify-center`}
                                    >
                                        <span className="material-symbols-outlined text-xl">
                                            {item.icon}
                                        </span>
                                    </span>
                                    <span className="text-[11px] font-mono text-slate-500 bg-slate-50 px-2.5 py-1 rounded-md border border-slate-200/60">
                                        {item.badge}
                                    </span>
                                </div>

                                <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight group-hover:text-teal-600 transition-colors">
                                    {item.metric}
                                </div>
                                <div className="text-sm font-bold text-slate-800 mt-1">
                                    {item.label}
                                </div>
                                <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                                    {item.description}
                                </p>
                            </div>

                            <div className={`mt-5 pt-3 border-t border-slate-100 flex items-center gap-1.5 text-xs font-semibold ${item.footerColor}`}>
                                <span className="material-symbols-outlined text-sm">
                                    {item.footerIcon}
                                </span>
                                <span>{item.footerText}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
