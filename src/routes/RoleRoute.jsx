import React from "react";
import { Navigate } from "react-router";
import { useAuth } from "../hooks/useAuth";

const RoleRoute = ({ children, role }) => {
  const { user } = useAuth();

  if (!user || user.role !== role) {
    // Redirect to appropriate dashboard based on user role
    return <Navigate to={`/dashboard/${user?.role || "student"}`} replace />;
  }

  return children;
};

export default RoleRoute;
