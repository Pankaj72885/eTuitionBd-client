import { cn } from "@/lib/utils";
import { forwardRef } from "react";

const Select = forwardRef(({ className, children, ...props }, ref) => {
  return (
    <select
      className={cn(
        // Base styles
        "flex h-11 w-full items-center justify-between rounded-xl border-2 px-4 py-2 text-base transition-all duration-200 appearance-none cursor-pointer",
        // Background & text
        "bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100",
        // Border
        "border-gray-200 dark:border-gray-700",
        // Focus
        "focus:outline-none focus:border-indigo-500 dark:focus:border-indigo-400 focus:ring-4 focus:ring-indigo-500/10 dark:focus:ring-indigo-400/10",
        // Hover
        "hover:border-gray-300 dark:hover:border-gray-600",
        // Disabled
        "disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-gray-50 dark:disabled:bg-gray-900",
        // Options
        "[&>option]:bg-white dark:[&>option]:bg-gray-800 [&>option]:text-gray-900 dark:[&>option]:text-gray-100 [&>option]:py-2",
        // Custom arrow
        "bg-no-repeat bg-size-[1.25rem_1.25rem] bg-position-[right_0.75rem_center]",
        "bg-[url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20fill%3D%22none%22%20viewBox%3D%220%200%2024%2024%22%20stroke-width%3D%222%22%20stroke%3D%22%239ca3af%22%3E%3Cpath%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20d%3D%22M19.5%208.25l-7.5%207.5-7.5-7.5%22%2F%3E%3C%2Fsvg%3E')]",
        "dark:bg-[url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20fill%3D%22none%22%20viewBox%3D%220%200%2024%2024%22%20stroke-width%3D%222%22%20stroke%3D%22%236b7280%22%3E%3Cpath%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20d%3D%22M19.5%208.25l-7.5%207.5-7.5-7.5%22%2F%3E%3C%2Fsvg%3E')]",
        "pr-10",
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
