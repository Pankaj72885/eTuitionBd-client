import { bookmarksAPI } from "@/api/bookmarks.api";
import { reviewsAPI } from "@/api/reviews.api";
import { usersAPI } from "@/api/users.api";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import ProtectedImage from "@/components/common/ProtectedImage";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/Dialog";
import { Textarea } from "@/components/ui/Textarea";
import { useAuth } from "@/hooks/useAuth";
import {
  AcademicCapIcon,
  BookOpenIcon,
  BookmarkIcon,
  BriefcaseIcon,
  ChatBubbleLeftRightIcon,
  MapPinIcon,
  ShieldCheckIcon,
  StarIcon as StarOutline,
} from "@heroicons/react/24/outline";
import { StarIcon } from "@heroicons/react/24/solid";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
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

  // Bookmark mutation
  const bookmarkMutation = useMutation({
    mutationFn: bookmarksAPI.addBookmark,
    onSuccess: () => {
      toast.success("Tutor bookmarked successfully! 🔖");
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
      toast.success("Review submitted successfully! ⭐");
      setReviewModalOpen(false);
      setReviewData({ rating: 5, comment: "" });
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
    bookmarkMutation.mutate({ type: "tutor", targetId: id });
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
      <div className="min-h-screen flex justify-center items-center bg-gray-50 dark:bg-gray-900">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error || !tutor) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
        <div className="text-center">
          <div className="w-24 h-24 mx-auto mb-6 rounded-3xl bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
            <AcademicCapIcon className="w-12 h-12 text-red-500" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
            Tutor not found
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md">
            The tutor you're looking for doesn't exist or has been removed.
          </p>
          <Button onClick={() => navigate("/tutors")}>Browse Tutors</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950 transition-colors duration-300">
      {/* Hero Header with Gradient */}
      <section className="relative">
        <div className="h-40 md:h-52 bg-linear-to-r from-purple-600 via-indigo-600 to-indigo-500 dark:from-purple-700 dark:via-indigo-700 dark:to-indigo-600">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.05%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')] opacity-30" />
        </div>

        <div className="max-w-4xl mx-auto px-4 md:px-6 -mt-20 md:-mt-24 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="overflow-hidden">
              <CardContent className="p-6 md:p-8">
                <div className="flex flex-col md:flex-row gap-6">
                  {/* Profile Image */}
                  <div className="relative shrink-0">
                    <ProtectedImage
                      src={tutor.photoUrl}
                      alt={tutor.name}
                      className="w-28 h-28 md:w-32 md:h-32 rounded-2xl object-cover ring-4 ring-white dark:ring-gray-800 shadow-xl"
                    />
                    <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center shadow-lg">
                      <ShieldCheckIcon className="w-5 h-5 text-white" />
                    </div>
                  </div>

                  {/* Info */}
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-3 mb-2">
                      <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                        {tutor.name}
                      </h1>
                      <span className="px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 text-sm font-medium">
                        Verified Tutor
                      </span>
                    </div>

                    <p className="text-gray-600 dark:text-gray-400 flex items-center gap-2 mb-4">
                      <MapPinIcon className="w-4 h-4" />
                      {tutor.city} • {tutor.experienceYears}+ years experience
                    </p>

                    {/* Stats Row */}
                    <div className="flex flex-wrap items-center gap-6">
                      <div className="flex items-center gap-2">
                        <div className="flex items-center text-amber-400">
                          <StarIcon className="w-5 h-5" />
                          <span className="ml-1 font-bold text-gray-900 dark:text-white">
                            {tutor.averageRating?.toFixed(1) || "4.8"}
                          </span>
                        </div>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          ({tutor.reviewCount || 32} reviews)
                        </span>
                      </div>

                      <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                        <BriefcaseIcon className="w-5 h-5" />
                        <span className="text-sm">
                          {tutor.experienceYears || 5}+ years
                        </span>
                      </div>

                      <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                        <BookOpenIcon className="w-5 h-5" />
                        <span className="text-sm">
                          {tutor.subjects?.length || 3} subjects
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col gap-3 shrink-0">
                    {user?.role === "student" && (
                      <>
                        <Button
                          variant="outline"
                          onClick={handleBookmark}
                          disabled={bookmarkMutation.isPending}
                          className="gap-2"
                        >
                          <BookmarkIcon className="w-4 h-4" />
                          {bookmarkMutation.isPending
                            ? "Saving..."
                            : "Bookmark"}
                        </Button>
                        <Button
                          variant="primary"
                          onClick={handleReview}
                          className="gap-2"
                        >
                          <ChatBubbleLeftRightIcon className="w-4 h-4" />
                          Leave Review
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Content Sections */}
      <section className="py-10 md:py-16">
        <div className="max-w-4xl mx-auto px-4 md:px-6 space-y-6">
          {/* About Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card>
              <CardContent className="p-6 md:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                    <AcademicCapIcon className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                    About
                  </h2>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
                      Qualifications
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300">
                      {tutor.qualifications ||
                        "Bachelor's in relevant field with teaching certifications."}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
                      Experience
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300">
                      {tutor.experienceYears}+ years of teaching experience with
                      students from various backgrounds.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Subjects & Classes */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card>
              <CardContent className="p-6 md:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center">
                    <BookOpenIcon className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                    Subjects & Classes
                  </h2>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
                      Subjects
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {tutor.subjects?.length > 0 ? (
                        tutor.subjects.map((subject, index) => (
                          <span
                            key={index}
                            className="px-3 py-1.5 rounded-xl text-sm font-medium bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400"
                          >
                            {subject}
                          </span>
                        ))
                      ) : (
                        <p className="text-gray-500 dark:text-gray-400 text-sm">
                          No subjects specified
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
                      Class Levels
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {tutor.classLevels?.length > 0 ? (
                        tutor.classLevels.map((level, index) => (
                          <span
                            key={index}
                            className="px-3 py-1.5 rounded-xl text-sm font-medium bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
                          >
                            {level}
                          </span>
                        ))
                      ) : (
                        <p className="text-gray-500 dark:text-gray-400 text-sm">
                          No class levels specified
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Reviews Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card>
              <CardContent className="p-6 md:p-8">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
                      <StarOutline className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                    </div>
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                      Reviews
                    </h2>
                  </div>
                  {user?.role === "student" && (
                    <Button variant="outline" size="sm" onClick={handleReview}>
                      Write Review
                    </Button>
                  )}
                </div>

                {reviewsLoading ? (
                  <div className="flex justify-center py-8">
                    <LoadingSpinner />
                  </div>
                ) : reviews?.data?.length > 0 ? (
                  <div className="space-y-6">
                    {reviews.data.map((review) => (
                      <div
                        key={review._id}
                        className="pb-6 border-b border-gray-100 dark:border-gray-700/50 last:border-0 last:pb-0"
                      >
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <StarIcon
                                key={i}
                                className={`w-4 h-4 ${
                                  i < review.rating
                                    ? "text-amber-400"
                                    : "text-gray-200 dark:text-gray-700"
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-sm text-gray-500 dark:text-gray-400">
                            {new Date(review.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-gray-700 dark:text-gray-300">
                          {review.comment}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                      <ChatBubbleLeftRightIcon className="w-8 h-8 text-gray-400" />
                    </div>
                    <p className="text-gray-500 dark:text-gray-400">
                      No reviews yet. Be the first to leave one!
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Review Modal */}
      <Dialog open={reviewModalOpen} onOpenChange={setReviewModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Leave a Review for {tutor.name}</DialogTitle>
          </DialogHeader>
          <div className="space-y-6 py-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                Your Rating
              </label>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((rating) => (
                  <button
                    key={rating}
                    type="button"
                    className="focus:outline-none transition-transform hover:scale-110"
                    onClick={() => setReviewData({ ...reviewData, rating })}
                  >
                    <StarIcon
                      className={`w-8 h-8 ${
                        rating <= reviewData.rating
                          ? "text-amber-400"
                          : "text-gray-300 dark:text-gray-600"
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Your Review
              </label>
              <Textarea
                rows={4}
                placeholder="Share your experience with this tutor..."
                value={reviewData.comment}
                onChange={(e) =>
                  setReviewData({ ...reviewData, comment: e.target.value })
                }
                className="rounded-xl"
              />
            </div>

            <div className="flex gap-3 pt-2">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setReviewModalOpen(false)}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                className="flex-1"
                onClick={handleSubmitReview}
                disabled={reviewMutation.isPending}
              >
                {reviewMutation.isPending ? "Submitting..." : "Submit Review"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TutorProfilePage;
