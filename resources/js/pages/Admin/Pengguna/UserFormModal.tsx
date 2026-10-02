import AppModal from '@/components/AppModal';
import AppToast from '@/components/AppToast';
import { UserData, UserRole } from '@/types';
import { router, useForm } from '@inertiajs/react';
import { ChangeEvent, FormEventHandler, useEffect, useRef, useState } from 'react';

interface UserFormModalProps {
    show: boolean;
    onClose: () => void;
    user?: UserData | null;
    roles: UserRole[];
    onSuccess?: (updatedData?: Partial<UserData>) => void;
}

export default function UserFormModal({
    show,
    onClose,
    user,
    roles,
    onSuccess,
}: UserFormModalProps) {
    const isEdit = !!user;
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [modalToast, setModalToast] = useState<{
        show: boolean;
        type: 'success' | 'danger';
        title: string;
        message: string;
    }>({
        show: false,
        type: 'success',
        title: '',
        message: '',
    });

    const { data, setData, post, processing, errors, reset, clearErrors, setError } = useForm<{
        name: string;
        username: string;
        email: string;
        password: string;
        phone: string;
        bio: string;
        status: string;
        role: string;
        email_verified: boolean;
        avatar: File | null;
        _method?: string;
    }>({
        name: '',
        username: '',
        email: '',
        password: '',
        phone: '',
        bio: '',
        status: 'active',
        role: 'student',
        email_verified: true,
        avatar: null,
    });

    useEffect(() => {
        if (show) {
            clearErrors();
            setIsSubmitting(false);
            setModalToast((prev) => ({ ...prev, show: false }));
            const defaultRoleSlug = roles?.[0]?.slug || 'student';
            if (user) {
                setData({
                    name: user.name || '',
                    username: user.username || '',
                    email: user.email || '',
                    password: '',
                    phone: user.phone || '',
                    bio: user.bio || '',
                    status: user.status || 'active',
                    role: user.role?.slug || user.role?.name || defaultRoleSlug,
                    email_verified: user.is_verified,
                    avatar: null,
                });
                setPreviewUrl(user.avatar_url || null);
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
                    role: defaultRoleSlug,
                    email_verified: true,
                    avatar: null,
                });
                setPreviewUrl(null);
            }
        } else {
            if (previewUrl && previewUrl.startsWith('blob:')) {
                URL.revokeObjectURL(previewUrl);
            }
            setPreviewUrl(null);
            setIsSubmitting(false);
            setModalToast((prev) => ({ ...prev, show: false }));
        }
    }, [show, user]);

    if (!show) return null;

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (errors.avatar) clearErrors('avatar');
            setData('avatar', file);
            if (previewUrl && previewUrl.startsWith('blob:')) {
                URL.revokeObjectURL(previewUrl);
            }
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const handleRemoveAvatar = () => {
        if (errors.avatar) clearErrors('avatar');
        setData('avatar', null);
        if (previewUrl && previewUrl.startsWith('blob:')) {
            URL.revokeObjectURL(previewUrl);
        }
        setPreviewUrl(user?.avatar_url || null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        if (isEdit && user) {
            router.post(
                route('pengguna.update', user.id),
                {
                    _method: 'put',
                    name: data.name,
                    username: data.username,
                    email: data.email,
                    password: data.password,
                    phone: data.phone,
                    bio: data.bio,
                    status: data.status,
                    role: data.role,
                    email_verified: data.email_verified,
                    avatar: data.avatar,
                },
                {
                    forceFormData: true,
                    preserveScroll: true,
                    onSuccess: () => {
                        setIsSubmitting(false);
                        const matchedRole = roles.find((r) => r.slug === data.role || r.name === data.role);
                        const newAvatarUrl = previewUrl || (user?.avatar_url ? `${user.avatar_url.split('?')[0]}?v=${Date.now()}` : undefined);
                        onSuccess?.({
                            id: user.id,
                            name: data.name,
                            username: data.username,
                            email: data.email,
                            phone: data.phone,
                            bio: data.bio,
                            status: data.status,
                            avatar_url: newAvatarUrl,
                            role: matchedRole ? { name: matchedRole.name, slug: matchedRole.slug } : user.role,
                            is_verified: data.email_verified,
                        });
                        onClose();
                        reset();
                    },
                    onError: (err) => {
                        setIsSubmitting(false);
                        if (err && typeof err === 'object') {
                            setError(err);
                        }
                        const firstErrorKey = Object.keys(err)[0];
                        const firstErrorMsg = firstErrorKey
                            ? err[firstErrorKey]
                            : 'Gagal memperbarui data pengguna. Periksa kembali form.';

                        setModalToast({
                            show: true,
                            type: 'danger',
                            title: 'Gagal Menyimpan Data',
                            message: String(firstErrorMsg),
                        });
                    },
                }
            );
        } else {
            post(route('pengguna.store'), {
                forceFormData: true,
                preserveScroll: true,
                onSuccess: () => {
                    setIsSubmitting(false);
                    onSuccess?.();
                    onClose();
                    reset();
                },
                onError: (err) => {
                    setIsSubmitting(false);
                    if (err && typeof err === 'object') {
                        setError(err);
                    }
                    const firstErrorKey = Object.keys(err)[0];
                    const firstErrorMsg = firstErrorKey
                        ? err[firstErrorKey]
                        : 'Gagal menambahkan pengguna baru. Periksa kembali isian form.';

                    setModalToast({
                        show: true,
                        type: 'danger',
                        title: 'Gagal Menyimpan Data',
                        message: String(firstErrorMsg),
                    });
                },
            });
        }
    };

    const isBusy = processing || isSubmitting;

    return (
        <>
            <AppToast
                show={modalToast.show}
                type={modalToast.type}
                title={modalToast.title}
                message={modalToast.message}
                onClose={() => setModalToast((prev) => ({ ...prev, show: false }))}
            />

            <AppModal
                show={show}
                onClose={onClose}
                title={isEdit ? 'Ubah Data Pengguna' : 'Tambah Pengguna Baru'}
                description={
                    isEdit
                        ? `Perbarui profil, informasi kontak, dan hak akses ${user?.name || ''}`
                        : 'Daftarkan akun pengguna baru ke dalam platform pembelajaran'
                }
                icon={isEdit ? 'manage_accounts' : 'person_add'}
                headerVariant="primary"
                maxWidth="2xl"
            >
            <form onSubmit={handleSubmit} className="flex flex-col">
                <div className="p-6 space-y-4 max-h-[calc(100vh-250px)] overflow-y-auto">
                    {/* Avatar Upload with Live Preview */}
                    <div className={`p-4 rounded-2xl bg-surface-container-low border transition-all flex flex-col sm:flex-row items-center gap-4 ${
                        errors.avatar ? 'border-rose-500 ring-2 ring-rose-500/20 bg-rose-50/20' : 'border-surface-container'
                    }`}>
                        <div className="relative group shrink-0">
                            <div className={`w-20 h-20 rounded-2xl overflow-hidden border-2 bg-surface shadow-sm flex items-center justify-center transition-all ${
                                errors.avatar ? 'border-rose-500 ring-2 ring-rose-500/20' : 'border-primary/20'
                            }`}>
                                {previewUrl ? (
                                    <img
                                        src={previewUrl}
                                        alt={data.name || 'Avatar Preview'}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full flex flex-col items-center justify-center bg-primary/10 text-primary">
                                        <span className="material-symbols-outlined text-3xl">
                                            account_circle
                                        </span>
                                    </div>
                                )}
                            </div>
                            {data.avatar && (
                                <span className="absolute -bottom-1 -right-1 px-1.5 py-0.5 text-[9px] font-bold rounded-md bg-emerald-600 text-white shadow-xs">
                                    WEBP
                                </span>
                            )}
                        </div>

                        <div className="flex-1 text-center sm:text-left min-w-0">
                            <label className={`block text-xs font-bold uppercase tracking-wider mb-1 ${
                                errors.avatar ? 'text-rose-600' : 'text-on-surface'
                            }`}>
                                Foto Profil / Avatar
                            </label>
                            <p className="text-xs text-outline mb-2.5">
                                Format PNG, JPG, JPEG, WEBP. Gambar otomatis dikonversi ke WebP untuk ukuran minimal tanpa penurunan kualitas.
                            </p>

                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/png,image/jpeg,image/jpg,image/webp"
                                onChange={handleFileChange}
                                className="hidden"
                            />

                            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                                <button
                                    type="button"
                                    onClick={() => fileInputRef.current?.click()}
                                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-surface border hover:bg-surface-container transition-colors cursor-pointer ${
                                        errors.avatar ? 'border-rose-400 text-rose-700' : 'border-outline/30 text-on-surface'
                                    }`}
                                >
                                    <span className={`material-symbols-outlined text-[16px] ${
                                        errors.avatar ? 'text-rose-600' : 'text-primary'
                                    }`}>
                                        upload_file
                                    </span>
                                    {data.avatar ? 'Ganti Foto' : 'Pilih Foto'}
                                </button>

                                {data.avatar && (
                                    <button
                                        type="button"
                                        onClick={handleRemoveAvatar}
                                        className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium rounded-lg bg-rose-50 text-rose-700 hover:bg-rose-100 transition-colors cursor-pointer"
                                    >
                                        <span className="material-symbols-outlined text-[15px]">
                                            delete
                                        </span>
                                        Batal Unggah
                                    </button>
                                )}
                            </div>
                            {errors.avatar && (
                                <p className="mt-1.5 text-xs text-rose-600 font-medium flex items-center justify-center sm:justify-start gap-1">
                                    <span className="material-symbols-outlined text-[14px]">error</span>
                                    {errors.avatar}
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Full Name */}
                        <div>
                            <label className={`block text-xs font-semibold uppercase tracking-wider mb-1.5 ${
                                errors.name ? 'text-rose-600 font-bold' : 'text-outline'
                            }`}>
                                Nama Lengkap <span className="text-error">*</span>
                            </label>
                            <input
                                type="text"
                                required
                                value={data.name}
                                onChange={(e) => {
                                    setData('name', e.target.value);
                                    if (errors.name) clearErrors('name');
                                }}
                                placeholder="Contoh: Humaidi Zakaria"
                                className={`w-full px-3.5 py-2 text-sm rounded-lg bg-surface text-on-surface placeholder:text-outline focus:outline-none transition-all ${
                                    errors.name
                                        ? 'border-2 border-rose-500 ring-2 ring-rose-500/20 focus:border-rose-600 focus:ring-rose-500/30'
                                        : 'border border-surface-container-high focus:border-primary focus:bg-surface-container-lowest'
                                }`}
                            />
                            {errors.name && (
                                <p className="mt-1.5 text-xs text-rose-600 font-medium flex items-center gap-1">
                                    <span className="material-symbols-outlined text-[14px]">error</span>
                                    {errors.name}
                                </p>
                            )}
                        </div>

                        {/* Username */}
                        <div>
                            <label className={`block text-xs font-semibold uppercase tracking-wider mb-1.5 ${
                                errors.username ? 'text-rose-600 font-bold' : 'text-outline'
                            }`}>
                                Username
                            </label>
                            <div className="relative flex items-center">
                                <span className={`absolute left-3 text-xs font-medium ${
                                    errors.username ? 'text-rose-500 font-bold' : 'text-outline'
                                }`}>@</span>
                                <input
                                    type="text"
                                    value={data.username}
                                    onChange={(e) => {
                                        setData('username', e.target.value);
                                        if (errors.username) clearErrors('username');
                                    }}
                                    placeholder="humaidi98"
                                    className={`w-full pl-8 pr-3.5 py-2 text-sm rounded-lg bg-surface text-on-surface placeholder:text-outline focus:outline-none transition-all ${
                                        errors.username
                                            ? 'border-2 border-rose-500 ring-2 ring-rose-500/20 focus:border-rose-600 focus:ring-rose-500/30'
                                            : 'border border-surface-container-high focus:border-primary focus:bg-surface-container-lowest'
                                    }`}
                                />
                            </div>
                            {errors.username && (
                                <p className="mt-1.5 text-xs text-rose-600 font-medium flex items-center gap-1">
                                    <span className="material-symbols-outlined text-[14px]">error</span>
                                    {errors.username}
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Email */}
                        <div>
                            <label className={`block text-xs font-semibold uppercase tracking-wider mb-1.5 ${
                                errors.email ? 'text-rose-600 font-bold' : 'text-outline'
                            }`}>
                                Alamat Email <span className="text-error">*</span>
                            </label>
                            <input
                                type="email"
                                required
                                value={data.email}
                                onChange={(e) => {
                                    setData('email', e.target.value);
                                    if (errors.email) clearErrors('email');
                                }}
                                placeholder="user@wpucourse.id"
                                className={`w-full px-3.5 py-2 text-sm rounded-lg bg-surface text-on-surface placeholder:text-outline focus:outline-none transition-all ${
                                    errors.email
                                        ? 'border-2 border-rose-500 ring-2 ring-rose-500/20 focus:border-rose-600 focus:ring-rose-500/30'
                                        : 'border border-surface-container-high focus:border-primary focus:bg-surface-container-lowest'
                                }`}
                            />
                            {errors.email && (
                                <p className="mt-1.5 text-xs text-rose-600 font-medium flex items-center gap-1">
                                    <span className="material-symbols-outlined text-[14px]">error</span>
                                    {errors.email}
                                </p>
                            )}
                        </div>

                        {/* Phone */}
                        <div>
                            <label className={`block text-xs font-semibold uppercase tracking-wider mb-1.5 ${
                                errors.phone ? 'text-rose-600 font-bold' : 'text-outline'
                            }`}>
                                Nomor WhatsApp / Telp
                            </label>
                            <input
                                type="tel"
                                value={data.phone}
                                onChange={(e) => {
                                    setData('phone', e.target.value);
                                    if (errors.phone) clearErrors('phone');
                                }}
                                placeholder="+62 812-3456-7890"
                                className={`w-full px-3.5 py-2 text-sm rounded-lg bg-surface text-on-surface placeholder:text-outline focus:outline-none transition-all ${
                                    errors.phone
                                        ? 'border-2 border-rose-500 ring-2 ring-rose-500/20 focus:border-rose-600 focus:ring-rose-500/30'
                                        : 'border border-surface-container-high focus:border-primary focus:bg-surface-container-lowest'
                                }`}
                            />
                            {errors.phone && (
                                <p className="mt-1.5 text-xs text-rose-600 font-medium flex items-center gap-1">
                                    <span className="material-symbols-outlined text-[14px]">error</span>
                                    {errors.phone}
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Password */}
                        <div>
                            <label className={`block text-xs font-semibold uppercase tracking-wider mb-1.5 ${
                                errors.password ? 'text-rose-600 font-bold' : 'text-outline'
                            }`}>
                                {isEdit ? 'Ubah Password (Kosongkan bila tidak diubah)' : 'Password Awal'}
                            </label>
                            <input
                                type="password"
                                value={data.password}
                                onChange={(e) => {
                                    setData('password', e.target.value);
                                    if (errors.password) clearErrors('password');
                                }}
                                placeholder={isEdit ? '••••••••' : 'Default: 123'}
                                className={`w-full px-3.5 py-2 text-sm rounded-lg bg-surface text-on-surface placeholder:text-outline focus:outline-none transition-all ${
                                    errors.password
                                        ? 'border-2 border-rose-500 ring-2 ring-rose-500/20 focus:border-rose-600 focus:ring-rose-500/30'
                                        : 'border border-surface-container-high focus:border-primary focus:bg-surface-container-lowest'
                                }`}
                            />
                            {errors.password && (
                                <p className="mt-1.5 text-xs text-rose-600 font-medium flex items-center gap-1">
                                    <span className="material-symbols-outlined text-[14px]">error</span>
                                    {errors.password}
                                </p>
                            )}
                        </div>

                        {/* Role Selection */}
                        <div>
                            <label className={`block text-xs font-semibold uppercase tracking-wider mb-1.5 ${
                                errors.role ? 'text-rose-600 font-bold' : 'text-outline'
                            }`}>
                                Role / Peran Akses <span className="text-error">*</span>
                            </label>
                            <select
                                value={data.role}
                                onChange={(e) => {
                                    setData('role', e.target.value);
                                    if (errors.role) clearErrors('role');
                                }}
                                className={`w-full px-3.5 py-2 text-sm rounded-lg bg-surface text-on-surface focus:outline-none transition-all ${
                                    errors.role
                                        ? 'border-2 border-rose-500 ring-2 ring-rose-500/20 focus:border-rose-600'
                                        : 'border border-surface-container-high focus:border-primary focus:bg-surface-container-lowest'
                                }`}
                            >
                                {(Array.isArray(roles) ? roles : []).map((r) => (
                                    <option key={r.id || r.name} value={r.slug || r.name}>
                                        {r.name} ({r.slug || r.name})
                                    </option>
                                ))}
                            </select>
                            {errors.role && (
                                <p className="mt-1.5 text-xs text-rose-600 font-medium flex items-center gap-1">
                                    <span className="material-symbols-outlined text-[14px]">error</span>
                                    {errors.role}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Status Akun - Custom Interactive Radio Cards */}
                    <div className="pt-1">
                        <label className={`block text-xs font-semibold uppercase tracking-wider mb-2 ${
                            errors.status ? 'text-rose-600 font-bold' : 'text-outline'
                        }`}>
                            Status Akun
                        </label>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                            {/* Option 1: Aktif */}
                            <label
                                className={`relative flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all duration-200 select-none ${
                                    data.status === 'active'
                                        ? 'bg-emerald-50/80 border-emerald-500 shadow-xs ring-1 ring-emerald-500/20'
                                        : 'bg-surface border-surface-container-high hover:border-outline/40 hover:bg-surface-container/50'
                                }`}
                            >
                                <input
                                    type="radio"
                                    name="status"
                                    value="active"
                                    checked={data.status === 'active'}
                                    onChange={() => setData('status', 'active')}
                                    className="sr-only"
                                />
                                <div
                                    className={`w-4 h-4 rounded-full border flex items-center justify-center transition-all ${
                                        data.status === 'active'
                                            ? 'border-emerald-600 bg-emerald-600'
                                            : 'border-outline bg-transparent'
                                    }`}
                                >
                                    {data.status === 'active' && (
                                        <div className="w-1.5 h-1.5 rounded-full bg-white" />
                                    )}
                                </div>
                                <div className="flex flex-col min-w-0">
                                    <div className="flex items-center gap-1.5">
                                        <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                                        <span
                                            className={`text-xs font-semibold ${
                                                data.status === 'active'
                                                    ? 'text-emerald-950 font-bold'
                                                    : 'text-on-surface'
                                            }`}
                                        >
                                            Aktif
                                        </span>
                                    </div>
                                    <span className="text-[11px] text-outline mt-0.5 truncate">
                                        Dapat login & akses sistem
                                    </span>
                                </div>
                            </label>

                            {/* Option 2: Nonaktif */}
                            <label
                                className={`relative flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all duration-200 select-none ${
                                    data.status === 'inactive'
                                        ? 'bg-slate-100 border-slate-500 shadow-xs ring-1 ring-slate-500/20'
                                        : 'bg-surface border-surface-container-high hover:border-outline/40 hover:bg-surface-container/50'
                                }`}
                            >
                                <input
                                    type="radio"
                                    name="status"
                                    value="inactive"
                                    checked={data.status === 'inactive'}
                                    onChange={() => setData('status', 'inactive')}
                                    className="sr-only"
                                />
                                <div
                                    className={`w-4 h-4 rounded-full border flex items-center justify-center transition-all ${
                                        data.status === 'inactive'
                                            ? 'border-slate-600 bg-slate-600'
                                            : 'border-outline bg-transparent'
                                    }`}
                                >
                                    {data.status === 'inactive' && (
                                        <div className="w-1.5 h-1.5 rounded-full bg-white" />
                                    )}
                                </div>
                                <div className="flex flex-col min-w-0">
                                    <div className="flex items-center gap-1.5">
                                        <span className="w-2 h-2 rounded-full bg-slate-400"></span>
                                        <span
                                            className={`text-xs font-semibold ${
                                                data.status === 'inactive'
                                                    ? 'text-slate-900 font-bold'
                                                    : 'text-on-surface'
                                            }`}
                                        >
                                            Nonaktif
                                        </span>
                                    </div>
                                    <span className="text-[11px] text-outline mt-0.5 truncate">
                                        Akun belum aktif
                                    </span>
                                </div>
                            </label>

                            {/* Option 3: Ditangguhkan (Suspended) */}
                            <label
                                className={`relative flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all duration-200 select-none ${
                                    data.status === 'suspended'
                                        ? 'bg-slate-100 border-slate-500 shadow-xs ring-1 ring-slate-500/20'
                                        : 'bg-surface border-surface-container-high hover:border-outline/40 hover:bg-surface-container/50'
                                }`}
                            >
                                <input
                                    type="radio"
                                    name="status"
                                    value="suspended"
                                    checked={data.status === 'suspended'}
                                    onChange={() => setData('status', 'suspended')}
                                    className="sr-only"
                                />
                                <div
                                    className={`w-4 h-4 rounded-full border flex items-center justify-center transition-all ${
                                        data.status === 'suspended'
                                            ? 'border-slate-600 bg-slate-600'
                                            : 'border-outline bg-transparent'
                                    }`}
                                >
                                    {data.status === 'suspended' && (
                                        <div className="w-1.5 h-1.5 rounded-full bg-white" />
                                    )}
                                </div>
                                <div className="flex flex-col min-w-0">
                                    <div className="flex items-center gap-1.5">
                                        <span className="w-2 h-2 rounded-full bg-slate-400"></span>
                                        <span
                                            className={`text-xs font-semibold ${
                                                data.status === 'suspended'
                                                    ? 'text-slate-900 font-bold'
                                                    : 'text-on-surface'
                                            }`}
                                        >
                                            Ditangguhkan
                                        </span>
                                    </div>
                                    <span className="text-[11px] text-outline mt-0.5 truncate">
                                        Akses sementara diblokir
                                    </span>
                                </div>
                            </label>
                        </div>
                        {errors.status && (
                            <p className="mt-1.5 text-xs text-rose-600 font-medium flex items-center gap-1">
                                <span className="material-symbols-outlined text-[14px]">error</span>
                                {errors.status}
                            </p>
                        )}
                    </div>

                    {/* Email Verification Checkbox */}
                    <div className="pt-1">
                        <label className="inline-flex items-center gap-2.5 p-2 rounded-lg hover:bg-surface-container/40 transition-colors cursor-pointer select-none">
                            <input
                                type="checkbox"
                                checked={data.email_verified}
                                onChange={(e) => setData('email_verified', e.target.checked)}
                                className="h-4 w-4 rounded text-primary accent-primary cursor-pointer"
                            />
                            <div className="flex items-center gap-1.5 text-xs text-on-surface">
                                <span className="material-symbols-outlined text-[17px] text-primary">
                                    verified
                                </span>
                                <span className="font-medium">
                                    Tandai Email Terverifikasi Langsung
                                </span>
                            </div>
                        </label>
                    </div>

                    {/* Bio / Catatan */}
                    <div>
                        <label className={`block text-xs font-semibold uppercase tracking-wider mb-1.5 ${
                            errors.bio ? 'text-rose-600 font-bold' : 'text-outline'
                        }`}>
                            Bio / Keterangan Profil
                        </label>
                        <textarea
                            rows={2}
                            value={data.bio}
                            onChange={(e) => {
                                setData('bio', e.target.value);
                                if (errors.bio) clearErrors('bio');
                            }}
                            placeholder="Tuliskan catatan singkat atau keahlian pengguna..."
                            className={`w-full px-3.5 py-2 text-sm rounded-lg bg-surface text-on-surface placeholder:text-outline focus:outline-none transition-all ${
                                errors.bio
                                    ? 'border-2 border-rose-500 ring-2 ring-rose-500/20 focus:border-rose-600 focus:ring-rose-500/30'
                                    : 'border border-surface-container-high focus:border-primary focus:bg-surface-container-lowest'
                            }`}
                        />
                        {errors.bio && (
                            <p className="mt-1.5 text-xs text-rose-600 font-medium flex items-center gap-1">
                                <span className="material-symbols-outlined text-[14px]">error</span>
                                {errors.bio}
                            </p>
                        )}
                    </div>
                </div>

                {/* Footer Actions */}
                    <div className="flex items-center justify-end gap-3 px-6 py-4 bg-surface-container-low border-t border-surface-container">
                        <button
                            type="button"
                            onClick={onClose}
                            disabled={isBusy}
                            className="px-4 py-2 text-xs font-semibold rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface transition-colors disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
                        >
                            Batal
                        </button>
                        <button
                            type="submit"
                            disabled={isBusy}
                            className="inline-flex items-center gap-2 px-5 py-2 text-xs font-semibold rounded-lg bg-primary hover:bg-primary-container text-on-primary transition-all shadow-sm disabled:opacity-60 cursor-pointer disabled:cursor-not-allowed"
                        >
                            {isBusy && (
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
                            <span>{isBusy ? 'Sedang proses...' : isEdit ? 'Simpan Perubahan' : 'Tambah Pengguna'}</span>
                        </button>
                    </div>
                </form>
            </AppModal>
        </>
    );
}
