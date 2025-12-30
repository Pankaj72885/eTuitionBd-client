import { applicationsAPI } from "@/api/applications.api";
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
import {
  ClipboardDocumentListIcon,
  ExclamationTriangleIcon,
  EyeIcon,
  MagnifyingGlassIcon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

const MyApplications = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [applicationToEdit, setApplicationToEdit] = useState(null);
  const [applicationToDelete, setApplicationToDelete] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  // Fetch tutor's applications
  const { data: applications, isLoading } = useQuery({
    queryKey: ["tutorApplications"],
    queryFn: applicationsAPI.getTutorApplications,
  });

  // Update application mutation
  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => applicationsAPI.updateApplication(id, data),
    onSuccess: () => {
      toast.success("Application updated successfully");
      queryClient.invalidateQueries(["tutorApplications"]);
      setEditDialogOpen(false);
      setApplicationToEdit(null);
    },
    onError: (error) => {
      toast.error(
        error.response?.data?.message || "Failed to update application"
      );
    },
  });

  // Delete application mutation
  const deleteMutation = useMutation({
    mutationFn: applicationsAPI.deleteApplication,
    onSuccess: () => {
      toast.success("Application deleted successfully");
      queryClient.invalidateQueries(["tutorApplications"]);
      setDeleteDialogOpen(false);
      setApplicationToDelete(null);
    },
    onError: (error) => {
      toast.error(
        error.response?.data?.message || "Failed to delete application"
      );
    },
  });

  const handleEdit = (application) => {
    setApplicationToEdit(application);
    reset({
      qualifications: application.qualifications,
      experience: application.experience,
      expectedSalary: application.expectedSalary,
    });
    setEditDialogOpen(true);
  };

  const handleDelete = (application) => {
    setApplicationToDelete(application);
    setDeleteDialogOpen(true);
  };

  const handleUpdate = (data) => {
    if (applicationToEdit) {
      updateMutation.mutate({ id: applicationToEdit._id, data });
    }
  };

  const confirmDelete = () => {
    if (applicationToDelete) {
      deleteMutation.mutate(applicationToDelete._id);
    }
  };

  const handleView = (id) => {
    navigate(`/tuitions/${id}`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            My Applications
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Track and manage your tuition applications
          </p>
        </div>
        <Button
          onClick={() => navigate("/tuitions")}
          variant="outline"
          className="gap-2"
        >
          <MagnifyingGlassIcon className="w-5 h-5" />
          Find More Tuitions
        </Button>
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
                        Tuition
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                        Location
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
                            <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center shrink-0">
                              <ClipboardDocumentListIcon className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                            </div>
                            <div>
                              <p className="font-medium text-gray-900 dark:text-white">
                                {application.tuitionId?.subject}
                              </p>
                              <p className="text-sm text-gray-500 dark:text-gray-400">
                                {application.tuitionId?.classLevel}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="text-gray-600 dark:text-gray-300">
                            {application.tuitionId?.location}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="font-semibold text-gray-900 dark:text-white">
                            ৳ {application.expectedSalary}/month
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <StatusBadge status={application.status} />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right">
                          <div className="flex justify-end gap-2">
                            <button
                              type="button"
                              className="p-2 rounded-lg text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 transition-colors"
                              onClick={() =>
                                handleView(application.tuitionId?._id)
                              }
                              title="View Tuition"
                            >
                              <EyeIcon className="h-5 w-5" />
                            </button>
                            {application.status === "Pending" && (
                              <>
                                <button
                                  type="button"
                                  className="p-2 rounded-lg text-gray-500 hover:text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-900/30 transition-colors"
                                  onClick={() => handleEdit(application)}
                                  title="Edit"
                                >
                                  <PencilIcon className="h-5 w-5" />
                                </button>
                                <button
                                  type="button"
                                  className="p-2 rounded-lg text-gray-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 transition-colors"
                                  onClick={() => handleDelete(application)}
                                  title="Delete"
                                >
                                  <TrashIcon className="h-5 w-5" />
                                </button>
                              </>
                            )}
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
                <ClipboardDocumentListIcon className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                No applications yet
              </h3>
              <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-md mx-auto">
                Start applying to tuitions that match your expertise and start
                earning.
              </p>
              <Button onClick={() => navigate("/tuitions")} className="gap-2">
                <MagnifyingGlassIcon className="w-5 h-5" />
                Browse Tuitions
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Edit Application Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Edit Application</DialogTitle>
          </DialogHeader>
          <form
            onSubmit={handleSubmit(handleUpdate)}
            className="space-y-5 py-4"
          >
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Qualifications *
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
                Experience *
              </label>
              <Textarea
                rows={3}
                placeholder="Describe your teaching experience..."
                className="rounded-xl"
                {...register("experience", {
                  required: "Experience is required",
                })}
                error={errors.experience?.message}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Expected Salary (৳/month) *
              </label>
              <Input
                type="number"
                placeholder="5000"
                className="rounded-xl"
                {...register("expectedSalary", {
                  required: "Expected salary is required",
                  min: {
                    value: 500,
                    message: "Expected salary must be at least 500 BDT",
                  },
                })}
                error={errors.expectedSalary?.message}
              />
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setEditDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={updateMutation.isPending}>
                {updateMutation.isPending
                  ? "Updating..."
                  : "Update Application"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete confirmation dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-red-600">
              <ExclamationTriangleIcon className="w-5 h-5" />
              Delete Application
            </DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p className="text-gray-600 dark:text-gray-300">
              Are you sure you want to delete this application? This action
              cannot be undone.
            </p>
          </div>
          <div className="flex justify-end gap-3">
            <Button
              variant="outline"
              onClick={() => setDeleteDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="danger"
              onClick={confirmDelete}
              disabled={deleteMutation.isPending}
            >
              {deleteMutation.isPending ? "Deleting..." : "Delete"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MyApplications;
