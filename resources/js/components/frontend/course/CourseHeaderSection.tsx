interface CourseHeaderSectionProps {
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    activeCategory: string;
    setActiveCategory: (cat: string) => void;
    onToggleMobileFilter: () => void;
}

const CATEGORIES = [
    { id: 'all', label: 'Semua Kategori' },
    { id: 'frontend', label: 'Web Frontend' },
    { id: 'backend', label: 'Web Backend' },
    { id: 'fullstack', label: 'Full-Stack Development' },
    { id: 'mobile', label: 'Mobile App' },
    { id: 'devops', label: 'DevOps & Linux' },
    { id: 'design', label: 'UI/UX & Design System' },
];

export default function CourseHeaderSection({
    searchQuery,
    setSearchQuery,
    activeCategory,
    setActiveCategory,
    onToggleMobileFilter,
}: CourseHeaderSectionProps) {
    return (
        <section className="relative overflow-hidden pt-10 pb-8 border-b border-slate-200/60 bg-gradient-to-b from-teal-500/5 via-transparent to-transparent">
            {/* Ambient Top Glow */}
            <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[720px] h-[360px] bg-teal-500/10 blur-[130px] pointer-events-none -z-10 rounded-full" />

            <div className="max-w-[1280px] mx-auto px-4 lg:px-8">
                {/* Header Title */}
                <div className="flex flex-col gap-3 max-w-3xl">
                    <div className="inline-flex items-center gap-2 self-start px-3.5 py-1.5 rounded-full bg-teal-50 border border-teal-200/60 text-teal-800 text-xs font-semibold">
                        <span className="w-2 h-2 rounded-full bg-teal-500 animate-ping" />
                        <span className="font-mono uppercase tracking-wider text-[11px]">
                            KURIKULUM REVISI 2025 • PRODUCTION READY
                        </span>
                    </div>

                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
                        Katalog Kursus Pemrograman
                    </h1>

                    <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                        Tingkatkan skill coding kamu dengan kurikulum berbasis proyek nyata industri terkini. Disusun terstruktur, bebas distraksi, dan teruji langsung di dunia kerja.
                    </p>
                </div>

                {/* Search Bar & Mobile Filter Trigger */}
                <div className="mt-8 flex flex-col sm:flex-row gap-3 items-center">
                    <div className="relative w-full flex-1">
                        <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xl pointer-events-none">
                            search
                        </span>
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Cari nama materi, framework, atau topik (misal: Next.js, Docker, Laravel, REST API)..."
                            className="w-full bg-white text-slate-800 placeholder:text-slate-400 text-sm pl-11 pr-24 py-3.5 rounded-xl border border-slate-200/80 shadow-xs focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition-all"
                        />
                        <div className="absolute right-3.5 top-1/2 -translate-y-1/2 flex items-center gap-1 pointer-events-none">
                            <kbd className="px-2 py-0.5 rounded bg-slate-100 text-slate-500 font-mono text-[11px] border border-slate-200 shadow-xs">
                                ⌘
                            </kbd>
                            <kbd className="px-2 py-0.5 rounded bg-slate-100 text-slate-500 font-mono text-[11px] border border-slate-200 shadow-xs">
                                K
                            </kbd>
                        </div>
                    </div>

                    {/* Mobile filter button */}
                    <button
                        onClick={onToggleMobileFilter}
                        className="lg:hidden w-full sm:w-auto px-4 py-3.5 bg-white border border-slate-200/80 text-slate-700 hover:text-slate-900 hover:bg-slate-50 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 shadow-xs transition-colors shrink-0"
                    >
                        <span className="material-symbols-outlined text-lg text-teal-600">tune</span>
                        <span>Filter &amp; Opsi</span>
                    </button>
                </div>

                {/* Quick Category Chips */}
                <div className="mt-5 flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
                    {CATEGORIES.map((cat) => {
                        const isActive = activeCategory === cat.id;
                        return (
                            <button
                                key={cat.id}
                                onClick={() => setActiveCategory(cat.id)}
                                className={`whitespace-nowrap px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-150 shadow-xs ${
                                    isActive
                                        ? 'bg-teal-600 text-white shadow-teal-600/20'
                                        : 'bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-50 border border-slate-200/70'
                                }`}
                            >
                                {cat.label}
                            </button>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
