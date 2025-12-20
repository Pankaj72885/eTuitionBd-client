import ThemeToggle from "@/components/common/ThemeToggle";
import { Button } from "@/components/ui/Button";
import { Dropdown, DropdownItem } from "@/components/ui/Dropdown";
import { useAuth } from "@/hooks/useAuth";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <header className="bg-white dark:bg-gray-900 shadow-sm sticky top-0 z-40 transition-colors duration-200 border-b border-gray-200 dark:border-gray-800">
      <nav className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="shrink-0 flex items-center">
              <Link
                to="/"
                className="text-xl font-bold text-brand dark:text-indigo-400"
              >
                eTuitionBd
              </Link>
            </div>
            <div className="hidden md:ml-6 md:flex md:space-x-8">
              <Link
                to="/"
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors duration-200 ${
                  isActive("/")
                    ? "border-brand dark:border-indigo-400 text-gray-900 dark:text-gray-100"
                    : "border-transparent text-gray-500 dark:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600 hover:text-gray-700 dark:hover:text-gray-200"
                }`}
              >
                Home
              </Link>
              <Link
                to="/tuitions"
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors duration-200 ${
                  isActive("/tuitions")
                    ? "border-brand dark:border-indigo-400 text-gray-900 dark:text-gray-100"
                    : "border-transparent text-gray-500 dark:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600 hover:text-gray-700 dark:hover:text-gray-200"
                }`}
              >
                Tuitions
              </Link>
              <Link
                to="/tutors"
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors duration-200 ${
                  isActive("/tutors")
                    ? "border-brand dark:border-indigo-400 text-gray-900 dark:text-gray-100"
                    : "border-transparent text-gray-500 dark:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600 hover:text-gray-700 dark:hover:text-gray-200"
                }`}
              >
                Tutors
              </Link>
              <Link
                to="/about"
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors duration-200 ${
                  isActive("/about")
                    ? "border-brand dark:border-indigo-400 text-gray-900 dark:text-gray-100"
                    : "border-transparent text-gray-500 dark:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600 hover:text-gray-700 dark:hover:text-gray-200"
                }`}
              >
                About
              </Link>
              <Link
                to="/contact"
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors duration-200 ${
                  isActive("/contact")
                    ? "border-brand dark:border-indigo-400 text-gray-900 dark:text-gray-100"
                    : "border-transparent text-gray-500 dark:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600 hover:text-gray-700 dark:hover:text-gray-200"
                }`}
              >
                Contact
              </Link>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {/* Theme Toggle */}
            <ThemeToggle />

            {user ? (
              <div className="hidden md:ml-2 md:shrink-0 md:flex md:items-center">
                <Button
                  variant="primary"
                  size="sm"
                  className="mr-3"
                  onClick={() => navigate(`/dashboard/${user.role}`)}
                >
                  Dashboard
                </Button>
                <Dropdown
                  trigger={
                    <div className="flex items-center group cursor-pointer">
                      <span className="mr-2 text-sm font-medium text-gray-700 dark:text-gray-200 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
                        {user.name}
                      </span>
                      <img
                        className="h-8 w-8 rounded-full ring-2 ring-gray-200 dark:ring-gray-700 group-hover:ring-brand dark:group-hover:ring-indigo-500 transition-all"
                        src={
                          user.photoUrl ||
                          "https://picsum.photos/seed/user/40/40.jpg"
                        }
                        alt="Profile"
                      />
                    </div>
                  }
                >
                  <DropdownItem
                    onClick={() => navigate(`/dashboard/${user.role}/profile`)}
                  >
                    Profile
                  </DropdownItem>
                  <DropdownItem onClick={handleLogout}>Logout</DropdownItem>
                </Dropdown>
              </div>
            ) : (
              <div className="hidden md:ml-4 md:shrink-0 md:flex md:items-center gap-3">
                <button
                  className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${
                    isActive("/login")
                      ? "bg-brand dark:bg-indigo-600 text-white shadow-sm"
                      : "text-brand dark:text-indigo-400 hover:bg-brand dark:hover:bg-indigo-600 hover:text-white border border-brand dark:border-indigo-400"
                  }`}
                  onClick={() => navigate("/login")}
                >
                  Login
                </button>
                <button
                  className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${
                    isActive("/register")
                      ? "bg-brand dark:bg-indigo-600 text-white shadow-sm"
                      : "text-brand dark:text-indigo-400 hover:bg-brand dark:hover:bg-indigo-600 hover:text-white border border-brand dark:border-indigo-400"
                  }`}
                  onClick={() => navigate("/register")}
                >
                  Register
                </button>
              </div>
            )}
            <div className="flex md:hidden ml-2">
              <button
                type="button"
                className="bg-white dark:bg-gray-800 p-2 rounded-md text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-brand dark:focus:ring-indigo-500"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? (
                  <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                ) : (
                  <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 transition-colors duration-200">
          <div className="pt-2 pb-3 space-y-1">
            <Link
              to="/"
              className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium transition-colors duration-200 ${
                isActive("/")
                  ? "bg-brand/10 dark:bg-indigo-900/30 border-brand dark:border-indigo-400 text-brand dark:text-indigo-400"
                  : "border-transparent text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:border-gray-300 dark:hover:border-gray-600 hover:text-gray-800 dark:hover:text-gray-200"
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/tuitions"
              className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium transition-colors duration-200 ${
                isActive("/tuitions")
                  ? "bg-brand/10 dark:bg-indigo-900/30 border-brand dark:border-indigo-400 text-brand dark:text-indigo-400"
                  : "border-transparent text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:border-gray-300 dark:hover:border-gray-600 hover:text-gray-800 dark:hover:text-gray-200"
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Tuitions
            </Link>
            <Link
              to="/tutors"
              className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium transition-colors duration-200 ${
                isActive("/tutors")
                  ? "bg-brand/10 dark:bg-indigo-900/30 border-brand dark:border-indigo-400 text-brand dark:text-indigo-400"
                  : "border-transparent text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:border-gray-300 dark:hover:border-gray-600 hover:text-gray-800 dark:hover:text-gray-200"
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Tutors
            </Link>
            <Link
              to="/about"
              className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium transition-colors duration-200 ${
                isActive("/about")
                  ? "bg-brand/10 dark:bg-indigo-900/30 border-brand dark:border-indigo-400 text-brand dark:text-indigo-400"
                  : "border-transparent text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:border-gray-300 dark:hover:border-gray-600 hover:text-gray-800 dark:hover:text-gray-200"
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </Link>
            <Link
              to="/contact"
              className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium transition-colors duration-200 ${
                isActive("/contact")
                  ? "bg-brand/10 dark:bg-indigo-900/30 border-brand dark:border-indigo-400 text-brand dark:text-indigo-400"
                  : "border-transparent text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:border-gray-300 dark:hover:border-gray-600 hover:text-gray-800 dark:hover:text-gray-200"
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact
            </Link>
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200 dark:border-gray-700">
            {user ? (
              <div>
                <div className="flex items-center px-4">
                  <div className="shrink-0">
                    <img
                      className="h-10 w-10 rounded-full ring-2 ring-gray-200 dark:ring-gray-700"
                      src={
                        user.photoUrl ||
                        "https://picsum.photos/seed/user/40/40.jpg"
                      }
                      alt="Profile"
                    />
                  </div>
                  <div className="ml-3">
                    <div className="text-base font-medium text-gray-800 dark:text-white">
                      {user.name}
                    </div>
                    <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                      {user.email}
                    </div>
                  </div>
                </div>
                <div className="mt-3 space-y-1 px-2">
                  <Link
                    to={`/dashboard/${user.role}`}
                    className="block rounded-md px-3 py-2 text-base font-medium text-gray-500 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <Link
                    to={`/dashboard/${user.role}/profile`}
                    className="block rounded-md px-3 py-2 text-base font-medium text-gray-500 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Profile
                  </Link>
                  <button
                    className="block w-full text-left rounded-md px-3 py-2 text-base font-medium text-gray-500 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    onClick={() => {
                      handleLogout();
                      setMobileMenuOpen(false);
                    }}
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-2 px-4 pb-3">
                <button
                  className={`w-full px-4 py-2 text-sm font-medium rounded-md transition-all ${
                    isActive("/login")
                      ? "bg-brand dark:bg-indigo-600 text-white shadow-sm"
                      : "text-brand dark:text-indigo-400 hover:bg-brand dark:hover:bg-indigo-600 hover:text-white border border-brand dark:border-indigo-400"
                  }`}
                  onClick={() => {
                    navigate("/login");
                    setMobileMenuOpen(false);
                  }}
                >
                  Login
                </button>
                <button
                  className={`w-full px-4 py-2 text-sm font-medium rounded-md transition-all ${
                    isActive("/register")
                      ? "bg-brand dark:bg-indigo-600 text-white shadow-sm"
                      : "text-brand dark:text-indigo-400 hover:bg-brand dark:hover:bg-indigo-600 hover:text-white border border-brand dark:border-indigo-400"
                  }`}
                  onClick={() => {
                    navigate("/register");
                    setMobileMenuOpen(false);
                  }}
                >
                  Register
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
