'use client';

import { useState, useMemo } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import ProductCard from '@/components/common/ProductCard';
import CategoryFilter from '@/components/common/CategoryFilter';
import SearchBar from '@/components/common/SearchBar';
import Footer from '@/components/layout/Footer';
import Marquee from '@/components/motion/Marquee';
import SplitText from '@/components/motion/SplitText';
import RevealOnScroll from '@/components/motion/RevealOnScroll';
import { products } from '@/lib/products';
import { PackageX } from 'lucide-react';

export default function MenuPage() {
    const t = useTranslations('menu');
    const tCat = useTranslations('menu.categories');
    const locale = useLocale();
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');

    const filteredProducts = useMemo(() => {
        return products.filter((product) => {
            const categoryMatch = selectedCategory === 'all' || product.category === selectedCategory;
            let searchMatch = true;
            if (searchQuery.trim()) {
                const query = searchQuery.toLowerCase();
                const name = locale === 'mr' ? product.nameMr : product.name;
                const description = locale === 'mr' ? product.descriptionMr : product.description;
                searchMatch = name.toLowerCase().includes(query) || description.toLowerCase().includes(query);
            }
            return categoryMatch && searchMatch;
        });
    }, [selectedCategory, searchQuery, locale]);

    return (
        <>
            {/* Dark editorial header */}
            <section className="relative bg-zinc-950 text-zinc-100 grain pt-32 pb-12 overflow-hidden">
                <div
                    aria-hidden
                    className="absolute -top-32 left-1/3 w-[600px] h-[600px] rounded-full opacity-25 blur-3xl"
                    style={{ background: 'radial-gradient(circle, #f59e0b, transparent 60%)' }}
                />
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-xs uppercase tracking-[0.35em] text-amber-400 mb-4">— {t('subtitle')}</div>
                    <SplitText
                        as="h1"
                        text={t('title')}
                        className="font-display text-6xl sm:text-7xl md:text-8xl font-medium leading-[0.9] tracking-tight text-balance max-w-4xl"
                    />
                    <div className="mt-10 max-w-2xl">
                        <SearchBar value={searchQuery} onChange={setSearchQuery} />
                    </div>
                </div>
                <div className="mt-10 border-y border-zinc-800 py-3 text-zinc-400">
                    <Marquee
                        items={['Cakes', 'Breads', 'Biscuits', 'Khari', 'Sweets', 'Pastries', 'Fresh Daily']}
                        speed="fast"
                    />
                </div>
            </section>

            {/* Filter & Grid */}
            <section className="relative bg-stone-50 dark:bg-zinc-900 py-12 sm:py-16 min-h-[60vh]">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="mb-10">
                        <CategoryFilter selectedCategory={selectedCategory} onCategoryChange={setSelectedCategory} />
                    </div>

                    <div className="flex items-center justify-between mb-10 text-sm uppercase tracking-[0.25em] text-zinc-500 dark:text-zinc-400">
                        <span>{tCat(selectedCategory)}</span>
                        <span>{t('showing_results', { count: filteredProducts.length })}</span>
                    </div>

                    {filteredProducts.length > 0 ? (
                        <motion.div
                            key={`${selectedCategory}-${searchQuery}`}
                            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8"
                        >
                            <AnimatePresence mode="popLayout">
                                {filteredProducts.map((product, i) => (
                                    <motion.div
                                        key={product.id}
                                        layout
                                        initial={{ opacity: 0, y: 30 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        transition={{ duration: 0.5, delay: Math.min(i * 0.04, 0.4), ease: [0.22, 1, 0.36, 1] }}
                                    >
                                        <ProductCard product={product} />
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </motion.div>
                    ) : (
                        <RevealOnScroll className="text-center py-24">
                            <motion.div
                                animate={{ rotate: [0, -8, 8, -4, 0] }}
                                transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                                className="inline-block mb-6"
                            >
                                <PackageX className="w-24 h-24 text-zinc-300 dark:text-zinc-700" />
                            </motion.div>
                            <h3 className="font-display text-3xl sm:text-4xl text-zinc-900 dark:text-zinc-50 mb-3">
                                {t('no_results')}
                            </h3>
                            <p className="text-zinc-600 dark:text-zinc-400 mb-6">
                                {t('no_results_desc')}
                            </p>
                            <button
                                onClick={() => {
                                    setSearchQuery('');
                                    setSelectedCategory('all');
                                }}
                                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-zinc-950 text-white dark:bg-amber-500 dark:text-zinc-950 text-sm uppercase tracking-widest"
                            >
                                {t('clear_filters')}
                            </button>
                        </RevealOnScroll>
                    )}
                </div>
            </section>

            <Footer />
        </>
    );
}
