import React from "react";
import { useQuery } from "@tanstack/react-query";
import { format, subMonths, startOfMonth, endOfMonth } from "date-fns";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { usersAPI } from "@/api/users.api";
import { tuitionsAPI } from "@/api/tuitions.api";
import { paymentsAPI } from "@/api/payments.api";
import {Card, CardContent} from "@/components/ui/Card";
import LoadingSpinner from "@/components/common/LoadingSpinner";

const AdminAnalytics = () => {
  // Fetch data for analytics
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
    queryFn: () => paymentsAPI.getAllPayments({ limit: 1000 }),
  });

  // Prepare data for charts
  const prepareMonthlyEarningsData = () => {
    if (!payments?.data?.length) return [];

    // Group payments by month
    const groupedData = {};

    // Initialize with last 6 months
    for (let i = 5; i >= 0; i--) {
      const date = subMonths(new Date(), i);
      const monthYear = format(date, "MMM yyyy");
      groupedData[monthYear] = 0;
    }

    // Add payment amounts
    payments.data.forEach((payment) => {
      const date = new Date(payment.createdAt);
      const monthYear = format(date, "MMM yyyy");

      if (groupedData[monthYear] !== undefined) {
        groupedData[monthYear] += payment.amount;
      }
    });

    // Convert to array format for charts
    return Object.entries(groupedData).map(([month, amount]) => ({
      month,
      amount,
    }));
  };

  const prepareLocationData = () => {
    if (!tuitions?.data?.length) return [];

    // Count tuitions by location
    const locationCounts = {};

    tuitions.data.forEach((tuition) => {
      if (!locationCounts[tuition.location]) {
        locationCounts[tuition.location] = 0;
      }
      locationCounts[tuition.location]++;
    });

    // Convert to array format for charts
    return Object.entries(locationCounts)
      .map(([location, count]) => ({ location, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10); // Top 10 locations
  };

  const prepareSubjectData = () => {
    if (!tuitions?.data?.length) return [];

    // Count tuitions by subject
    const subjectCounts = {};

    tuitions.data.forEach((tuition) => {
      if (!subjectCounts[tuition.subject]) {
        subjectCounts[tuition.subject] = 0;
      }
      subjectCounts[tuition.subject]++;
    });

    // Convert to array format for charts
    return Object.entries(subjectCounts)
      .map(([subject, count]) => ({ subject, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10); // Top 10 subjects
  };

  const monthlyEarningsData = prepareMonthlyEarningsData();
  const locationData = prepareLocationData();
  const subjectData = prepareSubjectData();

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

  const COLORS = [
    "#4F46E5",
    "#10B981",
    "#F59E0B",
    "#EF4444",
    "#8B5CF6",
    "#EC4899",
    "#14B8A6",
    "#F97316",
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">
        Analytics Dashboard
      </h1>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <Card>
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">
              Total Users
            </h2>
            <p className="text-3xl font-bold text-gray-900">{totalUsers}</p>
            <div className="mt-2 text-sm text-gray-500">
              {totalStudents} students, {totalTutors} tutors, {totalAdmins}{" "}
              admins
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">
              Total Tuitions
            </h2>
            <p className="text-3xl font-bold text-gray-900">{totalTuitions}</p>
            <div className="mt-2 text-sm text-gray-500">
              {pendingTuitions} pending, {approvedTuitions} approved,{" "}
              {ongoingTuitions} ongoing
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">
              Total Earnings
            </h2>
            <p className="text-3xl font-bold text-gray-900">
              ৳ {totalEarnings}
            </p>
            <div className="mt-2 text-sm text-gray-500">
              Platform revenue: ৳ {platformEarnings}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">
              Avg. Tuition Value
            </h2>
            <p className="text-3xl font-bold text-gray-900">
              ৳{" "}
              {totalTuitions > 0
                ? Math.round(totalEarnings / totalTuitions)
                : 0}
            </p>
            <div className="mt-2 text-sm text-gray-500">Per tuition</div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid gap-6 md:grid-cols-2 mb-8">
        <Card>
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Monthly Earnings
            </h2>
            {paymentsLoading ? (
              <div className="flex justify-center py-4">
                <LoadingSpinner />
              </div>
            ) : (
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={monthlyEarningsData}>
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
            )}
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Top Locations
            </h2>
            {tuitionsLoading ? (
              <div className="flex justify-center py-4">
                <LoadingSpinner />
              </div>
            ) : (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={locationData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="location" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#4F46E5" />
                </BarChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Top Subjects
            </h2>
            {tuitionsLoading ? (
              <div className="flex justify-center py-4">
                <LoadingSpinner />
              </div>
            ) : (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={subjectData} layout="horizontal">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="subject" type="category" />
                  <Tooltip />
                  <Bar dataKey="count" fill="#10B981" />
                </BarChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
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
                    data={[
                      { name: "Students", value: totalStudents },
                      { name: "Tutors", value: totalTutors },
                      { name: "Admins", value: totalAdmins },
                    ]}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name}: ${value}`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {[
                      { name: "Students", value: totalStudents },
                      { name: "Tutors", value: totalTutors },
                      { name: "Admins", value: totalAdmins },
                    ].map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminAnalytics;
