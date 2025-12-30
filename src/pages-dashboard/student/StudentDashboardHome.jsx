import { applicationsAPI } from "@/api/applications.api";
import { paymentsAPI } from "@/api/payments.api";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import ProtectedImage from "@/components/common/ProtectedImage";
import DashboardCard from "@/components/dashboard/DashboardCard";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { useAuth } from "@/hooks/useAuth";
import {
  ArrowRightIcon,
  BookOpenIcon,
  ClockIcon,
  CurrencyDollarIcon,
  PlusIcon,
  SparklesIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Link } from "react-router";

const StudentDashboardHome = () => {
  const { user } = useAuth();

  // Fetch student's tuitions
  const { data: tuitions, isLoading: tuitionsLoading } = useQuery({
    queryKey: ["studentTuitions"],
    queryFn: async () => {
      return { data: [], pagination: { totalCount: 0 } };
    },
  });

  // Fetch student's applications
  const { data: applications, isLoading: applicationsLoading } = useQuery({
    queryKey: ["studentApplications"],
    queryFn: applicationsAPI.getStudentApplications,
  });

  // Fetch student's payments
  const { data: payments } = useQuery({
    queryKey: ["studentPayments"],
    queryFn: paymentsAPI.getStudentPayments,
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

  const totalSpent =
    payments?.data?.reduce((sum, payment) => sum + payment.amount, 0) || 0;
  const ongoingCount =
    applications?.data?.filter((app) => app.status === "Approved").length || 0;

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-2xl bg-linear-to-r from-indigo-600 via-purple-600 to-pink-500 p-6 md:p-8"
      >
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.1%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')] opacity-30" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <SparklesIcon className="w-5 h-5 text-yellow-300" />
              <span className="text-sm text-white/80">Dashboard</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-white">
              Welcome back, {user?.name?.split(" ")[0]}! 👋
            </h1>
            <p className="text-white/80 mt-1">
              Here's what's happening with your tuitions today.
            </p>
          </div>
          <Link to="/dashboard/student/post-tuition">
            <Button className="bg-white text-indigo-600 hover:bg-gray-100 gap-2">
              <PlusIcon className="w-5 h-5" />
              Post New Tuition
            </Button>
          </Link>
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
            title="Total Tuitions"
            value={tuitions?.pagination?.totalCount || 0}
            icon={<BookOpenIcon className="w-full h-full" />}
            color="indigo"
          />
        </motion.div>

        <motion.div variants={itemVariants}>
          <DashboardCard
            title="Ongoing Tuitions"
            value={ongoingCount}
            icon={<ClockIcon className="w-full h-full" />}
            color="emerald"
          />
        </motion.div>

        <motion.div variants={itemVariants}>
          <DashboardCard
            title="Total Spent"
            value={`৳ ${totalSpent.toLocaleString()}`}
            icon={<CurrencyDollarIcon className="w-full h-full" />}
            color="amber"
          />
        </motion.div>

        <motion.div variants={itemVariants}>
          <DashboardCard
            title="Applications Received"
            value={applications?.data?.length || 0}
            icon={<UserGroupIcon className="w-full h-full" />}
            color="purple"
          />
        </motion.div>
      </motion.div>

      {/* Recent Activity Grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Tuitions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="h-full">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center">
                    <BookOpenIcon className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Recent Tuitions
                  </h2>
                </div>
                <Link
                  to="/dashboard/student/my-tuitions"
                  className="text-sm text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
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
                      className="flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
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
                <div className="text-center py-8">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                    <BookOpenIcon className="w-8 h-8 text-gray-400" />
                  </div>
                  <p className="text-gray-500 dark:text-gray-400 mb-4">
                    No tuitions posted yet.
                  </p>
                  <Link to="/dashboard/student/post-tuition">
                    <Button variant="outline" size="sm">
                      Post your first tuition
                    </Button>
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Recent Applications */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="h-full">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                    <UserGroupIcon className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                  </div>
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Recent Applications
                  </h2>
                </div>
                <Link
                  to="/dashboard/student/applications"
                  className="text-sm text-purple-600 dark:text-purple-400 hover:underline flex items-center gap-1"
                >
                  View all <ArrowRightIcon className="w-4 h-4" />
                </Link>
              </div>

              {applicationsLoading ? (
                <div className="flex justify-center py-8">
                  <LoadingSpinner />
                </div>
              ) : applications?.data?.length > 0 ? (
                <div className="space-y-4">
                  {applications.data.slice(0, 5).map((application) => (
                    <div
                      key={application._id}
                      className="flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <ProtectedImage
                          src={application.tutorId?.photoUrl}
                          alt={application.tutorId?.name}
                          className="w-10 h-10 rounded-xl object-cover"
                        />
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">
                            {application.tutorId?.name}
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            ৳ {application.expectedSalary}/month
                          </p>
                        </div>
                      </div>
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full ${
                          application.status === "Approved"
                            ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
                            : application.status === "Pending"
                            ? "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
                            : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                        }`}
                      >
                        {application.status}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                    <UserGroupIcon className="w-8 h-8 text-gray-400" />
                  </div>
                  <p className="text-gray-500 dark:text-gray-400">
                    No applications received yet.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default StudentDashboardHome;
