import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { EyeIcon, CheckIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { tuitionsAPI } from "@/api/tuitions.api";
import {Button} from "@/components/ui/Button";
import {Card, CardContent} from "@/components/ui/Card";
import {Input} from "@/components/ui/Input";
import {Select} from "@/components/ui/Select";
import StatusBadge from "@/components/ui/StatusBadge";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import {Dialog} from "@/components/ui/Dialog";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

const TuitionManagement = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [approveDialogOpen, setApproveDialogOpen] = useState(false);
  const [rejectDialogOpen, setRejectDialogOpen] = useState(false);
  const [tuitionToApprove, setTuitionToApprove] = useState(null);
  const [tuitionToReject, setTuitionToReject] = useState(null);
  const [filters, setFilters] = useState({
    status: "",
    search: "",
  });

  // Fetch tuitions
  const { data: tuitions, isLoading } = useQuery({
    queryKey: ["allTuitions", filters],
    queryFn: () => tuitionsAPI.getTuitions(filters),
  });

  // Approve tuition mutation
  const approveMutation = useMutation({
    mutationFn: (id) => tuitionsAPI.updateTuition(id, { status: "Approved" }),
    onSuccess: () => {
      toast.success("Tuition approved successfully");
      queryClient.invalidateQueries(["allTuitions"]);
      setApproveDialogOpen(false);
      setTuitionToApprove(null);
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to approve tuition");
    },
  });

  // Reject tuition mutation
  const rejectMutation = useMutation({
    mutationFn: (id) => tuitionsAPI.updateTuition(id, { status: "Rejected" }),
    onSuccess: () => {
      toast.success("Tuition rejected successfully");
      queryClient.invalidateQueries(["allTuitions"]);
      setRejectDialogOpen(false);
      setTuitionToReject(null);
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to reject tuition");
    },
  });

  const handleApprove = (tuition) => {
    setTuitionToApprove(tuition);
    setApproveDialogOpen(true);
  };

  const handleReject = (tuition) => {
    setTuitionToReject(tuition);
    setRejectDialogOpen(true);
  };

  const confirmApprove = () => {
    if (tuitionToApprove) {
      approveMutation.mutate(tuitionToApprove._id);
    }
  };

  const confirmReject = () => {
    if (tuitionToReject) {
      rejectMutation.mutate(tuitionToReject._id);
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
    });
  };

  const handleView = (id) => {
    navigate(`/tuitions/${id}`);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">
        Tuition Management
      </h1>

      {/* Filters */}
      <Card className="mb-6">
        <CardContent className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Filter Tuitions
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="search"
                className="block text-sm font-medium text-gray-700 mb-1"
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
                className="block text-sm font-medium text-gray-700 mb-1"
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
          </div>
          <div className="mt-4">
            <Button variant="outline" onClick={clearFilters}>
              Clear Filters
            </Button>
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
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
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
                      Student
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
                <tbody className="bg-white divide-y divide-gray-200">
                  {tuitions.data.map((tuition) => (
                    <tr key={tuition._id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {tuition.subject} for {tuition.classLevel}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {tuition.studentId?.name}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {tuition.location}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
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
                          {tuition.status === "Pending" && (
                            <>
                              <button
                                type="button"
                                className="text-green-600 hover:text-green-900"
                                onClick={() => handleApprove(tuition)}
                                disabled={approveMutation.isLoading}
                              >
                                <CheckIcon className="h-5 w-5" />
                              </button>
                              <button
                                type="button"
                                className="text-red-600 hover:text-red-900"
                                onClick={() => handleReject(tuition)}
                                disabled={rejectMutation.isLoading}
                              >
                                <XMarkIcon className="h-5 w-5" />
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

      {/* Approve confirmation dialog */}
      <Dialog
        open={approveDialogOpen}
        onClose={() => setApproveDialogOpen(false)}
        title="Approve Tuition"
        size="sm"
      >
        <div className="space-y-4">
          <p className="text-sm text-gray-500">
            Are you sure you want to approve this tuition? It will be visible to
            all tutors.
          </p>
          <div className="flex justify-end pt-4">
            <Button
              variant="outline"
              onClick={() => setApproveDialogOpen(false)}
              className="mr-2"
            >
              Cancel
            </Button>
            <Button
              onClick={confirmApprove}
              disabled={approveMutation.isLoading}
            >
              {approveMutation.isLoading ? "Approving..." : "Approve"}
            </Button>
          </div>
        </div>
      </Dialog>

      {/* Reject confirmation dialog */}
      <Dialog
        open={rejectDialogOpen}
        onClose={() => setRejectDialogOpen(false)}
        title="Reject Tuition"
        size="sm"
      >
        <div className="space-y-4">
          <p className="text-sm text-gray-500">
            Are you sure you want to reject this tuition? This action cannot be
            undone.
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

export default TuitionManagement;

