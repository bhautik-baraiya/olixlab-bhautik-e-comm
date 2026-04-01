import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "./lib/jwt";

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const { pathname } = req.nextUrl;

  if (pathname.startsWith("/login") || pathname.startsWith("/register")) {
    if (token) return NextResponse.redirect(new URL("/", req.url));
    return NextResponse.next();
  }

  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  try {
    const payload = await verifyToken(token);
    
    if (!payload) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    const role = payload?.role?.toString().toUpperCase(); 

    
    if (pathname.toLowerCase().startsWith("/admin")) {
      if (role !== "ADMIN") {
        return NextResponse.redirect(new URL("/", req.url)); // Send non-admins home
      }
      return NextResponse.next(); 
    }

    return NextResponse.next();
  } catch (err) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};