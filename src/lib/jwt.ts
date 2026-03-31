import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

const JWT_SECRET = process.env.JWT_SECRET!;

export function signToken(payload: object, expiresIn = "1h") {
  console.log(JWT_SECRET);
  return jwt.sign(payload, JWT_SECRET, { expiresIn });
}

export function verifyToken(token: string) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    console.log(error);
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
