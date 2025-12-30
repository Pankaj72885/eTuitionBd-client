import { cn } from "@/lib/utils";

function Textarea({ className, ...props }) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        // Base styles
        "flex min-h-[120px] w-full rounded-xl border-2 bg-white dark:bg-gray-800 px-4 py-3 text-base transition-all duration-200 resize-none",
        // Border & focus
        "border-gray-200 dark:border-gray-700",
        "focus:border-indigo-500 dark:focus:border-indigo-400 focus:ring-4 focus:ring-indigo-500/10 dark:focus:ring-indigo-400/10",
        "focus:outline-none",
        // Text
        "text-gray-900 dark:text-gray-100",
        "placeholder:text-gray-400 dark:placeholder:text-gray-500",
        // Hover
        "hover:border-gray-300 dark:hover:border-gray-600",
        // Disabled
        "disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-gray-50 dark:disabled:bg-gray-900",
        className
      )}
      {...props}
    />
  );
}

export { Textarea };
