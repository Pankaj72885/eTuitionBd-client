import { motion } from "framer-motion";

const LoadingSpinner = ({ size = "md", className = "" }) => {
  const sizeClasses = {
    xs: "w-3 h-3",
    sm: "w-4 h-4",
    md: "w-8 h-8",
    lg: "w-12 h-12",
    xl: "w-16 h-16",
  };

  const dotSize = {
    xs: "w-1 h-1",
    sm: "w-1.5 h-1.5",
    md: "w-2 h-2",
    lg: "w-3 h-3",
    xl: "w-4 h-4",
  };

  // For xs and sm, use simple spinner
  if (size === "xs" || size === "sm") {
    return (
      <div className={`flex justify-center items-center ${className}`}>
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className={`${sizeClasses[size]} rounded-full border-2 border-indigo-200 dark:border-indigo-900 border-t-indigo-600 dark:border-t-indigo-400`}
        />
      </div>
    );
  }

  // For md and up, use animated dots
  return (
    <div className={`flex justify-center items-center ${className}`}>
      <div
        className={`${sizeClasses[size]} flex items-center justify-center gap-1`}
      >
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className={`${dotSize[size]} rounded-full bg-linear-to-r from-indigo-500 to-purple-500`}
            animate={{
              y: [0, -8, 0],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 0.6,
              repeat: Infinity,
              delay: i * 0.15,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default LoadingSpinner;
