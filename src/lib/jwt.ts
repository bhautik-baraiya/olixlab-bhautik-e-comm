import * as jwt from "jsonwebtoken";
import type { SignOptions } from "jsonwebtoken";
import { jwtVerify } from "jose";
import { NextRequest } from "next/server";

const JWT_SECRET = (process.env.JWT_SECRET || "bhautik12345") as string;

const encodedSecret = new TextEncoder().encode(JWT_SECRET);

export function signToken(payload: object, expiresIn: SignOptions["expiresIn"] = "1h") {
  return jwt.sign(payload, JWT_SECRET, { expiresIn });
}

export async function verifyToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, encodedSecret);
    console.log(payload);
    return payload;
  } catch (error) {
    console.error("JWT Verification failed:", error);
    return null;
  }
}
export function getUserFromToken(req: NextRequest) {
  try {
    // console.log("cookie ======",req.cookies.get("token"));

    const token = req.cookies.get("token")?.value;

    console.log("token from cookie", req.cookies.get("token"));

    if (!token) return null;

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      id: number;
    };

    console.log("decoded----------", decoded);

    return decoded.id;
  } catch (error) {
    return null;
  }
}
