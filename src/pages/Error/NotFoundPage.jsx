import { Button } from "@/components/ui/Button";
import { HomeIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import { Link } from "react-router";

const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 dark:bg-gray-900 transition-colors duration-200 px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-2xl mx-auto"
      >
        {/* Animated 404 */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
          className="mb-8"
        >
          <div className="relative inline-block">
            <h1 className="text-[150px] md:text-[200px] font-bold text-transparent bg-clip-text bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 leading-none">
              404
            </h1>
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="absolute -top-4 -right-4 md:-top-6 md:-right-6"
            >
              <span className="text-5xl md:text-6xl">🔍</span>
            </motion.div>
          </div>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-10"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Oops! Page not found
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-md mx-auto leading-relaxed">
            The page you're looking for might have been removed, had its name
            changed, or is temporarily unavailable.
          </p>
        </motion.div>

        {/* Illustration */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mb-10"
        >
          <div className="inline-flex items-center justify-center gap-3 p-4 rounded-2xl bg-gray-100 dark:bg-gray-800">
            <div className="w-12 h-12 rounded-xl bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center">
              <div className="w-3 h-3 rounded-full bg-indigo-500 animate-pulse" />
            </div>
            <div className="flex gap-1">
              <div
                className="w-2 h-8 bg-gray-300 dark:bg-gray-600 rounded-full animate-bounce"
                style={{ animationDelay: "0ms" }}
              />
              <div
                className="w-2 h-8 bg-gray-300 dark:bg-gray-600 rounded-full animate-bounce"
                style={{ animationDelay: "150ms" }}
              />
              <div
                className="w-2 h-8 bg-gray-300 dark:bg-gray-600 rounded-full animate-bounce"
                style={{ animationDelay: "300ms" }}
              />
            </div>
            <div className="w-12 h-12 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
              <div className="w-3 h-3 rounded-full bg-purple-500 animate-pulse" />
            </div>
          </div>
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link to="/">
            <Button className="gap-2 px-6">
              <HomeIcon className="w-5 h-5" />
              Back to Home
            </Button>
          </Link>
          <Link to="/tuitions">
            <Button variant="outline" className="gap-2 px-6">
              <MagnifyingGlassIcon className="w-5 h-5" />
              Browse Tuitions
            </Button>
          </Link>
        </motion.div>

        {/* Help Text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-12 text-sm text-gray-500 dark:text-gray-400"
        >
          Need help?{" "}
          <Link
            to="/contact"
            className="text-indigo-600 dark:text-indigo-400 hover:underline"
          >
            Contact our support team
          </Link>
        </motion.p>
      </motion.div>
    </div>
  );
};

export default NotFoundPage;
