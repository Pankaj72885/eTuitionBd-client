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
import StatusBadge from "@/components/ui/StatusBadge";
import {
  BookOpenIcon,
  ExclamationTriangleIcon,
  EyeIcon,
  PencilIcon,
  PlusIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { useState } from "react";
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
    queryFn: tuitionsAPI.getMyTuitions,
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
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            My Tuitions
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Manage your posted tuition requirements
          </p>
        </div>
        <Button
          onClick={() => navigate("/dashboard/student/post-tuition")}
          className="gap-2"
        >
          <PlusIcon className="w-5 h-5" />
          Post New Tuition
        </Button>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-16">
          <LoadingSpinner size="lg" />
        </div>
      ) : tuitions?.data?.length > 0 ? (
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
                        Title
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                        Location
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                        Budget
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
                    {tuitions.data.map((tuition, index) => (
                      <motion.tr
                        key={tuition._id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center shrink-0">
                              <BookOpenIcon className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                            </div>
                            <div>
                              <p className="font-medium text-gray-900 dark:text-white">
                                {tuition.subject}
                              </p>
                              <p className="text-sm text-gray-500 dark:text-gray-400">
                                {tuition.classLevel}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="text-gray-600 dark:text-gray-300">
                            {tuition.location}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="font-semibold text-gray-900 dark:text-white">
                            ৳ {tuition.budget}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <StatusBadge status={tuition.status} />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right">
                          <div className="flex justify-end gap-2">
                            <button
                              type="button"
                              className="p-2 rounded-lg text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 transition-colors"
                              onClick={() => handleView(tuition._id)}
                              title="View"
                            >
                              <EyeIcon className="h-5 w-5" />
                            </button>
                            <button
                              type="button"
                              className="p-2 rounded-lg text-gray-500 hover:text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-900/30 transition-colors"
                              onClick={() => handleEdit(tuition._id)}
                              title="Edit"
                            >
                              <PencilIcon className="h-5 w-5" />
                            </button>
                            <button
                              type="button"
                              className="p-2 rounded-lg text-gray-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 transition-colors"
                              onClick={() => handleDelete(tuition)}
                              title="Delete"
                            >
                              <TrashIcon className="h-5 w-5" />
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
                <BookOpenIcon className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                No tuitions posted yet
              </h3>
              <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-md mx-auto">
                Get started by posting your first tuition requirement to find
                qualified tutors.
              </p>
              <Button
                onClick={() => navigate("/dashboard/student/post-tuition")}
                className="gap-2"
              >
                <PlusIcon className="w-5 h-5" />
                Post New Tuition
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Delete confirmation dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-red-600">
              <ExclamationTriangleIcon className="w-5 h-5" />
              Delete Tuition
            </DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p className="text-gray-600 dark:text-gray-300">
              Are you sure you want to delete this tuition? This action cannot
              be undone and all associated applications will be removed.
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

export default MyTuitions;
