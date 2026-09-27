import { Head } from '@inertiajs/react';
import FrontendLayout from '@/components/frontend/FrontendLayout';
import HeroSection from '@/components/frontend/beranda/HeroSection';
import CourseCatalogSection from '@/components/frontend/beranda/CourseCatalogSection';
import BootcampSection from '@/components/frontend/beranda/BootcampSection';
import MentorSection from '@/components/frontend/beranda/MentorSection';
import TestimonialSection from '@/components/frontend/beranda/TestimonialSection';
import FaqAndCommunitySection from '@/components/frontend/beranda/FaqAndCommunitySection';

export default function Welcome() {
    return (
        <FrontendLayout>
            <Head title="HC Course - Belajar Pemrograman dari Nol Sampai Siap Kerja" />

            {/* Ambient Background Glows */}
            <div className="relative w-full overflow-hidden">
                <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[450px] bg-gradient-to-b from-teal-100/60 via-teal-50/40 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />
                <div className="absolute top-96 -left-32 w-80 h-80 bg-indigo-50/70 rounded-full blur-3xl pointer-events-none -z-10" />
                <div className="absolute top-[800px] -right-32 w-96 h-96 bg-teal-50/60 rounded-full blur-3xl pointer-events-none -z-10" />

                {/* 1. Hero Section & Stats */}
                <HeroSection />

                {/* 2. Katalog Kursus Populer & Filter */}
                <CourseCatalogSection />

                {/* 3. Intensive Bootcamp 16 Minggu */}
                <BootcampSection />

                {/* 4. Profil Mentor & Filosofi Belajar */}
                <MentorSection />

                {/* 5. Cerita Sukses Alumni */}
                <TestimonialSection />

                {/* 6. FAQ & Komunitas Discord */}
                <FaqAndCommunitySection />
            </div>
        </FrontendLayout>
    );
}
