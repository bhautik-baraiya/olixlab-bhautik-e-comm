"use client";

import { useEffect, useState } from "react";
import {
  Package,
  Clock,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  Truck,
  XCircle,
  Search,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Header from "@/components/admin/Header";
import { api } from "@/lib/axios";

// ─── Types ───────────────────────────────────────────────────────────────────

type OrderStatus = "PENDING" | "PAID" | "SHIPPED" | "DELIVERED" | "CANCELLED";

type OrderItem = {
  id: string;
  productId: string;
  quantity: number;
  price: number;
  product: { name: string; image: string };
};

type Order = {
  id: string;
  stripeSessionId: string;
  amountTotal: number;
  customerEmail: string;
  status: OrderStatus;
  createdAt: string;
  items: OrderItem[];
};

// ─── Status config ────────────────────────────────────────────────────────────

const statusConfig: Record<OrderStatus, { label: string; icon: React.ReactNode; cls: string }> = {
  PENDING:   { label: "Pending",   icon: <Clock className="w-3 h-3" />,        cls: "bg-amber-500/10   text-amber-400   border border-amber-500/20"   },
  PAID:      { label: "Paid",      icon: <CheckCircle2 className="w-3 h-3" />, cls: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" },
  SHIPPED:   { label: "Shipped",   icon: <Truck className="w-3 h-3" />,        cls: "bg-blue-500/10    text-blue-400    border border-blue-500/20"    },
  DELIVERED: { label: "Delivered", icon: <CheckCircle2 className="w-3 h-3" />, cls: "bg-violet-500/10  text-violet-400  border border-violet-500/20"  },
  CANCELLED: { label: "Cancelled", icon: <XCircle className="w-3 h-3" />,      cls: "bg-red-500/10     text-red-400     border border-red-500/20"     },
};

const fmt = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", { day: "numeric", month: "short", year: "numeric" });

// ─── Example data ─────────────────────────────────────────────────────────────

const EXAMPLE_ORDERS: Order[] = [
  {
    id: "ORD-8821", stripeSessionId: "cs_test_a1", amountTotal: 14200,
    customerEmail: "priya@example.com", status: "DELIVERED",
    createdAt: new Date().toISOString(),
    items: [{ id: "i1", productId: "p1", quantity: 1, price: 142, product: { name: "Nike Air Max 270", image: "https://placehold.co/40" } }],
  },
  {
    id: "ORD-8820", stripeSessionId: "cs_test_a2", amountTotal: 25000,
    customerEmail: "rahul@example.com", status: "SHIPPED",
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    items: [
      { id: "i2", productId: "p2", quantity: 1, price: 130, product: { name: "Sony WH-1000XM5", image: "https://placehold.co/40" } },
      { id: "i3", productId: "p3", quantity: 1, price: 120, product: { name: "Phone Case", image: "https://placehold.co/40" } },
    ],
  },
  {
    id: "ORD-8819", stripeSessionId: "cs_test_a3", amountTotal: 46593,
    customerEmail: "ananya@example.com", status: "PAID",
    createdAt: new Date(Date.now() - 86400000 * 3).toISOString(),
    items: [{ id: "i4", productId: "p4", quantity: 1, price: 465, product: { name: "Apple Watch SE", image: "https://placehold.co/40" } }],
  },
  {
    id: "ORD-8818", stripeSessionId: "cs_test_a4", amountTotal: 8500,
    customerEmail: "vikram@example.com", status: "PENDING",
    createdAt: new Date(Date.now() - 86400000 * 5).toISOString(),
    items: [{ id: "i5", productId: "p5", quantity: 2, price: 42, product: { name: "USB-C Hub", image: "https://placehold.co/40" } }],
  },
  {
    id: "ORD-8817", stripeSessionId: "cs_test_a5", amountTotal: 3200,
    customerEmail: "sneha@example.com", status: "CANCELLED",
    createdAt: new Date(Date.now() - 86400000 * 7).toISOString(),
    items: [{ id: "i6", productId: "p6", quantity: 1, price: 32, product: { name: "Laptop Stand", image: "https://placehold.co/40" } }],
  },
];

// ─── Skeleton row ─────────────────────────────────────────────────────────────

function SkeletonRow() {
  return (
    <tr className="border-b border-white/[0.04]">
      {[140, 160, 180, 80, 90, 70].map((w, i) => (
        <td key={i} className="px-6 py-4">
          <div className={`h-3.5 rounded bg-white/[0.05] animate-pulse w-[${w}px]`} />
        </td>
      ))}
      <td className="px-6 py-4" />
    </tr>
  );
}

// ─── Items drawer ─────────────────────────────────────────────────────────────

function ItemsDrawer({ items }: { items: OrderItem[] }) {
  return (
    <tr>
      <td colSpan={7} className="px-6 pb-4">
        <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] overflow-hidden">
          <div className="px-5 py-2.5 border-b border-white/[0.06]">
            <p className="text-white/25 text-[10px] font-bold uppercase tracking-widest">Order Items</p>
          </div>
          {items.map((item, idx) => (
            <div
              key={item.id}
              className={cn("flex items-center gap-4 px-5 py-3", idx !== items.length - 1 && "border-b border-white/[0.04]")}
            >
              <img src={item.product.image} alt={item.product.name} className="w-9 h-9 rounded-lg object-cover bg-white/5 shrink-0" />
              <p className="flex-1 text-white/60 text-sm">{item.product.name}</p>
              <p className="text-white/25 text-xs">Qty: {item.quantity}</p>
              <p className="text-white/50 text-sm font-semibold w-16 text-right">₹{item.price}</p>
            </div>
          ))}
        </div>
      </td>
    </tr>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<OrderStatus | "ALL">("ALL");

  useEffect(() => {
    const load = async () => {
      try {
       const data = await api.get("/admin/orders/get")
       console.log(data)
       setOrders(data.data.data as Order[]);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const filtered = orders.filter((o) => {
    const matchQ =
      o.id.toLowerCase().includes(search.toLowerCase()) ||
      o.customerEmail.toLowerCase().includes(search.toLowerCase());
    return matchQ && (statusFilter === "ALL" || o.status === statusFilter);
  });

  const totalRevenue = orders.reduce((s, o) => s + o.amountTotal, 0);
  const fulfilledCount = orders.filter((o) => ["PAID", "SHIPPED", "DELIVERED"].includes(o.status)).length;

  return (
    <div className="min-h-screen">
      <Header title="Orders" subtitle="Manage and track all customer orders" />

      <div className="p-6 space-y-6">

        {/* ── Stat cards — same style as dashboard ── */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { label: "Total Orders",   value: String(orders.length),               sub: "all time",                    color: "text-white"        },
            { label: "Total Revenue",  value: `₹${(totalRevenue / 100).toFixed(2)}`, sub: "from all orders",           color: "text-emerald-400"  },
            { label: "Fulfilled",      value: String(fulfilledCount),               sub: "paid · shipped · delivered",  color: "text-violet-400"   },
          ].map(({ label, value, sub, color }) => (
            <div key={label} className="rounded-2xl border border-white/[0.06] bg-[#0C0E15] px-6 py-5">
              <p className="text-white/25 text-[11px] font-bold uppercase tracking-widest mb-2">{label}</p>
              <p className={cn("text-2xl font-black", color)}>{value}</p>
              <p className="text-white/20 text-xs mt-1">{sub}</p>
            </div>
          ))}
        </div>

        {/* ── Table card ── */}
        <div className="rounded-2xl border border-white/[0.06] bg-[#0C0E15] overflow-hidden">

          {/* Card header */}
          <div className="px-6 py-4 border-b border-white/[0.06] flex flex-col sm:flex-row sm:items-center gap-3">
            <div className="flex-1">
              <p className="text-white font-semibold text-sm">Recent Orders</p>
              <p className="text-white/25 text-xs mt-0.5">Latest {filtered.length} transactions</p>
            </div>

            {/* Search input */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/20" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search order ID or email…"
                className="bg-white/[0.04] border border-white/[0.06] rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-white/20 focus:outline-none focus:border-violet-500/40 w-56 transition-colors"
              />
            </div>

            {/* Status filter pills */}
            <div className="flex items-center gap-1.5 flex-wrap">
              {(["ALL", "PENDING", "PAID", "SHIPPED", "DELIVERED", "CANCELLED"] as const).map((s) => (
                <button
                  key={s}
                  onClick={() => setStatusFilter(s)}
                  className={cn(
                    "text-[11px] font-semibold px-2.5 py-1.5 rounded-lg border transition-all",
                    statusFilter === s
                      ? "bg-violet-500/20 text-violet-400 border-violet-500/30"
                      : "bg-transparent text-white/25 border-white/[0.06] hover:text-white/50"
                  )}
                >
                  {s === "ALL" ? "All" : s[0] + s.slice(1).toLowerCase()}
                </button>
              ))}
            </div>
          </div>

          {/* Table */}
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/[0.06]">
                {["ORDER ID", "CUSTOMER", "PRODUCT", "AMOUNT", "STATUS", "DATE", ""].map((h) => (
                  <th key={h} className="px-6 py-3.5 text-left text-[10px] font-bold tracking-widest text-white/20">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {loading ? (
                [...Array(5)].map((_, i) => <SkeletonRow key={i} />)
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-20 text-center">
                    <div className="flex flex-col items-center gap-3">
                      <Package className="w-8 h-8 text-white/10" />
                      <p className="text-white/25 text-sm">No orders found</p>
                    </div>
                  </td>
                </tr>
              ) 
              : (
                filtered.flatMap((order) => {
                  const cfg = statusConfig[order.status];
                  const isExpanded = expandedId === order.id;
                  const first = order.items[0];

                  const row = (
                    <tr
                      key={order.id}
                      onClick={() => setExpandedId(isExpanded ? null : order.id)}
                      className={cn(
                        "border-b border-white/[0.04] cursor-pointer transition-colors",
                        isExpanded ? "bg-white/[0.03]" : "hover:bg-white/[0.02]"
                      )}
                    >
                      {/* Order ID */}
                      <td className="px-6 py-4">
                        <span className="text-violet-400 font-bold text-sm font-mono">#{order.id}</span>
                      </td>

                      {/* Customer */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2.5">
                          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-violet-500 to-pink-500 flex items-center justify-center text-white text-[11px] font-bold shrink-0">
                            {order.customerEmail[0].toUpperCase()}
                          </div>
                          <span className="text-white/55 text-sm truncate max-w-[140px]">
                            {order.customerEmail}
                          </span>
                        </div>
                      </td>

                      {/* Product */}
                      <td className="px-6 py-4">
                        <span className="text-white/55 text-sm">
                          {first?.product.name}
                          {order.items.length > 1 && (
                            <span className="text-white/25 ml-1">+{order.items.length - 1} more</span>
                          )}
                        </span>
                      </td>

                      {/* Amount */}
                      <td className="px-6 py-4">
                        <span className="text-white font-bold text-sm">
                          ₹{(order.amountTotal / 100).toFixed(2)}
                        </span>
                      </td>

                      {/* Status */}
                      <td className="px-6 py-4">
                        <span className={cn("inline-flex items-center gap-1.5 text-[11px] font-bold px-2.5 py-1 rounded-lg", cfg.cls)}>
                          {cfg.icon}{cfg.label}
                        </span>
                      </td>

                      {/* Date */}
                      <td className="px-6 py-4">
                        <span className="text-white/30 text-xs">{fmt(order.createdAt)}</span>
                      </td>

                      {/* Expand icon */}
                      <td className="px-6 py-4">
                        <span className="text-white/20">
                          {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        </span>
                      </td>
                    </tr>
                  );

                  return isExpanded
                    ? [row, <ItemsDrawer key={`drawer-${order.id}`} items={order.items} />]
                    : [row];
                })
              )
              }
            </tbody>
          </table>

          {/* Footer */}
          {!loading && filtered.length > 0 && (
            <div className="px-6 py-3.5 border-t border-white/[0.06] flex items-center justify-between">
              <p className="text-white/20 text-xs">
                Showing {filtered.length} of {orders.length} orders
              </p>
              <p className="text-white/15 text-xs">Click a row to expand items</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}