'use client';

import { useTranslations, useLocale } from 'next-intl';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import useEmblaCarousel from 'embla-carousel-react';
import { useCallback, useRef } from 'react';
import RevealOnScroll from '@/components/motion/RevealOnScroll';
import SplitText from '@/components/motion/SplitText';

interface Review {
    id: number;
    author: string;
    rating: number;
    text: { en: string; mr: string };
    date: string;
}

const reviews: Review[] = [
    { id: 1, author: 'Rahul Patil', rating: 5, text: { en: 'Best bakery in Belwandi! Fresh products daily and excellent taste. Highly recommended!', mr: 'बेलवंडी मधील सर्वोत्तम बेकरी! रोज ताजे उत्पादने आणि उत्तम चव. अत्यंत शिफारसीय!' }, date: '2024-12-15' },
    { id: 2, author: 'Priya Sharma', rating: 5, text: { en: 'Amazing variety of products. The samosas and cakes are absolutely delicious. Great service!', mr: 'उत्पादनांची आश्चर्यकारक विविधता. समोसे आणि केक एकदम स्वादिष्ट आहेत. उत्तम सेवा!' }, date: '2024-12-10' },
    { id: 3, author: 'Amit Deshmukh', rating: 5, text: { en: 'Quality bakery products at affordable prices. The staff is friendly and helpful. Love this place!', mr: 'परवडणाऱ्या किमतीत दर्जेदार बेकरी उत्पादने. कर्मचारी मैत्रीपूर्ण आणि मदतगार आहेत. ही जागा खूप आवडते!' }, date: '2024-12-05' },
    { id: 4, author: 'Sneha Kulkarni', rating: 5, text: { en: 'Their paneer rolls are the best! Always fresh and tasty. Excellent hygiene maintained.', mr: 'त्यांचे पनीर रोल्स सर्वोत्तम आहेत! नेहमी ताजे आणि चविष्ट. उत्तम स्वच्छता राखली जाते.' }, date: '2024-11-28' },
    { id: 5, author: 'Vijay Jadhav', rating: 5, text: { en: 'Wonderful experience! The cakes are delicious and staff is very courteous. Highly satisfied!', mr: 'अद्भुत अनुभव! केक स्वादिष्ट आहेत आणि कर्मचारी खूप विनम्र आहेत. अत्यंत समाधानी!' }, date: '2024-11-20' },
    { id: 6, author: 'Meera Patel', rating: 5, text: { en: 'Best bakery in the area. Fresh bread every morning and amazing sweets. Must visit!', mr: 'या भागातील सर्वोत्तम बेकरी. रोज सकाळी ताजी ब्रेड आणि अप्रतिम मिठाई. नक्की भेट द्या!' }, date: '2024-11-15' },
];

export default function GoogleReviews() {
    const t = useTranslations('reviews');
    const locale = useLocale();
    const averageRating = 4.8;
    const totalReviews = 150;

    const sectionRef = useRef<HTMLElement | null>(null);
    const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });
    const bgX = useTransform(scrollYProgress, [0, 1], ['-15%', '15%']);

    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'start', slidesToScroll: 1 });
    const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
    const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

    return (
        <section ref={sectionRef} aria-label="Customer Reviews" className="relative py-24 sm:py-32 bg-stone-50 dark:bg-zinc-950 overflow-hidden">
            {/* Giant parallax background number */}
            <motion.div
                aria-hidden
                style={{ x: bgX }}
                className="absolute inset-y-0 left-1/2 -translate-x-1/2 pointer-events-none flex items-center justify-center"
            >
                <span className="font-display font-medium text-[40vw] sm:text-[28vw] leading-none text-zinc-200/50 dark:text-zinc-900/80 select-none">
                    {averageRating}
                </span>
            </motion.div>

            <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
                <RevealOnScroll className="text-center mb-16">
                    <div className="text-xs uppercase tracking-[0.35em] text-amber-700 dark:text-amber-400 mb-4">
                        — {t('based_on')} {totalReviews} {t('google_reviews')}
                    </div>
                    <SplitText
                        as="h2"
                        text={t('title')}
                        className="font-display text-5xl sm:text-6xl md:text-7xl font-medium leading-[0.95] tracking-tight text-zinc-950 dark:text-zinc-50 text-balance"
                    />
                    <div className="mt-6 inline-flex items-center gap-2" aria-label={`${averageRating} out of 5 stars`}>
                        {[1, 2, 3, 4, 5].map((s) => (
                            <Star key={s} aria-hidden className={`w-6 h-6 ${s <= Math.floor(averageRating) ? 'fill-amber-500 text-amber-500' : 'fill-zinc-300 text-zinc-300'}`} />
                        ))}
                    </div>
                </RevealOnScroll>

                <div className="relative" role="region" aria-label="Reviews carousel" aria-roledescription="carousel">
                    <div className="overflow-hidden -mx-3" ref={emblaRef}>
                        <div className="flex">
                            {reviews.map((r, i) => (
                                <div key={r.id} className="flex-[0_0_100%] sm:flex-[0_0_50%] lg:flex-[0_0_40%] min-w-0 px-3" role="group" aria-roledescription="slide" aria-label={`Review ${i + 1} of ${reviews.length}`}>
                                    <RevealOnScroll delay={i * 0.06}>
                                        <div className="h-full rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm p-8 sm:p-10 shadow-lg">
                                            <div className="flex items-center mb-4" aria-label={`${r.rating} out of 5 stars`}>
                                                {[1, 2, 3, 4, 5].map((s) => (
                                                    <Star key={s} aria-hidden className={`w-4 h-4 ${s <= r.rating ? 'fill-amber-500 text-amber-500' : 'fill-zinc-300 text-zinc-300'}`} />
                                                ))}
                                            </div>
                                            <p className="font-display text-xl sm:text-2xl leading-snug text-zinc-900 dark:text-zinc-100 mb-6 line-clamp-5">
                                                &ldquo;{locale === 'mr' ? r.text.mr : r.text.en}&rdquo;
                                            </p>
                                            <div className="flex items-center justify-between border-t border-zinc-200 dark:border-zinc-800 pt-4">
                                                <p className="font-semibold text-zinc-900 dark:text-zinc-50">{r.author}</p>
                                                <p className="text-xs uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
                                                    {new Date(r.date).toLocaleDateString(locale, { year: 'numeric', month: 'short' })}
                                                </p>
                                            </div>
                                        </div>
                                    </RevealOnScroll>
                                </div>
                            ))}
                        </div>
                    </div>

                    <button onClick={scrollPrev} aria-label="Previous review" className="absolute left-2 top-1/2 -translate-y-1/2 -translate-x-2 sm:-translate-x-6 w-12 h-12 rounded-full bg-zinc-950 text-white flex items-center justify-center hover:bg-amber-500 transition-colors z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500">
                        <ChevronLeft className="w-5 h-5" aria-hidden />
                    </button>
                    <button onClick={scrollNext} aria-label="Next review" className="absolute right-2 top-1/2 -translate-y-1/2 translate-x-2 sm:translate-x-6 w-12 h-12 rounded-full bg-zinc-950 text-white flex items-center justify-center hover:bg-amber-500 transition-colors z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500">
                        <ChevronRight className="w-5 h-5" aria-hidden />
                    </button>
                </div>

                <div className="text-center mt-14">
                    <a
                        href="https://www.google.com/search?q=gurudev+bakery+belwandi"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-3 px-7 py-3.5 rounded-full bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-50 border border-zinc-200 dark:border-zinc-800 hover:border-amber-500 dark:hover:border-amber-500 transition-colors text-sm uppercase tracking-widest"
                    >
                        <svg className="w-5 h-5" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" /><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" /><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" /><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" /></svg>
                        {t('view_all_reviews')}
                    </a>
                </div>
            </div>
        </section>
    );
}
