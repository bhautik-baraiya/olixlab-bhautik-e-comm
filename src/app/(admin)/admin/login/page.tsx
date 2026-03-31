"use client";

import { useState } from "react";
import { Eye, EyeOff, ShoppingBag, ArrowRight, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

   const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (email == "admin@gmail.com" && password == "admin@123") {
        toast.success("Login successfully! Redirecting...");
        router.push("/admin/dashboard")
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#080A0F] flex overflow-hidden font-sans">
      {/* ── Left panel ── */}
      <div className="hidden lg:flex lg:w-[55%] relative flex-col justify-evenly p-12 overflow-hidden">
        {/* Animated gradient orbs */}
        <div className="absolute inset-0 z-0">
          <div className="orb orb-1" />
          <div className="orb orb-2" />
          <div className="orb orb-3" />
          {/* Grid overlay */}
          <div className="absolute inset-0 grid-bg opacity-20" />
        </div>

        {/* Top: Logo */}
        <div className="relative z-10 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-600 flex items-center justify-center shadow-lg shadow-violet-500/30">
            <ShoppingBag className="w-5 h-5 text-white" />
          </div>
          <span className="text-white font-bold text-xl tracking-tight">
            NEXUS<span className="text-violet-400">STORE</span>
          </span>
        </div>

        {/* Center: Stats cards */}
        <div className="relative z-10 space-y-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-violet-400 text-sm font-semibold uppercase tracking-widest">
              <Zap className="w-4 h-4" /> Command Center
            </div>
            <h1 className="text-5xl font-black text-white leading-tight">
              Manage your
              <br />
              <span className="gradient-text">empire.</span>
            </h1>
            <p className="text-white/40 text-lg max-w-sm mt-3">
              Real-time analytics, inventory control, and order management — all
              in one sleek dashboard.
            </p>
          </div>

          {/* Metric cards */}
          <div className="grid grid-cols-3 gap-3 mt-8">
            {[
              { label: "Revenue", value: "$84.2K", change: "+12.5%" },
              { label: "Orders", value: "2,841", change: "+8.1%" },
              { label: "Customers", value: "18.4K", change: "+23%" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="glass-card rounded-2xl p-4 border border-white/[0.06]"
              >
                <div className="text-white/40 text-xs font-medium mb-1">
                  {stat.label}
                </div>
                <div className="text-white font-bold text-xl">{stat.value}</div>
                <div className="text-emerald-400 text-xs font-semibold mt-1">
                  {stat.change}
                </div>
              </div>
            ))}
          </div>

          {/* Activity bar */}
          <div className="glass-card rounded-2xl p-4 border border-white/[0.06]">
            <div className="flex justify-between items-center mb-3">
              <span className="text-white/60 text-xs font-medium">
                Weekly Sales
              </span>
              <span className="text-violet-400 text-xs font-bold">Live</span>
            </div>
            <div className="flex items-end gap-1.5 h-12">
              {[40, 65, 45, 80, 55, 90, 70].map((h, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-sm bar-animate"
                  style={{
                    height: `${h}%`,
                    background:
                      i === 5
                        ? "linear-gradient(to top, #7c3aed, #c026d3)"
                        : "rgba(124,58,237,0.25)",
                    animationDelay: `${i * 0.08}s`,
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Right panel: Login form ── */}
      <div className="w-full lg:w-[45%] flex items-center justify-center p-6 lg:p-12 relative">
        {/* subtle bg glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-violet-600/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="w-full max-w-md relative z-10">
          {/* Mobile logo */}
          <div className="flex lg:hidden items-center gap-3 mb-10">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-600 flex items-center justify-center">
              <ShoppingBag className="w-4 h-4 text-white" />
            </div>
            <span className="text-white font-bold text-lg tracking-tight">
              NEXUS<span className="text-violet-400">STORE</span>
            </span>
          </div>

          {/* Heading */}
          <div className="mb-8">
            <h2 className="text-3xl font-black text-white mb-2 tracking-tight">
              Welcome back
            </h2>
            <p className="text-white/40 text-sm">
              Sign in to your admin dashboard
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div className="space-y-2">
              <Label className="text-white/60 text-xs font-semibold uppercase tracking-widest">
                Email Address
              </Label>
              <div className="relative">
                <Input
                  type="email"
                  placeholder="admin@nexusstore.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="h-12 bg-white/[0.04] border border-white/[0.08] text-white placeholder:text-white/20 rounded-xl focus:border-violet-500 focus:ring-1 focus:ring-violet-500/50 focus:bg-white/[0.06] transition-all duration-200 pl-4 pr-4"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label className="text-white/60 text-xs font-semibold uppercase tracking-widest">
                  Password
                </Label>
              </div>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="h-12 bg-white/[0.04] border border-white/[0.08] text-white placeholder:text-white/20 rounded-xl focus:border-violet-500 focus:ring-1 focus:ring-violet-500/50 focus:bg-white/[0.06] transition-all duration-200 pl-4 pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Submit */}
            <Button
              type="submit"
              disabled={isLoading}
              className={cn(
                "w-full h-12 rounded-xl font-bold text-sm tracking-wide transition-all duration-300",
                "bg-gradient-to-r from-violet-600 to-fuchsia-600",
                "hover:from-violet-500 hover:to-fuchsia-500",
                "shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40",
                "hover:-translate-y-0.5 active:translate-y-0",
                "disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0",
              )}
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Authenticating...
                </div>
              ) : (
                <div className="flex items-center justify-center gap-2">
                  Sign In to Dashboard
                  <ArrowRight className="w-4 h-4" />
                </div>
              )}
            </Button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-white/[0.06]" />
            <span className="text-white/20 text-xs font-medium">
              SECURED ACCESS
            </span>
            <div className="flex-1 h-px bg-white/[0.06]" />
          </div>

          {/* Security badges */}
          <div className="flex items-center justify-center gap-4">
            {["256-bit SSL", "2FA Ready", "SOC 2"].map((badge) => (
              <div
                key={badge}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/[0.06]"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span className="text-white/30 text-xs font-medium">
                  {badge}
                </span>
              </div>
            ))}
          </div>

          <p className="text-center text-white/20 text-xs mt-8">
            © 2025 NexusStore Admin · All rights reserved
          </p>
        </div>
      </div>

      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800;900&display=swap");

        body {
          font-family: "Syne", sans-serif;
        }

        .gradient-text {
          background: linear-gradient(
            135deg,
            #7c3aed 0%,
            #c026d3 50%,
            #0ea5e9 100%
          );
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .glass-card {
          background: rgba(255, 255, 255, 0.03);
          backdrop-filter: blur(12px);
        }

        .grid-bg {
          background-image:
            linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
            linear-gradient(
              90deg,
              rgba(255, 255, 255, 0.03) 1px,
              transparent 1px
            );
          background-size: 40px 40px;
        }

        .orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
        }

        .orb-1 {
          width: 500px;
          height: 500px;
          background: radial-gradient(
            circle,
            rgba(124, 58, 237, 0.35) 0%,
            transparent 70%
          );
          top: -150px;
          left: -100px;
          animation: float1 8s ease-in-out infinite;
        }

        .orb-2 {
          width: 400px;
          height: 400px;
          background: radial-gradient(
            circle,
            rgba(192, 38, 211, 0.25) 0%,
            transparent 70%
          );
          bottom: -100px;
          right: -80px;
          animation: float2 10s ease-in-out infinite;
        }

        .orb-3 {
          width: 300px;
          height: 300px;
          background: radial-gradient(
            circle,
            rgba(14, 165, 233, 0.15) 0%,
            transparent 70%
          );
          top: 40%;
          left: 40%;
          animation: float3 12s ease-in-out infinite;
        }

        @keyframes float1 {
          0%,
          100% {
            transform: translate(0, 0) scale(1);
          }
          50% {
            transform: translate(30px, 40px) scale(1.05);
          }
        }

        @keyframes float2 {
          0%,
          100% {
            transform: translate(0, 0) scale(1);
          }
          50% {
            transform: translate(-25px, -30px) scale(1.08);
          }
        }

        @keyframes float3 {
          0%,
          100% {
            transform: translate(0, 0);
          }
          33% {
            transform: translate(-20px, 20px);
          }
          66% {
            transform: translate(20px, -15px);
          }
        }

        @keyframes barRise {
          from {
            transform: scaleY(0);
            opacity: 0;
          }
          to {
            transform: scaleY(1);
            opacity: 1;
          }
        }

        .bar-animate {
          transform-origin: bottom;
          animation: barRise 0.6s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
