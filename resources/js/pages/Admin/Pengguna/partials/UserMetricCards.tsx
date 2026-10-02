import { UserMetrics } from '@/types';

interface UserMetricCardsProps {
    metrics: UserMetrics;
}

export default function UserMetricCards({ metrics }: UserMetricCardsProps) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Card 1: Total Pengguna */}
            <div className="bg-surface-container-lowest p-5 rounded-2xl shadow-xs border border-surface-container flex flex-col justify-between hover:shadow-sm transition-shadow">
                <div className="flex items-start justify-between">
                    <div className="flex flex-col">
                        <span className="text-xs uppercase tracking-wider text-outline font-semibold">
                            Total Pengguna
                        </span>
                        <span className="font-heading text-2xl font-bold text-on-surface mt-1">
                            {metrics.total_users.toLocaleString('id-ID')}
                        </span>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-secondary-container/40 flex items-center justify-center text-primary">
                        <span className="material-symbols-outlined text-[22px]">group</span>
                    </div>
                </div>
                <div className="flex items-center gap-1.5 mt-3 text-xs text-primary font-medium">
                    <span className="material-symbols-outlined text-[16px]">trending_up</span>
                    <span>Akun terdaftar di sistem</span>
                </div>
            </div>

            {/* Card 2: Siswa / Member */}
            <div className="bg-surface-container-lowest p-5 rounded-2xl shadow-xs border border-surface-container flex flex-col justify-between hover:shadow-sm transition-shadow">
                <div className="flex items-start justify-between">
                    <div className="flex flex-col">
                        <span className="text-xs uppercase tracking-wider text-outline font-semibold">
                            Siswa Aktif
                        </span>
                        <span className="font-heading text-2xl font-bold text-on-surface mt-1">
                            {metrics.active_students.toLocaleString('id-ID')}
                        </span>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-surface-container-high flex items-center justify-center text-tertiary">
                        <span className="material-symbols-outlined text-[22px]">school</span>
                    </div>
                </div>
                <div className="flex items-center gap-1.5 mt-3 text-xs text-on-surface-variant font-medium">
                    <span className="w-2 h-2 rounded-full bg-primary shrink-0"></span>
                    <span>Status siswa aktif belajar</span>
                </div>
            </div>

            {/* Card 3: Instruktur & Staf */}
            <div className="bg-surface-container-lowest p-5 rounded-2xl shadow-xs border border-surface-container flex flex-col justify-between hover:shadow-sm transition-shadow">
                <div className="flex items-start justify-between">
                    <div className="flex flex-col">
                        <span className="text-xs uppercase tracking-wider text-outline font-semibold">
                            Instruktur &amp; Staf
                        </span>
                        <span className="font-heading text-2xl font-bold text-on-surface mt-1">
                            {metrics.instructors_count.toLocaleString('id-ID')}
                        </span>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-surface-container-high flex items-center justify-center text-primary-container">
                        <span className="material-symbols-outlined text-[22px]">verified_user</span>
                    </div>
                </div>
                <div className="flex items-center gap-1.5 mt-3 text-xs text-on-surface-variant font-medium">
                    <span className="text-on-surface font-semibold">
                        Pengajar, Admin &amp; Dev
                    </span>
                </div>
            </div>

            {/* Card 4: Menunggu Verifikasi */}
            <div className="bg-surface-container-lowest p-5 rounded-2xl shadow-xs border border-surface-container flex flex-col justify-between hover:shadow-sm transition-shadow">
                <div className="flex items-start justify-between">
                    <div className="flex flex-col">
                        <span className="text-xs uppercase tracking-wider text-outline font-semibold">
                            Belum Terverifikasi
                        </span>
                        <span className="font-heading text-2xl font-bold text-on-surface mt-1">
                            {metrics.unverified_count.toLocaleString('id-ID')}
                        </span>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-error-container/60 flex items-center justify-center text-error">
                        <span className="material-symbols-outlined text-[22px]">pending_actions</span>
                    </div>
                </div>
                <div className="flex items-center gap-1.5 mt-3 text-xs text-error font-medium">
                    <span className="material-symbols-outlined text-[16px]">priority_high</span>
                    <span>Perlu verifikasi email</span>
                </div>
            </div>
        </div>
    );
}
