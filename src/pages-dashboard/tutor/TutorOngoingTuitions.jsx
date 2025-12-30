import { applicationsAPI } from "@/api/applications.api";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import StatusBadge from "@/components/ui/StatusBadge";
import {
  BookOpenIcon,
  CalendarIcon,
  ChatBubbleLeftRightIcon,
  ClockIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { useNavigate } from "react-router";

const TutorOngoingTuitions = () => {
  const navigate = useNavigate();

  // Fetch tutor's applications
  const { data: applications, isLoading } = useQuery({
    queryKey: ["tutorApplications"],
    queryFn: applicationsAPI.getTutorApplications,
  });

  // Filter for approved applications (ongoing tuitions)
  const ongoingTuitions =
    applications?.data?.filter((app) => app.status === "Approved") || [];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
          <BookOpenIcon className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Ongoing Tuitions
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            {ongoingTuitions.length} active tuition
            {ongoingTuitions.length !== 1 ? "s" : ""}
          </p>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-16">
          <LoadingSpinner size="lg" />
        </div>
      ) : ongoingTuitions.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2">
          {ongoingTuitions.map((application, index) => (
            <motion.div
              key={application._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="card-hover h-full">
                <CardContent className="p-5 flex flex-col h-full">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        {application.tuitionId?.subject}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {application.tuitionId?.classLevel}
                      </p>
                    </div>
                    <StatusBadge status="Ongoing" />
                  </div>

                  <div className="space-y-2 flex-1 mb-4">
                    <p className="text-sm text-gray-600 dark:text-gray-300 flex items-center gap-2">
                      <span className="w-5 h-5 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                        <svg
                          className="w-3 h-3 text-gray-500"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </span>
                      Student: {application.tuitionId?.studentId?.name}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-300 flex items-center gap-2">
                      <span className="w-5 h-5 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                        <MapPinIcon className="w-3 h-3 text-gray-500" />
                      </span>
                      {application.tuitionId?.location}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-300 flex items-center gap-2">
                      <span className="w-5 h-5 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                        <ClockIcon className="w-3 h-3 text-gray-500" />
                      </span>
                      {application.tuitionId?.schedule}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-2">
                      <span className="w-5 h-5 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                        <CalendarIcon className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                      </span>
                      Started:{" "}
                      {new Date(application.updatedAt).toLocaleDateString()}
                    </p>
                  </div>

                  <div className="flex gap-2 pt-4 border-t border-gray-100 dark:border-gray-700">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 gap-2"
                      onClick={() =>
                        navigate(`/dashboard/tutor/chat/${application._id}`)
                      }
                    >
                      <ChatBubbleLeftRightIcon className="h-4 w-4" />
                      Chat
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 gap-2"
                      onClick={() =>
                        navigate(`/dashboard/tutor/calendar/${application._id}`)
                      }
                    >
                      <CalendarIcon className="h-4 w-4" />
                      Calendar
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card>
            <CardContent className="py-16 text-center">
              <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                <BookOpenIcon className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                No ongoing tuitions
              </h3>
              <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-md mx-auto">
                You don't have any approved applications yet. Keep applying to
                tuitions to get started!
              </p>
              <Button onClick={() => navigate("/tuitions")}>
                Browse Tuitions
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  );
};

export default TutorOngoingTuitions;
