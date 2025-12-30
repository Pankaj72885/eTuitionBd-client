import { paymentsAPI } from "@/api/payments.api";
import { tuitionsAPI } from "@/api/tuitions.api";
import { usersAPI } from "@/api/users.api";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import { Card, CardContent } from "@/components/ui/Card";
import {
  AcademicCapIcon,
  ArrowTrendingUpIcon,
  BookOpenIcon,
  ChartBarIcon,
  CurrencyDollarIcon,
  MapPinIcon,
  UserGroupIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";
import { useQuery } from "@tanstack/react-query";
import { format, subMonths } from "date-fns";
import { motion } from "framer-motion";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

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
    queryFn: () => paymentsAPI.getAdminPayments({ limit: 1000 }),
  });

  // Prepare data for charts
  const prepareMonthlyEarningsData = () => {
    if (!payments?.data?.length) return [];
    const groupedData = {};
    for (let i = 5; i >= 0; i--) {
      const date = subMonths(new Date(), i);
      const monthYear = format(date, "MMM yyyy");
      groupedData[monthYear] = 0;
    }
    payments.data.forEach((payment) => {
      const date = new Date(payment.createdAt);
      const monthYear = format(date, "MMM yyyy");
      if (groupedData[monthYear] !== undefined) {
        groupedData[monthYear] += payment.amount;
      }
    });
    return Object.entries(groupedData).map(([month, amount]) => ({
      month,
      amount,
    }));
  };

  const prepareLocationData = () => {
    if (!tuitions?.data?.length) return [];
    const locationCounts = {};
    tuitions.data.forEach((tuition) => {
      if (!locationCounts[tuition.location])
        locationCounts[tuition.location] = 0;
      locationCounts[tuition.location]++;
    });
    return Object.entries(locationCounts)
      .map(([location, count]) => ({ location, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 8);
  };

  const prepareSubjectData = () => {
    if (!tuitions?.data?.length) return [];
    const subjectCounts = {};
    tuitions.data.forEach((tuition) => {
      if (!subjectCounts[tuition.subject]) subjectCounts[tuition.subject] = 0;
      subjectCounts[tuition.subject]++;
    });
    return Object.entries(subjectCounts)
      .map(([subject, count]) => ({ subject, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 8);
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
    tuitions?.data?.filter((t) => t.status === "Pending").length || 0;
  const approvedTuitions =
    tuitions?.data?.filter((t) => t.status === "Approved").length || 0;
  const ongoingTuitions =
    tuitions?.data?.filter((t) => t.status === "Ongoing").length || 0;
  const totalEarnings =
    payments?.data?.reduce((sum, p) => sum + p.amount, 0) || 0;
  const platformEarnings = totalEarnings * 0.1;

  const COLORS = [
    "#6366f1",
    "#10b981",
    "#f59e0b",
    "#ef4444",
    "#8b5cf6",
    "#ec4899",
    "#14b8a6",
    "#f97316",
  ];

  const summaryCards = [
    {
      title: "Total Users",
      value: totalUsers.toLocaleString(),
      subtitle: `${totalStudents} students, ${totalTutors} tutors`,
      icon: UsersIcon,
      color: "indigo",
      gradient: "from-indigo-500 to-purple-500",
    },
    {
      title: "Total Tuitions",
      value: totalTuitions.toLocaleString(),
      subtitle: `${pendingTuitions} pending, ${ongoingTuitions} ongoing`,
      icon: BookOpenIcon,
      color: "emerald",
      gradient: "from-emerald-500 to-teal-500",
    },
    {
      title: "Total Earnings",
      value: `৳ ${totalEarnings.toLocaleString()}`,
      subtitle: `Platform: ৳ ${platformEarnings.toLocaleString()}`,
      icon: CurrencyDollarIcon,
      color: "amber",
      gradient: "from-amber-500 to-orange-500",
    },
    {
      title: "Avg. Tuition Value",
      value: `৳ ${
        totalTuitions > 0
          ? Math.round(totalEarnings / totalTuitions).toLocaleString()
          : 0
      }`,
      subtitle: "Per tuition",
      icon: ChartBarIcon,
      color: "purple",
      gradient: "from-purple-500 to-pink-500",
    },
  ];

  const userDistribution = [
    { name: "Students", value: totalStudents, color: "#6366f1" },
    { name: "Tutors", value: totalTutors, color: "#10b981" },
    { name: "Admins", value: totalAdmins, color: "#f59e0b" },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-2xl bg-linear-to-r from-indigo-500 to-purple-500 flex items-center justify-center">
          <ChartBarIcon className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Analytics Dashboard
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            Platform performance and insights
          </p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
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
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      {card.value}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      {card.subtitle}
                    </p>
                  </div>
                  <div
                    className={`w-12 h-12 rounded-2xl bg-${card.color}-100 dark:bg-${card.color}-900/30 flex items-center justify-center`}
                  >
                    <card.icon
                      className={`w-6 h-6 text-${card.color}-600 dark:text-${card.color}-400`}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Revenue Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center">
                <ArrowTrendingUpIcon className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              </div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Monthly Earnings
              </h2>
            </div>
            {paymentsLoading ? (
              <div className="flex justify-center py-8">
                <LoadingSpinner />
              </div>
            ) : (
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={monthlyEarningsData}>
                  <defs>
                    <linearGradient
                      id="colorEarnings"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
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
                    stroke="#6366f1"
                    strokeWidth={2}
                    fill="url(#colorEarnings)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* Location and Subject Charts */}
      <div className="grid gap-6 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                  <MapPinIcon className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                </div>
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Top Locations
                </h2>
              </div>
              {tuitionsLoading ? (
                <div className="flex justify-center py-8">
                  <LoadingSpinner />
                </div>
              ) : (
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={locationData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="location" stroke="#9ca3af" fontSize={12} />
                    <YAxis stroke="#9ca3af" fontSize={12} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "rgba(17, 24, 39, 0.9)",
                        border: "none",
                        borderRadius: "12px",
                        color: "white",
                      }}
                    />
                    <Bar dataKey="count" fill="#10b981" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
                  <AcademicCapIcon className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                </div>
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Popular Subjects
                </h2>
              </div>
              {tuitionsLoading ? (
                <div className="flex justify-center py-8">
                  <LoadingSpinner />
                </div>
              ) : (
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={subjectData} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis type="number" stroke="#9ca3af" fontSize={12} />
                    <YAxis
                      dataKey="subject"
                      type="category"
                      stroke="#9ca3af"
                      fontSize={12}
                      width={80}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "rgba(17, 24, 39, 0.9)",
                        border: "none",
                        borderRadius: "12px",
                        color: "white",
                      }}
                    />
                    <Bar dataKey="count" fill="#f59e0b" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* User Distribution */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
      >
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                <UserGroupIcon className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              </div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                User Distribution
              </h2>
            </div>
            {usersLoading ? (
              <div className="flex justify-center py-8">
                <LoadingSpinner />
              </div>
            ) : (
              <div className="flex flex-col lg:flex-row items-center justify-center gap-8">
                <ResponsiveContainer width={280} height={280}>
                  <PieChart>
                    <Pie
                      data={userDistribution}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {userDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "rgba(17, 24, 39, 0.9)",
                        border: "none",
                        borderRadius: "12px",
                        color: "white",
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
                <div className="space-y-4">
                  {userDistribution.map((item) => (
                    <div key={item.name} className="flex items-center gap-3">
                      <div
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: item.color }}
                      />
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {item.name}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {item.value} users
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default AdminAnalytics;
