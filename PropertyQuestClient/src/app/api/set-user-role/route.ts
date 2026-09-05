import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { role } = await req.json();

    if (!role) {
      return NextResponse.json({ error: "Role missing" }, { status: 400 });
    }

    const response = NextResponse.json({ message: "Role set successfully" });

    // Properly formatted Set-Cookie header
    const isProduction = process.env.NODE_ENV === "production";
    response.headers.set(
      "Set-Cookie",
      `role=${role}; HttpOnly; Path=/; Max-Age=86400; SameSite=Lax;${
        isProduction ? " Secure;" : ""
      }`
    );

    return response;
  } catch (error) {
    return NextResponse.json(
      { error: "Server error", serverError: error },
      { status: 500 }
    );
  }
}
