import { tuitionsAPI } from "@/api/tuitions.api";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { Dialog } from "@/components/ui/DialogWrapper";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import StatusBadge from "@/components/ui/StatusBadge";
import { TUITION_STATUS } from "@/utils/constants";
import {
  BookOpenIcon,
  CheckIcon,
  ExclamationTriangleIcon,
  EyeIcon,
  FunnelIcon,
  MagnifyingGlassIcon,
  PencilIcon,
  TrashIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { useState } from "react";
import toast from "react-hot-toast";

const TuitionManagement = () => {
  const queryClient = useQueryClient();
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [statusDialogOpen, setStatusDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [tuitionToView, setTuitionToView] = useState(null);
  const [tuitionToChangeStatus, setTuitionToChangeStatus] = useState(null);
  const [tuitionToDelete, setTuitionToDelete] = useState(null);
  const [newStatus, setNewStatus] = useState("");
  const [filters, setFilters] = useState({
    status: "",
    search: "",
    classLevel: "",
    minBudget: "",
    maxBudget: "",
  });

  // Fetch tuitions
  const { data: tuitions, isLoading } = useQuery({
    queryKey: ["allTuitions", filters],
    queryFn: () => tuitionsAPI.getTuitions(filters),
  });

  // Update tuition status mutation
  const updateStatusMutation = useMutation({
    mutationFn: ({ id, status }) => {
      if (status === TUITION_STATUS.APPROVED) {
        return tuitionsAPI.approveTuition(id);
      } else if (status === TUITION_STATUS.REJECTED) {
        return tuitionsAPI.rejectTuition(id);
      } else {
        return tuitionsAPI.updateTuition(id, { status });
      }
    },
    onSuccess: () => {
      toast.success("Tuition status updated successfully");
      queryClient.invalidateQueries(["allTuitions"]);
      setStatusDialogOpen(false);
      setTuitionToChangeStatus(null);
      setNewStatus("");
    },
    onError: (error) => {
      toast.error(
        error.response?.data?.message || "Failed to update tuition status"
      );
    },
  });

  // Delete tuition mutation
  const deleteMutation = useMutation({
    mutationFn: tuitionsAPI.deleteTuition,
    onSuccess: () => {
      toast.success("Tuition deleted successfully");
      queryClient.invalidateQueries(["allTuitions"]);
      setDeleteDialogOpen(false);
      setTuitionToDelete(null);
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to delete tuition");
    },
  });

  const handleView = (tuition) => {
    setTuitionToView(tuition);
    setViewDialogOpen(true);
  };

  const handleChangeStatus = (tuition) => {
    setTuitionToChangeStatus(tuition);
    setNewStatus(tuition.status);
    setStatusDialogOpen(true);
  };

  const handleDelete = (tuition) => {
    setTuitionToDelete(tuition);
    setDeleteDialogOpen(true);
  };

  const confirmStatusChange = () => {
    if (tuitionToChangeStatus && newStatus) {
      updateStatusMutation.mutate({
        id: tuitionToChangeStatus._id,
        status: newStatus,
      });
    }
  };

  const confirmDelete = () => {
    if (tuitionToDelete) {
      deleteMutation.mutate(tuitionToDelete._id);
    }
  };

  const handleFilterChange = (field, value) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  const clearFilters = () => {
    setFilters({
      status: "",
      search: "",
      classLevel: "",
      minBudget: "",
      maxBudget: "",
    });
  };

  const hasActiveFilters = Object.values(filters).some((v) => v !== "");

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Tuition Management
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">
          Review and manage all tuition posts
        </p>
      </div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center">
                <FunnelIcon className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              </div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Filter Tuitions
              </h2>
              <span className="ml-auto text-sm text-gray-500 dark:text-gray-400">
                {tuitions?.data?.length || 0} tuition(s) found
              </span>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Search
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                  </div>
                  <Input
                    className="pl-12 rounded-xl"
                    placeholder="Search by subject or location..."
                    value={filters.search}
                    onChange={(e) =>
                      handleFilterChange("search", e.target.value)
                    }
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Status
                </label>
                <Select
                  className="rounded-xl"
                  value={filters.status}
                  onChange={(e) => handleFilterChange("status", e.target.value)}
                >
                  <option value="">All Statuses</option>
                  <option value="Pending">Pending</option>
                  <option value="Approved">Approved</option>
                  <option value="Rejected">Rejected</option>
                  <option value="Open">Open</option>
                  <option value="Ongoing">Ongoing</option>
                  <option value="Completed">Completed</option>
                  <option value="Closed">Closed</option>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Class Level
                </label>
                <Select
                  className="rounded-xl"
                  value={filters.classLevel}
                  onChange={(e) =>
                    handleFilterChange("classLevel", e.target.value)
                  }
                >
                  <option value="">All Classes</option>
                  <option value="Class 1-5">Class 1-5</option>
                  <option value="Class 6-8">Class 6-8</option>
                  <option value="Class 9-10">Class 9-10</option>
                  <option value="SSC">SSC</option>
                  <option value="HSC">HSC</option>
                  <option value="University">University</option>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Min Budget (৳)
                </label>
                <Input
                  type="number"
                  placeholder="Min"
                  className="rounded-xl"
                  value={filters.minBudget}
                  onChange={(e) =>
                    handleFilterChange("minBudget", e.target.value)
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Max Budget (৳)
                </label>
                <Input
                  type="number"
                  placeholder="Max"
                  className="rounded-xl"
                  value={filters.maxBudget}
                  onChange={(e) =>
                    handleFilterChange("maxBudget", e.target.value)
                  }
                />
              </div>
            </div>
            {hasActiveFilters && (
              <div className="mt-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearFilters}
                  className="gap-2 text-gray-500"
                >
                  <XMarkIcon className="w-4 h-4" />
                  Clear Filters
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* Tuitions Table */}
      {isLoading ? (
        <div className="flex justify-center py-16">
          <LoadingSpinner size="lg" />
        </div>
      ) : tuitions?.data?.length > 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
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
                        Student
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
                        transition={{ delay: index * 0.03 }}
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
                                {tuition.classLevel} • {tuition.location}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-600 dark:text-gray-300">
                          {tuition.studentId?.name || "N/A"}
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
                          <div className="flex justify-end gap-1">
                            <button
                              className="p-2 rounded-lg text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 transition-colors"
                              onClick={() => handleView(tuition)}
                              title="View"
                            >
                              <EyeIcon className="h-5 w-5" />
                            </button>
                            <button
                              className="p-2 rounded-lg text-gray-500 hover:text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-900/30 transition-colors"
                              onClick={() => handleChangeStatus(tuition)}
                              title="Change Status"
                            >
                              <PencilIcon className="h-5 w-5" />
                            </button>
                            <button
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
        <Card>
          <CardContent className="py-16 text-center">
            <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
              <BookOpenIcon className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              No tuitions found
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mb-6">
              Try adjusting your filters or check back later.
            </p>
            <Button variant="outline" onClick={clearFilters}>
              Clear Filters
            </Button>
          </CardContent>
        </Card>
      )}

      {/* View Tuition Dialog */}
      <Dialog
        open={viewDialogOpen}
        onClose={() => setViewDialogOpen(false)}
        title="Tuition Details"
        size="lg"
      >
        {tuitionToView && (
          <div className="space-y-6 py-4">
            <div className="flex items-start justify-between p-4 rounded-xl bg-gray-50 dark:bg-gray-800">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {tuitionToView.subject} for {tuitionToView.classLevel}
                </h3>
                <p className="text-gray-500 dark:text-gray-400 mt-1">
                  Posted by {tuitionToView.studentId?.name}
                </p>
              </div>
              <StatusBadge status={tuitionToView.status} />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 uppercase mb-1">
                  Location
                </label>
                <p className="text-gray-900 dark:text-white">
                  {tuitionToView.location}
                </p>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 uppercase mb-1">
                  Budget
                </label>
                <p className="text-gray-900 dark:text-white font-semibold">
                  ৳ {tuitionToView.budget}/mo
                </p>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 uppercase mb-1">
                  Schedule
                </label>
                <p className="text-gray-900 dark:text-white">
                  {tuitionToView.daysPerWeek} days/week
                </p>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 uppercase mb-1">
                  Preferred Time
                </label>
                <p className="text-gray-900 dark:text-white">
                  {tuitionToView.preferredTime || "Not specified"}
                </p>
              </div>
            </div>

            <div className="flex justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
              <Button
                variant="outline"
                onClick={() => setViewDialogOpen(false)}
              >
                Close
              </Button>
              <div className="flex gap-2">
                {tuitionToView.status === TUITION_STATUS.PENDING && (
                  <>
                    <Button
                      onClick={() => {
                        setViewDialogOpen(false);
                        setTuitionToChangeStatus(tuitionToView);
                        setNewStatus(TUITION_STATUS.APPROVED);
                        setStatusDialogOpen(true);
                      }}
                      className="gap-2 bg-emerald-600 hover:bg-emerald-700"
                    >
                      <CheckIcon className="h-4 w-4" />
                      Approve
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => {
                        setViewDialogOpen(false);
                        setTuitionToChangeStatus(tuitionToView);
                        setNewStatus(TUITION_STATUS.REJECTED);
                        setStatusDialogOpen(true);
                      }}
                      className="gap-2"
                    >
                      <XMarkIcon className="h-4 w-4" />
                      Reject
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </Dialog>

      {/* Change Status Dialog */}
      <Dialog
        open={statusDialogOpen}
        onClose={() => setStatusDialogOpen(false)}
        title="Change Tuition Status"
        size="sm"
      >
        <div className="space-y-5 py-4">
          <p className="text-gray-600 dark:text-gray-300">
            Select the new status for this tuition.
          </p>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Status
            </label>
            <Select
              className="rounded-xl"
              value={newStatus}
              onChange={(e) => setNewStatus(e.target.value)}
            >
              <option value={TUITION_STATUS.PENDING}>Pending</option>
              <option value={TUITION_STATUS.APPROVED}>Approved</option>
              <option value={TUITION_STATUS.REJECTED}>Rejected</option>
              <option value={TUITION_STATUS.OPEN}>Open</option>
              <option value={TUITION_STATUS.ONGOING}>Ongoing</option>
              <option value={TUITION_STATUS.COMPLETED}>Completed</option>
              <option value={TUITION_STATUS.CLOSED}>Closed</option>
            </Select>
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <Button
              variant="outline"
              onClick={() => setStatusDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={confirmStatusChange}
              disabled={updateStatusMutation.isPending || !newStatus}
            >
              {updateStatusMutation.isPending ? "Updating..." : "Update Status"}
            </Button>
          </div>
        </div>
      </Dialog>

      {/* Delete Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        title="Delete Tuition"
        size="sm"
      >
        <div className="py-4">
          <div className="flex items-center gap-3 p-4 rounded-xl bg-red-50 dark:bg-red-900/20 mb-4">
            <ExclamationTriangleIcon className="w-6 h-6 text-red-500" />
            <p className="text-red-700 dark:text-red-300">
              This action cannot be undone.
            </p>
          </div>
          <p className="text-gray-600 dark:text-gray-300">
            Are you sure you want to delete this tuition? All associated
            applications will also be removed.
          </p>
        </div>
        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
            Cancel
          </Button>
          <Button
            variant="danger"
            onClick={confirmDelete}
            disabled={deleteMutation.isPending}
          >
            {deleteMutation.isPending ? "Deleting..." : "Delete Tuition"}
          </Button>
        </div>
      </Dialog>
    </div>
  );
};

export default TuitionManagement;
