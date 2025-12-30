'use client';

import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import { Link } from '@/i18n/routing';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { formatPrice } from '@/lib/utils';

// Mock featured products data - will be replaced with CMS data later
const mockProducts = [
    {
        id: 1,
        name: 'Chocolate Cake',
        nameMr: 'चॉकलेट केक',
        price: 350,
        image: '/images/placeholder-cake.jpg',
    },
    {
        id: 2,
        name: 'Fresh Bread',
        nameMr: 'ताजी ब्रेड',
        price: 40,
        image: '/images/placeholder-bread.jpg',
    },
    {
        id: 3,
        name: 'Cookies',
        nameMr: 'कुकीज',
        price: 150,
        image: '/images/placeholder-cookies.jpg',
    },
    {
        id: 4,
        name: 'Pastries',
        nameMr: 'पेस्ट्री',
        price: 80,
        image: '/images/placeholder-pastry.jpg',
    },
];

export default function FeaturedProducts() {
    const t = useTranslations('home');
    const tProduct = useTranslations('product');
    const tCommon = useTranslations('common'); const locale = useLocale();
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5 },
        },
    };

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
                        {t('featured_title')}
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-lg text-zinc-600 dark:text-zinc-400"
                    >
                        {t('featured_subtitle')}
                    </motion.p>
                </div>

                {/* Products Grid */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
                >
                    {mockProducts.map((product) => (
                        <motion.div
                            key={product.id}
                            variants={itemVariants}
                            whileHover={{ y: -8 }}
                            className="group bg-zinc-50 dark:bg-zinc-800 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
                        >
                            {/* Product Image */}
                            <div className="relative aspect-square bg-zinc-200 dark:bg-zinc-700 overflow-hidden">
                                {/* Actual product image */}
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="absolute inset-0 w-full h-full object-cover"
                                    onLoad={(e) => {
                                        const target = e.target as HTMLImageElement;
                                        const fallback = target.parentElement?.querySelector('.fallback-placeholder') as HTMLElement;
                                        if (fallback) fallback.classList.add('hidden');
                                    }}
                                    onError={(e) => {
                                        const target = e.target as HTMLImageElement;
                                        target.classList.add('hidden');
                                        const fallback = target.parentElement?.querySelector('.fallback-placeholder') as HTMLElement;
                                        if (fallback) fallback.classList.remove('hidden');
                                    }}
                                />

                                {/* Fallback placeholder gradient */}
                                <div className="fallback-placeholder absolute inset-0 bg-gradient-to-br from-amber-200 to-orange-300 dark:from-amber-600 dark:to-orange-700">
                                    {tProduct('featured')}
                                </div>
                            </div>

                            {/* Product Info */}
                            <div className="p-4 sm:p-5">
                                <h3 className="text-lg sm:text-xl font-semibold text-zinc-900 dark:text-zinc-50 mb-2 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                                    {product.name}
                                </h3>
                                <div className="flex items-center justify-between mb-4">
                                    <span className="text-xl sm:text-2xl font-bold text-amber-600 dark:text-amber-400">
                                        {tCommon('currency')}{formatPrice(product.price, locale)}
                                    </span>
                                </div>
                                <Link
                                    href={`/menu/${product.id}`}
                                    className="inline-flex items-center gap-2 text-amber-600 dark:text-amber-400 font-medium hover:gap-3 transition-all duration-300"
                                >
                                    {tProduct('view_details')}
                                    <ArrowRight className="w-4 h-4" />
                                </Link>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* View All Products Button */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="text-center mt-12"
                >
                    <Link
                        href="/menu"
                        className="inline-flex items-center gap-2 px-8 py-3 bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-100 dark:hover:bg-zinc-200 text-white dark:text-zinc-900 font-semibold rounded-full transition-all duration-300 transform hover:scale-105"
                    >
                        {tProduct('view_all')}
                        <ArrowRight className="w-5 h-5" />
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}
