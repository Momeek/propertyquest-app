"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X, Heart, ChevronRight } from "lucide-react";
import { useState } from "react";
import { usePathname } from "next/navigation";
import AuthModals from "./auth/auth-modals";
import { useCookieAuth } from "@/hooks/useCookieAuth";
import { useCurrentUserStore } from "@/store/auth.store";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

export default function Header() {
  const { cookieToken, isLoading } = useCookieAuth();
  const { isAthenticated, logout, user } = useCurrentUserStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);

  const handleSignInClick = () => {
    setIsSignInOpen(true);
    setIsMenuOpen(false);
  };

  const handleSignUpClick = () => {
    setIsSignUpOpen(true);
    setIsMenuOpen(false);
  };

  const switchToSignUp = () => {
    setIsSignInOpen(false);
    setIsSignUpOpen(true);
  };

  const switchToSignIn = () => {
    setIsSignUpOpen(false);
    setIsSignInOpen(true);
  };

  const handleLogOut = async () => {
    await fetch("/api/logout", { method: "POST" });
    logout();
    window.location.reload();
  };

  const pathname = usePathname();

  // Get initials for avatar fallback
  const getInitials = () => {
    if (!user.name && !user.surname) return "U";
    const nameInitial = user.name ? user.name[0].toUpperCase() : "";
    const surnameInitial = user.surname ? user.surname[0].toUpperCase() : "";
    return `${nameInitial}${surnameInitial || ""}` || "U";
  };

  return (
    <>
      <header className="sticky px-3 top-0 z-50 w-full border-b bg-white">
        <div className="flex h-16 items-center justify-between w-full">
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2">
              <div className="rounded-full bg-primary p-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5 text-primary-foreground"
                >
                  <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                  <polyline points="9 22 9 12 15 12 15 22" />
                </svg>
              </div>
              <span className="text-xl font-bold">PropertyQuest</span>
            </Link>
          </div>

          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="/buy"
              className={`text-sm font-medium hover:text-[#16a249] ${
                pathname.includes("/buy")
                  ? "border-b border-[#16a249] text-[#16a249]"
                  : ""
              }`}
            >
              Buy
            </Link>
            <Link
              href="/rent"
              className={`text-sm font-medium hover:text-[#16a249] ${
                pathname.includes("/rent")
                  ? "border-b border-[#16a249] text-[#16a249]"
                  : ""
              }`}
            >
              Rent
            </Link>
            <Link
              href="/list-property"
              className={`text-sm font-medium hover:text-[#16a249] ${
                pathname.includes("/list-property")
                  ? "border-b border-[#16a249] text-[#16a249]"
                  : ""
              }`}
            >
              Sell
            </Link>
            {/* <Link
              href="/rent"
              className={`text-sm font-medium hover:text-[#16a249] ${
                pathname.includes("/short-let")
                  ? "border-b border-[#16a249] text-[#16a249]"
                  : ""
              }`}
            >
              Short Let
            </Link>
            <Link
              href="/projects"
              className={`text-sm font-medium hover:text-[#16a249] ${
                pathname.includes("/projects")
                  ? "border-b border-[#16a249] text-[#16a249]"
                  : ""
              }`}
            >
              New Projects
            </Link> */}
          </nav>

          <div className="hidden md:flex items-center gap-4">
            {((!isLoading && cookieToken) || isAthenticated) && (
              <>
                <Link
                  href={`${
                    user.role !== "user" ? "/dashboard/favorites" : "/favorite"
                  }`}
                  className={`text-sm font-medium hover:text-[#16a249] ${
                    pathname.includes("/favorite") ? "text-[#16a249]" : ""
                  }`}
                >
                  <Heart className="h-6 w-6" />
                </Link>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Avatar className="cursor-pointer border-2 border-[#16a249]">
                      <AvatarImage alt="Profile" />
                      <AvatarFallback className="bg-[#16a249] text-white text-sm">
                        {getInitials()}
                      </AvatarFallback>
                    </Avatar>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-42">
                    {user.role !== "user" && (
                      <DropdownMenuItem className="text-black mb-4 text-sm font-semibold">
                        <Link
                          href={"/dashboard/profile"}
                          className="w-full hover:underline"
                        >
                          {user.name + " " + (user?.surname ?? "")}
                        </Link>
                      </DropdownMenuItem>
                    )}
                    {user.role === "user" && (
                      <DropdownMenuItem className="text-black mb-4 text-md font-semibold">
                        <Link
                          href={"/account"}
                          className="w-full hover:underline"
                        >
                          {user.name + " " + (user?.surname ?? "")}
                        </Link>
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuItem
                      onClick={handleLogOut}
                      className="text-white bg-[#aa0e3d]"
                    >
                      Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            )}
            {!cookieToken && !isAthenticated && (
              <>
                <Button
                  variant="outline"
                  className="text-[#16a249]"
                  size="sm"
                  onClick={handleSignInClick}
                >
                  Sign In
                </Button>
                <Button size="sm" onClick={handleSignUpClick}>
                  Sign Up
                </Button>
              </>
            )}
          </div>

          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden h-[90vh] container py-4 bg-background px-4">
            <nav className="flex flex-col gap-8">
              {(cookieToken || isAthenticated) && (
                <>
                  <Link
                    href={`${
                      user.role !== "user" ? "/dashboard/profile" : "/account"
                    }`}
                    className="flex items-center justify-between w-full"
                  >
                    <div className="flex items-center gap-4">
                      <Avatar className="cursor-pointer border-2 border-[#16a249]">
                        <AvatarImage alt="Profile" />
                        <AvatarFallback className="bg-[#16a249] text-white text-md">
                          {getInitials()}
                        </AvatarFallback>
                      </Avatar>

                      <div>
                        <p className="text-md font-semibold text-[#16a249]">
                          {user.name + " " + (user?.surname ?? "")}
                        </p>
                        <p className="text-sm text-gray-500">
                          View your account
                        </p>
                      </div>
                    </div>
                    <div>
                      <ChevronRight className="h-8 w-8 text-gray-400" />
                    </div>
                  </Link>
                </>
              )}
              <Link
                href="/buy"
                className={`text-md font-medium hover:text-[#16a249] ${
                  pathname.includes("/buy")
                    ? "border-b border-[#16a249] text-[#16a249]"
                    : ""
                }`}
              >
                Buy
              </Link>
              <Link
                href="/rent"
                className={`text-md font-medium hover:text-[#16a249] ${
                  pathname.includes("/rent")
                    ? "border-b border-[#16a249] text-[#16a249]"
                    : ""
                }`}
              >
                Rent
              </Link>
              <Link
                href="/list-property"
                className={`text-md font-medium hover:text-[#16a249] ${
                  pathname.includes("/list-property")
                    ? "border-b border-[#16a249] text-[#16a249]"
                    : ""
                }`}
              >
                Sell
              </Link>
              {/* <Link
                href="/rent"
                className={`text-md font-medium hover:text-[#16a249] ${
                  pathname.includes("/short-let")
                    ? "border-b border-[#16a249] text-[#16a249]"
                    : ""
                }`}
              >
                Short Let
              </Link>
              <Link
                href="/projects"
                className={`text-md font-medium hover:text-[#16a249] ${
                  pathname.includes("/projects")
                    ? "border-b border-[#16a249] text-[#16a249]"
                    : ""
                }`}
              >
                New Projects
              </Link> */}
              <div className="flex flex-col gap-2 pt-4 border-t border-[#bbb8b8]">
                {(cookieToken || isAthenticated) && (
                  <>
                    <Button
                      className="bg-[#aa0e3d]"
                      size="sm"
                      onClick={handleLogOut}
                    >
                      Sign Out
                    </Button>
                  </>
                )}
                {!cookieToken && !isAthenticated && (
                  <>
                    <Button
                      variant="outline"
                      size="sm"
                      className="justify-center"
                      onClick={handleSignInClick}
                    >
                      Sign In
                    </Button>
                    <Button
                      size="sm"
                      className="justify-center"
                      onClick={handleSignUpClick}
                    >
                      Sign Up
                    </Button>
                  </>
                )}
              </div>
            </nav>
          </div>
        )}
      </header>
      <AuthModals
        isSignInOpen={isSignInOpen}
        isSignUpOpen={isSignUpOpen}
        onSignInOpenChange={setIsSignInOpen}
        onSignUpOpenChange={setIsSignUpOpen}
        onSwitchToSignUp={switchToSignUp}
        onSwitchToSignIn={switchToSignIn}
      />
    </>
  );
}
