'use client';

import { Link, usePathname } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import LanguageSwitcher from '@/components/common/LanguageSwitcher';
import { Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Header() {
    const t = useTranslations('nav');
    const pathname = usePathname();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 24);
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    useEffect(() => {
        document.body.style.overflow = mobileMenuOpen ? 'hidden' : '';
        return () => {
            document.body.style.overflow = '';
        };
    }, [mobileMenuOpen]);

    const navItems = [
        { href: '/', label: t('home') },
        { href: '/menu', label: t('menu') },
        { href: '/about', label: t('about') },
        { href: '/contact', label: t('contact') },
    ];

    return (
        <>
            <a
                href="#main-content"
                className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-amber-500 focus:text-zinc-950 focus:rounded-full focus:font-semibold focus:text-sm"
            >
                Skip to main content
            </a>
            <header
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'glass border-b border-zinc-200/40 dark:border-zinc-800/60' : 'bg-transparent'
                    }`}
            >
                <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-20">
                        <Link href="/" className="text-xl font-display font-medium tracking-tight">
                            Gurudev <span className="italic text-amber-600 dark:text-amber-400">Bakery</span>
                        </Link>

                        <div className="hidden md:flex items-center gap-1 relative">
                            {navItems.map((item) => {
                                const isActive = pathname === item.href;
                                return (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        className="relative px-5 py-2 text-sm uppercase tracking-[0.2em] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:rounded"
                                    >
                                        {isActive && (
                                            <motion.span
                                                layoutId="nav-underline"
                                                className="absolute inset-x-3 bottom-0 h-0.5 bg-amber-500 dark:bg-amber-400"
                                                transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                                            />
                                        )}
                                        <span className={isActive ? 'text-amber-600 dark:text-amber-400' : 'text-zinc-700 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-zinc-50'}>
                                            {item.label}
                                        </span>
                                    </Link>
                                );
                            })}
                        </div>

                        <div className="flex items-center gap-3">
                            <LanguageSwitcher />
                            <button
                                onClick={() => setMobileMenuOpen(true)}
                                className="md:hidden p-2 text-zinc-700 dark:text-zinc-300"
                                aria-label="Toggle menu"
                            >
                                <Menu className="w-6 h-6" />
                            </button>
                        </div>
                    </div>
                </nav>
            </header>

            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 z-[60] bg-zinc-950 text-zinc-100 md:hidden grain overflow-hidden"
                    >
                        <div className="flex items-center justify-between px-4 h-20">
                            <Link href="/" onClick={() => setMobileMenuOpen(false)} className="text-xl font-display font-medium">
                                Gurudev <span className="italic text-amber-400">Bakery</span>
                            </Link>
                            <button
                                onClick={() => setMobileMenuOpen(false)}
                                className="p-2"
                                aria-label="Close menu"
                            >
                                <X className="w-7 h-7" />
                            </button>
                        </div>
                        <nav className="container mx-auto px-4 pt-12">
                            {navItems.map((item, i) => (
                                <motion.div
                                    key={item.href}
                                    initial={{ y: 40, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.1 + i * 0.06, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                                    className="overflow-hidden"
                                >
                                    <Link
                                        href={item.href}
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="block font-display text-5xl sm:text-6xl py-4 hover:text-amber-400 transition-colors"
                                    >
                                        {item.label}
                                    </Link>
                                </motion.div>
                            ))}
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
