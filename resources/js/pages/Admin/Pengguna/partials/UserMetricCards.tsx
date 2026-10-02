import { UserMetrics } from '@/types';

interface UserMetricCardsProps {
    metrics: UserMetrics;
}

export default function UserMetricCards({ metrics }: UserMetricCardsProps) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Card 1: Total Pengguna */}
            <div className="relative overflow-hidden p-5 rounded-2xl border border-emerald-200 dark:border-emerald-800/40 bg-gradient-to-br from-emerald-50 via-white to-emerald-100/50 dark:from-slate-900 dark:via-slate-900 dark:to-emerald-950/40 shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 group flex flex-col justify-between">
                {/* Background Pattern */}
                <div className="absolute -right-6 -bottom-6 w-32 h-32 rounded-full bg-emerald-500/10 blur-2xl pointer-events-none group-hover:scale-125 transition-transform duration-500"></div>
                <svg
                    className="absolute right-0 top-0 h-full w-28 text-emerald-600/[0.07] dark:text-emerald-400/[0.08] pointer-events-none stroke-current"
                    fill="none"
                    viewBox="0 0 100 100"
                    preserveAspectRatio="none"
                >
                    <path d="M0 100 C 20 0, 50 0, 100 100 Z" strokeWidth="1.5" />
                    <circle cx="80" cy="20" r="15" strokeWidth="1.5" />
                    <circle cx="80" cy="20" r="8" strokeWidth="1" />
                </svg>

                <div className="relative z-10 flex items-start justify-between">
                    <div className="flex flex-col">
                        <span className="text-xs uppercase tracking-wider text-emerald-900 dark:text-emerald-300 font-extrabold">
                            Total Pengguna
                        </span>
                        <span className="font-heading text-3xl font-extrabold text-slate-900 dark:text-white mt-1.5 tracking-tight">
                            {metrics.total_users.toLocaleString('id-ID')}
                        </span>
                    </div>
                    <div className="w-11 h-11 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-xs group-hover:scale-110 transition-transform">
                        <span className="material-symbols-outlined text-[24px]">group</span>
                    </div>
                </div>

                <div className="relative z-10 flex items-center gap-1.5 mt-4 pt-3 border-t border-emerald-200/80 dark:border-emerald-800/40 text-xs text-emerald-900 dark:text-emerald-300 font-semibold">
                    <span className="material-symbols-outlined text-[16px] text-emerald-700 dark:text-emerald-400 font-bold">trending_up</span>
                    <span>Akun terdaftar di sistem</span>
                </div>
            </div>

            {/* Card 2: Siswa Aktif */}
            <div className="relative overflow-hidden p-5 rounded-2xl border border-blue-200 dark:border-blue-800/40 bg-gradient-to-br from-blue-50 via-white to-blue-100/50 dark:from-slate-900 dark:via-slate-900 dark:to-blue-950/40 shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 group flex flex-col justify-between">
                {/* Background Pattern */}
                <div className="absolute -right-6 -bottom-6 w-32 h-32 rounded-full bg-blue-500/10 blur-2xl pointer-events-none group-hover:scale-125 transition-transform duration-500"></div>
                <svg
                    className="absolute right-2 top-2 w-24 h-24 text-blue-600/[0.08] dark:text-blue-400/[0.08] pointer-events-none fill-current"
                    viewBox="0 0 60 60"
                >
                    <circle cx="10" cy="10" r="2.5" />
                    <circle cx="25" cy="10" r="2.5" />
                    <circle cx="40" cy="10" r="2.5" />
                    <circle cx="55" cy="10" r="2.5" />
                    <circle cx="10" cy="25" r="2.5" />
                    <circle cx="25" cy="25" r="2.5" />
                    <circle cx="40" cy="25" r="2.5" />
                    <circle cx="55" cy="25" r="2.5" />
                    <circle cx="10" cy="40" r="2.5" />
                    <circle cx="25" cy="40" r="2.5" />
                    <circle cx="40" cy="40" r="2.5" />
                    <circle cx="55" cy="40" r="2.5" />
                </svg>

                <div className="relative z-10 flex items-start justify-between">
                    <div className="flex flex-col">
                        <span className="text-xs uppercase tracking-wider text-blue-900 dark:text-blue-300 font-extrabold">
                            Siswa Aktif
                        </span>
                        <span className="font-heading text-3xl font-extrabold text-slate-900 dark:text-white mt-1.5 tracking-tight">
                            {metrics.active_students.toLocaleString('id-ID')}
                        </span>
                    </div>
                    <div className="w-11 h-11 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-xs group-hover:scale-110 transition-transform">
                        <span className="material-symbols-outlined text-[24px]">school</span>
                    </div>
                </div>

                <div className="relative z-10 flex items-center gap-1.5 mt-4 pt-3 border-t border-blue-200/80 dark:border-blue-800/40 text-xs text-blue-900 dark:text-blue-300 font-semibold">
                    <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse shrink-0"></span>
                    <span>Status siswa aktif belajar</span>
                </div>
            </div>

            {/* Card 3: Instruktur & Staf */}
            <div className="relative overflow-hidden p-5 rounded-2xl border border-purple-200 dark:border-purple-800/40 bg-gradient-to-br from-purple-50 via-white to-purple-100/50 dark:from-slate-900 dark:via-slate-900 dark:to-purple-950/40 shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 group flex flex-col justify-between">
                {/* Background Pattern */}
                <div className="absolute -right-6 -bottom-6 w-32 h-32 rounded-full bg-purple-500/10 blur-2xl pointer-events-none group-hover:scale-125 transition-transform duration-500"></div>
                <svg
                    className="absolute -right-2 top-0 h-full w-28 text-purple-600/[0.08] dark:text-purple-400/[0.08] pointer-events-none stroke-current"
                    fill="none"
                    viewBox="0 0 100 100"
                >
                    <polygon points="50 10, 90 30, 90 70, 50 90, 10 70, 10 30" strokeWidth="1.5" />
                    <polygon points="50 25, 75 40, 75 65, 50 80, 25 65, 25 40" strokeWidth="1" strokeDasharray="3 3" />
                </svg>

                <div className="relative z-10 flex items-start justify-between">
                    <div className="flex flex-col">
                        <span className="text-xs uppercase tracking-wider text-purple-900 dark:text-purple-300 font-extrabold">
                            Instruktur &amp; Staf
                        </span>
                        <span className="font-heading text-3xl font-extrabold text-slate-900 dark:text-white mt-1.5 tracking-tight">
                            {metrics.instructors_count.toLocaleString('id-ID')}
                        </span>
                    </div>
                    <div className="w-11 h-11 rounded-xl bg-purple-600 text-white flex items-center justify-center shadow-xs group-hover:scale-110 transition-transform">
                        <span className="material-symbols-outlined text-[24px]">verified_user</span>
                    </div>
                </div>

                <div className="relative z-10 flex items-center gap-1.5 mt-4 pt-3 border-t border-purple-200/80 dark:border-purple-800/40 text-xs text-purple-900 dark:text-purple-300 font-semibold">
                    <span className="material-symbols-outlined text-[16px] text-purple-700 dark:text-purple-400 font-bold">badge</span>
                    <span>Pengajar, Admin &amp; Dev</span>
                </div>
            </div>

            {/* Card 4: Belum Terverifikasi */}
            <div className="relative overflow-hidden p-5 rounded-2xl border border-rose-200 dark:border-rose-800/40 bg-gradient-to-br from-rose-50 via-white to-rose-100/50 dark:from-slate-900 dark:via-slate-900 dark:to-rose-950/40 shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 group flex flex-col justify-between">
                {/* Background Pattern */}
                <div className="absolute -right-6 -bottom-6 w-32 h-32 rounded-full bg-rose-500/10 blur-2xl pointer-events-none group-hover:scale-125 transition-transform duration-500"></div>
                <svg
                    className="absolute right-0 -bottom-2 w-28 h-28 text-rose-600/[0.08] dark:text-rose-400/[0.08] pointer-events-none stroke-current"
                    fill="none"
                    viewBox="0 0 100 100"
                >
                    <path d="M10 80 Q 50 10 90 80" strokeWidth="2" strokeDasharray="4 4" />
                    <circle cx="50" cy="45" r="22" strokeWidth="1.5" />
                    <line x1="50" y1="36" x2="50" y2="48" strokeWidth="2" strokeLinecap="round" />
                    <circle cx="50" cy="55" r="1.5" fill="currentColor" />
                </svg>

                <div className="relative z-10 flex items-start justify-between">
                    <div className="flex flex-col">
                        <span className="text-xs uppercase tracking-wider text-rose-900 dark:text-rose-300 font-extrabold">
                            Belum Terverifikasi
                        </span>
                        <span className="font-heading text-3xl font-extrabold text-slate-900 dark:text-white mt-1.5 tracking-tight">
                            {metrics.unverified_count.toLocaleString('id-ID')}
                        </span>
                    </div>
                    <div className="w-11 h-11 rounded-xl bg-rose-600 text-white flex items-center justify-center shadow-xs group-hover:scale-110 transition-transform">
                        <span className="material-symbols-outlined text-[24px]">pending_actions</span>
                    </div>
                </div>

                <div className="relative z-10 flex items-center gap-1.5 mt-4 pt-3 border-t border-rose-200/80 dark:border-rose-800/40 text-xs text-rose-900 dark:text-rose-300 font-semibold">
                    <span className="material-symbols-outlined text-[16px] text-rose-700 dark:text-rose-400 font-bold">priority_high</span>
                    <span>Perlu verifikasi email</span>
                </div>
            </div>
        </div>
    );
}
