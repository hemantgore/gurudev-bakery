export default function Loading() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-zinc-50 to-white dark:from-zinc-950 dark:to-zinc-900 py-16">
            <div className="container mx-auto px-4 max-w-7xl">
                {/* Header Skeleton */}
                <div className="text-center mb-12">
                    <div className="h-10 bg-zinc-200 dark:bg-zinc-800 rounded w-1/3 mx-auto mb-4 animate-pulse" />
                    <div className="h-6 bg-zinc-200 dark:bg-zinc-800 rounded w-1/2 mx-auto animate-pulse" />
                </div>

                {/* Categories Skeleton */}
                <div className="flex gap-3 mb-12 overflow-x-auto pb-2">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                        <div
                            key={i}
                            className="h-10 bg-zinc-200 dark:bg-zinc-800 rounded-full w-24 flex-shrink-0 animate-pulse"
                        />
                    ))}
                </div>

                {/* Products Grid Skeleton */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                        <div key={i} className="bg-white dark:bg-zinc-800 rounded-2xl overflow-hidden shadow-md">
                            <div className="aspect-square bg-zinc-200 dark:bg-zinc-700 animate-pulse" />
                            <div className="p-5 space-y-3">
                                <div className="h-6 bg-zinc-200 dark:bg-zinc-700 rounded animate-pulse" />
                                <div className="h-4 bg-zinc-200 dark:bg-zinc-700 rounded w-3/4 animate-pulse" />
                                <div className="h-8 bg-zinc-200 dark:bg-zinc-700 rounded w-1/2 animate-pulse" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
