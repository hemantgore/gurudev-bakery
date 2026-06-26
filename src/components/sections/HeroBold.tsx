'use client';

import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import { Link } from '@/i18n/routing';
import { ArrowRight } from 'lucide-react';
import dynamic from 'next/dynamic';
import Marquee from '@/components/motion/Marquee';
import MagneticButton from '@/components/motion/MagneticButton';

const HeroShowcase = dynamic(() => import('@/components/3d/HeroShowcase'), {
    ssr: false,
    loading: () => (
        <div
            className="absolute inset-0 rounded-full bg-zinc-950"
            style={{
                background:
                    'radial-gradient(circle at 50% 55%, rgba(245,158,11,0.35), rgba(10,10,10,0) 60%)',
            }}
        />
    ),
});

export default function HeroBold() {
    const t = useTranslations('home');
    const locale = useLocale();

    return (
        <section className="relative min-h-[100svh] grain bg-zinc-950 text-zinc-100 overflow-hidden">
            {/* Ambient radial accent */}
            <div
                aria-hidden
                className="absolute -top-32 -right-32 w-[700px] h-[700px] rounded-full opacity-30 blur-3xl"
                style={{ background: 'radial-gradient(circle, #f59e0b, transparent 60%)' }}
            />
            <div
                aria-hidden
                className="absolute -bottom-40 -left-40 w-[600px] h-[600px] rounded-full opacity-20 blur-3xl"
                style={{ background: 'radial-gradient(circle, #fbbf24, transparent 60%)' }}
            />

            <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24 min-h-[100svh] flex flex-col">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center flex-1">
                    {/* Headline */}
                    <div className="lg:col-span-7 order-2 lg:order-1">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="text-xs uppercase tracking-[0.4em] text-amber-400/80 mb-6"
                        >
                            {t('hero_subtitle')}
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.6 }}
                            className="font-display font-medium leading-[0.95] tracking-tight text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-balance"
                        >
                            {locale === 'mr' ? (
                                <>
                                    <span className="block">उत्कृष्ट दर्जा,</span>
                                    <span className="block">
                                        <em className="text-amber-400 not-italic">अप्रतिम चव...</em>
                                    </span>
                                    <span className="block">विश्वासाचं</span>
                                    <span className="block font-light">हेच दुसरं नाव!</span>
                                </>
                            ) : (
                                <>
                                    <span className="block">Premium Quality,</span>
                                    <span className="block">
                                        <em className="text-amber-400 not-italic font-display italic">Exceptional Taste...</em>
                                    </span>
                                    <span className="block">A Brand You </span>
                                    <span className="block italic font-light">Can Trust!</span>
                                </>
                            )}
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.4 }}
                            className="mt-8 max-w-xl text-base sm:text-lg text-zinc-300/90"
                        >
                            {t('hero_description')}
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.6 }}
                            className="mt-10 flex flex-wrap items-center gap-4"
                        >
                            <MagneticButton as="a" href={`/${locale}/menu`} className="inline-flex items-center gap-3 px-7 py-4 bg-amber-500 hover:bg-amber-400 text-zinc-950 font-semibold rounded-full transition-colors">
                                <span>{t('cta_button')}</span>
                                <ArrowRight className="w-5 h-5" />
                            </MagneticButton>
                            <Link
                                href="/about"
                                className="inline-flex items-center gap-2 px-6 py-4 border border-zinc-700 hover:border-zinc-500 rounded-full text-sm uppercase tracking-widest transition-colors"
                            >
                                Our Story
                            </Link>
                        </motion.div>
                    </div>

                    {/* Cake showcase */}
                    <div className="lg:col-span-5 order-1 lg:order-2 relative">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.92 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1.1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                            className="relative aspect-square w-full max-w-[520px] mx-auto rounded-full"
                        >
                            <HeroShowcase />
                        </motion.div>
                    </div>
                </div>

                {/* Bottom marquee */}
                <div className="mt-10 border-t border-zinc-800 pt-6 text-zinc-400">
                    <Marquee
                        items={['Fresh Daily', 'Artisan Baked', 'Since 2000', 'Belwandi, Maharashtra', '4.8 ★ Rated']}
                        speed="slow"
                    />
                </div>
            </div>
        </section>
    );
}
