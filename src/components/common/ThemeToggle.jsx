import { useTheme } from "@/hooks/useTheme";
import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";
import { AnimatePresence, motion } from "framer-motion";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <motion.button
      onClick={toggleTheme}
      className="relative w-10 h-10 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 overflow-hidden"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <AnimatePresence mode="wait">
        {isDark ? (
          <motion.div
            key="moon"
            initial={{ y: 20, opacity: 0, rotate: -90 }}
            animate={{ y: 0, opacity: 1, rotate: 0 }}
            exit={{ y: -20, opacity: 0, rotate: 90 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <MoonIcon className="w-5 h-5 text-indigo-400" />
          </motion.div>
        ) : (
          <motion.div
            key="sun"
            initial={{ y: 20, opacity: 0, rotate: 90 }}
            animate={{ y: 0, opacity: 1, rotate: 0 }}
            exit={{ y: -20, opacity: 0, rotate: -90 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <SunIcon className="w-5 h-5 text-amber-500" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Background glow effect */}
      <motion.div
        className="absolute inset-0 rounded-xl opacity-0"
        animate={{
          backgroundColor: isDark
            ? "rgba(99, 102, 241, 0.2)"
            : "rgba(245, 158, 11, 0.2)",
          opacity: 0,
        }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
      />
    </motion.button>
  );
}
