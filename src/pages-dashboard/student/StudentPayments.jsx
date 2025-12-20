import { paymentsAPI } from "@/api/payments.api";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import ProtectedImage from "@/components/common/ProtectedImage";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { useState } from "react";

const StudentPayments = () => {
  const [dateRange, setDateRange] = useState({
    from: "",
    to: "",
  });

  // Fetch student's payments
  const { data: payments, isLoading } = useQuery({
    queryKey: ["studentPayments", dateRange],
    queryFn: () => paymentsAPI.getStudentPayments(dateRange),
  });

  const handleDateRangeChange = (field, value) => {
    setDateRange((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const clearFilters = () => {
    setDateRange({
      from: "",
      to: "",
    });
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Payment History</h1>

      {/* Filters */}
      <Card className="mb-6">
        <CardContent className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Filter Payments
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

      {/* Summary Card */}
      <Card className="mb-6">
        <CardContent className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Payment Summary
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-gray-500">Total Spent</p>
              <p className="text-2xl font-bold text-gray-900">
                ৳{" "}
                {payments?.data?.reduce(
                  (sum, payment) => sum + payment.amount,
                  0
                ) || 0}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Transactions</p>
              <p className="text-2xl font-bold text-gray-900">
                {payments?.data?.length || 0}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Payments Table */}
      {isLoading ? (
        <div className="flex justify-center py-12">
          <LoadingSpinner size="lg" />
        </div>
      ) : payments?.data?.length > 0 ? (
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
                      Transaction ID
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
                      Tutor
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
                      Payment Method
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {payments.data.map((payment) => (
                    <tr key={payment._id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {payment.transactionId ||
                            `TXN${Math.random()
                              .toString(36)
                              .substr(2, 9)
                              .toUpperCase()}`}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {payment.tuitionId?.subject} for{" "}
                          {payment.tuitionId?.classLevel}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <ProtectedImage
                            src={payment.tutorId?.photoUrl}
                            alt={payment.tutorId?.name}
                            className="w-8 h-8 rounded-full mr-3"
                          />
                          <div className="text-sm text-gray-900">
                            {payment.tutorId?.name}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          ৳ {payment.amount}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {format(new Date(payment.createdAt), "MMM dd, yyyy")}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {payment.paymentMethod || "Card"}
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
              No payments yet
            </h3>
            <p className="text-gray-500 mb-6">
              You haven't made any payments yet.
            </p>
            <Button
              onClick={() =>
                (window.location.href = "/dashboard/student/tuitions")
              }
            >
              View My Tuitions
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default StudentPayments;
