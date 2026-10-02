import { UserMetrics } from '@/types';

interface UserInsightCardsProps {
    metrics: UserMetrics;
}

export default function UserInsightCards({ metrics }: UserInsightCardsProps) {
    const verifiedPercentage =
        metrics.total_users > 0
            ? Math.round(
                  ((metrics.total_users - metrics.unverified_count) /
                      metrics.total_users) *
                      100
              )
            : 100;

    const activePercentage =
        metrics.total_users > 0
            ? Math.round((metrics.active_students / metrics.total_users) * 100)
            : 100;

    return (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
            {/* Left Card: Recent User Activities */}
            <div className="lg:col-span-7 bg-surface-container-lowest p-5 rounded-2xl shadow-xs border border-surface-container flex flex-col">
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-surface-container">
                    <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary text-[20px]">
                            history_edu
                        </span>
                        <h2 className="font-heading text-base font-bold text-on-surface">
                            Aktivitas Pengguna Terkini
                        </h2>
                    </div>
                </div>

                <div className="flex flex-col gap-3">
                    <div className="flex items-start gap-3 p-2 rounded-xl hover:bg-surface transition-colors">
                        <div className="w-8 h-8 rounded-full bg-secondary-container/40 flex items-center justify-center text-primary shrink-0 mt-0.5">
                            <span className="material-symbols-outlined text-[16px]">how_to_reg</span>
                        </div>
                        <div className="flex flex-col flex-1 min-w-0 text-xs">
                            <p className="text-on-surface">
                                <strong className="font-semibold text-on-surface">
                                    Pengguna Baru
                                </strong>{' '}
                                telah didaftarkan ke sistem dan role akses disinkronisasi.
                            </p>
                            <span className="text-[11px] text-outline mt-0.5">
                                Baru saja • Jalur Admin Console
                            </span>
                        </div>
                    </div>

                    <div className="flex items-start gap-3 p-2 rounded-xl hover:bg-surface transition-colors">
                        <div className="w-8 h-8 rounded-full bg-surface-container-high flex items-center justify-center text-tertiary shrink-0 mt-0.5">
                            <span className="material-symbols-outlined text-[16px]">
                                workspace_premium
                            </span>
                        </div>
                        <div className="flex flex-col flex-1 min-w-0 text-xs">
                            <p className="text-on-surface">
                                <strong className="font-semibold text-on-surface">
                                    Sertifikasi &amp; Kelas
                                </strong>{' '}
                                siap diakses oleh seluruh pengguna dengan status akun aktif.
                            </p>
                            <span className="text-[11px] text-outline mt-0.5">
                                Otomatisasi Belajar
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Card: Security & Privilege Distribution */}
            <div className="lg:col-span-5 bg-surface-container-lowest p-5 rounded-2xl shadow-xs border border-surface-container flex flex-col justify-between">
                <div>
                    <div className="flex items-center justify-between pb-3 mb-3 border-b border-surface-container">
                        <div className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-primary text-[20px]">
                                security
                            </span>
                            <h2 className="font-heading text-base font-bold text-on-surface">
                                Distribusi Hak &amp; Keamanan
                            </h2>
                        </div>
                        <span className="px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed text-[11px] font-semibold">
                            Tersinkronisasi
                        </span>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <div className="flex justify-between text-xs mb-1.5">
                                <span className="text-on-surface-variant font-medium">
                                    Email Terverifikasi
                                </span>
                                <span className="font-semibold text-on-surface">
                                    {verifiedPercentage}%
                                </span>
                            </div>
                            <div className="h-2 w-full rounded-full bg-surface-container-high overflow-hidden">
                                <div
                                    className="h-full bg-primary rounded-full transition-all duration-500"
                                    style={{ width: `${verifiedPercentage}%` }}
                                ></div>
                            </div>
                        </div>

                        <div>
                            <div className="flex justify-between text-xs mb-1.5">
                                <span className="text-on-surface-variant font-medium">
                                    Tingkat Keaktifan Pengguna
                                </span>
                                <span className="font-semibold text-on-surface">
                                    {activePercentage}%
                                </span>
                            </div>
                            <div className="h-2 w-full rounded-full bg-surface-container-high overflow-hidden">
                                <div
                                    className="h-full bg-tertiary rounded-full transition-all duration-500"
                                    style={{ width: `${activePercentage}%` }}
                                ></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Quick Action Alert Box */}
                <div className="mt-4 p-3 rounded-xl bg-surface-container-low border border-surface-container flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 min-w-0">
                        <span className="material-symbols-outlined text-primary text-[20px] shrink-0">
                            admin_panel_settings
                        </span>
                        <span className="text-xs text-on-surface truncate">
                            Atur izin role granular di modul <strong>Role &amp; Permission</strong>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
