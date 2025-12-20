import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import {
  AcademicCapIcon,
  GlobeAltIcon,
  ShieldCheckIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import { Link } from "react-router";

const AboutPage = () => {
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
    <div className="py-12 md:py-16 bg-white dark:bg-gray-900 transition-colors duration-200">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            About eTuitionBd
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-200 max-w-3xl mx-auto">
            We're on a mission to connect students with qualified tutors across
            Bangladesh, making quality education accessible to everyone.
          </p>
        </div>

        {/* Mission & Vision */}
        <section className="mb-16">
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Card>
                <CardContent className="p-6 md:p-8">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-brand-light dark:bg-indigo-900/50 rounded-lg flex items-center justify-center text-brand dark:text-indigo-400 mr-4">
                      <AcademicCapIcon className="h-6 w-6" />
                    </div>
                    <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                      Our Mission
                    </h2>
                  </div>
                  <p className="text-gray-600 dark:text-gray-200">
                    To create a trusted platform that connects students with
                    qualified tutors, fostering educational growth and academic
                    excellence across Bangladesh.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Card>
                <CardContent className="p-6 md:p-8">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-brand-light rounded-lg flex items-center justify-center text-brand mr-4">
                      <GlobeAltIcon className="h-6 w-6" />
                    </div>
                    <h2 className="text-2xl font-semibold text-gray-900">
                      Our Vision
                    </h2>
                  </div>
                  <p className="text-gray-600">
                    To be the leading tuition management platform in Bangladesh,
                    known for quality, reliability, and innovation in education
                    technology.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>

        {/* How it works */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white text-center mb-8">
            How eTuitionBd Works
          </h2>

          <motion.div
            className="grid md:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div variants={itemVariants}>
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-brand-light dark:bg-indigo-900/50 rounded-full flex items-center justify-center text-brand dark:text-indigo-400 mx-auto mb-4">
                    <span className="text-2xl font-bold">1</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    Post Tuition
                  </h3>
                  <p className="text-gray-600 dark:text-gray-200">
                    Students post their tuition requirements with details about
                    subject, location, and budget.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-brand-light rounded-full flex items-center justify-center text-brand mx-auto mb-4">
                    <span className="text-2xl font-bold">2</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Tutors Apply
                  </h3>
                  <p className="text-gray-600">
                    Qualified tutors apply with their qualifications,
                    experience, and expected salary.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-brand-light rounded-full flex items-center justify-center text-brand mx-auto mb-4">
                    <span className="text-2xl font-bold">3</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Start Learning
                  </h3>
                  <p className="text-gray-600">
                    Students review applications, select a tutor, make payment,
                    and begin their learning journey.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </section>

        {/* Why Choose Us */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white text-center mb-8">
            Why Choose eTuitionBd
          </h2>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div variants={itemVariants}>
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center text-emerald-600 mx-auto mb-4">
                    <ShieldCheckIcon className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Verified Tutors
                  </h3>
                  <p className="text-gray-600 text-sm">
                    All tutors go through a verification process to ensure
                    quality and safety.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 mx-auto mb-4">
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
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Secure Payments
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Our payment system ensures transactions are safe and secure
                    for everyone.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center text-amber-600 mx-auto mb-4">
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
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Transparent Tracking
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Track tuition progress, payments, and schedules in one
                    place.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600 mx-auto mb-4">
                    <UserGroupIcon className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Dedicated Support
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Our support team is always ready to help with any questions
                    or issues.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </section>

        {/* Team Section */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white text-center mb-8">
            Meet Our Team
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-24 h-24 rounded-full bg-gray-200 dark:bg-gray-700 mx-auto mb-4"></div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                  John Doe
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-300 mb-2">
                  CEO & Founder
                </p>
                <p className="text-gray-600 dark:text-gray-200 text-sm">
                  Passionate about education technology with over 10 years of
                  experience.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-24 h-24 rounded-full bg-gray-200 mx-auto mb-4"></div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  Jane Smith
                </h3>
                <p className="text-sm text-gray-500 mb-2">CTO</p>
                <p className="text-gray-600 text-sm">
                  Tech enthusiast focused on building scalable educational
                  platforms.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-24 h-24 rounded-full bg-gray-200 mx-auto mb-4"></div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  Robert Johnson
                </h3>
                <p className="text-sm text-gray-500 mb-2">Head of Operations</p>
                <p className="text-gray-600 text-sm">
                  Ensuring smooth operations and excellent user experience.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center">
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-200 mb-8 max-w-2xl mx-auto">
            Join thousands of students and tutors who are already benefiting
            from eTuitionBd.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register">
              <Button variant="primary">Sign Up Now</Button>
            </Link>
            <Link to="/tuitions">
              <Button variant="outline">Browse Tuitions</Button>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutPage;
