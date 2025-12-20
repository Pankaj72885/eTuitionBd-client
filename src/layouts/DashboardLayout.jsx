import DashboardTopbar from "@/components/dashboard/DashboardTopbar";
import Sidebar from "@/components/dashboard/Sidebar";
import { Sheet, SheetContent } from "@/components/ui/Sheet";
import { useEffect, useState } from "react";
import { Outlet } from "react-router";

const DashboardLayout = ({ title, breadcrumbs }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile screen size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      {/* Mobile sidebar drawer */}
      {isMobile && (
        <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
          <SheetContent side="left" className="p-0 w-64 sm:w-80">
            <Sidebar />
          </SheetContent>
        </Sheet>
      )}

      {/* Desktop sidebar - fixed */}
      <aside className="hidden md:flex md:shrink-0">
        <div className="flex flex-col w-64">
          <Sidebar />
        </div>
      </aside>

      {/* Main content area */}
      <div className="flex flex-col flex-1 w-0 overflow-hidden">
        {/* Dashboard top bar with title and notifications */}
        <DashboardTopbar
          title={title}
          breadcrumbs={breadcrumbs}
          onMobileMenuClick={() => setSidebarOpen(true)}
        />

        {/* Page content - scrollable */}
        <main className="flex-1 relative overflow-y-auto focus:outline-none bg-gray-50">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              <Outlet />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
