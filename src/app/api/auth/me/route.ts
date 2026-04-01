import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/jwt";

export async function GET() {
  const token = cookies().get("token")?.value;

  if (!token) {
    return NextResponse.json({ user: null });
  }

  try {
    const user = verifyToken(token);
    return NextResponse.json({ user });
  } catch {
    return NextResponse.json({ user: null });
  }
}