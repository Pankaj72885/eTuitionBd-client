import { applicationsAPI } from "@/api/applications.api";
import { paymentsAPI } from "@/api/payments.api";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import ProtectedImage from "@/components/common/ProtectedImage";
import DashboardCard from "@/components/dashboard/DashboardCard";
import { Card, CardContent } from "@/components/ui/Card";
import { useAuth } from "@/hooks/useAuth";
import {
  BookOpenIcon,
  ClockIcon,
  CurrencyDollarIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";

const StudentDashboardHome = () => {
  const { user } = useAuth();

  // Fetch student's tuitions
  const { data: tuitions, isLoading: tuitionsLoading } = useQuery({
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

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Welcome back, {user?.name}!
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mt-1">
          Here's what's happening with your tuitions today.
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
            title="Total Tuitions"
            value={tuitions?.pagination?.totalCount || 0}
            icon={<BookOpenIcon />}
          />
        </motion.div>

        <motion.div variants={itemVariants}>
          <DashboardCard
            title="Ongoing Tuitions"
            value={
              applications?.data?.filter((app) => app.status === "Approved")
                .length || 0
            }
            icon={<ClockIcon />}
          />
        </motion.div>

        <motion.div variants={itemVariants}>
          <DashboardCard
            title="Total Spent"
            value={`৳ ${
              payments?.data?.reduce(
                (sum, payment) => sum + payment.amount,
                0
              ) || 0
            }`}
            icon={<CurrencyDollarIcon />}
          />
        </motion.div>

        <motion.div variants={itemVariants}>
          <DashboardCard
            title="Applications"
            value={applications?.data?.length || 0}
            icon={<UserGroupIcon />}
          />
        </motion.div>
      </motion.div>

      {/* Recent Tuitions and Payments */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Recent Tuitions */}
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
                No tuitions posted yet.
              </p>
            )}
          </CardContent>
        </Card>

        {/* Recent Applications */}
        <Card>
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Recent Applications
            </h2>
            {applicationsLoading ? (
              <div className="flex justify-center py-4">
                <LoadingSpinner />
              </div>
            ) : applications?.data?.length > 0 ? (
              <div className="space-y-3">
                {applications.data.slice(0, 5).map((application) => (
                  <div
                    key={application._id}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center">
                      <ProtectedImage
                        src={application.tutorId?.photoUrl}
                        alt={application.tutorId?.name}
                        className="w-8 h-8 rounded-full mr-3"
                      />
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {application.tutorId?.name}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {application.expectedSalary} ৳/month
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {application.status}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 dark:text-gray-400 text-center py-4">
                No applications yet.
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StudentDashboardHome;
