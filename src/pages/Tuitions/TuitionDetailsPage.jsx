import React, { useState } from "react";
import { useParams, useNavigate } from "react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  MapPinIcon,
  CurrencyDollarIcon,
  CalendarIcon,
  AcademicCapIcon,
} from "@heroicons/react/24/outline";
import { tuitionsAPI } from "@/api/tuitions.api";
import { applicationsAPI } from "@/api/applications.api";
import { useAuth } from "@/hooks/useAuth";
import {Button} from "@/components/ui/Button";
import {Card, CardContent} from "@/components/ui/Card";
import StatusBadge from "@/components/ui/StatusBadge";
import {Input} from "@/components/ui/Input";
import {Textarea} from "@/components/ui/Textarea";
import {Dialog} from "@/components/ui/Dialog";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import toast from "react-hot-toast";

const TuitionDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [applyModalOpen, setApplyModalOpen] = useState(false);
  const [applicationData, setApplicationData] = useState({
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
    onSuccess: () => {
      toast.success("Application submitted successfully!");
      setApplyModalOpen(false);
      setApplicationData({
        qualifications: "",
        experience: "",
        expectedSalary: "",
      });
      // Invalidate related queries
      queryClient.invalidateQueries(["tuition", id]);
      queryClient.invalidateQueries(["applications", "tutor"]);
    },
    onError: (error) => {
      toast.error(
        error.response?.data?.message || "Failed to submit application"
      );
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

    setApplyModalOpen(true);
  };

  const handleSubmitApplication = () => {
    if (
      !applicationData.qualifications ||
      !applicationData.experience ||
      !applicationData.expectedSalary
    ) {
      toast.error("Please fill in all fields");
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
      <div className="flex justify-center items-center h-64">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error || !tuition) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-10">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Tuition not found
          </h1>
          <p className="text-gray-600 mb-6">
            The tuition you're looking for doesn't exist or has been removed.
          </p>
          <Button onClick={() => navigate("/tuitions")}>Browse Tuitions</Button>
        </div>
      </div>
    );
  }

  return (
    <section className="py-10 md:py-14">
      <div className="max-w-3xl mx-auto px-4 md:px-0 space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div>
            <h1 className="text-2xl md:text-3xl font-semibold text-gray-900">
              {tuition.subject} tuition for {tuition.classLevel}
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              {tuition.location} • {tuition.mode} • {tuition.schedule}
            </p>
          </div>
          <StatusBadge status={tuition.status} />
        </div>

        {/* Main info card */}
        <Card>
          <CardContent className="p-4 md:p-6 space-y-4">
            <div className="grid sm:grid-cols-2 gap-4 text-sm text-gray-700">
              <div className="flex items-center">
                <MapPinIcon className="h-5 w-5 mr-2 text-gray-400" />
                <span>{tuition.location}</span>
              </div>
              <div className="flex items-center">
                <CurrencyDollarIcon className="h-5 w-5 mr-2 text-gray-400" />
                <span>৳ {tuition.budget} / month</span>
              </div>
              <div className="flex items-center">
                <CalendarIcon className="h-5 w-5 mr-2 text-gray-400" />
                <span>{tuition.schedule}</span>
              </div>
              <div className="flex items-center">
                <AcademicCapIcon className="h-5 w-5 mr-2 text-gray-400" />
                <span>{tuition.mode}</span>
              </div>
            </div>

            {tuition.description && (
              <div>
                <h3 className="text-sm font-semibold text-gray-900">
                  Additional requirements
                </h3>
                <p className="mt-1 text-sm text-gray-600">
                  {tuition.description}
                </p>
              </div>
            )}

            <div className="flex items-center gap-3 text-sm text-gray-500">
              <span className="font-medium text-gray-700">Posted by:</span>
              <span>Student in {tuition.location}</span>
            </div>
          </CardContent>
        </Card>

        {/* Apply section */}
        {user?.role === "tutor" &&
          (tuition.status === "Open" || tuition.status === "Approved") && (
            <Card className="border-brand-light">
              <CardContent className="p-4 md:p-5 flex flex-col gap-3">
                <h3 className="text-sm font-semibold text-gray-900">
                  Interested in this tuition?
                </h3>
                <p className="text-sm text-gray-600">
                  Share your qualifications, experience, and expected salary to
                  apply.
                </p>
                <div>
                  <Button
                    variant="primary"
                    onClick={handleApply}
                    disabled={applyMutation.isLoading}
                  >
                    {applyMutation.isLoading ? "Submitting..." : "Apply Now"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

        {/* Applications summary */}
        {tuition.applicationCount > 0 && (
          <Card>
            <CardContent className="p-4 md:p-5">
              <p className="text-sm text-gray-600">
                {tuition.applicationCount} application
                {tuition.applicationCount > 1 ? "s" : ""} received.
              </p>
            </CardContent>
          </Card>
        )}

        {/* Not eligible message */}
        {user && user.role !== "tutor" && (
          <Card>
            <CardContent className="p-4 md:p-5">
              <p className="text-sm text-gray-600">
                Only tutors can apply to this tuition.
              </p>
            </CardContent>
          </Card>
        )}

        {/* Apply modal */}
        <Dialog
          open={applyModalOpen}
          onClose={() => setApplyModalOpen(false)}
          title="Apply for Tuition"
          size="md"
        >
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Your Name
              </label>
              <Input value={user?.name || ""} disabled />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Your Email
              </label>
              <Input value={user?.email || ""} disabled />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
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
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Experience *
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
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
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
              />
            </div>

            <div className="flex justify-end pt-4">
              <Button
                variant="outline"
                onClick={() => setApplyModalOpen(false)}
                className="mr-2"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSubmitApplication}
                disabled={applyMutation.isLoading}
              >
                {applyMutation.isLoading
                  ? "Submitting..."
                  : "Submit Application"}
              </Button>
            </div>
          </div>
        </Dialog>
      </div>
    </section>
  );
};

export default TuitionDetailsPage;
