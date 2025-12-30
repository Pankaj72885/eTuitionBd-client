import { authAPI } from "@/api/auth.api";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useAuth } from "@/hooks/useAuth";
import { useFirebaseAuth } from "@/hooks/useFirebaseAuth";
import {
  AcademicCapIcon,
  EnvelopeIcon,
  EyeIcon,
  EyeSlashIcon,
  LockClosedIcon,
  PhoneIcon,
  SparklesIcon,
  UserGroupIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router";

const RegisterPage = () => {
  const navigate = useNavigate();
  const { login: setAuthLogin } = useAuth();
  const { signup: firebaseSignup, loginWithGoogle } = useFirebaseAuth();
  const queryClient = useQueryClient();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [signupMethod, setSignupMethod] = useState("email");

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm();

  const password = watch("password");
  const selectedRole = watch("role");

  // Email/Password register mutation
  const registerMutation = useMutation({
    mutationFn: async (userData) => {
      const firebaseResult = await firebaseSignup(
        userData.email,
        userData.password,
        userData.name
      );
      if (!firebaseResult.success) {
        throw new Error(firebaseResult.error);
      }
      const idToken = await firebaseResult.user.getIdToken();
      const response = await authAPI.register({
        idToken,
        name: userData.name,
        email: userData.email,
        phone: userData.phone,
        role: userData.role,
        city: userData.city || "Dhaka",
      });
      return response;
    },
    retry: false,
    onSuccess: (data) => {
      setAuthLogin(data.token, data.user);
      toast.success("Registration successful! 🎉");
      queryClient.invalidateQueries();
      const dashboardPath =
        data.user.role === "tutor" ? "/dashboard/tutor" : "/dashboard/student";
      navigate(dashboardPath, { replace: true });
    },
    onError: (error) => {
      const errorMessage =
        error.response?.data?.message || error.message || "Registration failed";
      toast.error(errorMessage);
    },
  });

  // Google register mutation
  const googleRegisterMutation = useMutation({
    mutationFn: async (userData) => {
      const response = await authAPI.googleRegister({
        idToken: userData.idToken,
        name: userData.name,
        email: userData.email,
        phone: userData.phone,
        role: userData.role,
        city: userData.city,
      });
      return response;
    },
    retry: false,
    onSuccess: (data) => {
      setAuthLogin(data.token, data.user);
      toast.success("Registration successful! 🎉");
      queryClient.invalidateQueries();
      const dashboardPath =
        data.user.role === "tutor"
          ? "/dashboard/tutor/profile"
          : "/dashboard/student";
      navigate(dashboardPath, { replace: true });
    },
    onError: (error) => {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Google registration failed";
      toast.error(errorMessage);
    },
  });

  const onSubmit = (data) => {
    if (signupMethod === "email") {
      registerMutation.mutate(data);
    }
  };

  const handleGoogleSignup = async () => {
    const role = watch("role");
    if (!role) {
      toast.error("Please select a role (Student or Tutor) first");
      return;
    }

    try {
      const result = await loginWithGoogle();
      if (result.success) {
        const idToken = await result.user.getIdToken();
        googleRegisterMutation.mutate({
          idToken,
          name: result.user.displayName || "Google User",
          email: result.user.email,
          phone: result.user.phoneNumber || "01700000000",
          role: role,
          city: "Dhaka",
        });
      } else {
        toast.error(result.error || "Google login failed");
      }
    } catch (error) {
      toast.error("An error occurred during Google signup");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden px-4 py-12">
      {/* Background with mesh gradient */}
      <div className="absolute inset-0 mesh-bg bg-linear-to-br from-purple-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-900 dark:to-purple-950" />

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 right-20 w-72 h-72 bg-purple-400/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, -30, 0],
          }}
          transition={{ duration: 10, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-20 left-20 w-96 h-96 bg-indigo-400/20 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            y: [0, 30, 0],
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
        <div className="glass-card rounded-3xl p-8 md:p-10 shadow-2xl shadow-purple-500/10 dark:shadow-black/30">
          {/* Header */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-linear-to-br from-purple-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-purple-500/30"
            >
              <SparklesIcon className="w-8 h-8 text-white" />
            </motion.div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Create an account
            </h1>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Join eTuitionBd to find or offer tuitions
            </p>
          </div>

          {/* Signup Method Toggle */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex rounded-xl bg-gray-100 dark:bg-gray-800 p-1">
              <button
                type="button"
                className={`px-6 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  signupMethod === "email"
                    ? "bg-white dark:bg-gray-700 text-purple-600 dark:text-purple-400 shadow-sm"
                    : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                }`}
                onClick={() => setSignupMethod("email")}
              >
                Email
              </button>
              <button
                type="button"
                className={`px-6 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  signupMethod === "google"
                    ? "bg-white dark:bg-gray-700 text-purple-600 dark:text-purple-400 shadow-sm"
                    : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                }`}
                onClick={() => setSignupMethod("google")}
              >
                Google
              </button>
            </div>
          </div>

          {/* Email Form */}
          {signupMethod === "email" && (
            <motion.form
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-5"
            >
              {/* Name */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Full Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <UserIcon className="h-5 w-5 text-gray-400" />
                  </div>
                  <Input
                    id="name"
                    type="text"
                    placeholder="John Doe"
                    className="pl-12 rounded-xl"
                    {...register("name", {
                      required: "Name is required",
                      minLength: {
                        value: 2,
                        message: "Name must be at least 2 characters",
                      },
                    })}
                    error={errors.name?.message}
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <EnvelopeIcon className="h-5 w-5 text-gray-400" />
                  </div>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    className="pl-12 rounded-xl"
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

              {/* Phone */}
              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Phone Number
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <PhoneIcon className="h-5 w-5 text-gray-400" />
                  </div>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="01XXXXXXXXX"
                    className="pl-12 rounded-xl"
                    {...register("phone", {
                      required: "Phone number is required",
                      pattern: {
                        value: /^01[3-9]\d{8}$/,
                        message: "Invalid Bangladeshi phone number",
                      },
                    })}
                    error={errors.phone?.message}
                  />
                </div>
              </div>

              {/* Password */}
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
                    className="pl-12 pr-12 rounded-xl"
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

              {/* Confirm Password */}
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Confirm Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <LockClosedIcon className="h-5 w-5 text-gray-400" />
                  </div>
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="•••••••••"
                    className="pl-12 pr-12 rounded-xl"
                    {...register("confirmPassword", {
                      required: "Please confirm your password",
                      validate: (value) =>
                        value === password || "Passwords do not match",
                    })}
                    error={errors.confirmPassword?.message}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <EyeSlashIcon className="h-5 w-5" />
                    ) : (
                      <EyeIcon className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Role Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  I want to join as
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <label
                    className={`relative flex flex-col items-center p-4 rounded-xl border-2 cursor-pointer transition-all ${
                      selectedRole === "student"
                        ? "border-purple-500 bg-purple-50 dark:bg-purple-900/20"
                        : "border-gray-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-700"
                    }`}
                  >
                    <input
                      type="radio"
                      className="sr-only"
                      value="student"
                      {...register("role", {
                        required: "Please select a role",
                      })}
                    />
                    <UserGroupIcon
                      className={`w-8 h-8 mb-2 ${
                        selectedRole === "student"
                          ? "text-purple-600 dark:text-purple-400"
                          : "text-gray-400"
                      }`}
                    />
                    <span
                      className={`text-sm font-medium ${
                        selectedRole === "student"
                          ? "text-purple-700 dark:text-purple-300"
                          : "text-gray-700 dark:text-gray-300"
                      }`}
                    >
                      Student
                    </span>
                  </label>
                  <label
                    className={`relative flex flex-col items-center p-4 rounded-xl border-2 cursor-pointer transition-all ${
                      selectedRole === "tutor"
                        ? "border-purple-500 bg-purple-50 dark:bg-purple-900/20"
                        : "border-gray-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-700"
                    }`}
                  >
                    <input
                      type="radio"
                      className="sr-only"
                      value="tutor"
                      {...register("role", {
                        required: "Please select a role",
                      })}
                    />
                    <AcademicCapIcon
                      className={`w-8 h-8 mb-2 ${
                        selectedRole === "tutor"
                          ? "text-purple-600 dark:text-purple-400"
                          : "text-gray-400"
                      }`}
                    />
                    <span
                      className={`text-sm font-medium ${
                        selectedRole === "tutor"
                          ? "text-purple-700 dark:text-purple-300"
                          : "text-gray-700 dark:text-gray-300"
                      }`}
                    >
                      Tutor
                    </span>
                  </label>
                </div>
                {errors.role && (
                  <p className="text-xs text-red-500 mt-2">
                    {errors.role.message}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                className="w-full py-3 text-base glow-hover mt-6"
                disabled={registerMutation.isPending}
              >
                {registerMutation.isPending ? (
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
                    Creating account...
                  </span>
                ) : (
                  "Create Account"
                )}
              </Button>
            </motion.form>
          )}

          {/* Google Signup */}
          {signupMethod === "google" && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              {/* Role Selection for Google */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  Select your role first
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <label
                    className={`relative flex flex-col items-center p-4 rounded-xl border-2 cursor-pointer transition-all ${
                      selectedRole === "student"
                        ? "border-purple-500 bg-purple-50 dark:bg-purple-900/20"
                        : "border-gray-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-700"
                    }`}
                  >
                    <input
                      type="radio"
                      className="sr-only"
                      checked={selectedRole === "student"}
                      onChange={() => setValue("role", "student")}
                    />
                    <UserGroupIcon
                      className={`w-8 h-8 mb-2 ${
                        selectedRole === "student"
                          ? "text-purple-600 dark:text-purple-400"
                          : "text-gray-400"
                      }`}
                    />
                    <span
                      className={`text-sm font-medium ${
                        selectedRole === "student"
                          ? "text-purple-700 dark:text-purple-300"
                          : "text-gray-700 dark:text-gray-300"
                      }`}
                    >
                      Student
                    </span>
                  </label>
                  <label
                    className={`relative flex flex-col items-center p-4 rounded-xl border-2 cursor-pointer transition-all ${
                      selectedRole === "tutor"
                        ? "border-purple-500 bg-purple-50 dark:bg-purple-900/20"
                        : "border-gray-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-700"
                    }`}
                  >
                    <input
                      type="radio"
                      className="sr-only"
                      checked={selectedRole === "tutor"}
                      onChange={() => setValue("role", "tutor")}
                    />
                    <AcademicCapIcon
                      className={`w-8 h-8 mb-2 ${
                        selectedRole === "tutor"
                          ? "text-purple-600 dark:text-purple-400"
                          : "text-gray-400"
                      }`}
                    />
                    <span
                      className={`text-sm font-medium ${
                        selectedRole === "tutor"
                          ? "text-purple-700 dark:text-purple-300"
                          : "text-gray-700 dark:text-gray-300"
                      }`}
                    >
                      Tutor
                    </span>
                  </label>
                </div>
              </div>

              {/* Google Button */}
              <div className="pt-2">
                <Button
                  variant="outline"
                  className="w-full py-3 flex items-center justify-center gap-3 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all"
                  onClick={handleGoogleSignup}
                  disabled={googleRegisterMutation.isPending}
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
                  <span className="font-medium">
                    {googleRegisterMutation.isPending
                      ? "Creating account..."
                      : "Continue with Google"}
                  </span>
                </Button>
              </div>

              <button
                type="button"
                className="w-full text-center text-sm text-gray-500 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                onClick={() => setSignupMethod("email")}
              >
                ← Back to email signup
              </button>
            </motion.div>
          )}

          {/* Sign in link */}
          <p className="mt-8 text-center text-sm text-gray-600 dark:text-gray-400">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-semibold text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 transition-colors"
            >
              Sign in
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
            Secure Registration
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
            Data Protected
          </span>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default RegisterPage;
