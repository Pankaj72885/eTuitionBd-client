import { cn } from "@/lib/utils";
import {
  ArrowPathIcon,
  CheckCircleIcon,
  ClockIcon,
  ExclamationCircleIcon,
  LockClosedIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";

const StatusBadge = ({ status, className, showIcon = true }) => {
  const getStatusConfig = () => {
    switch (status) {
      case "Pending":
      case "PendingApproval":
        return {
          bg: "bg-amber-50 dark:bg-amber-900/20",
          text: "text-amber-700 dark:text-amber-400",
          border: "border-amber-200 dark:border-amber-800/50",
          icon: ClockIcon,
          iconColor: "text-amber-500",
        };
      case "Approved":
      case "Ongoing":
      case "Succeeded":
      case "Active":
        return {
          bg: "bg-emerald-50 dark:bg-emerald-900/20",
          text: "text-emerald-700 dark:text-emerald-400",
          border: "border-emerald-200 dark:border-emerald-800/50",
          icon: CheckCircleIcon,
          iconColor: "text-emerald-500",
        };
      case "Rejected":
      case "Failed":
      case "Cancelled":
        return {
          bg: "bg-red-50 dark:bg-red-900/20",
          text: "text-red-700 dark:text-red-400",
          border: "border-red-200 dark:border-red-800/50",
          icon: XCircleIcon,
          iconColor: "text-red-500",
        };
      case "Open":
        return {
          bg: "bg-indigo-50 dark:bg-indigo-900/20",
          text: "text-indigo-700 dark:text-indigo-400",
          border: "border-indigo-200 dark:border-indigo-800/50",
          icon: ArrowPathIcon,
          iconColor: "text-indigo-500",
        };
      case "Completed":
        return {
          bg: "bg-sky-50 dark:bg-sky-900/20",
          text: "text-sky-700 dark:text-sky-400",
          border: "border-sky-200 dark:border-sky-800/50",
          icon: CheckCircleIcon,
          iconColor: "text-sky-500",
        };
      case "Closed":
      case "Inactive":
        return {
          bg: "bg-gray-100 dark:bg-gray-800",
          text: "text-gray-600 dark:text-gray-400",
          border: "border-gray-200 dark:border-gray-700",
          icon: LockClosedIcon,
          iconColor: "text-gray-500",
        };
      case "Warning":
        return {
          bg: "bg-orange-50 dark:bg-orange-900/20",
          text: "text-orange-700 dark:text-orange-400",
          border: "border-orange-200 dark:border-orange-800/50",
          icon: ExclamationCircleIcon,
          iconColor: "text-orange-500",
        };
      default:
        return {
          bg: "bg-gray-100 dark:bg-gray-800",
          text: "text-gray-600 dark:text-gray-400",
          border: "border-gray-200 dark:border-gray-700",
          icon: null,
          iconColor: "text-gray-500",
        };
    }
  };

  const config = getStatusConfig();
  const Icon = config.icon;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border transition-colors",
        config.bg,
        config.text,
        config.border,
        className
      )}
    >
      {showIcon && Icon && (
        <Icon className={cn("w-3.5 h-3.5", config.iconColor)} />
      )}
      {status}
    </span>
  );
};

export default StatusBadge;
