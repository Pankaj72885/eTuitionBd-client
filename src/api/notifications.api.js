import { API_ENDPOINTS } from "../utils/constants";
import axiosInstance from "./axiosInstance";

export const notificationsAPI = {
  // Get all notifications
  getNotifications: async () => {
    const response = await axiosInstance.get(API_ENDPOINTS.NOTIFICATIONS.ALL);
    return response.data;
  },

  // Mark notification as read
  markAsRead: async (id) => {
    const response = await axiosInstance.patch(
      API_ENDPOINTS.NOTIFICATIONS.MARK_READ(id)
    );
    return response.data;
  },
};
