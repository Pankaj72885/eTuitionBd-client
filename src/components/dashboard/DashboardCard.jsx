import { Card, CardContent } from "@/components/ui/Card";

const DashboardCard = ({
  title,
  value,
  icon,
  change,
  changeType,
  ...props
}) => {
  const getChangeColor = () => {
    if (changeType === "increase") return "text-green-600";
    if (changeType === "decrease") return "text-red-600";
    return "text-gray-500";
  };

  return (
    <Card className="overflow-hidden" {...props}>
      <CardContent>
        <div className="flex items-center">
          <div className="shrink-0">
            <div className="w-10 h-10 bg-indigo-50 dark:bg-indigo-900/30 rounded-lg flex items-center justify-center text-indigo-600 dark:text-indigo-400">
              {icon}
            </div>
          </div>
          <div className="ml-4 flex-1">
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
              {title}
            </p>
            <p className="text-2xl font-semibold text-gray-900 dark:text-white">
              {value}
            </p>
            {change && (
              <p className={`text-sm ${getChangeColor()}`}>
                {changeType === "increase" && "+"}
                {change} from last month
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DashboardCard;
