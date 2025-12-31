import type { Metadata } from "next";
import { Geist, Geist_Mono, Noto_Sans_Devanagari } from "next/font/google";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import Header from '@/components/layout/Header';
import { getLocalBusinessSchema } from '@/lib/structured-data';
import "../globals.css";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
    display: 'swap',
    preload: true,
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
    display: 'swap',
    preload: false,
});

const notoSansDevanagari = Noto_Sans_Devanagari({
    variable: "--font-noto-sans-devanagari",
    subsets: ["devanagari", "latin"],
    weight: ["400", "500", "600", "700"],
    display: 'swap',
    preload: true,
});

export const metadata: Metadata = {
    title: {
        default: "Gurudev Bakery - Fresh Baked Goods Daily | Maharashtra's Best Bakery",
        template: "%s | Gurudev Bakery"
    },
    description: "Gurudev Bakery in Maharashtra - Fresh, handcrafted baked goods made daily. Premium cakes, breads, biscuits, khari, and sweets. Order online or visit our Belwandi location. ⭐ 4.8/5 rating with 150+ reviews.",
    keywords: [
        "bakery Maharashtra",
        "Gurudev Bakery",
        "fresh bakery near me",
        "cakes Maharashtra",
        "birthday cakes",
        "chocolate cake",
        "bread bakery",
        "biscuits Maharashtra",
        "khari snacks",
        "sweets bakery",
        "Belwandi bakery",
        "best bakery Maharashtra",
        "online cake order",
        "fresh bread daily",
        "bakery delivery"
    ],
    authors: [{ name: "Gurudev Bakery", url: "https://gurudevbakery.com" }],
    creator: "Gurudev Bakery",
    publisher: "Gurudev Bakery",
    metadataBase: new URL('https://gurudevbakery.com'),
    alternates: {
        canonical: '/',
        languages: {
            'en': '/en',
            'mr': '/mr',
        },
    },
    openGraph: {
        title: "Gurudev Bakery - Fresh Baked Goods Daily",
        description: "Premium bakery in Maharashtra serving fresh cakes, breads, biscuits, khari & sweets. Order online or visit us at Belwandi. ⭐ 4.8/5",
        type: "website",
        locale: "en_US",
        alternateLocale: ["mr_IN"],
        siteName: "Gurudev Bakery",
        url: "https://gurudevbakery.com",
        images: [
            {
                url: "/images/hero-bakery-bg.jpg",
                width: 1920,
                height: 1080,
                alt: "Gurudev Bakery - Fresh Baked Goods"
            }
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Gurudev Bakery - Fresh Baked Goods Daily",
        description: "Premium bakery in Maharashtra - Fresh cakes, breads, biscuits & more. Order online!",
        images: ["/images/hero-bakery-bg.jpg"],
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
    verification: {
        // Add these after setting up:
        // google: 'your-google-verification-code',
        // yandex: 'your-yandex-verification-code',
        // bing: 'your-bing-verification-code',
    },
    category: 'food',
    classification: 'Bakery, Food & Beverages',
};

export default async function LocaleLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;

    // Ensure that the incoming `locale` is valid
    if (!routing.locales.includes(locale as any)) {
        notFound();
    }

    // Providing all messages to the client
    // side is the easiest way to get started
    const messages = await getMessages();

    return (
        <html lang={locale}>
            <head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                {/* Structured Data for SEO */}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify(getLocalBusinessSchema()),
                    }}
                />
            </head>
            <body
                className={`${geistSans.variable} ${geistMono.variable} ${notoSansDevanagari.variable} antialiased`}
            >
                <NextIntlClientProvider messages={messages}>
                    <Header />
                    {children}
                </NextIntlClientProvider>
            </body>
        </html>
    );
}
