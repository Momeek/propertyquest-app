"use client";

import React, { useEffect } from "react";
import { createContext, useContext } from "react";
import { UserAttr } from "@/interfaces/user.interface";
import { useCurrentUserStore } from "@/store/auth.store";
import { jwtDecode } from "jwt-decode";
import { useLogout } from "@/hooks/useCookieAuth";
import { useGetProfile } from "@/hooks/useGetProfile";
// import { usePathname } from "next/navigation";

interface AuthContextType {
  login: (userData: { user: UserAttr; token: string }) => void;
}

// Create context with a default value or undefined
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { setUser, setToken, token, logout, user } = useCurrentUserStore();
  const { cookieLogOut } = useLogout();
  const { profileData } = useGetProfile({
    userId: user.userId as string,
  });
  // const pathname = usePathname();

  useEffect(() => {
    if (!token) return;

    try {
      const decodedToken = jwtDecode<{ exp: number }>(token);
      const currentTime = Date.now() / 1000; // Convert to seconds

      // Check if token is expired
      if (decodedToken.exp < currentTime) {
        logout();
        cookieLogOut();
        return;
      }
    } catch (error) {
      // Invalid token format or decoding error
      console.error("Error decoding token:", error);
      logout();
      cookieLogOut();
      return;
    }
  }, [token, logout, cookieLogOut]);

  // check if local data is outdated
  useEffect(() => {
    if (!user?.userId || !profileData?.updatedAt) return;
    if (
      new Date(profileData?.updatedAt ?? 0).getTime() >
      new Date(user?.updatedAt ?? 0).getTime()
    ) {
      setUser(profileData);
    }
  }, [profileData, setUser, user]);

  // pathname = /
  // get user and user token from url when signing in with social logins
  const getUser =
    typeof window !== "undefined"
      ? new URLSearchParams(window.location.search).get("user")
      : null;
  const decodedUser = getUser ? decodeURIComponent(getUser) : null;

  const actionToken =
    typeof window !== "undefined"
      ? new URLSearchParams(window.location.search).get("token")
      : null;
  const decodedToken = actionToken ? decodeURIComponent(actionToken) : null;

  const setActionToken = async (token: string, role: string) => {
    await fetch("/api/set-cookie", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token: token }),
    });
    await fetch("/api/set-user-role", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ role: role }),
    });
  };

  // Check if the token is already in the cookie
  useEffect(() => {
    if (decodedUser && decodedToken) {
      const user = JSON.parse(decodedUser);
      setUser(user);
      setToken(decodedToken);

      setActionToken(decodedToken, user.role)
        .then(() => {
          const url = new URL(window.location.href);
          url.searchParams.delete("user");
          url.searchParams.delete("token");
          window.history.replaceState({}, document.title, url.toString());
        })
        .catch((error) => {
          console.error("Error loading token:", error);
        });
    }
  }, []);

  const login = async (userData: { user: UserAttr; token: string }) => {
    setUser(userData.user || null);
    setToken(userData.token || "");

    await fetch("/api/set-cookie", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token: userData.token }),
    });

    await fetch("/api/set-user-role", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ role: userData.user.role }),
    });

    // Full redirect triggers server request and middleware check
    if (userData.user.role !== "user") {
      window.location.href = "/dashboard";
    } else {
      window.location.reload();
    }
  };

  // Provide the context value
  const value = {
    login,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Create a custom hook for using the context
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
