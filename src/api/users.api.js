import axiosInstance from "./axiosInstance";

export const usersAPI = {
  // Get all users (admin only)
  getAllUsers: async (params = {}) => {
    const response = await axiosInstance.get("/users", { params });
    return response.data;
  },

  // Get user by ID
  getUserById: async (id) => {
    const response = await axiosInstance.get(`/users/${id}`);
    return response.data;
  },

  // Update user profile
  updateUserProfile: async (id, userData) => {
    const response = await axiosInstance.put(`/users/${id}`, userData);
    return response.data;
  },

  // Change user role (admin only)
  changeUserRole: async (id, role) => {
    const response = await axiosInstance.patch(`/users/${id}/role`, { role });
    return response.data;
  },

  // Delete user (admin only)
  deleteUser: async (id) => {
    const response = await axiosInstance.delete(`/users/${id}`);
    return response.data;
  },
};
