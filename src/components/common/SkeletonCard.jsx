import { motion } from "framer-motion";

const SkeletonCard = ({ variant = "default" }) => {
  if (variant === "tuition") {
    return (
      <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl shadow-sm overflow-hidden">
        {/* Header shimmer */}
        <div className="h-2 bg-linear-to-r from-gray-200 via-gray-100 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 animate-shimmer" />

        <div className="p-5 space-y-4">
          {/* Title and badge */}
          <div className="flex justify-between items-start">
            <div className="flex-1 space-y-2">
              <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-lg w-3/4 animate-pulse" />
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-lg w-1/2 animate-pulse" />
            </div>
            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-full w-20 ml-4 animate-pulse" />
          </div>

          {/* Info items */}
          <div className="grid grid-cols-2 gap-3">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse" />
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-20 animate-pulse" />
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="flex justify-between items-center pt-4 border-t border-gray-100 dark:border-gray-700">
            <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-24 animate-pulse" />
            <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded-xl w-28 animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  if (variant === "profile") {
    return (
      <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl shadow-sm overflow-hidden">
        <div className="p-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-2xl animate-pulse" />
            <div className="flex-1 space-y-2">
              <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-32 animate-pulse" />
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-48 animate-pulse" />
            </div>
          </div>
          <div className="mt-4 space-y-3">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full animate-pulse" />
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  if (variant === "stats") {
    return (
      <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl shadow-sm overflow-hidden">
        <div className="h-1 bg-gray-200 dark:bg-gray-700 animate-pulse" />
        <div className="p-5">
          <div className="flex justify-between items-start">
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24 animate-pulse" />
              <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-20 animate-pulse" />
            </div>
            <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-2xl animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  // Default variant
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl shadow-sm p-5 space-y-4"
    >
      <div className="flex justify-between items-start">
        <div className="flex-1 space-y-2">
          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-lg w-3/4 animate-pulse" />
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2 animate-pulse" />
        </div>
        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-full w-16 ml-4 animate-pulse" />
      </div>

      <div className="space-y-2">
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full animate-pulse" />
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3 animate-pulse" />
      </div>

      <div className="flex justify-between items-center pt-4 border-t border-gray-100 dark:border-gray-700">
        <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-20 animate-pulse" />
        <div className="h-9 bg-gray-200 dark:bg-gray-700 rounded-xl w-24 animate-pulse" />
      </div>
    </motion.div>
  );
};

// Grid of skeleton cards
export const SkeletonGrid = ({ count = 6, variant = "default" }) => {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {[...Array(count)].map((_, i) => (
        <SkeletonCard key={i} variant={variant} />
      ))}
    </div>
  );
};

export default SkeletonCard;
