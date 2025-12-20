import React from "react";

const SkeletonCard = () => {
  return (
    <div className="bg-white border border-gray-100 rounded-xl shadow-sm p-4 md:p-6 animate-pulse">
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-2/3 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
        </div>
        <div className="h-6 bg-gray-200 rounded w-16 ml-4"></div>
      </div>
      <div className="mt-4 flex justify-between">
        <div className="h-8 bg-gray-200 rounded w-24"></div>
        <div className="h-8 bg-gray-200 rounded w-20"></div>
      </div>
    </div>
  );
};

export default SkeletonCard;
