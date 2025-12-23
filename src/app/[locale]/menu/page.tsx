'use client';

import { useState, useMemo } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import ProductCard from '@/components/common/ProductCard';
import CategoryFilter from '@/components/common/CategoryFilter';
import SearchBar from '@/components/common/SearchBar';
import Footer from '@/components/layout/Footer';
import { products } from '@/lib/products';
import { PackageX } from 'lucide-react';

export default function MenuPage() {
    const t = useTranslations('menu');
    const locale = useLocale();
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');

    // Filter products based on category and search
    const filteredProducts = useMemo(() => {
        return products.filter((product) => {
            // Filter by category
            const categoryMatch = selectedCategory === 'all' || product.category === selectedCategory;

            // Filter by search query
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
        <>
            <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900 pt-24 pb-16">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Page Header */}
                    <div className="text-center mb-12">
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-zinc-900 dark:text-zinc-50 mb-4"
                        >
                            {t('title')}
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="text-lg text-zinc-600 dark:text-zinc-400 mb-8"
                        >
                            {t('subtitle')}
                        </motion.p>

                        {/* Search Bar */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="mb-8"
                        >
                            <SearchBar value={searchQuery} onChange={setSearchQuery} />
                        </motion.div>

                        {/* Category Filter */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                        >
                            <CategoryFilter
                                selectedCategory={selectedCategory}
                                onCategoryChange={setSelectedCategory}
                            />
                        </motion.div>
                    </div>

                    {/* Results Count and Clear Filters */}
                    <div className="flex justify-center items-center gap-4 mb-6">
                        {(searchQuery || selectedCategory !== 'all') && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="flex items-center gap-4"
                            >
                                <p className="text-zinc-600 dark:text-zinc-400">
                                    {t('showing_results', { count: filteredProducts.length })}
                                </p>
                                {filteredProducts.length === 0 && (
                                    <button
                                        onClick={() => {
                                            setSearchQuery('');
                                            setSelectedCategory('all');
                                        }}
                                        className="text-sm px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-full transition-colors"
                                    >
                                        {t('clear_filters')}
                                    </button>
                                )}
                            </motion.div>
                        )}
                    </div>

                    {/* Products Grid */}
                    {filteredProducts.length > 0 ? (
                        <motion.div
                            key={`${selectedCategory}-${searchQuery}`}
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8"
                        >
                            {filteredProducts.map((product) => (
                                <motion.div key={product.id} variants={itemVariants}>
                                    <ProductCard product={product} />
                                </motion.div>
                            ))}
                        </motion.div>
                    ) : (
                        // No Results
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5 }}
                            className="text-center py-16"
                        >
                            <PackageX className="w-20 h-20 mx-auto mb-4 text-zinc-300 dark:text-zinc-700" />
                            <h3 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50 mb-2">
                                {t('no_results')}
                            </h3>
                            <p className="text-zinc-600 dark:text-zinc-400">
                                {t('no_results_desc')}
                            </p>
                        </motion.div>
                    )}
                </div>
            </div>

            <Footer />
        </>
    );
}
