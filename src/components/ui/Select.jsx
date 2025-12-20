import { cn } from "@/lib/utils";
import { forwardRef } from "react";

const Select = forwardRef(({ className, children, ...props }, ref) => {
  return (
    <select
      className={cn(
        "flex h-9 w-full items-center justify-between rounded-md border px-3 py-2 text-sm shadow-xs transition-colors",
        "bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100",
        "border-gray-300 dark:border-gray-600",
        "focus:outline-none focus:ring-2 focus:ring-brand dark:focus:ring-indigo-400 focus:ring-offset-0 focus:border-brand dark:focus:border-indigo-400",
        "hover:border-gray-400 dark:hover:border-gray-500",
        "disabled:cursor-not-allowed disabled:opacity-50",
        "[&>option]:bg-white dark:[&>option]:bg-gray-700 [&>option]:text-gray-900 dark:[&>option]:text-gray-100",
        className
      )}
      ref={ref}
      {...props}
    >
      {children}
    </select>
  );
});

Select.displayName = "Select";

export { Select };
