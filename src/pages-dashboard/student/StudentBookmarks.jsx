import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { BookmarkIcon, XMarkIcon, EyeIcon } from "@heroicons/react/24/outline";
import { bookmarksAPI } from "@/api/bookmarks.api";
import {Button} from "@/components/ui/Button";
import {Card, CardContent} from "@/components/ui/Card";
import {Tabs} from "@/components/ui/Tabs";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import ProtectedImage from "@/components/common/ProtectedImage";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

const StudentBookmarks = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState(0);

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

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">My Bookmarks</h1>

      {isLoading ? (
        <div className="flex justify-center py-12">
          <LoadingSpinner size="lg" />
        </div>
      ) : bookmarks?.data?.length > 0 ? (
        <Tabs defaultTab={activeTab}>
          <Tab label={`Tutors (${tutorBookmarks.length})`}>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mt-6">
              {tutorBookmarks.map((bookmark) => (
                <Card key={bookmark._id}>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center">
                        <ProtectedImage
                          src={bookmark.targetId?.photoUrl}
                          alt={bookmark.targetId?.name}
                          className="w-12 h-12 rounded-full mr-3"
                        />
                        <div>
                          <h3 className="text-base font-semibold text-gray-900">
                            {bookmark.targetId?.name}
                          </h3>
                          <p className="text-xs text-gray-500">
                            {bookmark.targetId?.city} •{" "}
                            {bookmark.targetId?.experienceYears}+ years
                          </p>
                        </div>
                      </div>
                      <button
                        type="button"
                        className="text-gray-400 hover:text-gray-500"
                        onClick={() => handleRemoveBookmark(bookmark._id)}
                        disabled={removeBookmarkMutation.isLoading}
                      >
                        <XMarkIcon className="h-5 w-5" />
                      </button>
                    </div>

                    <div className="flex flex-wrap gap-1 mb-3">
                      {bookmark.targetId?.subjects
                        ?.slice(0, 2)
                        .map((subject, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800"
                          >
                            {subject}
                          </span>
                        ))}
                      {bookmark.targetId?.subjects?.length > 2 && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                          +{bookmark.targetId.subjects.length - 2} more
                        </span>
                      )}
                    </div>

                    <div className="flex items-center justify-between text-sm mt-2">
                      <span className="flex items-center gap-1 text-amber-500">
                        <BookmarkIcon className="h-4 w-4" />
                        {bookmark.targetId?.averageRating || "4.8"}{" "}
                        <span className="text-xs text-gray-500">
                          ({bookmark.targetId?.reviewCount || 32} reviews)
                        </span>
                      </span>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            navigate(`/tutors/${bookmark.targetId?._id}`)
                          }
                        >
                          <EyeIcon className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </Tab>

          <Tab label={`Tuitions (${tuitionBookmarks.length})`}>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mt-6">
              {tuitionBookmarks.map((bookmark) => (
                <Card key={bookmark._id}>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="text-base font-semibold text-gray-900">
                          {bookmark.targetId?.subject} for{" "}
                          {bookmark.targetId?.classLevel}
                        </h3>
                        <p className="text-xs text-gray-500">
                          {bookmark.targetId?.location} •{" "}
                          {bookmark.targetId?.mode}
                        </p>
                      </div>
                      <button
                        type="button"
                        className="text-gray-400 hover:text-gray-500"
                        onClick={() => handleRemoveBookmark(bookmark._id)}
                        disabled={removeBookmarkMutation.isLoading}
                      >
                        <XMarkIcon className="h-5 w-5" />
                      </button>
                    </div>

                    <div className="text-sm text-gray-600 mb-3">
                      <p>{bookmark.targetId?.schedule}</p>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <span>৳ {bookmark.targetId?.budget} / month</span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          navigate(`/tuitions/${bookmark.targetId?._id}`)
                        }
                      >
                        <EyeIcon className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </Tab>
        </Tabs>
      ) : (
        <Card>
          <CardContent className="p-12 text-center">
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No bookmarks yet
            </h3>
            <p className="text-gray-500 mb-6">
              Start bookmarking tutors and tuitions you're interested in.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button onClick={() => navigate("/tutors")}>Browse Tutors</Button>
              <Button variant="outline" onClick={() => navigate("/tuitions")}>
                Browse Tuitions
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default StudentBookmarks;
