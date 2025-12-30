import {
  BookmarkIcon,
  BookOpenIcon,
  ChartBarIcon,
  ClipboardDocumentListIcon,
  Cog6ToothIcon,
  CreditCardIcon,
  CurrencyDollarIcon,
  DocumentTextIcon,
  HomeIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import { NavLink } from "react-router";
import { useAuth } from "../../hooks/useAuth";

const Sidebar = () => {
  const { user } = useAuth();

  const studentLinks = [
    {
      name: "Dashboard",
      path: `/dashboard/student`,
      icon: HomeIcon,
    },
    {
      name: "My Tuitions",
      path: `/dashboard/student/tuitions`,
      icon: BookOpenIcon,
    },
    {
      name: "Post New Tuition",
      path: `/dashboard/student/post-tuition`,
      icon: DocumentTextIcon,
    },
    {
      name: "Applied Tutors",
      path: `/dashboard/student/applications`,
      icon: UserGroupIcon,
    },
    {
      name: "Payments",
      path: `/dashboard/student/payments`,
      icon: CreditCardIcon,
    },
    {
      name: "Bookmarks",
      path: `/dashboard/student/bookmarks`,
      icon: BookmarkIcon,
    },
    {
      name: "Profile Settings",
      path: `/dashboard/student/profile`,
      icon: Cog6ToothIcon,
    },
  ];

  const tutorLinks = [
    {
      name: "Dashboard",
      path: `/dashboard/tutor`,
      icon: HomeIcon,
    },
    {
      name: "My Applications",
      path: `/dashboard/tutor/applications`,
      icon: ClipboardDocumentListIcon,
    },
    {
      name: "Ongoing Tuitions",
      path: `/dashboard/tutor/ongoing`,
      icon: BookOpenIcon,
    },
    {
      name: "Revenue History",
      path: `/dashboard/tutor/revenue`,
      icon: CurrencyDollarIcon,
    },
    {
      name: "Profile Settings",
      path: `/dashboard/tutor/profile`,
      icon: Cog6ToothIcon,
    },
  ];

  const adminLinks = [
    {
      name: "Dashboard",
      path: `/dashboard/admin`,
      icon: HomeIcon,
    },
    {
      name: "Analytics",
      path: `/dashboard/admin/analytics`,
      icon: ChartBarIcon,
    },
    {
      name: "User Management",
      path: `/dashboard/admin/users`,
      icon: UserGroupIcon,
    },
    {
      name: "Tuition Management",
      path: `/dashboard/admin/tuitions`,
      icon: BookOpenIcon,
    },
    {
      name: "Reports & Transactions",
      path: `/dashboard/admin/reports`,
      icon: CurrencyDollarIcon,
    },
    {
      name: "Profile Settings",
      path: `/dashboard/admin/profile`,
      icon: Cog6ToothIcon,
    },
  ];

  const getLinks = () => {
    switch (user?.role) {
      case "student":
        return studentLinks;
      case "tutor":
        return tutorLinks;
      case "admin":
        return adminLinks;
      default:
        return [];
    }
  };

  return (
    <div className="flex flex-col w-64 h-screen bg-white dark:bg-slate-900 border-r border-gray-200 dark:border-none transition-colors duration-200">
      <div className="flex flex-col flex-1 pt-5 overflow-y-auto">
        <div className="flex items-center shrink-0 px-4">
          <div className="flex items-center">
            <div className="shrink-0">
              <img
                className="h-8 w-auto"
                src="https://picsum.photos/seed/logo/40/40.jpg"
                alt="eTuitionBd"
              />
            </div>
            <div className="ml-3">
              <p className="text-gray-900 dark:text-white text-sm font-medium">
                eTuitionBd
              </p>
              <p className="text-gray-500 dark:text-slate-300 text-xs capitalize">
                {user?.role} Dashboard
              </p>
            </div>
          </div>
        </div>
        <div className="mt-8 flex-1 flex flex-col">
          <nav className="flex-1 px-2 pb-4 space-y-1">
            {getLinks().map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  `${
                    isActive
                      ? "bg-brand text-white"
                      : "text-gray-600 dark:text-slate-200 hover:bg-gray-100 dark:hover:bg-slate-800 hover:text-gray-900 dark:hover:text-white"
                  } group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors duration-150`
                }
              >
                {({ isActive }) => (
                  <>
                    <link.icon
                      className={`${
                        isActive
                          ? "text-white"
                          : "text-gray-400 dark:text-slate-300 group-hover:text-gray-500 dark:group-hover:text-slate-300"
                      } mr-3 shrink-0 h-5 w-5 transition-colors duration-150`}
                      aria-hidden="true"
                    />
                    {link.name}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          {/* Main Site Links */}
          <div className="px-2 pb-4 border-t border-gray-200 dark:border-slate-700 pt-4 mt-4">
            <p className="px-2 text-xs font-semibold text-gray-400 dark:text-slate-300 uppercase tracking-wider mb-2">
              Main Site
            </p>
            <div className="space-y-1">
              <NavLink
                to="/"
                className="text-gray-600 dark:text-slate-200 hover:bg-gray-100 dark:hover:bg-slate-800 hover:text-gray-900 dark:hover:text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors duration-150"
              >
                <HomeIcon
                  className="text-gray-400 dark:text-slate-300 group-hover:text-gray-500 dark:group-hover:text-slate-300 mr-3 shrink-0 h-5 w-5 transition-colors duration-150"
                  aria-hidden="true"
                />
                Home
              </NavLink>
              <NavLink
                to="/tuitions"
                className="text-gray-600 dark:text-slate-200 hover:bg-gray-100 dark:hover:bg-slate-800 hover:text-gray-900 dark:hover:text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors duration-150"
              >
                <BookOpenIcon
                  className="text-gray-400 dark:text-slate-300 group-hover:text-gray-500 dark:group-hover:text-slate-300 mr-3 shrink-0 h-5 w-5 transition-colors duration-150"
                  aria-hidden="true"
                />
                Tuitions
              </NavLink>
              <NavLink
                to="/tutors"
                className="text-gray-600 dark:text-slate-200 hover:bg-gray-100 dark:hover:bg-slate-800 hover:text-gray-900 dark:hover:text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors duration-150"
              >
                <UserGroupIcon
                  className="text-gray-400 dark:text-slate-300 group-hover:text-gray-500 dark:group-hover:text-slate-300 mr-3 shrink-0 h-5 w-5 transition-colors duration-150"
                  aria-hidden="true"
                />
                Tutors
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
