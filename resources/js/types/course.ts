export interface Course {
    id: string;
    title: string;
    slug: string;
    description: string;
    category: 'frontend' | 'backend' | 'fullstack' | 'mobile' | 'devops' | 'design';
    level: 'beginner' | 'intermediate' | 'advanced' | 'all';
    levelLabel: string;
    levelColor: string;
    format: 'vod' | 'hybrid' | 'free';
    durationHours: number;
    durationLabel: string;
    rating: number;
    totalModules: number;
    badge?: {
        text: string;
        type: 'bestseller' | 'new' | 'advanced' | 'cross' | 'free' | 'devops' | 'design' | 'data';
        bg: string;
        color: string;
    };
    thumbnail: string;
    instructor: {
        name: string;
        avatar: string;
    };
    originalPrice?: string;
    discountPrice: string;
    isFree?: boolean;
    technologies: string[];
}

export interface LearningPath {
    id: string;
    title: string;
    subtitle: string;
    badge: string;
    badgeColor: string;
    icon: string;
    iconBg: string;
    steps: {
        step: string;
        title: string;
        highlight?: boolean;
    }[];
    progressText: string;
    progressPercent: string;
    avatars: { text: string; bg: string }[];
    buttonText: string;
}

export const LEARNING_PATHS: LearningPath[] = [
    {
        id: 'frontend',
        title: 'Frontend Engineer Roadmap',
        subtitle: '5 Kursus Inti • Total 74 Jam Materi • 6 Portofolio',
        badge: 'Batch Aktif',
        badgeColor: 'bg-teal-50 text-teal-700 border border-teal-200/60',
        icon: 'code_blocks',
        iconBg: 'bg-teal-50 text-teal-600',
        steps: [
            { step: '01', title: 'HTML & CSS' },
            { step: '02', title: 'Modern JS' },
            { step: '03', title: 'TypeScript' },
            { step: '04', title: 'React.js' },
            { step: '05', title: 'Next.js App', highlight: true },
        ],
        progressText: 'Rekomendasi Progress Pemula • Ready to enroll',
        progressPercent: 'w-2/5',
        avatars: [
            { text: 'SG', bg: 'bg-teal-600 text-white' },
            { text: 'RP', bg: 'bg-indigo-600 text-white' },
            { text: '+4k', bg: 'bg-slate-200 text-slate-700' },
        ],
        buttonText: 'Ikuti Alur Belajar',
    },
    {
        id: 'backend',
        title: 'Backend Specialist Roadmap',
        subtitle: '4 Kursus Arsitektur • Total 68 Jam Materi • High Scalability',
        badge: 'High Demand',
        badgeColor: 'bg-amber-50 text-amber-700 border border-amber-200/60',
        icon: 'dns',
        iconBg: 'bg-amber-50 text-amber-600',
        steps: [
            { step: '01', title: 'SQL & NoSQL' },
            { step: '02', title: 'Golang / Node' },
            { step: '03', title: 'Docker & CI/CD' },
            { step: '04', title: 'Microservices', highlight: true },
        ],
        progressText: 'Rekomendasi Progress Pemula • Proyek Backend Teruji',
        progressPercent: 'w-1/3',
        avatars: [
            { text: 'FA', bg: 'bg-amber-600 text-white' },
            { text: 'RP', bg: 'bg-teal-600 text-white' },
            { text: '+2.8k', bg: 'bg-slate-200 text-slate-700' },
        ],
        buttonText: 'Ikuti Alur Belajar',
    },
];

export const COURSES_DATA: Course[] = [
    {
        id: '1',
        title: 'Full-Stack Modern Web Apps: Next.js 15, TypeScript & Prisma ORM',
        slug: 'full-stack-nextjs-15',
        description: 'Bangun platform SaaS interaktif dari scratch memakai App Router, Server Actions, Autentikasi Auth.js v5, dan deployment micro-service di Docker.',
        category: 'fullstack',
        level: 'intermediate',
        levelLabel: 'Intermediate',
        levelColor: 'text-teal-700',
        format: 'vod',
        durationHours: 32,
        durationLabel: '32 Jam',
        rating: 4.9,
        totalModules: 64,
        badge: {
            text: 'Bestseller',
            type: 'bestseller',
            bg: 'bg-amber-500 text-white',
            color: 'text-white',
        },
        thumbnail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD8jlAK_QHfiA_VgjAxerqzLILTHF7_EP-U7eT7oXhFUUF9twucqVQZLJiKOOGDhBmSG3gfWHRzogHqP7VpRvPhACSesvyE7ln6q3axNGmKj2JtFeDosURCM0dMrHE1Wzu1KVBBa--Px7iEUKYX-RUUxVzOiwVOY1WDR9LoaNskXGhSqnf4flyWKukpMN-PNsaDKXDWU3S9z5mpIXl9uQu9zPH1AFgRsHDC15gg7PUqn385-4hR7ubxeg',
        instructor: {
            name: 'Sandhika Galih',
            avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAJ2ycq3DCBjX1kWGq22nTsOcTbME2Q6I-VzcF9Y-tIYs3izH-FtJKs7APWftVWSNjcun06YXPJBaixiq75seTzh8VZDrclmyM7T5J7XQq63LMiHroOzJ0yhJESp2PIZevezM-PzIvhOT_C2pomgSLUY4rFzFpvLETYpLMFzaPClNo0DMBENlwkj5s55Dqi80u-Q5XpwcQbyqflPl91LV3Mc6aAEDJzusF87i6dtoHFsibJapIOl-rvvQ',
        },
        originalPrice: 'Rp 599.000',
        discountPrice: 'Rp 289.000',
        technologies: ['Next.js 15', 'TypeScript', 'Prisma', 'PostgreSQL'],
    },
    {
        id: '2',
        title: 'Modern Web Architecture: Laravel 11, Inertia.js & Tailwind CSS',
        slug: 'modern-laravel-11-inertia',
        description: 'Evolusi PHP modern. Membangun aplikasi single page monolith tanpa kerumitan REST API ganda, real-time Reverb, dan Payment Gateway Midtrans.',
        category: 'backend',
        level: 'intermediate',
        levelLabel: 'Intermediate',
        levelColor: 'text-teal-700',
        format: 'vod',
        durationHours: 28,
        durationLabel: '28 Jam',
        rating: 4.9,
        totalModules: 52,
        badge: {
            text: 'Update Baru 2025',
            type: 'new',
            bg: 'bg-teal-50 text-teal-700 border border-teal-200/80',
            color: 'text-teal-700',
        },
        thumbnail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBk0SHBQP_T3mnU9YV75lLJmg2D7YGPkBZGRU8ptNvXYIxYfztf5Khjk_HOTWvPk4LCiVPWF8qA9pQ-qUmDP-v7Gdscls0L9_znfQvg4lNg2klePjfv4vXNg8RIGIdDckUgFxgo1KiOMjMU1dnPvXfNCd4EEckGMOxSgQ608yFFKXHJEQjbKAXt0yK0VTu8ghVsbUNCtYuDB9DEjxNRIZIKK1Uqu7PheZJThMkPirOZNSukS-H2c8oOnw',
        instructor: {
            name: 'Doddy Ferdiansyah',
            avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCGSmtwnhhGRNky-isgQ3YQMAq3JfCko7EOYTzXIaGkjcbPO5jlfQFKG51MRxINCPjIQpa8k32x5UQOFfYGGWdcqLuHyyyEwH-oSszoBBJNoFijQzgCcKc1-owuF_V-0qA9NDaJcYmvmeZWZgEdRWuRfcs3x4jKYQmlXUVyRRiE7U24Lvs-wwJ-_5EtiVDhkQD8zB1zeFIeSYpbiZVKn3gN3FmvB4eI8zlWq--AlEUlyoOsXRe9udXLqQ',
        },
        originalPrice: 'Rp 480.000',
        discountPrice: 'Rp 249.000',
        technologies: ['Laravel 11', 'Inertia.js', 'React/Vue', 'MySQL'],
    },
    {
        id: '3',
        title: 'Building Scalable Microservices with Go (Golang), gRPC & Docker',
        slug: 'go-microservices-grpc',
        description: 'Arsitektur sistem backend berkecepatan tinggi: concurrency goroutines, Redis caching, Apache Kafka event stream, dan continuous deployment.',
        category: 'backend',
        level: 'advanced',
        levelLabel: 'Tingkat Lanjut',
        levelColor: 'text-amber-700',
        format: 'vod',
        durationHours: 36,
        durationLabel: '36 Jam',
        rating: 4.95,
        totalModules: 48,
        badge: {
            text: 'Advanced',
            type: 'advanced',
            bg: 'bg-indigo-50 text-indigo-700 border border-indigo-200/80',
            color: 'text-indigo-700',
        },
        thumbnail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAIrfhpg41RRorWWGkFY9J275daX6o4qeAExUaWJhIq3o6ifpBqSa7rYF4r7VLMkqPmWgs6a0et7ZfnK0_yqjeUvtH2AEPpIE58-LF39bEZEbMQX8hVXWqqlJPtKhiOH6W3aHCJ_Bpazem3IIOcIxj5tzZzkMFqX3jyRcvjmWDOeJkujw-58RM8T6QdAHhW3QYVxut_WIKwMxGSs98TLP6UJjkywUEd0cD5szICu1Tqw-gmMkTBg_FJJg',
        instructor: {
            name: 'Rizky Pratama',
            avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBD5MHUx5gFWZ2gCrOsRjq76ydQUEI_Z1j-xU8AynloPXq8wVw5TbZrKb5Iq7pQeoqgbmp6m-VBQFMjFsGBCHGc92Dcj2WEDs1MGT27jnFK4ncZD-rFoW7HQ7HKvrvPaL-fNc4nZTXvaTGBRqC2VKzAQftIpOQ9VE7bFnfb33uwVSfF4YPYoFG6bo2ob47k9JIad-E8vs7HK2lcwOoYU-ZlWh64_GakyJ3GhDzKvlJh0MC7qWfPZKIXIQ',
        },
        originalPrice: 'Rp 650.000',
        discountPrice: 'Rp 349.000',
        technologies: ['Go 1.23', 'gRPC', 'Docker', 'Kafka'],
    },
    {
        id: '4',
        title: 'Mobile Masterclass: React Native, Expo Router & Supabase',
        slug: 'react-native-expo-supabase',
        description: 'Kembangkan aplikasi Android dan iOS native sekaligus. Pelajari push notification, SQLite offline sync, kamera, dan integrasi maps terpadu.',
        category: 'mobile',
        level: 'intermediate',
        levelLabel: 'Intermediate',
        levelColor: 'text-teal-700',
        format: 'vod',
        durationHours: 24,
        durationLabel: '24 Jam',
        rating: 4.85,
        totalModules: 42,
        badge: {
            text: 'Cross-Platform',
            type: 'cross',
            bg: 'bg-purple-50 text-purple-700 border border-purple-200/80',
            color: 'text-purple-700',
        },
        thumbnail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA1W_o-0yMpLk9fe_DmlhGh21JLhN2UDLJUh2GyiqK_jVJPPW6R9tXinC9Fklm4fpRvTMlGqHokJTUpGdmgunjH9dmJSKCGyk41kyn9abarlZ3kn7juvNvcRl1Iqb2dfGmVYpA96DM6b7kO1449fKPRmUnFoO9ezXrt4Vn99H-8PXT7gubI16ogHzmS9ydjDi5jk52Qo8Sx_OOm4Q0ZMSGTKG3_Ug5zHf32hTqW3tntbZpewR8xH6bxIQ',
        instructor: {
            name: 'Fajar Siddiq',
            avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAzzMKNAjL-PdrpMk9tGvHCOXZb_UUSxXEPRecin2c38Q5UvIQm87AjldDAn1wvUsSW9ZBzqAI8wMzDKPfjZ8H9F9obk0CAd5mk3Xp65VGnJQXRlrzWfI6EVu9BG89T7ToE_r8oSgBaaoL3Erq-K0PZbddVNkTNS8pppw0mtde5PAeuPH1CXEN8uxZiPYrlMA3Jp5PQz72OcPZ9xCe-koUtLgN-8P56uCVSJRxhdw9nhLfSCpe7GCFi5A',
        },
        originalPrice: 'Rp 450.000',
        discountPrice: 'Rp 219.000',
        technologies: ['React Native', 'Expo Router', 'Supabase'],
    },
    {
        id: '5',
        title: 'Fondasi JavaScript Modern, DOM & Algoritma Pemrograman',
        slug: 'fondasi-javascript-modern-dom',
        description: 'Materi wajib bagi calon programmer. Memahami logika coding, event loop, asynchronous, fetch API, hingga pembuatan mini game berbasis browser.',
        category: 'frontend',
        level: 'beginner',
        levelLabel: 'Pemula / Basic',
        levelColor: 'text-emerald-700',
        format: 'free',
        durationHours: 14,
        durationLabel: '14 Jam',
        rating: 5.0,
        totalModules: 38,
        badge: {
            text: '100% Gratis',
            type: 'free',
            bg: 'bg-emerald-500 text-white',
            color: 'text-white',
        },
        thumbnail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBNPLPS710WMvPWwfUxNUonuFHIY9d444bHzv8gxKW2sv_MOz9c3YUtj5I5M5dmIced9Ppf1AVpayGYqR4OIN1aDcZdZJ53NOtB3gkvmg6_O4fyP3bsN5_3SqVSnnHPfulsaW_gzDFhWCzf-1Iuhg2t3OJtXEFAVlrA4rOG5Gc9vrKsberWwHKuOHnv3ArgzyTkYqxkYTNJpQVj_HRtzS7P0uXTFf0w3wKduKWZ0J0MXKrNeT74sVttSg',
        instructor: {
            name: 'Sandhika Galih',
            avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCYfZUX-Gn_oUAdMTXYiazSEKfZoketNMIoMS_3exsJ25kiVmzokWPHBNjki8IihFfYvYcPCuFLZeMScH3Cchx6jmdh2lGDLDy-lnDjVC_v3-JxZ-sXfSAqyyoZKCF1_JqlAFKFRg2TM-HwXXxzHPbzU3pn0ky4rYRi1cu38YJmHDbuA9q7clmy_igx_1xT071UHdzIDtXq4qeeN6c6H2lGgCMrGX_9-PEKpuSp0ExkKkS6PP3g7WKdYA',
        },
        discountPrice: 'GRATIS',
        isFree: true,
        technologies: ['JavaScript ES6+', 'DOM Api', 'Async/Await'],
    },
    {
        id: '6',
        title: 'Linux Sysadmin, Nginx Reverse Proxy, Docker & GitHub Actions',
        slug: 'linux-sysadmin-nginx-docker',
        description: 'Bawa aplikasi coding kamu ke server VPS nyata. Konfigurasi SSL Let\'s Encrypt gratis, zero downtime deployment, serta hardening keamanan SSH & firewall.',
        category: 'devops',
        level: 'intermediate',
        levelLabel: 'Intermediate',
        levelColor: 'text-teal-700',
        format: 'vod',
        durationHours: 20,
        durationLabel: '20 Jam',
        rating: 4.88,
        totalModules: 34,
        badge: {
            text: 'DevOps Studio',
            type: 'devops',
            bg: 'bg-cyan-50 text-cyan-700 border border-cyan-200/80',
            color: 'text-cyan-700',
        },
        thumbnail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBgRkazDrXDq-owMC-XEAAv-Lzsr_XMJB9cYZmo0wG1jUG0IaK0nfeyT47jTkEYqj9_dMF8Z9nyHVII2ZU0dRfynlZ3cCsPfkYwYZgc2Erd7dYGYj1dMSScNhSVMHrUqk_F4vLlRjejjvy54dFYzXrXCS0vjvbLczqu-iMTxffW_qX0X6uSvHCaCmw0RFj5AFfX_Eu7Gp1XuJnReo2HOoeCxgM3YAa-FGO01Z-y61_VU-xhXHzCzVuwBg',
        instructor: {
            name: 'Ahmad Baihaqi',
            avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAE1pF6Gd9kLhO-KBJpPlkmchesp6cih_zY6TKQtbp1t3FVSc8iPxgnouLJ1LJ8_XdsNzb0ZKvGgv0C-fROuZRMsYXavX_OrhFh876xJL9ROochXjQGf96MrWPhovnuqr3rirGuPG_Uxfi_tF3jKjOUB_BkyJlNp_Z6ARiPTV9ql2mMMviAbvNS8_vl-xbcsEaKE1fYrWrI8WgqQdkLgHe078iCUFfa6Pmnl_7yXc05L_winvx_H830CQ',
        },
        originalPrice: 'Rp 420.000',
        discountPrice: 'Rp 199.000',
        technologies: ['Ubuntu Server', 'Nginx', 'Docker Compose', 'CI/CD'],
    },
    {
        id: '7',
        title: 'UI/UX Design to Code: Figma, Design Tokens & Tailwind CSS v4',
        slug: 'figma-tokens-tailwind-v4',
        description: 'Jembatani gap antara desainer dan programmer. Pelajari auto-layout cerdas, variable design tokens, accessible components, dan implementasi presisi pixel.',
        category: 'design',
        level: 'all',
        levelLabel: 'All Levels',
        levelColor: 'text-slate-700',
        format: 'vod',
        durationHours: 18,
        durationLabel: '18 Jam',
        rating: 4.92,
        totalModules: 30,
        badge: {
            text: 'Design • Code',
            type: 'design',
            bg: 'bg-rose-50 text-rose-700 border border-rose-200/80',
            color: 'text-rose-700',
        },
        thumbnail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCHWUWyYREtbO6KPMEXbmN-Qk6Go1MZbDICutPSY0uIe7RWLZ_1mqH1kkFg5hy6mgh0gh9v4ao7gD3a_nNW3ncl8OS0uMusSk8M5HIsitKw5XZcl4NalwXsNywhMInJrm0KcCc5wy_g8AES4zC6_lYxOwKqU6XunlaXz0iNaJxsamnNUwoLO-7bK8xPf8Enc4BSDz4rHiLimRhtMkaKNn4XirPQgvUtc-XLbBYK7LSLbb0td1NLm32twQ',
        instructor: {
            name: 'Alifia Putri',
            avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCO8wnyJ-rIB2JKl6_aONDT3F4ru7jJiSkYjjLeZSP0i6ZaGFjZyq948V5Kgiq5Ub2r7sjwU2-vR3Ge7mQ2rrmJPHKB50hnd8UQpjGkRSo7gpFRqbhknm02bAk6LKM-TqsTArR3WRkcZn1LH40ftcsswqGziwQlpnWceo_1QH3vQhBFQGahgCRuj7RfSkPRcivXJnokgAu50Cv_iWzOUuOT02-YxEyUDQL84oD87IoCnv76S60f6JJdbA',
        },
        originalPrice: 'Rp 399.000',
        discountPrice: 'Rp 189.000',
        technologies: ['Figma Pro', 'Design Tokens', 'Tailwind CSS'],
    },
    {
        id: '8',
        title: 'Python for Engineers: FastAPI, Web Scraping & Data Pipeline',
        slug: 'python-fastapi-data-pipeline',
        description: 'Kuasai kekuatan Python dari dasar hingga membangun REST API berkecepatan tinggi dengan FastAPI, ekstraksi web skala besar, dan pipeline database SQL.',
        category: 'backend',
        level: 'beginner',
        levelLabel: 'Beginner-Inter',
        levelColor: 'text-teal-700',
        format: 'vod',
        durationHours: 26,
        durationLabel: '26 Jam',
        rating: 4.87,
        totalModules: 45,
        badge: {
            text: 'Data • Backend',
            type: 'data',
            bg: 'bg-emerald-50 text-emerald-700 border border-emerald-200/80',
            color: 'text-emerald-700',
        },
        thumbnail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAapXwtjZvXPBnPSfaIvr0Zb5ny0kHwiusuNnfRIoVkrmrgE7zqx8mL_3gLeKGY8X3WierrQZtBlQV2cVkXdWeqcPTZZG8RWHk3StO0M-t-iVBnQrUWbPbJKBcCy5eNu428MZpNknLMjiv9RfgNH0PzbEiWG-lbfjI8bILCwbQ1SOzkWzXcSd4SJtGXKOCVV7HylBPL0gtP935EbEFQjlLq3ZZVK9ttHTSHLS7AHprljBG9q8Mc8qpLiA',
        instructor: {
            name: 'Bayu Wicaksono',
            avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAKQif9J6qMm_MyIvmdPUKikWe8VKWpcumRF0cPweCqC2RwYO-tC1v2PHW3zWUe5B5Y591GWhhhlB88dPJytp3_ZwxlvlDmJgHWUXFxFvwmSOv_64IncgUQS7N1h_482Y8JVEaX-923ywhbYdwXeRJCq_94FsWzqIJkDTLnhyPAtDXlkDON6rD6m_l13xwDpt8wrGefd6Damg5nWkQGI4cygf3foTRCHLXhjP5k7ZqJ_QVVv3hzY25Nzg',
        },
        originalPrice: 'Rp 460.000',
        discountPrice: 'Rp 229.000',
        technologies: ['Python 3.12', 'FastAPI', 'Pandas', 'PostgreSQL'],
    },
];
