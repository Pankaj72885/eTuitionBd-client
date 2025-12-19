import axiosInstance from "./axiosInstance";

export const authAPI = {
  // Login with email/password
  login: async (credentials) => {
    const response = await axiosInstance.post("/auth/login", credentials);
    return response.data;
  },

  // Login with Google
  googleLogin: async () => {
    // In a real app, this would handle Google OAuth
    // For now, we'll simulate a Google login
    const response = await axiosInstance.post("/auth/google", {});
    return response.data;
  },

  // Register new user
  register: async (userData) => {
    const response = await axiosInstance.post("/auth/register", userData);
    return response.data;
  },

  // Register with Google
  googleRegister: async (userData) => {
    // In a real app, this would handle Google OAuth registration
    const response = await axiosInstance.post(
      "/auth/google/register",
      userData
    );
    return response.data;
  },

  // Get current user info
  getCurrentUser: async () => {
    const response = await axiosInstance.get("/auth/me");
    return response.data;
  },

  // Logout (clear token)
  logout: () => {
    localStorage.removeItem("token");
  },
};
