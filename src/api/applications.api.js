import { API_ENDPOINTS } from "../utils/constants";
import axiosInstance from "./axiosInstance";

export const applicationsAPI = {
  // Apply for a tuition
  applyForTuition: async (applicationData) => {
    const response = await axiosInstance.post(
      API_ENDPOINTS.APPLICATIONS.APPLY,
      applicationData
    );
    return response.data;
  },

  // Get applications for student (my tuitions' applications)
  getStudentApplications: async () => {
    const response = await axiosInstance.get(
      API_ENDPOINTS.APPLICATIONS.STUDENT
    );
    return response.data;
  },

  // Get applications for tutor (my applications)
  getTutorApplications: async () => {
    const response = await axiosInstance.get(API_ENDPOINTS.APPLICATIONS.TUTOR);
    return response.data;
  },

  // Get application by ID
  getApplicationById: async (id) => {
    const response = await axiosInstance.get(
      API_ENDPOINTS.APPLICATIONS.BY_ID(id)
    );
    return response.data;
  },

  // Update application status
  updateApplicationStatus: async (id, status) => {
    const response = await axiosInstance.patch(
      API_ENDPOINTS.APPLICATIONS.UPDATE(id),
      { status }
    );
    return response.data;
  },

  // Delete application
  deleteApplication: async (id) => {
    const response = await axiosInstance.delete(
      API_ENDPOINTS.APPLICATIONS.DELETE(id)
    );
    return response.data;
  },
};
