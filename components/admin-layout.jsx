"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import AdminSidebar from "@/components/admin-sidebar";
import { Button } from "@/components/ui/button";
import { Bell, Search, Menu, X, Loader2, ShieldAlert } from "lucide-react";

export default function AdminLayout({ children }) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();
  const { data: session, status } = useSession();

  // Redirect unauthenticated users to login
  useEffect(() => {
    if (status === "loading") return;

    if (!session) {
      router.push("/login?callbackUrl=/admin");
    }
  }, [session, status, router]);

  const handleLogout = async () => {
    await signOut({ callbackUrl: "/" });
  };

  // Show loading state while checking auth
  if (status === "loading") {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto text-muted-foreground" />
          <p className="mt-2 text-sm text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  // Show access denied only if we're sure the user is not an admin
  // (status is authenticated but role is not admin, or status is unauthenticated)
  if (status === "unauthenticated" || (status === "authenticated" && !["admin", "agent"].includes(session?.user?.role))) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <div className="text-center">
          <ShieldAlert className="h-12 w-12 mx-auto text-destructive" />
          <h1 className="mt-4 text-xl font-semibold">Access Denied</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            You don't have permission to access the admin panel.
          </p>
          <Button className="mt-4" onClick={() => router.push("/")}>
            Go to Home
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-background">
      {/* Desktop Sidebar (fixed) */}
      <div className="hidden md:block fixed inset-y-0 left-0 z-40 w-64">
        <AdminSidebar
          isCollapsed={isCollapsed}
          setIsCollapsed={setIsCollapsed}
          userRole={session.user?.role}
          userName={session.user?.name}
          userEmail={session.user?.email}
        />
      </div>

      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="fixed inset-0 bg-black/50"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="fixed left-0 top-0 h-full w-64">
            <AdminSidebar
              isCollapsed={false}
              setIsCollapsed={() => {}}
              userRole={session.user?.role}
              userName={session.user?.name}
              userEmail={session.user?.email}
            />
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 min-h-0 w-full md:pl-64">
        {/* Top Header (fixed) */}
        <header className="fixed top-0 right-0 left-0 md:left-64 z-30 flex h-14 items-center border-b border-border bg-background px-4 md:px-6">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu className="h-4 w-4" />
            </Button>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-semibold">AI Tools Admin</h1>
            </div>
          </div>

          <div className="ml-auto flex items-center gap-4">
            {/* Search */}
            <div className="relative hidden sm:block">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search..."
                className="w-64 rounded-md border border-input bg-background px-10 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>

            {/* Notifications */}
            <Button variant="ghost" size="sm" className="relative">
              <Bell className="h-4 w-4" />
              <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-destructive text-[10px] text-destructive-foreground flex items-center justify-center">
                3
              </span>
            </Button>

            {/* User Menu */}
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
                <span className="text-xs font-medium">
                  {session.user?.name?.[0]?.toUpperCase() || "A"}
                </span>
              </div>
              <div className="hidden sm:block">
                <p className="text-sm font-medium">{session.user?.name || "Admin User"}</p>
                <p className="text-xs text-muted-foreground">
                  {session.user?.email || "admin@example.com"}
                </p>
              </div>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                Logout
              </Button>
            </div>
          </div>
        </header>

        {/* Main Content Area (only this scrolls) */}
        <main className="flex-1 overflow-y-auto pt-16">
          <div className="p-2 md:p-6">{children}</div>
        </main>
      </div>
    </div>
  );
}
