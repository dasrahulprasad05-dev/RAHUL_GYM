"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Users,
  Calendar,
  Dumbbell,
  CreditCard,
  BookOpen,
  Settings,
  LogOut,
  ChevronLeft,
} from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useState } from "react";

const adminLinks = [
  { href: "/admin", label: "Overview", icon: LayoutDashboard },
  { href: "/admin/classes", label: "Classes", icon: Dumbbell },
  { href: "/admin/users", label: "Users", icon: Users },
  { href: "/admin/bookings", label: "Bookings", icon: BookOpen },
  { href: "/admin/memberships", label: "Memberships", icon: CreditCard },
];

const memberLinks = [
  { href: "/member", label: "Dashboard", icon: LayoutDashboard },
  { href: "/member/bookings", label: "My Bookings", icon: Calendar },
  { href: "/member/profile", label: "Profile", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [collapsed, setCollapsed] = useState(false);
  const isAdmin = session?.user?.role === "ADMIN";
  const links = isAdmin ? adminLinks : memberLinks;

  return (
    <motion.aside
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className={cn(
        "fixed left-0 top-0 z-40 flex h-screen flex-col border-r border-white/10 bg-zinc-950/95 backdrop-blur-xl transition-all duration-300",
        collapsed ? "w-[68px]" : "w-64"
      )}
    >
      {/* Logo */}
      <div className="flex h-16 items-center justify-between border-b border-white/10 px-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-lime-400 text-zinc-950 shrink-0">
            <Dumbbell className="h-4 w-4" />
          </div>
          {!collapsed && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="font-bold text-white whitespace-nowrap"
            >
              IRON<span className="text-lime-400">PULSE</span>
            </motion.span>
          )}
        </Link>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="text-zinc-500 hover:text-white transition-colors hidden lg:block"
        >
          <ChevronLeft
            className={cn(
              "h-4 w-4 transition-transform",
              collapsed && "rotate-180"
            )}
          />
        </button>
      </div>

      {/* Role badge */}
      {!collapsed && (
        <div className="px-4 pt-4 pb-2">
          <span
            className={cn(
              "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold",
              isAdmin
                ? "bg-lime-400/10 text-lime-400 border border-lime-400/20"
                : "bg-blue-400/10 text-blue-400 border border-blue-400/20"
            )}
          >
            {isAdmin ? "Admin" : "Member"}
          </span>
        </div>
      )}

      {/* Nav Links */}
      <nav className="flex-1 space-y-1 p-3 overflow-y-auto">
        {links.map((link) => {
          const active = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200 group relative",
                active
                  ? "bg-lime-400/10 text-lime-400"
                  : "text-zinc-400 hover:bg-white/5 hover:text-white"
              )}
              title={collapsed ? link.label : undefined}
            >
              {active && (
                <motion.div
                  layoutId="sidebar-active"
                  className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-lime-400 rounded-r"
                />
              )}
              <link.icon className="h-4 w-4 shrink-0" />
              {!collapsed && <span>{link.label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="border-t border-white/10 p-3">
        {!collapsed && (
          <div className="mb-2 px-3 text-xs text-zinc-500 truncate">
            {session?.user?.email}
          </div>
        )}
        <Button
          variant="ghost"
          className={cn(
            "w-full gap-3 text-zinc-400 hover:text-white hover:bg-white/5",
            collapsed ? "justify-center px-0" : "justify-start"
          )}
          onClick={() => signOut({ callbackUrl: "/" })}
          title={collapsed ? "Sign out" : undefined}
        >
          <LogOut className="h-4 w-4 shrink-0" />
          {!collapsed && <span>Sign out</span>}
        </Button>
      </div>
    </motion.aside>
  );
}
