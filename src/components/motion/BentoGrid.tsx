'use client';

import { type ReactNode } from 'react';

interface BentoGridProps {
    children: ReactNode;
    className?: string;
}

export function BentoGrid({ children, className }: BentoGridProps) {
    return (
        <div
            className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 auto-rows-[minmax(180px,auto)] gap-4 ${className ?? ''}`}
        >
            {children}
        </div>
    );
}

interface BentoCellProps {
    children: ReactNode;
    className?: string;
    span?: 'sm' | 'md' | 'lg' | 'xl' | 'wide' | 'tall';
}

const spans: Record<NonNullable<BentoCellProps['span']>, string> = {
    sm: 'col-span-1 row-span-1',
    md: 'col-span-1 sm:col-span-2 row-span-1',
    lg: 'col-span-1 sm:col-span-2 lg:col-span-2 row-span-2',
    xl: 'col-span-1 sm:col-span-2 lg:col-span-3 row-span-2',
    wide: 'col-span-1 sm:col-span-2 lg:col-span-4 row-span-1',
    tall: 'col-span-1 row-span-2',
};

export function BentoCell({ children, className, span = 'sm' }: BentoCellProps) {
    return (
        <div className={`${spans[span]} ${className ?? ''}`}>
            {children}
        </div>
    );
}
