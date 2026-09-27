interface CourseFilterSidebarProps {
    isOpenMobile: boolean;
    onCloseMobile: () => void;
    selectedLevels: string[];
    onToggleLevel: (level: string) => void;
    selectedFormats: string[];
    onToggleFormat: (format: string) => void;
    selectedDuration: string;
    onSelectDuration: (dur: string) => void;
    selectedTechs: string[];
    onToggleTech: (tech: string) => void;
    minRating: number;
    onSelectRating: (r: number) => void;
    onResetFilters: () => void;
}

const TECH_LIST = [
    'JavaScript',
    'TypeScript',
    'React',
    'Next.js',
    'Node.js',
    'Laravel',
    'Golang',
    'Docker',
    'PostgreSQL',
];

export default function CourseFilterSidebar({
    isOpenMobile,
    onCloseMobile,
    selectedLevels,
    onToggleLevel,
    selectedFormats,
    onToggleFormat,
    selectedDuration,
    onSelectDuration,
    selectedTechs,
    onToggleTech,
    minRating,
    onSelectRating,
    onResetFilters,
}: CourseFilterSidebarProps) {
    return (
        <>
            {/* Mobile backdrop */}
            {isOpenMobile && (
                <div
                    onClick={onCloseMobile}
                    className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-40 lg:hidden"
                />
            )}

            <aside
                className={`
                    fixed lg:static top-0 bottom-0 left-0 z-50 lg:z-auto
                    w-80 lg:w-full
                    bg-white lg:bg-transparent
                    p-6 lg:p-0
                    border-r lg:border-none border-slate-200
                    overflow-y-auto
                    transition-transform duration-200
                    ${isOpenMobile ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
                    flex flex-col gap-6
                `}
            >
                {/* Header for Filter */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col gap-5">
                    <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                        <div className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-teal-600 text-xl">
                                filter_list
                            </span>
                            <span className="text-base font-bold text-slate-900">Filter Kursus</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={onResetFilters}
                                className="text-xs font-mono font-bold text-teal-600 hover:text-teal-800 transition-colors uppercase"
                            >
                                RESET
                            </button>
                            <button
                                onClick={onCloseMobile}
                                className="lg:hidden p-1 text-slate-400 hover:text-slate-700"
                            >
                                <span className="material-symbols-outlined text-xl">close</span>
                            </button>
                        </div>
                    </div>

                    {/* Filter 1: Level Keahlian */}
                    <div className="flex flex-col gap-2">
                        <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                            Level Keahlian
                        </span>
                        {[
                            { id: 'beginner', label: 'Pemula (Beginner)', count: 14 },
                            { id: 'intermediate', label: 'Menengah (Intermediate)', count: 16 },
                            { id: 'advanced', label: 'Lanjutan (Advanced)', count: 6 },
                        ].map((lvl) => {
                            const isChecked = selectedLevels.includes(lvl.id);
                            return (
                                <label
                                    key={lvl.id}
                                    className="flex items-center justify-between py-1.5 px-2 rounded-xl hover:bg-slate-50 cursor-pointer transition-colors"
                                >
                                    <span className="flex items-center gap-2.5 text-xs font-medium text-slate-600">
                                        <input
                                            type="checkbox"
                                            checked={isChecked}
                                            onChange={() => onToggleLevel(lvl.id)}
                                            className="w-4 h-4 rounded text-teal-600 border-slate-300 focus:ring-teal-500 cursor-pointer"
                                        />
                                        {lvl.label}
                                    </span>
                                    <span className="text-[11px] font-mono text-slate-400">
                                        {lvl.count}
                                    </span>
                                </label>
                            );
                        })}
                    </div>

                    {/* Filter 2: Format Belajar */}
                    <div className="flex flex-col gap-2 pt-2 border-t border-slate-100">
                        <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                            Format Belajar
                        </span>
                        {[
                            { id: 'vod', label: 'Video On-Demand', count: 28 },
                            { id: 'hybrid', label: 'Hybrid Mentoring', count: 4 },
                            { id: 'free', label: 'Gratis / Akses Terbuka', count: 4 },
                        ].map((fmt) => {
                            const isChecked = selectedFormats.includes(fmt.id);
                            return (
                                <label
                                    key={fmt.id}
                                    className="flex items-center justify-between py-1.5 px-2 rounded-xl hover:bg-slate-50 cursor-pointer transition-colors"
                                >
                                    <span className="flex items-center gap-2.5 text-xs font-medium text-slate-600">
                                        <input
                                            type="checkbox"
                                            checked={isChecked}
                                            onChange={() => onToggleFormat(fmt.id)}
                                            className="w-4 h-4 rounded text-teal-600 border-slate-300 focus:ring-teal-500 cursor-pointer"
                                        />
                                        {fmt.label}
                                    </span>
                                    <span className="text-[11px] font-mono text-slate-400">
                                        {fmt.count}
                                    </span>
                                </label>
                            );
                        })}
                    </div>

                    {/* Filter 3: Total Jam Materi */}
                    <div className="flex flex-col gap-2 pt-2 border-t border-slate-100">
                        <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                            Total Jam Materi
                        </span>
                        {[
                            { id: 'all', label: 'Semua Durasi', count: 36 },
                            { id: 'short', label: '< 10 Jam Pembelajaran', count: 8 },
                            { id: 'medium', label: '10 - 30 Jam Pembelajaran', count: 21 },
                            { id: 'long', label: '30+ Jam Intensif Studio', count: 7 },
                        ].map((dur) => (
                            <label
                                key={dur.id}
                                className="flex items-center justify-between py-1.5 px-2 rounded-xl hover:bg-slate-50 cursor-pointer transition-colors"
                            >
                                <span className="flex items-center gap-2.5 text-xs font-medium text-slate-600">
                                    <input
                                        type="radio"
                                        name="duration"
                                        checked={selectedDuration === dur.id}
                                        onChange={() => onSelectDuration(dur.id)}
                                        className="w-4 h-4 text-teal-600 border-slate-300 focus:ring-teal-500 cursor-pointer"
                                    />
                                    {dur.label}
                                </span>
                                <span className="text-[11px] font-mono text-slate-400">
                                    {dur.count}
                                </span>
                            </label>
                        ))}
                    </div>

                    {/* Filter 4: Teknologi Pilihan */}
                    <div className="flex flex-col gap-2 pt-2 border-t border-slate-100">
                        <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                            Teknologi Pilihan
                        </span>
                        <div className="flex flex-wrap gap-1.5 mt-1">
                            {TECH_LIST.map((tech) => {
                                const isSelected = selectedTechs.includes(tech);
                                return (
                                    <button
                                        key={tech}
                                        type="button"
                                        onClick={() => onToggleTech(tech)}
                                        className={`px-2.5 py-1 rounded-lg font-mono text-[11px] transition-colors ${
                                            isSelected
                                                ? 'bg-teal-600 text-white font-semibold'
                                                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                        }`}
                                    >
                                        {tech}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Filter 5: Rating Siswa */}
                    <div className="flex flex-col gap-2 pt-2 border-t border-slate-100">
                        <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                            Rating Siswa
                        </span>
                        {[4.8, 4.5, 0].map((rVal) => (
                            <label
                                key={rVal}
                                className="flex items-center gap-2.5 py-1.5 px-2 rounded-xl hover:bg-slate-50 cursor-pointer transition-colors"
                            >
                                <input
                                    type="radio"
                                    name="rating"
                                    checked={minRating === rVal}
                                    onChange={() => onSelectRating(rVal)}
                                    className="w-4 h-4 text-teal-600 border-slate-300 focus:ring-teal-500 cursor-pointer"
                                />
                                {rVal > 0 ? (
                                    <div className="flex items-center text-amber-500 text-xs">
                                        {[...Array(Math.floor(rVal))].map((_, i) => (
                                            <span
                                                key={i}
                                                className="material-symbols-outlined text-sm"
                                                style={{ fontVariationSettings: "'FILL' 1" }}
                                            >
                                                star
                                            </span>
                                        ))}
                                        {rVal % 1 !== 0 && (
                                            <span className="material-symbols-outlined text-sm">
                                                star_half
                                            </span>
                                        )}
                                        <span className="text-xs font-medium text-slate-700 ml-1.5">
                                            {rVal} ke atas
                                        </span>
                                    </div>
                                ) : (
                                    <span className="text-xs text-slate-600">Semua Rating</span>
                                )}
                            </label>
                        ))}
                    </div>

                    {/* Membership Pro Banner in Sidebar */}
                    <div className="p-4 rounded-xl bg-teal-50/70 border border-teal-200/60 text-slate-600 flex flex-col gap-2">
                        <div className="flex items-center gap-1.5 text-teal-800 font-mono text-xs font-bold">
                            <span className="material-symbols-outlined text-base text-teal-600">
                                verified
                            </span>
                            HC ALL-ACCESS PASS
                        </div>
                        <p className="text-xs text-slate-600 leading-relaxed">
                            Akses ke 36+ kursus sekaligus &amp; konsultasi Discord private seumur hidup.
                        </p>
                        <a
                            href="/#bootcamp"
                            className="text-xs font-bold text-teal-700 hover:text-teal-900 inline-flex items-center gap-1 mt-1"
                        >
                            Pelajari Membership →
                        </a>
                    </div>
                </div>
            </aside>
        </>
    );
}
