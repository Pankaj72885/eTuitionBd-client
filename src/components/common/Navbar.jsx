import ThemeToggle from "@/components/common/ThemeToggle";
import { Button } from "@/components/ui/Button";
import { Dropdown, DropdownItem } from "@/components/ui/Dropdown";
import { useAuth } from "@/hooks/useAuth";
import {
  ArrowRightEndOnRectangleIcon,
  Bars3Icon,
  Squares2X2Icon,
  UserCircleIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/tuitions", label: "Tuitions" },
    { path: "/tutors", label: "Tutors" },
    { path: "/about", label: "About" },
    { path: "/contact", label: "Contact" },
  ];

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl shadow-lg shadow-black/5 dark:shadow-black/20"
          : "bg-white dark:bg-gray-900"
      } border-b border-gray-200/50 dark:border-gray-800/50`}
    >
      <nav className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 md:h-18">
          <div className="flex items-center">
            {/* Logo */}
            <div className="shrink-0 flex items-center">
              <Link to="/" className="flex items-center gap-2 group">
                <div className="w-9 h-9 rounded-xl bg-linear-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg group-hover:shadow-indigo-500/30 transition-all duration-300">
                  <span className="text-white font-bold text-lg">e</span>
                </div>
                <span className="text-xl font-bold bg-linear-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">
                  TuitionBd
                </span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:ml-10 md:flex md:items-center md:space-x-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                    isActive(link.path)
                      ? "text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30"
                      : "text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-gray-100 dark:hover:bg-gray-800"
                  }`}
                >
                  {link.label}
                  {isActive(link.path) && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-indigo-500"
                    />
                  )}
                </Link>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Theme Toggle */}
            <ThemeToggle />

            {user ? (
              <div className="hidden md:flex md:items-center gap-3">
                <Button
                  variant="primary"
                  size="sm"
                  className="gap-2 shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/30 transition-all"
                  onClick={() => navigate(`/dashboard/${user.role}`)}
                >
                  <Squares2X2Icon className="w-4 h-4" />
                  Dashboard
                </Button>
                <Dropdown
                  trigger={
                    <div className="flex items-center group cursor-pointer p-1.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                      <img
                        className="h-9 w-9 rounded-xl ring-2 ring-gray-200 dark:ring-gray-700 group-hover:ring-indigo-300 dark:group-hover:ring-indigo-700 transition-all object-cover"
                        src={
                          user.photoUrl ||
                          `https://ui-avatars.com/api/?name=${encodeURIComponent(
                            user.name
                          )}&background=6366f1&color=fff`
                        }
                        alt="Profile"
                      />
                    </div>
                  }
                >
                  <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-700">
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">
                      {user.name}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                      {user.email}
                    </p>
                  </div>
                  <DropdownItem
                    onClick={() => navigate(`/dashboard/${user.role}/profile`)}
                    className="flex items-center gap-2"
                  >
                    <UserCircleIcon className="w-4 h-4" />
                    Profile
                  </DropdownItem>
                  <DropdownItem
                    onClick={handleLogout}
                    className="flex items-center gap-2 text-red-600 dark:text-red-400"
                  >
                    <ArrowRightEndOnRectangleIcon className="w-4 h-4" />
                    Logout
                  </DropdownItem>
                </Dropdown>
              </div>
            ) : (
              <div className="hidden md:flex md:items-center gap-3">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigate("/login")}
                  className={`font-medium ${
                    isActive("/login") ? "bg-gray-100 dark:bg-gray-800" : ""
                  }`}
                >
                  Login
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => navigate("/register")}
                  className="shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/30 transition-all"
                >
                  Get Started
                </Button>
              </div>
            )}

            {/* Mobile menu button */}
            <button
              type="button"
              className="md:hidden p-2 rounded-xl text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <AnimatePresence mode="wait">
                {mobileMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <XMarkIcon className="h-6 w-6" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="open"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Bars3Icon className="h-6 w-6" />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden overflow-hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800"
          >
            <div className="px-4 py-4 space-y-2">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link
                    to={link.path}
                    className={`block px-4 py-3 rounded-xl text-base font-medium transition-all ${
                      isActive(link.path)
                        ? "bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400"
                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </div>

            <div className="px-4 py-4 border-t border-gray-200 dark:border-gray-800">
              {user ? (
                <div className="space-y-3">
                  <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800">
                    <img
                      className="h-12 w-12 rounded-xl object-cover ring-2 ring-gray-200 dark:ring-gray-700"
                      src={
                        user.photoUrl ||
                        `https://ui-avatars.com/api/?name=${encodeURIComponent(
                          user.name
                        )}&background=6366f1&color=fff`
                      }
                      alt="Profile"
                    />
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">
                        {user.name}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {user.email}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      variant="primary"
                      className="w-full"
                      onClick={() => {
                        navigate(`/dashboard/${user.role}`);
                        setMobileMenuOpen(false);
                      }}
                    >
                      Dashboard
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => {
                        navigate(`/dashboard/${user.role}/profile`);
                        setMobileMenuOpen(false);
                      }}
                    >
                      Profile
                    </Button>
                  </div>

                  <Button
                    variant="ghost"
                    className="w-full text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
                    onClick={() => {
                      handleLogout();
                      setMobileMenuOpen(false);
                    }}
                  >
                    <ArrowRightEndOnRectangleIcon className="w-5 h-5 mr-2" />
                    Logout
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-3">
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => {
                      navigate("/login");
                      setMobileMenuOpen(false);
                    }}
                  >
                    Login
                  </Button>
                  <Button
                    variant="primary"
                    className="w-full"
                    onClick={() => {
                      navigate("/register");
                      setMobileMenuOpen(false);
                    }}
                  >
                    Get Started
                  </Button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
