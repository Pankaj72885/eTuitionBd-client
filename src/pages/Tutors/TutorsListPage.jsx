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
  MagnifyingGlassIcon,
  StarIcon,
} from "@heroicons/react/24/outline";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import toast from "react-hot-toast";
import { useSearchParams } from "react-router";

const TutorsListPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
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

    // Update each filter
    Object.entries(newFilters).forEach(([key, value]) => {
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    });

    // Reset to page 1 when filters change (except for page itself)
    if (!newFilters.page) {
      params.set("page", "1");
    }

    setSearchParams(params);
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    updateFilters({ q: e.target.value });
  };

  // Handle filter changes
  const handleFilterChange = (filterName, value) => {
    updateFilters({ [filterName]: value });
  };

  // Handle pagination
  const handlePageChange = (page) => {
    updateFilters({ page });
  };

  // Handle bookmark
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

  // Fetch tutors with current filters
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

  return (
    <section className="py-12 md:py-16">
      <div className="max-w-6xl mx-auto px-4 md:px-6 space-y-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-semibold text-gray-900">
            Find Tutors
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            Discover qualified tutors for your learning needs.
          </p>
        </div>

        {/* Search and sort */}
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <div className="flex-1">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MagnifyingGlassIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </div>
              <Input
                placeholder="Search by name or subject..."
                className="pl-10"
                value={search}
                onChange={handleSearchChange}
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <Select
              value={sort}
              onChange={(e) => handleFilterChange("sort", e.target.value)}
              className="w-auto"
            >
              <option value="ratingDesc">Highest Rated</option>
              <option value="ratingAsc">Lowest Rated</option>
              <option value="experienceDesc">Most Experienced</option>
              <option value="experienceAsc">Least Experienced</option>
              <option value="nameAsc">Name: A-Z</option>
              <option value="nameDesc">Name: Z-A</option>
            </Select>

            <Button
              variant="outline"
              onClick={() => setFiltersOpen(true)}
              className="md:hidden"
            >
              <AdjustmentsHorizontalIcon className="h-5 w-5 mr-2" />
              Filters
            </Button>
          </div>
        </div>

        {/* Filters row for desktop */}
        <div className="hidden md:flex flex-wrap gap-3">
          <Select
            value={subject}
            onChange={(e) => handleFilterChange("subject", e.target.value)}
            className="w-auto"
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
            onChange={(e) => handleFilterChange("location", e.target.value)}
            className="w-auto"
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
            className="w-auto"
          >
            <option value="">All Ratings</option>
            <option value="4.5">4.5+ Stars</option>
            <option value="4">4+ Stars</option>
            <option value="3.5">3.5+ Stars</option>
            <option value="3">3+ Stars</option>
          </Select>
        </div>

        {/* Loading state */}
        {isLoading && (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, index) => (
              <SkeletonCard key={index} />
            ))}
          </div>
        )}

        {/* Error state */}
        {error && (
          <div className="text-center py-12">
            <p className="text-red-500 mb-4">
              Failed to load tutors. Please try again.
            </p>
            <Button onClick={() => window.location.reload()}>Retry</Button>
          </div>
        )}

        {/* Tutors list */}
        {!isLoading && !error && data?.data?.length > 0 && (
          <>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {data.data.map((tutor) => (
                <Card
                  key={tutor._id}
                  className="hover:shadow-md transition-shadow"
                >
                  <CardContent className="p-5 flex flex-col gap-4">
                    <div className="flex items-start gap-3">
                      <ProtectedImage
                        src={tutor.photoUrl}
                        alt={tutor.name}
                        className="w-16 h-16 rounded-full object-cover shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <h3 className="text-base font-semibold text-gray-900 truncate">
                          {tutor.name}
                        </h3>
                        <p className="text-xs text-gray-500 mt-1">
                          {tutor.city || "Dhaka"}
                        </p>
                        <p className="text-xs text-gray-500">
                          {tutor.experienceYears || 0}+ years exp.
                        </p>
                      </div>
                    </div>

                    {/* Subjects */}
                    <div className="flex flex-wrap gap-1">
                      {tutor.subjects?.slice(0, 3).map((subject, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-brand/10 text-brand"
                        >
                          {subject}
                        </span>
                      ))}
                      {tutor.subjects?.length > 3 && (
                        <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-gray-100 text-gray-600">
                          +{tutor.subjects.length - 3}
                        </span>
                      )}
                    </div>

                    {/* Rating and actions */}
                    <div className="flex items-center justify-between pt-2 border-t">
                      <div className="flex items-center gap-1">
                        <StarIcon className="h-4 w-4 fill-amber-400 text-amber-400" />
                        <span className="text-sm font-medium text-gray-900">
                          {tutor.averageRating?.toFixed(1) || "5.0"}
                        </span>
                        <span className="text-xs text-gray-500">
                          ({tutor.reviewCount || 0})
                        </span>
                      </div>
                      <div className="flex gap-2">
                        {user?.role === "student" && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleBookmark(tutor._id)}
                            className="p-2"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                              />
                            </svg>
                          </Button>
                        )}
                        <Button variant="outline" size="sm">
                          View Profile
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Pagination */}
            {data.pagination && (
              <div className="flex justify-center mt-8">
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
          <div className="text-center py-12">
            <p className="text-gray-500 mb-4">
              No tutors found matching your criteria.
            </p>
            <Button variant="outline" onClick={() => setSearchParams({})}>
              Clear filters
            </Button>
          </div>
        )}

        {/* Mobile filters dialog */}
        <Dialog open={filtersOpen} onOpenChange={setFiltersOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Filters</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Subject
                </label>
                <Select
                  value={subject}
                  onChange={(e) =>
                    handleFilterChange("subject", e.target.value)
                  }
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
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Location
                </label>
                <Select
                  value={location}
                  onChange={(e) =>
                    handleFilterChange("location", e.target.value)
                  }
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
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Rating
                </label>
                <Select
                  value={rating}
                  onChange={(e) => handleFilterChange("rating", e.target.value)}
                >
                  <option value="">All Ratings</option>
                  <option value="4.5">4.5+ Stars</option>
                  <option value="4">4+ Stars</option>
                  <option value="3.5">3.5+ Stars</option>
                  <option value="3">3+ Stars</option>
                </Select>
              </div>

              <div className="flex justify-end pt-4 gap-2">
                <Button variant="outline" onClick={() => setFiltersOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setFiltersOpen(false)}>
                  Apply Filters
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};

export default TutorsListPage;
