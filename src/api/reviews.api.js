import { API_ENDPOINTS } from "../utils/constants";
import axiosInstance from "./axiosInstance";

export const reviewsAPI = {
  // Create a review
  createReview: async (reviewData) => {
    const response = await axiosInstance.post(
      API_ENDPOINTS.REVIEWS.CREATE,
      reviewData
    );
    return response.data;
  },

  // Get reviews for a tutor
  getTutorReviews: async (tutorId) => {
    const response = await axiosInstance.get(
      API_ENDPOINTS.REVIEWS.BY_TUTOR(tutorId)
    );
    return response.data;
  },
};
