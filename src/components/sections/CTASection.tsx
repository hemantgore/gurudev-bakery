'use client';

import { useTranslations, useLocale } from 'next-intl';
import { MapPin, Phone, Clock, ArrowRight } from 'lucide-react';
import MagneticButton from '@/components/motion/MagneticButton';
import RevealOnScroll from '@/components/motion/RevealOnScroll';
import SplitText from '@/components/motion/SplitText';

export default function CTASection() {
    const tContact = useTranslations('contact');
    const locale = useLocale();

    return (
        <section className="relative py-24 sm:py-32 bg-zinc-950 text-zinc-100 grain overflow-hidden">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <RevealOnScroll className="text-center max-w-4xl mx-auto mb-16">
                    <div className="text-xs uppercase tracking-[0.35em] text-amber-400 mb-4">— Visit Us</div>
                    <SplitText
                        as="h2"
                        text="Come say hello. We saved you a slice."
                        className="font-display text-5xl sm:text-6xl md:text-7xl font-medium leading-[0.95] tracking-tight text-balance"
                    />
                </RevealOnScroll>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    <RevealOnScroll delay={0.05}>
                        <div className="h-full p-8 rounded-3xl border border-zinc-800 bg-zinc-900/60 backdrop-blur-sm">
                            <MapPin className="w-7 h-7 text-amber-400 mb-6" />
                            <div className="text-xs uppercase tracking-[0.3em] text-zinc-400 mb-3">{tContact('address')}</div>
                            <p className="font-display text-xl leading-tight">{tContact('address_full')}</p>
                        </div>
                    </RevealOnScroll>
                    <RevealOnScroll delay={0.1}>
                        <div className="h-full p-8 rounded-3xl border border-zinc-800 bg-zinc-900/60 backdrop-blur-sm">
                            <Phone className="w-7 h-7 text-amber-400 mb-6" />
                            <div className="text-xs uppercase tracking-[0.3em] text-zinc-400 mb-3">{tContact('phone')}</div>
                            <a href={`tel:${tContact('phone_number').replace(/\s/g, '')}`} className="font-display text-xl hover:text-amber-400 transition-colors">
                                {tContact('phone_number')}
                            </a>
                        </div>
                    </RevealOnScroll>
                    <RevealOnScroll delay={0.15}>
                        <div className="h-full p-8 rounded-3xl border border-zinc-800 bg-zinc-900/60 backdrop-blur-sm">
                            <Clock className="w-7 h-7 text-amber-400 mb-6" />
                            <div className="text-xs uppercase tracking-[0.3em] text-zinc-400 mb-3">{tContact('hours')}</div>
                            <p className="font-display text-base leading-relaxed">{tContact('hours_weekdays')}</p>
                            <p className="font-display text-base leading-relaxed mt-1 text-zinc-400">{tContact('hours_sunday')}</p>
                        </div>
                    </RevealOnScroll>
                </div>

                <RevealOnScroll delay={0.2} className="mt-12 text-center">
                    <MagneticButton as="a" href={`/${locale}/contact`} className="inline-flex items-center gap-3 px-9 py-5 bg-amber-500 hover:bg-amber-400 text-zinc-950 font-semibold rounded-full text-lg transition-colors">
                        Get in Touch
                        <ArrowRight className="w-5 h-5" />
                    </MagneticButton>
                </RevealOnScroll>
            </div>
        </section>
    );
}
