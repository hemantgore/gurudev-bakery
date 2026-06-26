'use client';

import { useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import { categories } from '@/lib/products';

interface CategoryFilterProps {
    selectedCategory: string;
    onCategoryChange: (category: string) => void;
}

export default function CategoryFilter({ selectedCategory, onCategoryChange }: CategoryFilterProps) {
    const locale = useLocale();

    return (
        <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => {
                const isActive = selectedCategory === category.id;
                const categoryName = locale === 'mr' ? category.nameMr : category.name;

                return (
                    <button
                        key={category.id}
                        onClick={() => onCategoryChange(category.id)}
                        className={`relative px-5 py-2.5 rounded-full text-sm uppercase tracking-[0.2em] font-medium transition-colors duration-300 ${isActive
                            ? 'text-zinc-950'
                            : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100'
                            }`}
                    >
                        {isActive && (
                            <motion.span
                                layoutId="category-pill"
                                className="absolute inset-0 rounded-full bg-amber-400"
                                transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                            />
                        )}
                        <span className="relative z-10">{categoryName}</span>
                    </button>
                );
            })}
        </div>
    );
}
