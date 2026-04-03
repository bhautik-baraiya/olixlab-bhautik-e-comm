import { registerUser } from "@/controllers/auth.controller";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    const res = await registerUser(email, password);

    if (!res || !res.success || !res.data || !res.token) {
      return NextResponse.json(
        {
          success: false,
          message: res?.message || "Invalid credentials",
        },
        { status: 401 },
      );
    }

    const response = NextResponse.json({
      success: true,
      message: res.message,
    });

    response.cookies.set("token", res?.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "development" ? false : true,
      sameSite: process.env.NODE_ENV === "development" ? "lax" : "strict",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return response;
  } catch (error) {
    console.error("REGISTER ERROR:", error);
    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error ? error.message : "Internal Server Error",
      },
      { status: 500 },
    );
  }
}
