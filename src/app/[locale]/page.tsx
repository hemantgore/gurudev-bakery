'use client';

import dynamic from 'next/dynamic';
import Hero from '@/components/sections/Hero';
import FeaturedProducts from '@/components/sections/FeaturedProducts';
import AboutSnippet from '@/components/sections/AboutSnippet';
import Footer from '@/components/layout/Footer';

const GoogleReviews = dynamic(() => import('@/components/sections/GoogleReviews'), {
    ssr: false,
    loading: () => <div className="h-96 bg-zinc-50 dark:bg-zinc-900 animate-pulse" />
});

export default function Home() {
    return (
        <>
            <Hero />
            <FeaturedProducts />
            <AboutSnippet />
            <GoogleReviews />
            <Footer />
        </>
    );
}
