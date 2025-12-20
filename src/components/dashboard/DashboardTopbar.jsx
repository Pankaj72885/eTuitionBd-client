import { Dropdown, DropdownItem } from "@/components/ui/Dropdown";
import { Bars3Icon, BellIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import ProtectedImage from "../common/ProtectedImage";

const DashboardTopbar = ({ title, breadcrumbs, onMobileMenuClick }) => {
  const { user, logout } = useAuth();
  const [notifications, _setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);

  // Fetch notifications (placeholder)
  useEffect(() => {
    // In a real app, fetch notifications from API
    // const fetchNotifications = async () => {
    //   try {
    //     const data = await notificationsAPI.getNotifications();
    //     setNotifications(data);
    //   } catch (error) {
    //     console.error('Error fetching notifications:', error);
    //   }
    // };
    // fetchNotifications();
  }, []);

  const handleLogout = () => {
    logout();
    window.location.href = "/login";
  };

  return (
    <div className="bg-white shadow-sm border-b border-gray-200">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center gap-4">
            <button
              type="button"
              className="text-gray-500 hover:text-gray-600 focus:outline-none focus:text-gray-600 md:hidden"
              onClick={onMobileMenuClick}
            >
              <Bars3Icon className="h-6 w-6" />
            </button>
            <div>
              <h1 className="text-lg font-semibold text-gray-900">{title}</h1>
              {breadcrumbs && (
                <nav className="flex mt-1" aria-label="Breadcrumb">
                  <ol className="flex items-center space-x-2">
                    {breadcrumbs.map((breadcrumb, index) => (
                      <li key={index} className="flex items-center">
                        {index > 0 && (
                          <svg
                            className="shrink-0 h-5 w-5 text-gray-300"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            aria-hidden="true"
                          >
                            <path
                              fillRule="evenodd"
                              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        )}
                        <a
                          href={breadcrumb.href}
                          className={`text-sm font-medium ${
                            index === breadcrumbs.length - 1
                              ? "text-gray-500"
                              : "text-gray-700 hover:text-gray-900"
                          }`}
                        >
                          {breadcrumb.name}
                        </a>
                      </li>
                    ))}
                  </ol>
                </nav>
              )}
            </div>
          </div>
          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <div className="relative">
              <button
                type="button"
                className="p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand"
                onClick={() => setShowNotifications(!showNotifications)}
              >
                <span className="sr-only">View notifications</span>
                <BellIcon className="h-6 w-6" aria-hidden="true" />
                {notifications.length > 0 && (
                  <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-400 ring-2 ring-white" />
                )}
              </button>

              {/* Notifications dropdown */}
              {showNotifications && (
                <div className="origin-top-right absolute right-0 mt-2 w-80 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
                  <div className="py-1">
                    <div className="px-4 py-2 text-sm text-gray-700 border-b border-gray-200">
                      <h3 className="font-medium">Notifications</h3>
                    </div>
                    {notifications.length > 0 ? (
                      notifications.map((notification) => (
                        <div
                          key={notification.id}
                          className="px-4 py-3 hover:bg-gray-50"
                        >
                          <p className="text-sm text-gray-700">
                            {notification.message}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            {new Date(notification.createdAt).toLocaleString()}
                          </p>
                        </div>
                      ))
                    ) : (
                      <div className="px-4 py-3 text-sm text-gray-500">
                        No new notifications
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Profile dropdown */}
            <Dropdown
              trigger={
                <div className="flex items-center">
                  <span className="mr-2 text-sm font-medium text-gray-700 hidden sm:block">
                    {user?.name}
                  </span>
                  <ProtectedImage
                    src={user?.photoUrl}
                    alt="Profile"
                    className="h-8 w-8 rounded-full"
                  />
                </div>
              }
            >
              <DropdownItem
                onClick={() =>
                  (window.location.href = `/dashboard/${user?.role}/profile`)
                }
              >
                Profile
              </DropdownItem>
              <DropdownItem onClick={handleLogout}>Logout</DropdownItem>
            </Dropdown>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardTopbar;
