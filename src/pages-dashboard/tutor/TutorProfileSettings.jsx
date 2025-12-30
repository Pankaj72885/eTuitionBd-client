import { usersAPI } from "@/api/users.api";
import ProtectedImage from "@/components/common/ProtectedImage";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Textarea } from "@/components/ui/Textarea";
import { useAuth } from "@/hooks/useAuth";
import {
  AcademicCapIcon,
  BookOpenIcon,
  BriefcaseIcon,
  CameraIcon,
  CheckCircleIcon,
  EnvelopeIcon,
  MapPinIcon,
  PhoneIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const TutorProfileSettings = () => {
  const { user, setUser } = useAuth();
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  // Update profile mutation
  const updateProfileMutation = useMutation({
    mutationFn: (data) => usersAPI.updateUserProfile(user._id, data),
    onSuccess: (data) => {
      toast.success("Profile updated successfully!");
      setUser(data.user);
      queryClient.invalidateQueries(["user", user._id]);
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to update profile");
    },
  });

  useEffect(() => {
    if (user) {
      reset({
        name: user.name,
        phone: user.phone,
        city: user.city,
        qualifications: user.qualifications,
        experienceYears: user.experienceYears,
        subjects: user.subjects?.join(", "),
        classLevels: user.classLevels?.join(", "),
      });
    }
  }, [user, reset]);

  const onSubmit = (data) => {
    const formattedData = {
      ...data,
      subjects: data.subjects
        ? data.subjects.split(",").map((s) => s.trim())
        : [],
      classLevels: data.classLevels
        ? data.classLevels.split(",").map((c) => c.trim())
        : [],
    };
    updateProfileMutation.mutate(formattedData);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Profile Settings
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">
          Manage your personal and professional information
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-1"
        >
          <Card className="overflow-hidden">
            <div className="h-20 bg-linear-to-r from-emerald-500 to-teal-500" />
            <CardContent className="p-6 text-center -mt-12">
              <div className="relative inline-block">
                <ProtectedImage
                  src={user?.photoUrl}
                  alt={user?.name}
                  className="w-24 h-24 rounded-2xl ring-4 ring-white dark:ring-gray-800 shadow-lg mx-auto"
                />
                <button className="absolute -bottom-1 -right-1 w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-lg hover:bg-emerald-700 transition-colors">
                  <CameraIcon className="w-4 h-4" />
                </button>
              </div>

              <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-4">
                {user?.name}
              </h2>
              <p className="text-gray-500 dark:text-gray-400">{user?.email}</p>

              <div className="mt-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-900/30">
                <AcademicCapIcon className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span className="text-sm font-medium text-emerald-700 dark:text-emerald-300 capitalize">
                  Verified Tutor
                </span>
              </div>

              {/* Quick Stats */}
              <div className="mt-6 pt-6 border-t border-gray-100 dark:border-gray-700 grid grid-cols-2 gap-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {user?.experienceYears || 0}+
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Years Exp.
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {user?.subjects?.length || 0}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Subjects
                  </p>
                </div>
              </div>

              <div className="mt-6">
                <Button variant="outline" size="sm" className="w-full gap-2">
                  <CameraIcon className="w-4 h-4" />
                  Change Photo
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Profile Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-2 space-y-6"
        >
          {/* Personal Information */}
          <Card>
            <CardContent className="p-6 md:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center">
                  <UserIcon className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                </div>
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Personal Information
                </h2>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Full Name
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <UserIcon className="h-5 w-5 text-gray-400" />
                      </div>
                      <Input
                        className="pl-12 rounded-xl"
                        {...register("name", { required: "Name is required" })}
                        error={errors.name?.message}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Email Address
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <EnvelopeIcon className="h-5 w-5 text-gray-400" />
                      </div>
                      <Input
                        value={user?.email}
                        disabled
                        className="pl-12 rounded-xl bg-gray-50 dark:bg-gray-800"
                      />
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1.5">
                      Email cannot be changed
                    </p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Phone Number
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <PhoneIcon className="h-5 w-5 text-gray-400" />
                      </div>
                      <Input
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

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      City
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <MapPinIcon className="h-5 w-5 text-gray-400" />
                      </div>
                      <Input
                        className="pl-12 rounded-xl"
                        {...register("city", { required: "City is required" })}
                        error={errors.city?.message}
                      />
                    </div>
                  </div>
                </div>

                {/* Professional Information */}
                <div className="pt-6 border-t border-gray-100 dark:border-gray-700">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                      <BriefcaseIcon className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                      Professional Information
                    </h2>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Qualifications
                      </label>
                      <Textarea
                        rows={3}
                        placeholder="Describe your educational qualifications..."
                        className="rounded-xl"
                        {...register("qualifications", {
                          required: "Qualifications are required",
                        })}
                        error={errors.qualifications?.message}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Years of Experience
                      </label>
                      <Select
                        className="rounded-xl"
                        {...register("experienceYears", {
                          required: "Years of experience is required",
                        })}
                        error={errors.experienceYears?.message}
                      >
                        <option value="">Select experience</option>
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((year) => (
                          <option key={year} value={year}>
                            {year} year{year > 1 ? "s" : ""}
                          </option>
                        ))}
                        <option value="10+">10+ years</option>
                      </Select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Subjects (comma-separated)
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <BookOpenIcon className="h-5 w-5 text-gray-400" />
                        </div>
                        <Input
                          className="pl-12 rounded-xl"
                          placeholder="e.g., Math, Physics, Chemistry"
                          {...register("subjects", {
                            required: "At least one subject is required",
                          })}
                          error={errors.subjects?.message}
                        />
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1.5">
                        Enter subjects separated by commas
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Class Levels (comma-separated)
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <AcademicCapIcon className="h-5 w-5 text-gray-400" />
                        </div>
                        <Input
                          className="pl-12 rounded-xl"
                          placeholder="e.g., Class 9-10, SSC, HSC"
                          {...register("classLevels", {
                            required: "At least one class level is required",
                          })}
                          error={errors.classLevels?.message}
                        />
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1.5">
                        Enter class levels separated by commas
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end pt-4">
                  <Button
                    type="submit"
                    disabled={updateProfileMutation.isPending}
                    className="gap-2 px-6"
                  >
                    {updateProfileMutation.isPending ? (
                      <>
                        <svg
                          className="animate-spin h-4 w-4"
                          viewBox="0 0 24 24"
                        >
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
                        Saving...
                      </>
                    ) : (
                      <>
                        <CheckCircleIcon className="w-4 h-4" />
                        Save Changes
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default TutorProfileSettings;
