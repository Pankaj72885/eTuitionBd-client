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
  CheckIcon,
  EyeIcon,
  PencilIcon,
  TrashIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
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
        // For other status changes, use the update endpoint
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
    setFilters((prev) => ({
      ...prev,
      [field]: value,
    }));
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

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">
        Tuition Management
      </h1>

      {/* Enhanced Filters */}
      <Card className="mb-6">
        <CardContent className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Filter Tuitions
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label
                htmlFor="search"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Search
              </label>
              <Input
                id="search"
                placeholder="Search by subject or location..."
                value={filters.search}
                onChange={(e) => handleFilterChange("search", e.target.value)}
              />
            </div>
            <div>
              <label
                htmlFor="status"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Status
              </label>
              <Select
                id="status"
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
              <label
                htmlFor="classLevel"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Class Level
              </label>
              <Select
                id="classLevel"
                value={filters.classLevel}
                onChange={(e) =>
                  handleFilterChange("classLevel", e.target.value)
                }
              >
                <option value="">All Classes</option>
                <option value="Class 1">Class 1</option>
                <option value="Class 2">Class 2</option>
                <option value="Class 3">Class 3</option>
                <option value="Class 4">Class 4</option>
                <option value="Class 5">Class 5</option>
                <option value="Class 6">Class 6</option>
                <option value="Class 7">Class 7</option>
                <option value="Class 8">Class 8</option>
                <option value="Class 9">Class 9</option>
                <option value="Class 10">Class 10</option>
                <option value="SSC">SSC</option>
                <option value="HSC">HSC</option>
                <option value="University">University</option>
              </Select>
            </div>
            <div>
              <label
                htmlFor="minBudget"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Min Budget (৳)
              </label>
              <Input
                id="minBudget"
                type="number"
                placeholder="Min budget"
                value={filters.minBudget}
                onChange={(e) =>
                  handleFilterChange("minBudget", e.target.value)
                }
              />
            </div>
            <div>
              <label
                htmlFor="maxBudget"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Max Budget (৳)
              </label>
              <Input
                id="maxBudget"
                type="number"
                placeholder="Max budget"
                value={filters.maxBudget}
                onChange={(e) =>
                  handleFilterChange("maxBudget", e.target.value)
                }
              />
            </div>
          </div>
          <div className="mt-4 flex gap-2">
            <Button variant="outline" onClick={clearFilters}>
              Clear Filters
            </Button>
            <div className="text-sm text-gray-500 flex items-center ml-auto">
              {tuitions?.data?.length || 0} tuition(s) found
            </div>
          </div>
        </CardContent>
      </Card>

      {isLoading ? (
        <div className="flex justify-center py-12">
          <LoadingSpinner size="lg" />
        </div>
      ) : tuitions?.data?.length > 0 ? (
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-800">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                    >
                      Title
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                    >
                      Student
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                    >
                      Location
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                    >
                      Budget
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                    >
                      Status
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                  {tuitions.data.map((tuition) => (
                    <tr key={tuition._id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          {tuition.subject} for {tuition.classLevel}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 dark:text-white">
                          {tuition.studentId?.name || "N/A"}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 dark:text-white">
                          {tuition.location}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 dark:text-white">
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
                            onClick={() => handleView(tuition)}
                          >
                            <EyeIcon className="h-5 w-5" />
                          </button>
                          <button
                            type="button"
                            className="text-indigo-600 hover:text-indigo-900"
                            onClick={() => handleChangeStatus(tuition)}
                          >
                            <PencilIcon className="h-5 w-5" />
                          </button>
                          <button
                            type="button"
                            className="text-red-600 hover:text-red-900"
                            onClick={() => handleDelete(tuition)}
                            disabled={deleteMutation.isLoading}
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
              No tuitions found
            </h3>
            <p className="text-gray-500 mb-6">
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
          <div className="space-y-6">
            {/* Tuition Header */}
            <div className="pb-4 border-b border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                {tuitionToView.subject} for {tuitionToView.classLevel}
              </h3>
              <div className="mt-2">
                <StatusBadge status={tuitionToView.status} />
              </div>
            </div>

            {/* Tuition Information Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">
                  Student
                </label>
                <p className="text-sm text-gray-900 dark:text-white">
                  {tuitionToView.studentId?.name || "N/A"}
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">
                  Student Email
                </label>
                <p className="text-sm text-gray-900 dark:text-white">
                  {tuitionToView.studentId?.email || "N/A"}
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">
                  Location
                </label>
                <p className="text-sm text-gray-900 dark:text-white">
                  {tuitionToView.location}
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                  Budget
                </label>
                <p className="text-sm text-gray-900 dark:text-white font-semibold">
                  ৳ {tuitionToView.budget}
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">
                  Days Per Week
                </label>
                <p className="text-sm text-gray-900 dark:text-white">
                  {tuitionToView.daysPerWeek} days
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">
                  Preferred Time
                </label>
                <p className="text-sm text-gray-900 dark:text-white">
                  {tuitionToView.preferredTime || "Not specified"}
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">
                  Posted On
                </label>
                <p className="text-sm text-gray-900 dark:text-white">
                  {new Date(tuitionToView.createdAt).toLocaleDateString(
                    "en-US",
                    {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    }
                  )}
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">
                  Last Updated
                </label>
                <p className="text-sm text-gray-900 dark:text-white">
                  {new Date(tuitionToView.updatedAt).toLocaleDateString(
                    "en-US",
                    {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    }
                  )}
                </p>
              </div>
            </div>

            {/* Additional Details */}
            {tuitionToView.additionalDetails && (
              <div className="pt-4 border-t border-gray-200">
                <label className="block text-sm font-medium text-gray-500 mb-1">
                  Additional Details
                </label>
                <p className="text-sm text-gray-900 dark:text-white">
                  {tuitionToView.additionalDetails}
                </p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex justify-between pt-4 border-t border-gray-200">
              <Button
                variant="outline"
                onClick={() => setViewDialogOpen(false)}
              >
                Close
              </Button>
              <div className="flex space-x-2">
                {tuitionToView.status === TUITION_STATUS.PENDING && (
                  <>
                    <Button
                      onClick={() => {
                        setViewDialogOpen(false);
                        setTuitionToChangeStatus(tuitionToView);
                        setNewStatus(TUITION_STATUS.APPROVED);
                        setStatusDialogOpen(true);
                      }}
                      className="flex items-center space-x-1 bg-green-600 hover:bg-green-700 text-white"
                    >
                      <CheckIcon className="h-4 w-4" />
                      <span>Approve</span>
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => {
                        setViewDialogOpen(false);
                        setTuitionToChangeStatus(tuitionToView);
                        setNewStatus(TUITION_STATUS.REJECTED);
                        setStatusDialogOpen(true);
                      }}
                      className="flex items-center space-x-1"
                    >
                      <XMarkIcon className="h-4 w-4" />
                      <span>Reject</span>
                    </Button>
                  </>
                )}
                <Button
                  variant="primary"
                  onClick={() => {
                    setViewDialogOpen(false);
                    handleChangeStatus(tuitionToView);
                  }}
                  className="flex items-center space-x-1"
                >
                  <PencilIcon className="h-4 w-4" />
                  <span>Change Status</span>
                </Button>
                <Button
                  variant="danger"
                  onClick={() => {
                    setViewDialogOpen(false);
                    handleDelete(tuitionToView);
                  }}
                  className="flex items-center space-x-1"
                >
                  <TrashIcon className="h-4 w-4" />
                  <span>Delete</span>
                </Button>
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
        <div className="space-y-4">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Select the new status for this tuition.
          </p>
          <div>
            <label
              htmlFor="newStatus"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Status
            </label>
            <Select
              id="newStatus"
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
          <div className="flex justify-end pt-4">
            <Button
              variant="outline"
              onClick={() => setStatusDialogOpen(false)}
              className="mr-2"
            >
              Cancel
            </Button>
            <Button
              onClick={confirmStatusChange}
              disabled={updateStatusMutation.isLoading || !newStatus}
            >
              {updateStatusMutation.isLoading ? "Updating..." : "Update Status"}
            </Button>
          </div>
        </div>
      </Dialog>

      {/* Delete confirmation dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        title="Delete Tuition"
        size="sm"
      >
        <div className="space-y-4">
          <p className="text-sm text-gray-500 dark:text-gray-400">
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

export default TuitionManagement;
