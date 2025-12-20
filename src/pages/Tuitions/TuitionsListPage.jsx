import { tuitionsAPI } from "@/api/tuitions.api";
import Pagination from "@/components/common/Pagination";
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
import StatusBadge from "@/components/ui/StatusBadge";
import { useDebounce } from "@/hooks/useDebounce";
import {
  AdjustmentsHorizontalIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router";

const TuitionsListPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [filtersOpen, setFiltersOpen] = useState(false);

  // Get current filter values from URL
  const currentPage = parseInt(searchParams.get("page")) || 1;
  const search = searchParams.get("q") || "";
  const classLevel = searchParams.get("class") || "";
  const subject = searchParams.get("subject") || "";
  const location = searchParams.get("location") || "";
  const sort = searchParams.get("sort") || "dateDesc";

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

    // Reset to page 1 when filters change
    params.set("page", "1");

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

  // Fetch tuitions with current filters
  const { data, isLoading, error } = useQuery({
    queryKey: [
      "tuitions",
      currentPage,
      debouncedSearch,
      classLevel,
      subject,
      location,
      sort,
    ],
    queryFn: () =>
      tuitionsAPI.getTuitions({
        page: currentPage,
        limit: 12,
        q: debouncedSearch,
        class: classLevel,
        subject,
        location,
        sort,
      }),
  });

  return (
    <section className="py-12 md:py-16 bg-white dark:bg-gray-900 transition-colors duration-200">
      <div className="max-w-6xl mx-auto px-4 md:px-6 space-y-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">
            Browse Tuitions
          </h1>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-300">
            Filter and find tuition opportunities that match your expertise.
          </p>
        </div>

        {/* Search and filters */}
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <div className="flex-1">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MagnifyingGlassIcon
                  className="h-5 w-5 text-gray-400 dark:text-gray-400"
                  aria-hidden="true"
                />
              </div>
              <Input
                placeholder="Search by subject or location..."
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
            >
              <option value="dateDesc">Newest first</option>
              <option value="dateAsc">Oldest first</option>
              <option value="budgetAsc">Budget: Low to High</option>
              <option value="budgetDesc">Budget: High to Low</option>
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
            value={classLevel}
            onChange={(e) => handleFilterChange("class", e.target.value)}
            placeholder="Class/Grade"
          >
            <option value="">All Classes</option>
            <option value="Class 1-5">Class 1-5</option>
            <option value="Class 6-8">Class 6-8</option>
            <option value="Class 9-10">Class 9-10</option>
            <option value="SSC">SSC</option>
            <option value="HSC">HSC</option>
            <option value="University">University</option>
          </Select>

          <Select
            value={subject}
            onChange={(e) => handleFilterChange("subject", e.target.value)}
            placeholder="Subject"
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
            placeholder="Location"
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
            <p className="text-red-500 dark:text-red-400 mb-4">
              Failed to load tuitions. Please try again.
            </p>
            <Button onClick={() => window.location.reload()}>Retry</Button>
          </div>
        )}

        {/* Tuitions list */}
        {!isLoading && !error && data?.data?.length > 0 && (
          <>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {data.data.map((tuition) => (
                <Card key={tuition._id}>
                  <CardContent className="p-4 md:p-5 flex flex-col gap-3">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="text-base md:text-lg font-semibold text-gray-900 dark:text-white">
                          {tuition.subject} for {tuition.classLevel}
                        </h3>
                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-300">
                          {tuition.location} • {tuition.mode}
                        </p>
                      </div>
                      <StatusBadge status={tuition.status} />
                    </div>

                    <div className="text-sm text-gray-600 dark:text-gray-200">
                      <p>{tuition.schedule}</p>
                    </div>

                    <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-200">
                      <span>৳ {tuition.budget} / month</span>
                      <span className="text-xs text-gray-400 dark:text-gray-400">
                        Posted{" "}
                        {new Date(tuition.createdAt).toLocaleDateString()}
                      </span>
                    </div>

                    <div className="mt-3">
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full"
                        onClick={() => navigate(`/tuitions/${tuition._id}`)}
                      >
                        View Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Pagination */}
            {data.pagination && (
              <div className="flex justify-center mt-6">
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
            <p className="text-gray-500 dark:text-gray-300 mb-4">
              No tuitions found matching your criteria.
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
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                  Class/Grade
                </label>
                <Select
                  value={classLevel}
                  onChange={(e) => handleFilterChange("class", e.target.value)}
                >
                  <option value="">All Classes</option>
                  <option value="Class 1-5">Class 1-5</option>
                  <option value="Class 6-8">Class 6-8</option>
                  <option value="Class 9-10">Class 9-10</option>
                  <option value="SSC">SSC</option>
                  <option value="HSC">HSC</option>
                  <option value="University">University</option>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
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
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
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

export default TuitionsListPage;
