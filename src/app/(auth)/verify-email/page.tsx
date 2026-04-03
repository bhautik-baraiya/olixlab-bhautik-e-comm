"use client";

import { api } from "@/lib/axios";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function VerifyEmailPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  console.log(token);

  const [status, setStatus] = useState<
    "loading" | "success" | "error"
  >("loading");

  const [message, setMessage] = useState("Verifying your email...");

  useEffect(() => {
    if (!token) {
      setStatus("error");
      setMessage("Invalid or missing token.");
      return;
    }

    const verifyEmail = async () => {
      try {
        const data = await api.post(`/auth/verify-email?token=${token}`);

        console.log(data)

        if (data.data.success) {
          setStatus("success");
          setMessage(data.data.message || "Email verified successfully!");
        } else {
          setStatus("error");
          setMessage(data.data.message || "Verification failed.");
        }
      } catch (error) {
        setStatus("error");
        setMessage("Something went wrong.");
      }
    };

    verifyEmail();
  }, [token]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-2xl p-8 max-w-md w-full text-center">
        {status === "loading" && (
          <>
            <h1 className="text-2xl font-semibold mb-4">
              Verifying...
            </h1>
            <p className="text-gray-600">{message}</p>
          </>
        )}

        {status === "success" && (
          <>
            <h1 className="text-2xl font-semibold text-green-600 mb-4">
              ✅ Verified
            </h1>
            <p className="text-gray-600 mb-6">{message}</p>
            <a
              href="/login"
              className="inline-block bg-black text-white px-6 py-2 rounded-lg"
            >
              Go to Login
            </a>
          </>
        )}

        {status === "error" && (
          <>
            <h1 className="text-2xl font-semibold text-red-600 mb-4">
              ❌ Error
            </h1>
            <p className="text-gray-600 mb-6">{message}</p>
            <a
              href="/"
              className="inline-block bg-black text-white px-6 py-2 rounded-lg"
            >
              Go Home
            </a>
          </>
        )}
      </div>
    </div>
  );
}