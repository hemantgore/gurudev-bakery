'use client';

import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/routing';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { formatPrice } from '@/lib/utils';
import RevealOnScroll from '@/components/motion/RevealOnScroll';
import SplitText from '@/components/motion/SplitText';
import TiltCard from '@/components/motion/TiltCard';
import { BentoGrid, BentoCell } from '@/components/motion/BentoGrid';

const featured = [
    { id: 20, name: 'Chocolate Cake', nameMr: 'चॉकलेट केक', price: 350, image: '/images/chocolate-cake.jpg', span: 'lg' as const, tagline: 'Signature' },
    { id: 22, name: 'Black Forest', nameMr: 'ब्लॅक फॉरेस्ट केक', price: 400, image: '/images/black-forest.jpg', span: 'md' as const, tagline: 'Best Seller' },
    { id: 8, name: 'Milk Bread', nameMr: 'मिल्क ब्रेड', price: 40, image: '/images/milk-bread.jpg', span: 'sm' as const, tagline: 'Daily Fresh' },
    { id: 1, name: 'Nargees Khari', nameMr: 'नर्गिस खारी', price: 25, image: '/images/nargees-khari.jpg', span: 'sm' as const, tagline: 'House Special' },
    { id: 13, name: 'Cream Roll', nameMr: 'क्रीम रोल', price: 45, image: '/images/cream-roll.jpg', span: 'md' as const, tagline: 'Crowd Favorite' },
];

export default function FeaturedProducts() {
    const t = useTranslations('home');
    const tProduct = useTranslations('product');
    const locale = useLocale();

    return (
        <section className="relative py-24 sm:py-32 bg-stone-50 dark:bg-zinc-950">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <RevealOnScroll>
                    <div className="flex items-end justify-between flex-wrap gap-6 mb-14">
                        <div className="max-w-2xl">
                            <div className="text-xs uppercase tracking-[0.35em] text-amber-700 dark:text-amber-400 mb-4">
                                — {t('featured_subtitle')}
                            </div>
                            <SplitText
                                as="h2"
                                text={t('featured_title')}
                                className="font-display text-5xl sm:text-6xl md:text-7xl font-medium leading-[0.95] tracking-tight text-zinc-950 dark:text-zinc-50 text-balance"
                            />
                        </div>
                        <Link
                            href="/menu"
                            className="group inline-flex items-center gap-3 text-sm uppercase tracking-[0.25em] text-zinc-950 dark:text-zinc-50"
                        >
                            {tProduct('view_all')}
                            <span className="w-10 h-px bg-current transition-all duration-300 group-hover:w-16" />
                            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                        </Link>
                    </div>
                </RevealOnScroll>

                <BentoGrid>
                    {featured.map((p, i) => (
                        <BentoCell key={p.id} span={p.span}>
                            <RevealOnScroll delay={i * 0.08}>
                                <Link href={`/menu/${p.id}`} className="block h-full">
                                    <TiltCard className="group relative h-full min-h-[260px] overflow-hidden rounded-3xl bg-zinc-900" intensity={5}>
                                        <Image
                                            src={p.image}
                                            alt={locale === 'mr' ? p.nameMr : p.name}
                                            fill
                                            sizes="(max-width: 768px) 100vw, 50vw"
                                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/85 via-zinc-950/20 to-transparent" />
                                        <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-xs uppercase tracking-[0.25em] text-white">
                                            {p.tagline}
                                        </div>
                                        <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-amber-400 text-zinc-950 font-display font-semibold text-sm">
                                            {formatPrice(p.price, locale)}
                                        </div>
                                        <div className="absolute inset-x-0 bottom-0 p-6">
                                            <h3 className="font-display text-2xl sm:text-3xl text-white leading-tight mb-2 transition-all duration-300 group-hover:italic">
                                                {locale === 'mr' ? p.nameMr : p.name}
                                            </h3>
                                            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-amber-300 transition-all duration-300 group-hover:gap-3">
                                                {tProduct('view_details')}
                                                <ArrowRight className="w-4 h-4" />
                                            </div>
                                        </div>
                                    </TiltCard>
                                </Link>
                            </RevealOnScroll>
                        </BentoCell>
                    ))}
                </BentoGrid>
            </div>
        </section>
    );
}
