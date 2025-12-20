import { useQuery } from "@tanstack/react-query";
import { authAPI } from "../api/auth.api";
import { useAuth } from "./useAuth";

export const useUser = () => {
  const { isAuthenticated } = useAuth();

  return useQuery({
    queryKey: ["currentUser"],
    queryFn: authAPI.getCurrentUser,
    enabled: isAuthenticated,
    retry: false,
  });
};
