import type { Metadata } from "next";
import { Geist, Geist_Mono, Noto_Sans_Devanagari } from "next/font/google";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import Header from '@/components/layout/Header';
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
    title: "Gurudev Bakery - Fresh Baked Goods Daily",
    description: "Serving delicious, handcrafted baked goods made with love and the finest ingredients. Cakes, breads, biscuits, khari, and sweets.",
    keywords: ["bakery", "cakes", "bread", "biscuits", "khari", "sweets", "fresh baked goods", "Mumbai bakery"],
    authors: [{ name: "Gurudev Bakery" }],
    openGraph: {
        title: "Gurudev Bakery - Fresh Baked Goods Daily",
        description: "Serving delicious, handcrafted baked goods made with love and the finest ingredients",
        type: "website",
        locale: "en_US",
        siteName: "Gurudev Bakery",
    },
    twitter: {
        card: "summary_large_image",
        title: "Gurudev Bakery - Fresh Baked Goods Daily",
        description: "Serving delicious, handcrafted baked goods made with love and the finest ingredients",
    },
    robots: {
        index: true,
        follow: true,
    },
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
