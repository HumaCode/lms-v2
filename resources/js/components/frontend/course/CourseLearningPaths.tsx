import { LEARNING_PATHS } from '@/types/course';

export default function CourseLearningPaths() {
    return (
        <section className="w-full bg-slate-100/60 border-b border-slate-200/60 py-10">
            <div className="max-w-[1280px] mx-auto px-4 lg:px-8">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-2">
                    <div>
                        <span className="text-xs font-bold text-teal-600 flex items-center gap-1.5 uppercase tracking-wider">
                            <span className="material-symbols-outlined text-sm">alt_route</span>
                            Peta Jalan Spesialisasi
                        </span>
                        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-1 tracking-tight">
                            Jalur Belajar Terstruktur (Learning Paths)
                        </h2>
                    </div>
                    <span className="text-xs text-slate-500 hidden sm:inline">
                        Dari nol hingga siap interview kerja profesional
                    </span>
                </div>

                {/* Grid 2 Roadmaps */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {LEARNING_PATHS.map((path) => (
                        <div
                            key={path.id}
                            className="bg-white rounded-2xl p-6 border border-slate-200/70 shadow-xs hover:border-slate-300 hover:shadow-md transition-all flex flex-col justify-between group"
                        >
                            <div>
                                <div className="flex items-start justify-between gap-4">
                                    <div className="flex items-center gap-3">
                                        <div
                                            className={`w-11 h-11 rounded-xl ${path.iconBg} flex items-center justify-center shadow-xs shrink-0`}
                                        >
                                            <span className="material-symbols-outlined text-2xl">
                                                {path.icon}
                                            </span>
                                        </div>
                                        <div>
                                            <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-teal-600 transition-colors">
                                                {path.title}
                                            </h3>
                                            <span className="text-xs text-slate-500">
                                                {path.subtitle}
                                            </span>
                                        </div>
                                    </div>
                                    <span
                                        className={`px-2.5 py-1 rounded-lg font-mono text-[11px] font-bold uppercase shrink-0 ${path.badgeColor}`}
                                    >
                                        {path.badge}
                                    </span>
                                </div>

                                {/* Roadmap Step Badges */}
                                <div className="mt-5 grid grid-cols-4 sm:grid-cols-5 gap-1.5 items-center">
                                    {path.steps.map((st, sIdx) => (
                                        <div
                                            key={sIdx}
                                            className={`flex flex-col items-center text-center p-2 rounded-xl border ${
                                                st.highlight
                                                    ? 'bg-amber-50/70 border-amber-200/80'
                                                    : 'bg-slate-50 border-slate-200/60'
                                            }`}
                                        >
                                            <span
                                                className={`font-mono text-xs font-bold ${
                                                    st.highlight ? 'text-amber-700' : 'text-teal-700'
                                                }`}
                                            >
                                                {st.step}
                                            </span>
                                            <span className="text-[11px] font-medium text-slate-700 mt-0.5 truncate w-full">
                                                {st.title}
                                            </span>
                                        </div>
                                    ))}
                                </div>

                                {/* Progress Bar */}
                                <div className="mt-4">
                                    <div className="flex justify-between font-mono text-[11px] text-slate-500 mb-1">
                                        <span>Rekomendasi Progress Pemula</span>
                                        <span className="text-teal-700 font-semibold">
                                            Ready to enroll
                                        </span>
                                    </div>
                                    <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden border border-slate-200/50">
                                        <div
                                            className={`h-full bg-teal-500 ${path.progressPercent} rounded-full`}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Bottom CTA */}
                            <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
                                <div className="flex -space-x-2">
                                    {path.avatars.map((av, avIdx) => (
                                        <div
                                            key={avIdx}
                                            className={`w-7 h-7 rounded-full ${av.bg} flex items-center justify-center font-mono text-[10px] font-bold ring-2 ring-white shadow-xs`}
                                        >
                                            {av.text}
                                        </div>
                                    ))}
                                </div>
                                <button
                                    type="button"
                                    className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-1.5 shadow-xs transition-colors"
                                >
                                    <span>{path.buttonText}</span>
                                    <span className="material-symbols-outlined text-sm">
                                        arrow_forward
                                    </span>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
