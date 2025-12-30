import { applicationsAPI } from "@/api/applications.api";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import ProtectedImage from "@/components/common/ProtectedImage";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/Dialog";
import StatusBadge from "@/components/ui/StatusBadge";
import {
  CheckIcon,
  ExclamationTriangleIcon,
  EyeIcon,
  UserGroupIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
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
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Applied Tutors
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">
          Review and manage applications from tutors
        </p>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-16">
          <LoadingSpinner size="lg" />
        </div>
      ) : applications?.data?.length > 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="overflow-hidden">
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-800">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                        Tutor
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                        Qualifications
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                        Expected Salary
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-100 dark:divide-gray-800">
                    {applications.data.map((application, index) => (
                      <motion.tr
                        key={application._id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-3">
                            <ProtectedImage
                              src={application.tutorId?.photoUrl}
                              alt={application.tutorId?.name}
                              className="w-10 h-10 rounded-xl object-cover"
                            />
                            <div>
                              <p className="font-medium text-gray-900 dark:text-white">
                                {application.tutorId?.name}
                              </p>
                              <p className="text-sm text-gray-500 dark:text-gray-400">
                                {application.tutorId?.city}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="max-w-xs">
                            <p className="text-sm text-gray-900 dark:text-white truncate">
                              {application.qualifications}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400 truncate mt-1">
                              {application.experience}
                            </p>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="font-semibold text-gray-900 dark:text-white">
                            ৳ {application.expectedSalary}
                          </span>
                          <span className="text-sm text-gray-500 dark:text-gray-400">
                            /month
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <StatusBadge status={application.status} />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right">
                          <div className="flex justify-end gap-1">
                            {application.status === "Pending" && (
                              <>
                                <button
                                  className="p-2 rounded-lg text-gray-500 hover:text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-900/30 transition-colors"
                                  onClick={() => handleAccept(application._id)}
                                  title="Accept"
                                >
                                  <CheckIcon className="h-5 w-5" />
                                </button>
                                <button
                                  className="p-2 rounded-lg text-gray-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 transition-colors"
                                  onClick={() => handleReject(application)}
                                  title="Reject"
                                >
                                  <XMarkIcon className="h-5 w-5" />
                                </button>
                              </>
                            )}
                            <button
                              className="p-2 rounded-lg text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 transition-colors"
                              onClick={() =>
                                navigate(`/tutors/${application.tutorId?._id}`)
                              }
                              title="View Profile"
                            >
                              <EyeIcon className="h-5 w-5" />
                            </button>
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card>
            <CardContent className="py-16 text-center">
              <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                <UserGroupIcon className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                No applications yet
              </h3>
              <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-md mx-auto">
                Tutors haven't applied to your tuitions yet. Make sure your
                tuition posts are attractive!
              </p>
              <Button
                onClick={() => navigate("/dashboard/student/my-tuitions")}
              >
                View My Tuitions
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Reject confirmation dialog */}
      <Dialog open={rejectDialogOpen} onOpenChange={setRejectDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-red-600">
              <ExclamationTriangleIcon className="w-5 h-5" />
              Reject Application
            </DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p className="text-gray-600 dark:text-gray-300">
              Are you sure you want to reject this application? The tutor will
              be notified.
            </p>
          </div>
          <div className="flex justify-end gap-3">
            <Button
              variant="outline"
              onClick={() => setRejectDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="danger"
              onClick={confirmReject}
              disabled={rejectMutation.isPending}
            >
              {rejectMutation.isPending ? "Rejecting..." : "Reject"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AppliedTutors;
