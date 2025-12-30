import { applicationsAPI } from "@/api/applications.api";
import { tuitionsAPI } from "@/api/tuitions.api";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/Dialog";
import { Input } from "@/components/ui/Input";
import StatusBadge from "@/components/ui/StatusBadge";
import { Textarea } from "@/components/ui/Textarea";
import { useAuth } from "@/hooks/useAuth";
import {
  ArrowLeftIcon,
  BookOpenIcon,
  CalendarIcon,
  ComputerDesktopIcon,
  CurrencyDollarIcon,
  DocumentTextIcon,
  MapPinIcon,
  PaperAirplaneIcon,
  UserCircleIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router";

const TuitionDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [applyModalOpen, setApplyModalOpen] = useState(false);
  const [applicationData, setApplicationData] = useState({
    name: "",
    email: "",
    qualifications: "",
    experience: "",
    expectedSalary: "",
  });

  // Fetch tuition details
  const {
    data: tuition,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["tuition", id],
    queryFn: () => tuitionsAPI.getTuitionById(id),
    enabled: !!id,
  });

  // Apply to tuition mutation
  const applyMutation = useMutation({
    mutationFn: applicationsAPI.applyToTuition,
    onSuccess: (data) => {
      toast.success(data?.message || "Application submitted successfully!");
      setApplyModalOpen(false);
      setApplicationData({
        name: "",
        email: "",
        qualifications: "",
        experience: "",
        expectedSalary: "",
      });
      queryClient.invalidateQueries(["tuition", id]);
      queryClient.invalidateQueries(["applications", "tutor"]);
    },
    onError: (error) => {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to submit application.";
      toast.error(errorMessage);
    },
  });

  const handleApply = () => {
    if (!user) {
      navigate("/login", { state: { from: `/tuitions/${id}` } });
      return;
    }
    if (user.role !== "tutor") {
      toast.error("Only tutors can apply to tuitions");
      return;
    }
    setApplicationData({
      name: user?.name || "",
      email: user?.email || "",
      qualifications: "",
      experience: "",
      expectedSalary: "",
    });
    setApplyModalOpen(true);
  };

  const handleSubmitApplication = () => {
    if (!applicationData.qualifications?.trim()) {
      toast.error("Please enter your qualifications");
      return;
    }
    if (!applicationData.experience?.trim()) {
      toast.error("Please enter your teaching experience");
      return;
    }
    if (
      !applicationData.expectedSalary ||
      applicationData.expectedSalary <= 0
    ) {
      toast.error("Please enter a valid expected salary");
      return;
    }
    applyMutation.mutate({
      tuitionId: id,
      qualifications: applicationData.qualifications,
      experience: applicationData.experience,
      expectedSalary: applicationData.expectedSalary,
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-50 dark:bg-gray-900">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error || !tuition) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="w-24 h-24 mx-auto mb-6 rounded-3xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
            <BookOpenIcon className="w-12 h-12 text-gray-400" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
            Tuition not found
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-md">
            The tuition you're looking for doesn't exist or has been removed.
          </p>
          <Button onClick={() => navigate("/tuitions")} className="gap-2">
            <ArrowLeftIcon className="w-5 h-5" />
            Browse Tuitions
          </Button>
        </motion.div>
      </div>
    );
  }

  const infoItems = [
    {
      icon: MapPinIcon,
      label: "Location",
      value: tuition.location,
      color: "text-indigo-600 dark:text-indigo-400",
    },
    {
      icon: CurrencyDollarIcon,
      label: "Budget",
      value: `৳ ${tuition.budget}/month`,
      color: "text-emerald-600 dark:text-emerald-400",
    },
    {
      icon: CalendarIcon,
      label: "Schedule",
      value: tuition.schedule,
      color: "text-amber-600 dark:text-amber-400",
    },
    {
      icon: ComputerDesktopIcon,
      label: "Mode",
      value: tuition.mode,
      color: "text-purple-600 dark:text-purple-400",
    },
  ];

  return (
    <section className="py-10 md:py-16 bg-gray-50 dark:bg-gray-900 min-h-screen transition-colors">
      <div className="max-w-4xl mx-auto px-4 md:px-6">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <button
            onClick={() => navigate("/tuitions")}
            className="flex items-center gap-2 text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors mb-6"
          >
            <ArrowLeftIcon className="w-5 h-5" />
            <span>Back to Tuitions</span>
          </button>
        </motion.div>

        {/* Header Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden rounded-3xl bg-linear-to-r from-indigo-600 via-purple-600 to-pink-500 p-6 md:p-8 mb-6"
        >
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.1%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')] opacity-30" />
          <div className="relative z-10">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-3">
                  <div className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm">
                    <span className="text-sm text-white font-medium">
                      {tuition.classLevel}
                    </span>
                  </div>
                  <StatusBadge status={tuition.status} />
                </div>
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2">
                  {tuition.subject} Tuition
                </h1>
                <p className="text-white/80 flex items-center gap-2">
                  <MapPinIcon className="w-5 h-5" />
                  {tuition.location}
                </p>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 text-center">
                <p className="text-white/80 text-sm mb-1">Monthly Budget</p>
                <p className="text-3xl font-bold text-white">
                  ৳ {tuition.budget}
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Info Cards Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6"
        >
          {infoItems.map((item, index) => (
            <Card key={index} className="card-hover">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center shrink-0`}
                  >
                    <item.icon className={`w-5 h-5 ${item.color}`} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                      {item.label}
                    </p>
                    <p className="font-semibold text-gray-900 dark:text-white">
                      {item.value}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </motion.div>

        {/* Description Card */}
        {tuition.description && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="mb-6">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
                    <DocumentTextIcon className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                  </div>
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Additional Requirements
                  </h2>
                </div>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {tuition.description}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Posted By & Applications */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid sm:grid-cols-2 gap-4 mb-6"
        >
          <Card>
            <CardContent className="p-5">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center">
                  <UserCircleIcon className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Posted by
                  </p>
                  <p className="font-semibold text-gray-900 dark:text-white">
                    Student in {tuition.location}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-5">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                  <UserGroupIcon className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Applications
                  </p>
                  <p className="font-semibold text-gray-900 dark:text-white">
                    {tuition.applicationCount || 0} received
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Apply Section */}
        {user?.role === "tutor" &&
          (tuition.status === "Open" || tuition.status === "Approved") && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card className="border-2 border-indigo-200 dark:border-indigo-800 overflow-hidden">
                <div className="h-1 bg-linear-to-r from-indigo-500 to-purple-500" />
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                        Interested in this tuition?
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        Share your qualifications and experience to apply.
                      </p>
                    </div>
                    <Button
                      onClick={handleApply}
                      disabled={applyMutation.isPending}
                      className="gap-2 px-6"
                    >
                      <PaperAirplaneIcon className="w-5 h-5" />
                      {applyMutation.isPending ? "Submitting..." : "Apply Now"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

        {/* Not Tutor Message */}
        {user && user.role !== "tutor" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="bg-gray-100 dark:bg-gray-800">
              <CardContent className="p-5 text-center">
                <p className="text-gray-600 dark:text-gray-300">
                  Only registered tutors can apply to this tuition.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Apply Dialog */}
        <Dialog open={applyModalOpen} onOpenChange={setApplyModalOpen}>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <PaperAirplaneIcon className="w-5 h-5 text-indigo-600" />
                Apply for Tuition
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-5 py-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Your Name
                  </label>
                  <Input
                    value={applicationData.name}
                    onChange={(e) =>
                      setApplicationData({
                        ...applicationData,
                        name: e.target.value,
                      })
                    }
                    className="rounded-xl"
                    disabled
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Your Email
                  </label>
                  <Input
                    type="email"
                    value={applicationData.email}
                    onChange={(e) =>
                      setApplicationData({
                        ...applicationData,
                        email: e.target.value,
                      })
                    }
                    className="rounded-xl"
                    disabled
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Qualifications *
                </label>
                <Textarea
                  rows={3}
                  placeholder="Describe your educational qualifications..."
                  value={applicationData.qualifications}
                  onChange={(e) =>
                    setApplicationData({
                      ...applicationData,
                      qualifications: e.target.value,
                    })
                  }
                  className="rounded-xl"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Teaching Experience *
                </label>
                <Textarea
                  rows={3}
                  placeholder="Describe your teaching experience..."
                  value={applicationData.experience}
                  onChange={(e) =>
                    setApplicationData({
                      ...applicationData,
                      experience: e.target.value,
                    })
                  }
                  className="rounded-xl"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Expected Salary (৳/month) *
                </label>
                <Input
                  type="number"
                  placeholder="5000"
                  value={applicationData.expectedSalary}
                  onChange={(e) =>
                    setApplicationData({
                      ...applicationData,
                      expectedSalary: e.target.value,
                    })
                  }
                  className="rounded-xl"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <Button
                  variant="outline"
                  onClick={() => setApplyModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleSubmitApplication}
                  disabled={applyMutation.isPending}
                  className="gap-2"
                >
                  {applyMutation.isPending
                    ? "Submitting..."
                    : "Submit Application"}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};

export default TuitionDetailsPage;
