'use client';

interface MarqueeProps {
    items: string[];
    className?: string;
    separator?: string;
    speed?: 'slow' | 'normal' | 'fast';
}

export default function Marquee({
    items,
    className,
    separator = '·',
    speed = 'normal',
}: MarqueeProps) {
    const durations = { slow: '60s', normal: '40s', fast: '24s' };
    const doubled = [...items, ...items];

    return (
        <div className={`relative w-full overflow-hidden ${className ?? ''}`}>
            <div
                className="flex whitespace-nowrap animate-marquee"
                style={{ animationDuration: durations[speed] }}
            >
                {doubled.map((it, i) => (
                    <span
                        key={i}
                        className="mx-8 inline-flex items-center gap-8 text-xs uppercase tracking-[0.3em]"
                    >
                        {it}
                        <span aria-hidden className="opacity-50">{separator}</span>
                    </span>
                ))}
            </div>
        </div>
    );
}
