import '@/../css/dashboard.css';
import { MOCK_DASHBOARD_DATA } from '@/dashboard';
import { formatNumber, formatRupiah, getFormattedCurrentDate } from '@/global';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PageProps } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { useState } from 'react';

export default function Dashboard() {
    const user = usePage<PageProps>().props.auth.user;
    const [timeframe, setTimeframe] = useState<'Bulanan' | 'Kuartal' | 'Tahunan'>('Bulanan');
    const { kpi, categories, transactions, pendingActions, activityLogs } = MOCK_DASHBOARD_DATA;

    return (
        <AuthenticatedLayout
            breadcrumbParent="ADMIN CONSOLE"
            breadcrumbCurrent="DASHBOARD UTAMA"
        >
            <Head title="Dashboard - Admin Console" />

            <div className="flex flex-col w-full pb-8 space-y-6">
                {/* 1. Top Welcome & System Status Bar */}
                <section className="bg-surface-container-lowest rounded-xl p-5 sm:p-6 shadow-sm border border-surface-container flex flex-col xl:flex-row xl:items-center justify-between gap-4">
                    <div className="flex flex-col gap-1">
                        <div className="flex flex-wrap items-center gap-3">
                            <h1 className="font-heading text-xl sm:text-2xl font-semibold text-on-surface tracking-tight">
                                Selamat Datang kembali, {user.name}!
                            </h1>
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-secondary-container text-on-secondary-container text-[0.75rem] font-semibold">
                                <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse"></span>
                                99.98% Server Optimal
                            </span>
                        </div>
                        <p className="text-[0.875rem] text-on-surface-variant flex items-center gap-2">
                            <span className="material-symbols-outlined text-[18px] text-outline">
                                calendar_today
                            </span>
                            <span>{getFormattedCurrentDate()}</span>
                            <span>•</span>
                            <span>Semua server CDN &amp; streaming video berjalan lancar tanpa kendala.</span>
                        </p>
                    </div>

                    {/* Quick Action Cluster */}
                    <div className="flex flex-wrap items-center gap-2.5">
                        <button
                            type="button"
                            className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-lg bg-surface-container-low text-on-surface hover:bg-surface-container transition-all text-[0.875rem] font-medium shadow-sm border border-surface-container"
                        >
                            <span className="material-symbols-outlined text-[18px] text-primary">
                                group
                            </span>
                            <span>Kelola Pengguna</span>
                        </button>

                        <button
                            type="button"
                            className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-lg bg-surface-container-low text-on-surface hover:bg-surface-container transition-all text-[0.875rem] font-medium shadow-sm border border-surface-container"
                        >
                            <span className="material-symbols-outlined text-[18px] text-primary">
                                download
                            </span>
                            <span>Unduh Laporan</span>
                        </button>

                        <button
                            type="button"
                            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-primary text-on-primary hover:bg-primary-container transition-all text-[0.875rem] font-semibold shadow-sm active:scale-95"
                        >
                            <span className="material-symbols-outlined text-[18px]">add_circle</span>
                            <span>+ Tambah Kursus Baru</span>
                        </button>
                    </div>
                </section>

                {/* 2. 4 KPI Summary Cards */}
                <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {/* Revenue Card */}
                    <div className="bg-surface-container-lowest p-5 rounded-xl shadow-sm hover:shadow-md transition-shadow relative overflow-hidden flex flex-col justify-between border border-surface-container">
                        <div className="flex items-center justify-between mb-3">
                            <span className="text-[0.75rem] uppercase tracking-wider text-outline font-semibold">
                                Total Pendapatan Kotor
                            </span>
                            <div className="h-9 w-9 rounded-lg bg-secondary-container/60 text-primary flex items-center justify-center">
                                <span className="material-symbols-outlined text-[20px]">payments</span>
                            </div>
                        </div>
                        <div>
                            <div className="font-heading text-2xl font-bold text-on-surface tracking-tight">
                                {formatRupiah(kpi.totalRevenue)}
                            </div>
                            <div className="flex items-center gap-1.5 mt-2">
                                <span className="inline-flex items-center text-primary text-[0.75rem] font-semibold">
                                    <span className="material-symbols-outlined text-[16px]">trending_up</span>
                                    +{kpi.revenueMoMGrowth}%
                                </span>
                                <span className="text-[0.8125rem] text-outline">vs bulan lalu (MoM)</span>
                            </div>
                        </div>
                        <div className="w-full bg-surface-container-high h-1 rounded-full mt-4 overflow-hidden">
                            <div className="bg-primary h-full rounded-full" style={{ width: '78%' }}></div>
                        </div>
                    </div>

                    {/* Active Students Card */}
                    <div className="bg-surface-container-lowest p-5 rounded-xl shadow-sm hover:shadow-md transition-shadow relative overflow-hidden flex flex-col justify-between border border-surface-container">
                        <div className="flex items-center justify-between mb-3">
                            <span className="text-[0.75rem] uppercase tracking-wider text-outline font-semibold">
                                Total Siswa Aktif
                            </span>
                            <div className="h-9 w-9 rounded-lg bg-tertiary-fixed/60 text-tertiary flex items-center justify-center">
                                <span className="material-symbols-outlined text-[20px]">school</span>
                            </div>
                        </div>
                        <div>
                            <div className="font-heading text-2xl font-bold text-on-surface tracking-tight">
                                {formatNumber(kpi.activeStudents)}
                            </div>
                            <div className="flex items-center gap-1.5 mt-2">
                                <span className="inline-flex items-center text-primary text-[0.75rem] font-semibold">
                                    <span className="material-symbols-outlined text-[16px]">person_add</span>
                                    +{formatNumber(kpi.weeklyNewStudents)}
                                </span>
                                <span className="text-[0.8125rem] text-outline">pendaftar minggu ini</span>
                            </div>
                        </div>
                        <div className="w-full bg-surface-container-high h-1 rounded-full mt-4 overflow-hidden">
                            <div className="bg-tertiary h-full rounded-full" style={{ width: '65%' }}></div>
                        </div>
                    </div>

                    {/* Courses & Modules Card */}
                    <div className="bg-surface-container-lowest p-5 rounded-xl shadow-sm hover:shadow-md transition-shadow relative overflow-hidden flex flex-col justify-between border border-surface-container">
                        <div className="flex items-center justify-between mb-3">
                            <span className="text-[0.75rem] uppercase tracking-wider text-outline font-semibold">
                                Kursus &amp; Modul
                            </span>
                            <div className="h-9 w-9 rounded-lg bg-surface-container-high text-on-surface-variant flex items-center justify-center">
                                <span className="material-symbols-outlined text-[20px]">video_library</span>
                            </div>
                        </div>
                        <div>
                            <div className="font-heading text-2xl font-bold text-on-surface tracking-tight">
                                {kpi.totalCourses}{' '}
                                <span className="text-base font-normal text-outline">Kursus</span>
                            </div>
                            <div className="flex items-center gap-2 mt-2">
                                <span className="text-[0.75rem] px-2 py-0.5 rounded bg-surface-container-high text-on-surface font-medium">
                                    {kpi.publishedCourses} Terbit
                                </span>
                                <span className="text-[0.75rem] px-2 py-0.5 rounded bg-secondary-fixed text-on-secondary-fixed font-semibold">
                                    {kpi.reviewCourses} Review
                                </span>
                            </div>
                        </div>
                        <div className="w-full bg-surface-container-high h-1 rounded-full mt-4 overflow-hidden">
                            <div className="bg-secondary h-full rounded-full" style={{ width: '90%' }}></div>
                        </div>
                    </div>

                    {/* Graduation Rate Card */}
                    <div className="bg-surface-container-lowest p-5 rounded-xl shadow-sm hover:shadow-md transition-shadow relative overflow-hidden flex flex-col justify-between border border-surface-container">
                        <div className="flex items-center justify-between mb-3">
                            <span className="text-[0.75rem] uppercase tracking-wider text-outline font-semibold">
                                Tingkat Kelulusan
                            </span>
                            <div className="h-9 w-9 rounded-lg bg-secondary-container/60 text-primary flex items-center justify-center">
                                <span className="material-symbols-outlined text-[20px]">verified</span>
                            </div>
                        </div>
                        <div>
                            <div className="font-heading text-2xl font-bold text-on-surface tracking-tight">
                                {kpi.completionRate}%
                            </div>
                            <div className="flex items-center gap-1.5 mt-2">
                                <span className="text-[0.8125rem] text-on-surface-variant">
                                    {formatNumber(kpi.certifiedStudents)} Sertifikat Terbit
                                </span>
                                <span className="h-1 w-1 rounded-full bg-outline"></span>
                                <span className="text-[0.75rem] text-primary font-medium">Tinggi</span>
                            </div>
                        </div>
                        <div className="w-full bg-surface-container-high h-1 rounded-full mt-4 overflow-hidden">
                            <div className="bg-primary h-full rounded-full" style={{ width: `${kpi.completionRate}%` }}></div>
                        </div>
                    </div>
                </section>

                {/* 3. Main Split Section */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    {/* Left 8-col: Chart + Transactions Table */}
                    <div className="lg:col-span-8 flex flex-col gap-6">
                        {/* Chart Card */}
                        <div className="bg-surface-container-lowest p-5 sm:p-6 rounded-xl shadow-sm border border-surface-container">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
                                <div>
                                    <div className="flex items-center gap-2">
                                        <h2 className="font-heading text-lg font-semibold text-on-surface">
                                            Tren Pendapatan &amp; Pendaftaran Baru
                                        </h2>
                                        <span className="text-[0.75rem] px-2 py-0.5 rounded-full bg-surface-container text-on-surface-variant font-medium">
                                            Tahun 2026
                                        </span>
                                    </div>
                                    <p className="text-[0.8125rem] text-on-surface-variant mt-0.5">
                                        Analisis performa finansial dan laju konversi siswa setiap semester
                                    </p>
                                </div>

                                {/* Filter Controls */}
                                <div className="flex items-center bg-surface-container-low p-1 rounded-lg border border-surface-container self-start sm:self-auto">
                                    {(['Bulanan', 'Kuartal', 'Tahunan'] as const).map((t) => (
                                        <button
                                            key={t}
                                            type="button"
                                            onClick={() => setTimeframe(t)}
                                            className={`px-3 py-1 text-[0.75rem] rounded-md transition-all ${
                                                timeframe === t
                                                    ? 'bg-surface-container-lowest text-on-surface font-semibold shadow-xs'
                                                    : 'text-on-surface-variant hover:text-on-surface'
                                            }`}
                                        >
                                            {t}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Legend */}
                            <div className="flex items-center gap-6 mb-4 pb-2">
                                <div className="flex items-center gap-2">
                                    <div className="h-3 w-3 rounded-full bg-primary"></div>
                                    <span className="text-[0.8125rem] text-on-surface-variant">
                                        Pendapatan Bersih (Juta Rp)
                                    </span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="h-3 w-3 rounded-full bg-tertiary"></div>
                                    <span className="text-[0.8125rem] text-on-surface-variant">
                                        Siswa Baru Terdaftar
                                    </span>
                                </div>
                            </div>

                            {/* Chart Area */}
                            <div className="w-full h-64 relative flex items-end">
                                <svg
                                    className="w-full h-full overflow-visible"
                                    fill="none"
                                    preserveAspectRatio="none"
                                    viewBox="0 0 700 240"
                                >
                                    <defs>
                                        <linearGradient id="primaryAreaGrad" x1="0" x2="0" y1="0" y2="1">
                                            <stop offset="0%" stopColor="#00685f" stopOpacity="0.22"></stop>
                                            <stop offset="100%" stopColor="#00685f" stopOpacity="0.0"></stop>
                                        </linearGradient>
                                        <linearGradient id="tertiaryLineGrad" x1="0" x2="1" y1="0" y2="0">
                                            <stop offset="0%" stopColor="#006194"></stop>
                                            <stop offset="100%" stopColor="#007bb9"></stop>
                                        </linearGradient>
                                    </defs>

                                    {/* Horizontal Guidelines */}
                                    <line stroke="#eff4ff" strokeDasharray="4 4" strokeWidth="1.5" x1="0" x2="700" y1="40" y2="40"></line>
                                    <line stroke="#eff4ff" strokeDasharray="4 4" strokeWidth="1.5" x1="0" x2="700" y1="100" y2="100"></line>
                                    <line stroke="#eff4ff" strokeDasharray="4 4" strokeWidth="1.5" x1="0" x2="700" y1="160" y2="160"></line>
                                    <line stroke="#eff4ff" strokeWidth="1.5" x1="0" x2="700" y1="220" y2="220"></line>

                                    {/* Area Fill */}
                                    <path
                                        d="M 0,180 Q 75,140 150,150 T 300,105 T 450,80 T 600,45 L 700,30 L 700,220 L 0,220 Z"
                                        fill="url(#primaryAreaGrad)"
                                    ></path>

                                    {/* Primary Curve */}
                                    <path
                                        d="M 0,180 Q 75,140 150,150 T 300,105 T 450,80 T 600,45 L 700,30"
                                        stroke="#00685f"
                                        strokeLinecap="round"
                                        strokeWidth="3"
                                    ></path>

                                    {/* Secondary Trend Curve */}
                                    <path
                                        d="M 0,205 Q 75,185 150,170 T 300,140 T 450,120 T 600,90 L 700,70"
                                        stroke="url(#tertiaryLineGrad)"
                                        strokeDasharray="6 4"
                                        strokeLinecap="round"
                                        strokeWidth="2.5"
                                    ></path>

                                    {/* Anchor Points */}
                                    <circle cx="600" cy="45" fill="#ffffff" r="4.5" stroke="#00685f" strokeWidth="3"></circle>
                                    <circle cx="600" cy="90" fill="#ffffff" r="4.5" stroke="#006194" strokeWidth="2.5"></circle>
                                </svg>
                            </div>

                            {/* X-Axis Month Labels */}
                            <div className="flex justify-between items-center pt-3 px-1 text-on-surface-variant text-[0.75rem]">
                                <span>Jan</span>
                                <span>Feb</span>
                                <span>Mar</span>
                                <span>Apr</span>
                                <span>Mei</span>
                                <span>Jun</span>
                                <span>Jul</span>
                                <span>Agu</span>
                                <span className="font-semibold text-primary">Sep (Aktif)</span>
                            </div>
                        </div>

                        {/* Recent Transactions Table */}
                        <div className="bg-surface-container-lowest p-5 sm:p-6 rounded-xl shadow-sm border border-surface-container">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                                <div>
                                    <h2 className="font-heading text-lg font-semibold text-on-surface">
                                        Transaksi Pembelian Kursus Terbaru
                                    </h2>
                                    <p className="text-[0.8125rem] text-on-surface-variant mt-0.5">
                                        Pantauan data real-time pembayaran dari berbagai payment channel
                                    </p>
                                </div>
                                <button
                                    type="button"
                                    className="inline-flex items-center gap-1 text-[0.8125rem] text-primary font-semibold hover:underline self-start sm:self-auto"
                                >
                                    <span>Lihat Semua Transaksi</span>
                                    <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                                </button>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead>
                                        <tr className="bg-surface-container-low text-on-surface-variant text-[0.75rem] uppercase tracking-wider font-semibold">
                                            <th className="py-3 px-4 rounded-l-lg">ID &amp; Siswa</th>
                                            <th className="py-3 px-4">Kursus Yang Dibeli</th>
                                            <th className="py-3 px-4">Metode Bayar</th>
                                            <th className="py-3 px-4">Nominal</th>
                                            <th className="py-3 px-4">Status</th>
                                            <th className="py-3 px-4 rounded-r-lg text-right">Waktu</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y-0 text-[0.875rem]">
                                        {transactions.map((trx) => (
                                            <tr key={trx.id} className="hover:bg-surface-container-low transition-colors group">
                                                <td className="py-3.5 px-4">
                                                    <div className="flex items-center gap-2.5">
                                                        <div className="h-8 w-8 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center text-[0.75rem] font-bold shrink-0">
                                                            {trx.studentInitials}
                                                        </div>
                                                        <div className="min-w-0">
                                                            <p className="text-[0.8125rem] font-semibold text-on-surface truncate">
                                                                {trx.studentName}
                                                            </p>
                                                            <span className="text-[0.6875rem] text-outline">
                                                                {trx.id}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </td>

                                                <td className="py-3.5 px-4">
                                                    <div className="text-[0.8125rem] text-on-surface font-medium line-clamp-1">
                                                        {trx.courseTitle}
                                                    </div>
                                                    <span className="text-[0.6875rem] text-outline">
                                                        {trx.batchType}
                                                    </span>
                                                </td>

                                                <td className="py-3.5 px-4">
                                                    <div className="inline-flex items-center gap-1.5 text-[0.8125rem] text-on-surface-variant">
                                                        <span className="h-2 w-2 rounded-full bg-primary"></span>
                                                        <span>{trx.paymentMethod}</span>
                                                    </div>
                                                </td>

                                                <td className="py-3.5 px-4 text-[0.8125rem] font-bold text-on-surface">
                                                    {formatRupiah(trx.amount)}
                                                </td>

                                                <td className="py-3.5 px-4">
                                                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-secondary-container text-on-secondary-container text-[0.6875rem] font-semibold">
                                                        <span className="material-symbols-outlined text-[14px]">check</span>
                                                        {trx.status}
                                                    </span>
                                                </td>

                                                <td className="py-3.5 px-4 text-right text-[0.75rem] text-outline whitespace-nowrap">
                                                    {trx.timeAgo}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    {/* Right 4-col: Category Distribution, Action Approvals, Activity */}
                    <div className="lg:col-span-4 flex flex-col gap-6">
                        {/* Category Distribution */}
                        <div className="bg-surface-container-lowest p-5 sm:p-6 rounded-xl shadow-sm border border-surface-container">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="font-heading text-lg font-semibold text-on-surface">
                                    Distribusi Kategori
                                </h2>
                                <span className="material-symbols-outlined text-outline text-[20px]">
                                    pie_chart
                                </span>
                            </div>

                            <div className="space-y-4">
                                {categories.map((cat) => (
                                    <div key={cat.name}>
                                        <div className="flex justify-between items-center text-[0.8125rem] mb-1.5">
                                            <span className="text-on-surface font-medium truncate pr-2">
                                                {cat.name}
                                            </span>
                                            <span className={`font-bold ${cat.colorClass}`}>
                                                {cat.percentage}%
                                            </span>
                                        </div>
                                        <div className="w-full bg-surface-container-high h-2 rounded-full overflow-hidden">
                                            <div
                                                className={`${cat.barColorClass} h-full rounded-full transition-all duration-500`}
                                                style={{ width: `${cat.percentage}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-5 p-3 bg-surface-container-low rounded-lg flex items-center justify-between border border-surface-container">
                                <span className="text-[0.75rem] text-on-surface-variant font-medium">
                                    Total Siswa Terdaftar
                                </span>
                                <span className="text-[0.875rem] font-bold text-on-surface">
                                    {formatNumber(kpi.activeStudents)} Siswa
                                </span>
                            </div>
                        </div>

                        {/* Pending Approvals */}
                        <div className="bg-surface-container-lowest p-5 sm:p-6 rounded-xl shadow-sm border border-surface-container">
                            <div className="flex items-center justify-between mb-1">
                                <div className="flex items-center gap-2">
                                    <h2 className="font-heading text-lg font-semibold text-on-surface">
                                        Menunggu Persetujuan
                                    </h2>
                                    <span className="h-2 w-2 rounded-full bg-error"></span>
                                </div>
                                <span className="text-[0.75rem] text-outline font-medium">
                                    3 Kategori Tugas
                                </span>
                            </div>
                            <p className="text-[0.8125rem] text-on-surface-variant mb-4">
                                Antrean moderasi yang membutuhkan tindakan admin/instruktur utama
                            </p>

                            <div className="space-y-2.5">
                                {pendingActions.map((action) => (
                                    <div
                                        key={action.id}
                                        className="p-3 bg-surface-container-low hover:bg-surface-container rounded-lg flex items-start gap-3 transition-colors border border-surface-container"
                                    >
                                        <div className={`p-2 rounded-lg ${action.iconBgColor} ${action.iconTextColor} shrink-0`}>
                                            <span className="material-symbols-outlined text-[18px]">
                                                {action.icon}
                                            </span>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center justify-between gap-1">
                                                <span className="text-[0.8125rem] font-semibold text-on-surface truncate">
                                                    {action.title}
                                                </span>
                                                <span
                                                    className={`text-[0.6875rem] font-medium shrink-0 ${
                                                        action.badgeType === 'error'
                                                            ? 'text-error'
                                                            : action.badgeType === 'primary'
                                                            ? 'text-primary'
                                                            : 'text-outline'
                                                    }`}
                                                >
                                                    {action.badgeText}
                                                </span>
                                            </div>
                                            <p className="text-[0.75rem] text-on-surface-variant mt-0.5 line-clamp-1">
                                                {action.description}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* System Activity */}
                        <div className="bg-surface-container-lowest p-5 sm:p-6 rounded-xl shadow-sm border border-surface-container">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="font-heading text-lg font-semibold text-on-surface">
                                    Log Aktivitas Sistem
                                </h2>
                                <span className="material-symbols-outlined text-outline text-[20px]">
                                    security
                                </span>
                            </div>

                            <div className="space-y-4">
                                {activityLogs.map((log) => (
                                    <div key={log.id} className="flex items-start gap-3">
                                        <div className={`h-2 w-2 rounded-full ${log.dotColorClass} mt-1.5 shrink-0`}></div>
                                        <div className="min-w-0 flex-1">
                                            <p className="text-[0.8125rem] text-on-surface font-medium leading-snug">
                                                {log.message}
                                            </p>
                                            <span className="text-[0.6875rem] text-outline">
                                                {log.meta}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <button
                                type="button"
                                className="w-full mt-4 py-2 rounded-lg bg-surface-container-low hover:bg-surface-container text-on-surface text-[0.8125rem] font-semibold transition-colors text-center border border-surface-container"
                            >
                                Buka Audit Trail Lengkap
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
