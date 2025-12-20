import { applicationsAPI } from "@/api/applications.api";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { Dialog } from "@/components/ui/Dialog";
import { Input } from "@/components/ui/Input";
import StatusBadge from "@/components/ui/StatusBadge";
import {Textarea} from "@/components/ui/Textarea";
import { EyeIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
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
      updateMutation.mutate({
        id: applicationToEdit._id,
        data,
      });
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
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">My Applications</h1>

      {isLoading ? (
        <div className="flex justify-center py-12">
          <LoadingSpinner size="lg" />
        </div>
      ) : applications?.data?.length > 0 ? (
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Tuition
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Location
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
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          {application.tuitionId?.subject} for{" "}
                          {application.tuitionId?.classLevel}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500 dark:text-gray-300">
                          {application.tuitionId?.location}
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
                          <button
                            type="button"
                            className="text-brand hover:text-brand-dark"
                            onClick={() =>
                              handleView(application.tuitionId?._id)
                            }
                          >
                            <EyeIcon className="h-5 w-5" />
                          </button>
                          {application.status === "Pending" && (
                            <>
                              <button
                                type="button"
                                className="text-indigo-600 hover:text-indigo-900"
                                onClick={() => handleEdit(application)}
                              >
                                <PencilIcon className="h-5 w-5" />
                              </button>
                              <button
                                type="button"
                                className="text-red-600 hover:text-red-900"
                                onClick={() => handleDelete(application)}
                              >
                                <TrashIcon className="h-5 w-5" />
                              </button>
                            </>
                          )}
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
              Start applying to tuitions that match your expertise.
            </p>
            <Button onClick={() => navigate("/tuitions")}>
              Browse Tuitions
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Edit Application Dialog */}
      <Dialog
        open={editDialogOpen}
        onClose={() => setEditDialogOpen(false)}
        title="Edit Application"
        size="md"
      >
        <form onSubmit={handleSubmit(handleUpdate)} className="space-y-4">
          <div>
            <label
              htmlFor="qualifications"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Qualifications *
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
              htmlFor="experience"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Experience *
            </label>
            <Textarea
              id="experience"
              rows={3}
              placeholder="Describe your teaching experience..."
              {...register("experience", {
                required: "Experience is required",
              })}
              error={errors.experience?.message}
            />
          </div>

          <div>
            <label
              htmlFor="expectedSalary"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Expected Salary (৳/month) *
            </label>
            <Input
              id="expectedSalary"
              type="number"
              placeholder="5000"
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

          <div className="flex justify-end pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setEditDialogOpen(false)}
              className="mr-2"
            >
              Cancel
            </Button>
            <Button type="submit" disabled={updateMutation.isLoading}>
              {updateMutation.isLoading ? "Updating..." : "Update Application"}
            </Button>
          </div>
        </form>
      </Dialog>

      {/* Delete confirmation dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        title="Delete Application"
        size="sm"
      >
        <div className="space-y-4">
          <p className="text-sm text-gray-500 dark:text-gray-300">
            Are you sure you want to delete this application? This action cannot
            be undone.
          </p>
          <div className="flex justify-end pt-4">
            <Button
              variant="outline"
              onClick={() => setDeleteDialogOpen(false)}
              className="mr-2"
            >
              Cancel
            </Button>
            <Button
              variant="danger"
              onClick={confirmDelete}
              disabled={deleteMutation.isLoading}
            >
              {deleteMutation.isLoading ? "Deleting..." : "Delete"}
            </Button>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default MyApplications;
