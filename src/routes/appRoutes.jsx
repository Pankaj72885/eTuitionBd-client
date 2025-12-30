import { createBrowserRouter, Outlet } from "react-router";
import DashboardLayout from "../layouts/DashboardLayout";
import MainLayout from "../layouts/MainLayout";
import NotFoundPage from "../pages/Error/NotFoundPage";
import DashboardRedirect from "./DashboardRedirect";
import PrivateRoute from "./PrivateRoute";
import RoleRoute from "./RoleRoute";

// Public Pages
import AboutPage from "@/pages/About/AboutPage";
import LoginPage from "@/pages/auth/LoginPage";
import RegisterPage from "@/pages/auth/RegisterPage";
import ContactPage from "@/pages/Contact/ContactPage";
import HomePage from "@/pages/home/HomePage";
import TuitionDetailsPage from "@/pages/Tuitions/TuitionDetailsPage";
import TuitionsListPage from "@/pages/Tuitions/TuitionsListPage";
import PaymentCheckoutPage from "../pages/payment/PaymentCheckoutPage";
import TutorProfilePage from "../pages/Tutors/TutorProfilePage";
import TutorsListPage from "../pages/Tutors/TutorsListPage";

// Student Dashboard Pages
import AppliedTutors from "../pages-dashboard/student/AppliedTutors";
import MyTuitions from "../pages-dashboard/student/MyTuitions";
import PostNewTuition from "../pages-dashboard/student/PostNewTuition";
import StudentBookmarks from "../pages-dashboard/student/StudentBookmarks";
import StudentDashboardHome from "../pages-dashboard/student/StudentDashboardHome";
import StudentPayments from "../pages-dashboard/student/StudentPayments";
import StudentProfileSettings from "../pages-dashboard/student/StudentProfileSettings";

// Tutor Dashboard Pages
import MyApplications from "../pages-dashboard/tutor/MyApplications";
import TutorDashboardHome from "../pages-dashboard/tutor/TutorDashboardHome";
import TutorOngoingTuitions from "../pages-dashboard/tutor/TutorOngoingTuitions";
import TutorProfileSettings from "../pages-dashboard/tutor/TutorProfileSettings";
import TutorRevenueHistory from "../pages-dashboard/tutor/TutorRevenueHistory";

// Admin Dashboard Pages
import AdminAnalytics from "../pages-dashboard/admin/AdminAnalytics";
import AdminDashboardHome from "../pages-dashboard/admin/AdminDashboardHome";
import AdminProfileSettings from "../pages-dashboard/admin/AdminProfileSettings";
import ReportsTransactions from "../pages-dashboard/admin/ReportsTransactions";
import TuitionManagement from "../pages-dashboard/admin/TuitionManagement";
import UserManagement from "../pages-dashboard/admin/UserManagement";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <NotFoundPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "login", element: <LoginPage /> },
      { path: "register", element: <RegisterPage /> },
      { path: "tuitions", element: <TuitionsListPage /> },
      { path: "tuitions/:id", element: <TuitionDetailsPage /> },
      { path: "tutors", element: <TutorsListPage /> },
      { path: "tutors/:id", element: <TutorProfilePage /> },
      { path: "about", element: <AboutPage /> },
      { path: "contact", element: <ContactPage /> },
      {
        path: "payment/checkout",
        element: (
          <PrivateRoute>
            <RoleRoute role="student">
              <PaymentCheckoutPage />
            </RoleRoute>
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        // Redirect to role-specific dashboard
        index: true,
        element: <DashboardRedirect />,
      },
      // Student Routes
      {
        path: "student",
        element: (
          <RoleRoute role="student">
            <Outlet />
          </RoleRoute>
        ),
        children: [
          { index: true, element: <StudentDashboardHome /> },
          { path: "tuitions", element: <MyTuitions /> },
          { path: "post-tuition", element: <PostNewTuition /> },
          { path: "post-tuition/:id", element: <PostNewTuition /> },
          { path: "applications", element: <AppliedTutors /> },
          { path: "payments", element: <StudentPayments /> },
          { path: "bookmarks", element: <StudentBookmarks /> },
          { path: "profile", element: <StudentProfileSettings /> },
        ],
      },
      // Tutor Routes
      {
        path: "tutor",
        element: (
          <RoleRoute role="tutor">
            <Outlet />
          </RoleRoute>
        ),
        children: [
          { index: true, element: <TutorDashboardHome /> },
          { path: "applications", element: <MyApplications /> },
          { path: "ongoing", element: <TutorOngoingTuitions /> },
          { path: "revenue", element: <TutorRevenueHistory /> },
          { path: "profile", element: <TutorProfileSettings /> },
        ],
      },
      // Admin Routes
      {
        path: "admin",
        element: (
          <RoleRoute role="admin">
            <Outlet />
          </RoleRoute>
        ),
        children: [
          { index: true, element: <AdminDashboardHome /> },
          { path: "users", element: <UserManagement /> },
          { path: "tuitions", element: <TuitionManagement /> },
          { path: "reports", element: <ReportsTransactions /> },
          { path: "analytics", element: <AdminAnalytics /> },
          { path: "profile", element: <AdminProfileSettings role="admin" /> },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

export default router;
