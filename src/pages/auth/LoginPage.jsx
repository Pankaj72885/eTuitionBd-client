import { authAPI } from "@/api/auth.api";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useAuth } from "@/hooks/useAuth";
import { useFirebaseAuth } from "@/hooks/useFirebaseAuth";
import {
  EnvelopeIcon,
  EyeIcon,
  EyeSlashIcon,
  LockClosedIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";
import { useMutation } from "@tanstack/react-query";
import { motion } from "framer-motion";
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
  const [loginMethod, setLoginMethod] = useState("email");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const loginMutation = useMutation({
    mutationFn: authAPI.login,
    onSuccess: (data) => {
      setAuthLogin(data.token, data.user);
      toast.success("Welcome back! 🎉");
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
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden px-4 py-12">
      {/* Background with mesh gradient */}
      <div className="absolute inset-0 mesh-bg bg-linear-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-indigo-950" />

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 left-20 w-72 h-72 bg-indigo-400/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 30, 0],
          }}
          transition={{ duration: 10, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            y: [0, -30, 0],
          }}
          transition={{ duration: 12, repeat: Infinity }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md relative z-10"
      >
        {/* Card */}
        <div className="glass-card rounded-3xl p-8 md:p-10 shadow-2xl shadow-indigo-500/10 dark:shadow-black/30">
          {/* Header */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-linear-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/30"
            >
              <SparklesIcon className="w-8 h-8 text-white" />
            </motion.div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Welcome back
            </h1>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Login to continue to eTuitionBd
            </p>
          </div>

          {/* Login Method Toggle */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex rounded-xl bg-gray-100 dark:bg-gray-800 p-1">
              <button
                type="button"
                className={`px-6 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  loginMethod === "email"
                    ? "bg-white dark:bg-gray-700 text-indigo-600 dark:text-indigo-400 shadow-sm"
                    : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                }`}
                onClick={() => setLoginMethod("email")}
              >
                Email
              </button>
              <button
                type="button"
                className={`px-6 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  loginMethod === "google"
                    ? "bg-white dark:bg-gray-700 text-indigo-600 dark:text-indigo-400 shadow-sm"
                    : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                }`}
                onClick={() => setLoginMethod("google")}
              >
                Google
              </button>
            </div>
          </div>

          {/* Email Form */}
          {loginMethod === "email" && (
            <motion.form
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-5"
            >
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Email address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <EnvelopeIcon className="h-5 w-5 text-gray-400" />
                  </div>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    className="pl-12 input-modern"
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
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <LockClosedIcon className="h-5 w-5 text-gray-400" />
                  </div>
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="•••••••••"
                    className="pl-12 pr-12 input-modern"
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
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeSlashIcon className="h-5 w-5" />
                    ) : (
                      <EyeIcon className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded border-gray-300 dark:border-gray-600 text-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-400"
                  />
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Remember me
                  </span>
                </label>
                <Link
                  to="/forgot-password"
                  className="text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors"
                >
                  Forgot password?
                </Link>
              </div>

              <Button
                type="submit"
                className="w-full py-3 text-base glow-hover"
                disabled={loginMutation.isPending}
              >
                {loginMutation.isPending ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Signing in...
                  </span>
                ) : (
                  "Sign in"
                )}
              </Button>
            </motion.form>
          )}

          {/* Google Login */}
          {loginMethod === "google" && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div className="text-center py-4">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
                  Click the button below to sign in with Google
                </p>
                <Button
                  variant="outline"
                  className="w-full py-3 flex items-center justify-center gap-3 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all"
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
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
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
                  <span className="font-medium">
                    {loginMutation.isPending
                      ? "Signing in..."
                      : "Continue with Google"}
                  </span>
                </Button>
              </div>

              <button
                type="button"
                className="w-full text-center text-sm text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                onClick={() => setLoginMethod("email")}
              >
                ← Back to email login
              </button>
            </motion.div>
          )}

          {/* Sign up link */}
          <p className="mt-8 text-center text-sm text-gray-600 dark:text-gray-400">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors"
            >
              Sign up for free
            </Link>
          </p>
        </div>

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 flex justify-center items-center gap-6 text-gray-400 dark:text-gray-500"
        >
          <span className="text-xs flex items-center gap-1">
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
              />
            </svg>
            Secure Login
          </span>
          <span className="text-xs flex items-center gap-1">
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
            256-bit Encryption
          </span>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default LoginPage;
