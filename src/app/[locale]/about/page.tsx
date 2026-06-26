'use client';

import { useTranslations } from 'next-intl';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Heart, Award, Users, Clock, Leaf, Shield } from 'lucide-react';
import { useRef } from 'react';
import Footer from '@/components/layout/Footer';
import ParallaxImage from '@/components/motion/ParallaxImage';
import RevealOnScroll from '@/components/motion/RevealOnScroll';
import SplitText from '@/components/motion/SplitText';
import TiltCard from '@/components/motion/TiltCard';
import { BentoGrid, BentoCell } from '@/components/motion/BentoGrid';
import Marquee from '@/components/motion/Marquee';

const values = [
    { icon: Heart, key: 'quality' as const },
    { icon: Leaf, key: 'fresh' as const },
    { icon: Users, key: 'community' as const },
    { icon: Award, key: 'excellence' as const },
    { icon: Clock, key: 'tradition' as const },
    { icon: Shield, key: 'trust' as const },
];

const team = ['member1', 'member2', 'member3', 'member4'] as const;

export default function AboutPage() {
    const t = useTranslations('about');
    const yearRef = useRef<HTMLDivElement | null>(null);
    const { scrollYProgress } = useScroll({ target: yearRef, offset: ['start end', 'end start'] });
    const yearX = useTransform(scrollYProgress, [0, 1], ['-30%', '30%']);

    return (
        <>
            {/* Hero */}
            <section className="relative pt-32 pb-20 bg-zinc-950 text-zinc-100 grain overflow-hidden">
                <div aria-hidden className="absolute top-32 right-1/4 w-[600px] h-[600px] rounded-full opacity-30 blur-3xl" style={{ background: 'radial-gradient(circle, #f59e0b, transparent 60%)' }} />
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-xs uppercase tracking-[0.35em] text-amber-400 mb-6">— About Gurudev Bakery</div>
                    <SplitText
                        as="h1"
                        text={t('hero_title')}
                        className="font-display text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-medium leading-[0.9] tracking-tight text-balance"
                    />
                    <RevealOnScroll delay={0.3} className="mt-10 max-w-2xl">
                        <p className="text-xl text-zinc-300 leading-relaxed">{t('hero_subtitle')}</p>
                    </RevealOnScroll>
                </div>
                <div className="mt-16 border-y border-zinc-800 py-3 text-zinc-500">
                    <Marquee items={['Est. 2000', 'Belwandi · Maharashtra', 'Handcrafted', 'Family-Run', '4.8 ★']} speed="slow" />
                </div>
            </section>

            {/* Story — scroll narrative with giant rotating year */}
            <section ref={yearRef} className="relative bg-stone-50 dark:bg-zinc-900 py-24 sm:py-32 overflow-hidden">
                <motion.div
                    aria-hidden
                    style={{ x: yearX }}
                    className="absolute inset-y-0 left-0 right-0 pointer-events-none flex items-center justify-center"
                >
                    <span className="font-display font-medium text-[28vw] leading-none text-zinc-200 dark:text-zinc-800/50 select-none">
                        2000
                    </span>
                </motion.div>
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="grid lg:grid-cols-12 gap-12 items-center">
                        <RevealOnScroll className="lg:col-span-5">
                            <ParallaxImage
                                src="/images/bakery-story.jpg"
                                alt={t('story_title')}
                                className="aspect-[4/5] rounded-[2rem] w-full"
                                intensity={60}
                            />
                        </RevealOnScroll>
                        <div className="lg:col-span-7">
                            <div className="text-xs uppercase tracking-[0.35em] text-amber-700 dark:text-amber-400 mb-4">— {t('story_title')}</div>
                            <SplitText
                                as="h2"
                                text="From small oven, to entire village."
                                className="font-display text-4xl sm:text-5xl md:text-6xl font-medium leading-[1] tracking-tight text-zinc-950 dark:text-zinc-50 text-balance mb-8"
                            />
                            <RevealOnScroll delay={0.2}>
                                <div className="space-y-5 text-lg text-zinc-700 dark:text-zinc-300 leading-relaxed">
                                    <p>{t('story_paragraph1')}</p>
                                    <p>{t('story_paragraph2')}</p>
                                    <p>{t('story_paragraph3')}</p>
                                </div>
                            </RevealOnScroll>
                        </div>
                    </div>
                </div>
            </section>

            {/* Mission — editorial pull quote */}
            <section className="bg-amber-400 text-zinc-950 py-24 sm:py-32 relative grain overflow-hidden">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <RevealOnScroll>
                        <div className="text-xs uppercase tracking-[0.35em] mb-6">— {t('mission_title')}</div>
                        <SplitText
                            as="p"
                            text={`"${t('mission_description')}"`}
                            className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium leading-[1.1] tracking-tight text-balance max-w-5xl italic"
                        />
                    </RevealOnScroll>
                </div>
            </section>

            {/* Values bento */}
            <section className="bg-zinc-950 text-zinc-100 py-24 sm:py-32">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <RevealOnScroll className="mb-12">
                        <div className="text-xs uppercase tracking-[0.35em] text-amber-400 mb-4">— {t('values_subtitle')}</div>
                        <SplitText
                            as="h2"
                            text={t('values_title')}
                            className="font-display text-5xl sm:text-6xl md:text-7xl font-medium leading-tight"
                        />
                    </RevealOnScroll>

                    <BentoGrid>
                        {values.map((v, i) => {
                            const Icon = v.icon;
                            const span = i === 0 ? 'md' : i === 3 ? 'md' : 'sm';
                            return (
                                <BentoCell key={v.key} span={span}>
                                    <RevealOnScroll delay={i * 0.05}>
                                        <TiltCard className="h-full min-h-[200px] p-8 rounded-3xl border border-zinc-800 bg-gradient-to-br from-zinc-900 to-zinc-950" intensity={5}>
                                            <Icon className="w-9 h-9 text-amber-400 mb-6" />
                                            <h3 className="font-display text-2xl mb-2 leading-tight">{t(`values.${v.key}.title`)}</h3>
                                            <p className="text-sm text-zinc-400 leading-relaxed">{t(`values.${v.key}.description`)}</p>
                                        </TiltCard>
                                    </RevealOnScroll>
                                </BentoCell>
                            );
                        })}
                    </BentoGrid>
                </div>
            </section>

            {/* Team */}
            <section className="bg-stone-50 dark:bg-zinc-900 py-24 sm:py-32">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <RevealOnScroll className="mb-16">
                        <div className="text-xs uppercase tracking-[0.35em] text-amber-700 dark:text-amber-400 mb-4">— {t('team_subtitle')}</div>
                        <SplitText
                            as="h2"
                            text={t('team_title')}
                            className="font-display text-5xl sm:text-6xl md:text-7xl font-medium leading-tight text-zinc-950 dark:text-zinc-50"
                        />
                    </RevealOnScroll>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {team.map((m, i) => (
                            <RevealOnScroll key={m} delay={i * 0.08}>
                                <TiltCard className="group h-full rounded-3xl overflow-hidden bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800" intensity={6}>
                                    <div className="relative aspect-[4/5] bg-gradient-to-br from-amber-100 to-amber-200 dark:from-amber-900/30 dark:to-zinc-800 overflow-hidden flex items-center justify-center">
                                        <span className="text-9xl transition-transform duration-700 group-hover:scale-110">👨‍🍳</span>
                                        <div className="absolute inset-x-0 bottom-0 p-5 bg-gradient-to-t from-zinc-950 via-zinc-950/60 to-transparent translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                                            <p className="text-sm text-zinc-200">{t(`team.${m}.bio`)}</p>
                                        </div>
                                    </div>
                                    <div className="p-5">
                                        <h3 className="font-display text-xl text-zinc-950 dark:text-zinc-50 leading-tight">{t(`team.${m}.name`)}</h3>
                                        <p className="text-xs uppercase tracking-[0.25em] text-amber-700 dark:text-amber-400 mt-1">{t(`team.${m}.role`)}</p>
                                    </div>
                                </TiltCard>
                            </RevealOnScroll>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </>
    );
}
