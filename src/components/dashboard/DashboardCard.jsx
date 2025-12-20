import React from "react";
import {Card, CardContent} from "@/components/ui/Card";

const DashboardCard = ({ title, value, icon, change, changeType }) => {
  const getChangeColor = () => {
    if (changeType === "increase") return "text-green-600";
    if (changeType === "decrease") return "text-red-600";
    return "text-gray-500";
  };

  return (
    <Card className="overflow-hidden">
      <CardContent>
        <div className="flex items-center">
          <div className="shrink-0">
            <div className="w-10 h-10 bg-brand-light rounded-lg flex items-center justify-center text-brand">
              {icon}
            </div>
          </div>
          <div className="ml-4 flex-1">
            <p className="text-sm font-medium text-gray-500 truncate">
              {title}
            </p>
            <p className="text-2xl font-semibold text-gray-900">{value}</p>
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
