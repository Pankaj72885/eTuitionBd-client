import { authAPI } from "@/api/auth.api";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useAuth } from "@/hooks/useAuth";
import { useFirebaseAuth } from "@/hooks/useFirebaseAuth";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router";

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login: setAuthLogin } = useAuth();
  const { login: firebaseLogin, loginWithGoogle: firebaseLoginWithGoogle } =
    useFirebaseAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [loginMethod, setLoginMethod] = useState("email"); // 'email' or 'google'

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Login mutation (handles both email and google tokens)
  const loginMutation = useMutation({
    mutationFn: authAPI.login,
    onSuccess: (data) => {
      setAuthLogin(data.token, data.user);
      toast.success("Login successful!");

      // Redirect to intended page or dashboard
      const from =
        location.state?.from?.pathname || `/dashboard/${data.user.role}`;
      navigate(from, { replace: true });
    },
    onError: (error) => {
      if (error.response?.status === 404) {
        toast.error("Account does not exist. Please Sign Up first.");
      } else {
        toast.error(error.response?.data?.message || "Login failed");
      }
    },
  });

  const onSubmit = async (data) => {
    if (loginMethod === "email") {
      try {
        const result = await firebaseLogin(data.email, data.password);

        if (!result.success) {
          toast.error(result.error);
          return;
        }

        const idToken = await result.user.getIdToken();
        loginMutation.mutate(idToken);
      } catch (error) {
        console.error("Login Error:", error);
        toast.error("An unexpected error occurred during login");
      }
    }
  };

  const handleGoogleLogin = async () => {
    setLoginMethod("google");
    try {
      const result = await firebaseLoginWithGoogle();

      if (!result.success) {
        toast.error(result.error);
        return;
      }

      const idToken = await result.user.getIdToken();
      loginMutation.mutate(idToken);
    } catch (error) {
      console.error("Google Login Error:", error);
      toast.error("An unexpected error occurred during Google login");
    }
  };

  return (
    <div className="min-h-full py-10 flex items-center justify-center bg-linear-to-b from-indigo-50/50 dark:from-indigo-950/30 to-gray-50 dark:to-gray-900 px-4 transition-colors duration-200">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl shadow-lg dark:shadow-indigo-900/20 p-6 md:p-8 space-y-6">
        <div className="text-center">
          <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
            Welcome back
          </h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-300">
            Login to continue to eTuitionBd.
          </p>
        </div>

        {/* Login Method Tabs */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex rounded-lg border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 p-1">
            <button
              type="button"
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                loginMethod === "email"
                  ? "bg-white dark:bg-gray-600 text-brand dark:text-indigo-400 shadow-sm"
                  : "text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-gray-200"
              }`}
              onClick={() => setLoginMethod("email")}
            >
              Email
            </button>
            <button
              type="button"
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                loginMethod === "google"
                  ? "bg-white dark:bg-gray-600 text-brand dark:text-indigo-400 shadow-sm"
                  : "text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-gray-200"
              }`}
              onClick={() => setLoginMethod("google")}
            >
              Google
            </button>
          </div>
        </div>

        {/* Email/Password Form */}
        {loginMethod === "email" && (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1"
              >
                Email
              </label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
                error={errors.email?.message}
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1"
              >
                Password
              </label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="•••••••••"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                  error={errors.password?.message}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 dark:text-gray-400 hover:text-gray-500 dark:hover:text-gray-400 transition-colors"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                      <path
                        fillRule="evenodd"
                        d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zm14 0a1 1 0 01-.453.891L8.454 14.07a1 1 0 011.06.02l5.48-3.293a1 1 0 00.047-1.017z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-brand dark:text-indigo-500 focus:ring-brand dark:focus:ring-indigo-400 border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-700 dark:text-gray-200"
                >
                  Remember me
                </label>
              </div>
              <div className="text-sm">
                <Link
                  to="/forgot-password"
                  className="font-medium text-brand dark:text-indigo-400 hover:text-brand-dark dark:hover:text-indigo-300 transition-colors"
                >
                  Forgot password?
                </Link>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={loginMutation.isPending}
            >
              {loginMutation.isPending ? "Signing in..." : "Sign in"}
            </Button>
          </form>
        )}

        {/* Google Login Button */}
        {loginMethod === "google" && (
          <div className="space-y-4">
            <div className="text-center py-4">
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                Click the button below to sign in with your Google account
              </p>
              <Button
                variant="outline"
                className="w-full flex items-center justify-center gap-2"
                onClick={handleGoogleLogin}
                disabled={loginMutation.isPending}
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                <span>
                  {loginMutation.isPending
                    ? "Signing in with Google..."
                    : "Continue with Google"}
                </span>
              </Button>
            </div>

            <div className="text-center">
              <button
                type="button"
                className="text-sm text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
                onClick={() => setLoginMethod("email")}
              >
                ← Back to email login
              </button>
            </div>
          </div>
        )}

        <p className="text-center text-sm text-gray-600 dark:text-gray-300">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="font-medium text-brand dark:text-indigo-400 hover:text-brand-dark dark:hover:text-indigo-300 transition-colors"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
