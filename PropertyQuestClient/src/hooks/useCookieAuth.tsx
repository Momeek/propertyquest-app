"use client";
import { useQuery, useMutation } from "@tanstack/react-query";

async function fetchCookieToken() {
  const response = await fetch("/api/get-cookie");
  const data = await response.json();
  return data.token || null;
}

async function fetchUserRole() {
  const response = await fetch("/api/get-user-role");
  const data = await response.json();
  return data.role || null;
}

export function useCookieAuth() {
  const { data: cookieToken, isLoading } = useQuery({
    queryKey: ["cookieAuth"],
    queryFn: fetchCookieToken,
  });

  return { cookieToken, isLoading };
}

export function useUserRole() {
  const { data: userRole, isLoading } = useQuery({
    queryKey: ["userRole"],
    queryFn: fetchUserRole,
  });

  return { userRole, isLoading };
}

async function logoutUser() {
  await fetch("/api/logout", { method: "POST" });
}

export function useLogout() {
  const { mutate: cookieLogOut, isPending } = useMutation({
    mutationFn: logoutUser,
  });

  return { cookieLogOut, isPending };
}
