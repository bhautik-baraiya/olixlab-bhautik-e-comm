import { registerUser } from "@/controllers/auth.controller";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    const res = await registerUser(email, password);

    if (!res) {
      return NextResponse.json({
        success: false,
        message: "Register Error",
      });
    }

    return NextResponse.json({
      success: true,
      message: res.message,
    });
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
