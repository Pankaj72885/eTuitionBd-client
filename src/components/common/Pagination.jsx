import { Button } from "@/components/ui/Button";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pages = [];
  const maxVisiblePages = 5;

  // Calculate visible page numbers
  let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
  let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

  // Adjust if we're at the end
  if (endPage - startPage + 1 < maxVisiblePages) {
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }

  // Add page numbers
  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  if (totalPages <= 1) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col sm:flex-row items-center justify-between gap-4 px-2 py-4"
    >
      {/* Mobile View */}
      <div className="flex sm:hidden items-center gap-3 w-full">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="flex-1 gap-2 rounded-xl"
        >
          <ChevronLeftIcon className="w-4 h-4" />
          Previous
        </Button>
        <span className="text-sm font-medium text-gray-600 dark:text-gray-300 px-3">
          {currentPage} / {totalPages}
        </span>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="flex-1 gap-2 rounded-xl"
        >
          Next
          <ChevronRightIcon className="w-4 h-4" />
        </Button>
      </div>

      {/* Desktop View */}
      <div className="hidden sm:flex sm:items-center sm:justify-between w-full">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Page{" "}
          <span className="font-semibold text-gray-900 dark:text-white">
            {currentPage}
          </span>{" "}
          of{" "}
          <span className="font-semibold text-gray-900 dark:text-white">
            {totalPages}
          </span>
        </p>

        <nav className="flex items-center gap-1" aria-label="Pagination">
          {/* Previous Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="w-9 h-9 p-0 rounded-xl"
          >
            <ChevronLeftIcon className="w-5 h-5" />
          </Button>

          {/* First Page */}
          {startPage > 1 && (
            <>
              <Button
                variant={currentPage === 1 ? "primary" : "ghost"}
                size="sm"
                onClick={() => onPageChange(1)}
                className="w-9 h-9 p-0 rounded-xl"
              >
                1
              </Button>
              {startPage > 2 && (
                <span className="w-9 h-9 flex items-center justify-center text-gray-400 dark:text-gray-500">
                  ⋯
                </span>
              )}
            </>
          )}

          {/* Page Numbers */}
          {pages.map((page) => (
            <motion.div
              key={page}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                variant={page === currentPage ? "primary" : "ghost"}
                size="sm"
                onClick={() => onPageChange(page)}
                className={`w-9 h-9 p-0 rounded-xl ${
                  page === currentPage ? "shadow-lg shadow-indigo-500/20" : ""
                }`}
              >
                {page}
              </Button>
            </motion.div>
          ))}

          {/* Last Page */}
          {endPage < totalPages && (
            <>
              {endPage < totalPages - 1 && (
                <span className="w-9 h-9 flex items-center justify-center text-gray-400 dark:text-gray-500">
                  ⋯
                </span>
              )}
              <Button
                variant={currentPage === totalPages ? "primary" : "ghost"}
                size="sm"
                onClick={() => onPageChange(totalPages)}
                className="w-9 h-9 p-0 rounded-xl"
              >
                {totalPages}
              </Button>
            </>
          )}

          {/* Next Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="w-9 h-9 p-0 rounded-xl"
          >
            <ChevronRightIcon className="w-5 h-5" />
          </Button>
        </nav>
      </div>
    </motion.div>
  );
};

export default Pagination;
