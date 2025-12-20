// API endpoints
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    ME: '/auth/me',
  },
  USERS: {
    ALL: '/users',
    BY_ID: (id) => `/users/${id}`,
    UPDATE: (id) => `/users/${id}`,
    CHANGE_ROLE: (id) => `/users/${id}/role`,
    DELETE: (id) => `/users/${id}`,
  },
  TUITIONS: {
    ALL: '/tuitions',
    BY_ID: (id) => `/tuitions/${id}`,
    CREATE: '/tuitions',
    UPDATE: (id) => `/tuitions/${id}`,
    DELETE: (id) => `/tuitions/${id}`,
  },
  APPLICATIONS: {
    APPLY: '/applications',
    STUDENT: '/applications/student',
    TUTOR: '/applications/tutor',
    BY_ID: (id) => `/applications/${id}`,
    UPDATE: (id) => `/applications/${id}`,
    DELETE: (id) => `/applications/${id}`,
  },
  PAYMENTS: {
    CREATE_INTENT: '/payments/create-intent',
    WEBHOOK: '/payments/webhook',
    STUDENT: '/payments/student',
    TUTOR: '/payments/tutor',
    ADMIN: '/payments/admin',
  },
  REVIEWS: {
    CREATE: '/reviews',
    BY_TUTOR: (tutorId) => `/reviews/tutor/${tutorId}`,
  },
  MESSAGES: {
    SEND: '/messages',
    BY_CONVERSATION: (conversationId) => `/messages/${conversationId}`,
  },
  NOTIFICATIONS: {
    ALL: '/notifications',
    MARK_READ: (id) => `/notifications/${id}/read`,
  },
  BOOKMARKS: {
    ADD: '/bookmarks',
    ALL: '/bookmarks',
    DELETE: (id) => `/bookmarks/${id}`,
  },
};

// Status options
export const TUITION_STATUS = {
  PENDING: 'Pending',
  APPROVED: 'Approved',
  REJECTED: 'Rejected',
  OPEN: 'Open',
  ONGOING: 'Ongoing',
  COMPLETED: 'Completed',
  CLOSED: 'Closed'
};
