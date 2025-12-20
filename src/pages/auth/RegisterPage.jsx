import { authAPI } from "@/api/auth.api";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useAuth } from "@/hooks/useAuth";
import { useFirebaseAuth } from "@/hooks/useFirebaseAuth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router";

const RegisterPage = () => {
  console.log("RegisterPage component rendered");

  const navigate = useNavigate();
  const { login: setAuthLogin } = useAuth();
  const { signup: firebaseSignup, loginWithGoogle } = useFirebaseAuth();
  const queryClient = useQueryClient();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [signupMethod, setSignupMethod] = useState("email");
  // const [googleUser, setGoogleUser] = useState(null); // Removed: Not needed with new flow

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm();

  const password = watch("password");

  console.log("RegisterPage state:", { signupMethod });

  // Email/Password register mutation
  const registerMutation = useMutation({
    mutationFn: async (userData) => {
      console.log("Register mutation called with:", userData);

      try {
        // Create user in Firebase
        const firebaseResult = await firebaseSignup(
          userData.email,
          userData.password,
          userData.name
        );
        console.log("Firebase signup result:", firebaseResult);

        if (!firebaseResult.success) {
          throw new Error(firebaseResult.error);
        }

        // Get ID token
        const idToken = await firebaseResult.user.getIdToken();
        console.log("ID token:", idToken);

        // Send to backend
        const response = await authAPI.register({
          idToken,
          name: userData.name,
          email: userData.email,
          phone: userData.phone,
          role: userData.role,
          city: userData.city,
        });

        console.log("Backend register response:", response);
        return response;
      } catch (error) {
        console.error("Register error:", error);
        throw error;
      }
    },
    onSuccess: (data) => {
      console.log("Register success:", data);
      setAuthLogin(data.token, data.user);
      toast.success("Registration successful!");
      queryClient.invalidateQueries();

      // Redirect based on role
      const dashboardPath =
        data.user.role === "tutor" ? "/dashboard/tutor" : "/dashboard/student";
      console.log("Redirecting to:", dashboardPath);
      navigate(dashboardPath, { replace: true });
    },
    onError: (error) => {
      console.error("Register mutation error:", error);
      const errorMessage =
        error.response?.data?.message || error.message || "Registration failed";
      toast.error(errorMessage);
    },
  });

  // Google register mutation
  const googleRegisterMutation = useMutation({
    mutationFn: async (userData) => {
      console.log("Google register mutation called with:", userData);

      try {
        // Send to backend
        const response = await authAPI.googleRegister({
          idToken: userData.idToken,
          name: userData.name,
          email: userData.email,
          phone: userData.phone,
          role: userData.role,
          city: userData.city,
        });

        console.log("Backend google register response:", response);
        return response;
      } catch (error) {
        console.error("Google register error:", error);
        throw error;
      }
    },
    onSuccess: (data) => {
      console.log("Google register success:", data);
      setAuthLogin(data.token, data.user);
      toast.success("Registration successful!");
      queryClient.invalidateQueries();

      const dashboardPath =
        data.user.role === "tutor"
          ? "/dashboard/tutor/profile"
          : "/dashboard/student";
      console.log("Redirecting to:", dashboardPath);
      navigate(dashboardPath, { replace: true });
    },
    onError: (error) => {
      console.error("Google register mutation error:", error);
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Google registration failed";
      toast.error(errorMessage);
    },
  });

  const onSubmit = (data) => {
    console.log("Form submitted with:", data);
    if (signupMethod === "email") {
      registerMutation.mutate(data);
    }
  };

  const handleGoogleSignup = async () => {
    console.log("Google signup button clicked");

    // Validate role selection
    const role = watch("role");
    if (!role) {
      toast.error("Please select a role (Student or Tutor) first");
      return;
    }

    try {
      console.log("Calling loginWithGoogle...");
      const result = await loginWithGoogle();
      console.log("loginWithGoogle result:", result);

      if (result.success) {
        console.log("Google login success:", result.user);
        const idToken = await result.user.getIdToken();
        console.log("Got ID token");

        const userData = {
          idToken,
          name: result.user.displayName || "Google User",
          email: result.user.email,
          phone: result.user.phoneNumber || "01700000000", // Default phone if not provided
          role: role,
          city: "Dhaka", // Default city
        };

        console.log("Calling googleRegisterMutation with:", userData);
        googleRegisterMutation.mutate(userData);
      } else {
        console.error("Google login failed:", result.error);
        toast.error(result.error || "Google login failed");
      }
    } catch (error) {
      console.error("Google signup handle error:", error);
      toast.error("An error occurred during Google signup");
    }
  };

  // Removed problematic useEffect and handleRoleSelection in favor of direct form state usage

  // Debug form state
  useEffect(() => {
    console.log("Form errors:", errors);
    console.log("Form values:", watch());
  }, [errors, watch]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-b from-brand-light/40 to-gray-50 px-4">
      <div className="w-full max-w-md bg-white border border-gray-100 rounded-xl shadow-lg p-6 md:p-8 space-y-6">
        <div className="text-center">
          <h1 className="text-xl font-semibold text-gray-900">
            Create an account
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Join eTuitionBd to find or offer tuitions.
          </p>
        </div>

        {/* Signup Method Tabs */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex rounded-lg border border-gray-200 bg-gray-50 p-1">
            <button
              type="button"
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                signupMethod === "email"
                  ? "bg-white text-brand shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setSignupMethod("email")}
            >
              Email
            </button>
            <button
              type="button"
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                signupMethod === "google"
                  ? "bg-white text-brand shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setSignupMethod("google")}
            >
              Google
            </button>
          </div>
        </div>

        {/* Email/Password Form */}
        {signupMethod === "email" && (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Full Name
              </label>
              <Input
                id="name"
                type="text"
                placeholder="John Doe"
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

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
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
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Phone Number
              </label>
              <Input
                id="phone"
                type="tel"
                placeholder="01XXXXXXXXX"
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

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Password
              </label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="•••••••"
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
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-500"
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

            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Confirm Password
              </label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="•••••••"
                  {...register("confirmPassword", {
                    required: "Please confirm your password",
                    validate: (value) =>
                      value === password || "Passwords do not match",
                  })}
                  error={errors.confirmPassword?.message}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-500"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
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

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                I am a
              </label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 text-sm text-gray-700">
                  <input
                    type="radio"
                    className="radio radio-sm radio-primary"
                    value="student"
                    {...register("role", { required: "Please select a role" })}
                  />
                  <span>Student</span>
                </label>
                <label className="flex items-center gap-2 text-sm text-gray-700">
                  <input
                    type="radio"
                    className="radio radio-sm radio-primary"
                    value="tutor"
                    {...register("role", { required: "Please select a role" })}
                  />
                  <span>Tutor</span>
                </label>
              </div>
              {errors.role && (
                <p className="text-xs text-accent-danger mt-1">
                  {errors.role.message}
                </p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={registerMutation.isLoading}
            >
              {registerMutation.isLoading ? "Creating account..." : "Sign up"}
            </Button>
          </form>
        )}

        {/* Google Signup */}
        {signupMethod === "google" && (
          <div className="space-y-4">
            {/* Role selection for Google signup - FIRST */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select your role to continue
              </label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                  <input
                    type="radio"
                    className="radio radio-sm radio-primary"
                    value="student"
                    checked={watch("role") === "student"}
                    onChange={() => setValue("role", "student")}
                  />
                  <span>Student</span>
                </label>
                <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                  <input
                    type="radio"
                    className="radio radio-sm radio-primary"
                    value="tutor"
                    checked={watch("role") === "tutor"}
                    onChange={() => setValue("role", "tutor")}
                  />
                  <span>Tutor</span>
                </label>
              </div>
            </div>

            {/* Google button - SECOND */}
            <div className="text-center py-4">
              <p className="text-sm text-gray-600 mb-4">
                Click the button below to sign up with your Google account
              </p>
              <Button
                variant="outline"
                className="w-full flex items-center justify-center gap-2"
                onClick={handleGoogleSignup}
                disabled={googleRegisterMutation.isLoading}
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
                  {googleRegisterMutation.isLoading
                    ? "Creating account with Google..."
                    : "Continue with Google"}
                </span>
              </Button>
            </div>
          </div>
        )}

        <p className="text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-medium text-brand hover:text-brand-dark"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
