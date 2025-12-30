import { cva } from "class-variance-authority";

export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-medium transition-all duration-200 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-900",
  {
    variants: {
      variant: {
        default:
          "bg-indigo-600 text-white hover:bg-indigo-700 focus-visible:ring-indigo-500 shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/30",
        primary:
          "bg-linear-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700 shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 focus-visible:ring-indigo-500",
        destructive:
          "bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-500 shadow-lg shadow-red-500/20",
        danger:
          "bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-500 shadow-lg shadow-red-500/20",
        outline:
          "border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-gray-300 dark:hover:border-gray-600 focus-visible:ring-gray-500",
        secondary:
          "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-700 focus-visible:ring-gray-500",
        ghost:
          "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 focus-visible:ring-gray-500",
        link: "text-indigo-600 dark:text-indigo-400 underline-offset-4 hover:underline focus-visible:ring-indigo-500",
        success:
          "bg-emerald-600 text-white hover:bg-emerald-700 focus-visible:ring-emerald-500 shadow-lg shadow-emerald-500/20",
      },
      size: {
        default: "h-10 px-5 py-2",
        sm: "h-8 px-3 text-xs gap-1.5",
        lg: "h-12 px-8 text-base",
        xl: "h-14 px-10 text-lg",
        icon: "h-10 w-10 p-0",
        "icon-sm": "h-8 w-8 p-0",
        "icon-lg": "h-12 w-12 p-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);
