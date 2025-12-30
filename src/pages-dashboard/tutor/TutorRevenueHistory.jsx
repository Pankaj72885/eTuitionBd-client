import { paymentsAPI } from "@/api/payments.api";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import ProtectedImage from "@/components/common/ProtectedImage";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import {
  ArrowTrendingUpIcon,
  BanknotesIcon,
  CalendarIcon,
  ChartBarIcon,
  CurrencyDollarIcon,
  FunnelIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useQuery } from "@tanstack/react-query";
import { endOfMonth, format, startOfMonth, subMonths } from "date-fns";
import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const TutorRevenueHistory = () => {
  const navigate = useNavigate();
  const [dateRange, setDateRange] = useState({
    from: format(startOfMonth(subMonths(new Date(), 5)), "yyyy-MM-dd"),
    to: format(endOfMonth(new Date()), "yyyy-MM-dd"),
  });

  // Fetch tutor's payments
  const { data: payments, isLoading } = useQuery({
    queryKey: ["tutorPayments", dateRange.from, dateRange.to],
    queryFn: () => paymentsAPI.getTutorPayments(dateRange),
  });

  const handleDateRangeChange = (field, value) => {
    setDateRange((prev) => ({ ...prev, [field]: value }));
  };

  const clearFilters = () => {
    setDateRange({
      from: format(startOfMonth(subMonths(new Date(), 5)), "yyyy-MM-dd"),
      to: format(endOfMonth(new Date()), "yyyy-MM-dd"),
    });
  };

  // Prepare chart data
  const prepareChartData = () => {
    if (!payments?.data?.length) return [];
    const groupedData = {};
    payments.data.forEach((payment) => {
      const date = new Date(payment.createdAt);
      const monthYear = format(date, "MMM yyyy");
      if (!groupedData[monthYear]) groupedData[monthYear] = 0;
      groupedData[monthYear] += payment.amount;
    });
    return Object.entries(groupedData).map(([month, amount]) => ({
      month,
      amount,
    }));
  };

  const chartData = prepareChartData();
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
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
          <CurrencyDollarIcon className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Revenue History
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            Track your earnings over time
          </p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 sm:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="card-hover overflow-hidden">
            <div className="h-1 bg-linear-to-r from-emerald-500 to-teal-500" />
            <CardContent className="p-5">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                    Total Earnings
                  </p>
                  <p className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                    ৳ {totalEarnings.toLocaleString()}
                  </p>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                  <BanknotesIcon className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
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
          <Card className="card-hover overflow-hidden">
            <div className="h-1 bg-linear-to-r from-indigo-500 to-purple-500" />
            <CardContent className="p-5">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                    This Month
                  </p>
                  <p className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                    ৳ {currentMonthEarnings.toLocaleString()}
                  </p>
                  {currentMonthEarnings > 0 && (
                    <p className="text-sm text-emerald-600 dark:text-emerald-400 flex items-center gap-1 mt-1">
                      <ArrowTrendingUpIcon className="w-4 h-4" />
                      +৳ {currentMonthEarnings.toLocaleString()}
                    </p>
                  )}
                </div>
                <div className="w-12 h-12 rounded-2xl bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center">
                  <ChartBarIcon className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
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
            <div className="mt-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={clearFilters}
                className="gap-2 text-gray-500"
              >
                <XMarkIcon className="w-4 h-4" />
                Reset to Default
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Revenue Chart */}
      {chartData.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                  <ChartBarIcon className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                </div>
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Revenue Trend
                </h2>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient
                      id="colorAmount"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="month" stroke="#9ca3af" />
                  <YAxis stroke="#9ca3af" />
                  <Tooltip
                    formatter={(value) => [
                      `৳ ${value.toLocaleString()}`,
                      "Earnings",
                    ]}
                    contentStyle={{
                      backgroundColor: "rgba(17, 24, 39, 0.9)",
                      border: "none",
                      borderRadius: "12px",
                      color: "white",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="amount"
                    stroke="#10b981"
                    strokeWidth={2}
                    fill="url(#colorAmount)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Earnings Table */}
      {isLoading ? (
        <div className="flex justify-center py-16">
          <LoadingSpinner size="lg" />
        </div>
      ) : payments?.data?.length > 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
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
                        Student
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                        Amount
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                        Status
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
                              src={payment.studentId?.photoUrl}
                              alt={payment.studentId?.name}
                              className="w-8 h-8 rounded-lg object-cover"
                            />
                            <span className="text-gray-900 dark:text-white">
                              {payment.studentId?.name}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                            +৳ {payment.amount.toLocaleString()}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-600 dark:text-gray-300">
                          {format(new Date(payment.createdAt), "MMM dd, yyyy")}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2.5 py-1 rounded-lg text-xs font-medium bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400">
                            Paid
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
                No earnings yet
              </h3>
              <p className="text-gray-500 dark:text-gray-400 mb-6">
                Start tutoring to earn money and track your revenue here.
              </p>
              <Button onClick={() => navigate("/tuitions")}>
                Browse Tuitions
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  );
};

export default TutorRevenueHistory;
