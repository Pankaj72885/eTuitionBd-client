import axiosInstance from "./axiosInstance";

export const authAPI = {
  // Login with email/password or Google
  login: async (idToken) => {
    const response = await axiosInstance.post("/auth/login", { idToken });
    return response.data;
  },

  // Register new user
  register: async (userData) => {
    // userData should contain { idToken, name, email, phone, role, city }
    const response = await axiosInstance.post("/auth/register", userData);
    return response.data;
  },

  // Google register (same as register, but explicitly named for clarity)
  googleRegister: async (userData) => {
    // userData should contain { idToken, name, email, phone, role, city }
    const response = await axiosInstance.post("/auth/register", userData);
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
