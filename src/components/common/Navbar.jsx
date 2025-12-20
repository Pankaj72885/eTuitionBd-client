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
    <header className="bg-white shadow-sm sticky top-0 z-40">
      <nav className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="shrink-0 flex items-center">
              <Link to="/" className="text-xl font-bold text-brand">
                eTuitionBd
              </Link>
            </div>
            <div className="hidden md:ml-6 md:flex md:space-x-8">
              <Link
                to="/"
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                  isActive("/")
                    ? "border-brand text-gray-900"
                    : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                }`}
              >
                Home
              </Link>
              <Link
                to="/tuitions"
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                  isActive("/tuitions")
                    ? "border-brand text-gray-900"
                    : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                }`}
              >
                Tuitions
              </Link>
              <Link
                to="/tutors"
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                  isActive("/tutors")
                    ? "border-brand text-gray-900"
                    : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                }`}
              >
                Tutors
              </Link>
              <Link
                to="/about"
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                  isActive("/about")
                    ? "border-brand text-gray-900"
                    : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                }`}
              >
                About
              </Link>
              <Link
                to="/contact"
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                  isActive("/contact")
                    ? "border-brand text-gray-900"
                    : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                }`}
              >
                Contact
              </Link>
            </div>
          </div>
          <div className="flex items-center">
            {user ? (
              <div className="hidden md:ml-4 md:shrink-0 md:flex md:items-center">
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
                    <div className="flex items-center">
                      <span className="mr-2 text-sm font-medium text-gray-700">
                        {user.name}
                      </span>
                      <img
                        className="h-8 w-8 rounded-full"
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
                      ? "bg-brand text-white shadow-sm"
                      : "text-brand hover:bg-brand hover:text-white border border-brand"
                  }`}
                  onClick={() => navigate("/login")}
                >
                  Login
                </button>
                <button
                  className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${
                    isActive("/register")
                      ? "bg-brand text-white shadow-sm"
                      : "text-brand hover:bg-brand hover:text-white border border-brand"
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
                className="bg-white p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-brand"
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
        <div className="md:hidden">
          <div className="pt-2 pb-3 space-y-1">
            <Link
              to="/"
              className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${
                isActive("/")
                  ? "bg-brand border-brand text-white"
                  : "border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800"
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/tuitions"
              className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${
                isActive("/tuitions")
                  ? "bg-brand border-brand text-white"
                  : "border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800"
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Tuitions
            </Link>
            <Link
              to="/tutors"
              className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${
                isActive("/tutors")
                  ? "bg-brand border-brand text-white"
                  : "border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800"
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Tutors
            </Link>
            <Link
              to="/about"
              className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${
                isActive("/about")
                  ? "bg-brand border-brand text-white"
                  : "border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800"
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </Link>
            <Link
              to="/contact"
              className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${
                isActive("/contact")
                  ? "bg-brand border-brand text-white"
                  : "border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800"
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact
            </Link>
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200">
            {user ? (
              <div>
                <div className="flex items-center px-4">
                  <div className="shrink-0">
                    <img
                      className="h-10 w-10 rounded-full"
                      src={
                        user.photoUrl ||
                        "https://picsum.photos/seed/user/40/40.jpg"
                      }
                      alt="Profile"
                    />
                  </div>
                  <div className="ml-3">
                    <div className="text-base font-medium text-gray-800">
                      {user.name}
                    </div>
                    <div className="text-sm font-medium text-gray-500">
                      {user.email}
                    </div>
                  </div>
                </div>
                <div className="mt-3 space-y-1">
                  <Link
                    to={`/dashboard/${user.role}`}
                    className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <Link
                    to={`/dashboard/${user.role}/profile`}
                    className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Profile
                  </Link>
                  <button
                    className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100 w-full text-left"
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
              <div className="space-y-2 px-4">
                <button
                  className={`w-full px-4 py-2 text-sm font-medium rounded-md transition-all ${
                    isActive("/login")
                      ? "bg-brand text-white shadow-sm"
                      : "text-brand hover:bg-brand hover:text-white border border-brand"
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
                      ? "bg-brand text-white shadow-sm"
                      : "text-brand hover:bg-brand hover:text-white border border-brand"
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
