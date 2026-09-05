"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Heart, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCookieAuth } from "@/hooks/useCookieAuth";
import { useCurrentUserStore } from "@/store/auth.store";

export default function MobileNav() {
  const pathname = usePathname();
  const { cookieToken } = useCookieAuth();
  const { isAthenticated, user } = useCurrentUserStore();

  const navItems = [
    {
      label: "Home",
      href: "/",
      icon: Home,
    },
    // {
    //   label: "New projects",
    //   href: "/projects",
    //   icon: Building,
    // },
    {
      label: "Saved",
      href: user.role !== "user" ? "/dashboard/favorites" : "/favorite",
      icon: Heart,
    },
    {
      label: "Account",
      href: user.role !== "user" ? "/dashboard/profile" : "/account",
      icon: User,
    },
  ];

  return (
    <div className="fixed bottom-0 left-0 z-50 w-full h-16 bg-white border-t md:hidden">
      <div
        className={`grid h-full ${
          !cookieToken || !isAthenticated
            ? "grid-cols-1"
            : user.role === "user"
            ? "grid-cols-2"
            : "grid-cols-3"
        }`}
      >
        {navItems
          .filter((item) => {
            if (!cookieToken || !isAthenticated) {
              return (
                item.href !== "/dashboard/profile" &&
                item.href !== "/dashboard/favorites"
              );
            }
            if (user.role === "user") {
              return item.label !== "Account";
            }
            return true;
          })
          .map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.label}
                href={item.href}
                className={cn(
                  "flex flex-col items-center justify-center",
                  isActive
                    ? "text-[#16a249] font-medium"
                    : "text-gray-500 hover:text-gray-900"
                )}
              >
                <item.icon
                  className={cn("w-5 h-5 mb-1", isActive && "fill-[#16a249]")}
                />
                <span className="text-xs">{item.label}</span>
              </Link>
            );
          })}
      </div>
    </div>
  );
}
