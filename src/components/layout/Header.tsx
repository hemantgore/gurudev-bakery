'use client';

import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import LanguageSwitcher from '@/components/common/LanguageSwitcher';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Header() {
    const t = useTranslations('nav');
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const navItems = [
        { href: '/', label: t('home') },
        { href: '/menu', label: t('menu') },
        { href: '/about', label: t('about') },
        { href: '/contact', label: t('contact') },
    ];

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-sm shadow-sm">
            <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link href="/" className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
                        Gurudev <span className="text-amber-600">Bakery</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-8">
                        {navItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className="text-zinc-700 dark:text-zinc-300 hover:text-amber-600 dark:hover:text-amber-400 font-medium transition-colors duration-300"
                            >
                                {item.label}
                            </Link>
                        ))}
                    </div>

                    {/* Right Side: Language Switcher + Mobile Menu Button */}
                    <div className="flex items-center gap-4">
                        <LanguageSwitcher />

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="md:hidden p-2 text-zinc-700 dark:text-zinc-300"
                            aria-label="Toggle menu"
                        >
                            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>

                {/* Mobile Navigation */}
                {mobileMenuOpen && (
                    <div className="md:hidden py-4 border-t border-zinc-200 dark:border-zinc-800">
                        <div className="flex flex-col gap-4">
                            {navItems.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="text-zinc-700 dark:text-zinc-300 hover:text-amber-600 dark:hover:text-amber-400 font-medium transition-colors duration-300 py-2"
                                >
                                    {item.label}
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </nav>
        </header>
    );
}
