import { signToken, verifyToken } from "@/lib/jwt";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import {
  sendEmailVerificationEmail,
  sendWelcomeEmail,
} from "@/lib/emailServices";

const expiresIn: any = process.env.expiresIn || "1d";

export async function registerUser(email: string, password: string) {
  if (!email || !password) {
    return {
      success: false,
      message: "ALl Field Required",
    };
  }

  try {
    const userExist = await prisma.user.findUnique({
      where: { email },
    });

    if (userExist) {
      return { success: false, message: "User Alreday Exist" };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: { email, password: hashedPassword },
    });

    if (!user) {
      return { success: false, message: "User Creation Error" };
    }

    const token = await signToken(
      { id: user.id, email: user.email, role: user.role, isEmailVerified: user.isEmailVerified },
      expiresIn,
    );

    if (!token) {
      return { success: false, message: "Token Generation Error" };
    }

    // sendWelcomeEmail(user?.email);

    sendEmailVerificationEmail(
      user?.email,
      `http://localhost:3000/verify-email?token=${token}`,
    );

    return { success: true, data: { id: user.id, email: user.email }, token, message: "Registered successfully Please verify your email" };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}

export async function loginUser(email: string, password: string) {
  if (!email || !password) {
    return {
      success: false,
      message: "ALl Field Required",
    };
  }
  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return { success: false, message: "User Not Found" };
    }

    const isVerified = user.isEmailVerified;

    if (!isVerified) {
      return { success: false, message: "Please verify your email before logging in." };
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
      return { success: false, message: "Invalid Password !!!!" };
    }

    const token = await signToken(
      { id: user.id, email: user.email, role: user.role, isEmailVerified: user.isEmailVerified },
      expiresIn,
    );

    if (!token) {
      return { success: false, message: "Token Generation Error" };
    }

    sendWelcomeEmail(user?.email);

    return { success: true, token, data: { id: user.id, email: user.email }, message: "Login successfully" };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}

export async function verifyEmail(token: string) {

  try {
    const payload: any = await verifyToken(token);

    console.log("payload in controller ",payload)

    if (!payload) {
      return {
      success: false,
      message: "Invalid or missing token.",
    };
    }

    if (payload == "EXPIRED") {
      return {
        success: false,
        message: "Token has expired.",
      };
    }

    const user: any = await prisma.user.findFirst({
      where: { email: payload?.email },
    })

    if(!user) {
      return {
        success: false,
        message: "User not found.",
      };
    }

    console.log(user);

    if(user.isEmailVerified == true) {
      return {
        success: false,
        message: "Email is already verified.",
      };
    }

    if(user.isEmailVerified == false) {
      await prisma.user.update({
        where: { id: user.id },
        data: { isEmailVerified: true },
      })
    }

    return { success: true, message: "Email verified successfully!" };
  } catch (error: any) {
    return { success: false, message: error.message || "Something went wrong" };
  }
}
