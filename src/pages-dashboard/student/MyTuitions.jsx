import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { PencilIcon, TrashIcon, EyeIcon } from "@heroicons/react/24/outline";
import { tuitionsAPI } from "@/api/tuitions.api";
import {Button} from "@/components/ui/Button";
import {Card, CardContent} from "@/components/ui/Card";
import StatusBadge from "@/components/ui/StatusBadge";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import {Dialog} from "@/components/ui/Dialog";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

const MyTuitions = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [tuitionToDelete, setTuitionToDelete] = useState(null);

  // Fetch student's tuitions
  const { data: tuitions, isLoading } = useQuery({
    queryKey: ["studentTuitions"],
    queryFn: async () => {
      // In a real app, this would be a specific API endpoint
      // For now, we'll use a placeholder
      return {
        data: [],
        pagination: { totalCount: 0 },
      };
    },
  });

  // Delete tuition mutation
  const deleteMutation = useMutation({
    mutationFn: tuitionsAPI.deleteTuition,
    onSuccess: () => {
      toast.success("Tuition deleted successfully");
      queryClient.invalidateQueries(["studentTuitions"]);
      setDeleteDialogOpen(false);
      setTuitionToDelete(null);
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to delete tuition");
    },
  });

  const handleEdit = (id) => {
    navigate(`/dashboard/student/post-tuition?id=${id}`);
  };

  const handleDelete = (tuition) => {
    setTuitionToDelete(tuition);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (tuitionToDelete) {
      deleteMutation.mutate(tuitionToDelete._id);
    }
  };

  const handleView = (id) => {
    navigate(`/tuitions/${id}`);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">My Tuitions</h1>
        <Button onClick={() => navigate("/dashboard/student/post-tuition")}>
          Post New Tuition
        </Button>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-12">
          <LoadingSpinner size="lg" />
        </div>
      ) : tuitions?.data?.length > 0 ? (
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
                      Title
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
                      Budget
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
                  {tuitions.data.map((tuition) => (
                    <tr key={tuition._id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          {tuition.subject} for {tuition.classLevel}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500 dark:text-gray-300">
                          {tuition.location}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500 dark:text-gray-300">
                          ৳ {tuition.budget}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <StatusBadge status={tuition.status} />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end space-x-2">
                          <button
                            type="button"
                            className="text-brand hover:text-brand-dark"
                            onClick={() => handleView(tuition._id)}
                          >
                            <EyeIcon className="h-5 w-5" />
                          </button>
                          <button
                            type="button"
                            className="text-indigo-600 hover:text-indigo-900"
                            onClick={() => handleEdit(tuition._id)}
                          >
                            <PencilIcon className="h-5 w-5" />
                          </button>
                          <button
                            type="button"
                            className="text-red-600 hover:text-red-900"
                            onClick={() => handleDelete(tuition)}
                          >
                            <TrashIcon className="h-5 w-5" />
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
              No tuitions posted yet
            </h3>
            <p className="text-gray-500 mb-6">
              Get started by posting your first tuition requirement.
            </p>
            <Button onClick={() => navigate("/dashboard/student/post-tuition")}>
              Post New Tuition
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Delete confirmation dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        title="Delete Tuition"
        size="sm"
      >
        <div className="space-y-4">
          <p className="text-sm text-gray-500 dark:text-gray-300">
            Are you sure you want to delete this tuition? This action cannot be
            undone.
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

export default MyTuitions;
