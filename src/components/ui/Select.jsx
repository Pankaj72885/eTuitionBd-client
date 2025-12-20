import { cn } from "@/lib/utils";
import { forwardRef } from "react";

const Select = forwardRef(({ className, children, ...props }, ref) => {
  return (
    <select
      className={cn(
        "flex h-9 w-full items-center justify-between rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-xs transition-colors",
        "focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2",
        "disabled:cursor-not-allowed disabled:opacity-50",
        "hover:border-gray-400",
        "[&>option]:bg-white [&>option]:text-gray-900",
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
