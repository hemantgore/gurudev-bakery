'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { useRef } from 'react';

interface ParallaxImageProps {
    src: string;
    alt: string;
    className?: string;
    intensity?: number;
    priority?: boolean;
    sizes?: string;
}

export default function ParallaxImage({
    src,
    alt,
    className,
    intensity = 80,
    priority = false,
    sizes,
}: ParallaxImageProps) {
    const ref = useRef<HTMLDivElement | null>(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
    const y = useTransform(scrollYProgress, [0, 1], [-intensity, intensity]);
    const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.1, 1.0, 1.1]);

    return (
        <div ref={ref} className={`relative overflow-hidden ${className ?? ''}`}>
            <motion.div style={{ y, scale }} className="absolute inset-0">
                <Image
                    src={src}
                    alt={alt}
                    fill
                    priority={priority}
                    sizes={sizes ?? '(max-width: 768px) 100vw, 50vw'}
                    className="object-cover"
                />
            </motion.div>
        </div>
    );
}
