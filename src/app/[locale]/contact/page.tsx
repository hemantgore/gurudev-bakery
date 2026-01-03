'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useState, useEffect } from 'react';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';
import Footer from '@/components/layout/Footer';

// Generate simple math captcha
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
        // Ensure positive result for subtraction
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

    // Form validation schema with localized messages
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

    // Generate captcha only on client side to avoid hydration mismatch
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
    } = useForm<ContactFormData>({
        resolver: zodResolver(contactSchema),
    });

    const onSubmit = async (data: ContactFormData) => {
        try {
            // Validate captcha
            const userAnswer = parseInt(data.captcha);
            if (isNaN(userAnswer) || userAnswer !== captcha.answer) {
                setError('captcha', { message: t('captcha_error') });
                setCaptchaError(t('captcha_error'));
                return;
            }

            clearErrors('captcha');
            setCaptchaError('');

            // Send email via API
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: data.name,
                    email: data.email,
                    phone: data.phone,
                    message: data.message,
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to send message');
            }

            const result = await response.json();
            console.log('Email sent successfully:', result);

            setIsSubmitted(true);
            reset();
            setCaptcha(generateCaptcha()); // Generate new captcha

            // Hide success message after 5 seconds
            setTimeout(() => setIsSubmitted(false), 5000);
        } catch (error) {
            console.error('Error submitting form:', error);
            setError('email', {
                message: 'Failed to send message. Please try again or contact us directly.'
            });
        }
    };

    const fadeInUp = {
        hidden: { opacity: 0, y: 40 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6 },
        },
    };

    return (
        <>
            <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white dark:from-zinc-950 dark:to-zinc-900 py-24">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Hero Section */}
                    <motion.div
                        className="text-center mb-16"
                        variants={fadeInUp}
                        initial="hidden"
                        animate="visible"
                    >
                        <h1 className="text-4xl md:text-5xl font-bold text-zinc-900 dark:text-zinc-50 mb-4">
                            {t('title')}
                        </h1>
                        <p className="text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
                            {t('subtitle')}
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
                        {/* Contact Form */}
                        <motion.div
                            className="bg-white dark:bg-zinc-800 rounded-2xl shadow-lg p-8"
                            variants={fadeInUp}
                            initial="hidden"
                            animate="visible"
                            transition={{ delay: 0.2 }}
                        >
                            {isSubmitted ? (
                                <motion.div
                                    className="text-center py-8"
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.5 }}
                                >
                                    <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <Send className="w-8 h-8 text-green-600 dark:text-green-400" />
                                    </div>
                                    <p className="text-lg font-semibold text-green-600 dark:text-green-400">
                                        {t('success')}
                                    </p>
                                </motion.div>
                            ) : (
                                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                                    {/* Name Field */}
                                    <div>
                                        <label htmlFor="name" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                                            {t('name')}
                                        </label>
                                        <input
                                            {...register('name')}
                                            type="text"
                                            id="name"
                                            className="w-full px-4 py-3 border border-zinc-300 dark:border-zinc-600 rounded-lg bg-white dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-colors"
                                            placeholder={t('name')}
                                        />
                                        {errors.name && (
                                            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.name.message}</p>
                                        )}
                                    </div>

                                    {/* Email Field */}
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                                            {t('email')}
                                        </label>
                                        <input
                                            {...register('email')}
                                            type="email"
                                            id="email"
                                            className="w-full px-4 py-3 border border-zinc-300 dark:border-zinc-600 rounded-lg bg-white dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-colors"
                                            placeholder={t('email')}
                                        />
                                        {errors.email && (
                                            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.email.message}</p>
                                        )}
                                    </div>

                                    {/* Phone Field */}
                                    <div>
                                        <label htmlFor="phone" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                                            {t('phone')}
                                        </label>
                                        <input
                                            {...register('phone')}
                                            type="tel"
                                            id="phone"
                                            className="w-full px-4 py-3 border border-zinc-300 dark:border-zinc-600 rounded-lg bg-white dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-colors"
                                            placeholder="+91 XXXXXXXXXX"
                                        />
                                        {errors.phone && (
                                            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.phone.message}</p>
                                        )}
                                    </div>

                                    {/* Message Field */}
                                    <div>
                                        <label htmlFor="message" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                                            {t('message')}
                                        </label>
                                        <textarea
                                            {...register('message')}
                                            id="message"
                                            rows={5}
                                            className="w-full px-4 py-3 border border-zinc-300 dark:border-zinc-600 rounded-lg bg-white dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-colors resize-none"
                                            placeholder={t('message')}
                                        />
                                        {errors.message && (
                                            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.message.message}</p>
                                        )}
                                    </div>

                                    {/* Captcha Field */}
                                    <div>
                                        <label htmlFor="captcha" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                                            {t('captcha_label')}
                                        </label>
                                        <div className="flex items-center gap-4 mb-2">
                                            <div
                                                className="bg-zinc-100 dark:bg-zinc-600 px-4 py-3 rounded-lg font-mono text-lg font-semibold text-zinc-900 dark:text-zinc-100 min-w-[120px] text-center"
                                                suppressHydrationWarning
                                            >
                                                {captcha.question || '...'}
                                            </div>
                                            <span className="text-2xl font-semibold text-zinc-700 dark:text-zinc-300">=</span>
                                            <input
                                                {...register('captcha')}
                                                type="text"
                                                id="captcha"
                                                className="w-24 px-4 py-3 border border-zinc-300 dark:border-zinc-600 rounded-lg bg-white dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-colors text-center"
                                                placeholder="?"
                                                onChange={() => {
                                                    clearErrors('captcha');
                                                    setCaptchaError('');
                                                }}
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setCaptcha(generateCaptcha())}
                                                className="px-3 py-2 text-sm text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300 font-medium transition-colors"
                                            >
                                                {t('captcha_refresh')}
                                            </button>
                                        </div>
                                        {(errors.captcha || captchaError) && (
                                            <p className="text-sm text-red-600 dark:text-red-400">
                                                {errors.captcha?.message || captchaError}
                                            </p>
                                        )}
                                        <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                                            {t('captcha_help')}
                                        </p>
                                    </div>

                                    {/* Submit Button */}
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full bg-amber-600 hover:bg-amber-700 disabled:opacity-50 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-300 flex items-center justify-center gap-2"
                                    >
                                        {isSubmitting ? (
                                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                        ) : (
                                            <>
                                                <Send className="w-5 h-5" />
                                                {t('submit')}
                                            </>
                                        )}
                                    </button>
                                </form>
                            )}
                        </motion.div>

                        {/* Contact Information */}
                        <motion.div
                            className="space-y-6"
                            variants={fadeInUp}
                            initial="hidden"
                            animate="visible"
                            transition={{ delay: 0.4 }}
                        >
                            {/* Address */}
                            <div className="bg-white dark:bg-zinc-800 rounded-2xl shadow-lg p-6">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-amber-100 dark:bg-amber-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <MapPin className="w-6 h-6 text-amber-600 dark:text-amber-400" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50 mb-2">{t('address')}</h3>
                                        <a
                                            href="https://share.google/3E6YkkuOQEJKYYIKT"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-zinc-600 dark:text-zinc-400 hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
                                        >
                                            {t('address_full')}
                                        </a>
                                    </div>
                                </div>
                            </div>

                            {/* Phone */}
                            <div className="bg-white dark:bg-zinc-800 rounded-2xl shadow-lg p-6">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-amber-100 dark:bg-amber-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <Phone className="w-6 h-6 text-amber-600 dark:text-amber-400" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50 mb-2">{t('phone')}</h3>
                                        <a
                                            href="tel:+918380060631"
                                            className="text-zinc-600 dark:text-zinc-400 hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
                                        >
                                            {t('phone_number')}
                                        </a>
                                    </div>
                                </div>
                            </div>

                            {/* Email */}
                            <div className="bg-white dark:bg-zinc-800 rounded-2xl shadow-lg p-6">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-amber-100 dark:bg-amber-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <Mail className="w-6 h-6 text-amber-600 dark:text-amber-400" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50 mb-2">{t('email')}</h3>
                                        <a
                                            href="mailto:info@gurudevbakery.com"
                                            className="text-zinc-600 dark:text-zinc-400 hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
                                        >
                                            info@gurudevbakery.com
                                        </a>
                                    </div>
                                </div>
                            </div>

                            {/* Business Hours */}
                            <div className="bg-white dark:bg-zinc-800 rounded-2xl shadow-lg p-6">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-amber-100 dark:bg-amber-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <Clock className="w-6 h-6 text-amber-600 dark:text-amber-400" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50 mb-2">{t('hours')}</h3>
                                        <div className="text-zinc-600 dark:text-zinc-400 space-y-1">
                                            <p>{t('hours_weekdays')}</p>
                                            <p>{t('hours_sunday')}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}