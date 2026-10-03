import React, { useState } from 'react';

interface MenuTipBannerProps {
    onOpenGuide?: () => void;
}

export default function MenuTipBanner({ onOpenGuide }: MenuTipBannerProps) {
    const [dismissed, setDismissed] = useState(false);

    if (dismissed) return null;

    return (
        <div className="bg-surface-container-low/90 border border-primary/20 rounded-2xl p-4 sm:p-5 shadow-2xs flex items-start justify-between gap-4 mb-6 transition-all duration-300">
            <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0 mt-0.5 border border-primary/20">
                    <span className="material-symbols-outlined text-[20px]">lightbulb</span>
                </div>
                <div>
                    <span className="font-semibold text-sm text-on-surface block mb-1">
                        Tips Konfigurasi Menu &amp; Megamenu
                    </span>
                    <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed max-w-4xl">
                        Anda dapat mengatur tata letak multi-level (induk &amp; anak menu), deskripsi visual megamenu
                        berkategori, serta isolasi hak akses peran (Publik, Member, Mentor, Superadmin) secara real-time
                        tanpa perlu deployment ulang kode frontend.
                    </p>
                    <button
                        type="button"
                        onClick={onOpenGuide}
                        className="inline-flex items-center gap-1.5 mt-2.5 text-xs font-bold text-primary hover:text-primary-container transition-colors cursor-pointer group"
                    >
                        <span>Panduan Struktur Navigasi Dinamis</span>
                        <span className="material-symbols-outlined text-[15px] transition-transform group-hover:translate-x-1">
                            arrow_forward
                        </span>
                    </button>
                </div>
            </div>

            <button
                type="button"
                onClick={() => setDismissed(true)}
                aria-label="Tutup pemberitahuan"
                className="text-outline hover:text-on-surface p-1 rounded-lg hover:bg-surface-container transition-colors shrink-0 cursor-pointer"
            >
                <span className="material-symbols-outlined text-[18px]">close</span>
            </button>
        </div>
    );
}
