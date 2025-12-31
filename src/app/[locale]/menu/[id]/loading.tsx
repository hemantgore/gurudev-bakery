export default function Loading() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-zinc-50 to-white dark:from-zinc-950 dark:to-zinc-900">
            <div className="container mx-auto px-4 py-8 max-w-7xl">
                {/* Back Button Skeleton */}
                <div className="h-6 w-32 bg-zinc-200 dark:bg-zinc-800 rounded mb-8 animate-pulse" />

                {/* Product Detail Skeleton */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
                    {/* Image Skeleton */}
                    <div className="aspect-square rounded-2xl bg-zinc-200 dark:bg-zinc-800 animate-pulse" />

                    {/* Details Skeleton */}
                    <div className="space-y-6">
                        <div className="h-8 bg-zinc-200 dark:bg-zinc-800 rounded w-3/4 animate-pulse" />
                        <div className="h-6 bg-zinc-200 dark:bg-zinc-800 rounded w-1/4 animate-pulse" />
                        <div className="space-y-3">
                            <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded animate-pulse" />
                            <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded w-5/6 animate-pulse" />
                        </div>
                        <div className="h-12 bg-zinc-200 dark:bg-zinc-800 rounded w-2/3 animate-pulse" />
                        <div className="h-14 bg-zinc-200 dark:bg-zinc-800 rounded animate-pulse" />
                    </div>
                </div>

                {/* Related Products Skeleton */}
                <div className="space-y-6">
                    <div className="h-8 bg-zinc-200 dark:bg-zinc-800 rounded w-1/4 animate-pulse" />
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="space-y-4">
                                <div className="aspect-square rounded-2xl bg-zinc-200 dark:bg-zinc-800 animate-pulse" />
                                <div className="h-6 bg-zinc-200 dark:bg-zinc-800 rounded animate-pulse" />
                                <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded w-3/4 animate-pulse" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
