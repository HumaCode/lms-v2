export default function AboutInstructorsSection() {
    const instructors = [
        {
            name: 'Sandhika Galih',
            role: 'Lead Web Instructor & Academician',
            tag: 'FOUNDER',
            tagColor: 'bg-teal-600 text-white',
            experienceBadge: '10+ Th Pengajar',
            avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD8AWgn_0kM9DcLj2g2E9NP5WSTBgO1yglLwiZVotzgSY1zKeWggBuvkG3yuSj4CcIfpMDuPsbGaahLZhHxb93OSHP_hb80iiH1lmzcoueq6gLQJLeNw9KUdaUYwYtg1bKLLyffBx__KKmkhz6KH3JEN28pcrsoVCs3VMGIUVI5Nz_O4ci0T6NcP42j-GKpjdnf1UKE9LS0RY3DQgTm92vLsQIFkN8e3F8cjB3Sb4smL5hhVbEqja5oSw',
            bio: 'Dosen Teknik Informatika UNPAS, inisiator HC Course, dan YouTube Creator Edukasi yang telah menginspirasi generasi coder Indonesia.',
            techStack: 'JS / PHP / Architecture',
            links: [
                { icon: 'smart_display', href: 'https://youtube.com', label: 'YouTube' },
                { icon: 'code', href: 'https://github.com', label: 'GitHub' },
                { icon: 'share', href: 'https://linkedin.com', label: 'LinkedIn' },
            ],
        },
        {
            name: 'Radhika Putri',
            role: 'Frontend Engineering Specialist',
            tag: 'EX-TECH LEAD',
            tagColor: 'bg-indigo-600 text-white',
            experienceBadge: 'Ex-Principal Unicorn',
            avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAtQk0E5gfc4_Py79o34CLwKyt93bAEFwm8ebRo9SZTQNdWZilhlfqEkeXO5D30fT_JeeaXG_bp-Xvy3NBXlFqZ488Ly6XPh-u6rndzrEuR__mTOPzVaGBba_N4fkHEhTkooT9T9S1GlRYGBQ7-QtOQ-a7r48O_MSLHPasOLy7ZFZrQmcjGBn7n4aKLhng0VrWui4ocI-Tf7gIIeU8wLEZqfEU00lakVlW6-80byolLXaMEWe6LKyzINQ',
            bio: 'Mantan Principal Frontend di Unicorn Indonesia. Ahli dalam optimalisasi web performance, React, Next.js, dan arsitektur Design System berskala jutaan MAU.',
            techStack: 'React / Next.js / Tailwind',
            links: [
                { icon: 'code', href: 'https://github.com', label: 'GitHub' },
                { icon: 'link', href: '#', label: 'Portfolio' },
            ],
        },
        {
            name: 'Fajar Ardiansyah',
            role: 'Backend & DevOps Engineer',
            tag: 'CLOUD ARCHITECT',
            tagColor: 'bg-amber-600 text-white',
            experienceBadge: 'AWS Certified Pro',
            avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAmAb-3CInqwLsAF1so2ItdWHwcXEGei2AYM52h_VofDCOaVJ_b3aTlcj5cicUKBsmoWq68qCGZjNS6xEmoTz_uy7FoGeh5ybAUp9XSOKh6YEDTtyuwBEPX0im0AXdE1J9Ukb9G9zYIn13bcra4PlRGZ28WTQDKR_x0j0Jsh7PRSAKUrg5XWw6ZM2YoB9lH3mdpm6an0LiqnfrgxoQ4GI66rMJOh6e2aP92kTO0g_2wasXPl5E2Z46KRQ',
            bio: 'Berpengalaman membangun microservices berkapasitas ribuan QPS menggunakan Go, Node.js, Docker, dan infrastruktur cloud di perbankan digital.',
            techStack: 'Go / Docker / AWS',
            links: [
                { icon: 'terminal', href: 'https://github.com', label: 'Terminal' },
                { icon: 'share', href: 'https://linkedin.com', label: 'LinkedIn' },
            ],
        },
        {
            name: 'Nadya Safira',
            role: 'Career Coach & Tech Recruiter',
            tag: 'TALENT LEAD',
            tagColor: 'bg-emerald-600 text-white',
            experienceBadge: 'HR Specialist',
            avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDulXx-SFCLQZST9YJM3imdo1O-rZdtiaGlpAeo5AzY33RNCYhPjMt1ShTXPI5bniOUk8RlTUhW-1nWkwlXxTg82N3dl-VsleVtr78rXocTxRBIXitL2MnEogXFh0hZiNaf-lk11gZmK9BK8e9HPJoJ8bNq7nfGPy3DJj1koDe_HcOMDNzLwvij1ik3nlTJ5s-P2vNW_Rj77-t-onn9SLkRsCN1U7Kbx7QuSPS_lrsIe8e2M0WYiH4NVg',
            bio: 'Telah me-review ribuan CV developer dan membimbing ratusan career switcher menembus interview teknis di start-up terkemuka serta remote global companies.',
            techStack: 'CV / Mock Interview',
            links: [
                { icon: 'badge', href: 'https://linkedin.com', label: 'LinkedIn' },
                { icon: 'chat', href: '#', label: 'Mentorship' },
            ],
        },
    ];

    return (
        <section id="mentor" className="max-w-[1280px] mx-auto px-4 lg:px-8 py-16">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
                <div>
                    <span className="text-xs font-bold text-teal-600 uppercase tracking-widest block mb-1">
                        Fakultas &amp; Praktisi
                    </span>
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
                        Instruktur yang Mendidik dari Hati
                    </h2>
                </div>
                <p className="text-sm text-slate-500 max-w-md leading-relaxed">
                    Bukan sekadar pengajar teori, melainkan praktisi aktif dan tech lead yang bergulat dengan kode skala produksi setiap hari.
                </p>
            </div>

            {/* Mentor Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {instructors.map((item, index) => (
                    <div
                        key={index}
                        className="bg-white border border-slate-200/70 rounded-2xl overflow-hidden shadow-xs hover:shadow-md hover:border-slate-300 transition-all flex flex-col group"
                    >
                        {/* Image Container with Badges */}
                        <div className="relative h-64 overflow-hidden bg-slate-100">
                            <img
                                src={item.avatar}
                                alt={item.name}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            {/* Role / Tag Pill */}
                            <div
                                className={`absolute top-3 right-3 text-[10px] font-mono font-bold px-2.5 py-1 rounded-md shadow-sm ${item.tagColor}`}
                            >
                                {item.tag}
                            </div>
                            {/* Experience Pill */}
                            <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-slate-800 font-mono text-[10px] font-semibold flex items-center gap-1.5 shadow-sm border border-slate-200/60">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                <span>{item.experienceBadge}</span>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="p-6 flex flex-col flex-1 justify-between">
                            <div>
                                <h3 className="text-lg font-bold text-slate-900 group-hover:text-teal-600 transition-colors">
                                    {item.name}
                                </h3>
                                <p className="text-xs font-semibold text-teal-600 mt-1">
                                    {item.role}
                                </p>
                                <p className="text-xs text-slate-500 mt-3 leading-relaxed">
                                    {item.bio}
                                </p>
                            </div>

                            <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                                <div className="flex items-center gap-1.5">
                                    {item.links.map((link, lIdx) => (
                                        <a
                                            key={lIdx}
                                            href={link.href}
                                            aria-label={link.label}
                                            className="w-7 h-7 rounded-lg bg-slate-50 hover:bg-teal-50 hover:text-teal-700 text-slate-500 flex items-center justify-center transition-colors border border-slate-200/60"
                                        >
                                            <span className="material-symbols-outlined text-sm">
                                                {link.icon}
                                            </span>
                                        </a>
                                    ))}
                                </div>
                                <span className="text-[11px] font-mono text-slate-400">
                                    {item.techStack}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
