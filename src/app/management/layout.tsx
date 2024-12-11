"use client";

import {  useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/sidebar";

// interface ManagementLayoutProps {
//   children: ReactNode;
// }

const ManagementLayout = ({ children }: any) => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [sideOpen, setSideOpen] = useState<boolean>(true);

  const toggleSidebar = () => {
    setSideOpen(!sideOpen);
  };

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
      router.push("/login");
    } else {
      setIsAuthenticated(true);
    }
  }, [router]);

  if (!isAuthenticated) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="loader spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full"></div>
          <p className="mt-4 text-gray-600" aria-live="polite">
            Loading...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen h-full">
      {/* Sidebar */}
      <aside
        id="default-sidebar"
        className={`border-r border-utility-gray-200  h-full fixed top-0 left-0  transition-all duration-300 ${
          sideOpen ? "w-72" : "w-[81px]"
        }  `}
        aria-label="Sidebar"
      >
        <Sidebar
          sideOpen={sideOpen}
          setSideOpen={setSideOpen}
          toggleSidebar={toggleSidebar}
        />
      </aside>

      {/* Main Content */}
      <div className={` flex-1 ${sideOpen ? "ml-72 " : "ml-20" } transition-all duration-300`} >
        <main className="min-h-screen h-full overflow-y-auto bg-default-secondary">
          {children}
        </main>
      </div>
    </div>
  );
};

export default ManagementLayout;
