import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { tuitionsAPI } from "@/api/tuitions.api";
import {Button} from "@/components/ui/Button";
import {Card, CardContent} from "@/components/ui/Card";
import {Input} from "@/components/ui/Input";
import {Select} from "@/components/ui/Select";
import {Textarea} from "@/components/ui/Textarea";
import toast from "react-hot-toast";

const PostNewTuition = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const editMode = !!searchParams.get("id");
  const tuitionId = searchParams.get("id");

  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  // Create or update tuition mutation
  const tuitionMutation = useMutation({
    mutationFn: editMode
      ? (data) => tuitionsAPI.updateTuition(tuitionId, data)
      : tuitionsAPI.createTuition,
    onSuccess: () => {
      toast.success(
        editMode
          ? "Tuition updated successfully!"
          : "Tuition posted successfully!"
      );
      queryClient.invalidateQueries(["studentTuitions"]);
      navigate("/dashboard/student/my-tuitions");
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to save tuition");
    },
  });

  // If in edit mode, fetch tuition details
  useEffect(() => {
    if (editMode && tuitionId) {
      // In a real app, fetch tuition details
      // For now, we'll just set some default values
      reset({
        subject: "Math",
        classLevel: "Class 9-10",
        location: "Dhaka",
        budget: "5000",
        schedule: "3 days/week",
        mode: "offline",
        description:
          "Looking for an experienced math tutor for SSC preparation.",
      });
    }
  }, [editMode, tuitionId, reset]);

  const onSubmit = (data) => {
    tuitionMutation.mutate(data);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">
        {editMode ? "Edit Tuition" : "Post New Tuition"}
      </h1>

      <Card>
        <CardContent className="p-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="subject"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Subject *
                </label>
                <Select
                  id="subject"
                  {...register("subject", { required: "Subject is required" })}
                  error={errors.subject?.message}
                >
                  <option value="">Select a subject</option>
                  <option value="Math">Math</option>
                  <option value="English">English</option>
                  <option value="Bangla">Bangla</option>
                  <option value="Physics">Physics</option>
                  <option value="Chemistry">Chemistry</option>
                  <option value="Biology">Biology</option>
                  <option value="ICT">ICT</option>
                  <option value="Accounting">Accounting</option>
                </Select>
              </div>

              <div>
                <label
                  htmlFor="classLevel"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Class/Grade *
                </label>
                <Select
                  id="classLevel"
                  {...register("classLevel", {
                    required: "Class level is required",
                  })}
                  error={errors.classLevel?.message}
                >
                  <option value="">Select class level</option>
                  <option value="Class 1-5">Class 1-5</option>
                  <option value="Class 6-8">Class 6-8</option>
                  <option value="Class 9-10">Class 9-10</option>
                  <option value="SSC">SSC</option>
                  <option value="HSC">HSC</option>
                  <option value="University">University</option>
                </Select>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="location"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Location *
                </label>
                <Select
                  id="location"
                  {...register("location", {
                    required: "Location is required",
                  })}
                  error={errors.location?.message}
                >
                  <option value="">Select location</option>
                  <option value="Dhaka">Dhaka</option>
                  <option value="Chittagong">Chittagong</option>
                  <option value="Rajshahi">Rajshahi</option>
                  <option value="Khulna">Khulna</option>
                  <option value="Sylhet">Sylhet</option>
                  <option value="Barisal">Barisal</option>
                  <option value="Rangpur">Rangpur</option>
                  <option value="Mymensingh">Mymensingh</option>
                </Select>
              </div>

              <div>
                <label
                  htmlFor="budget"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Budget (৳/month) *
                </label>
                <Input
                  id="budget"
                  type="number"
                  placeholder="5000"
                  {...register("budget", {
                    required: "Budget is required",
                    min: {
                      value: 500,
                      message: "Budget must be at least 500 BDT",
                    },
                  })}
                  error={errors.budget?.message}
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="schedule"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Schedule *
                </label>
                <Input
                  id="schedule"
                  placeholder="e.g., 3 days/week, 2 hours/day"
                  {...register("schedule", {
                    required: "Schedule is required",
                  })}
                  error={errors.schedule?.message}
                />
              </div>

              <div>
                <label
                  htmlFor="mode"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Mode *
                </label>
                <Select
                  id="mode"
                  {...register("mode", { required: "Mode is required" })}
                  error={errors.mode?.message}
                >
                  <option value="">Select mode</option>
                  <option value="online">Online</option>
                  <option value="offline">Offline</option>
                  <option value="hybrid">Hybrid</option>
                </Select>
              </div>
            </div>

            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Additional Requirements
              </label>
              <Textarea
                id="description"
                rows={4}
                placeholder="Describe any additional requirements or preferences..."
                {...register("description")}
              />
            </div>

            <div className="flex justify-end">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate("/dashboard/student/my-tuitions")}
                className="mr-2"
              >
                Cancel
              </Button>
              <Button type="submit" disabled={tuitionMutation.isLoading}>
                {tuitionMutation.isLoading
                  ? "Saving..."
                  : editMode
                  ? "Update Tuition"
                  : "Post Tuition"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default PostNewTuition;
