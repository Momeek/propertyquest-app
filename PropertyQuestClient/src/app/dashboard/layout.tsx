import type React from "react";
import DashboardLayoutWrapper from "./dashboard-layout-wrapper";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard | PropertyQuest",
  description: "Manage your properties, listings, and account settings",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardLayoutWrapper>{children}</DashboardLayoutWrapper>;
}
