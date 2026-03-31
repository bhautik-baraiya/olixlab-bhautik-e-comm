import { loginUser } from "@/controllers/auth.controller";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    const res = await loginUser(email, password);

    console.log("res================================",res)

    const response = NextResponse.json({
      success: true,
      message: res.message,
    });

    response.cookies.set("token", res.token, {
      httpOnly: true,
      secure: false, // for production "secure: true"
      sameSite: "lax", // for production ""sameSite: "strict"""
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return response;
  } catch (error) {
    console.log(error instanceof Error ? error.message : error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 },
    );
  }
}
