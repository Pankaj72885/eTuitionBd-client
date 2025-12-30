import { tuitionsAPI } from "@/api/tuitions.api";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Textarea } from "@/components/ui/Textarea";
import {
  AcademicCapIcon,
  ArrowLeftIcon,
  BookOpenIcon,
  CalendarIcon,
  ComputerDesktopIcon,
  CurrencyDollarIcon,
  DocumentTextIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate, useSearchParams } from "react-router";

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

  useEffect(() => {
    if (editMode && tuitionId) {
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
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate("/dashboard/student/my-tuitions")}
          className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
          <ArrowLeftIcon className="w-5 h-5 text-gray-500" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            {editMode ? "Edit Tuition" : "Post New Tuition"}
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            {editMode
              ? "Update your tuition details"
              : "Find the perfect tutor for your needs"}
          </p>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Card>
          <CardContent className="p-6 md:p-8">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              {/* Subject and Class */}
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center">
                    <BookOpenIcon className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Subject Details
                  </h2>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Subject *
                    </label>
                    <Select
                      className="rounded-xl"
                      {...register("subject", {
                        required: "Subject is required",
                      })}
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
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      <div className="flex items-center gap-2">
                        <AcademicCapIcon className="w-4 h-4 text-gray-400" />
                        Class/Grade *
                      </div>
                    </label>
                    <Select
                      className="rounded-xl"
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
              </div>

              {/* Location and Budget */}
              <div className="pt-6 border-t border-gray-100 dark:border-gray-700">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                    <MapPinIcon className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Location & Budget
                  </h2>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Location *
                    </label>
                    <Select
                      className="rounded-xl"
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
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      <div className="flex items-center gap-2">
                        <CurrencyDollarIcon className="w-4 h-4 text-gray-400" />
                        Budget (৳/month) *
                      </div>
                    </label>
                    <Input
                      type="number"
                      placeholder="5000"
                      className="rounded-xl"
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
              </div>

              {/* Schedule and Mode */}
              <div className="pt-6 border-t border-gray-100 dark:border-gray-700">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                    <CalendarIcon className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                  </div>
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Schedule & Preferences
                  </h2>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Schedule *
                    </label>
                    <Input
                      placeholder="e.g., 3 days/week, 2 hours/day"
                      className="rounded-xl"
                      {...register("schedule", {
                        required: "Schedule is required",
                      })}
                      error={errors.schedule?.message}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      <div className="flex items-center gap-2">
                        <ComputerDesktopIcon className="w-4 h-4 text-gray-400" />
                        Mode *
                      </div>
                    </label>
                    <Select
                      className="rounded-xl"
                      {...register("mode", { required: "Mode is required" })}
                      error={errors.mode?.message}
                    >
                      <option value="">Select mode</option>
                      <option value="online">Online</option>
                      <option value="offline">Offline (In-person)</option>
                      <option value="hybrid">Hybrid</option>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="pt-6 border-t border-gray-100 dark:border-gray-700">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
                    <DocumentTextIcon className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                  </div>
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Additional Details
                  </h2>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Additional Requirements
                  </label>
                  <Textarea
                    rows={4}
                    placeholder="Describe any additional requirements or preferences for your ideal tutor..."
                    className="rounded-xl"
                    {...register("description")}
                  />
                </div>
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-3 pt-6 border-t border-gray-100 dark:border-gray-700">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate("/dashboard/student/my-tuitions")}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={tuitionMutation.isPending}
                  className="px-6"
                >
                  {tuitionMutation.isPending
                    ? "Saving..."
                    : editMode
                    ? "Update Tuition"
                    : "Post Tuition"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default PostNewTuition;
