"use client";

import { Bell, Search, Menu } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  title: string;
  subtitle?: string;
}

export default function Header({ title, subtitle }: HeaderProps) {
  return (
    <header className="h-16 border-b border-white/[0.06] bg-[#080A0F]/80 backdrop-blur-xl flex items-center px-6 gap-4 sticky top-0 z-30">
      {/* Title */}
      <div className="flex-1">
        <h1 className="text-white font-black text-lg tracking-tight leading-none">{title}</h1>
        {subtitle && (
          <p className="text-white/30 text-xs mt-0.5">{subtitle}</p>
        )}
      </div>

      {/* Search */}
      <div className="relative hidden md:block">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/25" />
        <Input
          placeholder="Search anything..."
          className="w-60 h-9 bg-white/[0.04] border-white/[0.08] text-white placeholder:text-white/20 rounded-xl pl-9 text-sm focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/30"
        />
      </div>

      {/* Notifications */}
      <Button
        variant="ghost"
        size="icon"
        className="relative w-9 h-9 rounded-xl bg-white/[0.04] border border-white/[0.06] hover:bg-white/[0.08] text-white/50 hover:text-white"
      >
        <Bell className="w-4 h-4" />
        <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-violet-500 rounded-full" />
      </Button>

      {/* Avatar */}
      <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-600 flex items-center justify-center text-white text-xs font-black cursor-pointer hover:shadow-lg hover:shadow-violet-500/25 transition-shadow">
        A
      </div>
    </header>
  );
}