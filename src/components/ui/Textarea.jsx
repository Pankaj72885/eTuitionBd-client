import { cn } from "@/lib/utils";

function Textarea({ className, ...props }) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "flex field-sizing-content min-h-16 w-full rounded-md border px-3 py-2 text-base shadow-xs transition-colors outline-none md:text-sm",
        "bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100",
        "border-gray-300 dark:border-gray-600",
        "placeholder:text-gray-400 dark:placeholder:text-gray-500",
        "focus:border-brand dark:focus:border-indigo-400 focus:ring-2 focus:ring-brand/20 dark:focus:ring-indigo-400/20",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    />
  );
}

export { Textarea };
