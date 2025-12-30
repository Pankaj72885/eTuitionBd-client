import { bookmarksAPI } from "@/api/bookmarks.api";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import ProtectedImage from "@/components/common/ProtectedImage";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import {
  BookmarkIcon,
  BookOpenIcon,
  EyeIcon,
  MapPinIcon,
  StarIcon,
  UserGroupIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { BookmarkIcon as BookmarkSolid } from "@heroicons/react/24/solid";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

const StudentBookmarks = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState("tutors");

  // Fetch student's bookmarks
  const { data: bookmarks, isLoading } = useQuery({
    queryKey: ["bookmarks"],
    queryFn: bookmarksAPI.getBookmarks,
  });

  // Remove bookmark mutation
  const removeBookmarkMutation = useMutation({
    mutationFn: bookmarksAPI.removeBookmark,
    onSuccess: () => {
      toast.success("Bookmark removed");
      queryClient.invalidateQueries(["bookmarks"]);
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to remove bookmark");
    },
  });

  const handleRemoveBookmark = (bookmarkId) => {
    removeBookmarkMutation.mutate(bookmarkId);
  };

  const tutorBookmarks =
    bookmarks?.data?.filter((bookmark) => bookmark.type === "tutor") || [];
  const tuitionBookmarks =
    bookmarks?.data?.filter((bookmark) => bookmark.type === "tuition") || [];

  const tabs = [
    {
      id: "tutors",
      label: "Tutors",
      count: tutorBookmarks.length,
      icon: UserGroupIcon,
    },
    {
      id: "tuitions",
      label: "Tuitions",
      count: tuitionBookmarks.length,
      icon: BookOpenIcon,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-2xl bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
          <BookmarkSolid className="w-6 h-6 text-amber-600 dark:text-amber-400" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            My Bookmarks
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            {bookmarks?.data?.length || 0} saved items
          </p>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-16">
          <LoadingSpinner size="lg" />
        </div>
      ) : bookmarks?.data?.length > 0 ? (
        <div className="space-y-6">
          {/* Tabs */}
          <div className="flex gap-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all ${
                  activeTab === tab.id
                    ? "bg-indigo-600 text-white shadow-lg shadow-indigo-200 dark:shadow-indigo-900/30"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                }`}
              >
                <tab.icon className="w-5 h-5" />
                {tab.label}
                <span
                  className={`px-2 py-0.5 text-xs rounded-full ${
                    activeTab === tab.id
                      ? "bg-white/20"
                      : "bg-gray-200 dark:bg-gray-700"
                  }`}
                >
                  {tab.count}
                </span>
              </button>
            ))}
          </div>

          {/* Content */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid gap-4 md:grid-cols-2 lg:grid-cols-3"
          >
            {activeTab === "tutors" ? (
              tutorBookmarks.length > 0 ? (
                tutorBookmarks.map((bookmark) => (
                  <Card
                    key={bookmark._id}
                    className="card-hover overflow-hidden"
                  >
                    <CardContent className="p-5">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center gap-3">
                          <ProtectedImage
                            src={bookmark.targetId?.photoUrl}
                            alt={bookmark.targetId?.name}
                            className="w-12 h-12 rounded-xl object-cover"
                          />
                          <div>
                            <h3 className="font-semibold text-gray-900 dark:text-white">
                              {bookmark.targetId?.name}
                            </h3>
                            <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                              <MapPinIcon className="w-3 h-3" />
                              {bookmark.targetId?.city} •{" "}
                              {bookmark.targetId?.experienceYears}+ yrs
                            </p>
                          </div>
                        </div>
                        <button
                          className="p-2 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                          onClick={() => handleRemoveBookmark(bookmark._id)}
                          disabled={removeBookmarkMutation.isPending}
                        >
                          <XMarkIcon className="h-5 w-5" />
                        </button>
                      </div>

                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {bookmark.targetId?.subjects
                          ?.slice(0, 2)
                          .map((subject, index) => (
                            <span
                              key={index}
                              className="px-2 py-0.5 rounded-md text-xs font-medium bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300"
                            >
                              {subject}
                            </span>
                          ))}
                        {bookmark.targetId?.subjects?.length > 2 && (
                          <span className="px-2 py-0.5 rounded-md text-xs font-medium bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400">
                            +{bookmark.targetId.subjects.length - 2}
                          </span>
                        )}
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1 text-amber-500">
                          <StarIcon className="h-4 w-4 fill-current" />
                          <span className="font-medium">
                            {bookmark.targetId?.averageRating || "4.8"}
                          </span>
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            ({bookmark.targetId?.reviewCount || 32})
                          </span>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            navigate(`/tutors/${bookmark.targetId?._id}`)
                          }
                          className="gap-1"
                        >
                          <EyeIcon className="h-4 w-4" />
                          View
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <div className="col-span-full py-12 text-center">
                  <UserGroupIcon className="w-12 h-12 mx-auto text-gray-300 mb-3" />
                  <p className="text-gray-500 dark:text-gray-400">
                    No tutor bookmarks yet
                  </p>
                </div>
              )
            ) : tuitionBookmarks.length > 0 ? (
              tuitionBookmarks.map((bookmark) => (
                <Card key={bookmark._id} className="card-hover overflow-hidden">
                  <CardContent className="p-5">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">
                          {bookmark.targetId?.subject}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {bookmark.targetId?.classLevel}
                        </p>
                      </div>
                      <button
                        className="p-2 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                        onClick={() => handleRemoveBookmark(bookmark._id)}
                        disabled={removeBookmarkMutation.isPending}
                      >
                        <XMarkIcon className="h-5 w-5" />
                      </button>
                    </div>

                    <div className="space-y-2 mb-4">
                      <p className="text-sm text-gray-600 dark:text-gray-300 flex items-center gap-2">
                        <MapPinIcon className="w-4 h-4 text-gray-400" />
                        {bookmark.targetId?.location}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {bookmark.targetId?.schedule} •{" "}
                        {bookmark.targetId?.mode}
                      </p>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                        ৳ {bookmark.targetId?.budget}/mo
                      </span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          navigate(`/tuitions/${bookmark.targetId?._id}`)
                        }
                        className="gap-1"
                      >
                        <EyeIcon className="h-4 w-4" />
                        View
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="col-span-full py-12 text-center">
                <BookOpenIcon className="w-12 h-12 mx-auto text-gray-300 mb-3" />
                <p className="text-gray-500 dark:text-gray-400">
                  No tuition bookmarks yet
                </p>
              </div>
            )}
          </motion.div>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card>
            <CardContent className="py-16 text-center">
              <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                <BookmarkIcon className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                No bookmarks yet
              </h3>
              <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-md mx-auto">
                Start bookmarking tutors and tuitions you're interested in for
                quick access.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button onClick={() => navigate("/tutors")} className="gap-2">
                  <UserGroupIcon className="w-4 h-4" />
                  Browse Tutors
                </Button>
                <Button
                  variant="outline"
                  onClick={() => navigate("/tuitions")}
                  className="gap-2"
                >
                  <BookOpenIcon className="w-4 h-4" />
                  Browse Tuitions
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  );
};

export default StudentBookmarks;
