import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    const baseUrl = 'https://gurudevbakery.com';

    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                disallow: ['/api/', '/_next/', '/admin/'],
            },
            {
                userAgent: 'Googlebot',
                allow: '/',
                crawlDelay: 0,
            },
            {
                userAgent: 'Googlebot-Image',
                allow: '/',
            },
            // AI Search Bots
            {
                userAgent: 'GPTBot', // ChatGPT
                allow: '/',
            },
            {
                userAgent: 'ChatGPT-User', // ChatGPT User Agent
                allow: '/',
            },
            {
                userAgent: 'PerplexityBot', // Perplexity AI
                allow: '/',
            },
            {
                userAgent: 'ClaudeBot', // Anthropic Claude
                allow: '/',
            },
            {
                userAgent: 'anthropic-ai', // Anthropic
                allow: '/',
            },
            {
                userAgent: 'Bingbot', // Bing/Copilot
                allow: '/',
            },
        ],
        sitemap: [`${baseUrl}/sitemap.xml`],
        host: baseUrl,
    };
}
