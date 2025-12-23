'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { MapPin, Phone, Mail, Clock, Facebook, Instagram, Twitter } from 'lucide-react';

export default function Footer() {
    const t = useTranslations('footer');
    const tContact = useTranslations('contact');
    const tNav = useTranslations('nav');

    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-zinc-900 dark:bg-black text-zinc-300">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
                    {/* Brand Column */}
                    <div>
                        <h3 className="text-2xl font-bold text-white mb-4">
                            Beakey Bakery
                        </h3>
                        <p className="text-zinc-400 mb-4">
                            Serving delicious, handcrafted baked goods made with love.
                        </p>
                        {/* Social Links */}
                        <div className="flex gap-4">
                            <a
                                href="https://facebook.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 bg-zinc-800 hover:bg-amber-600 rounded-full flex items-center justify-center transition-colors duration-300"
                                aria-label="Facebook"
                            >
                                <Facebook className="w-5 h-5" />
                            </a>
                            <a
                                href="https://instagram.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 bg-zinc-800 hover:bg-amber-600 rounded-full flex items-center justify-center transition-colors duration-300"
                                aria-label="Instagram"
                            >
                                <Instagram className="w-5 h-5" />
                            </a>
                            <a
                                href="https://twitter.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 bg-zinc-800 hover:bg-amber-600 rounded-full flex items-center justify-center transition-colors duration-300"
                                aria-label="Twitter"
                            >
                                <Twitter className="w-5 h-5" />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-lg font-semibold text-white mb-4">
                            {t('quick_links')}
                        </h4>
                        <ul className="space-y-2">
                            <li>
                                <Link
                                    href="/"
                                    className="hover:text-amber-400 transition-colors duration-300"
                                >
                                    {tNav('home')}
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/menu"
                                    className="hover:text-amber-400 transition-colors duration-300"
                                >
                                    {tNav('menu')}
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/about"
                                    className="hover:text-amber-400 transition-colors duration-300"
                                >
                                    {tNav('about')}
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/contact"
                                    className="hover:text-amber-400 transition-colors duration-300"
                                >
                                    {tNav('contact')}
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="text-lg font-semibold text-white mb-4">
                            {t('contact_us')}
                        </h4>
                        <ul className="space-y-3">
                            <li className="flex items-start gap-3">
                                <MapPin className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                                <a
                                    href="https://share.google/3E6YkkuOQEJKYYIKT"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sm hover:text-amber-400 transition-colors duration-300"
                                >
                                    {tContact('address_full')}
                                </a>
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone className="w-5 h-5 text-amber-400 flex-shrink-0" />
                                <a
                                    href="tel:+918380060631"
                                    className="text-sm hover:text-amber-400 transition-colors duration-300"
                                >
                                    +91 83800 60631
                                </a>
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail className="w-5 h-5 text-amber-400 flex-shrink-0" />
                                <a
                                    href="mailto:info@gurudevbakery.com"
                                    className="text-sm hover:text-amber-400 transition-colors duration-300"
                                >
                                    info@gurudevbakery.com
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Business Hours */}
                    <div>
                        <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                            <Clock className="w-5 h-5 text-amber-400" />
                            {tContact('hours')}
                        </h4>
                        <ul className="space-y-2 text-sm">
                            <li>{tContact('hours_weekdays')}</li>
                            <li>{tContact('hours_sunday')}</li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-12 pt-8 border-t border-zinc-800 text-center text-sm text-zinc-500">
                    <p>
                        © {currentYear} Gurudev Bakery. {t('all_rights_reserved')}.
                    </p>
                </div>
            </div>
        </footer>
    );
}
