"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Package,
  Users,
  BarChart3,
  Settings,
  Database,
  FileText,
  ChevronLeft,
  ChevronRight,
  Home,
  RefreshCw,
  TrendingUp,
  FolderOpen,
  UserCheck,
  Bell,
  Search,
  Menu,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const navigationItems = [
  {
    title: "Overview",
    items: [
      {
        title: "Dashboard",
        href: "/admin",
        icon: LayoutDashboard,
        isActive: true,
      },
      {
        title: "Analytics",
        href: "/admin/analytics",
        icon: TrendingUp,
      },
      {
        title: "Reports",
        href: "/admin/reports",
        icon: BarChart3,
      },
    ],
  },
  {
    title: "Content Management",
    items: [
      {
        title: "AI Stacks",
        href: "/admin/stacks",
        icon: Package,
      },
      {
        title: "AI Tools",
        href: "/admin/tools",
        icon: Database,
      },
      {
        title: "Categories",
        href: "/admin/categories",
        icon: FileText,
      },
      {
        title: "Submissions",
        href: "/admin/submissions",
        icon: RefreshCw,
      },
    ],
  },
  {
    title: "User Management",
    items: [
      {
        title: "Users",
        href: "/admin/users",
        icon: Users,
      },
      {
        title: "Waitlist",
        href: "/admin/waitlist",
        icon: UserCheck,
      },
    ],
  },
  {
    title: "System",
    items: [
      {
        title: "Settings",
        href: "/admin/settings",
        icon: Settings,
      },
    ],
  },
];

export default function AdminSidebar({ isCollapsed, setIsCollapsed }) {
  const pathname = usePathname();

  return (
    <div
      className={cn(
        "flex h-full flex-col bg-sidebar border-r border-sidebar-border transition-all duration-300",
        isCollapsed ? "w-16" : "w-64"
      )}
    >
      {/* Header */}
      <div className="flex h-14 items-center border-b border-sidebar-border px-4">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
            <Package className="h-4 w-4" />
          </div>
          {!isCollapsed && (
            <span className="text-sm font-semibold text-sidebar-foreground">
              AI Tools Admin
            </span>
          )}
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="ml-auto h-8 w-8 p-0"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          {isCollapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 p-4">
        {navigationItems.map((section) => (
          <div key={section.title} className="space-y-1">
            {!isCollapsed && (
              <div className="px-3 py-2">
                <h3 className="text-xs font-semibold text-sidebar-foreground/70 uppercase tracking-wider">
                  {section.title}
                </h3>
              </div>
            )}
            {section.items.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                    isActive
                      ? "bg-sidebar-accent text-sidebar-accent-foreground"
                      : "text-sidebar-foreground/70",
                    isCollapsed && "justify-center px-2"
                  )}
                >
                  <item.icon className="h-4 w-4 flex-shrink-0" />
                  {!isCollapsed && <span>{item.title}</span>}
                </Link>
              );
            })}
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="border-t border-sidebar-border p-4">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-full bg-sidebar-accent flex items-center justify-center">
            <span className="text-xs font-medium text-sidebar-accent-foreground">
              A
            </span>
          </div>
          {!isCollapsed && (
            <div className="flex-1">
              <p className="text-sm font-medium text-sidebar-foreground">
                Admin User
              </p>
              <p className="text-xs text-sidebar-foreground/70">
                admin@example.com
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
