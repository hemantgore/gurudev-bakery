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
        id: 20,
        name: 'Chocolate Cake',
        nameMr: 'चॉकलेट केक',
        price: 350,
        image: '/images/chocolate-cake.jpg',
    },
    {
        id: 8,
        name: 'Milk Bread',
        nameMr: 'मिल्क ब्रेड',
        price: 40,
        image: '/images/milk-bread.jpg',
    },
    {
        id: 1,
        name: 'Nargees Khari',
        nameMr: 'नर्गिस खारी',
        price: 25,
        image: '/images/nargees-khari.jpg',
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
                        <Link key={product.id} href={`/menu/${product.id}`}>
                            <motion.div
                                variants={itemVariants}
                                className="group bg-zinc-50 dark:bg-zinc-800 rounded-2xl overflow-hidden shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300 cursor-pointer"
                            >
                                {/* Product Image */}
                                <div className="relative aspect-square bg-zinc-200 dark:bg-zinc-700 overflow-hidden">
                                    <Image
                                        src={product.image}
                                        alt={locale === 'mr' ? product.nameMr : product.name}
                                        fill
                                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                                        className="object-cover"
                                        loading="lazy"
                                    />
                                </div>

                                {/* Product Info */}
                                <div className="p-4 sm:p-5">
                                    <h3 className="text-lg sm:text-xl font-semibold text-zinc-900 dark:text-zinc-50 mb-4 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                                        {locale === 'mr' ? product.nameMr : product.name}
                                    </h3>
                                    <div className="inline-flex items-center gap-2 text-amber-600 dark:text-amber-400 font-medium group-hover:gap-3 transition-all duration-300">
                                        {tProduct('view_details')}
                                        <ArrowRight className="w-4 h-4" />
                                    </div>
                                </div>
                            </motion.div>
                        </Link>
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
