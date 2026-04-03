import { verifyEmail } from "@/controllers/auth.controller";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const token = searchParams.get("token");

    if (!token) {
      return NextResponse.json({
        success: false,
        message: "Invalid or missing token.",
      });
    }

    const res = await verifyEmail(token);
    
    if(!res || !res.success) {
      return NextResponse.json({
        success: false,
        message: res?.message || "Verification failed.",
      });
    }

    return NextResponse.json({
      success: true,
      message: res.message || "Email verified successfully!",
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Something went wrong",
    });
  }
}
