import { signToken } from "@/lib/jwt";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

const expiresIn = process.env.expiresIn || "1d";

export async function registerUser(email: string, password: string) {
  if (!email || !password) {
    return {
      success: false,
      message: "ALl Field Required",
    };
  }

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

  return { success: true, user, message: "Registered successfully" };
}

export async function loginUser(email: string, password: string) {
  console.log(email, password);

  const user = await prisma.user.findUnique({
    where: { email },
  });

  console.log("user------------------", user);

  if (!user) {
    return { success: false, message: "Invalid credentials" };
  }

  const isValid = await bcrypt.compare(password, user.password);

  console.log("isValid------------------", isValid);

  if (!isValid) {
    return { success: false, message: "Invalid Password" };
  }

  const token = signToken({ id: user.id, email: user.email }, expiresIn);

  console.log("token------------------", token);

  return { success: true, token, message: "Login successfully" };
}
