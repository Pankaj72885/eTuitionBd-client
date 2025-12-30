import { Card, CardContent } from "@/components/ui/Card";
import {
  ArrowTrendingDownIcon,
  ArrowTrendingUpIcon,
} from "@heroicons/react/24/outline";
import { motion } from "framer-motion";

const DashboardCard = ({
  title,
  value,
  icon,
  change,
  changeType,
  color = "indigo",
  subtitle,
  ...props
}) => {
  const colorVariants = {
    indigo: {
      bg: "bg-indigo-100 dark:bg-indigo-900/30",
      text: "text-indigo-600 dark:text-indigo-400",
      gradient: "from-indigo-500 to-purple-500",
      glow: "group-hover:shadow-indigo-500/20",
    },
    purple: {
      bg: "bg-purple-100 dark:bg-purple-900/30",
      text: "text-purple-600 dark:text-purple-400",
      gradient: "from-purple-500 to-pink-500",
      glow: "group-hover:shadow-purple-500/20",
    },
    emerald: {
      bg: "bg-emerald-100 dark:bg-emerald-900/30",
      text: "text-emerald-600 dark:text-emerald-400",
      gradient: "from-emerald-500 to-teal-500",
      glow: "group-hover:shadow-emerald-500/20",
    },
    amber: {
      bg: "bg-amber-100 dark:bg-amber-900/30",
      text: "text-amber-600 dark:text-amber-400",
      gradient: "from-amber-500 to-orange-500",
      glow: "group-hover:shadow-amber-500/20",
    },
    pink: {
      bg: "bg-pink-100 dark:bg-pink-900/30",
      text: "text-pink-600 dark:text-pink-400",
      gradient: "from-pink-500 to-rose-500",
      glow: "group-hover:shadow-pink-500/20",
    },
    cyan: {
      bg: "bg-cyan-100 dark:bg-cyan-900/30",
      text: "text-cyan-600 dark:text-cyan-400",
      gradient: "from-cyan-500 to-blue-500",
      glow: "group-hover:shadow-cyan-500/20",
    },
  };

  const selectedColor = colorVariants[color] || colorVariants.indigo;

  return (
    <Card
      className={`overflow-hidden group card-hover ${selectedColor.glow}`}
      {...props}
    >
      {/* Top gradient bar */}
      <div className={`h-1 bg-linear-to-r ${selectedColor.gradient}`} />

      <CardContent className="p-5">
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
              {title}
            </p>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mt-1 truncate"
            >
              {value}
            </motion.p>

            {/* Change indicator or subtitle */}
            {change && (
              <div
                className={`flex items-center gap-1 mt-2 text-sm font-medium ${
                  changeType === "increase"
                    ? "text-emerald-600 dark:text-emerald-400"
                    : changeType === "decrease"
                    ? "text-red-500 dark:text-red-400"
                    : "text-gray-500 dark:text-gray-400"
                }`}
              >
                {changeType === "increase" && (
                  <ArrowTrendingUpIcon className="w-4 h-4" />
                )}
                {changeType === "decrease" && (
                  <ArrowTrendingDownIcon className="w-4 h-4" />
                )}
                <span>{change}</span>
              </div>
            )}

            {subtitle && !change && (
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 truncate">
                {subtitle}
              </p>
            )}
          </div>

          {/* Icon container with hover effect */}
          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: "spring", stiffness: 300 }}
            className={`w-12 h-12 rounded-2xl ${selectedColor.bg} flex items-center justify-center ${selectedColor.text} shrink-0 ml-4`}
          >
            <div className="w-6 h-6">{icon}</div>
          </motion.div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DashboardCard;
