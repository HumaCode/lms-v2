import { useState, useMemo } from 'react';
import { Head } from '@inertiajs/react';
import FrontendLayout from '@/components/frontend/FrontendLayout';
import CourseHeaderSection from '@/components/frontend/course/CourseHeaderSection';
import CourseLearningPaths from '@/components/frontend/course/CourseLearningPaths';
import CourseFilterSidebar from '@/components/frontend/course/CourseFilterSidebar';
import CourseGridSection from '@/components/frontend/course/CourseGridSection';
import { COURSES_DATA } from '@/types/course';

export default function CoursePage() {
    // Search & Filter State
    const [searchQuery, setSearchQuery] = useState('');
    const [activeCategory, setActiveCategory] = useState('all');
    const [selectedLevels, setSelectedLevels] = useState<string[]>(['intermediate']);
    const [selectedFormats, setSelectedFormats] = useState<string[]>(['vod']);
    const [selectedDuration, setSelectedDuration] = useState('all');
    const [selectedTechs, setSelectedTechs] = useState<string[]>([]);
    const [minRating, setMinRating] = useState<number>(0);
    const [sortBy, setSortBy] = useState('popular');
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [currentPage, setCurrentPage] = useState(1);
    const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

    // Filter Handlers
    const handleToggleLevel = (lvl: string) => {
        setSelectedLevels((prev) =>
            prev.includes(lvl) ? prev.filter((item) => item !== lvl) : [...prev, lvl]
        );
    };

    const handleToggleFormat = (fmt: string) => {
        setSelectedFormats((prev) =>
            prev.includes(fmt) ? prev.filter((item) => item !== fmt) : [...prev, fmt]
        );
    };

    const handleToggleTech = (tech: string) => {
        setSelectedTechs((prev) =>
            prev.includes(tech) ? prev.filter((item) => item !== tech) : [...prev, tech]
        );
    };

    const handleResetFilters = () => {
        setSearchQuery('');
        setActiveCategory('all');
        setSelectedLevels([]);
        setSelectedFormats([]);
        setSelectedDuration('all');
        setSelectedTechs([]);
        setMinRating(0);
        setSortBy('popular');
    };

    // Filtered Courses Calculation
    const filteredCourses = useMemo(() => {
        return COURSES_DATA.filter((c) => {
            // Category check
            if (activeCategory !== 'all' && c.category !== activeCategory) {
                return false;
            }

            // Search query check
            if (searchQuery.trim()) {
                const q = searchQuery.toLowerCase();
                const matchTitle = c.title.toLowerCase().includes(q);
                const matchDesc = c.description.toLowerCase().includes(q);
                const matchTech = c.technologies.some((t) => t.toLowerCase().includes(q));
                if (!matchTitle && !matchDesc && !matchTech) return false;
            }

            // Level check
            if (selectedLevels.length > 0 && !selectedLevels.includes(c.level)) {
                return false;
            }

            // Format check
            if (selectedFormats.length > 0 && !selectedFormats.includes(c.format)) {
                return false;
            }

            // Duration check
            if (selectedDuration === 'short' && c.durationHours >= 10) return false;
            if (selectedDuration === 'medium' && (c.durationHours < 10 || c.durationHours > 30))
                return false;
            if (selectedDuration === 'long' && c.durationHours < 30) return false;

            // Rating check
            if (minRating > 0 && c.rating < minRating) return false;

            // Tech check
            if (selectedTechs.length > 0) {
                const hasTech = selectedTechs.some((st) =>
                    c.technologies.some((ct) => ct.toLowerCase().includes(st.toLowerCase()))
                );
                if (!hasTech) return false;
            }

            return true;
        });
    }, [
        searchQuery,
        activeCategory,
        selectedLevels,
        selectedFormats,
        selectedDuration,
        selectedTechs,
        minRating,
    ]);

    return (
        <FrontendLayout>
            <Head title="Katalog Kursus Pemrograman - HC Course" />

            <div className="flex flex-col w-full">
                {/* 1. Header with Search & Category Chips */}
                <CourseHeaderSection
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    activeCategory={activeCategory}
                    setActiveCategory={setActiveCategory}
                    onToggleMobileFilter={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
                />

                {/* 2. Structured Learning Paths (Roadmap Deck) */}
                <CourseLearningPaths />

                {/* 3. Main Catalog Section (Sticky Sidebar Filter + Courses Grid) */}
                <div className="max-w-[1280px] mx-auto px-4 lg:px-8 py-10 w-full">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                        {/* Sidebar Filter (3 cols) */}
                        <div className="lg:col-span-3">
                            <CourseFilterSidebar
                                isOpenMobile={isMobileFilterOpen}
                                onCloseMobile={() => setIsMobileFilterOpen(false)}
                                selectedLevels={selectedLevels}
                                onToggleLevel={handleToggleLevel}
                                selectedFormats={selectedFormats}
                                onToggleFormat={handleToggleFormat}
                                selectedDuration={selectedDuration}
                                onSelectDuration={setSelectedDuration}
                                selectedTechs={selectedTechs}
                                onToggleTech={handleToggleTech}
                                minRating={minRating}
                                onSelectRating={setMinRating}
                                onResetFilters={handleResetFilters}
                            />
                        </div>

                        {/* Courses Grid / List (9 cols) */}
                        <div className="lg:col-span-9">
                            <CourseGridSection
                                courses={filteredCourses}
                                viewMode={viewMode}
                                onToggleViewMode={setViewMode}
                                sortBy={sortBy}
                                onSelectSortBy={setSortBy}
                                currentPage={currentPage}
                                onSelectPage={setCurrentPage}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </FrontendLayout>
    );
}
