import { MetadataRoute } from 'next';
import { products } from '@/lib/products';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://gurudevbakery.com';

    // Static pages
    const staticPages = [
        '',
        '/en',
        '/mr',
        '/en/menu',
        '/mr/menu',
        '/en/about',
        '/mr/about',
        '/en/contact',
        '/mr/contact',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: route === '' || route === '/en' || route === '/mr' ? 1 : 0.8,
    }));

    // Dynamic product pages
    const productPages = products.flatMap((product) => [
        {
            url: `${baseUrl}/en/menu/${product.id}`,
            lastModified: new Date(),
            changeFrequency: 'monthly' as const,
            priority: product.featured ? 0.9 : 0.7,
        },
        {
            url: `${baseUrl}/mr/menu/${product.id}`,
            lastModified: new Date(),
            changeFrequency: 'monthly' as const,
            priority: product.featured ? 0.9 : 0.7,
        },
    ]);

    return [...staticPages, ...productPages];
}
