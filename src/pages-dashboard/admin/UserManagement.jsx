import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  PencilIcon,
  TrashIcon,
  EyeIcon,
  CheckCircleIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";
import { usersAPI } from "@/api/users.api";
import {Button} from "@/components/ui/Button";
import {Card, CardContent} from "@/components/ui/Card";
import {Input} from "@/components/ui/Input";
import {Select} from "@/components/ui/Select";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import {Dialog} from "@/components/ui/Dialog";
import ProtectedImage from "@/components/common/ProtectedImage";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";

const UserManagement = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [roleChangeDialogOpen, setRoleChangeDialogOpen] = useState(false);
  const [userToEdit, setUserToEdit] = useState(null);
  const [userToDelete, setUserToDelete] = useState(null);
  const [userToChangeRole, setUserToChangeRole] = useState(null);
  const [filters, setFilters] = useState({
    role: "",
    search: "",
  });

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

  // Update user mutation
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

  // Change user role mutation
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

  // Delete user mutation
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
      updateUserMutation.mutate({
        id: userToEdit._id,
        data,
      });
    }
  };

  const handleChangeRoleSubmit = (data) => {
    if (userToChangeRole) {
      changeRoleMutation.mutate({
        id: userToChangeRole._id,
        role: data.role,
      });
    }
  };

  const confirmDelete = () => {
    if (userToDelete) {
      deleteUserMutation.mutate(userToDelete._id);
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
      role: "",
      search: "",
    });
  };

  const handleView = (id) => {
    navigate(`/dashboard/admin/users/${id}`);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">User Management</h1>

      {/* Filters */}
      <Card className="mb-6">
        <CardContent className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Filter Users
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
                placeholder="Search by name or email..."
                value={filters.search}
                onChange={(e) => handleFilterChange("search", e.target.value)}
              />
            </div>
            <div>
              <label
                htmlFor="role"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Role
              </label>
              <Select
                id="role"
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
      ) : users?.data?.length > 0 ? (
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
                      User
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Role
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Verification Status
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Created At
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
                  {users.data.map((user) => (
                    <tr key={user._id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <ProtectedImage
                            src={user.photoUrl}
                            alt={user.name}
                            className="w-10 h-10 rounded-full mr-3"
                          />
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {user.name}
                            </div>
                            <div className="text-sm text-gray-500">
                              {user.email}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800 capitalize">
                          {user.role}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            user.isVerified
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {user.isVerified ? "Verified" : "Not Verified"}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(user.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end space-x-2">
                          <button
                            type="button"
                            className="text-brand hover:text-brand-dark"
                            onClick={() => handleView(user._id)}
                          >
                            <EyeIcon className="h-5 w-5" />
                          </button>
                          <button
                            type="button"
                            className="text-indigo-600 hover:text-indigo-900"
                            onClick={() => handleEdit(user)}
                          >
                            <PencilIcon className="h-5 w-5" />
                          </button>
                          <button
                            type="button"
                            className="text-amber-600 hover:text-amber-900"
                            onClick={() => handleChangeRole(user)}
                          >
                            <CheckCircleIcon className="h-5 w-5" />
                          </button>
                          <button
                            type="button"
                            className="text-red-600 hover:text-red-900"
                            onClick={() => handleDelete(user)}
                            disabled={deleteUserMutation.isLoading}
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
              No users found
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

      {/* Edit User Dialog */}
      <Dialog
        open={editDialogOpen}
        onClose={() => setEditDialogOpen(false)}
        title="Edit User"
        size="md"
      >
        <form onSubmit={handleSubmit(handleUpdate)} className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Name
            </label>
            <Input
              id="name"
              {...register("name", {
                required: "Name is required",
              })}
              error={errors.name?.message}
            />
          </div>

          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Phone Number
            </label>
            <Input
              id="phone"
              {...register("phone", {
                pattern: {
                  value: /^01[3-9]\d{8}$/,
                  message: "Invalid Bangladeshi phone number",
                },
              })}
              error={errors.phone?.message}
            />
          </div>

          <div>
            <label
              htmlFor="city"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              City
            </label>
            <Input
              id="city"
              {...register("city")}
              error={errors.city?.message}
            />
          </div>

          <div className="flex items-center">
            <input
              id="isVerified"
              type="checkbox"
              className="h-4 w-4 text-brand focus:ring-brand border-gray-300 rounded"
              {...register("isVerified")}
            />
            <label
              htmlFor="isVerified"
              className="ml-2 block text-sm text-gray-900"
            >
              Verified User
            </label>
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
            <Button type="submit" disabled={updateUserMutation.isLoading}>
              {updateUserMutation.isLoading ? "Updating..." : "Update User"}
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
          className="space-y-4"
        >
          <div>
            <label
              htmlFor="role"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Role
            </label>
            <Select
              id="role"
              {...register("role", {
                required: "Role is required",
              })}
              error={errors.role?.message}
            >
              <option value="student">Student</option>
              <option value="tutor">Tutor</option>
              <option value="admin">Admin</option>
            </Select>
          </div>

          <div className="flex justify-end pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setRoleChangeDialogOpen(false)}
              className="mr-2"
            >
              Cancel
            </Button>
            <Button type="submit" disabled={changeRoleMutation.isLoading}>
              {changeRoleMutation.isLoading ? "Changing..." : "Change Role"}
            </Button>
          </div>
        </form>
      </Dialog>

      {/* Delete confirmation dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        title="Delete User"
        size="sm"
      >
        <div className="space-y-4">
          <p className="text-sm text-gray-500">
            Are you sure you want to delete this user? This action cannot be
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
              disabled={deleteUserMutation.isLoading}
            >
              {deleteUserMutation.isLoading ? "Deleting..." : "Delete"}
            </Button>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default UserManagement;
