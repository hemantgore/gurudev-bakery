'use client';

import dynamic from 'next/dynamic';
import HeroBold from '@/components/sections/HeroBold';
import FeaturedProducts from '@/components/sections/FeaturedProducts';
import AboutSnippet from '@/components/sections/AboutSnippet';
import CTASection from '@/components/sections/CTASection';
import Marquee from '@/components/motion/Marquee';
import Footer from '@/components/layout/Footer';

const GoogleReviews = dynamic(() => import('@/components/sections/GoogleReviews'), {
    ssr: false,
    loading: () => <div className="h-96 bg-stone-50 dark:bg-zinc-950 animate-pulse" />
});

export default function Home() {
    return (
        <>
            <HeroBold />
            <main id="main-content">
                <div className="bg-amber-500 text-zinc-950 py-3 border-y border-amber-600/30 font-medium">
                    <Marquee
                        items={['Fresh Daily Bakes', 'Cakes · Breads · Khari · Sweets', 'Belwandi, Maharashtra', 'Since 2000', '4.8 ★ on Google']}
                        speed="normal"
                    />
                </div>
                <FeaturedProducts />
                <AboutSnippet />
                <GoogleReviews />
                <CTASection />
            </main>
            <Footer />
        </>
    );
}
