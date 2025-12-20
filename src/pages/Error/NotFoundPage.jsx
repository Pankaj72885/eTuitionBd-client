import { Button } from "@/components/ui/Button";
import { Link } from "react-router";

const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 dark:bg-gray-900 transition-colors duration-200 px-4">
      <div className="text-center">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-brand dark:text-indigo-400">
            404
          </h1>
        </div>
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Page not found
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-md mx-auto">
            Sorry, we couldn't find the page you're looking for. The page might
            have been removed, renamed, or did not exist in the first place.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/">
            <Button variant="primary">Back to Home</Button>
          </Link>
          <Link to="/tuitions">
            <Button variant="outline">Browse Tuitions</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
