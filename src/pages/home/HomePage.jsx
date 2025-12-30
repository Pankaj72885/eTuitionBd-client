import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import {
  AcademicCapIcon,
  ChartBarIcon,
  CurrencyDollarIcon,
  HeartIcon,
  MapPinIcon,
  ShieldCheckIcon,
  SparklesIcon,
  StarIcon,
} from "@heroicons/react/24/outline";
import { StarIcon as StarSolid } from "@heroicons/react/24/solid";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Link } from "react-router";
import { tuitionsAPI } from "../../api/tuitions.api";
import { usersAPI } from "../../api/users.api";
import ProtectedImage from "../../components/common/ProtectedImage";
import StatusBadge from "../../components/ui/StatusBadge";

const HomePage = () => {
  const { data: latestTuitions, isLoading: tuitionsLoading } = useQuery({
    queryKey: ["latestTuitions"],
    queryFn: () => tuitionsAPI.getTuitions({ limit: 6, sort: "dateDesc" }),
  });

  const { data: topTutors, isLoading: usersLoading } = useQuery({
    queryKey: ["topTutors"],
    queryFn: () => usersAPI.getAllUsers({ role: "tutor", limit: 6 }),
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
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const floatVariants = {
    initial: { y: 0 },
    animate: {
      y: [-10, 10, -10],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  return (
    <div className="bg-background dark:bg-gray-950 transition-colors duration-300 overflow-hidden">
      {/* Hero Section with Mesh Background */}
      <section className="relative min-h-[90vh] flex items-center mesh-bg">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute top-20 left-10 w-72 h-72 bg-indigo-500/20 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{ duration: 8, repeat: Infinity }}
          />
          <motion.div
            className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{ duration: 10, repeat: Infinity }}
          />
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-pink-500/10 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 180, 360],
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          />
        </div>

        <div className="max-w-6xl mx-auto px-4 md:px-6 py-16 md:py-24 grid md:grid-cols-2 gap-12 items-center relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-linear-to-r from-indigo-500/10 to-purple-500/10 border border-indigo-500/20 mb-6"
            >
              <SparklesIcon className="w-4 h-4 text-indigo-500" />
              <span className="text-sm font-medium text-indigo-600 dark:text-indigo-400">
                #1 Tuition Platform in Bangladesh
              </span>
            </motion.div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 dark:text-white leading-tight">
              Find trusted tutors{" "}
              <span className="gradient-text-brand">in minutes</span>
            </h1>
            <p className="mt-6 text-lg text-gray-600 dark:text-gray-300 max-w-lg leading-relaxed">
              eTuitionBd connects students with qualified, verified tutors
              across Bangladesh. Experience transparent, secure, and quality
              education for everyone.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Link to="/register">
                <Button
                  variant="primary"
                  className="group relative overflow-hidden px-8 py-3 text-base glow-hover transition-all duration-300"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Post a Tuition
                    <motion.span
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      →
                    </motion.span>
                  </span>
                </Button>
              </Link>
              <Link to="/tuitions">
                <Button
                  variant="outline"
                  className="px-8 py-3 text-base border-2 hover:bg-indigo-50 dark:hover:bg-indigo-950/50 transition-all duration-300"
                >
                  Browse Tuitions
                </Button>
              </Link>
            </div>

            {/* Trust indicators */}
            <div className="mt-10 flex items-center gap-6">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4, 5].map((i) => (
                  <img
                    key={i}
                    src={`https://i.pravatar.cc/40?img=${i + 10}`}
                    alt="User"
                    className="w-10 h-10 rounded-full border-2 border-white dark:border-gray-800 object-cover"
                  />
                ))}
              </div>
              <div>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <StarSolid key={i} className="w-4 h-4 text-amber-400" />
                  ))}
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  <span className="font-semibold">500+</span> happy students
                </p>
              </div>
            </div>
          </motion.div>

          {/* Stats Card with Floating Animation */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative"
          >
            {/* Decorative Elements */}
            <motion.div
              variants={floatVariants}
              initial="initial"
              animate="animate"
              className="absolute -top-8 -right-8 w-20 h-20 bg-linear-to-br from-amber-400 to-orange-500 rounded-2xl shadow-lg flex items-center justify-center text-white"
            >
              <AcademicCapIcon className="w-10 h-10" />
            </motion.div>

            <Card className="glass-card rounded-3xl overflow-hidden">
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                    Platform Live Stats
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  {[
                    {
                      value: "500+",
                      label: "Successful tuitions",
                      icon: AcademicCapIcon,
                      color: "from-indigo-500 to-purple-500",
                    },
                    {
                      value: "4.9★",
                      label: "Average rating",
                      icon: StarIcon,
                      color: "from-amber-400 to-orange-500",
                    },
                    {
                      value: "200+",
                      label: "Verified tutors",
                      icon: ShieldCheckIcon,
                      color: "from-emerald-400 to-teal-500",
                    },
                    {
                      value: "15+",
                      label: "Cities covered",
                      icon: MapPinIcon,
                      color: "from-pink-400 to-rose-500",
                    },
                  ].map((stat, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                      className="text-center p-4 rounded-2xl bg-gray-50/50 dark:bg-gray-800/50 hover:bg-gray-100/80 dark:hover:bg-gray-800/80 transition-colors"
                    >
                      <div
                        className={`w-12 h-12 mx-auto mb-3 rounded-xl bg-linear-to-br ${stat.color} flex items-center justify-center shadow-lg`}
                      >
                        <stat.icon className="w-6 h-6 text-white" />
                      </div>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">
                        {stat.value}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        {stat.label}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Floating Badge */}
            <motion.div
              variants={floatVariants}
              initial="initial"
              animate="animate"
              style={{ animationDelay: "2s" }}
              className="absolute -bottom-4 -left-4 px-4 py-2 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-100 dark:border-gray-700"
            >
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                  <ShieldCheckIcon className="w-4 h-4 text-green-600 dark:text-green-400" />
                </div>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  100% Verified
                </span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* How it works - Modern Timeline */}
      <section className="py-20 md:py-28 bg-white dark:bg-gray-900 relative">
        <div className="absolute inset-0 bg-linear-to-b from-gray-50/50 dark:from-gray-800/20 to-transparent" />

        <div className="max-w-6xl mx-auto px-4 md:px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 mb-4">
              Simple Process
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
              How eTuitionBd <span className="gradient-text-brand">works</span>
            </h2>
            <p className="mt-4 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Three simple steps to connect students and tutors seamlessly.
            </p>
          </motion.div>

          <motion.div
            className="grid gap-8 md:grid-cols-3 relative"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {/* Connection Line (Desktop) */}
            <div className="hidden md:block absolute top-1/2 left-[16.67%] right-[16.67%] h-0.5 bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 -translate-y-1/2" />

            {[
              {
                step: "01",
                title: "Post a tuition",
                description:
                  "Students share their requirements, subject, location, and budget with detailed information.",
                icon: "📝",
                gradient: "from-indigo-500 to-indigo-600",
              },
              {
                step: "02",
                title: "Tutors apply",
                description:
                  "Qualified tutors apply with their qualifications, experience, and expected salary.",
                icon: "👨‍🏫",
                gradient: "from-purple-500 to-purple-600",
              },
              {
                step: "03",
                title: "Start learning",
                description:
                  "Students review applications, select a tutor, make payment, and begin learning.",
                icon: "🚀",
                gradient: "from-pink-500 to-pink-600",
              },
            ].map((item, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Card className="relative overflow-hidden group card-hover border-0 shadow-lg dark:shadow-indigo-900/10 h-full">
                  <div
                    className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${item.gradient}`}
                  />
                  <CardContent className="p-8">
                    {/* Step Number */}
                    <div className="relative z-10">
                      <div
                        className={`w-16 h-16 rounded-2xl bg-linear-to-br ${item.gradient} flex items-center justify-center text-3xl shadow-lg mb-6 group-hover:scale-110 transition-transform duration-300`}
                      >
                        {item.icon}
                      </div>
                      <span className="absolute -top-2 -left-2 text-6xl font-bold text-gray-100 dark:text-gray-800 -z-10">
                        {item.step}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                      {item.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Why choose us - Feature Grid */}
      <section className="py-20 md:py-28 bg-linear-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 mb-4">
              Why Choose Us
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
              The eTuitionBd{" "}
              <span className="gradient-text-brand">advantage</span>
            </h2>
            <p className="mt-4 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              We're committed to providing the best tuition experience for
              students and tutors.
            </p>
          </motion.div>

          <motion.div
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-4"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              {
                icon: ShieldCheckIcon,
                title: "Verified tutors",
                description:
                  "All tutors go through a rigorous verification process.",
                color: "bg-emerald-500",
                bgLight: "bg-emerald-50 dark:bg-emerald-900/20",
              },
              {
                icon: CurrencyDollarIcon,
                title: "Secure payments",
                description: "Safe and secure payment system for everyone.",
                color: "bg-blue-500",
                bgLight: "bg-blue-50 dark:bg-blue-900/20",
              },
              {
                icon: ChartBarIcon,
                title: "Track progress",
                description:
                  "Monitor tuition progress and payments in one place.",
                color: "bg-amber-500",
                bgLight: "bg-amber-50 dark:bg-amber-900/20",
              },
              {
                icon: HeartIcon,
                title: "Dedicated support",
                description: "Our team is ready to help with any questions.",
                color: "bg-pink-500",
                bgLight: "bg-pink-50 dark:bg-pink-900/20",
              },
            ].map((feature, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Card
                  className={`h-full card-hover border-0 ${feature.bgLight} hover:shadow-xl`}
                >
                  <CardContent className="p-6 flex flex-col items-center text-center">
                    <div
                      className={`w-14 h-14 rounded-2xl ${feature.color} flex items-center justify-center text-white shadow-lg mb-5`}
                    >
                      <feature.icon className="w-7 h-7" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Latest tuition posts */}
      <section className="py-20 md:py-28 bg-white dark:bg-gray-900">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
            <div>
              <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 mb-4">
                Fresh Opportunities
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
                Latest <span className="gradient-text-brand">Tuitions</span>
              </h2>
            </div>
            <Link to="/tuitions">
              <Button variant="outline" className="group">
                View all tuitions
                <motion.span
                  className="ml-2 inline-block"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  →
                </motion.span>
              </Button>
            </Link>
          </div>

          {tuitionsLoading ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[...Array(6)].map((_, index) => (
                <div key={index} className="animate-pulse">
                  <Card className="h-full">
                    <CardContent className="p-6">
                      <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-lg w-3/4 mb-3" />
                      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-4" />
                      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full mb-2" />
                      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3 mb-5" />
                      <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded-lg w-28" />
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          ) : (
            <motion.div
              className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {latestTuitions?.data?.map((tuition, index) => (
                <motion.div key={tuition._id} variants={itemVariants}>
                  <Card className="h-full card-hover group overflow-hidden">
                    <div className="h-1 bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500" />
                    <CardContent className="p-6 flex flex-col gap-4">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                            {tuition.subject} for {tuition.classLevel}
                          </h3>
                          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1">
                            <MapPinIcon className="w-4 h-4" />
                            {tuition.location} • {tuition.mode}
                          </p>
                        </div>
                        <StatusBadge status={tuition.status} />
                      </div>

                      <div className="flex items-center justify-between text-sm">
                        <span className="font-semibold text-indigo-600 dark:text-indigo-400">
                          ৳ {tuition.budget}/month
                        </span>
                        <span className="text-xs text-gray-400">
                          {new Date(tuition.createdAt).toLocaleDateString()}
                        </span>
                      </div>

                      <Link to={`/tuitions/${tuition._id}`} className="mt-auto">
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full group-hover:bg-indigo-50 dark:group-hover:bg-indigo-950/50 group-hover:border-indigo-300 dark:group-hover:border-indigo-700 transition-all"
                        >
                          View Details
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* Top tutors */}
      <section className="py-20 md:py-28 bg-linear-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
            <div>
              <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 mb-4">
                Top Rated
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
                Meet our{" "}
                <span className="gradient-text-brand">expert tutors</span>
              </h2>
            </div>
            <Link to="/tutors">
              <Button variant="outline" className="group">
                View all tutors
                <motion.span
                  className="ml-2 inline-block"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  →
                </motion.span>
              </Button>
            </Link>
          </div>

          <motion.div
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {usersLoading
              ? [...Array(6)].map((_, index) => (
                  <div key={index} className="animate-pulse">
                    <Card className="h-full">
                      <CardContent className="p-6">
                        <div className="flex items-center gap-4 mb-4">
                          <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-2xl" />
                          <div className="space-y-2">
                            <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-32" />
                            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24" />
                          </div>
                        </div>
                        <div className="flex gap-2 mb-4">
                          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-full w-20" />
                          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-full w-20" />
                        </div>
                        <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-full" />
                      </CardContent>
                    </Card>
                  </div>
                ))
              : (topTutors?.data || []).slice(0, 6).map((tutor, index) => (
                  <motion.div key={tutor._id} variants={itemVariants}>
                    <Card className="h-full card-hover group overflow-hidden">
                      <CardContent className="p-6">
                        <div className="flex items-center gap-4 mb-4">
                          <div className="relative">
                            <ProtectedImage
                              src={
                                tutor.photoUrl ||
                                `https://ui-avatars.com/api/?name=${tutor.name}&background=random`
                              }
                              alt={tutor.name}
                              className="w-16 h-16 rounded-2xl object-cover ring-2 ring-gray-100 dark:ring-gray-700 group-hover:ring-indigo-200 dark:group-hover:ring-indigo-800 transition-all"
                            />
                            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white dark:border-gray-800 flex items-center justify-center">
                              <ShieldCheckIcon className="w-3 h-3 text-white" />
                            </div>
                          </div>
                          <div>
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                              {tutor.name}
                            </h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1">
                              <MapPinIcon className="w-3 h-3" />
                              {tutor.city} • {tutor.experienceYears || "1+"}{" "}
                              years
                            </p>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2 mb-4">
                          <span className="px-3 py-1 rounded-full text-xs font-medium bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400">
                            {tutor.subjects || "General"}
                          </span>
                          <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400">
                            {tutor.classLevels || "All Classes"}
                          </span>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1">
                            <StarSolid className="w-5 h-5 text-amber-400" />
                            <span className="font-semibold text-gray-900 dark:text-white">
                              {tutor.averageRating
                                ? tutor.averageRating.toFixed(1)
                                : "New"}
                            </span>
                            <span className="text-sm text-gray-500 dark:text-gray-400">
                              ({tutor.reviewCount || 0} reviews)
                            </span>
                          </div>
                          <Link to={`/tutors`}>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="group-hover:text-indigo-600 dark:group-hover:text-indigo-400"
                            >
                              View →
                            </Button>
                          </Link>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-r from-indigo-600 via-purple-600 to-pink-600" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.05%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')] opacity-30" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto px-4 md:px-6 text-center relative z-10"
        >
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-20 h-20 mx-auto mb-8 rounded-3xl bg-white/10 backdrop-blur-sm flex items-center justify-center"
          >
            <SparklesIcon className="w-10 h-10 text-white" />
          </motion.div>

          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Ready to start your learning journey?
          </h2>
          <p className="text-lg text-white/80 mb-10 max-w-2xl mx-auto">
            Join thousands of students and tutors who are already benefiting
            from eTuitionBd's trusted platform.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register">
              <Button className="bg-white text-indigo-600 hover:bg-gray-100 px-8 py-3 text-base font-semibold shadow-xl">
                Get Started Free
              </Button>
            </Link>
            <Link to="/about">
              <Button className="bg-white/10 backdrop-blur-sm text-white border-2 border-white/30 hover:bg-white/20 px-8 py-3 text-base">
                Learn More
              </Button>
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default HomePage;
