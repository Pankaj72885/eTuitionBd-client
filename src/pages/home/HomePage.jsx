import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Link } from "react-router";
import { tuitionsAPI } from "../../api/tuitions.api";
import ProtectedImage from "../../components/common/ProtectedImage";
import StatusBadge from "../../components/ui/StatusBadge";

const HomePage = () => {
  const { data: latestTuitions, isLoading: tuitionsLoading } = useQuery({
    queryKey: ["latestTuitions"],
    queryFn: () => tuitionsAPI.getTuitions({ limit: 6, sort: "dateDesc" }),
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
    <div className="bg-background dark:bg-gray-950 transition-colors duration-200">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-indigo-50/50 dark:from-indigo-950/30 to-gray-50 dark:to-gray-900">
        <div className="max-w-6xl mx-auto px-4 md:px-6 py-12 md:py-20 grid md:grid-cols-2 gap-10 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
              Find trusted tutors in minutes
            </h1>
            <p className="mt-3 text-gray-600 dark:text-gray-300 max-w-lg">
              eTuitionBd connects students with qualified, verified tutors
              across Bangladesh. Our platform ensures transparency, security,
              and quality education for all.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <Link to="/register">
                <Button variant="primary">Post a Tuition</Button>
              </Link>
              <Link to="/tuitions">
                <Button variant="outline">Browse Tuitions</Button>
              </Link>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="shadow-lg dark:shadow-indigo-900/20 border-gray-200 dark:border-gray-700">
              <CardContent className="p-6">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Platform snapshot
                </p>
                <div className="mt-4 grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-brand dark:text-indigo-400">
                      500+
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Successful tuitions
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-brand dark:text-indigo-400">
                      4.8★
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Average rating
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-brand dark:text-indigo-400">
                      200+
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Verified tutors
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-brand dark:text-indigo-400">
                      15+
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Cities covered
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-12 md:py-16 bg-white dark:bg-gray-900">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <h2 className="text-center text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">
            How eTuitionBd works
          </h2>
          <p className="mt-2 text-center text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
            Simple, transparent steps to connect students and tutors.
          </p>

          <motion.div
            className="mt-10 grid gap-6 md:grid-cols-3"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants}>
              <Card className="hover:shadow-lg dark:hover:shadow-indigo-900/20 transition-shadow">
                <CardContent className="p-6 flex flex-col gap-3">
                  <div className="w-10 h-10 rounded-full bg-brand-light dark:bg-indigo-900/50 flex items-center justify-center text-brand dark:text-indigo-400 font-semibold text-sm">
                    1
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Post a tuition
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Students share their requirements, subject, location, and
                    budget.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card className="hover:shadow-lg dark:hover:shadow-indigo-900/20 transition-shadow">
                <CardContent className="p-6 flex flex-col gap-3">
                  <div className="w-10 h-10 rounded-full bg-brand-light dark:bg-indigo-900/50 flex items-center justify-center text-brand dark:text-indigo-400 font-semibold text-sm">
                    2
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Tutors apply
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Qualified tutors apply with their qualifications,
                    experience, and expected salary.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card className="hover:shadow-lg dark:hover:shadow-indigo-900/20 transition-shadow">
                <CardContent className="p-6 flex flex-col gap-3">
                  <div className="w-10 h-10 rounded-full bg-brand-light dark:bg-indigo-900/50 flex items-center justify-center text-brand dark:text-indigo-400 font-semibold text-sm">
                    3
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Approve & start classes
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Students review applications, select a tutor, make payment,
                    and begin learning.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Why choose us */}
      <section className="py-12 md:py-16 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <h2 className="text-center text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">
            Why choose eTuitionBd
          </h2>
          <p className="mt-2 text-center text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
            We're committed to providing the best tuition experience for
            students and tutors.
          </p>

          <motion.div
            className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants}>
              <Card>
                <CardContent className="p-6 flex flex-col gap-3 items-center text-center">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Verified tutors
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    All tutors go through a verification process to ensure
                    quality and safety.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card>
                <CardContent className="p-6 flex flex-col gap-3 items-center text-center">
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Secure payments
                  </h3>
                  <p className="text-sm text-gray-600">
                    Our payment system ensures transactions are safe and secure
                    for everyone.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card>
                <CardContent className="p-6 flex flex-col gap-3 items-center text-center">
                  <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center text-amber-600">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Transparent tracking
                  </h3>
                  <p className="text-sm text-gray-600">
                    Track tuition progress, payments, and schedules in one
                    place.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card>
                <CardContent className="p-6 flex flex-col gap-3 items-center text-center">
                  <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Dedicated support
                  </h3>
                  <p className="text-sm text-gray-600">
                    Our support team is always ready to help with any questions
                    or issues.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Latest tuition posts */}
      <section className="py-12 md:py-16 bg-white dark:bg-gray-900">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between gap-2">
            <h2 className="text-xl md:text-2xl font-semibold text-gray-900 dark:text-white">
              Latest Tuition Opportunities
            </h2>
            <Link to="/tuitions">
              <Button variant="ghost">View all</Button>
            </Link>
          </div>

          {tuitionsLoading ? (
            <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {[...Array(6)].map((_, index) => (
                <div key={index} className="animate-pulse">
                  <Card>
                    <CardContent className="p-4 md:p-5">
                      <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
                      <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
                      <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                      <div className="h-4 bg-gray-200 rounded w-2/3 mb-4"></div>
                      <div className="h-8 bg-gray-200 rounded w-24"></div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          ) : (
            <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {latestTuitions?.data?.map((tuition) => (
                <Card key={tuition._id}>
                  <CardContent className="p-4 md:p-5 flex flex-col gap-3">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="text-base md:text-lg font-semibold text-gray-900">
                          {tuition.subject} for {tuition.classLevel}
                        </h3>
                        <p className="mt-1 text-sm text-gray-500">
                          {tuition.location} • {tuition.mode}
                        </p>
                      </div>
                      <StatusBadge status={tuition.status} />
                    </div>

                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <span>৳ {tuition.budget} / month</span>
                      <span className="text-xs text-gray-400">
                        Posted{" "}
                        {new Date(tuition.createdAt).toLocaleDateString()}
                      </span>
                    </div>

                    <div className="mt-3">
                      <Link to={`/tuitions/${tuition._id}`}>
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Top tutors */}
      <section className="py-12 md:py-16 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between gap-2">
            <h2 className="text-xl md:text-2xl font-semibold text-gray-900 dark:text-white">
              Top Tutors
            </h2>
            <Link to="/tutors">
              <Button variant="ghost">View all</Button>
            </Link>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {/* Sample tutor cards - in a real app, this would come from API */}
            {[1, 2, 3, 4, 5, 6].map((id) => (
              <Card key={id}>
                <CardContent className="p-4 flex flex-col gap-3">
                  <div className="flex items-center gap-3">
                    <ProtectedImage
                      src={`https://picsum.photos/seed/tutor${id}/48/48.jpg`}
                      alt="Tutor"
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="text-base font-semibold text-gray-900">
                        {id === 1
                          ? "Rahim Uddin"
                          : id === 2
                          ? "Fatema Begum"
                          : id === 3
                          ? "Karim Ahmed"
                          : id === 4
                          ? "Salma Khan"
                          : id === 5
                          ? "Jamal Hossain"
                          : "Nusrat Jahan"}
                      </h3>
                      <p className="text-xs text-gray-500">
                        {id === 1
                          ? "Rajshahi"
                          : id === 2
                          ? "Dhaka"
                          : id === 3
                          ? "Chittagong"
                          : id === 4
                          ? "Sylhet"
                          : id === 5
                          ? "Khulna"
                          : "Barisal"}{" "}
                        •{" "}
                        {id === 1
                          ? "4+"
                          : id === 2
                          ? "3+"
                          : id === 3
                          ? "5+"
                          : id === 4
                          ? "2+"
                          : id === 5
                          ? "6+"
                          : "3+"}{" "}
                        years experience
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1 mt-1">
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                      {id === 1
                        ? "Math"
                        : id === 2
                        ? "English"
                        : id === 3
                        ? "Physics"
                        : id === 4
                        ? "Chemistry"
                        : id === 5
                        ? "Biology"
                        : "Bangla"}
                    </span>
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                      {id === 1
                        ? "Class 8-10"
                        : id === 2
                        ? "Class 5-8"
                        : id === 3
                        ? "HSC"
                        : id === 4
                        ? "SSC"
                        : id === 5
                        ? "Class 6-9"
                        : "Class 1-5"}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-sm mt-2">
                    <span className="flex items-center gap-1 text-amber-500">
                      ★ {4.8 + (id % 3) * 0.1}{" "}
                      <span className="text-xs text-gray-500">
                        ({10 + id * 5} reviews)
                      </span>
                    </span>
                    <Link to={`/tutors/${id}`}>
                      <Button variant="outline" size="sm">
                        View Profile
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
