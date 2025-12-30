import { usersAPI } from "@/api/users.api";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import ProtectedImage from "@/components/common/ProtectedImage";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { Dialog } from "@/components/ui/DialogWrapper";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import {
  ExclamationTriangleIcon,
  EyeIcon,
  FunnelIcon,
  MagnifyingGlassIcon,
  PencilIcon,
  ShieldCheckIcon,
  TrashIcon,
  UserGroupIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const UserManagement = () => {
  const queryClient = useQueryClient();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [roleChangeDialogOpen, setRoleChangeDialogOpen] = useState(false);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [userToEdit, setUserToEdit] = useState(null);
  const [userToDelete, setUserToDelete] = useState(null);
  const [userToChangeRole, setUserToChangeRole] = useState(null);
  const [userToView, setUserToView] = useState(null);
  const [filters, setFilters] = useState({ role: "", search: "" });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm();

  // Fetch users
  const { data: users, isLoading } = useQuery({
    queryKey: ["allUsers", filters],
    queryFn: () => usersAPI.getAllUsers(filters),
  });

  // Mutations
  const updateUserMutation = useMutation({
    mutationFn: ({ id, data }) => usersAPI.updateUserProfile(id, data),
    onSuccess: () => {
      toast.success("User updated successfully");
      queryClient.invalidateQueries(["allUsers"]);
      setEditDialogOpen(false);
      setUserToEdit(null);
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to update user");
    },
  });

  const changeRoleMutation = useMutation({
    mutationFn: ({ id, role }) => usersAPI.changeUserRole(id, role),
    onSuccess: () => {
      toast.success("User role changed successfully");
      queryClient.invalidateQueries(["allUsers"]);
      setRoleChangeDialogOpen(false);
      setUserToChangeRole(null);
    },
    onError: (error) => {
      toast.error(
        error.response?.data?.message || "Failed to change user role"
      );
    },
  });

  const deleteUserMutation = useMutation({
    mutationFn: usersAPI.deleteUser,
    onSuccess: () => {
      toast.success("User deleted successfully");
      queryClient.invalidateQueries(["allUsers"]);
      setDeleteDialogOpen(false);
      setUserToDelete(null);
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to delete user");
    },
  });

  const handleEdit = (user) => {
    setUserToEdit(user);
    reset({
      name: user.name,
      phone: user.phone,
      city: user.city,
      isVerified: user.isVerified,
    });
    setEditDialogOpen(true);
  };

  const handleDelete = (user) => {
    setUserToDelete(user);
    setDeleteDialogOpen(true);
  };

  const handleChangeRole = (user) => {
    setUserToChangeRole(user);
    setValue("role", user.role);
    setRoleChangeDialogOpen(true);
  };

  const handleUpdate = (data) => {
    if (userToEdit) {
      updateUserMutation.mutate({ id: userToEdit._id, data });
    }
  };

  const handleChangeRoleSubmit = (data) => {
    if (userToChangeRole) {
      changeRoleMutation.mutate({ id: userToChangeRole._id, role: data.role });
    }
  };

  const confirmDelete = () => {
    if (userToDelete) {
      deleteUserMutation.mutate(userToDelete._id);
    }
  };

  const handleFilterChange = (field, value) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  const clearFilters = () => {
    setFilters({ role: "", search: "" });
  };

  const handleView = (user) => {
    setUserToView(user);
    setViewDialogOpen(true);
  };

  const getRoleBadgeColor = (role) => {
    switch (role) {
      case "admin":
        return "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400";
      case "tutor":
        return "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400";
      default:
        return "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          User Management
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">
          Manage all registered users on the platform
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
                Filter Users
              </h2>
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
                    placeholder="Search by name or email..."
                    value={filters.search}
                    onChange={(e) =>
                      handleFilterChange("search", e.target.value)
                    }
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Role
                </label>
                <Select
                  className="rounded-xl"
                  value={filters.role}
                  onChange={(e) => handleFilterChange("role", e.target.value)}
                >
                  <option value="">All Roles</option>
                  <option value="student">Student</option>
                  <option value="tutor">Tutor</option>
                  <option value="admin">Admin</option>
                </Select>
              </div>
            </div>
            {(filters.search || filters.role) && (
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

      {/* Users Table */}
      {isLoading ? (
        <div className="flex justify-center py-16">
          <LoadingSpinner size="lg" />
        </div>
      ) : users?.data?.length > 0 ? (
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
                        User
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                        Role
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                        Joined
                      </th>
                      <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-100 dark:divide-gray-800">
                    {users.data.map((user, index) => (
                      <motion.tr
                        key={user._id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.03 }}
                        className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-3">
                            <ProtectedImage
                              src={user.photoUrl}
                              alt={user.name}
                              className="w-10 h-10 rounded-xl object-cover"
                            />
                            <div>
                              <p className="font-medium text-gray-900 dark:text-white">
                                {user.name}
                              </p>
                              <p className="text-sm text-gray-500 dark:text-gray-400">
                                {user.email}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-2.5 py-1 rounded-lg text-xs font-medium capitalize ${getRoleBadgeColor(
                              user.role
                            )}`}
                          >
                            {user.role}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-2.5 py-1 rounded-lg text-xs font-medium ${
                              user.isVerified
                                ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                                : "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400"
                            }`}
                          >
                            {user.isVerified ? "Verified" : "Unverified"}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                          {new Date(user.createdAt).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right">
                          <div className="flex justify-end gap-1">
                            <button
                              className="p-2 rounded-lg text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 transition-colors"
                              onClick={() => handleView(user)}
                              title="View"
                            >
                              <EyeIcon className="h-5 w-5" />
                            </button>
                            <button
                              className="p-2 rounded-lg text-gray-500 hover:text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-900/30 transition-colors"
                              onClick={() => handleEdit(user)}
                              title="Edit"
                            >
                              <PencilIcon className="h-5 w-5" />
                            </button>
                            <button
                              className="p-2 rounded-lg text-gray-500 hover:text-purple-600 hover:bg-purple-50 dark:hover:bg-purple-900/30 transition-colors"
                              onClick={() => handleChangeRole(user)}
                              title="Change Role"
                            >
                              <ShieldCheckIcon className="h-5 w-5" />
                            </button>
                            <button
                              className="p-2 rounded-lg text-gray-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 transition-colors"
                              onClick={() => handleDelete(user)}
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
              <UserGroupIcon className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              No users found
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

      {/* Edit User Dialog */}
      <Dialog
        open={editDialogOpen}
        onClose={() => setEditDialogOpen(false)}
        title="Edit User"
        size="md"
      >
        <form onSubmit={handleSubmit(handleUpdate)} className="space-y-5 py-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Name
            </label>
            <Input
              className="rounded-xl"
              {...register("name", { required: "Name is required" })}
              error={errors.name?.message}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Phone Number
            </label>
            <Input
              className="rounded-xl"
              {...register("phone", {
                pattern: {
                  value: /^01[3-9]\d{8}$/,
                  message: "Invalid phone number",
                },
              })}
              error={errors.phone?.message}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              City
            </label>
            <Input className="rounded-xl" {...register("city")} />
          </div>
          <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 dark:bg-gray-800">
            <input
              id="isVerified"
              type="checkbox"
              className="w-5 h-5 text-indigo-600 rounded"
              {...register("isVerified")}
            />
            <label
              htmlFor="isVerified"
              className="text-sm text-gray-700 dark:text-gray-300"
            >
              Mark as Verified User
            </label>
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setEditDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={updateUserMutation.isPending}>
              {updateUserMutation.isPending ? "Updating..." : "Update User"}
            </Button>
          </div>
        </form>
      </Dialog>

      {/* Change Role Dialog */}
      <Dialog
        open={roleChangeDialogOpen}
        onClose={() => setRoleChangeDialogOpen(false)}
        title="Change User Role"
        size="sm"
      >
        <form
          onSubmit={handleSubmit(handleChangeRoleSubmit)}
          className="space-y-5 py-4"
        >
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Select New Role
            </label>
            <Select
              className="rounded-xl"
              {...register("role", { required: "Role is required" })}
            >
              <option value="student">Student</option>
              <option value="tutor">Tutor</option>
              <option value="admin">Admin</option>
            </Select>
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setRoleChangeDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={changeRoleMutation.isPending}>
              {changeRoleMutation.isPending ? "Changing..." : "Change Role"}
            </Button>
          </div>
        </form>
      </Dialog>

      {/* Delete Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        title="Delete User"
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
            Are you sure you want to delete this user? All their data will be
            permanently removed.
          </p>
        </div>
        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
            Cancel
          </Button>
          <Button
            variant="danger"
            onClick={confirmDelete}
            disabled={deleteUserMutation.isPending}
          >
            {deleteUserMutation.isPending ? "Deleting..." : "Delete User"}
          </Button>
        </div>
      </Dialog>

      {/* View User Dialog */}
      <Dialog
        open={viewDialogOpen}
        onClose={() => setViewDialogOpen(false)}
        title="User Details"
        size="md"
      >
        {userToView && (
          <div className="space-y-6 py-4">
            <div className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 dark:bg-gray-800">
              <ProtectedImage
                src={userToView.photoUrl}
                alt={userToView.name}
                className="w-16 h-16 rounded-xl"
              />
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {userToView.name}
                </h3>
                <p className="text-gray-500 dark:text-gray-400">
                  {userToView.email}
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 uppercase mb-1">
                  Phone
                </label>
                <p className="text-gray-900 dark:text-white">
                  {userToView.phone || "Not provided"}
                </p>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 uppercase mb-1">
                  City
                </label>
                <p className="text-gray-900 dark:text-white">
                  {userToView.city || "Not provided"}
                </p>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 uppercase mb-1">
                  Role
                </label>
                <span
                  className={`px-2.5 py-1 rounded-lg text-xs font-medium capitalize ${getRoleBadgeColor(
                    userToView.role
                  )}`}
                >
                  {userToView.role}
                </span>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 uppercase mb-1">
                  Status
                </label>
                <span
                  className={`px-2.5 py-1 rounded-lg text-xs font-medium ${
                    userToView.isVerified
                      ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                      : "bg-gray-100 text-gray-600 dark:bg-gray-800"
                  }`}
                >
                  {userToView.isVerified ? "Verified" : "Unverified"}
                </span>
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
                <Button
                  onClick={() => {
                    setViewDialogOpen(false);
                    handleEdit(userToView);
                  }}
                  className="gap-2"
                >
                  <PencilIcon className="w-4 h-4" /> Edit
                </Button>
              </div>
            </div>
          </div>
        )}
      </Dialog>
    </div>
  );
};

export default UserManagement;
