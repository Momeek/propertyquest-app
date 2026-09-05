import { jwtVerify } from "jose";
import { cookies } from "next/headers";
import type { NextResponse } from "next/server";

// Secret key for JWT signing and verification
const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "default_secret_replace_in_production"
);

export interface UserJwtPayload {
  id: string;
  email: string;
  name: string;
  role: string;
  iat: number;
  exp: number;
}

/**
 * Verifies the JWT token and returns the payload
 */
export async function verifyAuth(
  token: string
): Promise<UserJwtPayload | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return payload as unknown as UserJwtPayload;
  } catch (error) {
    console.error("Error verifying token:", error);
    return null;
  }
}

/**
 * Removes the auth token from cookies
 */
export async function removeAuthCookie(response?: NextResponse) {
  const cookieStore = await cookies();

  if (response) {
    // For edge runtime
    response.cookies.delete("token");
    return response;
  } else {
    // For server components
    cookieStore.delete("token");
  }
}
