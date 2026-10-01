import { UserData, UserRole } from '@/types';
import { useForm } from '@inertiajs/react';
import { FormEventHandler, useEffect } from 'react';

interface UserFormModalProps {
    show: boolean;
    onClose: () => void;
    user?: UserData | null;
    roles: UserRole[];
}

export default function UserFormModal({
    show,
    onClose,
    user,
    roles,
}: UserFormModalProps) {
    const isEdit = !!user;

    const { data, setData, post, put, processing, errors, reset, clearErrors } = useForm({
        name: '',
        username: '',
        email: '',
        password: '',
        phone: '',
        bio: '',
        status: 'active',
        role: 'user',
        email_verified: true,
    });

    useEffect(() => {
        if (show) {
            clearErrors();
            if (user) {
                setData({
                    name: user.name || '',
                    username: user.username || '',
                    email: user.email || '',
                    password: '',
                    phone: user.phone || '',
                    bio: user.bio || '',
                    status: user.status || 'active',
                    role: user.role?.slug || user.role?.name || 'user',
                    email_verified: user.is_verified,
                });
            } else {
                reset();
                setData({
                    name: '',
                    username: '',
                    email: '',
                    password: '',
                    phone: '',
                    bio: '',
                    status: 'active',
                    role: 'user',
                    email_verified: true,
                });
            }
        }
    }, [show, user]);

    if (!show) return null;

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        if (isEdit && user) {
            put(route('pengguna.update', user.id), {
                onSuccess: () => {
                    onClose();
                    reset();
                },
            });
        } else {
            post(route('pengguna.store'), {
                onSuccess: () => {
                    onClose();
                    reset();
                },
            });
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
                onClick={onClose}
            />

            {/* Modal Card */}
            <div className="relative w-full max-w-2xl bg-surface-container-lowest rounded-2xl shadow-xl border border-surface-container overflow-hidden z-10 my-8">
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-surface-container bg-surface-container-lowest">
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-on-primary">
                            <span className="material-symbols-outlined text-[20px]">
                                {isEdit ? 'manage_accounts' : 'person_add'}
                            </span>
                        </div>
                        <div>
                            <h3 className="font-heading text-lg font-bold text-on-surface">
                                {isEdit ? 'Ubah Data Pengguna' : 'Tambah Pengguna Baru'}
                            </h3>
                            <p className="text-xs text-on-surface-variant">
                                {isEdit
                                    ? `Perbarui profil dan otorisasi akses ${user.name}`
                                    : 'Daftarkan pengguna baru ke dalam platform pembelajaran'}
                            </p>
                        </div>
                    </div>
                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded-lg p-1.5 text-outline hover:text-on-surface hover:bg-surface-container-high transition-colors"
                    >
                        <span className="material-symbols-outlined text-[20px]">close</span>
                    </button>
                </div>

                {/* Form Body */}
                <form onSubmit={handleSubmit}>
                    <div className="p-6 space-y-4 max-h-[calc(100vh-210px)] overflow-y-auto">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Full Name */}
                            <div>
                                <label className="block text-xs font-semibold uppercase tracking-wider text-outline mb-1.5">
                                    Nama Lengkap <span className="text-error">*</span>
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    placeholder="Contoh: Humaidi Zakaria"
                                    className="w-full px-3.5 py-2 text-sm rounded-lg bg-surface border border-surface-container-high text-on-surface placeholder:text-outline focus:outline-none focus:border-primary focus:bg-surface-container-lowest transition-all"
                                />
                                {errors.name && (
                                    <p className="mt-1 text-xs text-error font-medium">{errors.name}</p>
                                )}
                            </div>

                            {/* Username */}
                            <div>
                                <label className="block text-xs font-semibold uppercase tracking-wider text-outline mb-1.5">
                                    Username
                                </label>
                                <div className="relative flex items-center">
                                    <span className="absolute left-3 text-xs text-outline font-medium">@</span>
                                    <input
                                        type="text"
                                        value={data.username}
                                        onChange={(e) => setData('username', e.target.value)}
                                        placeholder="humaidi98"
                                        className="w-full pl-8 pr-3.5 py-2 text-sm rounded-lg bg-surface border border-surface-container-high text-on-surface placeholder:text-outline focus:outline-none focus:border-primary focus:bg-surface-container-lowest transition-all"
                                    />
                                </div>
                                {errors.username && (
                                    <p className="mt-1 text-xs text-error font-medium">{errors.username}</p>
                                )}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Email */}
                            <div>
                                <label className="block text-xs font-semibold uppercase tracking-wider text-outline mb-1.5">
                                    Alamat Email <span className="text-error">*</span>
                                </label>
                                <input
                                    type="email"
                                    required
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    placeholder="user@wpucourse.id"
                                    className="w-full px-3.5 py-2 text-sm rounded-lg bg-surface border border-surface-container-high text-on-surface placeholder:text-outline focus:outline-none focus:border-primary focus:bg-surface-container-lowest transition-all"
                                />
                                {errors.email && (
                                    <p className="mt-1 text-xs text-error font-medium">{errors.email}</p>
                                )}
                            </div>

                            {/* Phone */}
                            <div>
                                <label className="block text-xs font-semibold uppercase tracking-wider text-outline mb-1.5">
                                    Nomor WhatsApp / Telp
                                </label>
                                <input
                                    type="tel"
                                    value={data.phone}
                                    onChange={(e) => setData('phone', e.target.value)}
                                    placeholder="+62 812-3456-7890"
                                    className="w-full px-3.5 py-2 text-sm rounded-lg bg-surface border border-surface-container-high text-on-surface placeholder:text-outline focus:outline-none focus:border-primary focus:bg-surface-container-lowest transition-all"
                                />
                                {errors.phone && (
                                    <p className="mt-1 text-xs text-error font-medium">{errors.phone}</p>
                                )}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Password */}
                            <div>
                                <label className="block text-xs font-semibold uppercase tracking-wider text-outline mb-1.5">
                                    {isEdit ? 'Ubah Password (Kosongkan bila tidak diubah)' : 'Password Awal'}
                                </label>
                                <input
                                    type="password"
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                    placeholder={isEdit ? '••••••••' : 'Default: 123'}
                                    className="w-full px-3.5 py-2 text-sm rounded-lg bg-surface border border-surface-container-high text-on-surface placeholder:text-outline focus:outline-none focus:border-primary focus:bg-surface-container-lowest transition-all"
                                />
                                {errors.password && (
                                    <p className="mt-1 text-xs text-error font-medium">{errors.password}</p>
                                )}
                            </div>

                            {/* Role Selection */}
                            <div>
                                <label className="block text-xs font-semibold uppercase tracking-wider text-outline mb-1.5">
                                    Role / Peran Akses <span className="text-error">*</span>
                                </label>
                                <select
                                    value={data.role}
                                    onChange={(e) => setData('role', e.target.value)}
                                    className="w-full px-3.5 py-2 text-sm rounded-lg bg-surface border border-surface-container-high text-on-surface focus:outline-none focus:border-primary focus:bg-surface-container-lowest transition-all"
                                >
                                    {(Array.isArray(roles) ? roles : []).map((r) => (
                                        <option key={r.id || r.name} value={r.slug || r.name}>
                                            {r.name} ({r.slug || r.name})
                                        </option>
                                    ))}
                                </select>
                                {errors.role && (
                                    <p className="mt-1 text-xs text-error font-medium">{errors.role}</p>
                                )}
                            </div>
                        </div>

                        {/* Status & Verification */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
                            <div>
                                <label className="block text-xs font-semibold uppercase tracking-wider text-outline mb-1.5">
                                    Status Akun
                                </label>
                                <select
                                    value={data.status}
                                    onChange={(e) => setData('status', e.target.value)}
                                    className="w-full px-3.5 py-2 text-sm rounded-lg bg-surface border border-surface-container-high text-on-surface focus:outline-none focus:border-primary focus:bg-surface-container-lowest transition-all"
                                >
                                    <option value="active">Aktif</option>
                                    <option value="inactive">Nonaktif</option>
                                    <option value="suspended">Ditangguhkan (Suspended)</option>
                                </select>
                            </div>

                            <div className="flex items-center pt-6">
                                <label className="inline-flex items-center gap-2 cursor-pointer select-none">
                                    <input
                                        type="checkbox"
                                        checked={data.email_verified}
                                        onChange={(e) => setData('email_verified', e.target.checked)}
                                        className="h-4 w-4 rounded text-primary accent-primary cursor-pointer"
                                    />
                                    <span className="text-xs font-medium text-on-surface">
                                        Tandai Email Terverifikasi Langsung
                                    </span>
                                </label>
                            </div>
                        </div>

                        {/* Bio / Catatan */}
                        <div>
                            <label className="block text-xs font-semibold uppercase tracking-wider text-outline mb-1.5">
                                Bio / Keterangan Profil
                            </label>
                            <textarea
                                rows={2}
                                value={data.bio}
                                onChange={(e) => setData('bio', e.target.value)}
                                placeholder="Tuliskan catatan singkat atau keahlian pengguna..."
                                className="w-full px-3.5 py-2 text-sm rounded-lg bg-surface border border-surface-container-high text-on-surface placeholder:text-outline focus:outline-none focus:border-primary focus:bg-surface-container-lowest transition-all"
                            />
                        </div>
                    </div>

                    {/* Footer Actions */}
                    <div className="flex items-center justify-end gap-3 px-6 py-4 bg-surface-container-low border-t border-surface-container">
                        <button
                            type="button"
                            onClick={onClose}
                            disabled={processing}
                            className="px-4 py-2 text-xs font-semibold rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface transition-colors"
                        >
                            Batal
                        </button>
                        <button
                            type="submit"
                            disabled={processing}
                            className="inline-flex items-center gap-2 px-5 py-2 text-xs font-semibold rounded-lg bg-primary hover:bg-primary-container text-on-primary transition-all shadow-sm disabled:opacity-60"
                        >
                            {processing && (
                                <svg
                                    className="animate-spin h-4 w-4 text-white"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                    ></circle>
                                    <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                    ></path>
                                </svg>
                            )}
                            <span>{processing ? 'Menyimpan...' : isEdit ? 'Simpan Perubahan' : 'Tambah Pengguna'}</span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
