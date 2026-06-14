'use client';

import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate } from 'framer-motion';
import { useRef, useState, type ReactNode } from 'react';

interface TiltCardProps {
    children: ReactNode;
    className?: string;
    intensity?: number;
    glare?: boolean;
}

export default function TiltCard({ children, className, intensity = 8, glare = true }: TiltCardProps) {
    const ref = useRef<HTMLDivElement | null>(null);
    const [hovered, setHovered] = useState(false);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const rotateX = useSpring(useTransform(y, (v) => -v * intensity), { stiffness: 200, damping: 20 });
    const rotateY = useSpring(useTransform(x, (v) => v * intensity), { stiffness: 200, damping: 20 });

    const gx = useTransform(x, (v) => `${50 + v * 60}%`);
    const gy = useTransform(y, (v) => `${50 + v * 60}%`);
    const glareBg = useMotionTemplate`radial-gradient(circle at ${gx} ${gy}, rgba(255,255,255,0.28), transparent 55%)`;

    const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = ref.current?.getBoundingClientRect();
        if (!rect) return;
        x.set((e.clientX - rect.left) / rect.width - 0.5);
        y.set((e.clientY - rect.top) / rect.height - 0.5);
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMove}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => {
                setHovered(false);
                x.set(0);
                y.set(0);
            }}
            style={{ rotateX, rotateY, transformStyle: 'preserve-3d', transformPerspective: 1000 }}
            className={`relative ${className ?? ''}`}
        >
            {children}
            {glare && (
                <motion.div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 rounded-[inherit] transition-opacity duration-300"
                    style={{ background: glareBg, opacity: hovered ? 1 : 0 }}
                />
            )}
        </motion.div>
    );
}
