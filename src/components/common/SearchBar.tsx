'use client';

import { useTranslations } from 'next-intl';
import { Search, X } from 'lucide-react';

interface SearchBarProps {
    value: string;
    onChange: (value: string) => void;
}

export default function SearchBar({ value, onChange }: SearchBarProps) {
    const t = useTranslations('menu');

    return (
        <div className="relative w-full">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
            <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={t('search_placeholder')}
                className="w-full pl-14 pr-14 py-4 bg-white/10 dark:bg-zinc-900/40 border border-zinc-700 hover:border-zinc-500 focus:border-amber-400 rounded-full text-base text-current placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-amber-400/30 backdrop-blur-md transition-all duration-300"
            />
            {value && (
                <button
                    onClick={() => onChange('')}
                    className="absolute right-5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-current transition-colors"
                    aria-label="Clear search"
                >
                    <X className="w-5 h-5" />
                </button>
            )}
        </div>
    );
}
