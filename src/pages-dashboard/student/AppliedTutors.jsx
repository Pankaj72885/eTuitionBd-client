import { applicationsAPI } from "@/api/applications.api";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import ProtectedImage from "@/components/common/ProtectedImage";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { Dialog } from "@/components/ui/Dialog";
import StatusBadge from "@/components/ui/StatusBadge";
import { CheckIcon, EyeIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

const AppliedTutors = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [rejectDialogOpen, setRejectDialogOpen] = useState(false);
  const [applicationToReject, setApplicationToReject] = useState(null);

  // Fetch student's applications
  const { data: applications, isLoading } = useQuery({
    queryKey: ["studentApplications"],
    queryFn: applicationsAPI.getStudentApplications,
  });

  // Accept application mutation
  const acceptMutation = useMutation({
    mutationFn: applicationsAPI.updateApplicationStatus,
    onSuccess: () => {
      toast.success("Application accepted! Redirecting to payment...");
      queryClient.invalidateQueries(["studentApplications"]);
      // In a real app, redirect to payment page
      // navigate('/dashboard/student/payments');
    },
    onError: (error) => {
      toast.error(
        error.response?.data?.message || "Failed to accept application"
      );
    },
  });

  // Reject application mutation
  const rejectMutation = useMutation({
    mutationFn: applicationsAPI.updateApplicationStatus,
    onSuccess: () => {
      toast.success("Application rejected");
      queryClient.invalidateQueries(["studentApplications"]);
      setRejectDialogOpen(false);
      setApplicationToReject(null);
    },
    onError: (error) => {
      toast.error(
        error.response?.data?.message || "Failed to reject application"
      );
    },
  });

  const handleAccept = (applicationId) => {
    navigate(`/payment/checkout?applicationId=${applicationId}`);
  };

  const handleReject = (application) => {
    setApplicationToReject(application);
    setRejectDialogOpen(true);
  };

  const confirmReject = () => {
    if (applicationToReject) {
      rejectMutation.mutate({
        id: applicationToReject._id,
        status: "Rejected",
      });
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Applied Tutors</h1>

      {isLoading ? (
        <div className="flex justify-center py-12">
          <LoadingSpinner size="lg" />
        </div>
      ) : applications?.data?.length > 0 ? (
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-800">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Tutor
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Qualifications
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Experience
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Expected Salary
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Status
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {applications.data.map((application) => (
                    <tr key={application._id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <ProtectedImage
                            src={application.tutorId?.photoUrl}
                            alt={application.tutorId?.name}
                            className="w-10 h-10 rounded-full mr-3"
                          />
                          <div>
                            <div className="text-sm font-medium text-gray-900 dark:text-white">
                              {application.tutorId?.name}
                            </div>
                            <div className="text-sm text-gray-500 dark:text-gray-300">
                              {application.tutorId?.city}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900 truncate max-w-xs">
                          {application.qualifications}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900 truncate max-w-xs">
                          {application.experience}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 dark:text-white">
                          ৳ {application.expectedSalary}/month
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <StatusBadge status={application.status} />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end space-x-2">
                          {application.status === "Pending" && (
                            <>
                              <button
                                type="button"
                                className="text-green-600 hover:text-green-900"
                                onClick={() => handleAccept(application._id)}
                                disabled={acceptMutation.isLoading}
                              >
                                <CheckIcon className="h-5 w-5" />
                              </button>
                              <button
                                type="button"
                                className="text-red-600 hover:text-red-900"
                                onClick={() => handleReject(application)}
                                disabled={rejectMutation.isLoading}
                              >
                                <XMarkIcon className="h-5 w-5" />
                              </button>
                            </>
                          )}
                          <button
                            type="button"
                            className="text-brand hover:text-brand-dark"
                            onClick={() =>
                              navigate(`/tutors/${application.tutorId?._id}`)
                            }
                          >
                            <EyeIcon className="h-5 w-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent className="p-12 text-center">
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No applications yet
            </h3>
            <p className="text-gray-500 mb-6">
              Tutors haven't applied to your tuitions yet.
            </p>
            <Button onClick={() => navigate("/dashboard/student/my-tuitions")}>
              View My Tuitions
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Reject confirmation dialog */}
      <Dialog
        open={rejectDialogOpen}
        onClose={() => setRejectDialogOpen(false)}
        title="Reject Application"
        size="sm"
      >
        <div className="space-y-4">
          <p className="text-sm text-gray-500 dark:text-gray-300">
            Are you sure you want to reject this application? This action cannot
            be undone.
          </p>
          <div className="flex justify-end pt-4">
            <Button
              variant="outline"
              onClick={() => setRejectDialogOpen(false)}
              className="mr-2"
            >
              Cancel
            </Button>
            <Button
              variant="danger"
              onClick={confirmReject}
              disabled={rejectMutation.isLoading}
            >
              {rejectMutation.isLoading ? "Rejecting..." : "Reject"}
            </Button>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default AppliedTutors;
