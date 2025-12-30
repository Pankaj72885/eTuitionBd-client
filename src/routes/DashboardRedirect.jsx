import LoadingSpinner from "@/components/common/LoadingSpinner";
import { useAuth } from "@/hooks/useAuth";
import { Navigate } from "react-router";

/**
 * Redirects users to their role-specific dashboard
 * /dashboard -> /dashboard/{role}
 */
const DashboardRedirect = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Redirect to user's role-specific dashboard
  const dashboardPath = `/dashboard/${user.role}`;
  return <Navigate to={dashboardPath} replace />;
};

export default DashboardRedirect;
