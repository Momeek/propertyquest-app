"use client";

import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ClientMobileHeaderProps {
  onMenuClick: () => void;
}

export default function DashboardMobileHeader({
  onMenuClick,
}: ClientMobileHeaderProps) {
  return (
    <div className="md:hidden flex items-center h-16 justify-between px-6 border-b bg-white">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" onClick={onMenuClick}>
          <Menu className="h-5 w-5" />
        </Button>
        <div className="flex items-center gap-2">
          <div className="rounded-full bg-primary p-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4 text-white"
            >
              <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
          </div>
          <span className="text-lg font-bold">PropertyQuest</span>
        </div>
      </div>
    </div>
  );
}
