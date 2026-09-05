"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  ListFilter,
  Building,
  PlusCircle,
  Heart,
  // CreditCard,
  User,
  // MessageSquare,
  LogOut,
  X,
  Loader,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCurrentUserStore } from "@/store/auth.store";
import { useUserRole } from "@/hooks/useCookieAuth";
import { useGetProfile } from "@/hooks/useGetProfile";

const navItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "My Listings",
    href: "/dashboard/listings",
    icon: ListFilter,
  },
  {
    title: "New Projects",
    href: "/dashboard/projects",
    icon: Building,
  },
  {
    title: "List Properties",
    href: "/dashboard/add-property",
    icon: PlusCircle,
  },
  {
    title: "Favorites",
    href: "/dashboard/favorites",
    icon: Heart,
  },
  // {
  //   title: "Subscription",
  //   href: "/dashboard/subscription",
  //   icon: CreditCard,
  // },
  {
    title: "Profile",
    href: "/dashboard/profile",
    icon: User,
  },
  // {
  //   title: "Messages",
  //   href: "/dashboard/messages",
  //   icon: MessageSquare,
  // },
];

const navItemsFOrUser = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "List Properties",
    href: "/dashboard/add-property",
    icon: PlusCircle,
  },
  {
    title: "Favorites",
    href: "/dashboard/favorites",
    icon: Heart,
  },
  {
    title: "Profile",
    href: "/dashboard/profile",
    icon: User,
  },
];

interface ClientSidebarProps {
  open?: boolean;
  onClose?: () => void;
}

export default function DashboardSidebar({
  open = false,
  onClose,
}: ClientSidebarProps) {
  const { userRole, isLoading } = useUserRole();
  const { logout, user } = useCurrentUserStore();

  const { profileData } = useGetProfile({
    userId: user?.userId as string,
  });

  const handleLogOut = async () => {
    await fetch("/api/logout", { method: "POST" });
    logout();
    window.location.reload();
  };

  const pathname = usePathname();

  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div
          className="md:hidden fixed inset-0 bg-black/50 z-40"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={cn(
          "fixed md:fixed left-0 z-50 flex flex-col w-64 bg-[#16a249] text-white p-4 shadow-lg transition-transform duration-300 ease-in-out",
          // Adjust height for mobile to account for bottom nav
          "top-0 bottom-16 md:inset-y-0",
          open ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        )}
      >
        <div className="flex items-center justify-between mb-8 px-2">
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2">
              <div className="rounded-full bg-white p-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5 text-[#16a249]"
                >
                  <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                  <polyline points="9 22 9 12 15 12 15 22" />
                </svg>
              </div>
              <span className="text-xl font-bold">PropertyQuest</span>
            </Link>
          </div>

          {/* Close button for mobile */}
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="md:hidden text-white hover:bg-white/10"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
        {isLoading ? (
          <div className="flex items-center justify-center h-full">
            <Loader className="h-5 w-5" />
          </div>
        ) : (
          <>
            <nav className="space-y-1 flex-1">
              {(userRole === "user" || profileData.UserDocument?.inReview
                ? navItemsFOrUser
                : navItems
              ).map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2 rounded-md transition-colors",
                      isActive
                        ? "bg-white/20 text-white"
                        : "text-white/80 hover:bg-white/10 hover:text-white"
                    )}
                    onClick={onClose}
                  >
                    <item.icon className="h-5 w-5" />
                    <span>{item.title}</span>
                  </Link>
                );
              })}
            </nav>

            <div className="pt-4 mt-4 border-t border-white/20">
              <Button
                variant="ghost"
                className="w-full justify-start text-white/80 hover:bg-white/10 hover:text-white"
                asChild
              >
                <button onClick={handleLogOut}>
                  <LogOut className="h-5 w-5 mr-3 text-white" />
                  Sign Out
                </button>
              </Button>
            </div>
          </>
        )}
      </div>
    </>
  );
}
