import { paymentsAPI } from "@/api/payments.api";
import { tuitionsAPI } from "@/api/tuitions.api";
import { usersAPI } from "@/api/users.api";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import DashboardCard from "@/components/dashboard/DashboardCard";
import { Card, CardContent } from "@/components/ui/Card";
import {
  BookOpenIcon,
  ClockIcon,
  CurrencyDollarIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

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
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
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

  const totalEarnings =
    payments?.data?.reduce((sum, payment) => sum + payment.amount, 0) || 0;
  const platformEarnings = totalEarnings * 0.1; // Assuming 10% platform fee

  // Prepare data for charts
  const userRoleData = [
    { name: "Students", value: totalStudents, color: "#4F46E5" },
    { name: "Tutors", value: totalTutors, color: "#10B981" },
    { name: "Admins", value: totalAdmins, color: "#F59E0B" },
  ];

  const tuitionStatusData = [
    { name: "Pending", value: pendingTuitions, color: "#F59E0B" },
    { name: "Approved", value: approvedTuitions, color: "#10B981" },
    { name: "Ongoing", value: ongoingTuitions, color: "#4F46E5" },
    {
      name: "Completed",
      value:
        tuitions?.data?.filter((tuition) => tuition.status === "Completed")
          .length || 0,
      color: "#6B7280",
    },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Admin Dashboard
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mt-1">
          Welcome to the admin dashboard. Here's an overview of the platform.
        </p>
      </div>

      {/* Stats Cards */}
      <motion.div
        className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants}>
          <DashboardCard
            title="Total Users"
            value={totalUsers}
            icon={<UserGroupIcon />}
          />
        </motion.div>

        <motion.div variants={itemVariants}>
          <DashboardCard
            title="Total Tuitions"
            value={totalTuitions}
            icon={<BookOpenIcon />}
          />
        </motion.div>

        <motion.div variants={itemVariants}>
          <DashboardCard
            title="Platform Earnings"
            value={`৳ ${platformEarnings}`}
            icon={<CurrencyDollarIcon />}
          />
        </motion.div>

        <motion.div variants={itemVariants}>
          <DashboardCard
            title="Pending Tuitions"
            value={pendingTuitions}
            icon={<ClockIcon />}
          />
        </motion.div>
      </motion.div>

      {/* Charts */}
      <div className="grid gap-6 md:grid-cols-2 mb-8">
        <Card>
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              User Distribution
            </h2>
            {usersLoading ? (
              <div className="flex justify-center py-4">
                <LoadingSpinner />
              </div>
            ) : (
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={userRoleData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name}: ${value}`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {userRoleData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Tuition Status
            </h2>
            {tuitionsLoading ? (
              <div className="flex justify-center py-4">
                <LoadingSpinner />
              </div>
            ) : (
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={tuitionStatusData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name}: ${value}`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {tuitionStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Recent Activities */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Recent Users
            </h2>
            {usersLoading ? (
              <div className="flex justify-center py-4">
                <LoadingSpinner />
              </div>
            ) : users?.data?.length > 0 ? (
              <div className="space-y-3">
                {users.data.slice(0, 5).map((user) => (
                  <div
                    key={user._id}
                    className="flex items-center justify-between"
                  >
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {user.name}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400 capitalize">
                        {user.role} • {user.city}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {new Date(user.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 dark:text-gray-400 text-center py-4">
                No users yet.
              </p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Recent Tuitions
            </h2>
            {tuitionsLoading ? (
              <div className="flex justify-center py-4">
                <LoadingSpinner />
              </div>
            ) : tuitions?.data?.length > 0 ? (
              <div className="space-y-3">
                {tuitions.data.slice(0, 5).map((tuition) => (
                  <div
                    key={tuition._id}
                    className="flex items-center justify-between"
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
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        ৳ {tuition.budget}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {tuition.status}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 dark:text-gray-400 text-center py-4">
                No tuitions yet.
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboardHome;
