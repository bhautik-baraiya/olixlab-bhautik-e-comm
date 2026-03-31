"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  PlusSquare,
  ShoppingBag,
  ShoppingCart,
  Users,
  BarChart3,
  Settings,
  Bell,
  LogOut,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  // {
  //   label: "Main",
  //   items: [
  //     { icon: LayoutDashboard, label: "Dashboard", href: "/admin/dashboard" },
  //     { icon: ShoppingCart, label: "Orders", href: "/admin/dashboard/orders", badge: "12" },
  //     { icon: Users, label: "Customers", href: "/admin/dashboard/customers" },
  //     { icon: BarChart3, label: "Analytics", href: "/admin/dashboard/analytics" },
  //   ],
  // },
  {
    label: "Catalog",
    items: [
      { icon: Package, label: "Products", href: "/admin/dashboard/products" },
      { icon: PlusSquare, label: "Add Product", href: "/admin/dashboard/products/add" },
    ],
  },
  // {
  //   label: "System",
  //   items: [
  //     { icon: Bell, label: "Notifications", href: "/admin/dashboard/notifications", badge: "3" },
  //     { icon: Settings, label: "Settings", href: "/admin/dashboard/settings" },
  //   ],
  // },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 h-screen w-[240px] bg-[#0C0E15] border-r border-white/[0.06] flex flex-col z-40">
      {/* Logo */}
      <div className="h-16 flex items-center px-5 border-b border-white/[0.06]">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-600 flex items-center justify-center shadow-lg shadow-violet-500/30">
            <ShoppingBag className="w-4 h-4 text-white" />
          </div>
          <div>
            <span className="text-white font-black text-base tracking-tight leading-none block">
              NEXUS<span className="text-violet-400">STORE</span>
            </span>
            <span className="text-white/30 text-[10px] font-medium tracking-widest uppercase">
              Admin Panel
            </span>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-5 scrollbar-hide">
        {navItems.map((group) => (
          <div key={group.label}>
            <p className="text-white/25 text-[10px] font-bold uppercase tracking-[0.15em] px-3 mb-2">
              {group.label}
            </p>
            <ul className="space-y-0.5">
              {group.items.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={cn(
                        "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group relative",
                        isActive
                          ? "bg-gradient-to-r from-violet-600/20 to-fuchsia-600/10 text-white border border-violet-500/20"
                          : "text-white/40 hover:text-white/80 hover:bg-white/[0.04]"
                      )}
                    >
                      {/* Active indicator bar */}
                      {isActive && (
                        <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-violet-500 rounded-r-full" />
                      )}
                      <item.icon
                        className={cn(
                          "w-4 h-4 flex-shrink-0 transition-colors",
                          isActive ? "text-violet-400" : "text-white/30 group-hover:text-white/60"
                        )}
                      />
                      <span className="flex-1">{item.label}</span>
                      {item.badge && (
                        <span className="text-[10px] font-bold bg-violet-500/20 text-violet-400 border border-violet-500/30 px-1.5 py-0.5 rounded-md">
                          {item.badge}
                        </span>
                      )}
                      {isActive && (
                        <ChevronRight className="w-3 h-3 text-violet-400/60" />
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* User profile */}
      <div className="p-3 border-t border-white/[0.06]">
        <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/[0.04] transition-colors cursor-pointer group">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-fuchsia-600 flex items-center justify-center text-white text-xs font-black flex-shrink-0">
            A
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white text-xs font-semibold truncate">Admin User</p>
            <p className="text-white/30 text-[10px] truncate">admin@nexusstore.com</p>
          </div>
          <LogOut className="w-3.5 h-3.5 text-white/20 group-hover:text-white/50 transition-colors flex-shrink-0" />
        </div>
      </div>
    </aside>
  );
}