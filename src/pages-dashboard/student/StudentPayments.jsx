import { paymentsAPI } from "@/api/payments.api";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import ProtectedImage from "@/components/common/ProtectedImage";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import {
  BanknotesIcon,
  CalendarIcon,
  CurrencyDollarIcon,
  FunnelIcon,
  ReceiptPercentIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router";

const StudentPayments = () => {
  const navigate = useNavigate();
  const [dateRange, setDateRange] = useState({ from: "", to: "" });

  // Fetch student's payments
  const { data: payments, isLoading } = useQuery({
    queryKey: ["studentPayments", dateRange],
    queryFn: () => paymentsAPI.getStudentPayments(dateRange),
  });

  const handleDateRangeChange = (field, value) => {
    setDateRange((prev) => ({ ...prev, [field]: value }));
  };

  const clearFilters = () => {
    setDateRange({ from: "", to: "" });
  };

  const totalSpent =
    payments?.data?.reduce((sum, payment) => sum + payment.amount, 0) || 0;
  const totalTransactions = payments?.data?.length || 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Payment History
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">
          Track all your tuition payments
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 sm:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="card-hover">
            <CardContent className="p-5">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                    Total Spent
                  </p>
                  <p className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                    ৳ {totalSpent.toLocaleString()}
                  </p>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
                  <CurrencyDollarIcon className="w-6 h-6 text-amber-600 dark:text-amber-400" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="card-hover">
            <CardContent className="p-5">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                    Total Transactions
                  </p>
                  <p className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                    {totalTransactions}
                  </p>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center">
                  <ReceiptPercentIcon className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center">
                <FunnelIcon className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              </div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Filter by Date
              </h2>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  <div className="flex items-center gap-2">
                    <CalendarIcon className="w-4 h-4 text-gray-400" />
                    From Date
                  </div>
                </label>
                <Input
                  type="date"
                  value={dateRange.from}
                  onChange={(e) =>
                    handleDateRangeChange("from", e.target.value)
                  }
                  className="rounded-xl"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  <div className="flex items-center gap-2">
                    <CalendarIcon className="w-4 h-4 text-gray-400" />
                    To Date
                  </div>
                </label>
                <Input
                  type="date"
                  value={dateRange.to}
                  onChange={(e) => handleDateRangeChange("to", e.target.value)}
                  className="rounded-xl"
                />
              </div>
            </div>
            {(dateRange.from || dateRange.to) && (
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

      {/* Payments Table */}
      {isLoading ? (
        <div className="flex justify-center py-16">
          <LoadingSpinner size="lg" />
        </div>
      ) : payments?.data?.length > 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="overflow-hidden">
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-800">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                        Transaction
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                        Tutor
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                        Amount
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                        Method
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-100 dark:divide-gray-800">
                    {payments.data.map((payment, index) => (
                      <motion.tr
                        key={payment._id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center shrink-0">
                              <BanknotesIcon className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                            </div>
                            <div>
                              <p className="font-medium text-gray-900 dark:text-white">
                                {payment.tuitionId?.subject}
                              </p>
                              <p className="text-xs text-gray-500 dark:text-gray-400 font-mono">
                                {payment.transactionId ||
                                  `TXN${Math.random()
                                    .toString(36)
                                    .substr(2, 9)
                                    .toUpperCase()}`}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-3">
                            <ProtectedImage
                              src={payment.tutorId?.photoUrl}
                              alt={payment.tutorId?.name}
                              className="w-8 h-8 rounded-lg object-cover"
                            />
                            <span className="text-gray-900 dark:text-white">
                              {payment.tutorId?.name}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                            ৳ {payment.amount.toLocaleString()}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-600 dark:text-gray-300">
                          {format(new Date(payment.createdAt), "MMM dd, yyyy")}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2.5 py-1 rounded-lg text-xs font-medium bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400">
                            {payment.paymentMethod || "Card"}
                          </span>
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
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card>
            <CardContent className="py-16 text-center">
              <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                <CurrencyDollarIcon className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                No payments yet
              </h3>
              <p className="text-gray-500 dark:text-gray-400 mb-6">
                Your payment history will appear here once you make your first
                payment.
              </p>
              <Button
                onClick={() => navigate("/dashboard/student/my-tuitions")}
              >
                View My Tuitions
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  );
};

export default StudentPayments;
