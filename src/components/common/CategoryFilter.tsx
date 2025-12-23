'use client';

import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import { categories } from '@/lib/products';

interface CategoryFilterProps {
    selectedCategory: string;
    onCategoryChange: (category: string) => void;
}

export default function CategoryFilter({ selectedCategory, onCategoryChange }: CategoryFilterProps) {
    const t = useTranslations('menu.categories');
    const locale = useLocale();

    return (
        <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => {
                const isActive = selectedCategory === category.id;
                const categoryName = locale === 'mr' ? category.nameMr : category.name;

                return (
                    <motion.button
                        key={category.id}
                        onClick={() => onCategoryChange(category.id)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`
              px-6 py-2.5 rounded-full font-medium transition-all duration-300
              ${isActive
                                ? 'bg-amber-600 text-white shadow-lg shadow-amber-500/50 dark:bg-amber-500'
                                : 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700'
                            }
            `}
                    >
                        {categoryName}
                    </motion.button>
                );
            })}
        </div>
    );
}
