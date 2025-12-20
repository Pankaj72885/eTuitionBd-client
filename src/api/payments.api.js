import { API_ENDPOINTS } from "../utils/constants";
import axiosInstance from "./axiosInstance";

export const paymentsAPI = {
  // Create payment intent
  createPaymentIntent: async (paymentData) => {
    const response = await axiosInstance.post(
      API_ENDPOINTS.PAYMENTS.CREATE_INTENT,
      paymentData
    );
    return response.data;
  },

  // Get student payment history
  getStudentPayments: async () => {
    const response = await axiosInstance.get(API_ENDPOINTS.PAYMENTS.STUDENT);
    return response.data;
  },

  // Get tutor payment history (if applicable, e.g. earnings)
  getTutorPayments: async () => {
    const response = await axiosInstance.get(API_ENDPOINTS.PAYMENTS.TUTOR);
    return response.data;
  },

  // Get all payments (admin)
  getAdminPayments: async (params = {}) => {
    const response = await axiosInstance.get(API_ENDPOINTS.PAYMENTS.ADMIN, {
      params,
    });
    return response.data;
  },
};
