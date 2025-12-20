import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { usersAPI } from "@/api/users.api";
import { useAuth } from "@/hooks/useAuth";
import {Button} from "@/components/ui/Button";
import {Card, CardContent} from "@/components/ui/Card";
import {Input} from "@/components/ui/Input";
import {Textarea} from "@/components/ui/Textarea";
import {Select} from "@/components/ui/Select";
import ProtectedImage from "@/components/common/ProtectedImage";
import toast from "react-hot-toast";

const TutorProfileSettings = () => {
  const { user, setUser } = useAuth();
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
  } = useForm();

  const experienceYears = watch("experienceYears");

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
        qualifications: user.qualifications,
        experienceYears: user.experienceYears,
        subjects: user.subjects?.join(", "),
        classLevels: user.classLevels?.join(", "),
      });
    }
  }, [user, reset]);

  const onSubmit = (data) => {
    // Convert comma-separated strings to arrays
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
              <h2 className="text-lg font-medium text-gray-900">
                {user?.name}
              </h2>
              <p className="text-sm text-gray-500">{user?.email}</p>
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

                <h2 className="text-lg font-medium text-gray-900 pt-4">
                  Professional Information
                </h2>

                <div>
                  <label
                    htmlFor="qualifications"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Qualifications
                  </label>
                  <Textarea
                    id="qualifications"
                    rows={3}
                    placeholder="Describe your educational qualifications..."
                    {...register("qualifications", {
                      required: "Qualifications are required",
                    })}
                    error={errors.qualifications?.message}
                  />
                </div>

                <div>
                  <label
                    htmlFor="experienceYears"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Years of Experience
                  </label>
                  <Select
                    id="experienceYears"
                    {...register("experienceYears", {
                      required: "Years of experience is required",
                    })}
                    error={errors.experienceYears?.message}
                  >
                    <option value="">Select experience</option>
                    <option value="1">1 year</option>
                    <option value="2">2 years</option>
                    <option value="3">3 years</option>
                    <option value="4">4 years</option>
                    <option value="5">5 years</option>
                    <option value="6">6 years</option>
                    <option value="7">7 years</option>
                    <option value="8">8 years</option>
                    <option value="9">9 years</option>
                    <option value="10+">10+ years</option>
                  </Select>
                </div>

                <div>
                  <label
                    htmlFor="subjects"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Subjects (comma-separated)
                  </label>
                  <Input
                    id="subjects"
                    placeholder="e.g., Math, Physics, Chemistry"
                    {...register("subjects", {
                      required: "At least one subject is required",
                    })}
                    error={errors.subjects?.message}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Enter subjects separated by commas
                  </p>
                </div>

                <div>
                  <label
                    htmlFor="classLevels"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Class Levels (comma-separated)
                  </label>
                  <Input
                    id="classLevels"
                    placeholder="e.g., Class 9-10, SSC, HSC"
                    {...register("classLevels", {
                      required: "At least one class level is required",
                    })}
                    error={errors.classLevels?.message}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Enter class levels separated by commas
                  </p>
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

export default TutorProfileSettings;
