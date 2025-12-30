import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import {
  AcademicCapIcon,
  ChatBubbleLeftRightIcon,
  GlobeAltIcon,
  HeartIcon,
  RocketLaunchIcon,
  ShieldCheckIcon,
  SparklesIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import { Link } from "react-router";

const AboutPage = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6 } },
  };

  const teamMembers = [
    {
      name: "Mohammad Rahim",
      role: "CEO & Founder",
      bio: "Passionate about education technology with over 10 years of experience.",
      avatar: "https://i.pravatar.cc/150?img=68",
    },
    {
      name: "Fatema Khatun",
      role: "CTO",
      bio: "Tech enthusiast focused on building scalable educational platforms.",
      avatar: "https://i.pravatar.cc/150?img=47",
    },
    {
      name: "Abdul Karim",
      role: "Head of Operations",
      bio: "Ensuring smooth operations and excellent user experience.",
      avatar: "https://i.pravatar.cc/150?img=60",
    },
  ];

  const stats = [
    { value: "500+", label: "Tuitions Completed", icon: AcademicCapIcon },
    { value: "200+", label: "Verified Tutors", icon: ShieldCheckIcon },
    { value: "15+", label: "Cities Covered", icon: GlobeAltIcon },
    { value: "98%", label: "Satisfaction Rate", icon: HeartIcon },
  ];

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950 transition-colors duration-300">
      {/* Hero Section */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 mesh-bg" />
        <div className="absolute inset-0 bg-linear-to-b from-indigo-500/5 via-transparent to-transparent dark:from-indigo-500/10" />

        <div className="max-w-6xl mx-auto px-4 md:px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="w-20 h-20 mx-auto mb-6 rounded-3xl bg-linear-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/30"
            >
              <SparklesIcon className="w-10 h-10 text-white" />
            </motion.div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              About <span className="gradient-text-brand">eTuitionBd</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              We're on a mission to connect students with qualified tutors
              across Bangladesh, making quality education accessible to
              everyone.
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="text-center p-6 rounded-2xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50"
              >
                <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-linear-to-br from-indigo-500 to-purple-500 flex items-center justify-center">
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">
                  {stat.value}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Card className="h-full overflow-hidden group">
                <div className="h-2 bg-linear-to-r from-indigo-500 to-purple-500" />
                <CardContent className="p-8">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-linear-to-br from-indigo-500 to-purple-500 flex items-center justify-center shadow-lg">
                      <RocketLaunchIcon className="w-7 h-7 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                      Our Mission
                    </h2>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    To create a trusted platform that connects students with
                    qualified tutors, fostering educational growth and academic
                    excellence across Bangladesh. We believe every student
                    deserves access to quality education, regardless of their
                    location or background.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Card className="h-full overflow-hidden group">
                <div className="h-2 bg-linear-to-r from-emerald-500 to-teal-500" />
                <CardContent className="p-8">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-linear-to-br from-emerald-500 to-teal-500 flex items-center justify-center shadow-lg">
                      <GlobeAltIcon className="w-7 h-7 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                      Our Vision
                    </h2>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    To be the leading tuition management platform in Bangladesh,
                    known for quality, reliability, and innovation in education
                    technology. We envision a future where finding the right
                    tutor is effortless and education is truly accessible to
                    all.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 md:py-24 bg-gray-50/50 dark:bg-gray-800/30">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
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
              How eTuitionBd <span className="gradient-text-brand">Works</span>
            </h2>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-3 gap-8 relative"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {/* Connection Line */}
            <div className="hidden md:block absolute top-1/2 left-[16.67%] right-[16.67%] h-0.5 bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 -translate-y-1/2" />

            {[
              {
                step: "01",
                title: "Post Tuition",
                description:
                  "Students share their requirements with details about subject, location, and budget.",
                icon: "📝",
                color: "from-indigo-500 to-indigo-600",
              },
              {
                step: "02",
                title: "Tutors Apply",
                description:
                  "Qualified tutors apply with their qualifications, experience, and expected salary.",
                icon: "👨‍🏫",
                color: "from-purple-500 to-purple-600",
              },
              {
                step: "03",
                title: "Start Learning",
                description:
                  "Students review, select a tutor, make payment, and begin their learning journey.",
                icon: "🚀",
                color: "from-pink-500 to-pink-600",
              },
            ].map((item, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Card className="relative overflow-hidden group card-hover border-0 shadow-lg h-full">
                  <div
                    className={`absolute top-0 left-0 right-0 h-1 bg-linear-to-r ${item.color}`}
                  />
                  <CardContent className="p-8 text-center">
                    <div className="relative z-10 mb-6">
                      <div
                        className={`w-20 h-20 mx-auto rounded-2xl bg-linear-to-br ${item.color} flex items-center justify-center text-4xl shadow-lg group-hover:scale-110 transition-transform duration-300`}
                      >
                        {item.icon}
                      </div>
                      <span className="absolute -top-4 -right-4 text-7xl font-bold text-gray-100 dark:text-gray-800 -z-10">
                        {item.step}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      {item.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 mb-4">
              Our Advantages
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
              Why Choose <span className="gradient-text-brand">eTuitionBd</span>
            </h2>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              {
                icon: ShieldCheckIcon,
                title: "Verified Tutors",
                description:
                  "All tutors go through a rigorous verification process.",
                color: "bg-emerald-500",
                lightBg: "bg-emerald-50 dark:bg-emerald-900/20",
              },
              {
                icon: HeartIcon,
                title: "Secure Payments",
                description: "Safe and secure payment system for everyone.",
                color: "bg-blue-500",
                lightBg: "bg-blue-50 dark:bg-blue-900/20",
              },
              {
                icon: ChatBubbleLeftRightIcon,
                title: "Direct Communication",
                description: "Connect directly with tutors and students.",
                color: "bg-amber-500",
                lightBg: "bg-amber-50 dark:bg-amber-900/20",
              },
              {
                icon: UserGroupIcon,
                title: "24/7 Support",
                description: "Our team is always ready to help you.",
                color: "bg-pink-500",
                lightBg: "bg-pink-50 dark:bg-pink-900/20",
              },
            ].map((feature, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Card
                  className={`h-full group card-hover border-0 ${feature.lightBg}`}
                >
                  <CardContent className="p-6 text-center">
                    <div
                      className={`w-14 h-14 mx-auto mb-5 rounded-2xl ${feature.color} flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform`}
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

      {/* Team Section */}
      <section className="py-16 md:py-24 bg-gray-50/50 dark:bg-gray-800/30">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 mb-4">
              Our Team
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
              Meet the <span className="gradient-text-brand">Team</span>
            </h2>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {teamMembers.map((member, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Card className="text-center group card-hover overflow-hidden">
                  <CardContent className="p-8">
                    <div className="relative inline-block mb-6">
                      <img
                        src={member.avatar}
                        alt={member.name}
                        className="w-28 h-28 rounded-2xl object-cover ring-4 ring-white dark:ring-gray-800 shadow-xl group-hover:ring-indigo-200 dark:group-hover:ring-indigo-800 transition-all"
                      />
                      <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-xl flex items-center justify-center shadow-lg">
                        <ShieldCheckIcon className="w-4 h-4 text-white" />
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                      {member.name}
                    </h3>
                    <p className="text-indigo-600 dark:text-indigo-400 font-medium text-sm mb-3">
                      {member.role}
                    </p>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      {member.bio}
                    </p>
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
            <AcademicCapIcon className="w-10 h-10 text-white" />
          </motion.div>

          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-lg text-white/80 mb-10 max-w-2xl mx-auto">
            Join thousands of students and tutors who are already benefiting
            from eTuitionBd.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register">
              <Button className="bg-white text-indigo-600 hover:bg-gray-100 px-8 py-3 text-base font-semibold shadow-xl">
                Sign Up Now
              </Button>
            </Link>
            <Link to="/tuitions">
              <Button className="bg-white/10 backdrop-blur-sm text-white border-2 border-white/30 hover:bg-white/20 px-8 py-3 text-base">
                Browse Tuitions
              </Button>
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default AboutPage;
