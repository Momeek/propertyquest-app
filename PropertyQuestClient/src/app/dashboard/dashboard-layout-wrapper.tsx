"use client";

import type React from "react";
import { useState, useEffect } from "react";
import DashboardSidebar from "@/components/dashboard/dashboard-sidebar";
import DashboardMobileHeader from "@/components/dashboard/dashboard-mobile-header";
import { useCookieAuth } from "@/hooks/useCookieAuth";
import { useRouter } from "next/navigation";
import Loader from "@/components/dashboard/loader";

export default function DashboardLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { cookieToken, isLoading: isAuthLoading } = useCookieAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (!isAuthLoading && !cookieToken) {
      router.push("/");
    }
  }, [cookieToken, isAuthLoading, router]);

  if (isAuthLoading) {
    return (
      <Loader
        msg="your dashboard"
        subMsg="Preparing your personalized experience..."
      />
    );
  }

  return (
    <div className="flex min-h-screen bg-white">
      <DashboardSidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
      {/* This is a placeholder div that takes up the same width as the sidebar, this is so the content won't go left-0 on medium or big screen when the sidebar display is fixed */}
      <div className="hidden md:block w-64 flex-shrink-0"></div>
      {/* Main content area */}
      <div className="flex-1 flex flex-col">
        <DashboardMobileHeader onMenuClick={() => setSidebarOpen(true)} />
        <div className="flex-1 p-4 md:p-8 pt-6 overflow-auto pb-[100px]">
          {children}
        </div>
      </div>
    </div>
  );
}
