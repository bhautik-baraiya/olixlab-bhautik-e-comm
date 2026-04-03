import * as jwt from "jsonwebtoken";
import type { SignOptions } from "jsonwebtoken";
import { NextRequest } from "next/server";
import { SignJWT, jwtVerify, errors } from "jose";

const secret = new TextEncoder().encode(
  process.env.JWT_SECRET || "bhautik12345",
);

export async function signToken(payload: object, expiresIn: string = "1d") {
  return await new SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime(expiresIn)
    .sign(secret);
}

export async function verifyToken(token: string) {
  try {
    // console.log("token ========", token);

    const { payload } = await jwtVerify(token, secret);

    // console.log("payload ========", payload);

    return payload;
  } catch (error) {
    if (error instanceof errors.JWTExpired) {
      console.log("Token expired");
      return "EXPIRED";
    }

    console.error("JWT Verification failed:", error);
    return null;
  }
}

export async function getUserFromToken(req: NextRequest) {
  try {
    const token = req.cookies.get("token")?.value;

    // console.log("token from cookie", req.cookies.get("token"));

    if (!token) return null;

    const { payload } = await jwtVerify(token, secret);

    // console.log("decoded----------", payload);

    const id = payload.id;

    if(!id){
      return null;
    }

    // console.log(id)

    return id;
  } catch (error) {
    return null;
  }
}
