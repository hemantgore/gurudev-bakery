'use client';

import { useParams } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { products } from '@/lib/products';
import { motion } from 'framer-motion';
import { ArrowLeft, ShoppingCart, Tag } from 'lucide-react';
import { Link } from '@/i18n/routing';
import Image from 'next/image';
import ProductCard from '@/components/common/ProductCard';
import { formatPrice } from '@/lib/utils';
import { getProductSchema, getBreadcrumbSchema } from '@/lib/structured-data';
import { useEffect } from 'react';

export default function ProductDetailPage() {
    const params = useParams();
    const locale = useLocale();
    const t = useTranslations('product');
    const tMenu = useTranslations('menu');

    const productId = parseInt(params.id as string);
    const product = products.find((p) => p.id === productId);

    const productName = locale === 'mr' ? product?.nameMr : product?.name;
    const productDescription = locale === 'mr' ? product?.descriptionMr : product?.description;

    if (!product) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-3xl font-bold mb-4">
                        {t('not_found')}
                    </h1>
                    <Link
                        href="/menu"
                        className="text-amber-600 hover:text-amber-700 transition-colors"
                    >
                        {t('back_to_menu')}
                    </Link>
                </div>
            </div>
        );
    }

    // Get related products from the same category
    const relatedProducts = products
        .filter((p) => p.category === product.category && p.id !== product.id)
        .slice(0, 4);

    // Add structured data to page
    useEffect(() => {
        if (product) {
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

            // Add schemas to head
            const script1 = document.createElement('script');
            script1.type = 'application/ld+json';
            script1.text = JSON.stringify(productSchema);
            document.head.appendChild(script1);

            const script2 = document.createElement('script');
            script2.type = 'application/ld+json';
            script2.text = JSON.stringify(breadcrumbSchema);
            document.head.appendChild(script2);

            return () => {
                document.head.removeChild(script1);
                document.head.removeChild(script2);
            };
        }
    }, [product, productName, productDescription]);

    return (
        <div className="min-h-screen bg-gradient-to-b from-zinc-50 to-white dark:from-zinc-950 dark:to-zinc-900">
            <div className="container mx-auto px-4 py-8 max-w-7xl">
                {/* Back Button */}
                <Link
                    href="/menu"
                    className="inline-flex items-center gap-2 text-zinc-600 dark:text-zinc-400 hover:text-amber-600 dark:hover:text-amber-400 transition-colors mb-8"
                >
                    <ArrowLeft className="w-5 h-5" />
                    {t('back_to_menu')}
                </Link>

                {/* Product Detail Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16"
                >
                    {/* Product Image */}
                    <div className="relative aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-amber-100 to-orange-100 dark:from-amber-900/20 dark:to-orange-900/20">
                        <Image
                            src={product.image}
                            alt={productName || ''}
                            fill
                            sizes="(max-width: 1024px) 100vw, 50vw"
                            className="object-cover"
                            priority
                        />

                        {product.featured && (
                            <div className="absolute top-4 right-4 bg-amber-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                                {t('featured')}
                            </div>
                        )}
                    </div>

                    {/* Product Info */}
                    <div className="flex flex-col justify-center">
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        >
                            {/* Category Badge */}
                            <div className="flex items-center gap-2 mb-4">
                                <Tag className="w-4 h-4 text-amber-600" />
                                <span className="text-sm font-medium text-amber-600 dark:text-amber-400 uppercase tracking-wide">
                                    {tMenu(`categories.${product.category}`)}
                                </span>
                            </div>

                            {/* Product Name */}
                            <h1 className="text-4xl lg:text-5xl font-bold text-zinc-900 dark:text-zinc-50 mb-4">
                                {locale === 'mr' ? product.nameMr : product.name}
                            </h1>

                            {/* Product Description */}
                            <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-8 leading-relaxed">
                                {locale === 'mr'
                                    ? product.descriptionMr
                                    : product.description}
                            </p>

                            {/* Price */}
                            <div className="mb-8">
                                <div className="flex items-baseline gap-2">
                                    <span className="text-sm text-zinc-500 dark:text-zinc-400">
                                        {t('price')}:
                                    </span>
                                    <span className="text-3xl font-bold text-amber-600 dark:text-amber-400">
                                        ₹{formatPrice(product.price, locale)}
                                    </span>
                                </div>
                            </div>

                            {/* Product Details */}
                            <div className="space-y-4 mb-8 p-6 bg-zinc-50 dark:bg-zinc-800/50 rounded-xl">
                                <h3 className="font-semibold text-zinc-900 dark:text-zinc-50 mb-3">
                                    {t('product_details')}
                                </h3>
                                <div className="space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
                                    <div className="flex justify-between">
                                        <span>{t('category')}:</span>
                                        <span className="font-medium">
                                            {tMenu(`categories.${product.category}`)}
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>{t('availability')}:</span>
                                        <span className="font-medium text-green-600 dark:text-green-400">
                                            {t('in_stock')}
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>{t('fresh_baked')}:</span>
                                        <span className="font-medium">
                                            {t('daily')}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* CTA Button */}
                            <a
                                href="tel:+918380060631"
                                className="w-full bg-amber-600 hover:bg-amber-700 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl"
                            >
                                <ShoppingCart className="w-5 h-5" />
                                {t('order_now')}
                            </a>

                            {/* Additional Info */}
                            <p className="mt-4 text-sm text-zinc-500 dark:text-zinc-400 text-center">
                                {t('contact_for_order')}
                            </p>
                        </motion.div>
                    </div>
                </motion.div>

                {/* Related Products Section */}
                {relatedProducts.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                    >
                        <h2 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50 mb-8">
                            {t('related_products')}
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {relatedProducts.map((relatedProduct) => (
                                <ProductCard
                                    key={relatedProduct.id}
                                    product={relatedProduct}
                                />
                            ))}
                        </div>
                    </motion.div>
                )}
            </div>
        </div>
    );
}
