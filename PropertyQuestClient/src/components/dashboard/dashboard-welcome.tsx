"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCurrentUserStore } from "@/store/auth.store";

export default function DashboardWelcome() {
  const { user } = useCurrentUserStore();
  const userName = user?.name || "User";
  const [isVisible, setIsVisible] = useState(true);
  const [greeting, setGreeting] = useState("Good day");

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good morning");
    else if (hour < 18) setGreeting("Good afternoon");
    else setGreeting("Good evening");
  }, []);

  if (!isVisible) return null;

  return (
    <div className="relative bg-gradient-to-r from-[#16a249]/90 to-[#16a249]/70 text-white p-6 rounded-lg shadow-md">
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-2 right-2 text-white hover:bg-white/20"
        onClick={() => setIsVisible(false)}
      >
        <X className="h-4 w-4" />
      </Button>
      <h2 className="text-xl font-bold mb-2">
        {greeting}, {userName}!
      </h2>
    </div>
  );
}
