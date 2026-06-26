'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

// Real product photos rotate through the hero frame — far more appetising than the
// procedural WebGL cake it replaces. Order is the cross-fade sequence.
const CAKES = [
    { src: '/images/black-forest.jpg', alt: 'Black forest cake' },
    { src: '/images/strawberry-cake.jpg', alt: 'Strawberry cream cake' },
    { src: '/images/chocolate-cake.jpg', alt: 'Chocolate cake' },
    { src: '/images/vanilla-cake.jpg', alt: 'Vanilla cake' },
];

// Small accent bubbles orbiting the main frame to keep the composition alive.
const ACCENTS = [
    { src: '/images/cream-roll.jpg', alt: 'Cream roll', className: '-top-2 right-6 w-20 h-20', delay: '0s' },
    { src: '/images/cheese-khari.jpg', alt: 'Cheese khari', className: 'bottom-4 -left-3 w-24 h-24', delay: '1.4s' },
];

export default function HeroShowcase() {
    const [active, setActive] = useState(0);

    useEffect(() => {
        const id = setInterval(() => setActive((i) => (i + 1) % CAKES.length), 3500);
        return () => clearInterval(id);
    }, []);

    return (
        <div className="absolute inset-0">
            {/* Rotating warm glow ring */}
            <div
                aria-hidden
                className="absolute -inset-2 rounded-full animate-[spin_18s_linear_infinite]"
                style={{
                    background:
                        'conic-gradient(from 0deg, rgba(245,158,11,0), rgba(245,158,11,0.55), rgba(251,191,36,0.15), rgba(245,158,11,0))',
                    filter: 'blur(16px)',
                }}
            />

            {/* Dashed orbit ring */}
            <div
                aria-hidden
                className="absolute inset-1 rounded-full border border-dashed border-amber-400/30 animate-[spin_40s_linear_infinite]"
            />

            {/* Photo frame with cross-fading cakes */}
            <div className="absolute inset-5 rounded-full overflow-hidden ring-1 ring-amber-400/25 shadow-2xl shadow-amber-950/50">
                {CAKES.map((c, i) => (
                    <Image
                        key={c.src}
                        src={c.src}
                        alt={c.alt}
                        fill
                        sizes="(max-width: 1024px) 80vw, 520px"
                        priority={i === 0}
                        className={`object-cover transition-opacity duration-1000 ease-out ${i === active ? 'opacity-100' : 'opacity-0'}`}
                        style={{ animation: 'heroKenBurns 12s ease-in-out infinite alternate' }}
                    />
                ))}
                {/* Warm vignette for depth + text legibility against the dark hero */}
                <div
                    aria-hidden
                    className="absolute inset-0"
                    style={{
                        background:
                            'radial-gradient(circle at 50% 30%, transparent 45%, rgba(10,10,10,0.5) 100%)',
                    }}
                />
            </div>

            {/* Floating accent thumbnails */}
            {ACCENTS.map((a) => (
                <div
                    key={a.src}
                    className={`absolute ${a.className} rounded-full overflow-hidden ring-2 ring-zinc-900 shadow-xl hidden sm:block`}
                    style={{ animation: `heroFloat 5s ease-in-out infinite`, animationDelay: a.delay }}
                >
                    <Image src={a.src} alt={a.alt} fill sizes="96px" className="object-cover" />
                </div>
            ))}

            {/* Progress dots */}
            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
                {CAKES.map((c, i) => (
                    <button
                        key={c.src}
                        type="button"
                        onClick={() => setActive(i)}
                        aria-label={`Show ${c.alt}`}
                        className={`h-1.5 rounded-full transition-all duration-300 ${i === active ? 'w-6 bg-amber-400' : 'w-1.5 bg-zinc-600 hover:bg-zinc-500'}`}
                    />
                ))}
            </div>
        </div>
    );
}
