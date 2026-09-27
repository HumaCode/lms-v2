import { useState, FormEventHandler } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Login({
    status,
    canResetPassword,
}: {
    status?: string;
    canResetPassword?: boolean;
}) {
    const [showPassword, setShowPassword] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        username: '',
        password: '',
        remember: false as boolean,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <div className="bg-slate-50 font-sans text-slate-800 antialiased min-h-screen selection:bg-teal-500 selection:text-white">
            <Head title="Masuk - HC Course" />

            {/* Main Container */}
            <main className="min-h-screen flex flex-col lg:flex-row p-3 md:p-6 lg:p-8 max-w-[1600px] mx-auto gap-6 lg:gap-8 justify-between items-stretch">
                {/* Left Auth Column */}
                <div className="flex-1 flex flex-col justify-between max-w-xl mx-auto w-full py-4 px-2 sm:px-6">
                    {/* Top Section */}
                    <div>
                        {/* Brand Logo & Back Navigation */}
                        <div className="flex items-center justify-between mb-8">
                            <Link
                                href="/"
                                className="inline-flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-teal-500 rounded-lg p-1"
                                title="Kembali ke Beranda"
                            >
                                <div className="w-11 h-11 rounded-xl bg-teal-600 flex items-center justify-center text-white shadow-md shadow-teal-600/20 group-hover:scale-105 transition-transform duration-200">
                                    <span className="font-bold text-base tracking-tight select-none font-sans">
                                        HC
                                    </span>
                                </div>
                                <div>
                                    <span className="text-xl font-extrabold tracking-tight text-slate-900 flex items-center gap-1">
                                        HC <span className="text-teal-600 font-bold">Course</span>
                                    </span>
                                    <span className="text-[10px] font-semibold text-slate-400 tracking-wider uppercase block">
                                        LMS Platform
                                    </span>
                                </div>
                            </Link>

                            <Link
                                href="/"
                                className="text-xs font-semibold text-slate-500 hover:text-teal-700 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-full transition-all inline-flex items-center gap-1.5"
                            >
                                <span className="material-symbols-outlined text-[16px]">
                                    arrow_back
                                </span>
                                <span>Kembali</span>
                            </Link>
                        </div>

                        {/* Heading Group */}
                        <div className="mb-8">
                            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                                Masuk
                            </h1>
                            <p className="text-slate-500 text-sm sm:text-base mt-2 font-medium">
                                Selamat datang di platform HC Course. Belajar coding terstruktur dan modern.
                            </p>
                        </div>

                        {/* Status Flash Alert */}
                        {status && (
                            <div className="mb-5 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-sm font-semibold text-emerald-800 flex items-center gap-2">
                                <span className="material-symbols-outlined text-emerald-600 text-lg">
                                    check_circle
                                </span>
                                <span>{status}</span>
                            </div>
                        )}

                        {/* Login Form */}
                        <form onSubmit={submit} className="space-y-4" id="loginForm">
                            {/* Username Input Group */}
                            <div>
                                <label
                                    className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5"
                                    htmlFor="username"
                                >
                                    Username
                                </label>
                                <div className="relative rounded-xl shadow-xs">
                                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                                        <span className="material-symbols-outlined text-lg">
                                            person
                                        </span>
                                    </div>
                                    <input
                                        id="username"
                                        type="text"
                                        name="username"
                                        value={data.username}
                                        autoComplete="username"
                                        autoFocus
                                        required
                                        placeholder="Masukkan username akun Anda"
                                        onChange={(e) => setData('username', e.target.value)}
                                        className={`block w-full pl-10 pr-4 py-3 bg-white border ${
                                            errors.username ? 'border-rose-400 focus:ring-rose-500/20' : 'border-slate-200 focus:ring-teal-500/20 focus:border-teal-600'
                                        } rounded-xl text-slate-900 text-sm placeholder-slate-400 focus:outline-none focus:ring-2 transition-all`}
                                    />
                                </div>
                                {errors.username && (
                                    <p className="mt-1.5 text-xs font-medium text-rose-600 flex items-center gap-1">
                                        <span className="material-symbols-outlined text-sm">error</span>
                                        <span>{errors.username}</span>
                                    </p>
                                )}
                            </div>

                            {/* Password Input Group */}
                            <div>
                                <div className="flex items-center justify-between mb-1.5">
                                    <label
                                        className="block text-xs font-bold text-slate-700 uppercase tracking-wider"
                                        htmlFor="password"
                                    >
                                        Password
                                    </label>
                                </div>
                                <div className="relative rounded-xl shadow-xs">
                                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                                        <span className="material-symbols-outlined text-lg">
                                            lock
                                        </span>
                                    </div>
                                    <input
                                        id="password"
                                        type={showPassword ? 'text' : 'password'}
                                        name="password"
                                        value={data.password}
                                        autoComplete="current-password"
                                        required
                                        placeholder="Masukkan kata sandi akun Anda"
                                        onChange={(e) => setData('password', e.target.value)}
                                        className={`block w-full pl-10 pr-11 py-3 bg-white border ${
                                            errors.password ? 'border-rose-400 focus:ring-rose-500/20' : 'border-slate-200 focus:ring-teal-500/20 focus:border-teal-600'
                                        } rounded-xl text-slate-900 text-sm placeholder-slate-400 focus:outline-none focus:ring-2 transition-all`}
                                    />
                                    {/* Show/Hide Password Toggle */}
                                    <button
                                        type="button"
                                        aria-label="Tampilkan atau sembunyikan password"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 focus:outline-none"
                                    >
                                        <span className="material-symbols-outlined text-lg">
                                            {showPassword ? 'visibility_off' : 'visibility'}
                                        </span>
                                    </button>
                                </div>
                                {errors.password && (
                                    <p className="mt-1.5 text-xs font-medium text-rose-600 flex items-center gap-1">
                                        <span className="material-symbols-outlined text-sm">error</span>
                                        <span>{errors.password}</span>
                                    </p>
                                )}
                            </div>

                            {/* Remember me & Helper Links */}
                            <div className="flex items-center justify-between text-xs pt-0.5">
                                <label className="flex items-center gap-2 cursor-pointer select-none text-slate-600 font-medium">
                                    <input
                                        type="checkbox"
                                        name="remember"
                                        checked={data.remember}
                                        onChange={(e) => setData('remember', e.target.checked)}
                                        className="rounded border-slate-300 text-teal-600 focus:ring-teal-500 w-4 h-4 cursor-pointer"
                                    />
                                    <span>Ingat saya</span>
                                </label>

                                <div className="text-slate-500 font-medium">
                                    {canResetPassword !== false && (
                                        <Link
                                            href={route('password.request')}
                                            className="font-semibold text-teal-600 hover:text-teal-800 hover:underline"
                                        >
                                            Lupa password?
                                        </Link>
                                    )}
                                </div>
                            </div>

                            {/* Submit Button */}
                            <div className="pt-2">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="w-full py-3.5 px-4 bg-teal-600 hover:bg-teal-700 active:bg-teal-800 disabled:opacity-70 text-white font-bold text-sm sm:text-base rounded-xl shadow-md shadow-teal-600/25 hover:shadow-lg hover:shadow-teal-600/30 active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer"
                                >
                                    <span>{processing ? 'Memproses...' : 'Masuk'}</span>
                                    <span className="material-symbols-outlined text-base">
                                        arrow_forward
                                    </span>
                                </button>
                            </div>

                            {/* Registration Switch Link */}
                            <div className="text-center pt-2 pb-3">
                                <p className="text-sm font-medium text-slate-600">
                                    Kamu belum memiliki akun?{' '}
                                    <Link
                                        href={route('register')}
                                        className="font-bold text-teal-600 hover:text-teal-800 hover:underline"
                                    >
                                        Registrasi Sekarang
                                    </Link>
                                </p>
                            </div>
                        </form>

                        {/* Info Alert Cards */}
                        <div className="mt-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 p-4 sm:p-5 space-y-4">
                            {/* Item 1: Activation Inquiry */}
                            <div className="flex items-start gap-3">
                                <div className="w-6 h-6 rounded-full bg-amber-200/80 text-amber-800 flex items-center justify-center shrink-0 mt-0.5">
                                    <span className="material-symbols-outlined text-xs">
                                        mark_email_read
                                    </span>
                                </div>
                                <div>
                                    <h2 className="text-xs sm:text-sm font-bold text-amber-900 leading-snug">
                                        Sudah registrasi tapi tidak bisa login?
                                    </h2>
                                    <p className="text-xs text-amber-800/90 leading-relaxed mt-1">
                                        Cek email untuk aktivasi di <strong className="font-semibold">inbox</strong> atau tab <strong className="font-semibold">promotions/spam</strong>. Jika masih terkendala, coba klik bantuan di pojok kiri bawah untuk panduan verifikasi akun.
                                    </p>
                                </div>
                            </div>

                            <div className="border-t border-amber-200/60" />

                            {/* Item 2: Course Buyer First-Time Access */}
                            <div className="flex items-start gap-3">
                                <div className="w-6 h-6 rounded-full bg-amber-200/80 text-amber-800 flex items-center justify-center shrink-0 mt-0.5">
                                    <span className="material-symbols-outlined text-xs">
                                        key
                                    </span>
                                </div>
                                <div>
                                    <h2 className="text-xs sm:text-sm font-bold text-amber-900 leading-snug">
                                        Sudah beli course tapi belum buat akun?
                                    </h2>
                                    <p className="text-xs text-amber-800/90 leading-relaxed mt-1">
                                        Cek di email yang dimasukkan saat melakukan pembelian, seharusnya terdapat <strong className="font-semibold">password default</strong> yang dikirim untuk login. Apabila tidak ada, silakan langsung hubungi admin.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Support Widget */}
                    <div className="pt-8 pb-2 flex items-center justify-between">
                        {/* Support Trigger Button */}
                        <a
                            href="https://discord.gg/wpu"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2.5 px-4 py-2 bg-teal-800 hover:bg-teal-900 text-white rounded-full font-semibold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all active:scale-95 cursor-pointer"
                            title="Butuh bantuan seputar akun atau akses course?"
                        >
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-300 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-400"></span>
                            </span>
                            <span className="material-symbols-outlined text-base">
                                support_agent
                            </span>
                            <span>Bantuan</span>
                        </a>

                        {/* Copyright Note */}
                        <p className="text-[11px] text-slate-400 font-medium">
                            © 2026 HC Course. Hak Cipta Dilindungi.
                        </p>
                    </div>
                </div>

                {/* Right Hero Column */}
                <div className="hidden lg:flex flex-1 rounded-[2.5rem] bg-gradient-to-br from-teal-700 via-teal-800 to-teal-950 p-10 xl:p-14 text-white relative overflow-hidden flex-col justify-between shadow-2xl">
                    {/* Pattern Overlay */}
                    <div
                        className="absolute inset-0 opacity-40 pointer-events-none"
                        style={{
                            backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.1) 1.5px, transparent 1.5px)',
                            backgroundSize: '28px 28px',
                        }}
                    />

                    {/* Ambient Glows */}
                    <div className="absolute -top-24 -right-24 w-96 h-96 bg-teal-400/20 rounded-full blur-3xl pointer-events-none" />
                    <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

                    {/* Top Row Badges */}
                    <div className="relative z-10 flex items-center justify-between">
                        <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs font-semibold tracking-wide">
                            <span className="material-symbols-outlined text-teal-300 text-sm">
                                school
                            </span>
                            <span>HC Learning Experience</span>
                        </span>
                        <span className="text-xs font-medium text-teal-200/90 bg-teal-900/60 px-3 py-1 rounded-full border border-teal-500/30">
                            v2.0 LMS
                        </span>
                    </div>

                    {/* Center Feature / Emblem Graphic */}
                    <div className="relative z-10 my-auto py-10 flex flex-col items-center text-center">
                        <div className="relative mb-8 group cursor-default">
                            <div className="w-40 h-40 xl:w-48 xl:h-48 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 p-8 flex items-center justify-center shadow-2xl transition-transform duration-500 group-hover:scale-105">
                                <div className="flex flex-col items-center justify-center">
                                    <span className="font-black text-6xl xl:text-7xl tracking-tighter text-white drop-shadow-md select-none font-sans">
                                        HC
                                    </span>
                                </div>
                            </div>
                            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-teal-400 text-teal-950 font-extrabold text-[11px] uppercase tracking-wider px-3.5 py-1 rounded-full shadow-lg whitespace-nowrap">
                                Dev Studio &amp; Academy
                            </div>
                        </div>

                        <h2 className="text-2xl xl:text-3xl font-extrabold text-white tracking-tight max-w-md leading-tight">
                            Tingkatkan Karir Coding Kamu Dari Dasar Hingga Mahir
                        </h2>
                        <p className="text-teal-100/80 text-sm mt-3.5 max-w-sm font-normal leading-relaxed">
                            Akses puluhan modul praktikal industri, video resolusi tinggi, kurikulum berstandar industri, dan sertifikat resmi.
                        </p>

                        {/* Social Proof Stats Badges */}
                        <div className="grid grid-cols-3 gap-3 w-full max-w-md mt-8">
                            <div className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-2xl p-3 text-center">
                                <div className="text-lg xl:text-xl font-extrabold text-white">150K+</div>
                                <div className="text-[11px] text-teal-200/80 font-medium">Siswa Aktif</div>
                            </div>
                            <div className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-2xl p-3 text-center">
                                <div className="text-lg xl:text-xl font-extrabold text-white">40+</div>
                                <div className="text-[11px] text-teal-200/80 font-medium">Kelas Premium</div>
                            </div>
                            <div className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-2xl p-3 text-center">
                                <div className="text-lg xl:text-xl font-extrabold text-white">4.9/5</div>
                                <div className="text-[11px] text-teal-200/80 font-medium">Rating Course</div>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Card: Instructor Banner */}
                    <div className="relative z-10 bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl p-4 flex items-center gap-3.5">
                        <div className="w-10 h-10 rounded-xl bg-teal-500/30 border border-teal-300/30 flex items-center justify-center text-teal-200 text-lg shrink-0">
                            <span className="material-symbols-outlined text-xl">
                                code
                            </span>
                        </div>
                        <div>
                            <div className="text-xs font-semibold text-white">Mentor &amp; Komunitas Praktisi</div>
                            <div className="text-[11px] text-teal-200/75 leading-tight">
                                Didampingi langsung oleh Sandhika Galih dan tim praktisi berpengalaman.
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
