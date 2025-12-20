import { usersAPI } from "@/api/users.api";
import ProtectedImage from "@/components/common/ProtectedImage";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { useAuth } from "@/hooks/useAuth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const StudentProfileSettings = () => {
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

  // Set form values when user data is available
  useEffect(() => {
    if (user) {
      reset({
        name: user.name,
        phone: user.phone,
        city: user.city,
      });
    }
  }, [user, reset]);

  const onSubmit = (data) => {
    updateProfileMutation.mutate(data);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">
        Profile Settings
      </h1>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Profile Picture */}
        <div className="md:col-span-1">
          <Card>
            <CardContent className="p-6 text-center">
              <ProtectedImage
                src={user?.photoUrl}
                alt={user?.name}
                className="w-24 h-24 rounded-full mx-auto mb-4"
              />
              <h2 className="text-lg font-medium text-gray-900 dark:text-white">
                {user?.name}
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-300">{user?.email}</p>
              <p className="text-sm text-gray-500 capitalize">{user?.role}</p>

              <div className="mt-6">
                <Button variant="outline" size="sm">
                  Change Photo
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Profile Information */}
        <div className="md:col-span-2">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-6">
                Personal Information
              </h2>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Full Name
                    </label>
                    <Input
                      id="name"
                      {...register("name", {
                        required: "Name is required",
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
                    <Input id="email" value={user?.email} disabled />
                    <p className="text-xs text-gray-500 mt-1">
                      Email cannot be changed
                    </p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Phone Number
                    </label>
                    <Input
                      id="phone"
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
                      htmlFor="city"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      City
                    </label>
                    <Input
                      id="city"
                      {...register("city", {
                        required: "City is required",
                      })}
                      error={errors.city?.message}
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="bio"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Bio
                  </label>
                  <Textarea
                    id="bio"
                    rows={4}
                    placeholder="Tell us about yourself..."
                    {...register("bio")}
                  />
                </div>

                <div className="flex justify-end">
                  <Button
                    type="submit"
                    disabled={updateProfileMutation.isLoading}
                  >
                    {updateProfileMutation.isLoading
                      ? "Saving..."
                      : "Save Changes"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default StudentProfileSettings;
