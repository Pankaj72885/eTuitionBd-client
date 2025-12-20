import { format } from "date-fns";

export const formatDate = (date, formatString = "MMM dd, yyyy") => {
  if (!date) return "";

  try {
    return format(new Date(date), formatString);
  } catch (error) {
    console.error("Error formatting date:", error);
    return "";
  }
};

export const formatDateTime = (date, formatString = "MMM dd, yyyy HH:mm") => {
  if (!date) return "";

  try {
    return format(new Date(date), formatString);
  } catch (error) {
    console.error("Error formatting date time:", error);
    return "";
  }
};

export const formatRelativeTime = (date) => {
  if (!date) return "";

  try {
    const now = new Date();
    const targetDate = new Date(date);
    const diffInSeconds = Math.floor((now - targetDate) / 1000);

    if (diffInSeconds < 60) {
      return "just now";
    }

    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) {
      return `${diffInMinutes} minute${diffInMinutes > 1 ? "s" : ""} ago`;
    }

    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) {
      return `${diffInHours} hour${diffInHours > 1 ? "s" : ""} ago`;
    }

    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) {
      return `${diffInDays} day${diffInDays > 1 ? "s" : ""} ago`;
    }

    return formatDate(date);
  } catch (error) {
    console.error("Error formatting relative time:", error);
    return "";
  }
};
