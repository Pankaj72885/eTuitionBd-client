import { useState, useEffect } from "react";
import { notificationsAPI } from "../api/notifications.api";
import { useAuth } from "./useAuth";

export const useNotifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;

    const fetchNotifications = async () => {
      try {
        const data = await notificationsAPI.getNotifications();
        setNotifications(data.data);
        setUnreadCount(data.data.filter((n) => !n.read).length);
      } catch (error) {
        console.error("Failed to fetch notifications:", error);
      }
    };

    fetchNotifications();

    // Set up polling for new notifications
    const intervalId = setInterval(fetchNotifications, 60000); // Check every minute

    return () => clearInterval(intervalId);
  }, [user]);

  const markAsRead = async (id) => {
    try {
      await notificationsAPI.markAsRead(id);
      setNotifications((prev) =>
        prev.map((notification) =>
          notification._id === id
            ? { ...notification, read: true }
            : notification
        )
      );
      setUnreadCount((prev) => Math.max(0, prev - 1));
    } catch (error) {
      console.error("Failed to mark notification as read:", error);
    }
  };

  const markAllAsRead = async () => {
    try {
      // In a real app, there would be an API endpoint to mark all as read
      // For now, we'll just update the local state
      setNotifications((prev) =>
        prev.map((notification) => ({ ...notification, read: true }))
      );
      setUnreadCount(0);
    } catch (error) {
      console.error("Failed to mark all notifications as read:", error);
    }
  };

  return {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
  };
};
