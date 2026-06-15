'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { Heart, Award, Clock, ArrowRight } from 'lucide-react';
import ParallaxImage from '@/components/motion/ParallaxImage';
import RevealOnScroll from '@/components/motion/RevealOnScroll';
import SplitText from '@/components/motion/SplitText';

export default function AboutSnippet() {
    const t = useTranslations('home');

    const features = [
        { icon: Clock, title: t('fresh_daily'), description: t('fresh_daily_desc'), num: '01' },
        { icon: Award, title: t('quality_ingredients'), description: t('quality_ingredients_desc'), num: '02' },
        { icon: Heart, title: t('traditional_recipes'), description: t('traditional_recipes_desc'), num: '03' },
    ];

    return (
        <section className="relative bg-zinc-950 text-zinc-100 overflow-hidden">
            {/* Editorial quote band */}
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
                <div className="grid lg:grid-cols-12 gap-12 items-center">
                    <RevealOnScroll className="lg:col-span-6">
                        <ParallaxImage
                            src="/images/about-bakery.jpg"
                            alt={t('about_title')}
                            className="aspect-[4/5] rounded-[2rem] w-full"
                            intensity={60}
                            sizes="(max-width: 1024px) 100vw, 50vw"
                        />
                    </RevealOnScroll>

                    <div className="lg:col-span-6">
                        <div className="text-xs uppercase tracking-[0.35em] text-amber-400 mb-6">
                            — {t('about_title')}
                        </div>
                        <SplitText
                            as="h2"
                            text="Two decades. One oven. Endless love."
                            className="font-display text-5xl sm:text-6xl md:text-7xl font-medium leading-[0.95] tracking-tight text-balance mb-8"
                        />
                        <RevealOnScroll delay={0.2}>
                            <p className="text-lg text-zinc-300 leading-relaxed mb-10 max-w-xl">
                                {t('about_description')}
                            </p>
                            <Link
                                href="/about"
                                className="group inline-flex items-center gap-3 px-7 py-4 bg-amber-500 hover:bg-amber-400 text-zinc-950 font-semibold rounded-full transition-colors"
                            >
                                {t('about_cta')}
                                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                            </Link>
                        </RevealOnScroll>
                    </div>
                </div>

                {/* Why-choose-us as editorial numbered list */}
                <div className="mt-24 sm:mt-32 grid sm:grid-cols-3 gap-px bg-zinc-800 border border-zinc-800 rounded-3xl overflow-hidden">
                    {features.map((f, i) => (
                        <RevealOnScroll key={i} delay={i * 0.1}>
                            <div className="bg-zinc-950 p-8 sm:p-10 h-full flex flex-col">
                                <div className="flex items-center justify-between mb-8">
                                    <span className="font-display text-5xl text-amber-400/60">{f.num}</span>
                                    <f.icon className="w-7 h-7 text-amber-400" />
                                </div>
                                <h4 className="font-display text-2xl mb-3 leading-tight">{f.title}</h4>
                                <p className="text-zinc-400 text-sm leading-relaxed">{f.description}</p>
                            </div>
                        </RevealOnScroll>
                    ))}
                </div>
            </div>
        </section>
    );
}
