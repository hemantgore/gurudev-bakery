'use client';

import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/routing';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import type { Product } from '@/lib/products';
import { formatPrice } from '@/lib/utils';
import TiltCard from '@/components/motion/TiltCard';

interface ProductCardProps {
    product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
    const tProduct = useTranslations('product');
    const locale = useLocale();

    const productName = locale === 'mr' ? product.nameMr : product.name;
    const productDescription = locale === 'mr' ? product.descriptionMr : product.description;

    return (
        <Link href={`/menu/${product.id}`} className="block">
            <TiltCard className="group rounded-3xl overflow-hidden bg-white dark:bg-zinc-900 border border-zinc-200/70 dark:border-zinc-800 shadow-[0_4px_24px_-12px_rgba(0,0,0,0.15)] transition-shadow duration-500 hover:shadow-[0_20px_60px_-20px_rgba(0,0,0,0.25)]" intensity={6}>
                {/* Image */}
                <div className="relative aspect-[4/5] bg-zinc-100 dark:bg-zinc-800 overflow-hidden">
                    <Image
                        src={product.image}
                        alt={productName}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    {product.featured && (
                        <div className="absolute top-3 left-3 inline-flex items-center gap-1 px-3 py-1 rounded-full bg-zinc-950/80 backdrop-blur-md text-amber-400 text-xs font-medium uppercase tracking-[0.2em]">
                            <span aria-hidden>★</span> {tProduct('featured')}
                        </div>
                    )}

                    <div className="absolute bottom-3 right-3 px-3 py-1.5 rounded-full bg-white/95 dark:bg-zinc-950/90 backdrop-blur-md text-sm font-display font-semibold text-zinc-900 dark:text-amber-400">
                        {formatPrice(product.price, locale)}
                    </div>
                </div>

                {/* Info */}
                <div className="p-5 sm:p-6">
                    <div className="text-xs uppercase tracking-[0.25em] text-zinc-500 dark:text-zinc-400 mb-2">
                        {product.category}
                    </div>
                    <h3 className="font-display text-xl sm:text-2xl text-zinc-950 dark:text-zinc-50 leading-tight mb-2 line-clamp-1 transition-all duration-300 group-hover:italic group-hover:text-amber-700 dark:group-hover:text-amber-400">
                        {productName}
                    </h3>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400 line-clamp-2 mb-4">
                        {productDescription}
                    </p>
                    <div className="inline-flex items-center gap-2 text-sm font-medium text-zinc-900 dark:text-zinc-100 transition-all duration-300 group-hover:gap-3">
                        {tProduct('view_details')}
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </div>
                </div>
            </TiltCard>
        </Link>
    );
}
