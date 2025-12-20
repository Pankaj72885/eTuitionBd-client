import { API_ENDPOINTS } from "../utils/constants";
import axiosInstance from "./axiosInstance";

export const bookmarksAPI = {
  // Add a bookmark
  addBookmark: async (bookmarkData) => {
    const response = await axiosInstance.post(
      API_ENDPOINTS.BOOKMARKS.ADD,
      bookmarkData
    );
    return response.data;
  },

  // Get all bookmarks for current user
  getBookmarks: async () => {
    const response = await axiosInstance.get(API_ENDPOINTS.BOOKMARKS.ALL);
    return response.data;
  },

  // Delete a bookmark
  deleteBookmark: async (id) => {
    const response = await axiosInstance.delete(
      API_ENDPOINTS.BOOKMARKS.DELETE(id)
    );
    return response.data;
  },
};
