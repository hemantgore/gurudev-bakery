import Hero from '@/components/sections/Hero';
import FeaturedProducts from '@/components/sections/FeaturedProducts';
import AboutSnippet from '@/components/sections/AboutSnippet';
import Footer from '@/components/layout/Footer';

export default function Home() {
    return (
        <>
            <Hero />
            <FeaturedProducts />
            <AboutSnippet />
            <Footer />
        </>
    );
}
