import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get("token")?.value;

    if (!token) {
      return NextResponse.json({ token: null }, { status: 401 });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    return NextResponse.json({ token: decoded });
  } catch (err) {
    return NextResponse.json({ token: null, error: err }, { status: 401 });
  }
}
