export default function MentorSection() {
    return (
        <section className="max-w-[1280px] mx-auto px-4 lg:px-8 py-16" id="tentang-kami">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                {/* Left: Mentor Visual Profile */}
                <div className="lg:col-span-5 flex flex-col gap-4">
                    <div className="relative rounded-3xl bg-white border border-slate-200/60 p-6 shadow-xs overflow-hidden">
                        <div className="relative aspect-square rounded-2xl overflow-hidden mb-5 bg-slate-100">
                            <img
                                alt="Sandhika Galih"
                                className="w-full h-full object-cover"
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDSt10iLnjiXt-sHKqhEqRtWHfEktLRf2Yvxcww7GrAofqaJpnZ_9FWP2tQEMCHQpUZjKoqSha8adR9d2pt1UphP2aGsOR1a4mLNzGoOFzsHAJqnhSsZjM2xXSOQApa5kueuGeKH-zZbnBM9f2MH3jGTswd2k4DIo1UcUES4zKQGq7l-N9dBc1YxSgsTLz1_AM3moY1ljMFdPU2S-SGEa1IS7QMOrUZO6v8vJYWrKUreCdiPhzruQ7v6Q"
                            />
                            <div className="absolute bottom-3 left-3 right-3 p-3 rounded-xl bg-white/95 backdrop-blur-md border border-slate-200/50 flex items-center justify-between shadow-xs">
                                <div>
                                    <span className="text-sm font-bold text-slate-800 block">
                                        Sandhika Galih
                                    </span>
                                    <span className="text-xs text-slate-500">
                                        Founder WPU &amp; Dosen IT
                                    </span>
                                </div>
                                <div className="flex items-center gap-1 text-xs text-teal-700 font-semibold">
                                    <span className="material-symbols-outlined text-sm">verified</span>
                                    <span>10+ Th Jam Terbang</span>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-3 gap-2.5 text-center">
                            <div className="p-3 rounded-xl bg-slate-50/70 border border-slate-200/40">
                                <span className="text-lg font-bold text-slate-800 block">850K+</span>
                                <span className="text-xs text-slate-400">Subscribers</span>
                            </div>
                            <div className="p-3 rounded-xl bg-slate-50/70 border border-slate-200/40">
                                <span className="text-lg font-bold text-slate-800 block">100K+</span>
                                <span className="text-xs text-slate-400">Members</span>
                            </div>
                            <div className="p-3 rounded-xl bg-slate-50/70 border border-slate-200/40">
                                <span className="text-lg font-bold text-slate-800 block">1000+</span>
                                <span className="text-xs text-slate-400">Video Modul</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right: Core Philosophy & Instructors */}
                <div className="lg:col-span-7 flex flex-col gap-6">
                    <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-teal-600"></span>
                        <span className="text-xs text-teal-700 font-semibold uppercase tracking-wider">
                            Filosofi Belajar
                        </span>
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                        Materi Berbobot Tanpa Istilah Ribet. Santai, Bertahap, dan Tuntas.
                    </h2>
                    <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                        Banyak orang gagal belajar coding bukan karena kurang pintar, melainkan materi yang diajarkan terlalu abstrak dan melompat-lompat. Di WPU Course, setiap konsep rumit diterjemahkan menggunakan analogi kehidupan sehari-hari dan implementasi riil.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                        <div className="p-4 rounded-2xl bg-white border border-slate-200/60 flex flex-col gap-2 shadow-xs">
                            <div className="w-8 h-8 rounded-lg bg-teal-50 flex items-center justify-center text-teal-700">
                                <span className="material-symbols-outlined text-lg">psychology</span>
                            </div>
                            <h3 className="text-sm font-semibold text-slate-800">
                                Fokus ke Fondasi Logika
                            </h3>
                            <p className="text-xs text-slate-500 leading-relaxed">
                                Bukan sekadar hafalan sintaks atau copas framework. Kamu diajarkan cara berpikir seorang problem solver sejati.
                            </p>
                        </div>
                        <div className="p-4 rounded-2xl bg-white border border-slate-200/60 flex flex-col gap-2 shadow-xs">
                            <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-700">
                                <span className="material-symbols-outlined text-lg">co_present</span>
                            </div>
                            <h3 className="text-sm font-semibold text-slate-800">
                                Instruktur Praktisi Startup
                            </h3>
                            <p className="text-xs text-slate-500 leading-relaxed">
                                Disupervisi oleh developer yang aktif bekerja di ekosistem unicorn, bank digital, dan agensi terkemuka.
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 pt-2">
                        <div className="flex -space-x-2 overflow-hidden">
                            <img
                                className="inline-block h-10 w-10 rounded-full ring-2 ring-white object-cover"
                                alt="Mentor 1"
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuA04iFfD7JWbyiYm1_mGQAlToZb289Ztd70Q3-uO-cJE6d4yXD6kbC1k51qAsyQwUjfoWNP1ZM57cJseS3kyenkldKEDGjwist1-XW1zALi3MyntpFAX4UMtht-LUv78yDoGBeLYizBGDQ9JwU5AC08ie_9b3_zOukLdmpxaL_RbIzLfHXyiuTSFJeeyUEIvMCIeOf_RyXfyMpfv5vECQkHrlM2HT3G0b3lMlnx77nHrVEfjBvt4zwlVg"
                            />
                            <img
                                className="inline-block h-10 w-10 rounded-full ring-2 ring-white object-cover"
                                alt="Mentor 2"
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDwNH1qWs_65m31NEAfWa0BdSJV1cHenXVYMIj7YT65-2vqoex1EG8RCwyu7spB1S-T-bspzd4fDbnXidfW1mqrQQmz-pahlP_3lqiAZ1nyx4Sc4hzOP1v1S4aA5vkEb5ued_th-nZDozaVxaWRCdr7GPG5hGqqJS03wTNLySaKCcncexHW8Iv7QVhiTWbCSjh-ulqEGJKIDEfxnS2a2Cu6dReroHbnP6xcbxmCUe7gr7LY2zfTA8IPDQ"
                            />
                            <img
                                className="inline-block h-10 w-10 rounded-full ring-2 ring-white object-cover"
                                alt="Mentor 3"
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuC3fbom1GVH_VJUgQzD9AzfltgqwWCkNImHmBsTjMeIWIY31BwdUEWoZhg0LzdIVRcHocztztZyhkItOaD3aDOkRGViK_25bSWSHZZrakW7NcEDGLMV0vhiHztWWUzREVrIOmndXdOXQRpivZu0ElOXjOy3DSu6G_0_8xOUm57n1-FIP_UUGqosON84FAupwIy_rEDJIyn-HJ8nUh6I5K8IROaozkxEQmk0h20XanIcE8EEmtHjqoviZg"
                            />
                            <div className="w-10 h-10 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center font-mono text-xs text-teal-600 font-bold ring-2 ring-white">
                                +14
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-sm font-semibold text-slate-900">
                                Didukung 14+ Praktisi Tamu
                            </span>
                            <span className="text-xs text-slate-500">
                                Tokopedia, Traveloka, GoTo, Blibli, &amp; Remote Global
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
