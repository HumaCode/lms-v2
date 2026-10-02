import AppModal from '@/components/AppModal';
import { UserData } from '@/types';
import { useState } from 'react';

interface UserDetailModalProps {
    show: boolean;
    onClose: () => void;
    user: UserData | null;
    onEdit?: (user: UserData) => void;
}

export default function UserDetailModal({
    show,
    onClose,
    user,
    onEdit,
}: UserDetailModalProps) {
    const [copiedField, setCopiedField] = useState<string | null>(null);

    if (!show || !user) return null;

    const handleCopy = (text: string, field: string) => {
        navigator.clipboard.writeText(text);
        setCopiedField(field);
        setTimeout(() => setCopiedField(null), 2000);
    };

    const roleSlug = (user.role?.slug || user.role?.name || 'student').toLowerCase();

    const getRoleBadge = (role: string) => {
        switch (role) {
            case 'admin':
            case 'administrator':
                return {
                    label: 'Administrator',
                    icon: 'admin_panel_settings',
                    classes: 'bg-indigo-50 text-indigo-700 border-indigo-200/80',
                };
            case 'instructor':
                return {
                    label: 'Instruktur',
                    icon: 'school',
                    classes: 'bg-amber-50 text-amber-700 border-amber-200/80',
                };
            case 'developer':
            case 'dev':
                return {
                    label: 'Developer',
                    icon: 'terminal',
                    classes: 'bg-cyan-50 text-cyan-700 border-cyan-200/80',
                };
            default:
                return {
                    label: 'Siswa / Pelajar',
                    icon: 'local_library',
                    classes: 'bg-emerald-50 text-emerald-700 border-emerald-200/80',
                };
        }
    };

    const roleInfo = getRoleBadge(roleSlug);

    const footer = (
        <div className="flex items-center justify-between w-full">
            <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-semibold rounded-xl bg-surface-container-high hover:bg-surface-container-highest text-on-surface transition-colors cursor-pointer"
            >
                Tutup
            </button>
            {onEdit && (
                <button
                    type="button"
                    onClick={() => {
                        onClose();
                        onEdit(user);
                    }}
                    className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs transition-all cursor-pointer"
                >
                    <span className="material-symbols-outlined text-[16px]">edit</span>
                    <span>Ubah Data Akun</span>
                </button>
            )}
        </div>
    );

    return (
        <AppModal
            show={show}
            onClose={onClose}
            title="Detail Informasi Pengguna"
            description="Informasi lengkap akun, data kontak, peran, dan riwayat pendaftaran"
            icon="badge"
            headerVariant="emerald"
            maxWidth="xl"
            footer={footer}
        >
            <div className="p-4 sm:p-5 space-y-3.5">
                {/* 1. Hero Profile Banner */}
                <div className="relative p-3.5 sm:p-4 rounded-2xl bg-gradient-to-br from-surface-container-lowest to-surface-container/30 border border-surface-container shadow-2xs flex flex-row items-center gap-3.5">
                    {/* Compact Avatar with status dot */}
                    <div className="relative shrink-0">
                        <img
                            key={user.avatar_url}
                            src={user.avatar_url}
                            alt={user.name}
                            className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl object-cover ring-2 ring-emerald-500/20 shadow-xs border border-surface-container bg-surface"
                        />
                        <span
                            className={`absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full ring-2 ring-white flex items-center justify-center ${
                                user.status === 'active'
                                    ? 'bg-emerald-500'
                                    : user.status === 'suspended'
                                    ? 'bg-rose-500'
                                    : 'bg-slate-400'
                            }`}
                            title={`Status: ${user.status}`}
                        >
                            {user.status === 'active' && (
                                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                            )}
                        </span>
                    </div>

                    {/* Basic Info */}
                    <div className="flex-1 min-w-0 space-y-1">
                        <div className="flex items-center gap-1.5">
                            <h4 className="font-heading text-base sm:text-lg font-bold text-on-surface tracking-tight truncate">
                                {user.name}
                            </h4>
                            {user.is_verified && (
                                <span
                                    className="material-symbols-outlined text-[17px] text-tertiary shrink-0"
                                    style={{ fontVariationSettings: "'FILL' 1" }}
                                    title="Email Terverifikasi"
                                >
                                    verified
                                </span>
                            )}
                        </div>

                        <div className="flex flex-wrap items-center gap-1.5">
                            <span className="inline-flex items-center text-[11px] font-mono text-outline bg-surface-container px-2 py-0.5 rounded-md border border-surface-container-high">
                                @{user.username || 'user'}
                            </span>

                            {/* Role Badge */}
                            <span
                                className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-md border ${roleInfo.classes}`}
                            >
                                <span className="material-symbols-outlined text-[13px]">
                                    {roleInfo.icon}
                                </span>
                                {roleInfo.label}
                            </span>

                            {/* Status Badge */}
                            <span
                                className={`inline-flex items-center gap-1.5 text-[11px] font-semibold px-2.5 py-0.5 rounded-md border ${
                                    user.status === 'active'
                                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                                        : user.status === 'suspended'
                                        ? 'bg-rose-50 text-rose-700 border-rose-200'
                                        : 'bg-slate-100 text-slate-700 border-slate-200'
                                }`}
                            >
                                <span
                                    className={`w-1.5 h-1.5 rounded-full ${
                                        user.status === 'active'
                                            ? 'bg-emerald-500'
                                            : user.status === 'suspended'
                                            ? 'bg-rose-500'
                                            : 'bg-slate-400'
                                    }`}
                                />
                                <span className="capitalize">{user.status}</span>
                            </span>
                        </div>
                    </div>
                </div>

                {/* 2. Bio / Catatan Profil */}
                <div className="p-3 rounded-xl bg-surface-container-low border border-surface-container">
                    <div className="flex items-center gap-1.5 mb-1.5 text-outline">
                        <span className="material-symbols-outlined text-[16px]">format_quote</span>
                        <span className="text-[10px] font-bold uppercase tracking-wider">
                            Bio & Profil Singkat
                        </span>
                    </div>
                    {user.bio ? (
                        <p className="text-xs text-on-surface leading-relaxed pl-2 border-l-2 border-primary/40 font-normal">
                            {user.bio}
                        </p>
                    ) : (
                        <p className="text-xs text-outline italic pl-2 border-l-2 border-surface-container-high">
                            Pengguna belum menuliskan deskripsi atau bio singkat.
                        </p>
                    )}
                </div>

                {/* 3. Detailed Attributes Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {/* Email Card */}
                    <div className="p-3 rounded-xl bg-surface-container-lowest border border-surface-container shadow-2xs flex flex-col justify-between space-y-1.5">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1.5">
                                <div className="w-6 h-6 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100">
                                    <span className="material-symbols-outlined text-[14px]">mail</span>
                                </div>
                                <span className="text-[10px] font-bold text-outline uppercase tracking-wider">
                                    Alamat Email
                                </span>
                            </div>
                            <button
                                type="button"
                                onClick={() => handleCopy(user.email, 'email')}
                                className="text-outline hover:text-primary transition-colors cursor-pointer p-0.5 rounded hover:bg-surface-container"
                                title="Salin Email"
                            >
                                <span className="material-symbols-outlined text-[14px]">
                                    {copiedField === 'email' ? 'check' : 'content_copy'}
                                </span>
                            </button>
                        </div>
                        <div>
                            <p className="text-xs font-semibold text-on-surface break-all">
                                {user.email}
                            </p>
                            <span
                                className={`inline-flex items-center gap-1 text-[10px] font-medium mt-0.5 ${
                                    user.is_verified ? 'text-emerald-600' : 'text-amber-600'
                                }`}
                            >
                                <span className="material-symbols-outlined text-[12px]">
                                    {user.is_verified ? 'check_circle' : 'pending'}
                                </span>
                                {user.is_verified ? 'Terverifikasi' : 'Belum Verifikasi'}
                            </span>
                        </div>
                    </div>

                    {/* WhatsApp / Telepon Card */}
                    <div className="p-3 rounded-xl bg-surface-container-lowest border border-surface-container shadow-2xs flex flex-col justify-between space-y-1.5">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1.5">
                                <div className="w-6 h-6 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100">
                                    <span className="material-symbols-outlined text-[14px]">call</span>
                                </div>
                                <span className="text-[10px] font-bold text-outline uppercase tracking-wider">
                                    WhatsApp / Telepon
                                </span>
                            </div>
                            {user.phone && (
                                <button
                                    type="button"
                                    onClick={() => handleCopy(user.phone || '', 'phone')}
                                    className="text-outline hover:text-primary transition-colors cursor-pointer p-0.5 rounded hover:bg-surface-container"
                                    title="Salin Nomor Telepon"
                                >
                                    <span className="material-symbols-outlined text-[14px]">
                                        {copiedField === 'phone' ? 'check' : 'content_copy'}
                                    </span>
                                </button>
                            )}
                        </div>
                        <div>
                            <p className="text-xs font-semibold text-on-surface">
                                {user.phone || 'Belum ditambahkan'}
                            </p>
                            {user.phone ? (
                                <a
                                    href={`https://wa.me/${user.phone.replace(/[^0-9]/g, '')}`}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="inline-flex items-center gap-1 text-[10px] font-medium text-emerald-600 hover:text-emerald-700 mt-0.5 cursor-pointer"
                                >
                                    <span className="material-symbols-outlined text-[12px]">chat</span>
                                    <span>Hubungi via WhatsApp</span>
                                </a>
                            ) : (
                                <span className="text-[10px] text-outline mt-0.5 block">
                                    Nomor belum diisi
                                </span>
                            )}
                        </div>
                    </div>

                    {/* Peran / Hak Akses Card */}
                    <div className="p-3 rounded-xl bg-surface-container-lowest border border-surface-container shadow-2xs flex flex-col justify-between space-y-1.5">
                        <div className="flex items-center gap-1.5">
                            <div className="w-6 h-6 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center border border-indigo-100">
                                <span className="material-symbols-outlined text-[14px]">
                                    shield_person
                                </span>
                            </div>
                            <span className="text-[10px] font-bold text-outline uppercase tracking-wider">
                                Hak Akses Sistem
                            </span>
                        </div>
                        <div>
                            <p className="text-xs font-semibold text-on-surface capitalize">
                                {roleInfo.label}
                            </p>
                            <span className="text-[10px] text-outline font-mono mt-0.5 block">
                                slug: {user.role?.slug || 'student'}
                            </span>
                        </div>
                    </div>

                    {/* Terdaftar Sejak Card */}
                    <div className="p-3 rounded-xl bg-surface-container-lowest border border-surface-container shadow-2xs flex flex-col justify-between space-y-1.5">
                        <div className="flex items-center gap-1.5">
                            <div className="w-6 h-6 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center border border-amber-100">
                                <span className="material-symbols-outlined text-[14px]">
                                    calendar_today
                                </span>
                            </div>
                            <span className="text-[10px] font-bold text-outline uppercase tracking-wider">
                                Tanggal Terdaftar
                            </span>
                        </div>
                        <div>
                            <p className="text-xs font-semibold text-on-surface">
                                {user.created_at || 'Baru saja'}
                            </p>
                            {user.created_at_human && (
                                <span className="text-[10px] text-outline mt-0.5 block">
                                    {user.created_at_human}
                                </span>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AppModal>
    );
}
