import { paymentsAPI } from "@/api/payments.api";
import { tuitionsAPI } from "@/api/tuitions.api";
import { usersAPI } from "@/api/users.api";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import DashboardCard from "@/components/dashboard/DashboardCard";
import { Card, CardContent } from "@/components/ui/Card";
import {
  ArrowRightIcon,
  BookOpenIcon,
  ChartBarIcon,
  ClockIcon,
  CurrencyDollarIcon,
  ShieldCheckIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Link } from "react-router";
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const AdminDashboardHome = () => {
  // Fetch admin stats
  const { data: users, isLoading: usersLoading } = useQuery({
    queryKey: ["allUsers"],
    queryFn: () => usersAPI.getAllUsers({ limit: 1000 }),
  });

  const { data: tuitions, isLoading: tuitionsLoading } = useQuery({
    queryKey: ["allTuitions"],
    queryFn: () => tuitionsAPI.getTuitions({ limit: 1000 }),
  });

  const { data: payments, isLoading: paymentsLoading } = useQuery({
    queryKey: ["allPayments"],
    queryFn: () => paymentsAPI.getAdminPayments({ limit: 1000 }),
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  // Calculate stats
  const totalUsers = users?.data?.length || 0;
  const totalStudents =
    users?.data?.filter((user) => user.role === "student").length || 0;
  const totalTutors =
    users?.data?.filter((user) => user.role === "tutor").length || 0;
  const totalAdmins =
    users?.data?.filter((user) => user.role === "admin").length || 0;

  const totalTuitions = tuitions?.data?.length || 0;
  const pendingTuitions =
    tuitions?.data?.filter((tuition) => tuition.status === "Pending").length ||
    0;
  const approvedTuitions =
    tuitions?.data?.filter((tuition) => tuition.status === "Approved").length ||
    0;
  const ongoingTuitions =
    tuitions?.data?.filter((tuition) => tuition.status === "Ongoing").length ||
    0;
  const completedTuitions =
    tuitions?.data?.filter((tuition) => tuition.status === "Completed")
      .length || 0;

  const totalEarnings =
    payments?.data?.reduce((sum, payment) => sum + payment.amount, 0) || 0;
  const platformEarnings = totalEarnings * 0.1;

  // Chart data
  const userRoleData = [
    { name: "Students", value: totalStudents, color: "#6366f1" },
    { name: "Tutors", value: totalTutors, color: "#10b981" },
    { name: "Admins", value: totalAdmins, color: "#f59e0b" },
  ];

  const tuitionStatusData = [
    { name: "Pending", value: pendingTuitions, color: "#f59e0b" },
    { name: "Approved", value: approvedTuitions, color: "#10b981" },
    { name: "Ongoing", value: ongoingTuitions, color: "#6366f1" },
    { name: "Completed", value: completedTuitions, color: "#6b7280" },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-2xl bg-linear-to-r from-gray-800 via-gray-900 to-black p-6 md:p-8"
      >
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.05%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')] opacity-50" />
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-2">
            <ShieldCheckIcon className="w-5 h-5 text-indigo-400" />
            <span className="text-sm text-gray-400">Admin Panel</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-white">
            Admin Dashboard
          </h1>
          <p className="text-gray-400 mt-1">Platform overview and management</p>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <motion.div
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants}>
          <DashboardCard
            title="Total Users"
            value={totalUsers}
            icon={<UserGroupIcon className="w-full h-full" />}
            color="indigo"
          />
        </motion.div>

        <motion.div variants={itemVariants}>
          <DashboardCard
            title="Total Tuitions"
            value={totalTuitions}
            icon={<BookOpenIcon className="w-full h-full" />}
            color="purple"
          />
        </motion.div>

        <motion.div variants={itemVariants}>
          <DashboardCard
            title="Platform Earnings"
            value={`৳ ${platformEarnings.toLocaleString()}`}
            icon={<CurrencyDollarIcon className="w-full h-full" />}
            color="emerald"
          />
        </motion.div>

        <motion.div variants={itemVariants}>
          <DashboardCard
            title="Pending Approval"
            value={pendingTuitions}
            icon={<ClockIcon className="w-full h-full" />}
            color="amber"
          />
        </motion.div>
      </motion.div>

      {/* Charts */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* User Distribution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="h-full">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center">
                  <UserGroupIcon className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                </div>
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                  User Distribution
                </h2>
              </div>

              {usersLoading ? (
                <div className="flex justify-center py-12">
                  <LoadingSpinner />
                </div>
              ) : (
                <ResponsiveContainer width="100%" height={280}>
                  <PieChart>
                    <Pie
                      data={userRoleData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {userRoleData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "rgba(17, 24, 39, 0.9)",
                        border: "none",
                        borderRadius: "12px",
                        color: "white",
                      }}
                    />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Tuition Status */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="h-full">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                  <ChartBarIcon className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                </div>
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Tuition Status
                </h2>
              </div>

              {tuitionsLoading ? (
                <div className="flex justify-center py-12">
                  <LoadingSpinner />
                </div>
              ) : (
                <ResponsiveContainer width="100%" height={280}>
                  <PieChart>
                    <Pie
                      data={tuitionStatusData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {tuitionStatusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "rgba(17, 24, 39, 0.9)",
                        border: "none",
                        borderRadius: "12px",
                        color: "white",
                      }}
                    />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Recent Activities */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Users */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="h-full">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                    <UserGroupIcon className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Recent Users
                  </h2>
                </div>
                <Link
                  to="/admin/users"
                  className="text-sm text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1"
                >
                  View all <ArrowRightIcon className="w-4 h-4" />
                </Link>
              </div>

              {usersLoading ? (
                <div className="flex justify-center py-8">
                  <LoadingSpinner />
                </div>
              ) : users?.data?.length > 0 ? (
                <div className="space-y-4">
                  {users.data.slice(0, 5).map((user) => (
                    <div
                      key={user._id}
                      className="flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50"
                    >
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {user.name}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400 capitalize">
                          {user.role} • {user.city}
                        </p>
                      </div>
                      <span
                        className={`text-xs px-2 py-1 rounded-full capitalize ${
                          user.role === "tutor"
                            ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
                            : user.role === "admin"
                            ? "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
                            : "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400"
                        }`}
                      >
                        {user.role}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 dark:text-gray-400 text-center py-8">
                  No users yet.
                </p>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Recent Tuitions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="h-full">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
                    <BookOpenIcon className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                  </div>
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Recent Tuitions
                  </h2>
                </div>
                <Link
                  to="/admin/tuitions"
                  className="text-sm text-amber-600 dark:text-amber-400 hover:underline flex items-center gap-1"
                >
                  View all <ArrowRightIcon className="w-4 h-4" />
                </Link>
              </div>

              {tuitionsLoading ? (
                <div className="flex justify-center py-8">
                  <LoadingSpinner />
                </div>
              ) : tuitions?.data?.length > 0 ? (
                <div className="space-y-4">
                  {tuitions.data.slice(0, 5).map((tuition) => (
                    <div
                      key={tuition._id}
                      className="flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50"
                    >
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {tuition.subject}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {tuition.classLevel} • {tuition.location}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-900 dark:text-white">
                          ৳ {tuition.budget}
                        </p>
                        <span
                          className={`text-xs px-2 py-0.5 rounded-full ${
                            tuition.status === "Approved"
                              ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
                              : tuition.status === "Pending"
                              ? "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
                              : "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300"
                          }`}
                        >
                          {tuition.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 dark:text-gray-400 text-center py-8">
                  No tuitions yet.
                </p>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminDashboardHome;
