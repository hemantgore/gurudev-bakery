'use client';

import { motion, type Variants } from 'framer-motion';
import { type ReactNode } from 'react';

interface RevealOnScrollProps {
    children: ReactNode;
    delay?: number;
    y?: number;
    duration?: number;
    once?: boolean;
    className?: string;
}

const variants: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: (custom: { delay: number; y: number; duration: number }) => ({
        opacity: 1,
        y: 0,
        transition: { duration: custom.duration, delay: custom.delay, ease: [0.22, 1, 0.36, 1] },
    }),
};

export default function RevealOnScroll({
    children,
    delay = 0,
    y = 40,
    duration = 0.5,
    once = true,
    className,
}: RevealOnScrollProps) {
    return (
        <motion.div
            className={className}
            initial="hidden"
            whileInView="visible"
            viewport={{ once, margin: '-80px' }}
            variants={variants}
            custom={{ delay, y, duration }}
        >
            {children}
        </motion.div>
    );
}
