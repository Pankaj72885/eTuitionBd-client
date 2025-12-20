import { cn } from "@/lib/utils";

function Input({ className, type, ...props }) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "h-9 w-full min-w-0 rounded-md border px-3 py-1 text-base shadow-xs transition-colors outline-none md:text-sm",
        "bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100",
        "border-gray-300 dark:border-gray-600",
        "placeholder:text-gray-400 dark:placeholder:text-gray-500",
        "focus:border-brand dark:focus:border-indigo-400 focus:ring-2 focus:ring-brand/20 dark:focus:ring-indigo-400/20",
        "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
        "file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-gray-900 dark:file:text-gray-100",
        className
      )}
      {...props}
    />
  );
}

export { Input };
