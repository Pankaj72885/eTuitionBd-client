import React from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import {
  BookOpenIcon,
  CurrencyDollarIcon,
  ClipboardDocumentListIcon,
  StarIcon,
} from "@heroicons/react/24/outline";
import { applicationsAPI } from "@/api/applications.api";
import { paymentsAPI } from "@/api/payments.api";
import DashboardCard from "@/components/dashboard/DashboardCard";
import {Card, CardContent} from "@/components/ui/Card";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import ProtectedImage from "@/components/common/ProtectedImage";
import { useAuth } from "@/hooks/useAuth";

const TutorDashboardHome = () => {
  const { user } = useAuth();

  // Fetch tutor's applications
  const { data: applications, isLoading: applicationsLoading } = useQuery({
    queryKey: ["tutorApplications"],
    queryFn: applicationsAPI.getTutorApplications,
  });

  // Fetch tutor's payments
  const { data: payments, isLoading: paymentsLoading } = useQuery({
    queryKey: ["tutorPayments"],
    queryFn: paymentsAPI.getTutorPayments,
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

  const totalEarnings =
    payments?.data?.reduce((sum, payment) => sum + payment.amount, 0) || 0;
  const currentMonthEarnings =
    payments?.data
      ?.filter((payment) => {
        const paymentDate = new Date(payment.createdAt);
        const currentDate = new Date();
        return (
          paymentDate.getMonth() === currentDate.getMonth() &&
          paymentDate.getFullYear() === currentDate.getFullYear()
        );
      })
      .reduce((sum, payment) => sum + payment.amount, 0) || 0;

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Welcome back, {user?.name}!
        </h1>
        <p className="text-gray-600 mt-1">
          Here's what's happening with your tutoring today.
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
            title="Total Applications"
            value={applications?.data?.length || 0}
            icon={<ClipboardDocumentListIcon />}
          />
        </motion.div>

        <motion.div variants={itemVariants}>
          <DashboardCard
            title="Ongoing Tuitions"
            value={
              applications?.data?.filter((app) => app.status === "Approved")
                .length || 0
            }
            icon={<BookOpenIcon />}
          />
        </motion.div>

        <motion.div variants={itemVariants}>
          <DashboardCard
            title="Total Earnings"
            value={`৳ ${totalEarnings}`}
            icon={<CurrencyDollarIcon />}
          />
        </motion.div>

        <motion.div variants={itemVariants}>
          <DashboardCard
            title="This Month"
            value={`৳ ${currentMonthEarnings}`}
            icon={<CurrencyDollarIcon />}
            change={
              currentMonthEarnings > 0
                ? "+৳ " + currentMonthEarnings
                : undefined
            }
            changeType={currentMonthEarnings > 0 ? "increase" : undefined}
          />
        </motion.div>
      </motion.div>

      {/* Recent Applications and Earnings */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Recent Applications */}
        <Card>
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
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
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {application.tuitionId?.subject}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-300">
                        {application.tuitionId?.classLevel} •{" "}
                        {application.tuitionId?.location}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        ৳ {application.expectedSalary}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-300">
                        {application.status}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-4">
                No applications yet.
              </p>
            )}
          </CardContent>
        </Card>

        {/* Recent Earnings */}
        <Card>
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Recent Earnings
            </h2>
            {paymentsLoading ? (
              <div className="flex justify-center py-4">
                <LoadingSpinner />
              </div>
            ) : payments?.data?.length > 0 ? (
              <div className="space-y-3">
                {payments.data.slice(0, 5).map((payment) => (
                  <div
                    key={payment._id}
                    className="flex items-center justify-between"
                  >
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {payment.tuitionId?.subject}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-300">
                        {payment.studentId?.name}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        ৳ {payment.amount}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-300">
                        {new Date(payment.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-4">No earnings yet.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TutorDashboardHome;
