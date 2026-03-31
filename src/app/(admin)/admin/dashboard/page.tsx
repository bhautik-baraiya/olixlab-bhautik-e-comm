"use client";

import {
  TrendingUp,
  TrendingDown,
  ShoppingCart,
  Users,
  Package,
  DollarSign,
  ArrowRight,
  MoreHorizontal,
  Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/admin/Header";
import Link from "next/link";
import { cn } from "@/lib/utils";

// ── Stat cards data ──────────────────────────────────────────────
const stats = [
  {
    label: "Total Revenue",
    value: "$84,254",
    change: "+12.5%",
    up: true,
    icon: DollarSign,
    color: "violet",
    sub: "vs last month",
    bars: [40, 55, 45, 60, 52, 70, 65, 80, 72, 90, 85, 95],
  },
  {
    label: "Total Orders",
    value: "2,841",
    change: "+8.1%",
    up: true,
    icon: ShoppingCart,
    color: "fuchsia",
    sub: "vs last month",
    bars: [30, 45, 35, 55, 48, 62, 58, 70, 65, 75, 72, 80],
  },
  {
    label: "Total Customers",
    value: "18,492",
    change: "+23.4%",
    up: true,
    icon: Users,
    color: "cyan",
    sub: "vs last month",
    bars: [20, 35, 28, 42, 38, 50, 46, 58, 54, 65, 62, 72],
  },
  {
    label: "Products Listed",
    value: "1,204",
    change: "-2.3%",
    up: false,
    icon: Package,
    color: "amber",
    sub: "vs last month",
    bars: [70, 68, 72, 65, 60, 63, 58, 55, 60, 52, 50, 48],
  },
];

const colorMap: Record<string, { text: string; bg: string; glow: string; bar: string }> = {
  violet: {
    text: "text-violet-400",
    bg: "bg-violet-500/10",
    glow: "shadow-violet-500/20",
    bar: "#7c3aed",
  },
  fuchsia: {
    text: "text-fuchsia-400",
    bg: "bg-fuchsia-500/10",
    glow: "shadow-fuchsia-500/20",
    bar: "#c026d3",
  },
  cyan: {
    text: "text-cyan-400",
    bg: "bg-cyan-500/10",
    glow: "shadow-cyan-500/20",
    bar: "#0891b2",
  },
  amber: {
    text: "text-amber-400",
    bg: "bg-amber-500/10",
    glow: "shadow-amber-500/20",
    bar: "#d97706",
  },
};

// ── Recent orders ───────────────────────────────────────────────
const recentOrders = [
  { id: "#ORD-8821", customer: "Priya Sharma", product: "Nike Air Max 270", amount: "$142.00", status: "Delivered", avatar: "P" },
  { id: "#ORD-8820", customer: "Rahul Mehta", product: "Sony WH-1000XM5", amount: "$349.00", status: "Processing", avatar: "R" },
  { id: "#ORD-8819", customer: "Ananya Patel", product: "Apple Watch SE", amount: "$279.00", status: "Shipped", avatar: "A" },
  { id: "#ORD-8818", customer: "Vikram Singh", product: "Levi's 511 Slim", amount: "$68.00", status: "Pending", avatar: "V" },
  { id: "#ORD-8817", customer: "Meera Nair", product: "Samsung Galaxy Tab", amount: "$599.00", status: "Delivered", avatar: "M" },
];

const statusStyle: Record<string, string> = {
  Delivered: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  Processing: "bg-violet-500/10 text-violet-400 border-violet-500/20",
  Shipped: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
  Pending: "bg-amber-500/10 text-amber-400 border-amber-500/20",
};

// ── Top products ────────────────────────────────────────────────
const topProducts = [
  { name: "Nike Air Max 270", sales: 284, revenue: "$40,328", rating: 4.8, stock: 42 },
  { name: "Sony WH-1000XM5", sales: 196, revenue: "$68,404", rating: 4.9, stock: 18 },
  { name: "Apple Watch SE", sales: 167, revenue: "$46,593", rating: 4.7, stock: 31 },
  { name: "Samsung Galaxy Tab", sales: 134, revenue: "$80,266", rating: 4.6, stock: 9 },
];

// ── Monthly revenue chart data ──────────────────────────────────
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const chartData = [42, 55, 48, 67, 59, 73, 68, 82, 75, 88, 80, 95];
const maxVal = Math.max(...chartData);

export default function DashboardPage() {
  return (
    <div className="min-h-screen">
      <Header title="Dashboard" subtitle="Welcome back, Admin 👋" />

      <div className="p-6 space-y-6">

        {/* ── Stat Cards ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {stats.map((stat, i) => {
            const c = colorMap[stat.color];
            return (
              <div
                key={stat.label}
                className={cn(
                  "relative rounded-2xl p-5 border border-white/[0.06] bg-[#0C0E15] overflow-hidden",
                  "hover:border-white/10 transition-all duration-300 hover:-translate-y-0.5",
                  `hover:shadow-xl ${c.glow}`
                )}
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                {/* Subtle bg glow */}
                <div className={cn("absolute top-0 right-0 w-24 h-24 rounded-full blur-2xl opacity-20", c.bg)} />

                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-4">
                    <div className={cn("w-9 h-9 rounded-xl flex items-center justify-center", c.bg)}>
                      <stat.icon className={cn("w-4 h-4", c.text)} />
                    </div>
                    <div className={cn(
                      "flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-lg border",
                      stat.up
                        ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                        : "bg-red-500/10 text-red-400 border-red-500/20"
                    )}>
                      {stat.up ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                      {stat.change}
                    </div>
                  </div>

                  <div>
                    <p className="text-white/40 text-xs font-medium mb-0.5">{stat.label}</p>
                    <p className="text-white text-2xl font-black tracking-tight">{stat.value}</p>
                    <p className="text-white/25 text-xs mt-1">{stat.sub}</p>
                  </div>

                  {/* Mini sparkline */}
                  <div className="flex items-end gap-0.5 h-8 mt-4">
                    {stat.bars.map((h, j) => (
                      <div
                        key={j}
                        className="flex-1 rounded-sm transition-all"
                        style={{
                          height: `${h}%`,
                          background: j >= stat.bars.length - 3
                            ? c.bar
                            : `${c.bar}40`,
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ── Chart + Top Products Row ── */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">

          {/* Revenue Chart */}
          <div className="xl:col-span-2 rounded-2xl border border-white/[0.06] bg-[#0C0E15] p-5">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-white font-black text-base">Revenue Overview</h3>
                <p className="text-white/30 text-xs mt-0.5">Monthly performance this year</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="flex items-center gap-1.5 text-xs text-white/40">
                  <span className="w-2 h-2 rounded-full bg-violet-500 inline-block" /> Revenue
                </span>
                <Button variant="ghost" size="icon" className="w-7 h-7 rounded-lg bg-white/[0.04] text-white/30 hover:text-white hover:bg-white/[0.08]">
                  <MoreHorizontal className="w-3.5 h-3.5" />
                </Button>
              </div>
            </div>

            {/* Bar chart */}
            <div className="flex items-end justify-between gap-1.5 h-40">
              {chartData.map((val, i) => {
                const heightPct = (val / maxVal) * 100;
                return (
                  <div key={i} className="flex-1 flex flex-col items-center gap-1 group cursor-pointer">
                    <div className="w-full relative flex items-end" style={{ height: "136px" }}>
                      <div
                        className="w-full rounded-t-lg transition-all duration-300 group-hover:opacity-100 opacity-80"
                        style={{
                          height: `${heightPct}%`,
                          background: i === 11
                            ? "linear-gradient(to top, #7c3aed, #c026d3)"
                            : "rgba(124,58,237,0.22)",
                        }}
                      />
                    </div>
                    <span className="text-white/25 text-[10px] font-medium">{months[i]}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Top Products */}
          <div className="rounded-2xl border border-white/[0.06] bg-[#0C0E15] p-5">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="text-white font-black text-base">Top Products</h3>
                <p className="text-white/30 text-xs mt-0.5">By revenue this month</p>
              </div>
              <Link href="/admin/dashboard/products">
                <Button variant="ghost" size="sm" className="text-violet-400 hover:text-violet-300 hover:bg-violet-500/10 text-xs h-7 px-2 rounded-lg">
                  View all <ArrowRight className="w-3 h-3 ml-1" />
                </Button>
              </Link>
            </div>

            <div className="space-y-3">
              {topProducts.map((p, i) => (
                <div key={p.name} className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.02] hover:bg-white/[0.04] border border-white/[0.04] hover:border-white/[0.08] transition-all cursor-pointer group">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-600/30 to-fuchsia-600/20 border border-violet-500/20 flex items-center justify-center text-violet-400 font-black text-sm flex-shrink-0">
                    {i + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-xs font-semibold truncate">{p.name}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <Star className="w-2.5 h-2.5 text-amber-400 fill-amber-400" />
                      <span className="text-white/30 text-[10px]">{p.rating}</span>
                      <span className="text-white/15 text-[10px]">·</span>
                      <span className={cn("text-[10px] font-medium", p.stock < 15 ? "text-red-400" : "text-white/30")}>
                        {p.stock} left
                      </span>
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-white text-xs font-bold">{p.revenue}</p>
                    <p className="text-white/30 text-[10px]">{p.sales} sold</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Recent Orders ── */}
        <div className="rounded-2xl border border-white/[0.06] bg-[#0C0E15] p-5">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="text-white font-black text-base">Recent Orders</h3>
              <p className="text-white/30 text-xs mt-0.5">Latest 5 transactions</p>
            </div>
            <Link href="/admin/dashboard/orders">
              <Button variant="ghost" size="sm" className="text-violet-400 hover:text-violet-300 hover:bg-violet-500/10 text-xs h-7 px-2 rounded-lg">
                View all <ArrowRight className="w-3 h-3 ml-1" />
              </Button>
            </Link>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/[0.05]">
                  {["Order ID", "Customer", "Product", "Amount", "Status"].map((h) => (
                    <th key={h} className="text-left text-white/25 text-[11px] font-bold uppercase tracking-widest pb-3 pr-4 last:pr-0">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order, i) => (
                  <tr
                    key={order.id}
                    className="border-b border-white/[0.03] hover:bg-white/[0.02] transition-colors group cursor-pointer"
                    style={{ animationDelay: `${i * 0.05}s` }}
                  >
                    <td className="py-3.5 pr-4">
                      <span className="text-violet-400 text-sm font-bold">{order.id}</span>
                    </td>
                    <td className="py-3.5 pr-4">
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-violet-500/40 to-fuchsia-500/30 flex items-center justify-center text-white/80 text-xs font-black flex-shrink-0">
                          {order.avatar}
                        </div>
                        <span className="text-white/70 text-sm font-medium">{order.customer}</span>
                      </div>
                    </td>
                    <td className="py-3.5 pr-4">
                      <span className="text-white/50 text-sm">{order.product}</span>
                    </td>
                    <td className="py-3.5 pr-4">
                      <span className="text-white text-sm font-bold">{order.amount}</span>
                    </td>
                    <td className="py-3.5">
                      <span className={cn(
                        "text-[11px] font-bold px-2.5 py-1 rounded-lg border",
                        statusStyle[order.status]
                      )}>
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}