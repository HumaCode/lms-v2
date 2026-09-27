import { Course } from '@/types/course';
import { Link } from '@inertiajs/react';

interface CourseGridSectionProps {
    courses: Course[];
    viewMode: 'grid' | 'list';
    onToggleViewMode: (mode: 'grid' | 'list') => void;
    sortBy: string;
    onSelectSortBy: (sort: string) => void;
    currentPage: number;
    onSelectPage: (page: number) => void;
}

export default function CourseGridSection({
    courses,
    viewMode,
    onToggleViewMode,
    sortBy,
    onSelectSortBy,
    currentPage,
    onSelectPage,
}: CourseGridSectionProps) {
    return (
        <div className="flex flex-col gap-6">
            {/* Top Toolbar / Results Bar */}
            <div className="bg-white rounded-2xl p-4 sm:px-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border border-slate-200/80 shadow-xs">
                <div className="flex items-center gap-2.5">
                    <span className="text-base sm:text-lg font-bold text-slate-900">
                        {courses.length} Kursus
                    </span>
                    <span className="font-mono text-[11px] px-2 py-0.5 rounded-md bg-teal-50 text-teal-700 font-bold border border-teal-200/60">
                        TERVERIFIKASI HC
                    </span>
                </div>

                <div className="flex items-center gap-3">
                    {/* Sort Dropdown */}
                    <div className="flex items-center gap-2">
                        <span className="text-xs text-slate-500 hidden md:inline">Urutkan:</span>
                        <select
                            value={sortBy}
                            onChange={(e) => onSelectSortBy(e.target.value)}
                            aria-label="Urutkan Kursus"
                            className="bg-slate-50 text-slate-800 text-xs font-semibold px-3 py-2 rounded-xl border border-slate-200/80 focus:outline-none focus:border-teal-500 cursor-pointer"
                        >
                            <option value="popular">Paling Populer</option>
                            <option value="newest">Materi Terbaru 2025</option>
                            <option value="rating">Rating Tertinggi (4.9+)</option>
                            <option value="price-asc">Harga Termurah</option>
                        </select>
                    </div>

                    {/* View Toggle */}
                    <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200/60">
                        <button
                            type="button"
                            onClick={() => onToggleViewMode('grid')}
                            className={`p-1.5 rounded-lg transition-colors ${
                                viewMode === 'grid'
                                    ? 'bg-white text-teal-600 shadow-xs'
                                    : 'text-slate-500 hover:text-slate-900'
                            }`}
                            title="Grid View"
                        >
                            <span className="material-symbols-outlined text-lg">grid_view</span>
                        </button>
                        <button
                            type="button"
                            onClick={() => onToggleViewMode('list')}
                            className={`p-1.5 rounded-lg transition-colors ${
                                viewMode === 'list'
                                    ? 'bg-white text-teal-600 shadow-xs'
                                    : 'text-slate-500 hover:text-slate-900'
                            }`}
                            title="List View"
                        >
                            <span className="material-symbols-outlined text-lg">view_list</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Courses Display */}
            {courses.length === 0 ? (
                <div className="bg-white rounded-2xl p-12 text-center border border-slate-200/80 shadow-xs flex flex-col items-center justify-center gap-3">
                    <span className="material-symbols-outlined text-5xl text-slate-300">
                        search_off
                    </span>
                    <h3 className="text-lg font-bold text-slate-800">
                        Tidak ada kursus yang cocok
                    </h3>
                    <p className="text-sm text-slate-500 max-w-sm">
                        Coba gunakan kata kunci pencarian lain atau ubah filter untuk menemukan materi yang kamu cari.
                    </p>
                </div>
            ) : (
                <div
                    className={
                        viewMode === 'grid'
                            ? 'grid grid-cols-1 md:grid-cols-2 gap-6'
                            : 'flex flex-col gap-4'
                    }
                >
                    {courses.map((course) => (
                        <div
                            key={course.id}
                            className={`
                                bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-xs
                                hover:border-slate-300 hover:shadow-md transition-all duration-200
                                flex ${viewMode === 'list' ? 'flex-col sm:flex-row' : 'flex-col'} justify-between group
                            `}
                        >
                            <div className={viewMode === 'list' ? 'flex flex-col sm:flex-row flex-1' : ''}>
                                {/* Thumbnail */}
                                <div
                                    className={`
                                        relative bg-slate-100 overflow-hidden
                                        ${viewMode === 'list' ? 'w-full sm:w-64 aspect-video sm:aspect-auto shrink-0' : 'w-full aspect-video'}
                                    `}
                                >
                                    <img
                                        src={course.thumbnail}
                                        alt={course.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                    {course.badge && (
                                        <div className="absolute top-3 left-3 flex gap-1.5">
                                            <span
                                                className={`px-2.5 py-1 rounded-md font-mono text-[10px] font-bold uppercase shadow-xs ${course.badge.bg}`}
                                            >
                                                {course.badge.text}
                                            </span>
                                        </div>
                                    )}
                                    <div className="absolute top-3 right-3 px-2 py-0.5 rounded-md bg-white/90 backdrop-blur-md text-slate-700 font-mono text-[11px] font-semibold flex items-center gap-1 shadow-xs border border-slate-200/60">
                                        <span className="material-symbols-outlined text-xs text-emerald-600">
                                            schedule
                                        </span>
                                        {course.durationLabel}
                                    </div>
                                </div>

                                {/* Body Information */}
                                <div className="p-5 flex flex-col justify-between flex-1">
                                    <div className="flex flex-col gap-2">
                                        <div className="flex items-center gap-2 font-mono text-xs text-slate-500">
                                            <span className="flex items-center gap-1 text-amber-500 font-bold">
                                                <span
                                                    className="material-symbols-outlined text-xs"
                                                    style={{ fontVariationSettings: "'FILL' 1" }}
                                                >
                                                    star
                                                </span>
                                                {course.rating != null ? course.rating.toFixed(1) : '5.0'}
                                            </span>
                                            <span>•</span>
                                            <span>{course.totalModules ?? 0} Modul</span>
                                            <span>•</span>
                                            <span className={`font-semibold ${course.levelColor}`}>
                                                {course.levelLabel}
                                            </span>
                                        </div>

                                        <h3 className="text-base font-bold text-slate-900 group-hover:text-teal-600 transition-colors line-clamp-2 leading-snug">
                                            {course.title}
                                        </h3>

                                        <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                                            {course.description}
                                        </p>

                                        {/* Technology Pills */}
                                        <div className="flex flex-wrap gap-1 pt-1">
                                            {course.technologies.map((t, idx) => (
                                                <span
                                                    key={idx}
                                                    className="px-2 py-0.5 rounded-md bg-slate-50 text-slate-600 font-mono text-[10px] border border-slate-200/60"
                                                >
                                                    {t}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Card Footer: Instructor, Price & Action Buttons */}
                            <div className="p-5 pt-0">
                                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <img
                                            src={course.instructor.avatar}
                                            alt={course.instructor.name}
                                            className="w-7 h-7 rounded-full object-cover border border-slate-200"
                                        />
                                        <span className="text-xs font-semibold text-slate-700">
                                            {course.instructor.name}
                                        </span>
                                    </div>
                                    <div className="text-right">
                                        {course.originalPrice && (
                                            <span className="font-mono text-[11px] text-slate-400 line-through block">
                                                {course.originalPrice}
                                            </span>
                                        )}
                                        <span
                                            className={`text-sm sm:text-base font-extrabold ${
                                                course.isFree
                                                    ? 'text-emerald-600'
                                                    : 'text-teal-700'
                                            }`}
                                        >
                                            {course.discountPrice}
                                        </span>
                                    </div>
                                </div>

                                <div className="mt-3 grid grid-cols-2 gap-2">
                                    <Link
                                        href="/#katalog-kursus"
                                        className="py-2 px-3 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-semibold border border-slate-200/80 transition-colors text-center"
                                    >
                                        Detail Silabus
                                    </Link>
                                    <button
                                        type="button"
                                        className={`py-2 px-3 rounded-xl text-xs font-semibold transition-colors text-center text-white shadow-xs ${
                                            course.isFree
                                                ? 'bg-emerald-600 hover:bg-emerald-700'
                                                : 'bg-teal-600 hover:bg-teal-700'
                                        }`}
                                    >
                                        {course.isFree ? 'Mulai Belajar' : 'Gabung Kelas'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Pagination Controls */}
            <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs">
                <div className="text-xs text-slate-500">
                    Menampilkan <span className="text-slate-900 font-bold">1 - {courses.length}</span>{' '}
                    dari <span className="text-slate-900 font-bold">36</span> kursus terdaftar
                </div>

                <div className="flex items-center gap-1.5">
                    <button
                        type="button"
                        disabled={currentPage === 1}
                        onClick={() => onSelectPage(currentPage - 1)}
                        className="w-8 h-8 rounded-xl bg-slate-50 text-slate-600 hover:bg-slate-100 disabled:opacity-40 flex items-center justify-center transition-colors border border-slate-200/60"
                    >
                        <span className="material-symbols-outlined text-sm">chevron_left</span>
                    </button>
                    {[1, 2, 3, 4].map((page) => (
                        <button
                            key={page}
                            type="button"
                            onClick={() => onSelectPage(page)}
                            className={`w-8 h-8 rounded-xl font-mono text-xs font-bold flex items-center justify-center transition-colors ${
                                currentPage === page
                                    ? 'bg-teal-600 text-white shadow-xs'
                                    : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200/60'
                            }`}
                        >
                            {page}
                        </button>
                    ))}
                    <button
                        type="button"
                        disabled={currentPage === 4}
                        onClick={() => onSelectPage(currentPage + 1)}
                        className="w-8 h-8 rounded-xl bg-slate-50 text-slate-600 hover:bg-slate-100 disabled:opacity-40 flex items-center justify-center transition-colors border border-slate-200/60"
                    >
                        <span className="material-symbols-outlined text-sm">chevron_right</span>
                    </button>
                </div>
            </div>

            {/* Free Learning & Certificate Guarantee Banner */}
            <div className="mt-2 bg-gradient-to-r from-teal-50 to-slate-50 rounded-2xl p-6 sm:p-7 flex flex-col md:flex-row items-center justify-between gap-5 border border-teal-200/60 shadow-xs">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-teal-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                        <span className="material-symbols-outlined text-2xl">
                            workspace_premium
                        </span>
                    </div>
                    <div>
                        <h4 className="text-base font-bold text-slate-900">
                            Sertifikat Digital &amp; Akses Forum Selamanya
                        </h4>
                        <p className="text-xs sm:text-sm text-slate-600 mt-0.5 leading-relaxed">
                            Setiap kursus yang diselesaikan dilengkapi sertifikat bernomor verifikasi dan akses channel Discord eksklusif untuk diskusi santai langsung bersama mentor.
                        </p>
                    </div>
                </div>

                <a
                    href="/#faqAccordion"
                    className="whitespace-nowrap px-5 py-2.5 rounded-xl bg-white hover:bg-slate-100 text-teal-700 border border-teal-200/80 text-xs sm:text-sm font-semibold transition-colors shadow-xs self-stretch md:self-auto text-center"
                >
                    Pusat Bantuan Kursus
                </a>
            </div>
        </div>
    );
}
