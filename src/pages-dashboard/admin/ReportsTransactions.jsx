import { paymentsAPI } from "@/api/payments.api";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import ProtectedImage from "@/components/common/ProtectedImage";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import StatusBadge from "@/components/ui/StatusBadge";
import {
  BanknotesIcon,
  CalendarIcon,
  CheckCircleIcon,
  CurrencyDollarIcon,
  DocumentTextIcon,
  FunnelIcon,
  ReceiptPercentIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { endOfMonth, format, startOfMonth, subMonths } from "date-fns";
import { motion } from "framer-motion";
import { useState } from "react";
import toast from "react-hot-toast";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const ReportsTransactions = () => {
  const [dateRange, setDateRange] = useState({
    from: format(startOfMonth(subMonths(new Date(), 5)), "yyyy-MM-dd"),
    to: format(endOfMonth(new Date()), "yyyy-MM-dd"),
  });

  const queryClient = useQueryClient();

  const approveMutation = useMutation({
    mutationFn: (id) => paymentsAPI.approvePayment(id),
    onSuccess: () => {
      toast.success("Payment approved successfully");
      queryClient.invalidateQueries(["allPayments"]);
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to approve payment");
    },
  });

  // Fetch all payments
  const { data: payments, isLoading } = useQuery({
    queryKey: ["allPayments", dateRange.from, dateRange.to],
    queryFn: () => paymentsAPI.getAdminPayments(dateRange),
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
    payments?.data?.reduce((sum, p) => sum + p.amount, 0) || 0;
  const platformEarnings = totalEarnings * 0.1;
  const totalTransactions = payments?.data?.length || 0;

  const summaryCards = [
    {
      title: "Total Transactions",
      value: totalTransactions.toLocaleString(),
      icon: ReceiptPercentIcon,
      gradient: "from-indigo-500 to-purple-500",
      bgColor: "bg-indigo-100 dark:bg-indigo-900/30",
      iconColor: "text-indigo-600 dark:text-indigo-400",
    },
    {
      title: "Total Earnings",
      value: `৳ ${totalEarnings.toLocaleString()}`,
      icon: CurrencyDollarIcon,
      gradient: "from-emerald-500 to-teal-500",
      bgColor: "bg-emerald-100 dark:bg-emerald-900/30",
      iconColor: "text-emerald-600 dark:text-emerald-400",
    },
    {
      title: "Platform Revenue",
      value: `৳ ${platformEarnings.toLocaleString()}`,
      icon: BanknotesIcon,
      gradient: "from-amber-500 to-orange-500",
      bgColor: "bg-amber-100 dark:bg-amber-900/30",
      iconColor: "text-amber-600 dark:text-amber-400",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-2xl bg-linear-to-r from-indigo-500 to-purple-500 flex items-center justify-center">
          <DocumentTextIcon className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Reports & Transactions
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            Financial overview and transaction history
          </p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 sm:grid-cols-3">
        {summaryCards.map((card, index) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="card-hover overflow-hidden">
              <div className={`h-1 bg-linear-to-r ${card.gradient}`} />
              <CardContent className="p-5">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                      {card.title}
                    </p>
                    <p className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                      {card.value}
                    </p>
                  </div>
                  <div
                    className={`w-12 h-12 rounded-2xl ${card.bgColor} flex items-center justify-center`}
                  >
                    <card.icon className={`w-6 h-6 ${card.iconColor}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
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
          transition={{ delay: 0.4 }}
        >
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                  <CurrencyDollarIcon className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                </div>
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Revenue Trend
                </h2>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient
                      id="colorRevenue"
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
                  <XAxis dataKey="month" stroke="#9ca3af" fontSize={12} />
                  <YAxis stroke="#9ca3af" fontSize={12} />
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
                    fill="url(#colorRevenue)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Transactions Table */}
      {isLoading ? (
        <div className="flex justify-center py-16">
          <LoadingSpinner size="lg" />
        </div>
      ) : payments?.data?.length > 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
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
                        Tutor
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                        Amount
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-100 dark:divide-gray-800">
                    {payments.data.map((payment, index) => (
                      <motion.tr
                        key={payment._id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.03 }}
                        className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center shrink-0">
                              <ReceiptPercentIcon className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                            </div>
                            <div>
                              <p className="font-medium text-gray-900 dark:text-white">
                                {payment.tuitionId?.subject}
                              </p>
                              <p className="text-xs text-gray-500 dark:text-gray-400 font-mono">
                                {payment.transactionId ||
                                  `TXN-${payment._id.substr(-6).toUpperCase()}`}
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
                          <div>
                            <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                              ৳ {payment.amount.toLocaleString()}
                            </span>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              {format(
                                new Date(payment.createdAt),
                                "MMM dd, yyyy"
                              )}
                            </p>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <StatusBadge status={payment.status} />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right">
                          {payment.status === "PendingApproval" && (
                            <Button
                              size="sm"
                              onClick={() =>
                                approveMutation.mutate(payment._id)
                              }
                              disabled={approveMutation.isPending}
                              className="gap-2"
                            >
                              <CheckCircleIcon className="w-4 h-4" />
                              Approve
                            </Button>
                          )}
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
              <ReceiptPercentIcon className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              No transactions found
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mb-6">
              Try adjusting your date range or check back later.
            </p>
            <Button variant="outline" onClick={clearFilters}>
              Reset Filters
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ReportsTransactions;
