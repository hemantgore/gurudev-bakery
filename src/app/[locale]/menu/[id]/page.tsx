'use client';

import { useParams } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { products } from '@/lib/products';
import { motion } from 'framer-motion';
import { ArrowLeft, ShoppingCart } from 'lucide-react';
import { Link } from '@/i18n/routing';
import ProductCard from '@/components/common/ProductCard';
import { formatPrice } from '@/lib/utils';
import { getProductSchema, getBreadcrumbSchema } from '@/lib/structured-data';
import { useEffect } from 'react';
import ParallaxImage from '@/components/motion/ParallaxImage';
import TiltCard from '@/components/motion/TiltCard';
import RevealOnScroll from '@/components/motion/RevealOnScroll';
import SplitText from '@/components/motion/SplitText';
import MagneticButton from '@/components/motion/MagneticButton';
import Footer from '@/components/layout/Footer';

export default function ProductDetailPage() {
    const params = useParams();
    const locale = useLocale();
    const t = useTranslations('product');
    const tMenu = useTranslations('menu');

    const productId = parseInt(params.id as string);
    const product = products.find((p) => p.id === productId);

    const productName = locale === 'mr' ? product?.nameMr : product?.name;
    const productDescription = locale === 'mr' ? product?.descriptionMr : product?.description;

    useEffect(() => {
        if (!product) return;
        const productSchema = getProductSchema({
            name: productName || '',
            description: productDescription || '',
            price: product.price,
            image: product.image,
        });
        const breadcrumbSchema = getBreadcrumbSchema([
            { name: 'Home', url: '/' },
            { name: 'Menu', url: '/menu' },
            { name: productName || '', url: `/menu/${product.id}` },
        ]);
        const s1 = document.createElement('script');
        s1.type = 'application/ld+json';
        s1.text = JSON.stringify(productSchema);
        document.head.appendChild(s1);
        const s2 = document.createElement('script');
        s2.type = 'application/ld+json';
        s2.text = JSON.stringify(breadcrumbSchema);
        document.head.appendChild(s2);
        return () => {
            document.head.removeChild(s1);
            document.head.removeChild(s2);
        };
    }, [product, productName, productDescription]);

    if (!product) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-zinc-950 text-white">
                <div className="text-center">
                    <h1 className="font-display text-5xl mb-6">{t('not_found')}</h1>
                    <Link href="/menu" className="text-amber-400 hover:text-amber-300 transition-colors uppercase tracking-widest text-sm">
                        ← {t('back_to_menu')}
                    </Link>
                </div>
            </div>
        );
    }

    const relatedProducts = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);

    return (
        <>
            <article className="bg-stone-50 dark:bg-zinc-950">
                {/* Top: bold hero with image + info */}
                <section className="relative pt-32 pb-24 sm:pb-32 overflow-hidden">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <Link href="/menu" className="inline-flex items-center gap-2 text-sm uppercase tracking-[0.25em] text-zinc-600 dark:text-zinc-400 hover:text-amber-600 dark:hover:text-amber-400 transition-colors mb-12">
                            <ArrowLeft className="w-4 h-4" />
                            {t('back_to_menu')}
                        </Link>

                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                            {/* Image - left, asymmetric */}
                            <div className="lg:col-span-7">
                                <TiltCard className="rounded-[2rem] overflow-hidden" intensity={4}>
                                    <ParallaxImage
                                        src={product.image}
                                        alt={productName || ''}
                                        className="aspect-[5/6] w-full"
                                        intensity={50}
                                        priority
                                        sizes="(max-width: 1024px) 100vw, 60vw"
                                    />
                                </TiltCard>
                            </div>

                            {/* Info - right, sticky */}
                            <div className="lg:col-span-5">
                                <div className="lg:sticky lg:top-32">
                                    <div className="text-xs uppercase tracking-[0.35em] text-amber-700 dark:text-amber-400 mb-4">
                                        {tMenu(`categories.${product.category}`)}
                                    </div>
                                    <SplitText
                                        as="h1"
                                        text={productName || ''}
                                        className="font-display text-5xl sm:text-6xl md:text-7xl font-medium leading-[0.95] tracking-tight text-zinc-950 dark:text-zinc-50 text-balance mb-6"
                                    />

                                    <p className="text-lg text-zinc-700 dark:text-zinc-300 leading-relaxed mb-10">
                                        {productDescription}
                                    </p>

                                    <div className="flex items-baseline gap-6 mb-10 pb-10 border-b border-zinc-200 dark:border-zinc-800">
                                        <span className="font-display font-medium text-7xl text-zinc-950 dark:text-amber-400 leading-none">
                                            {formatPrice(product.price, locale)}
                                        </span>
                                        <span className="text-sm uppercase tracking-[0.25em] text-zinc-500 dark:text-zinc-400">{t('fresh_baked')} · {t('daily')}</span>
                                    </div>

                                    <div className="space-y-4 mb-10 text-sm">
                                        <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-3">
                                            <span className="uppercase tracking-[0.25em] text-zinc-500 dark:text-zinc-400">{t('availability')}</span>
                                            <span className="font-medium text-emerald-700 dark:text-emerald-400">● {t('in_stock')}</span>
                                        </div>
                                        <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-3">
                                            <span className="uppercase tracking-[0.25em] text-zinc-500 dark:text-zinc-400">{t('category')}</span>
                                            <span className="font-medium text-zinc-900 dark:text-zinc-100">{tMenu(`categories.${product.category}`)}</span>
                                        </div>
                                    </div>

                                    <MagneticButton as="a" href="tel:+918380060631" className="inline-flex items-center justify-center gap-3 w-full px-8 py-5 bg-zinc-950 hover:bg-zinc-800 dark:bg-amber-500 dark:hover:bg-amber-400 text-white dark:text-zinc-950 font-semibold rounded-full text-lg transition-colors">
                                        <ShoppingCart className="w-5 h-5" />
                                        {t('order_now')}
                                    </MagneticButton>
                                    <p className="mt-4 text-xs text-center uppercase tracking-[0.25em] text-zinc-500 dark:text-zinc-400">{t('contact_for_order')}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Related */}
                {relatedProducts.length > 0 && (
                    <section className="bg-zinc-950 text-zinc-100 py-24 sm:py-32">
                        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                            <RevealOnScroll className="mb-12">
                                <div className="text-xs uppercase tracking-[0.35em] text-amber-400 mb-4">— More from {tMenu(`categories.${product.category}`)}</div>
                                <SplitText
                                    as="h2"
                                    text={t('related_products')}
                                    className="font-display text-4xl sm:text-5xl md:text-6xl font-medium leading-tight"
                                />
                            </RevealOnScroll>
                            <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                                {relatedProducts.map((rp, i) => (
                                    <motion.div
                                        key={rp.id}
                                        initial={{ opacity: 0, y: 30 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.5, delay: i * 0.08 }}
                                    >
                                        <ProductCard product={rp} />
                                    </motion.div>
                                ))}
                            </motion.div>
                        </div>
                    </section>
                )}
            </article>
            <Footer />
        </>
    );
}
