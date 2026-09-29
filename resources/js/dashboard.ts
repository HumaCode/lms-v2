/**
 * dashboard.ts - Dashboard data contracts, mock metrics, and calculations
 */

export interface DashboardKPI {
    totalRevenue: number;
    revenueMoMGrowth: number;
    activeStudents: number;
    weeklyNewStudents: number;
    totalCourses: number;
    publishedCourses: number;
    reviewCourses: number;
    completionRate: number;
    certifiedStudents: number;
}

export interface DashboardTransaction {
    id: string;
    studentName: string;
    studentInitials: string;
    courseTitle: string;
    batchType: string;
    paymentMethod: string;
    paymentBadgeColor: string;
    amount: number;
    status: 'Lunas' | 'Pending' | 'Gagal';
    timeAgo: string;
}

export interface CategoryDistribution {
    name: string;
    percentage: number;
    colorClass: string;
    barColorClass: string;
}

export interface PendingAction {
    id: string;
    title: string;
    badgeText: string;
    badgeType: 'error' | 'primary' | 'outline';
    icon: string;
    iconBgColor: string;
    iconTextColor: string;
    description: string;
}

export interface ActivityLog {
    id: string;
    message: string;
    meta: string;
    dotColorClass: string;
}

export const MOCK_DASHBOARD_DATA = {
    kpi: {
        totalRevenue: 348950000,
        revenueMoMGrowth: 14.8,
        activeStudents: 28450,
        weeklyNewStudents: 1280,
        totalCourses: 42,
        publishedCourses: 38,
        reviewCourses: 4,
        completionRate: 84.6,
        certifiedStudents: 12430,
    } as DashboardKPI,

    categories: [
        {
            name: 'Fullstack Web Development',
            percentage: 42,
            colorClass: 'text-primary',
            barColorClass: 'bg-primary',
        },
        {
            name: 'Backend (Node.js & Go)',
            percentage: 28,
            colorClass: 'text-tertiary',
            barColorClass: 'bg-tertiary',
        },
        {
            name: 'AI & Machine Learning',
            percentage: 18,
            colorClass: 'text-primary-container',
            barColorClass: 'bg-primary-container',
        },
        {
            name: 'Mobile (Flutter & React Native)',
            percentage: 12,
            colorClass: 'text-outline',
            barColorClass: 'bg-outline',
        },
    ] as CategoryDistribution[],

    transactions: [
        {
            id: 'TRX-948210',
            studentName: 'Rian Pratama',
            studentInitials: 'RP',
            courseTitle: 'Fullstack Modern Next.js 15 & Laravel 11',
            batchType: 'Batch Reguler',
            paymentMethod: 'BCA Virtual Account',
            paymentBadgeColor: 'bg-primary',
            amount: 449000,
            status: 'Lunas',
            timeAgo: '3 menit lalu',
        },
        {
            id: 'TRX-948209',
            studentName: 'Anisa Salsabila',
            studentInitials: 'AS',
            courseTitle: 'Golang Microservices & Docker Mastery',
            batchType: 'Silabus Backend',
            paymentMethod: 'QRIS Instant',
            paymentBadgeColor: 'bg-tertiary',
            amount: 399000,
            status: 'Lunas',
            timeAgo: '12 menit lalu',
        },
        {
            id: 'TRX-948208',
            studentName: 'Fahmi Akbar',
            studentInitials: 'FA',
            courseTitle: 'Prompt Engineering & AI Agent Development',
            batchType: 'Modul Teranyar',
            paymentMethod: 'GoPay / E-Wallet',
            paymentBadgeColor: 'bg-secondary',
            amount: 349000,
            status: 'Lunas',
            timeAgo: '25 menit lalu',
        },
        {
            id: 'TRX-948207',
            studentName: 'Dinda Novitasari',
            studentInitials: 'DN',
            courseTitle: 'UI/UX Design System with Figma to Code',
            batchType: 'Design Track',
            paymentMethod: 'Mandiri VA',
            paymentBadgeColor: 'bg-primary',
            amount: 399000,
            status: 'Lunas',
            timeAgo: '42 menit lalu',
        },
    ] as DashboardTransaction[],

    pendingActions: [
        {
            id: '1',
            title: '3 Kursus Baru',
            badgeText: 'Review Kurikulum',
            badgeType: 'error',
            icon: 'menu_book',
            iconBgColor: 'bg-secondary-fixed',
            iconTextColor: 'text-on-secondary-fixed',
            description: 'Disubmit oleh Instruktur Tamu (Sandhika Galih & Tim)',
        },
        {
            id: '2',
            title: '18 Diskusi Siswa',
            badgeText: 'Butuh Eskalasi',
            badgeType: 'primary',
            icon: 'forum',
            iconBgColor: 'bg-tertiary-fixed',
            iconTextColor: 'text-tertiary',
            description: 'Pertanyaan problem solving coding & deployment error',
        },
        {
            id: '3',
            title: '5 Klaim Sertifikat',
            badgeText: 'Validasi Nilai',
            badgeType: 'outline',
            icon: 'verified_user',
            iconBgColor: 'bg-surface-container-high',
            iconTextColor: 'text-on-surface',
            description: 'Tugas akhir capstone project menunggu verifikasi nilai',
        },
    ] as PendingAction[],

    activityLogs: [
        {
            id: '1',
            message: 'Webhook Midtrans Sukses Terverifikasi',
            meta: 'Automated Sync • 4 menit lalu',
            dotColorClass: 'bg-primary',
        },
        {
            id: '2',
            message: 'Perubahan Role: "Budi Santoso" menjadi Penguji Teknis',
            meta: 'Oleh Humaidi Z. • 38 menit lalu',
            dotColorClass: 'bg-tertiary',
        },
        {
            id: '3',
            message: 'Sesi Login Baru: IP 180.252.12.88 (Bandung, ID)',
            meta: 'Admin Panel • 2 jam lalu',
            dotColorClass: 'bg-outline',
        },
    ] as ActivityLog[],
};
