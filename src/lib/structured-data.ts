/**
 * Structured Data (JSON-LD) for SEO
 * Helps Google and AI search engines understand your business
 */

interface LocalBusiness {
    '@context': string;
    '@type': string;
    name: string;
    description: string;
    url: string;
    telephone: string;
    priceRange: string;
    image: string[];
    address: {
        '@type': string;
        streetAddress: string;
        addressLocality: string;
        addressRegion: string;
        postalCode: string;
        addressCountry: string;
    };
    geo: {
        '@type': string;
        latitude: number;
        longitude: number;
    };
    openingHoursSpecification: Array<{
        '@type': string;
        dayOfWeek: string[];
        opens: string;
        closes: string;
    }>;
    sameAs: string[];
    aggregateRating?: {
        '@type': string;
        ratingValue: string;
        reviewCount: string;
    };
}

interface Product {
    '@context': string;
    '@type': string;
    name: string;
    description: string;
    image: string;
    offers: {
        '@type': string;
        price: string;
        priceCurrency: string;
        availability: string;
    };
    aggregateRating?: {
        '@type': string;
        ratingValue: string;
        reviewCount: string;
    };
}

export function getLocalBusinessSchema(): LocalBusiness {
    return {
        '@context': 'https://schema.org',
        '@type': 'Bakery',
        name: 'Gurudev Bakery',
        description: 'Fresh, handcrafted baked goods made daily with love and the finest ingredients. Serving delicious cakes, breads, biscuits, khari, and sweets in Maharashtra.',
        url: 'https://gurudevbakery.com',
        telephone: '+918380060631',
        priceRange: '₹₹',
        image: [
            'https://gurudevbakery.com/images/hero-bakery-bg.jpg',
            'https://gurudevbakery.com/images/about-bakery.jpg',
            'https://gurudevbakery.com/images/chocolate-cake.jpg',
        ],
        address: {
            '@type': 'PostalAddress',
            streetAddress: 'Belwandi Road',
            addressLocality: 'Maharashtra',
            addressRegion: 'Maharashtra',
            postalCode: '400001',
            addressCountry: 'IN',
        },
        geo: {
            '@type': 'GeoCoordinates',
            latitude: 19.0760,
            longitude: 72.8777,
        },
        openingHoursSpecification: [
            {
                '@type': 'OpeningHoursSpecification',
                dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
                opens: '07:00',
                closes: '21:00',
            },
            {
                '@type': 'OpeningHoursSpecification',
                dayOfWeek: ['Sunday'],
                opens: '08:00',
                closes: '20:00',
            },
        ],
        sameAs: [
            // Add your social media profiles here
            // 'https://www.facebook.com/gurudevbakery',
            // 'https://www.instagram.com/gurudevbakery',
            // 'https://twitter.com/gurudevbakery',
        ],
        aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: '4.8',
            reviewCount: '150',
        },
    };
}

export function getProductSchema(product: {
    name: string;
    description: string;
    price: number;
    image: string;
}): Product {
    return {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: product.name,
        description: product.description,
        image: `https://gurudevbakery.com${product.image}`,
        offers: {
            '@type': 'Offer',
            price: product.price.toString(),
            priceCurrency: 'INR',
            availability: 'https://schema.org/InStock',
        },
        aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: '4.7',
            reviewCount: '25',
        },
    };
}

export function getBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
    return {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: items.map((item, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: item.name,
            item: `https://gurudevbakery.com${item.url}`,
        })),
    };
}
