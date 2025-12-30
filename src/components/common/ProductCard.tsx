'use client';

import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import { Link } from '@/i18n/routing';
import { ArrowRight } from 'lucide-react';
import type { Product } from '@/lib/products';
import { formatPrice } from '@/lib/utils';

interface ProductCardProps {
    product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
    const tProduct = useTranslations('product');
    const tCommon = useTranslations('common');
    const locale = useLocale();

    const productName = locale === 'mr' ? product.nameMr : product.name;
    const productDescription = locale === 'mr' ? product.descriptionMr : product.description;

    return (
        <Link href={`/menu/${product.id}`}>
            <motion.div
                whileHover={{ y: -8 }}
                className="group bg-white dark:bg-zinc-800 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer"
            >
                {/* Product Image */}
                <div className="relative aspect-square bg-zinc-200 dark:bg-zinc-700 overflow-hidden">
                    {/* Actual product image */}
                    <img
                        src={product.image}
                        alt={productName}
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
                        <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-6xl">
                                {product.category === 'cakes' && '🎂'}
                                {product.category === 'breads' && '🍞'}
                                {product.category === 'biscuits' && '🍪'}
                                {product.category === 'khari' && '🥟'}
                                {product.category === 'sweets' && '🧁'}
                            </span>
                        </div>
                    </div>

                    {/* Featured badge */}
                    {product.featured && (
                        <div className="absolute top-3 right-3 bg-amber-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
                            {tProduct('featured')}
                        </div>
                    )}
                </div>

                {/* Product Info */}
                <div className="p-4 sm:p-5">
                    <h3 className="text-lg sm:text-xl font-semibold text-zinc-900 dark:text-zinc-50 mb-2 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors line-clamp-1">
                        {productName}
                    </h3>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-3 line-clamp-2">
                        {productDescription}
                    </p>
                    <div className="flex items-center justify-between mb-4">
                        <span className="text-xl sm:text-2xl font-bold text-amber-600 dark:text-amber-400">
                            {tCommon('currency')}{formatPrice(product.price, locale)}
                        </span>
                    </div>
                    <div className="inline-flex items-center gap-2 text-amber-600 dark:text-amber-400 font-medium group-hover:gap-3 transition-all duration-300">
                        {tProduct('view_details')}
                        <ArrowRight className="w-4 h-4" />
                    </div>
                </div>
            </motion.div>
        </Link>
    );
}
