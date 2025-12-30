import { bookmarksAPI } from "@/api/bookmarks.api";
import { usersAPI } from "@/api/users.api";
import Pagination from "@/components/common/Pagination";
import ProtectedImage from "@/components/common/ProtectedImage";
import SkeletonCard from "@/components/common/SkeletonCard";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/Dialog";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { useAuth } from "@/hooks/useAuth";
import { useDebounce } from "@/hooks/useDebounce";
import {
  AdjustmentsHorizontalIcon,
  BookmarkIcon,
  MagnifyingGlassIcon,
  MapPinIcon,
  ShieldCheckIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { StarIcon } from "@heroicons/react/24/solid";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useSearchParams } from "react-router";

const TutorsListPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [filtersOpen, setFiltersOpen] = useState(false);
  const { user } = useAuth();
  const queryClient = useQueryClient();

  // Get current filter values from URL
  const currentPage = parseInt(searchParams.get("page")) || 1;
  const search = searchParams.get("q") || "";
  const subject = searchParams.get("subject") || "";
  const location = searchParams.get("location") || "";
  const rating = searchParams.get("rating") || "";
  const sort = searchParams.get("sort") || "ratingDesc";

  // Debounce search input
  const debouncedSearch = useDebounce(search, 500);

  // Update URL when filters change
  const updateFilters = (newFilters) => {
    const params = new URLSearchParams(searchParams);
    Object.entries(newFilters).forEach(([key, value]) => {
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    });
    if (!newFilters.page) {
      params.set("page", "1");
    }
    setSearchParams(params);
  };

  const handleSearchChange = (e) => {
    updateFilters({ q: e.target.value });
  };

  const handleFilterChange = (filterName, value) => {
    updateFilters({ [filterName]: value });
  };

  const handlePageChange = (page) => {
    updateFilters({ page });
  };

  const clearAllFilters = () => {
    setSearchParams({});
  };

  const hasActiveFilters = search || subject || location || rating;

  const handleBookmark = async (tutorId) => {
    if (!user) {
      toast.error("Please login to bookmark tutors");
      return;
    }

    try {
      await bookmarksAPI.addBookmark({
        type: "tutor",
        targetId: tutorId,
      });
      toast.success("Tutor bookmarked successfully");
      queryClient.invalidateQueries(["tutors"]);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to bookmark tutor");
    }
  };

  // Fetch tutors
  const { data, isLoading, error } = useQuery({
    queryKey: [
      "tutors",
      currentPage,
      debouncedSearch,
      subject,
      location,
      rating,
      sort,
    ],
    queryFn: () =>
      usersAPI.getAllUsers({
        page: currentPage,
        limit: 12,
        role: "tutor",
        q: debouncedSearch,
        subject,
        location,
        rating,
        sort,
      }),
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950 transition-colors duration-300">
      {/* Hero Section */}
      <section className="relative py-16 md:py-20 overflow-hidden">
        <div className="absolute inset-0 mesh-bg" />
        <div className="absolute inset-0 bg-linear-to-b from-purple-500/5 via-transparent to-transparent dark:from-purple-500/10" />

        <div className="max-w-6xl mx-auto px-4 md:px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 mb-4">
              {data?.pagination?.totalItems || "200+"} Verified Tutors
            </span>
            <h1 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Find Expert <span className="gradient-text-brand">Tutors</span>
            </h1>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Connect with qualified tutors who match your learning preferences
              and goals.
            </p>
          </motion.div>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-10 max-w-3xl mx-auto"
          >
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
              </div>
              <Input
                placeholder="Search by name, subject, or location..."
                className="pl-12 pr-4 py-4 text-base rounded-2xl bg-white dark:bg-gray-800 shadow-lg shadow-black/5 dark:shadow-black/20 border-gray-200/80 dark:border-gray-700/50 focus:ring-2 focus:ring-purple-500/50"
                value={search}
                onChange={handleSearchChange}
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Filters and Content */}
      <section className="py-8 md:py-12">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          {/* Filters Row */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div className="flex flex-wrap items-center gap-3">
              {/* Desktop Filters */}
              <div className="hidden md:flex flex-wrap gap-3">
                <Select
                  value={subject}
                  onChange={(e) =>
                    handleFilterChange("subject", e.target.value)
                  }
                  className="min-w-[140px] rounded-xl"
                >
                  <option value="">All Subjects</option>
                  <option value="Math">Math</option>
                  <option value="English">English</option>
                  <option value="Bangla">Bangla</option>
                  <option value="Physics">Physics</option>
                  <option value="Chemistry">Chemistry</option>
                  <option value="Biology">Biology</option>
                  <option value="ICT">ICT</option>
                  <option value="Accounting">Accounting</option>
                </Select>

                <Select
                  value={location}
                  onChange={(e) =>
                    handleFilterChange("location", e.target.value)
                  }
                  className="min-w-[140px] rounded-xl"
                >
                  <option value="">All Locations</option>
                  <option value="Dhaka">Dhaka</option>
                  <option value="Chittagong">Chittagong</option>
                  <option value="Rajshahi">Rajshahi</option>
                  <option value="Khulna">Khulna</option>
                  <option value="Sylhet">Sylhet</option>
                  <option value="Barisal">Barisal</option>
                  <option value="Rangpur">Rangpur</option>
                  <option value="Mymensingh">Mymensingh</option>
                </Select>

                <Select
                  value={rating}
                  onChange={(e) => handleFilterChange("rating", e.target.value)}
                  className="min-w-[140px] rounded-xl"
                >
                  <option value="">All Ratings</option>
                  <option value="4.5">4.5+ Stars</option>
                  <option value="4">4+ Stars</option>
                  <option value="3.5">3.5+ Stars</option>
                  <option value="3">3+ Stars</option>
                </Select>
              </div>

              {/* Mobile Filter Button */}
              <Button
                variant="outline"
                onClick={() => setFiltersOpen(true)}
                className="md:hidden rounded-xl"
              >
                <AdjustmentsHorizontalIcon className="h-5 w-5 mr-2" />
                Filters
                {hasActiveFilters && (
                  <span className="ml-2 w-5 h-5 rounded-full bg-purple-500 text-white text-xs flex items-center justify-center">
                    !
                  </span>
                )}
              </Button>

              {/* Clear Filters */}
              {hasActiveFilters && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearAllFilters}
                  className="text-gray-500 hover:text-red-500"
                >
                  <XMarkIcon className="h-4 w-4 mr-1" />
                  Clear
                </Button>
              )}
            </div>

            {/* Sort */}
            <Select
              value={sort}
              onChange={(e) => handleFilterChange("sort", e.target.value)}
              className="w-full md:w-auto min-w-[180px] rounded-xl"
            >
              <option value="ratingDesc">Highest Rated</option>
              <option value="ratingAsc">Lowest Rated</option>
              <option value="experienceDesc">Most Experienced</option>
              <option value="experienceAsc">Least Experienced</option>
              <option value="nameAsc">Name: A-Z</option>
              <option value="nameDesc">Name: Z-A</option>
            </Select>
          </div>

          {/* Loading state */}
          {isLoading && (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[...Array(6)].map((_, index) => (
                <SkeletonCard key={index} />
              ))}
            </div>
          )}

          {/* Error state */}
          {error && (
            <div className="text-center py-16">
              <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                <XMarkIcon className="w-10 h-10 text-red-500" />
              </div>
              <p className="text-red-500 dark:text-red-400 mb-4">
                Failed to load tutors. Please try again.
              </p>
              <Button onClick={() => window.location.reload()}>Retry</Button>
            </div>
          )}

          {/* Tutors list */}
          {!isLoading && !error && data?.data?.length > 0 && (
            <>
              <motion.div
                className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {data.data.map((tutor) => (
                  <motion.div key={tutor._id} variants={itemVariants}>
                    <Card className="h-full group overflow-hidden hover:shadow-xl dark:hover:shadow-purple-500/5 transition-all duration-300">
                      <CardContent className="p-6 flex flex-col gap-4">
                        {/* Header with avatar */}
                        <div className="flex items-start gap-4">
                          <div className="relative">
                            <ProtectedImage
                              src={tutor.photoUrl}
                              alt={tutor.name}
                              className="w-16 h-16 rounded-2xl object-cover ring-2 ring-gray-100 dark:ring-gray-700 group-hover:ring-purple-200 dark:group-hover:ring-purple-800 transition-all"
                            />
                            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white dark:border-gray-800 flex items-center justify-center">
                              <ShieldCheckIcon className="w-3 h-3 text-white" />
                            </div>
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white truncate group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                              {tutor.name}
                            </h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1 mt-1">
                              <MapPinIcon className="w-4 h-4 shrink-0" />
                              {tutor.city || "Dhaka"} •{" "}
                              {tutor.experienceYears || 0}+ yrs
                            </p>
                          </div>
                        </div>

                        {/* Subjects */}
                        <div className="flex flex-wrap gap-2">
                          {tutor.subjects?.slice(0, 3).map((subj, index) => (
                            <span
                              key={index}
                              className="px-2.5 py-1 rounded-lg text-xs font-medium bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400"
                            >
                              {subj}
                            </span>
                          ))}
                          {tutor.subjects?.length > 3 && (
                            <span className="px-2.5 py-1 rounded-lg text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400">
                              +{tutor.subjects.length - 3}
                            </span>
                          )}
                        </div>

                        {/* Rating and actions */}
                        <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700/50">
                          <div className="flex items-center gap-1.5">
                            <StarIcon className="w-5 h-5 text-amber-400" />
                            <span className="font-semibold text-gray-900 dark:text-white">
                              {tutor.averageRating?.toFixed(1) || "5.0"}
                            </span>
                            <span className="text-sm text-gray-500 dark:text-gray-400">
                              ({tutor.reviewCount || 0})
                            </span>
                          </div>
                          <div className="flex gap-2">
                            {user?.role === "student" && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleBookmark(tutor._id)}
                                className="p-2 hover:bg-purple-50 dark:hover:bg-purple-900/30"
                              >
                                <BookmarkIcon className="h-5 w-5" />
                              </Button>
                            )}
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => navigate(`/tutors/${tutor._id}`)}
                              className="group-hover:bg-purple-50 dark:group-hover:bg-purple-950/50 group-hover:border-purple-300 dark:group-hover:border-purple-700"
                            >
                              View Profile
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>

              {/* Pagination */}
              {data.pagination && data.pagination.totalPages > 1 && (
                <div className="flex justify-center mt-10">
                  <Pagination
                    currentPage={currentPage}
                    totalPages={data.pagination.totalPages}
                    onPageChange={handlePageChange}
                  />
                </div>
              )}
            </>
          )}

          {/* Empty state */}
          {!isLoading && !error && data?.data?.length === 0 && (
            <div className="text-center py-16">
              <div className="w-24 h-24 mx-auto mb-6 rounded-3xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                <MagnifyingGlassIcon className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                No tutors found
              </h3>
              <p className="text-gray-500 dark:text-gray-400 mb-6">
                Try adjusting your search or filter criteria
              </p>
              <Button variant="outline" onClick={clearAllFilters}>
                Clear all filters
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Mobile filters dialog */}
      <Dialog open={filtersOpen} onOpenChange={setFiltersOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Filter Tutors</DialogTitle>
          </DialogHeader>
          <div className="space-y-5 py-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Subject
              </label>
              <Select
                value={subject}
                onChange={(e) => handleFilterChange("subject", e.target.value)}
                className="w-full rounded-xl"
              >
                <option value="">All Subjects</option>
                <option value="Math">Math</option>
                <option value="English">English</option>
                <option value="Bangla">Bangla</option>
                <option value="Physics">Physics</option>
                <option value="Chemistry">Chemistry</option>
                <option value="Biology">Biology</option>
                <option value="ICT">ICT</option>
                <option value="Accounting">Accounting</option>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Location
              </label>
              <Select
                value={location}
                onChange={(e) => handleFilterChange("location", e.target.value)}
                className="w-full rounded-xl"
              >
                <option value="">All Locations</option>
                <option value="Dhaka">Dhaka</option>
                <option value="Chittagong">Chittagong</option>
                <option value="Rajshahi">Rajshahi</option>
                <option value="Khulna">Khulna</option>
                <option value="Sylhet">Sylhet</option>
                <option value="Barisal">Barisal</option>
                <option value="Rangpur">Rangpur</option>
                <option value="Mymensingh">Mymensingh</option>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Rating
              </label>
              <Select
                value={rating}
                onChange={(e) => handleFilterChange("rating", e.target.value)}
                className="w-full rounded-xl"
              >
                <option value="">All Ratings</option>
                <option value="4.5">4.5+ Stars</option>
                <option value="4">4+ Stars</option>
                <option value="3.5">3.5+ Stars</option>
                <option value="3">3+ Stars</option>
              </Select>
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => {
                  clearAllFilters();
                  setFiltersOpen(false);
                }}
              >
                Clear All
              </Button>
              <Button
                variant="primary"
                className="flex-1"
                onClick={() => setFiltersOpen(false)}
              >
                Apply Filters
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TutorsListPage;
