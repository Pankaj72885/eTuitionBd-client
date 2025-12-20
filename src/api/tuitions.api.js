import { API_ENDPOINTS } from "../utils/constants";
import axiosInstance from "./axiosInstance";

export const tuitionsAPI = {
  // Get all tuitions with filters
  getAllTuitions: async (params = {}) => {
    const response = await axiosInstance.get(API_ENDPOINTS.TUITIONS.ALL, {
      params,
    });
    return response.data;
  },

  // Alias for getAllTuitions (used in TuitionsListPage)
  getTuitions: async (params = {}) => {
    const response = await axiosInstance.get(API_ENDPOINTS.TUITIONS.ALL, {
      params,
    });
    return response.data;
  },

  // Get tuition by ID
  getTuitionById: async (id) => {
    const response = await axiosInstance.get(API_ENDPOINTS.TUITIONS.BY_ID(id));
    return response.data.data; // Extract the actual tuition from the wrapper
  },

  // Create new tuition
  createTuition: async (tuitionData) => {
    const response = await axiosInstance.post(
      API_ENDPOINTS.TUITIONS.CREATE,
      tuitionData
    );
    return response.data;
  },

  // Update tuition
  updateTuition: async (id, tuitionData) => {
    const response = await axiosInstance.put(
      API_ENDPOINTS.TUITIONS.UPDATE(id),
      tuitionData
    );
    return response.data;
  },

  // Delete tuition
  deleteTuition: async (id) => {
    const response = await axiosInstance.delete(
      API_ENDPOINTS.TUITIONS.DELETE(id)
    );
    return response.data;
  },

  // Approve tuition (admin only)
  approveTuition: async (id) => {
    const response = await axiosInstance.patch(
      API_ENDPOINTS.TUITIONS.APPROVE(id)
    );
    return response.data;
  },

  // Reject tuition (admin only)
  rejectTuition: async (id) => {
    const response = await axiosInstance.patch(
      API_ENDPOINTS.TUITIONS.REJECT(id)
    );
    return response.data;
  },
};
