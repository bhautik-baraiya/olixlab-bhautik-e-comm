"use client";

import { useForm } from "react-hook-form";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

type FormData = {
  email: string;
  password: string;
};

export default function Login() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>();

  const onSubmit = async (formData: FormData, e: any) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!data || !data.success) {
        toast.error(data?.message || "Login failed");
        return;
      }

      if (data.data.email === "admin@gmail.com" && data.success === true) {
        toast.success(data.message);
        router.push("/admin/dashboard");
      } else {
        toast.success(data.message);
        router.push("/");
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <main
      className="min-h-screen flex items-center justify-center px-6 overflow-hidden relative"
      style={{ background: "linear-gradient(160deg, #0f0c29 0%, #302b63 50%, #1a0e3a 100%)" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800;900&family=DM+Sans:wght@300;400;500&display=swap');
        .font-display { font-family: 'Syne', sans-serif; }
        .font-body { font-family: 'DM Sans', sans-serif; }
        .gradient-text {
          background: linear-gradient(90deg, #a78bfa, #f472b6, #fb923c);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .spin-slow { animation: spin-slow 18s linear infinite; }

        .input-field {
          width: 100%;
          padding: 14px 18px;
          border-radius: 14px;
          border: 1px solid rgba(255,255,255,0.1);
          background: rgba(255,255,255,0.05);
          color: #fff;
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          outline: none;
          transition: all 0.2s;
          backdrop-filter: blur(8px);
        }
        .input-field::placeholder { color: rgba(255,255,255,0.25); }
        .input-field:focus {
          border-color: rgba(167,139,250,0.5);
          background: rgba(124,58,237,0.08);
          box-shadow: 0 0 0 3px rgba(124,58,237,0.15);
        }
        .input-error { border-color: rgba(248,113,113,0.5) !important; }

        .btn-primary {
          width: 100%;
          padding: 15px;
          border-radius: 14px;
          border: none;
          cursor: pointer;
          font-family: 'Syne', sans-serif;
          font-weight: 700;
          font-size: 15px;
          color: #fff;
          background: linear-gradient(135deg, #7c3aed, #db2777);
          transition: all 0.2s;
          box-shadow: 0 8px 32px rgba(124,58,237,0.3);
          letter-spacing: 0.02em;
        }
        .btn-primary:hover:not(:disabled) { transform: scale(1.02); box-shadow: 0 12px 40px rgba(124,58,237,0.4); }
        .btn-primary:active:not(:disabled) { transform: scale(0.98); }
        .btn-primary:disabled { opacity: 0.6; cursor: not-allowed; }

        .divider-line {
          flex: 1;
          height: 1px;
          background: rgba(255,255,255,0.08);
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .fade-up { animation: fadeUp 0.6s ease forwards; }
        .fade-up-2 { animation: fadeUp 0.6s ease 0.1s forwards; opacity: 0; }
        .fade-up-3 { animation: fadeUp 0.6s ease 0.2s forwards; opacity: 0; }
      `}</style>

      {/* Background orbs */}
      <div className="absolute top-0 left-0 w-96 h-96 rounded-full blur-3xl opacity-20 pointer-events-none"
        style={{ background: "radial-gradient(circle, #7c3aed, transparent)" }} />
      <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full blur-3xl opacity-20 pointer-events-none"
        style={{ background: "radial-gradient(circle, #db2777, transparent)" }} />

      {/* Spinning rings */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full border border-white/5 spin-slow pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full border border-white/5 spin-slow pointer-events-none" style={{ animationDirection: "reverse" }} />

      {/* Card */}
      <div className="relative w-full max-w-md fade-up">
        {/* Glow behind card */}
        <div className="absolute -inset-1 rounded-3xl blur-xl opacity-20 pointer-events-none"
          style={{ background: "linear-gradient(135deg, #7c3aed, #db2777)" }} />

        <div className="relative rounded-3xl border border-white/10 p-8 md:p-10 backdrop-blur-md"
          style={{ background: "rgba(255,255,255,0.04)" }}>

          {/* Logo / Brand */}
          <div className="fade-up text-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-purple-500/30 text-purple-300 text-xs font-semibold mb-5 backdrop-blur-sm"
              style={{ background: "rgba(124,58,237,0.12)" }}>
              <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
              Welcome back
            </div>
            <h1 className="font-display text-4xl font-black text-white leading-tight">
              Log in to{" "}
              <span className="gradient-text">MyStore</span>
            </h1>
            <p className="font-body text-gray-500 text-sm mt-2">
              Enter your credentials to continue shopping
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 fade-up-2">
            {/* Email */}
            <div className="space-y-2">
              <label className="font-body text-gray-400 text-xs font-medium uppercase tracking-widest block">
                Email
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                className={`input-field ${errors.email ? "input-error" : ""}`}
                {...register("email", { required: "Email is required" })}
              />
              {errors.email && (
                <p className="font-body text-xs text-red-400 flex items-center gap-1">
                  <span>⚠</span> {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="font-body text-gray-400 text-xs font-medium uppercase tracking-widest block">
                  Password
                </label>
                <Link href="/forgot-password"
                  className="font-body text-xs text-purple-400 hover:text-purple-300 transition-colors">
                  Forgot password?
                </Link>
              </div>
              <input
                type="password"
                placeholder="••••••••"
                className={`input-field ${errors.password ? "input-error" : ""}`}
                {...register("password", { required: "Password is required" })}
              />
              {errors.password && (
                <p className="font-body text-xs text-red-400 flex items-center gap-1">
                  <span>⚠</span> {errors.password.message}
                </p>
              )}
            </div>

            {/* Submit */}
            <div className="pt-2">
              <button type="submit" className="btn-primary" disabled={isSubmitting}>
                {isSubmitting ? "Logging in..." : "Log In →"}
              </button>
            </div>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4 my-6 fade-up-3">
            <div className="divider-line" />
            <span className="font-body text-gray-600 text-xs uppercase tracking-widest">or</span>
            <div className="divider-line" />
          </div>

          {/* Register link */}
          <p className="font-body text-center text-gray-500 text-sm fade-up-3">
            Don't have an account?{" "}
            <Link href="/register"
              className="text-purple-400 font-semibold hover:text-purple-300 transition-colors">
              Create one →
            </Link>
          </p>
        </div>

        {/* Bottom trust badge */}
        <p className="font-body text-center text-gray-600 text-xs mt-5">
          🔒 Bank-grade encryption on every session
        </p>
      </div>
    </main>
  );
}