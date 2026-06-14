'use client';

import { motion } from 'framer-motion';
import { createElement, Fragment, type ReactNode } from 'react';

interface SplitTextProps {
    text: string;
    className?: string;
    delay?: number;
    stagger?: number;
    by?: 'word' | 'char';
    as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span';
}

export default function SplitText({
    text,
    className,
    delay = 0,
    stagger = 0.05,
    by = 'word',
    as = 'h1',
}: SplitTextProps) {
    const tokens = by === 'word' ? text.split(' ') : Array.from(text);

    const container = {
        hidden: {},
        visible: { transition: { staggerChildren: stagger, delayChildren: delay } },
    };
    const item = {
        hidden: { y: 24, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
        },
    };

    const inner: ReactNode = (
        <motion.span
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={container}
            aria-label={text}
            className="inline"
        >
            {tokens.map((tok, i) => (
                <Fragment key={i}>
                    <motion.span variants={item} className="inline-block" aria-hidden>
                        {tok}
                    </motion.span>
                    {by === 'word' && i < tokens.length - 1 ? ' ' : null}
                </Fragment>
            ))}
        </motion.span>
    );

    return createElement(as, { className }, inner);
}
