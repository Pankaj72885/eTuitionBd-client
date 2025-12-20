import React from "react";
import clsx from "clsx";

const StatusBadge = ({ status, className }) => {
  const getStatusClasses = () => {
    switch (status) {
      case "Pending":
        return "bg-amber-50 text-amber-700";
      case "Approved":
      case "Ongoing":
        return "bg-emerald-50 text-emerald-700";
      case "Rejected":
        return "bg-red-50 text-red-700";
      case "Open":
        return "bg-brand-light text-brand-dark";
      case "Completed":
        return "bg-sky-50 text-sky-700";
      case "Closed":
        return "bg-gray-100 text-gray-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <span
      className={clsx(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
        getStatusClasses(),
        className
      )}
    >
      {status}
    </span>
  );
};

export default StatusBadge;
