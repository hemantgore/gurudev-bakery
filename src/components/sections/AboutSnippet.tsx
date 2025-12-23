'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Link } from '@/i18n/routing';
import { Heart, Award, Clock } from 'lucide-react';

export default function AboutSnippet() {
    const t = useTranslations('home');

    const features = [
        {
            icon: Clock,
            title: t('fresh_daily'),
            description: t('fresh_daily_desc'),
        },
        {
            icon: Award,
            title: t('quality_ingredients'),
            description: t('quality_ingredients_desc'),
        },
        {
            icon: Heart,
            title: t('traditional_recipes'),
            description: t('traditional_recipes_desc'),
        },
    ];

    return (
        <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-amber-50 to-white dark:from-zinc-800 dark:to-zinc-900">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-6xl mx-auto">
                    {/* About Content */}
                    <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-16">
                        {/* Left: Image/Decoration */}
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="relative"
                        >
                            <div className="aspect-square bg-gradient-to-br from-amber-200 to-orange-300 dark:from-amber-600 dark:to-orange-700 rounded-3xl shadow-2xl flex items-center justify-center">
                                <span className="text-9xl">🥖</span>
                            </div>
                            {/* Decorative element */}
                            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-amber-300 dark:bg-amber-500 rounded-full opacity-20 blur-2xl" />
                        </motion.div>

                        {/* Right: Text Content */}
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-zinc-900 dark:text-zinc-50 mb-6">
                                {t('about_title')}
                            </h2>
                            <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-8 leading-relaxed">
                                {t('about_description')}
                            </p>
                            <Link
                                href="/about"
                                className="inline-flex items-center gap-2 px-6 py-3 bg-amber-600 hover:bg-amber-700 dark:bg-amber-500 dark:hover:bg-amber-600 text-white font-semibold rounded-full transition-all duration-300"
                            >
                                {t('about_cta')}
                            </Link>
                        </motion.div>
                    </div>

                    {/* Why Choose Us Section */}
                    <div className="mt-16">
                        <motion.h3
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="text-2xl sm:text-3xl font-bold text-center text-zinc-900 dark:text-zinc-50 mb-12"
                        >
                            {t('why_choose_title')}
                        </motion.h3>

                        <div className="grid sm:grid-cols-3 gap-8">
                            {features.map((feature, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6, delay: index * 0.2 }}
                                    className="text-center"
                                >
                                    <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-100 dark:bg-amber-900/30 rounded-full mb-4">
                                        <feature.icon className="w-8 h-8 text-amber-600 dark:text-amber-400" />
                                    </div>
                                    <h4 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50 mb-2">
                                        {feature.title}
                                    </h4>
                                    <p className="text-zinc-600 dark:text-zinc-400">
                                        {feature.description}
                                    </p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
