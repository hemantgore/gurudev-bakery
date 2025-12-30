'use client';

import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import useEmblaCarousel from 'embla-carousel-react';
import { useCallback } from 'react';

interface Review {
    id: number;
    author: string;
    rating: number;
    text: {
        en: string;
        mr: string;
    };
    date: string;
}

// Replace these with actual Google reviews
const reviews: Review[] = [
    {
        id: 1,
        author: 'Rahul Patil',
        rating: 5,
        text: {
            en: 'Best bakery in Belwandi! Fresh products daily and excellent taste. Highly recommended!',
            mr: 'बेलवंडी मधील सर्वोत्तम बेकरी! रोज ताजे उत्पादने आणि उत्तम चव. अत्यंत शिफारसीय!'
        },
        date: '2024-12-15'
    },
    {
        id: 2,
        author: 'Priya Sharma',
        rating: 5,
        text: {
            en: 'Amazing variety of products. The samosas and cakes are absolutely delicious. Great service!',
            mr: 'उत्पादनांची आश्चर्यकारक विविधता. समोसे आणि केक एकदम स्वादिष्ट आहेत. उत्तम सेवा!'
        },
        date: '2024-12-10'
    },
    {
        id: 3,
        author: 'Amit Deshmukh',
        rating: 5,
        text: {
            en: 'Quality bakery products at affordable prices. The staff is friendly and helpful. Love this place!',
            mr: 'परवडणाऱ्या किमतीत दर्जेदार बेकरी उत्पादने. कर्मचारी मैत्रीपूर्ण आणि मदतगार आहेत. ही जागा खूप आवडते!'
        },
        date: '2024-12-05'
    },
    {
        id: 4,
        author: 'Sneha Kulkarni',
        rating: 5,
        text: {
            en: 'Their paneer rolls are the best! Always fresh and tasty. Excellent hygiene maintained.',
            mr: 'त्यांचे पनीर रोल्स सर्वोत्तम आहेत! नेहमी ताजे आणि चविष्ट. उत्तम स्वच्छता राखली जाते.'
        },
        date: '2024-11-28'
    },
    {
        id: 5,
        author: 'Vijay Jadhav',
        rating: 5,
        text: {
            en: 'Wonderful experience! The cakes are delicious and staff is very courteous. Highly satisfied!',
            mr: 'अद्भुत अनुभव! केक स्वादिष्ट आहेत आणि कर्मचारी खूप विनम्र आहेत. अत्यंत समाधानी!'
        },
        date: '2024-11-20'
    },
    {
        id: 6,
        author: 'Meera Patel',
        rating: 5,
        text: {
            en: 'Best bakery in the area. Fresh bread every morning and amazing sweets. Must visit!',
            mr: 'या भागातील सर्वोत्तम बेकरी. रोज सकाळी ताजी ब्रेड आणि अप्रतिम मिठाई. नक्की भेट द्या!'
        },
        date: '2024-11-15'
    }
];

export default function GoogleReviews() {
    const t = useTranslations('reviews');
    const locale = useLocale();
    const averageRating = 4.8; // Update with actual Google rating
    const totalReviews = 150; // Update with actual total reviews

    const [emblaRef, emblaApi] = useEmblaCarousel({
        loop: true,
        align: 'start',
        slidesToScroll: 1,
    });

    const scrollPrev = useCallback(() => {
        if (emblaApi) emblaApi.scrollPrev();
    }, [emblaApi]);

    const scrollNext = useCallback(() => {
        if (emblaApi) emblaApi.scrollNext();
    }, [emblaApi]);

    return (
        <section className="py-16 sm:py-20 lg:py-24 bg-white dark:bg-zinc-900">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center mb-12">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-3xl sm:text-4xl lg:text-5xl font-bold text-zinc-900 dark:text-zinc-50 mb-4"
                    >
                        {t('title')}
                    </motion.h2>

                    {/* Overall Rating */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="flex items-center justify-center gap-4 mb-2"
                    >
                        <div className="flex items-center">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <Star
                                    key={star}
                                    className={`w-6 h-6 ${star <= Math.floor(averageRating)
                                        ? 'fill-amber-500 text-amber-500'
                                        : star - 0.5 <= averageRating
                                            ? 'fill-amber-500/50 text-amber-500'
                                            : 'fill-zinc-300 text-zinc-300 dark:fill-zinc-600 dark:text-zinc-600'
                                        }`}
                                />
                            ))}
                        </div>
                        <span className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
                            {averageRating}
                        </span>
                    </motion.div>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-zinc-600 dark:text-zinc-400"
                    >
                        {t('based_on')} {totalReviews} {t('google_reviews')}
                    </motion.p>
                </div>

                {/* Carousel Container */}
                <div className="relative px-1">
                    {/* Carousel Viewport */}
                    <div className="overflow-hidden -mx-3" ref={emblaRef}>
                        <div className="flex">
                            {reviews.map((review, index) => (
                                <motion.div
                                    key={review.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    className="flex-[0_0_100%] min-w-0 sm:flex-[0_0_50%] lg:flex-[0_0_33.333%] px-3"
                                >
                                    <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-zinc-800 dark:to-zinc-800/50 rounded-2xl shadow-lg p-6 h-full hover:shadow-xl transition-shadow duration-300 border border-zinc-200 dark:border-zinc-700">
                                        {/* Rating Stars */}
                                        <div className="flex items-center mb-3">
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <Star
                                                    key={star}
                                                    className={`w-5 h-5 ${star <= review.rating
                                                        ? 'fill-amber-500 text-amber-500'
                                                        : 'fill-zinc-300 text-zinc-300 dark:fill-zinc-600 dark:text-zinc-600'
                                                        }`}
                                                />
                                            ))}
                                        </div>

                                        {/* Review Text */}
                                        <p className="text-zinc-700 dark:text-zinc-300 mb-4 line-clamp-4 min-h-[6rem]">
                                            &ldquo;{locale === 'mr' ? review.text.mr : review.text.en}&rdquo;
                                        </p>

                                        {/* Author Info */}
                                        <div className="border-t border-zinc-300 dark:border-zinc-600 pt-4">
                                            <p className="font-semibold text-zinc-900 dark:text-zinc-50">{review.author}</p>
                                            <p className="text-sm text-zinc-500 dark:text-zinc-400">
                                                {new Date(review.date).toLocaleDateString(locale, {
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric'
                                                })}
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Navigation Buttons */}
                    <button
                        onClick={scrollPrev}
                        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 sm:-translate-x-6 w-12 h-12 bg-white dark:bg-zinc-800 rounded-full shadow-lg flex items-center justify-center hover:bg-amber-50 dark:hover:bg-zinc-700 transition-colors duration-300 border border-zinc-200 dark:border-zinc-700 z-10"
                        aria-label="Previous reviews"
                    >
                        <ChevronLeft className="w-6 h-6 text-zinc-900 dark:text-zinc-50" />
                    </button>
                    <button
                        onClick={scrollNext}
                        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 sm:translate-x-6 w-12 h-12 bg-white dark:bg-zinc-800 rounded-full shadow-lg flex items-center justify-center hover:bg-amber-50 dark:hover:bg-zinc-700 transition-colors duration-300 border border-zinc-200 dark:border-zinc-700 z-10"
                        aria-label="Next reviews"
                    >
                        <ChevronRight className="w-6 h-6 text-zinc-900 dark:text-zinc-50" />
                    </button>
                </div>

                {/* Google Reviews Link */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="text-center mt-12"
                >
                    <a
                        href="https://www.google.com/search?q=gurudev+bakery+belwandi"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-3 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50 px-8 py-4 rounded-full font-semibold hover:shadow-xl transition-all duration-300 border-2 border-zinc-200 dark:border-zinc-700 hover:border-amber-500 dark:hover:border-amber-500"
                    >
                        <svg className="w-5 h-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                        </svg>
                        {t('view_all_reviews')}
                    </a>
                </motion.div>
            </div>
        </section>
    );
}
