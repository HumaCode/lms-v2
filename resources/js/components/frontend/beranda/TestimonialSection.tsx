export default function TestimonialSection() {
    return (
        <section className="max-w-[1280px] mx-auto px-4 lg:px-8 py-16">
            <div className="text-center max-w-2xl mx-auto mb-12">
                <div className="inline-flex items-center gap-2 mb-3">
                    <span className="w-2 h-2 rounded-full bg-teal-600"></span>
                    <span className="font-mono text-xs text-teal-600 uppercase font-semibold">
                        CERITA SUKSES ALUMNI
                    </span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
                    Dari Belajar Otodidak Hingga Diterima Bekerja
                </h2>
                <p className="text-sm text-slate-600 mt-2">
                    Kisah nyata teman-teman seperjuangan yang memulai dari nol, konsisten belajar, dan kini berkarya di industri teknologi.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Review 1 */}
                <div className="rounded-2xl bg-white border border-slate-200/60 p-6 flex flex-col justify-between shadow-xs">
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center justify-between">
                            <div className="flex text-amber-500">
                                {[...Array(5)].map((_, i) => (
                                    <span
                                        key={i}
                                        className="material-symbols-outlined text-sm"
                                        style={{ fontVariationSettings: "'FILL' 1" }}
                                    >
                                        star
                                    </span>
                                ))}
                            </div>
                            <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 font-medium">
                                GoTo Financial
                            </span>
                        </div>
                        <p className="text-sm text-slate-600 italic leading-relaxed">
                            &quot;Penjelasan Pak Sandhika di kursus React &amp; Next.js bener-bener membuka mata. Konsep Server Component dan state yang dulunya bikin pusing, jadi masuk akal banget. Berkat portofolio capstone-nya, saya lolos interview teknis.&quot;
                        </p>
                    </div>
                    <div className="flex items-center gap-3 pt-5 mt-4 border-t border-slate-100">
                        <img
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAr9uKztnkm9AKH7SRFn7eFAP6QaqxscIX4iw5D0mOPTKxO8XwlrILbraPgBQ8DIXjAbrMaiZatWurfk-KznGmpGfjDopj8YjyUcVT8nmZD3fuPRXsVm6-QbnGiVoaDsCCoookcfaNyJBAPiAwNPDwPoq04W_WeFNZhKIMUT1RiRAPd-b6wN8MOWNxQOifYSHbnvKdko1Ds_sSVUdZwx8c7xSey6gCR9XCRrk5PGBuJ-NShVrRSPjM4dA"
                            alt="Rizky Ramadan"
                            className="w-10 h-10 rounded-full object-cover ring-1 ring-slate-100"
                        />
                        <div className="flex flex-col">
                            <span className="text-sm font-semibold text-slate-800">
                                Rizky Ramadan
                            </span>
                            <span className="text-xs text-slate-500">
                                Frontend Engineer • Ex-Mahasiswa Non-IT
                            </span>
                        </div>
                    </div>
                </div>

                {/* Review 2 */}
                <div className="rounded-2xl bg-white border border-slate-200/60 p-6 flex flex-col justify-between shadow-xs">
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center justify-between">
                            <div className="flex text-amber-500">
                                {[...Array(5)].map((_, i) => (
                                    <span
                                        key={i}
                                        className="material-symbols-outlined text-sm"
                                        style={{ fontVariationSettings: "'FILL' 1" }}
                                    >
                                        star
                                    </span>
                                ))}
                            </div>
                            <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 font-medium">
                                Traveloka
                            </span>
                        </div>
                        <p className="text-sm text-slate-600 italic leading-relaxed">
                            &quot;Yang paling mahal dari WPU Course adalah sesi 1-on-1 Code Review dan komunitas Discord-nya. Kapanpun saya stuck ada mentor yang ramah ngarahin solusi, bukan sekadar ngasih jawaban instan.&quot;
                        </p>
                    </div>
                    <div className="flex items-center gap-3 pt-5 mt-4 border-t border-slate-100">
                        <img
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCdzk_SCSjqhmEGu4RChSMJGJ0SEjADGQITx54rFXs41cRrP_VyML9lfU73NK_3R9N7dfrmPUrQ-Qeyp17WGa9C5OHoDNNLZuBZR_j2tMwNAYHcwM1kLZe3lGfjFe9CzATJLRI9D2O_ykFvrHX156E1mUki1dBxUIaMeqFi8eP1aLiKl7fEUkjxDO10EBjm-KUoxfCinVGUdH67JvkF9ZzJUArWu0VJcBFNDBvt3gaZcazP0US18_KmCw"
                            alt="Nadya Safira"
                            className="w-10 h-10 rounded-full object-cover ring-1 ring-slate-100"
                        />
                        <div className="flex flex-col">
                            <span className="text-sm font-semibold text-slate-800">
                                Nadya Safira
                            </span>
                            <span className="text-xs text-slate-500">
                                Backend Developer • Alumni Bootcamp #9
                            </span>
                        </div>
                    </div>
                </div>

                {/* Review 3 */}
                <div className="rounded-2xl bg-white border border-slate-200/60 p-6 flex flex-col justify-between shadow-xs">
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center justify-between">
                            <div className="flex text-amber-500">
                                {[...Array(5)].map((_, i) => (
                                    <span
                                        key={i}
                                        className="material-symbols-outlined text-sm"
                                        style={{ fontVariationSettings: "'FILL' 1" }}
                                    >
                                        star
                                    </span>
                                ))}
                            </div>
                            <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 font-medium">
                                Singapore Remote
                            </span>
                        </div>
                        <p className="text-sm text-slate-600 italic leading-relaxed">
                            &quot;Saya switch career dari staf operasional logistik di umur 29 tahun. Belajar materi Golang &amp; Microservices WPU Course selama 6 bulan, sekarang bekerja remote untuk agency software di Singapura dengan gaji dollar.&quot;
                        </p>
                    </div>
                    <div className="flex items-center gap-3 pt-5 mt-4 border-t border-slate-100">
                        <img
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDEdZHlLm9bVaMUv0UWYsAskdC8fMaC9qbLfUOvB9iUCOUzxoSJ02QWQQcr33V9LILSvGK2eTKXKyupoKtNMJSTZ0qj3EhRsxsmAO4HtDjc-lDBQMnz5RGcJ996hsVh-C0uuj-g8GhN4AQrd-Y7o2WR2iS3CsRxEMrt-wsIAbdFyZm_N4wpQ0Ry1RftcaYJb5xSgbe0K1rCBb9ivpqZX2yp5ZW2iD5CMPAAgewivNQ9ja4xHsW6vrAfpA"
                            alt="Dimas Anggoro"
                            className="w-10 h-10 rounded-full object-cover ring-1 ring-slate-100"
                        />
                        <div className="flex flex-col">
                            <span className="text-sm font-semibold text-slate-800">
                                Dimas Anggoro
                            </span>
                            <span className="text-xs text-slate-500">
                                Remote Software Engineer • Career Switcher
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
