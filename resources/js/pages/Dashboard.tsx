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
            breadcrumbParent="Admin Console"
            breadcrumbCurrent="Dashboard Utama"
        >
            <Head title="Dashboard - Admin Console" />

            <div className="flex flex-col w-full pb-8 space-y-6">
                {/* 1. Header Banner / Welcome Card */}
                <section className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-xl p-5 sm:p-6 shadow-xs flex flex-col xl:flex-row xl:items-center justify-between gap-5">
                    <div className="flex flex-col gap-1.5">
                        <div className="flex flex-wrap items-center gap-3">
                            <h1 className="font-heading text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-50 tracking-tight">
                                Selamat Datang kembali, {user.name}!
                            </h1>
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400 text-[0.75rem] font-semibold border border-emerald-200/80 dark:border-emerald-800/60">
                                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 dot-pulse"></span>
                                99.98% Server Optimal
                            </span>
                        </div>
                        <p className="text-[0.8125rem] text-slate-500 dark:text-slate-400 flex items-center gap-2">
                            <span className="material-symbols-outlined text-[17px] text-slate-400">
                                calendar_today
                            </span>
                            <span>{getFormattedCurrentDate()}</span>
                            <span className="text-slate-300 dark:text-slate-700">•</span>
                            <span>Infrastruktur CDN &amp; video berjalan normal.</span>
                        </p>
                    </div>

                    {/* Quick Action Buttons */}
                    <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
                        <button
                            type="button"
                            className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-50 hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-700/80 text-slate-700 dark:text-slate-200 transition-colors text-[0.8125rem] font-medium border border-slate-200 dark:border-slate-700 shadow-2xs"
                        >
                            <span className="material-symbols-outlined text-[17px] text-teal-700 dark:text-teal-400">
                                group
                            </span>
                            <span>Kelola Pengguna</span>
                        </button>

                        <button
                            type="button"
                            className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-50 hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-700/80 text-slate-700 dark:text-slate-200 transition-colors text-[0.8125rem] font-medium border border-slate-200 dark:border-slate-700 shadow-2xs"
                        >
                            <span className="material-symbols-outlined text-[17px] text-teal-700 dark:text-teal-400">
                                download
                            </span>
                            <span>Unduh Laporan</span>
                        </button>

                        <button
                            type="button"
                            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-teal-700 hover:bg-teal-800 text-white transition-all text-[0.8125rem] font-semibold shadow-xs active:scale-98"
                        >
                            <span className="material-symbols-outlined text-[17px]">add_circle</span>
                            <span>+ Tambah Kursus Baru</span>
                        </button>
                    </div>
                </section>

                {/* 2. 4 Modern KPI Cards */}
                <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {/* Revenue Card */}
                    <div className="dash-card-hover bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-5 rounded-xl shadow-xs flex flex-col justify-between">
                        <div className="flex items-center justify-between mb-3">
                            <span className="text-[0.75rem] font-medium uppercase tracking-wider text-slate-400 dark:text-slate-500">
                                Total Pendapatan Kotor
                            </span>
                            <div className="h-9 w-9 rounded-lg bg-teal-50 dark:bg-teal-950/60 text-teal-700 dark:text-teal-400 flex items-center justify-center border border-teal-100 dark:border-teal-900">
                                <span className="material-symbols-outlined text-[20px]">payments</span>
                            </div>
                        </div>
                        <div>
                            <div className="font-heading text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
                                {formatRupiah(kpi.totalRevenue)}
                            </div>
                            <div className="flex items-center gap-1.5 mt-2">
                                <span className="inline-flex items-center gap-0.5 text-emerald-600 dark:text-emerald-400 text-[0.75rem] font-semibold">
                                    <span className="material-symbols-outlined text-[15px]">trending_up</span>
                                    +{kpi.revenueMoMGrowth}%
                                </span>
                                <span className="text-[0.75rem] text-slate-400">vs bulan lalu</span>
                            </div>
                        </div>
                        <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full mt-4 overflow-hidden">
                            <div className="bg-teal-600 h-full rounded-full" style={{ width: '78%' }}></div>
                        </div>
                    </div>

                    {/* Active Students Card */}
                    <div className="dash-card-hover bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-5 rounded-xl shadow-xs flex flex-col justify-between">
                        <div className="flex items-center justify-between mb-3">
                            <span className="text-[0.75rem] font-medium uppercase tracking-wider text-slate-400 dark:text-slate-500">
                                Total Siswa Aktif
                            </span>
                            <div className="h-9 w-9 rounded-lg bg-sky-50 dark:bg-sky-950/60 text-sky-600 dark:text-sky-400 flex items-center justify-center border border-sky-100 dark:border-sky-900">
                                <span className="material-symbols-outlined text-[20px]">school</span>
                            </div>
                        </div>
                        <div>
                            <div className="font-heading text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
                                {formatNumber(kpi.activeStudents)}
                            </div>
                            <div className="flex items-center gap-1.5 mt-2">
                                <span className="inline-flex items-center gap-0.5 text-teal-700 dark:text-teal-400 text-[0.75rem] font-semibold">
                                    <span className="material-symbols-outlined text-[15px]">person_add</span>
                                    +{formatNumber(kpi.weeklyNewStudents)}
                                </span>
                                <span className="text-[0.75rem] text-slate-400">minggu ini</span>
                            </div>
                        </div>
                        <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full mt-4 overflow-hidden">
                            <div className="bg-sky-600 h-full rounded-full" style={{ width: '65%' }}></div>
                        </div>
                    </div>

                    {/* Courses Card */}
                    <div className="dash-card-hover bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-5 rounded-xl shadow-xs flex flex-col justify-between">
                        <div className="flex items-center justify-between mb-3">
                            <span className="text-[0.75rem] font-medium uppercase tracking-wider text-slate-400 dark:text-slate-500">
                                Kursus &amp; Modul
                            </span>
                            <div className="h-9 w-9 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 flex items-center justify-center border border-slate-200/60 dark:border-slate-700">
                                <span className="material-symbols-outlined text-[20px]">video_library</span>
                            </div>
                        </div>
                        <div>
                            <div className="font-heading text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
                                {kpi.totalCourses}{' '}
                                <span className="text-sm font-normal text-slate-400">Kursus</span>
                            </div>
                            <div className="flex items-center gap-2 mt-2">
                                <span className="text-[0.75rem] px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium">
                                    {kpi.publishedCourses} Terbit
                                </span>
                                <span className="text-[0.75rem] px-2 py-0.5 rounded-md bg-amber-50 dark:bg-amber-950/50 text-amber-700 dark:text-amber-400 font-semibold border border-amber-200/60 dark:border-amber-900/60">
                                    {kpi.reviewCourses} Review
                                </span>
                            </div>
                        </div>
                        <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full mt-4 overflow-hidden">
                            <div className="bg-slate-500 h-full rounded-full" style={{ width: '85%' }}></div>
                        </div>
                    </div>

                    {/* Completion Rate Card */}
                    <div className="dash-card-hover bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-5 rounded-xl shadow-xs flex flex-col justify-between">
                        <div className="flex items-center justify-between mb-3">
                            <span className="text-[0.75rem] font-medium uppercase tracking-wider text-slate-400 dark:text-slate-500">
                                Tingkat Kelulusan
                            </span>
                            <div className="h-9 w-9 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 flex items-center justify-center border border-emerald-100 dark:border-emerald-900">
                                <span className="material-symbols-outlined text-[20px]">verified</span>
                            </div>
                        </div>
                        <div>
                            <div className="font-heading text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
                                {kpi.completionRate}%
                            </div>
                            <div className="flex items-center gap-1.5 mt-2">
                                <span className="text-[0.75rem] text-slate-500 dark:text-slate-400">
                                    {formatNumber(kpi.certifiedStudents)} Sertifikat
                                </span>
                                <span className="h-1 w-1 rounded-full bg-slate-300 dark:bg-slate-700"></span>
                                <span className="text-[0.75rem] text-emerald-700 dark:text-emerald-400 font-semibold">Tinggi</span>
                            </div>
                        </div>
                        <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full mt-4 overflow-hidden">
                            <div className="bg-emerald-600 h-full rounded-full" style={{ width: `${kpi.completionRate}%` }}></div>
                        </div>
                    </div>
                </section>

                {/* 3. Main Split Section */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    {/* Left 8-col: Chart + Transactions Table */}
                    <div className="lg:col-span-8 flex flex-col gap-6">
                        {/* Chart Card */}
                        <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-5 sm:p-6 rounded-xl shadow-xs">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
                                <div>
                                    <div className="flex items-center gap-2">
                                        <h2 className="font-heading text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">
                                            Tren Pendapatan &amp; Pendaftaran Baru
                                        </h2>
                                        <span className="text-[0.6875rem] px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-medium">
                                            Tahun 2026
                                        </span>
                                    </div>
                                    <p className="text-[0.8125rem] text-slate-500 dark:text-slate-400 mt-0.5">
                                        Analisis performa finansial dan laju konversi siswa setiap semester
                                    </p>
                                </div>

                                {/* Filter Controls */}
                                <div className="flex items-center bg-slate-100 dark:bg-slate-800/80 p-0.5 rounded-lg border border-slate-200/80 dark:border-slate-700/80 self-start sm:self-auto">
                                    {(['Bulanan', 'Kuartal', 'Tahunan'] as const).map((t) => (
                                        <button
                                            key={t}
                                            type="button"
                                            onClick={() => setTimeframe(t)}
                                            className={`px-3 py-1 text-[0.75rem] rounded-md font-medium transition-all ${
                                                timeframe === t
                                                    ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 font-semibold shadow-2xs'
                                                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
                                            }`}
                                        >
                                            {t}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Legend */}
                            <div className="flex items-center gap-5 mb-4">
                                <div className="flex items-center gap-2">
                                    <div className="h-2.5 w-2.5 rounded-full bg-teal-700"></div>
                                    <span className="text-[0.75rem] text-slate-600 dark:text-slate-400 font-medium">
                                        Pendapatan Bersih (Juta Rp)
                                    </span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="h-2.5 w-2.5 rounded-full bg-sky-600"></div>
                                    <span className="text-[0.75rem] text-slate-600 dark:text-slate-400 font-medium">
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
                                        <linearGradient id="naturalTealArea" x1="0" x2="0" y1="0" y2="1">
                                            <stop offset="0%" stopColor="#0f766e" stopOpacity="0.18"></stop>
                                            <stop offset="100%" stopColor="#0f766e" stopOpacity="0.0"></stop>
                                        </linearGradient>
                                        <linearGradient id="naturalSkyLine" x1="0" x2="1" y1="0" y2="0">
                                            <stop offset="0%" stopColor="#0284c7"></stop>
                                            <stop offset="100%" stopColor="#38bdf8"></stop>
                                        </linearGradient>
                                    </defs>

                                    {/* Subtle Guidelines */}
                                    <line stroke="#f1f5f9" strokeDasharray="3 3" strokeWidth="1" x1="0" x2="700" y1="40" y2="40"></line>
                                    <line stroke="#f1f5f9" strokeDasharray="3 3" strokeWidth="1" x1="0" x2="700" y1="100" y2="100"></line>
                                    <line stroke="#f1f5f9" strokeDasharray="3 3" strokeWidth="1" x1="0" x2="700" y1="160" y2="160"></line>
                                    <line stroke="#e2e8f0" strokeWidth="1" x1="0" x2="700" y1="220" y2="220"></line>

                                    {/* Area Fill */}
                                    <path
                                        d="M 0,180 Q 75,140 150,150 T 300,105 T 450,80 T 600,45 L 700,30 L 700,220 L 0,220 Z"
                                        fill="url(#naturalTealArea)"
                                    ></path>

                                    {/* Primary Curve */}
                                    <path
                                        d="M 0,180 Q 75,140 150,150 T 300,105 T 450,80 T 600,45 L 700,30"
                                        stroke="#0f766e"
                                        strokeLinecap="round"
                                        strokeWidth="2.5"
                                    ></path>

                                    {/* Secondary Trend Curve */}
                                    <path
                                        d="M 0,205 Q 75,185 150,170 T 300,140 T 450,120 T 600,90 L 700,70"
                                        stroke="url(#naturalSkyLine)"
                                        strokeDasharray="5 3"
                                        strokeLinecap="round"
                                        strokeWidth="2"
                                    ></path>

                                    {/* Anchor Points */}
                                    <circle cx="600" cy="45" fill="#ffffff" r="4.5" stroke="#0f766e" strokeWidth="2.5"></circle>
                                    <circle cx="600" cy="90" fill="#ffffff" r="4" stroke="#0284c7" strokeWidth="2"></circle>
                                </svg>
                            </div>

                            {/* X-Axis Month Labels */}
                            <div className="flex justify-between items-center pt-3 px-1 text-slate-500 dark:text-slate-400 text-[0.75rem]">
                                <span>Jan</span>
                                <span>Feb</span>
                                <span>Mar</span>
                                <span>Apr</span>
                                <span>Mei</span>
                                <span>Jun</span>
                                <span>Jul</span>
                                <span>Agu</span>
                                <span className="font-semibold text-teal-700 dark:text-teal-400">Sep (Aktif)</span>
                            </div>
                        </div>

                        {/* Recent Transactions Table */}
                        <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-5 sm:p-6 rounded-xl shadow-xs">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                                <div>
                                    <h2 className="font-heading text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">
                                        Transaksi Pembelian Kursus Terbaru
                                    </h2>
                                    <p className="text-[0.8125rem] text-slate-500 dark:text-slate-400 mt-0.5">
                                        Pantauan data real-time pembayaran dari berbagai payment channel
                                    </p>
                                </div>
                                <button
                                    type="button"
                                    className="inline-flex items-center gap-1 text-[0.8125rem] text-teal-700 dark:text-teal-400 font-semibold hover:underline self-start sm:self-auto"
                                >
                                    <span>Lihat Semua Transaksi</span>
                                    <span className="material-symbols-outlined text-[15px]">arrow_forward</span>
                                </button>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="dash-table w-full text-left">
                                    <thead>
                                        <tr className="border-b border-slate-100 dark:border-slate-800 text-slate-500 dark:text-slate-400 text-[0.75rem] uppercase tracking-wider font-semibold">
                                            <th className="py-2.5 px-3">ID &amp; Siswa</th>
                                            <th className="py-2.5 px-3">Kursus</th>
                                            <th className="py-2.5 px-3">Metode</th>
                                            <th className="py-2.5 px-3">Nominal</th>
                                            <th className="py-2.5 px-3">Status</th>
                                            <th className="py-2.5 px-3 text-right">Waktu</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80 text-[0.8125rem]">
                                        {transactions.map((trx) => (
                                            <tr key={trx.id} className="group">
                                                <td className="py-3 px-3">
                                                    <div className="flex items-center gap-2.5">
                                                        <div className="h-8 w-8 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center justify-center text-[0.75rem] font-bold shrink-0">
                                                            {trx.studentInitials}
                                                        </div>
                                                        <div className="min-w-0">
                                                            <p className="font-semibold text-slate-800 dark:text-slate-200 truncate">
                                                                {trx.studentName}
                                                            </p>
                                                            <span className="text-[0.6875rem] text-slate-400">
                                                                {trx.id}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </td>

                                                <td className="py-3 px-3">
                                                    <div className="text-slate-800 dark:text-slate-200 font-medium line-clamp-1">
                                                        {trx.courseTitle}
                                                    </div>
                                                    <span className="text-[0.6875rem] text-slate-400">
                                                        {trx.batchType}
                                                    </span>
                                                </td>

                                                <td className="py-3 px-3">
                                                    <div className="inline-flex items-center gap-1.5 text-slate-600 dark:text-slate-400">
                                                        <span className="h-1.5 w-1.5 rounded-full bg-teal-600"></span>
                                                        <span>{trx.paymentMethod}</span>
                                                    </div>
                                                </td>

                                                <td className="py-3 px-3 font-semibold text-slate-900 dark:text-slate-100">
                                                    {formatRupiah(trx.amount)}
                                                </td>

                                                <td className="py-3 px-3">
                                                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400 text-[0.6875rem] font-semibold border border-emerald-200/80 dark:border-emerald-800/60">
                                                        <span className="material-symbols-outlined text-[13px]">check</span>
                                                        {trx.status}
                                                    </span>
                                                </td>

                                                <td className="py-3 px-3 text-right text-[0.75rem] text-slate-400 whitespace-nowrap">
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
                        <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-5 sm:p-6 rounded-xl shadow-xs">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="font-heading text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">
                                    Distribusi Kategori
                                </h2>
                                <span className="material-symbols-outlined text-slate-400 text-[19px]">
                                    pie_chart
                                </span>
                            </div>

                            <div className="space-y-4">
                                {categories.map((cat) => (
                                    <div key={cat.name}>
                                        <div className="flex justify-between items-center text-[0.8125rem] mb-1.5">
                                            <span className="text-slate-700 dark:text-slate-300 font-medium truncate pr-2">
                                                {cat.name}
                                            </span>
                                            <span className="font-semibold text-slate-800 dark:text-slate-200">
                                                {cat.percentage}%
                                            </span>
                                        </div>
                                        <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                                            <div
                                                className="bg-teal-600 h-full rounded-full transition-all duration-500"
                                                style={{ width: `${cat.percentage}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-5 p-3 bg-slate-50 dark:bg-slate-800/60 rounded-lg flex items-center justify-between border border-slate-200/60 dark:border-slate-700/60">
                                <span className="text-[0.75rem] text-slate-500 dark:text-slate-400 font-medium">
                                    Total Siswa Terdaftar
                                </span>
                                <span className="text-[0.8125rem] font-bold text-slate-800 dark:text-slate-200">
                                    {formatNumber(kpi.activeStudents)} Siswa
                                </span>
                            </div>
                        </div>

                        {/* Pending Approvals */}
                        <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-5 sm:p-6 rounded-xl shadow-xs">
                            <div className="flex items-center justify-between mb-1">
                                <div className="flex items-center gap-2">
                                    <h2 className="font-heading text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">
                                        Menunggu Persetujuan
                                    </h2>
                                    <span className="h-1.5 w-1.5 rounded-full bg-rose-500"></span>
                                </div>
                                <span className="text-[0.75rem] text-slate-400 font-medium">
                                    3 Kategori
                                </span>
                            </div>
                            <p className="text-[0.8125rem] text-slate-500 dark:text-slate-400 mb-4">
                                Antrean moderasi tindakan admin/instruktur
                            </p>

                            <div className="space-y-2.5">
                                {pendingActions.map((action) => (
                                    <div
                                        key={action.id}
                                        className="p-3 bg-slate-50/70 hover:bg-slate-100/80 dark:bg-slate-800/40 dark:hover:bg-slate-800/80 rounded-lg flex items-start gap-3 transition-colors border border-slate-200/50 dark:border-slate-700/40"
                                    >
                                        <div className="p-2 rounded-lg bg-teal-50 dark:bg-teal-950/50 text-teal-700 dark:text-teal-400 shrink-0 border border-teal-100 dark:border-teal-900">
                                            <span className="material-symbols-outlined text-[17px]">
                                                {action.icon}
                                            </span>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center justify-between gap-1">
                                                <span className="text-[0.8125rem] font-semibold text-slate-800 dark:text-slate-200 truncate">
                                                    {action.title}
                                                </span>
                                                <span className="text-[0.6875rem] font-medium text-teal-700 dark:text-teal-400 shrink-0">
                                                    {action.badgeText}
                                                </span>
                                            </div>
                                            <p className="text-[0.75rem] text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-1">
                                                {action.description}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* System Activity */}
                        <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-5 sm:p-6 rounded-xl shadow-xs">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="font-heading text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">
                                    Log Aktivitas Sistem
                                </h2>
                                <span className="material-symbols-outlined text-slate-400 text-[19px]">
                                    security
                                </span>
                            </div>

                            <div className="space-y-3.5">
                                {activityLogs.map((log) => (
                                    <div key={log.id} className="flex items-start gap-3">
                                        <div className="h-2 w-2 rounded-full bg-teal-600 mt-1.5 shrink-0"></div>
                                        <div className="min-w-0 flex-1">
                                            <p className="text-[0.8125rem] text-slate-800 dark:text-slate-200 font-medium leading-snug">
                                                {log.message}
                                            </p>
                                            <span className="text-[0.6875rem] text-slate-400">
                                                {log.meta}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <button
                                type="button"
                                className="w-full mt-4 py-2 rounded-lg bg-slate-50 hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-700/80 text-slate-700 dark:text-slate-200 text-[0.8125rem] font-semibold transition-colors text-center border border-slate-200/80 dark:border-slate-700"
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
