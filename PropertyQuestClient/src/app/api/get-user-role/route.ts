import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const role = req.cookies.get("role")?.value;

    if (!role) {
      return NextResponse.json({ role: null }, { status: 401 });
    }

    return NextResponse.json({ role: role });
  } catch (err) {
    return NextResponse.json({ role: null, error: err }, { status: 401 });
  }
}
