'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Heart, Award, Users, Clock, Leaf, Shield } from 'lucide-react';
import Footer from '@/components/layout/Footer';

export default function AboutPage() {
    const t = useTranslations('about');

    const fadeInUp = {
        hidden: { opacity: 0, y: 40 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6 },
        },
    };

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
            },
        },
    };

    const values = [
        {
            icon: Heart,
            key: 'quality',
        },
        {
            icon: Leaf,
            key: 'fresh',
        },
        {
            icon: Users,
            key: 'community',
        },
        {
            icon: Award,
            key: 'excellence',
        },
        {
            icon: Clock,
            key: 'tradition',
        },
        {
            icon: Shield,
            key: 'trust',
        },
    ];

    const team = [
        {
            key: 'member1',
            role: 'founder',
        },
        {
            key: 'member2',
            role: 'head_baker',
        },
        {
            key: 'member3',
            role: 'pastry_chef',
        },
        {
            key: 'member4',
            role: 'manager',
        },
    ];

    return (
        <>
            <div className="min-h-screen bg-gradient-to-b from-zinc-50 to-white dark:from-zinc-950 dark:to-zinc-900">
                {/* Hero Section */}
                <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
                    <div className="container mx-auto max-w-7xl">
                        <motion.div
                            initial="hidden"
                            animate="visible"
                            variants={fadeInUp}
                            className="text-center"
                        >
                            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-zinc-900 dark:text-zinc-50 mb-6">
                                {t('hero_title')}
                            </h1>
                            <p className="text-xl text-zinc-600 dark:text-zinc-400 max-w-3xl mx-auto leading-relaxed">
                                {t('hero_subtitle')}
                            </p>
                        </motion.div>
                    </div>
                </section>

                {/* Story Section */}
                <section className="py-16 px-4 sm:px-6 lg:px-8">
                    <div className="container mx-auto max-w-7xl">
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: '-100px' }}
                            variants={staggerContainer}
                            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
                        >
                            {/* Image */}
                            <motion.div
                                variants={fadeInUp}
                                className="relative aspect-square lg:aspect-[4/3] rounded-3xl overflow-hidden"
                            >
                                <img
                                    src="/images/bakery-story.jpg"
                                    alt={t('story_title')}
                                    className="w-full h-full object-cover"
                                />
                            </motion.div>

                            {/* Story Content */}
                            <motion.div variants={fadeInUp} className="space-y-6">
                                <h2 className="text-4xl font-bold text-zinc-900 dark:text-zinc-50">
                                    {t('story_title')}
                                </h2>
                                <div className="space-y-4 text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
                                    <p>{t('story_paragraph1')}</p>
                                    <p>{t('story_paragraph2')}</p>
                                    <p>{t('story_paragraph3')}</p>
                                </div>
                            </motion.div>
                        </motion.div>
                    </div>
                </section>

                {/* Mission Section */}
                <section className="py-16 px-4 sm:px-6 lg:px-8 bg-amber-50 dark:bg-zinc-800/50">
                    <div className="container mx-auto max-w-4xl">
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: '-100px' }}
                            variants={fadeInUp}
                            className="text-center"
                        >
                            <h2 className="text-4xl font-bold text-zinc-900 dark:text-zinc-50 mb-6">
                                {t('mission_title')}
                            </h2>
                            <p className="text-xl text-zinc-700 dark:text-zinc-300 leading-relaxed">
                                {t('mission_description')}
                            </p>
                        </motion.div>
                    </div>
                </section>

                {/* Values Section */}
                <section className="py-20 px-4 sm:px-6 lg:px-8">
                    <div className="container mx-auto max-w-7xl">
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: '-100px' }}
                            variants={fadeInUp}
                            className="text-center mb-16"
                        >
                            <h2 className="text-4xl font-bold text-zinc-900 dark:text-zinc-50 mb-4">
                                {t('values_title')}
                            </h2>
                            <p className="text-xl text-zinc-600 dark:text-zinc-400">
                                {t('values_subtitle')}
                            </p>
                        </motion.div>

                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: '-100px' }}
                            variants={staggerContainer}
                            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
                        >
                            {values.map((value) => {
                                const Icon = value.icon;
                                return (
                                    <motion.div
                                        key={value.key}
                                        variants={fadeInUp}
                                        className="bg-white dark:bg-zinc-800 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
                                    >
                                        <div className="w-16 h-16 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center mb-6">
                                            <Icon className="w-8 h-8 text-amber-600 dark:text-amber-400" />
                                        </div>
                                        <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50 mb-3">
                                            {t(`values.${value.key}.title`)}
                                        </h3>
                                        <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                                            {t(`values.${value.key}.description`)}
                                        </p>
                                    </motion.div>
                                );
                            })}
                        </motion.div>
                    </div>
                </section>

                {/* Team Section */}
                <section className="py-20 px-4 sm:px-6 lg:px-8 bg-zinc-50 dark:bg-zinc-900/50">
                    <div className="container mx-auto max-w-7xl">
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: '-100px' }}
                            variants={fadeInUp}
                            className="text-center mb-16"
                        >
                            <h2 className="text-4xl font-bold text-zinc-900 dark:text-zinc-50 mb-4">
                                {t('team_title')}
                            </h2>
                            <p className="text-xl text-zinc-600 dark:text-zinc-400">
                                {t('team_subtitle')}
                            </p>
                        </motion.div>

                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: '-100px' }}
                            variants={staggerContainer}
                            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
                        >
                            {team.map((member) => (
                                <motion.div
                                    key={member.key}
                                    variants={fadeInUp}
                                    className="bg-white dark:bg-zinc-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
                                >
                                    {/* Photo placeholder */}
                                    <div className="relative aspect-square bg-gradient-to-br from-amber-100 to-orange-100 dark:from-amber-900/30 dark:to-orange-900/30">
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <span className="text-7xl">👨‍🍳</span>
                                        </div>
                                    </div>
                                    {/* Info */}
                                    <div className="p-6 text-center">
                                        <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50 mb-2">
                                            {t(`team.${member.key}.name`)}
                                        </h3>
                                        <p className="text-amber-600 dark:text-amber-400 font-medium mb-2">
                                            {t(`team.${member.key}.role`)}
                                        </p>
                                        <p className="text-sm text-zinc-600 dark:text-zinc-400">
                                            {t(`team.${member.key}.bio`)}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </section>
            </div>

            <Footer />
        </>
    );
}
