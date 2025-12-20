import { bookmarksAPI } from "@/api/bookmarks.api";
import { reviewsAPI } from "@/api/reviews.api";
import { usersAPI } from "@/api/users.api";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import ProtectedImage from "@/components/common/ProtectedImage";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { useAuth } from "@/hooks/useAuth";
import { StarIcon } from "@heroicons/react/24/outline";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router";

const TutorProfilePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [reviewData, setReviewData] = useState({
    rating: 5,
    comment: "",
  });

  // Fetch tutor details
  const {
    data: tutor,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["tutor", id],
    queryFn: () => usersAPI.getUserById(id),
    enabled: !!id,
  });

  // Fetch tutor reviews
  const { data: reviews, isLoading: reviewsLoading } = useQuery({
    queryKey: ["reviews", id],
    queryFn: () => reviewsAPI.getTutorReviews(id),
    enabled: !!id,
  });

  // Bookmark tutor mutation
  const bookmarkMutation = useMutation({
    mutationFn: bookmarksAPI.addBookmark,
    onSuccess: () => {
      toast.success("Tutor bookmarked successfully");
      queryClient.invalidateQueries(["bookmarks"]);
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to bookmark tutor");
    },
  });

  // Submit review mutation
  const reviewMutation = useMutation({
    mutationFn: reviewsAPI.createReview,
    onSuccess: () => {
      toast.success("Review submitted successfully");
      setReviewModalOpen(false);
      setReviewData({
        rating: 5,
        comment: "",
      });
      queryClient.invalidateQueries(["reviews", id]);
      queryClient.invalidateQueries(["tutor", id]);
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to submit review");
    },
  });

  const handleBookmark = () => {
    if (!user) {
      toast.error("Please login to bookmark tutors");
      navigate("/login", { state: { from: `/tutors/${id}` } });
      return;
    }

    bookmarkMutation.mutate({
      type: "tutor",
      targetId: id,
    });
  };

  const handleReview = () => {
    if (!user) {
      toast.error("Please login to leave a review");
      navigate("/login", { state: { from: `/tutors/${id}` } });
      return;
    }

    if (user.role !== "student") {
      toast.error("Only students can leave reviews");
      return;
    }

    setReviewModalOpen(true);
  };

  const handleSubmitReview = () => {
    if (!reviewData.comment) {
      toast.error("Please write a review comment");
      return;
    }

    reviewMutation.mutate({
      tutorId: id,
      rating: reviewData.rating,
      comment: reviewData.comment,
    });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error || !tutor) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-10">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Tutor not found
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            The tutor you're looking for doesn't exist or has been removed.
          </p>
          <Button onClick={() => navigate("/tutors")}>Browse Tutors</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-900 transition-colors duration-200 min-h-screen">
      {/* Hero header */}
      <div className="relative mb-10">
        <div className="h-32 bg-linear-to-r from-indigo-600 dark:from-indigo-700 to-indigo-400 dark:to-indigo-500" />
        <div className="max-w-3xl mx-auto px-4 -mt-10">
          <Card>
            <CardContent className="p-6 flex flex-col sm:flex-row gap-4">
              <ProtectedImage
                src={tutor.photoUrl}
                alt={tutor.name}
                className="w-20 h-20 rounded-full object-cover border-2 border-white shadow"
              />
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {tutor.name}
                  </h1>
                  <span className="px-2 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400 text-xs font-medium">
                    Tutor
                  </span>
                </div>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  {tutor.city} • {tutor.experienceYears}+ years experience
                </p>
                <div className="mt-2 flex flex-wrap items-center gap-3 text-sm">
                  <div className="flex items-center gap-1 text-amber-500">
                    <StarIcon className="h-4 w-4" />
                    {tutor.averageRating || "4.8"}{" "}
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      ({tutor.reviewCount || 32} reviews)
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                {user?.role === "student" && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleBookmark}
                    disabled={bookmarkMutation.isLoading}
                  >
                    {bookmarkMutation.isLoading ? "Saving..." : "Bookmark"}
                  </Button>
                )}
                {user?.role === "student" && (
                  <Button variant="primary" size="sm" onClick={handleReview}>
                    Leave Review
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 space-y-6">
        {/* About section */}
        <Card>
          <CardContent className="p-4 md:p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              About
            </h2>
            <div className="space-y-3">
              <div>
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Qualifications
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  {tutor.qualifications || "No qualifications provided"}
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Experience
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  {tutor.experienceYears}+ years of teaching experience
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Subjects section */}
        <Card>
          <CardContent className="p-4 md:p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Subjects & Classes
            </h2>
            <div className="space-y-3">
              <div>
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Subjects
                </h3>
                <div className="flex flex-wrap gap-2">
                  {tutor.subjects?.length > 0 ? (
                    tutor.subjects.map((subject, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400"
                      >
                        {subject}
                      </span>
                    ))
                  ) : (
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      No subjects specified
                    </p>
                  )}
                </div>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Class Levels
                </h3>
                <div className="flex flex-wrap gap-2">
                  {tutor.classLevels?.length > 0 ? (
                    tutor.classLevels.map((level, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                      >
                        {level}
                      </span>
                    ))
                  ) : (
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      No class levels specified
                    </p>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Reviews section */}
        <Card>
          <CardContent className="p-4 md:p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Reviews
            </h2>
            {reviewsLoading ? (
              <div className="flex justify-center py-4">
                <LoadingSpinner />
              </div>
            ) : reviews?.data?.length > 0 ? (
              <div className="space-y-4">
                {reviews.data.map((review) => (
                  <div
                    key={review._id}
                    className="border-b border-gray-100 dark:border-gray-700 pb-4 last:border-0"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="flex text-amber-400">
                          {[...Array(5)].map((_, i) => (
                            <StarIcon
                              key={i}
                              className={`h-4 w-4 ${
                                i < review.rating
                                  ? "text-amber-400"
                                  : "text-gray-300 dark:text-gray-600"
                              }`}
                              fill="currentColor"
                            />
                          ))}
                        </div>
                        <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
                          {new Date(review.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
                      {review.comment}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500 dark:text-gray-400">
                No reviews yet.
              </p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Review modal */}
      {reviewModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Leave a Review
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Rating
                </label>
                <div className="flex items-center">
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <button
                      key={rating}
                      type="button"
                      className="text-amber-400 hover:text-amber-500 focus:outline-none"
                      onClick={() => setReviewData({ ...reviewData, rating })}
                    >
                      <StarIcon
                        className={`h-6 w-6 ${
                          rating <= reviewData.rating
                            ? "text-amber-400"
                            : "text-gray-300"
                        }`}
                        fill="currentColor"
                      />
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Comment
                </label>
                <textarea
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
                  placeholder="Share your experience with this tutor..."
                  value={reviewData.comment}
                  onChange={(e) =>
                    setReviewData({ ...reviewData, comment: e.target.value })
                  }
                />
              </div>
              <div className="flex justify-end pt-2">
                <Button
                  variant="outline"
                  onClick={() => setReviewModalOpen(false)}
                  className="mr-2"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleSubmitReview}
                  disabled={reviewMutation.isLoading}
                >
                  {reviewMutation.isLoading ? "Submitting..." : "Submit Review"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TutorProfilePage;
