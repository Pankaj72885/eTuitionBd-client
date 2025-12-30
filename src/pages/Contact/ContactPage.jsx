import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import {
  ChatBubbleLeftRightIcon,
  CheckCircleIcon,
  ClockIcon,
  EnvelopeIcon,
  MapPinIcon,
  PaperAirplaneIcon,
  PhoneIcon,
} from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const ContactPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success(
        "Message sent successfully! We'll get back to you soon. 🎉"
      );
      reset();
    } catch (error) {
      toast.error("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  const contactInfo = [
    {
      icon: EnvelopeIcon,
      label: "Email",
      value: "info@etuitionbd.com",
      href: "mailto:info@etuitionbd.com",
      color: "from-indigo-500 to-purple-500",
    },
    {
      icon: PhoneIcon,
      label: "Phone",
      value: "+880 1234 567890",
      href: "tel:+8801234567890",
      color: "from-emerald-500 to-teal-500",
    },
    {
      icon: MapPinIcon,
      label: "Location",
      value: "Rajshahi, Bangladesh",
      href: null,
      color: "from-pink-500 to-rose-500",
    },
    {
      icon: ClockIcon,
      label: "Office Hours",
      value: "Mon - Sat: 9AM - 6PM",
      href: null,
      color: "from-amber-500 to-orange-500",
    },
  ];

  const faqs = [
    {
      question: "How do I become a tutor on eTuitionBd?",
      answer:
        "Simply register as a tutor, fill out your profile with qualifications and experience, and start applying to tuition opportunities that match your expertise.",
    },
    {
      question: "How are payments processed?",
      answer:
        "We use a secure payment system. Students pay through our platform, and funds are released to tutors after the agreed-upon milestones or completion of the tuition period.",
    },
    {
      question: "Is there a fee for using eTuitionBd?",
      answer:
        "Registration is free for both students and tutors. We charge a small commission from successful tuition arrangements to maintain and improve our platform.",
    },
    {
      question: "How do you verify tutors?",
      answer:
        "We verify tutors through a multi-step process including ID verification, educational credential checks, and reference verification when needed.",
    },
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
              <ChatBubbleLeftRightIcon className="w-10 h-10 text-white" />
            </motion.div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Contact <span className="gradient-text-brand">Us</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Have questions or feedback? We'd love to hear from you. Reach out
              using the form below or contact information.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-8 -mt-8">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {contactInfo.map((item, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Card className="h-full group card-hover">
                  <CardContent className="p-5 text-center">
                    <div
                      className={`w-12 h-12 mx-auto mb-3 rounded-xl bg-linear-to-br ${item.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}
                    >
                      <item.icon className="w-6 h-6 text-white" />
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                      {item.label}
                    </p>
                    {item.href ? (
                      <a
                        href={item.href}
                        className="text-sm font-semibold text-gray-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">
                        {item.value}
                      </p>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Contact Form & Map */}
      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-5 gap-8">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-3"
            >
              <Card className="overflow-hidden">
                <div className="h-2 bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500" />
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    Send us a Message
                  </h2>
                  <p className="text-gray-500 dark:text-gray-400 mb-8">
                    Fill out the form below and we'll get back to you as soon as
                    possible.
                  </p>

                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label
                          htmlFor="name"
                          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                        >
                          Full Name
                        </label>
                        <Input
                          id="name"
                          placeholder="Your name"
                          className="rounded-xl"
                          {...register("name", {
                            required: "Name is required",
                          })}
                          error={errors.name?.message}
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                        >
                          Email Address
                        </label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="your@email.com"
                          className="rounded-xl"
                          {...register("email", {
                            required: "Email is required",
                            pattern: {
                              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                              message: "Invalid email address",
                            },
                          })}
                          error={errors.email?.message}
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="subject"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                      >
                        Subject
                      </label>
                      <Input
                        id="subject"
                        placeholder="What's this about?"
                        className="rounded-xl"
                        {...register("subject", {
                          required: "Subject is required",
                        })}
                        error={errors.subject?.message}
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="message"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                      >
                        Message
                      </label>
                      <Textarea
                        id="message"
                        rows={5}
                        placeholder="Tell us more about your inquiry..."
                        className="rounded-xl"
                        {...register("message", {
                          required: "Message is required",
                          minLength: {
                            value: 10,
                            message: "Message must be at least 10 characters",
                          },
                        })}
                        error={errors.message?.message}
                      />
                    </div>

                    <Button
                      type="submit"
                      variant="primary"
                      className="w-full md:w-auto px-8 py-3 glow-hover"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <span className="flex items-center gap-2">
                          <svg
                            className="animate-spin h-5 w-5"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                              fill="none"
                            />
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            />
                          </svg>
                          Sending...
                        </span>
                      ) : (
                        <span className="flex items-center gap-2">
                          <PaperAirplaneIcon className="w-5 h-5" />
                          Send Message
                        </span>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>

            {/* Map / Info Sidebar */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-2 space-y-6"
            >
              {/* Map Placeholder */}
              <Card className="overflow-hidden">
                <div className="h-48 bg-linear-to-br from-indigo-100 to-purple-100 dark:from-indigo-900/30 dark:to-purple-900/30 flex items-center justify-center">
                  <div className="text-center">
                    <MapPinIcon className="w-12 h-12 mx-auto text-indigo-500 dark:text-indigo-400 mb-2" />
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      Rajshahi, Bangladesh
                    </p>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                    Office Location
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    123 Education Street, Shaheb Bazar,
                    <br />
                    Rajshahi 6000, Bangladesh
                  </p>
                </CardContent>
              </Card>

              {/* Quick Response */}
              <Card className="bg-linear-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 border-indigo-200/50 dark:border-indigo-800/50">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-indigo-500 flex items-center justify-center">
                      <CheckCircleIcon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        Quick Response
                      </h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Usually within 24 hours
                      </p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Our dedicated support team is here to help you with any
                    questions or concerns about our platform.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-24 bg-gray-50/50 dark:bg-gray-800/30">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 mb-4">
              Got Questions?
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
              Frequently Asked{" "}
              <span className="gradient-text-brand">Questions</span>
            </h2>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {faqs.map((faq, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Card className="h-full group card-hover">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                      {faq.question}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                      {faq.answer}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
