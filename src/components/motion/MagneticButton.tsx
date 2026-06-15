'use client';

import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useRef, type ReactNode, type ButtonHTMLAttributes, type AnchorHTMLAttributes } from 'react';

interface CommonProps {
    children: ReactNode;
    className?: string;
    strength?: number;
}

type ButtonProps = CommonProps & { as?: 'button' } & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children' | 'className'>;
type AnchorProps = CommonProps & { as: 'a'; href?: string } & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'children' | 'className' | 'href'>;
type Props = ButtonProps | AnchorProps;

export default function MagneticButton(props: Props) {
    const base = props as CommonProps & { as?: string };
    const { children, className, strength = 0.4 } = base;
    const as = base.as ?? 'button';
    const ref = useRef<HTMLElement | null>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const sx = useSpring(x, { stiffness: 200, damping: 15 });
    const sy = useSpring(y, { stiffness: 200, damping: 15 });

    const handleMove = (e: React.MouseEvent) => {
        const rect = ref.current?.getBoundingClientRect();
        if (!rect) return;
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        x.set((e.clientX - cx) * strength);
        y.set((e.clientY - cy) * strength);
    };

    const reset = () => {
        x.set(0);
        y.set(0);
    };

    if (as === 'a') {
        const { href, target, rel } = props as AnchorProps;
        return (
            <motion.a
                ref={ref as React.Ref<HTMLAnchorElement>}
                href={href}
                target={target}
                rel={rel}
                onMouseMove={handleMove}
                onMouseLeave={reset}
                className={className}
                style={{ x: sx, y: sy }}
            >
                {children}
            </motion.a>
        );
    }
    const { onClick, type, disabled } = props as ButtonProps;
    return (
        <motion.button
            ref={ref as React.Ref<HTMLButtonElement>}
            onClick={onClick}
            type={type}
            disabled={disabled}
            onMouseMove={handleMove}
            onMouseLeave={reset}
            className={className}
            style={{ x: sx, y: sy }}
        >
            {children}
        </motion.button>
    );
}
