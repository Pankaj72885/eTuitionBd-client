import { usersAPI } from "@/api/users.api";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import ProtectedImage from "@/components/common/ProtectedImage";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { useAuth } from "@/hooks/useAuth";
import {
  CameraIcon,
  CheckCircleIcon,
  Cog6ToothIcon,
  EnvelopeIcon,
  MapPinIcon,
  PhoneIcon,
  ShieldCheckIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const AdminProfileSettings = () => {
  const { user, refetchUser } = useAuth();
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      city: "",
    },
  });

  useEffect(() => {
    if (user) {
      reset({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        city: user.city || "",
      });
    }
  }, [user, reset]);

  const updateMutation = useMutation({
    mutationFn: (data) => usersAPI.updateUserProfile(user._id, data),
    onSuccess: () => {
      toast.success("Profile updated successfully!");
      refetchUser();
      queryClient.invalidateQueries(["user"]);
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to update profile");
    },
  });

  const onSubmit = (data) => {
    updateMutation.mutate(data);
  };

  if (!user) {
    return (
      <div className="flex justify-center py-16">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-2xl bg-linear-to-r from-gray-700 to-gray-900 flex items-center justify-center">
          <Cog6ToothIcon className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Profile Settings
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            Manage your admin account
          </p>
        </div>
      </div>

      {/* Profile Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Card className="overflow-hidden">
          {/* Header with gradient */}
          <div className="h-32 bg-linear-to-r from-gray-700 via-gray-800 to-gray-900 relative">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.05%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')] opacity-50" />
          </div>

          <CardContent className="p-6 pt-0">
            {/* Avatar */}
            <div className="flex flex-col sm:flex-row sm:items-end gap-4 -mt-16 mb-6">
              <div className="relative">
                <ProtectedImage
                  src={user.photoUrl}
                  alt={user.name}
                  className="w-28 h-28 rounded-2xl border-4 border-white dark:border-gray-800 object-cover shadow-lg"
                />
                <button className="absolute bottom-2 right-2 w-8 h-8 rounded-lg bg-gray-900 hover:bg-gray-800 flex items-center justify-center text-white transition-colors">
                  <CameraIcon className="w-4 h-4" />
                </button>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                    {user.name}
                  </h2>
                  <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400">
                    Admin
                  </span>
                </div>
                <p className="text-gray-500 dark:text-gray-400">{user.email}</p>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-100 dark:bg-emerald-900/30">
                <ShieldCheckIcon className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                <span className="text-sm font-medium text-emerald-700 dark:text-emerald-400">
                  Full Access
                </span>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    <UserCircleIcon className="w-4 h-4 text-gray-400" />
                    Full Name
                  </label>
                  <Input
                    {...register("name", { required: "Name is required" })}
                    placeholder="Enter your name"
                    className="rounded-xl"
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    <EnvelopeIcon className="w-4 h-4 text-gray-400" />
                    Email Address
                  </label>
                  <Input
                    type="email"
                    {...register("email")}
                    disabled
                    className="rounded-xl bg-gray-50 dark:bg-gray-900"
                  />
                  <p className="mt-1 text-xs text-gray-500">
                    Email cannot be changed
                  </p>
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    <PhoneIcon className="w-4 h-4 text-gray-400" />
                    Phone Number
                  </label>
                  <Input
                    {...register("phone")}
                    placeholder="Enter phone number"
                    className="rounded-xl"
                  />
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    <MapPinIcon className="w-4 h-4 text-gray-400" />
                    City
                  </label>
                  <Input
                    {...register("city")}
                    placeholder="Enter your city"
                    className="rounded-xl"
                  />
                </div>
              </div>

              <div className="flex justify-end pt-4 border-t border-gray-200 dark:border-gray-700">
                <Button
                  type="submit"
                  disabled={!isDirty || updateMutation.isPending}
                  className="gap-2"
                >
                  {updateMutation.isPending ? (
                    <>
                      <LoadingSpinner size="sm" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <CheckCircleIcon className="w-5 h-5" />
                      Save Changes
                    </>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </motion.div>

      {/* Admin Info Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                <ShieldCheckIcon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Admin Privileges
              </h3>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                "Manage all users",
                "Approve/reject tuitions",
                "View analytics",
                "Manage transactions",
                "Access all reports",
                "System settings",
              ].map((privilege, index) => (
                <div key={index} className="flex items-center gap-2">
                  <CheckCircleIcon className="w-5 h-5 text-emerald-500" />
                  <span className="text-gray-600 dark:text-gray-300">
                    {privilege}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default AdminProfileSettings;
