import { Head } from '@inertiajs/react';
import FrontendLayout from '@/components/frontend/FrontendLayout';
import AboutHeroSection from '@/components/frontend/about/AboutHeroSection';
import AboutMilestonesSection from '@/components/frontend/about/AboutMilestonesSection';
import AboutPhilosophySection from '@/components/frontend/about/AboutPhilosophySection';
import AboutInstructorsSection from '@/components/frontend/about/AboutInstructorsSection';
import AboutVisionSection from '@/components/frontend/about/AboutVisionSection';

export default function About() {
    return (
        <FrontendLayout>
            <Head title="Tentang Kami - HC Course" />

            <div className="flex flex-col w-full">
                {/* 1. Hero Story: Origin 2015, democratization of tech education */}
                <AboutHeroSection />

                {/* 2. Jejak Dampak Nyata: 4 Milestones */}
                <AboutMilestonesSection />

                {/* 3. Tiga Pilar Filosofi Belajar & Studio Workflow */}
                <AboutPhilosophySection />

                {/* 4. Fakultas & Instruktur Praktisi */}
                <AboutInstructorsSection />

                {/* 5. Visi AI 2025+ & Call to Action */}
                <AboutVisionSection />
            </div>
        </FrontendLayout>
    );
}
