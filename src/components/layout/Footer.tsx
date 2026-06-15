'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { MapPin, Phone, Mail, Facebook, Instagram, Twitter } from 'lucide-react';

export default function Footer() {
    const t = useTranslations('footer');
    const tContact = useTranslations('contact');
    const tNav = useTranslations('nav');
    const currentYear = new Date().getFullYear();

    const navLinks: { href: '/' | '/menu' | '/about' | '/contact'; label: string }[] = [
        { href: '/', label: tNav('home') },
        { href: '/menu', label: tNav('menu') },
        { href: '/about', label: tNav('about') },
        { href: '/contact', label: tNav('contact') },
    ];

    return (
        <footer className="relative bg-zinc-950 text-zinc-300 overflow-hidden">
            {/* Giant background marquee */}
            <div aria-hidden className="relative py-8 border-y border-zinc-900 select-none">
                <div className="font-display text-[16vw] sm:text-[12vw] leading-none text-zinc-900 whitespace-nowrap animate-marquee">
                    Gurudev Bakery · Gurudev Bakery · Gurudev Bakery ·&nbsp;
                </div>
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* Brand */}
                    <div className="lg:col-span-5">
                        <h3 className="font-display text-4xl text-white mb-4">
                            Gurudev <span className="italic text-amber-400">Bakery</span>
                        </h3>
                        <p className="text-zinc-400 max-w-md mb-8 leading-relaxed">
                            Handcrafted baked goods, served with soul. Belwandi, Maharashtra · Since 2000.
                        </p>
                        <div className="flex gap-3">
                            {[
                                { Icon: Facebook, href: 'https://facebook.com', label: 'Facebook' },
                                { Icon: Instagram, href: 'https://instagram.com', label: 'Instagram' },
                                { Icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
                            ].map(({ Icon, href, label }) => (
                                <a
                                    key={label}
                                    href={href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={label}
                                    className="w-11 h-11 rounded-full border border-zinc-800 hover:border-amber-400 hover:text-amber-400 flex items-center justify-center transition-all hover:-translate-y-1"
                                >
                                    <Icon className="w-4 h-4" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Nav */}
                    <div className="lg:col-span-3">
                        <h4 className="text-xs uppercase tracking-[0.3em] text-zinc-500 mb-5">{t('quick_links')}</h4>
                        <ul className="space-y-3">
                            {navLinks.map((l) => (
                                <li key={l.href}>
                                    <Link href={l.href} className="font-display text-lg hover:text-amber-400 transition-colors">
                                        {l.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div className="lg:col-span-4">
                        <h4 className="text-xs uppercase tracking-[0.3em] text-zinc-500 mb-5">{t('contact_us')}</h4>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3">
                                <MapPin className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                                <a href="https://share.google/3E6YkkuOQEJKYYIKT" target="_blank" rel="noopener noreferrer" className="text-sm hover:text-amber-400 transition-colors leading-relaxed">
                                    {tContact('address_full')}
                                </a>
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone className="w-5 h-5 text-amber-400 flex-shrink-0" />
                                <a href="tel:+918380060631" className="text-sm hover:text-amber-400 transition-colors">
                                    {tContact('phone_number')}
                                </a>
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail className="w-5 h-5 text-amber-400 flex-shrink-0" />
                                <a href="mailto:info@gurudevbakery.com" className="text-sm hover:text-amber-400 transition-colors">
                                    info@gurudevbakery.com
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="mt-16 pt-8 border-t border-zinc-900 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs uppercase tracking-[0.25em] text-zinc-500">
                    <p>© {currentYear} Gurudev Bakery · {t('all_rights_reserved')}</p>
                    <p>Made with love in Maharashtra</p>
                </div>
            </div>
        </footer>
    );
}
