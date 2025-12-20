import { AuthProvider } from "@/context/AuthContext";
import { AuthProvider as FirebaseAuthProvider } from "@/context/FirebaseAuthContext";
import { ThemeProvider } from "@/context/ThemeContext.jsx";
import router from "@/routes/appRoutes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Toaster } from "react-hot-toast";
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
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <FirebaseAuthProvider>
          <AuthProvider>
            <RouterProvider router={router} />
            <Toaster position="top-right" />
          </AuthProvider>
        </FirebaseAuthProvider>
      </QueryClientProvider>
    </ThemeProvider>
  </StrictMode>
);
