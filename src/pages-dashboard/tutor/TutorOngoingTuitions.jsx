import React from "react";
import { useQuery } from "@tanstack/react-query";
import {
  ChatBubbleLeftRightIcon,
  CalendarIcon,
} from "@heroicons/react/24/outline";
import { applicationsAPI } from "@/api/applications.api";
import {Button} from "@/components/ui/Button";
import {Card, CardContent} from "@/components/ui/Card";
import StatusBadge from "@/components/ui/StatusBadge";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import ProtectedImage from "@/components/common/ProtectedImage";
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
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">
        Ongoing Tuitions
      </h1>

      {isLoading ? (
        <div className="flex justify-center py-12">
          <LoadingSpinner size="lg" />
        </div>
      ) : ongoingTuitions.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2">
          {ongoingTuitions.map((application) => (
            <Card key={application._id}>
              <CardContent className="p-4 md:p-5 flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-gray-900">
                    {application.tuitionId?.subject} for{" "}
                    {application.tuitionId?.classLevel}
                  </h3>
                  <StatusBadge status="Ongoing" />
                </div>
                <p className="text-xs text-gray-500">
                  Student: {application.tuitionId?.studentId?.name} •{" "}
                  {application.tuitionId?.location}
                </p>
                <p className="text-xs text-gray-500">
                  Schedule: {application.tuitionId?.schedule}
                </p>
                <p className="text-xs text-gray-500">
                  Started:{" "}
                  {new Date(application.updatedAt).toLocaleDateString()}
                </p>
                <div className="mt-2 flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      navigate(`/dashboard/tutor/chat/${application._id}`)
                    }
                  >
                    <ChatBubbleLeftRightIcon className="h-4 w-4 mr-1" />
                    Open Chat
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      navigate(`/dashboard/tutor/calendar/${application._id}`)
                    }
                  >
                    <CalendarIcon className="h-4 w-4 mr-1" />
                    View Calendar
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="p-12 text-center">
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No ongoing tuitions
            </h3>
            <p className="text-gray-500 mb-6">
              You don't have any approved applications yet.
            </p>
            <Button
              onClick={() => navigate("/dashboard/tutor/my-applications")}
            >
              View My Applications
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default TutorOngoingTuitions;
