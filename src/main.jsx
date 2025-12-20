import { AuthProvider } from "@/context/AuthContext";
import { AuthProvider as FirebaseAuthProvider } from "@/context/FirebaseAuthContext";
import router from "@/routes/appRoutes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";
import "./index.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 1,
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: 1,
    },
  },
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <FirebaseAuthProvider>
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
      </FirebaseAuthProvider>
    </QueryClientProvider>
  </StrictMode>
);
