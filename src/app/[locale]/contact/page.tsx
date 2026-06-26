'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useState, useEffect } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2 } from 'lucide-react';
import Footer from '@/components/layout/Footer';
import MagneticButton from '@/components/motion/MagneticButton';
import SplitText from '@/components/motion/SplitText';
import RevealOnScroll from '@/components/motion/RevealOnScroll';

const generateCaptcha = () => {
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    const operators = ['+', '-'];
    const operator = operators[Math.floor(Math.random() * operators.length)];
    let question: string;
    let answer: number;
    if (operator === '+') {
        question = `${num1} + ${num2}`;
        answer = num1 + num2;
    } else {
        const larger = Math.max(num1, num2);
        const smaller = Math.min(num1, num2);
        question = `${larger} - ${smaller}`;
        answer = larger - smaller;
    }
    return { question, answer };
};

type ContactFormData = {
    name: string;
    email: string;
    phone: string;
    message: string;
    captcha: string;
};

export default function ContactPage() {
    const t = useTranslations('contact');

    const contactSchema = z.object({
        name: z.string().min(2, t('validation.name_min')),
        email: z.string().email(t('validation.email_invalid')),
        phone: z.string().regex(/^\+91\s?\d{10}$/, t('validation.phone_invalid')),
        message: z.string().min(10, t('validation.message_min')),
        captcha: z.string().min(1, t('validation.captcha_required')),
    });
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [captcha, setCaptcha] = useState({ question: '', answer: 0 });
    const [captchaError, setCaptchaError] = useState('');

    useEffect(() => {
        setCaptcha(generateCaptcha());
    }, []);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
        setError,
        clearErrors,
    } = useForm<ContactFormData>({ resolver: zodResolver(contactSchema) });

    const onSubmit = async (data: ContactFormData) => {
        try {
            const userAnswer = parseInt(data.captcha);
            if (isNaN(userAnswer) || userAnswer !== captcha.answer) {
                setError('captcha', { message: t('captcha_error') });
                setCaptchaError(t('captcha_error'));
                return;
            }
            clearErrors('captcha');
            setCaptchaError('');

            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: data.name, email: data.email, phone: data.phone, message: data.message }),
            });
            if (!response.ok) throw new Error('Failed to send message');
            await response.json();

            setIsSubmitted(true);
            reset();
            setCaptcha(generateCaptcha());
            setTimeout(() => setIsSubmitted(false), 5000);
        } catch (error) {
            console.error('Error submitting form:', error);
            setError('email', { message: 'Failed to send message. Please try again or contact us directly.' });
        }
    };

    const inputClass = 'w-full px-5 py-4 rounded-2xl bg-zinc-900/60 border border-zinc-800 hover:border-zinc-700 focus:border-amber-400 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-4 focus:ring-amber-400/20 transition-all';
    const labelClass = 'block text-xs uppercase tracking-[0.25em] text-zinc-400 mb-2';

    return (
        <>
            {/* Header */}
            <section className="relative bg-zinc-950 text-zinc-100 grain pt-32 pb-16 overflow-hidden">
                <div aria-hidden className="absolute top-20 right-1/4 w-[500px] h-[500px] rounded-full opacity-25 blur-3xl" style={{ background: 'radial-gradient(circle, #f59e0b, transparent 60%)' }} />
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-xs uppercase tracking-[0.35em] text-amber-400 mb-6">— {t('subtitle')}</div>
                    <SplitText
                        as="h1"
                        text={t('title')}
                        className="font-display text-6xl sm:text-7xl md:text-8xl font-medium leading-[0.9] tracking-tight text-balance max-w-4xl"
                    />
                </div>
            </section>

            {/* Bento: form + cards */}
            <section className="bg-zinc-950 text-zinc-100 pb-24 sm:pb-32">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                        {/* Form */}
                        <RevealOnScroll className="lg:col-span-8">
                            <div className="rounded-[2rem] border border-zinc-800 bg-gradient-to-br from-zinc-900 to-zinc-950 p-8 sm:p-12 h-full">
                                {isSubmitted ? (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                                        className="text-center py-16"
                                    >
                                        <motion.div
                                            initial={{ scale: 0, rotate: -180 }}
                                            animate={{ scale: 1, rotate: 0 }}
                                            transition={{ type: 'spring', stiffness: 250, damping: 15, delay: 0.1 }}
                                            className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-emerald-500/20 mb-6"
                                        >
                                            <CheckCircle2 className="w-12 h-12 text-emerald-400" />
                                        </motion.div>
                                        <h3 className="font-display text-4xl sm:text-5xl mb-4">{t('success')}</h3>
                                        <p className="text-zinc-400">We&apos;ll be in touch shortly.</p>
                                    </motion.div>
                                ) : (
                                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                                        <div className="grid sm:grid-cols-2 gap-6">
                                            <div>
                                                <label htmlFor="name" className={labelClass}>{t('name')}</label>
                                                <input {...register('name')} type="text" id="name" className={inputClass} placeholder="Your name" />
                                                {errors.name && <p className="mt-2 text-sm text-rose-400">{errors.name.message}</p>}
                                            </div>
                                            <div>
                                                <label htmlFor="email" className={labelClass}>{t('email')}</label>
                                                <input {...register('email')} type="email" id="email" className={inputClass} placeholder="you@example.com" />
                                                {errors.email && <p className="mt-2 text-sm text-rose-400">{errors.email.message}</p>}
                                            </div>
                                        </div>
                                        <div>
                                            <label htmlFor="phone" className={labelClass}>{t('phone')}</label>
                                            <input {...register('phone')} type="tel" id="phone" className={inputClass} placeholder="+91 XXXXXXXXXX" />
                                            {errors.phone && <p className="mt-2 text-sm text-rose-400">{errors.phone.message}</p>}
                                        </div>
                                        <div>
                                            <label htmlFor="message" className={labelClass}>{t('message')}</label>
                                            <textarea {...register('message')} id="message" rows={5} className={`${inputClass} resize-none`} placeholder="What's on your mind?" />
                                            {errors.message && <p className="mt-2 text-sm text-rose-400">{errors.message.message}</p>}
                                        </div>

                                        <div>
                                            <label htmlFor="captcha" className={labelClass}>{t('captcha_label')}</label>
                                            <div className="flex flex-wrap items-center gap-4">
                                                <div className="px-5 py-3.5 rounded-2xl bg-amber-400 text-zinc-950 font-display text-2xl font-semibold min-w-[140px] text-center" suppressHydrationWarning>
                                                    {captcha.question || '...'}
                                                </div>
                                                <span className="text-3xl font-display text-zinc-400">=</span>
                                                <input
                                                    {...register('captcha')}
                                                    type="text"
                                                    id="captcha"
                                                    className="w-28 px-4 py-3.5 rounded-2xl bg-zinc-900/60 border border-zinc-800 focus:border-amber-400 text-zinc-100 text-center text-lg font-display focus:outline-none focus:ring-4 focus:ring-amber-400/20 transition-all"
                                                    placeholder="?"
                                                    onChange={() => {
                                                        clearErrors('captcha');
                                                        setCaptchaError('');
                                                    }}
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => setCaptcha(generateCaptcha())}
                                                    className="text-xs uppercase tracking-[0.25em] text-amber-400 hover:text-amber-300 transition-colors"
                                                >
                                                    {t('captcha_refresh')}
                                                </button>
                                            </div>
                                            {(errors.captcha || captchaError) && (
                                                <p className="mt-2 text-sm text-rose-400">{errors.captcha?.message || captchaError}</p>
                                            )}
                                            <p className="text-xs text-zinc-500 mt-2">{t('captcha_help')}</p>
                                        </div>

                                        <MagneticButton
                                            as="button"
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="inline-flex items-center justify-center gap-3 w-full sm:w-auto px-9 py-5 bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-zinc-950 font-semibold rounded-full text-base transition-colors"
                                        >
                                            {isSubmitting ? (
                                                <div className="w-5 h-5 border-2 border-zinc-950 border-t-transparent rounded-full animate-spin" />
                                            ) : (
                                                <>
                                                    <Send className="w-5 h-5" />
                                                    {t('submit')}
                                                </>
                                            )}
                                        </MagneticButton>
                                    </form>
                                )}
                            </div>
                        </RevealOnScroll>

                        {/* Side cards */}
                        <div className="lg:col-span-4 grid gap-4">
                            <RevealOnScroll delay={0.1}>
                                <a href="https://share.google/3E6YkkuOQEJKYYIKT" target="_blank" rel="noopener noreferrer" className="block h-full p-7 rounded-3xl border border-zinc-800 bg-zinc-900/60 backdrop-blur-sm hover:border-amber-400/40 transition-colors group">
                                    <MapPin className="w-7 h-7 text-amber-400 mb-5 transition-transform group-hover:scale-110" />
                                    <div className="text-xs uppercase tracking-[0.3em] text-zinc-500 mb-2">{t('address')}</div>
                                    <p className="font-display text-lg leading-tight">{t('address_full')}</p>
                                </a>
                            </RevealOnScroll>
                            <RevealOnScroll delay={0.15}>
                                <a href="tel:+918380060631" className="block h-full p-7 rounded-3xl border border-zinc-800 bg-zinc-900/60 backdrop-blur-sm hover:border-amber-400/40 transition-colors group">
                                    <Phone className="w-7 h-7 text-amber-400 mb-5 transition-transform group-hover:scale-110" />
                                    <div className="text-xs uppercase tracking-[0.3em] text-zinc-500 mb-2">{t('phone')}</div>
                                    <p className="font-display text-lg">{t('phone_number')}</p>
                                </a>
                            </RevealOnScroll>
                            <RevealOnScroll delay={0.2}>
                                <a href="mailto:info@gurudevbakery.com" className="block h-full p-7 rounded-3xl border border-zinc-800 bg-zinc-900/60 backdrop-blur-sm hover:border-amber-400/40 transition-colors group">
                                    <Mail className="w-7 h-7 text-amber-400 mb-5 transition-transform group-hover:scale-110" />
                                    <div className="text-xs uppercase tracking-[0.3em] text-zinc-500 mb-2">{t('email')}</div>
                                    <p className="font-display text-lg">info@gurudevbakery.com</p>
                                </a>
                            </RevealOnScroll>
                            <RevealOnScroll delay={0.25}>
                                <div className="h-full p-7 rounded-3xl border border-zinc-800 bg-zinc-900/60 backdrop-blur-sm">
                                    <Clock className="w-7 h-7 text-amber-400 mb-5" />
                                    <div className="text-xs uppercase tracking-[0.3em] text-zinc-500 mb-2">{t('hours')}</div>
                                    <p className="text-sm leading-relaxed">{t('hours_weekdays')}</p>
                                    <p className="text-sm leading-relaxed text-zinc-400 mt-1">{t('hours_sunday')}</p>
                                </div>
                            </RevealOnScroll>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </>
    );
}
