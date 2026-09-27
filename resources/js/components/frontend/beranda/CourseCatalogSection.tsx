import { useState } from 'react';

export interface Course {
    id: number;
    title: string;
    description: string;
    categories: string[];
    tagBadge: string;
    tagBadgeColor: string;
    techBadge: string;
    durationHours: number;
    modulesCount: number;
    skills: string[];
    instructorName: string;
    instructorAvatar: string;
    rating: number;
    reviewCount: string;
    originalPrice: string;
    discountPrice: string;
    thumbnailUrl: string;
}

const COURSES: Course[] = [
    {
        id: 1,
        title: 'Modern Full-Stack React 19 & Next.js 15: From Zero to Production',
        description: 'Server Actions, Parallel Routes, Optimistic UI, Turbopack, dan integrasi Prisma ORM dengan PostgreSQL live deploy.',
        categories: ['frontend', 'fullstack'],
        tagBadge: 'FRONTEND & SSR',
        tagBadgeColor: 'text-teal-800 bg-white/95',
        techBadge: 'Next.js 15',
        durationHours: 42,
        modulesCount: 128,
        skills: ['React 19', 'Server Actions', 'TypeScript'],
        instructorName: 'Sandhika Galih',
        instructorAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCkeRAUYy_q5nbzShQ5POiQM0twAeXQrcchysr5i8ajxREIG9a7zkmh3Ig7xdWDPG--o0kq33iH_IB9BiLKFfrZRcAU2wraJWNRTf36CovAwxbexTaBbcwdQCLb34xd9S697UTDDTnHW-MM_lfuOA6ju5q8U_3xj2GsdDSu0ATQfnIdzXS0td773NRm9KkZUgsMM3uhq6M_3PBspqtG1CYVJZoo1h5Y27N-E-nLpK2buArND4AWjsOphQ',
        rating: 4.9,
        reviewCount: '1.8k',
        originalPrice: 'Rp 750.000',
        discountPrice: 'Rp 349.000',
        thumbnailUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAxIqX8uqJmDIrgHazrPEZa6p5H0t9vNKuZw-0tP138Ao0SCeZjZXrvOGlLmHtGb1S1nB3CAwEdhmi7JTCs8TgU1vZQOaVBkMPZNSI90Voo149NLs3vjideuA2kiRYYgPrhCka1C7AGxcEf_tqXi-DTtyJcdaHPUe4WX4D2b592SLITzw4h6i14lm-4nLWwrOwb-nWGfNxwnDKfETYkyQMyMEpx2lQT4nH5B9Cgmhow5NQqlYBhk1vwgQ',
    },
    {
        id: 2,
        title: 'Mastering Node.js, Express & PostgreSQL RESTful API',
        description: 'Arsitektur Clean Code, JWT Auth with Refresh Tokens, Redis Caching, rate limiting, and automated unit testing with Jest.',
        categories: ['backend'],
        tagBadge: 'BACKEND ARCHITECTURE',
        tagBadgeColor: 'text-indigo-700 bg-white/95',
        techBadge: 'Node.js 22 LTS',
        durationHours: 36,
        modulesCount: 95,
        skills: ['PostgreSQL', 'Express.js', 'Redis'],
        instructorName: 'Fajar Pratama (Senior BE)',
        instructorAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAI0okgknFjDyYTsYp2InPGwYXDn3juLSBgwDU08vYny1kWI7ZMQOm0neJ506S_lM6uDRZQU3GQfx5L6Xq2d7mchFoI7LsvZQS0ViEfC0QoVI6j-rKvJRiwSOnLN8SDNkgXdsMUvOX1kDF1SW_4ZDpRdo_hrRPD5jjRGZN052lpPteztF8yYd6wm7v2_Ni2EYnYHjxKCSnkDmKE0Gbuigw8xY7WRx45PFbPSyM6GeBn4R3hpp9VelwISA',
        rating: 4.9,
        reviewCount: '1.2k',
        originalPrice: 'Rp 650.000',
        discountPrice: 'Rp 299.000',
        thumbnailUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAZ2zvhFAQFw_av1UlHvTK_6OHTAbs_XywN_hcu4BxzySKBn7h_bimVCRUPvjpSRe5ObmSdaQ9w4lvpITR3hyWBizxfUetwZTjtRKy7xND5vATjVTwDg-OSwlSahxyBCWxOtdJeKphssHmU9DanC1fztod0kmhn6xDmzaSfD0i91UEdUnLRX9wQQo-sjmQ-HN4wT3z1pBnKU94QfBF48kxfhchqaEx28kq49vEeR84LDqcg9fV074bGsA',
    },
    {
        id: 3,
        title: 'Dasar Pemrograman Web Modern: HTML5, CSS3, & Modern JS (ES6+)',
        description: 'Kuasai logika dasar DOM, semantic HTML, Flexbox, CSS Grid, Asynchronous JS, dan fetch API dengan analogi yang sangat mudah dimengerti.',
        categories: ['frontend'],
        tagBadge: 'PEMULA BEBAS PRASYARAT',
        tagBadgeColor: 'text-amber-700 bg-white/95',
        techBadge: 'Fondasi Kokoh',
        durationHours: 28,
        modulesCount: 80,
        skills: ['HTML5 Semantic', 'CSS Grid', 'Modern JS'],
        instructorName: 'Sandhika Galih',
        instructorAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAvZFK2kV3kj6kQdDRKMn2m21JnGk88oQFx-jNyP8LJfma8L_h0nC3jJ4p1TXQeK6fxUQXD1y7A6WLLw9FJGcmtwUDLB3x3f8ibCTt5Cz8GgOty-KcWAfjTvmMnvpAi-ZcYfXqrvZZDvsXIeQrYLuqWkwIWPm-v_sz4bNNQePuNQ0wxoGJcIj8pRpjYDKq4FUZAV3PK6EyY6e4wj4VGPhRl2AcMyJLmke2pMNMQim0Y-3KeJf8l1gEplQ',
        rating: 5.0,
        reviewCount: '3.4k',
        originalPrice: 'Rp 450.000',
        discountPrice: 'Rp 189.000',
        thumbnailUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAImfRfpI5SmcdV1lKwGUfo5bmc-khAbXdTilSArtwJY5ix1HbNa0ymOmgIZpHalibeogDDbCwM7zzPYtrX1lUXD5EtdRVBCfATmkG9TIh4qkCAzm2Opg7HhqyMgufYYY5GRwk5L34jNyLPef12Q_gQmIkAyGCcrP3uTC4vtTXTh1zBUPkLV7hbQ7xODOrnBmNDMtr1TXFmcqfyJcekRmBDRFa9jPPFjTx5l0hhcbimBBoSN201X91OsA',
    },
    {
        id: 4,
        title: 'Golang Microservices & Docker Production Architecture',
        description: 'gRPC Communication, Event-Driven with RabbitMQ, Docker Multi-stage build, and Kubernetes deployment ready.',
        categories: ['backend', 'devops'],
        tagBadge: 'ADVANCED ENTERPRISE',
        tagBadgeColor: 'text-teal-800 bg-white/95',
        techBadge: 'Go 1.23',
        durationHours: 40,
        modulesCount: 110,
        skills: ['gRPC', 'Docker', 'RabbitMQ'],
        instructorName: 'Bayu Wicaksono (Lead Cloud)',
        instructorAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBeUp1Iqqpao73d80F5mfPuYw0Vuvvm4ByygynkH8jMGZh2Jr1f9k8j5F9ZFwlksPRZAe0iJYiVfR4YjDnxNSNYYpjSkJrAKA4lu_rkyT0w5pDVZQjvMUEoXJR-zaOayFV8cX2e3ifVN2qCdaxTjXqLAwEEcQTAyyP8ctxeQEzfwTG90pnimDk8bTRy994tT0Hf31UKllcmEl-69knI-fS5TZPmjLBAManpLGqbhm7Jp3W9SkFFtdSG4Q',
        rating: 4.9,
        reviewCount: '920',
        originalPrice: 'Rp 800.000',
        discountPrice: 'Rp 399.000',
        thumbnailUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBncFdXGpvB9hRopzTsXKOW4OGMizEWmwU4xUX0CFN6NIZ_7dB6BiyEW_td0CF4CWwfseykdS7WhsykQcKIaXJp1hDCfctDOOumiYy6I3uMX8HzPW4aFgkvxEKVkEGzU88C3JtmjQC9h0pyeEII4fheOHqoh6OM4j-EiQOfclOWl3ksf9wqWAO5um7s6-bKvt9Ghu_W6Pt_U47zxc-K0v-sTLhLubg9HkBP3UUtUFMevvWu2Ho7rdoWVw',
    },
    {
        id: 5,
        title: 'Complete Laravel 11 & Vue 3 Inertia Enterprise Stack',
        description: 'Bangun monolith modern tanpa ribet API terpisah menggunakan Inertia.js v2, Tailwind CSS, Stripe Gateway, dan spatie role permission.',
        categories: ['backend', 'fullstack'],
        tagBadge: 'ENTERPRISE STACK',
        tagBadgeColor: 'text-rose-700 bg-white/95',
        techBadge: 'Laravel 11',
        durationHours: 50,
        modulesCount: 142,
        skills: ['Laravel 11', 'Vue 3', 'Inertia.js'],
        instructorName: 'Sandhika Galih & Guest',
        instructorAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC3ovz0BmBvO9z3L2ZxvyCxEaJA99C0IGjHZfZhaD0QEQFmsh0Gy26I4RSBhUOKN_O5j7h5U37riXzKBrQ99ZmvvVhMijamaLTCCeNUFL2hoamMYzQwy3klhJy2Z2Bje0l4jLNatA4EXVKbJS1F0sK6oDvXM5PDLfeYZU5sNynp8X89B2t9nfsh0DJ5M4m7CFBEkLauLaK8hICZu1Y3BRsO-Q17Mw7OBzV2e6vAw_w1tGkHVSG6ptMsLg',
        rating: 4.8,
        reviewCount: '2.1k',
        originalPrice: 'Rp 700.000',
        discountPrice: 'Rp 329.000',
        thumbnailUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBQwOJwAR6H_KU6Noei7yywGt-w2BWdmQUwjp_7vAVIXan_ftxe0TFq-3X3ZfIg7OZAMvsSeC0KeaRXllpCKWj8Qa_tWFcUYZMjmAkHIg1CCkG7bBc73CxVrB6tC2jj7DJL_klCZtBFVenvAfo6yE47e9SnyS8Z0TQfeBfRL06gmPoOLV41efCx08m9nnorbbAXrEYYl7KufRMKN32yuZH38blvCOeplb2dtDLW3TpUKQ3KW7JqCDEj-w',
    },
    {
        id: 6,
        title: 'Tailwind CSS v4 & UI Component Engineering',
        description: 'Kupas tuntas engine baru @theme, CSS native variables, responsive breakpoints kustom, micro-animations, dan reusable UI library.',
        categories: ['frontend'],
        tagBadge: 'DESIGN SYSTEM DEV',
        tagBadgeColor: 'text-teal-800 bg-white/95',
        techBadge: 'Tailwind v4',
        durationHours: 18,
        modulesCount: 52,
        skills: ['Tailwind v4', 'UI System', 'Accessibility'],
        instructorName: 'Dian Rahmat (UI Engineer)',
        instructorAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDZsdGQbYPjnr1jkNLhuYZZqMnZ9crs4nBsfmnnMmOuE5NjyNyk0sLiCp_cX8C8EJbpdSbAIREQWNDz0DpVGSwleyJBOVyispekWmdqH56wtb5owh8_9XBRMJWdQW0z1TiJ3cFI_tO6r7JnRtGkXq0jdRcfpiZCUY5eYNGO47oUmpBqqPUSMpdvzl2Qc5oX9OgaK--2aZsqlKWKlpDWgsq_dD-4lGWvkYlmq9I4gq4HYsG2iHF4OpFA8Q',
        rating: 4.9,
        reviewCount: '1.5k',
        originalPrice: 'Rp 400.000',
        discountPrice: 'Rp 179.000',
        thumbnailUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA-8EEDLc0aQ5hSSMhJM5ViQnjwc9_Hq6Z_qD8gQc1S2GW3Cx5xfsSCV3dcogvN_1DEeAfdA0C5spuexlawcWdYlMNxmOrTo8Hvh0qBR4VzahtQOE-C2zeOyUejet0zBgXJ2VSP1LrZdEMebW515BvuDKGIXiYfyMMm1fuEfJgBrsP_y0RrVSmfq5gLThDWqUFp1GydD0QJBb5_Ub6nLRhb9cj_gF58BzpN2OH1dbYznRPhg7DrzfoAWg',
    },
];

export default function CourseCatalogSection() {
    const [selectedCategory, setSelectedCategory] = useState<string>('all');

    const filteredCourses = selectedCategory === 'all'
        ? COURSES
        : COURSES.filter((c) => c.categories.includes(selectedCategory));

    return (
        <section className="max-w-[1280px] mx-auto px-4 lg:px-8 py-16" id="katalog-kursus">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
                <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-teal-600"></span>
                        <span className="font-mono text-xs text-teal-600 uppercase tracking-wider font-semibold">
                            Silabus Standar Industri
                        </span>
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
                        Katalog Kursus Terpopuler
                    </h2>
                    <p className="text-sm text-slate-600 max-w-xl">
                        Materi disusun bertahap dari konsep paling dasar hingga arsitektur enterprise modern. Tidak ada lompatan logika yang membingungkan.
                    </p>
                </div>
                <a
                    href="#katalog-kursus"
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-teal-600 hover:text-teal-700 transition-colors group"
                >
                    <span>Lihat Semua 45+ Kursus</span>
                    <span className="material-symbols-outlined text-base group-hover:translate-x-1 transition-transform">
                        arrow_forward
                    </span>
                </a>
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8">
                {[
                    { key: 'all', label: 'Semua Kursus' },
                    { key: 'frontend', label: 'Frontend Web' },
                    { key: 'backend', label: 'Backend & API' },
                    { key: 'fullstack', label: 'Fullstack Track' },
                    { key: 'devops', label: 'DevOps & Cloud' },
                ].map((tab) => (
                    <button
                        key={tab.key}
                        type="button"
                        onClick={() => setSelectedCategory(tab.key)}
                        className={`px-4 py-2 rounded-xl font-medium text-xs sm:text-sm whitespace-nowrap transition-all duration-150 ${
                            selectedCategory === tab.key
                                ? 'bg-slate-900 text-white shadow-xs'
                                : 'bg-slate-100/80 hover:bg-slate-200/70 text-slate-600 hover:text-slate-900 border border-transparent'
                        }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Course Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCourses.map((course) => (
                    <div
                        key={course.id}
                        className="rounded-2xl bg-white border border-slate-200/60 hover:border-slate-300 transition-all duration-200 flex flex-col justify-between overflow-hidden shadow-xs hover:shadow-sm group"
                    >
                        <div>
                            {/* Cover Image & Badges */}
                            <div className="relative w-full h-48 bg-slate-900 overflow-hidden flex items-center justify-center">
                                <img
                                    src={course.thumbnailUrl}
                                    alt={course.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent"></div>
                                <div className="absolute top-3 left-3 flex items-center gap-2">
                                    <span className={`font-mono text-[10px] px-2 py-1 rounded font-bold shadow-xs ${course.tagBadgeColor}`}>
                                        {course.tagBadge}
                                    </span>
                                </div>
                                <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2 py-1 rounded bg-slate-900/85 backdrop-blur-md text-white shadow-xs">
                                    <span className="material-symbols-outlined text-xs text-emerald-400">
                                        radio_button_checked
                                    </span>
                                    <span className="font-mono text-[10px] text-white font-medium">
                                        {course.techBadge}
                                    </span>
                                </div>
                            </div>

                            {/* Card Content */}
                            <div className="p-5 flex flex-col gap-3">
                                <div className="flex items-center justify-between text-slate-500 font-mono text-xs">
                                    <span className="flex items-center gap-1 text-teal-600 font-semibold">
                                        <span className="material-symbols-outlined text-sm">schedule</span>{' '}
                                        {course.durationHours} Jam Video
                                    </span>
                                    <span>{course.modulesCount} Modul Materi</span>
                                </div>

                                <h3 className="text-base font-semibold text-slate-900 group-hover:text-teal-600 transition-colors line-clamp-2">
                                    {course.title}
                                </h3>
                                <p className="text-xs text-slate-600 line-clamp-2">
                                    {course.description}
                                </p>

                                {/* Skill Tags */}
                                <div className="flex flex-wrap gap-1.5 pt-1">
                                    {course.skills.map((skill, idx) => (
                                        <span
                                            key={idx}
                                            className="text-[11px] px-2.5 py-0.5 rounded-full bg-slate-100/80 text-slate-600 font-medium"
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Footer & Price */}
                        <div className="p-5 pt-0 flex flex-col gap-3 border-t border-slate-100/70 mt-2">
                            <div className="flex items-center justify-between pt-3">
                                <div className="flex items-center gap-2">
                                    <img
                                        src={course.instructorAvatar}
                                        alt={course.instructorName}
                                        className="w-7 h-7 rounded-full object-cover ring-1 ring-slate-100"
                                    />
                                    <span className="text-xs font-medium text-slate-600">
                                        {course.instructorName}
                                    </span>
                                </div>
                                <div className="flex items-center gap-1 text-amber-500 font-mono text-xs">
                                    <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>
                                        star
                                    </span>
                                    <span className="font-semibold text-slate-700">{course.rating}</span>
                                    <span className="text-slate-400">({course.reviewCount})</span>
                                </div>
                            </div>

                            <div className="flex items-center justify-between pt-2">
                                <div className="flex flex-col">
                                    <span className="text-[11px] text-slate-400 line-through">
                                        {course.originalPrice}
                                    </span>
                                    <span className="text-base font-bold text-slate-900">
                                        {course.discountPrice}
                                    </span>
                                </div>
                                <button
                                    type="button"
                                    className="px-3.5 py-2 rounded-xl bg-teal-50 hover:bg-teal-600 text-teal-700 hover:text-white text-xs font-medium transition-colors"
                                >
                                    Mulai Belajar
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
