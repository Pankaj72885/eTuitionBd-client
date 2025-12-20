import { paymentsAPI } from "@/api/payments.api";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import ProtectedImage from "@/components/common/ProtectedImage";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import StatusBadge from "@/components/ui/StatusBadge";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { endOfMonth, format, startOfMonth, subMonths } from "date-fns";
import { useState } from "react";
import toast from "react-hot-toast";
import {
  CartesianGrid,
  Line,
  LineChart,
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
    setDateRange((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const clearFilters = () => {
    setDateRange({
      from: format(startOfMonth(subMonths(new Date(), 5)), "yyyy-MM-dd"),
      to: format(endOfMonth(new Date()), "yyyy-MM-dd"),
    });
  };

  // Prepare data for charts
  const prepareChartData = () => {
    if (!payments?.data?.length) return [];

    // Group payments by month
    const groupedData = {};

    payments.data.forEach((payment) => {
      const date = new Date(payment.createdAt);
      const monthYear = format(date, "MMM yyyy");

      if (!groupedData[monthYear]) {
        groupedData[monthYear] = 0;
      }

      groupedData[monthYear] += payment.amount;
    });

    // Convert to array format for charts
    return Object.entries(groupedData).map(([month, amount]) => ({
      month,
      amount,
    }));
  };

  const chartData = prepareChartData();

  // Calculate totals
  const totalEarnings =
    payments?.data?.reduce((sum, payment) => sum + payment.amount, 0) || 0;
  const platformEarnings = totalEarnings * 0.1; // Assuming 10% platform fee

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">
        Reports & Transactions
      </h1>

      {/* Filters */}
      <Card className="mb-6">
        <CardContent className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Filter Transactions
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="from"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                From Date
              </label>
              <Input
                id="from"
                type="date"
                value={dateRange.from}
                onChange={(e) => handleDateRangeChange("from", e.target.value)}
              />
            </div>
            <div>
              <label
                htmlFor="to"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                To Date
              </label>
              <Input
                id="to"
                type="date"
                value={dateRange.to}
                onChange={(e) => handleDateRangeChange("to", e.target.value)}
              />
            </div>
          </div>
          <div className="mt-4">
            <Button variant="outline" onClick={clearFilters}>
              Clear Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-3 mb-6">
        <Card>
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Total Transactions
            </h2>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">
              {payments?.data?.length || 0}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Total Earnings
            </h2>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">
              ৳ {totalEarnings}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Platform Revenue
            </h2>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">
              ৳ {platformEarnings}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Revenue Chart */}
      {chartData.length > 0 && (
        <Card className="mb-6">
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Revenue Trend
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => [`৳ ${value}`, "Earnings"]} />
                <Line
                  type="monotone"
                  dataKey="amount"
                  stroke="#4F46E5"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      )}

      {/* Transactions Table */}
      {isLoading ? (
        <div className="flex justify-center py-12">
          <LoadingSpinner size="lg" />
        </div>
      ) : payments?.data?.length > 0 ? (
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-800">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Transaction ID
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Student
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Tutor
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Tuition
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Amount
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Date
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Status
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                  {payments.data.map((payment) => (
                    <tr key={payment._id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 dark:text-white">
                          {payment.transactionId ||
                            `TXN-${payment._id.substr(-6).toUpperCase()}`}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <ProtectedImage
                            src={payment.studentId?.photoUrl}
                            alt={payment.studentId?.name}
                            className="w-8 h-8 rounded-full mr-3"
                          />
                          <div className="text-sm text-gray-900 dark:text-white">
                            {payment.studentId?.name}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <ProtectedImage
                            src={payment.tutorId?.photoUrl}
                            alt={payment.tutorId?.name}
                            className="w-8 h-8 rounded-full mr-3"
                          />
                          <div className="text-sm text-gray-900 dark:text-white">
                            {payment.tutorId?.name}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 dark:text-white">
                          {payment.tuitionId?.subject} for{" "}
                          {payment.tuitionId?.classLevel}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 dark:text-white">
                          ৳ {payment.amount}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 dark:text-white">
                          {format(new Date(payment.createdAt), "MMM dd, yyyy")}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <StatusBadge status={payment.status} />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        {payment.status === "PendingApproval" && (
                          <Button
                            size="sm"
                            onClick={() => approveMutation.mutate(payment._id)}
                            disabled={approveMutation.isLoading}
                          >
                            Approve
                          </Button>
                        )}
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
              No transactions found
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
    </div>
  );
};

export default ReportsTransactions;
