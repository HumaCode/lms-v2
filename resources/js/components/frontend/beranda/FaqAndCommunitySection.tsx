import { useState } from 'react';

const FAQS = [
    {
        id: 1,
        question: 'Apakah kursus ini cocok untuk yang sama sekali tidak punya background IT?',
        answer: 'Sangat cocok! Kami memiliki jalur belajar pemula mulai dari pengenalan logika, instalasi tools dasar, HTML/CSS, hingga JavaScript dari nol. Bahasa pengantar 100% menggunakan Bahasa Indonesia yang santai dan mudah dimengerti.',
    },
    {
        id: 2,
        question: 'Berapa lama akses materi kursus yang sudah saya beli?',
        answer: 'Seluruh materi kursus mandiri (self-paced) berstatus Lifetime Access (Akses Seumur Hidup). Anda juga akan mendapatkan pembaruan materi video secara gratis jika terdapat update versi minor pada teknologi terkait.',
    },
    {
        id: 3,
        question: 'Apakah peserta mendapatkan sertifikat kelulusan resmi?',
        answer: 'Ya! Setiap kali menyelesaikan 100% modul materi dan mengumpulkan tugas akhir proyek, kamu berhak mengunduh sertifikat resmi berverifikasi digital (dengan kode QR valid) yang dapat disematkan langsung di profil LinkedIn.',
    },
    {
        id: 4,
        question: 'Bagaimana jika saya mengalami kendala atau error saat coding?',
        answer: 'Tersedia forum tanya jawab langsung di bawah setiap video materi serta channel khusus di Discord WPU. Mentor dan asisten instruktur siap membantu membedah error yang kamu temukan setiap hari kerja.',
    },
];

export default function FaqAndCommunitySection() {
    const [openFaqId, setOpenFaqId] = useState<number | null>(null);

    const toggleFaq = (id: number) => {
        setOpenFaqId(openFaqId === id ? null : id);
    };

    return (
        <section className="max-w-[1280px] mx-auto px-4 lg:px-8 py-16">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
                {/* FAQ Accordion */}
                <div className="lg:col-span-7 flex flex-col gap-6">
                    <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-teal-600"></span>
                        <span className="font-mono text-xs text-teal-600 font-semibold uppercase tracking-wider">
                            PERTANYAAN UMUM
                        </span>
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
                        Hal yang Sering Ditanyakan
                    </h2>
                    <div className="flex flex-col gap-3" id="faqAccordion">
                        {FAQS.map((faq) => {
                            const isOpen = openFaqId === faq.id;
                            return (
                                <div
                                    key={faq.id}
                                    className="rounded-2xl bg-white border border-slate-200/60 overflow-hidden shadow-xs transition-colors"
                                >
                                    <button
                                        type="button"
                                        onClick={() => toggleFaq(faq.id)}
                                        className="w-full p-5 text-left flex items-center justify-between text-slate-800 hover:text-teal-700 transition-colors"
                                    >
                                        <span className="text-sm sm:text-base font-semibold">
                                            {faq.question}
                                        </span>
                                        <span
                                            className={`material-symbols-outlined text-slate-400 transition-transform duration-200 ${
                                                isOpen ? 'rotate-180 text-teal-600' : ''
                                            }`}
                                        >
                                            expand_more
                                        </span>
                                    </button>
                                    {isOpen && (
                                        <div className="px-5 pb-5 pt-0 text-xs sm:text-sm text-slate-500 leading-relaxed border-t border-slate-100/70 mt-1">
                                            {faq.answer}
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Discord Community CTA Banner */}
                <div className="lg:col-span-5 flex flex-col justify-between rounded-3xl bg-slate-900 text-white p-8 shadow-xs relative overflow-hidden">
                    <div className="flex flex-col gap-4 relative z-10">
                        <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center text-indigo-400">
                            <span className="material-symbols-outlined text-2xl">forum</span>
                        </div>
                        <div className="flex flex-col gap-2">
                            <span className="text-xs text-indigo-400 font-semibold uppercase tracking-wider">
                                Rumah Developer Indonesia
                            </span>
                            <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                                Gabung Komunitas Discord WPU dengan 100K+ Member
                            </h3>
                            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                                Temukan teman ngoding bareng, sesi review portofolio rutin setiap Jumat malam, info lowongan kerja eksklusif, dan diskusi seputar tech stack terbaru.
                            </p>
                        </div>

                        <div className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700/50 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                                <span className="text-xs text-slate-200 font-medium">
                                    14.280 Online
                                </span>
                            </div>
                            <span className="text-xs text-slate-400">
                                108.500+ Member Total
                            </span>
                        </div>
                    </div>

                    <div className="pt-6 relative z-10 flex flex-col gap-3">
                        <a
                            className="w-full py-3 px-6 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-sm text-center transition-colors flex items-center justify-center gap-2"
                            href="https://discord.gg/wpu"
                            rel="noopener noreferrer"
                            target="_blank"
                        >
                            <span className="material-symbols-outlined text-lg">login</span>
                            <span>Gabung Discord Sekarang</span>
                        </a>
                        <span className="text-xs text-center text-slate-400">
                            Terbuka untuk umum, dari pemula hingga senior engineer.
                        </span>
                    </div>
                </div>
            </div>
        </section>
    );
}
