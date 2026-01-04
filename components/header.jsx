"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Settings, LogOut, User, Loader2, Search } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function Header() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);

  const handleLogout = async () => {
    setShowProfileDropdown(false);
    await signOut({ callbackUrl: "/" });
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-3 items-center h-16">
          {/* Logo - Left */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <img src="/logo.png" alt="UseStack.ai" className="h-8 object-contain" />
            </Link>
          </div>

          {/* Navigation - Center */}
          <nav className="hidden md:flex items-center justify-center space-x-8">
            <Link
              href="/"
              className="text-gray-600 hover:text-gray-900 font-medium text-sm"
            >
              Home
            </Link>

            <Link
              href="/explore"
              className="text-gray-600 hover:text-gray-900 font-medium text-sm"
            >
              Explore
            </Link>

            <Link
              href="/submit-tool"
              className="text-gray-600 hover:text-gray-900 font-medium text-sm"
            >
              Submit Tool
            </Link>
            <Link
              href="/blogs"
              className="text-gray-600 hover:text-gray-900 font-medium text-sm"
            >
              Blogs
            </Link>
          </nav>

          {/* Right Actions */}
          <div className="flex items-center justify-end space-x-4">
            {/* Search Icon */}
            <button 
              onClick={() => router.push('/explore')}
              className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
            >
              <Search className="w-5 h-5" />
            </button>
          {/*
            {status === "loading" ? (
              <Loader2 className="h-5 w-5 animate-spin text-gray-400" />
             ) : session ? (
              // User is logged in - show profile image or initial with dropdown
              <div
                className="relative"
                onMouseEnter={() => setShowProfileDropdown(true)}
                onMouseLeave={() => setShowProfileDropdown(false)}
              >
                <button className="flex items-center justify-center w-8 h-8 rounded-full overflow-hidden hover:ring-2 hover:ring-gray-200 transition-all">
                  {session.user?.image ? (
                    <img 
                      src={session.user.image} 
                      alt={session.user?.name || "User"} 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-blue-600 flex items-center justify-center">
                      <span className="text-white text-sm font-medium">
                        {session.user?.name?.[0]?.toUpperCase() || session.user?.email?.[0]?.toUpperCase() || "U"}
                      </span>
                    </div>
                  )}
                </button>

                {showProfileDropdown && (
                  <div className="absolute right-0 top-full w-56 bg-white rounded-md shadow-lg border border-gray-200 py-2 z-50">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {session.user?.name || "User"}
                      </p>
                      <p className="text-xs text-gray-500 truncate">
                        {session.user?.email}
                      </p>
                    </div>
                    
                    {session.user?.role === "admin" && (
                      <Link
                        href="/admin"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      >
                        <Settings className="w-4 h-4 mr-2" />
                        Admin Dashboard
                      </Link>
                    )}
                    
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              // User is not logged in - show Login button
              <Link href="/login">
                <Button variant="outline" size="sm" className="rounded-full border-gray-300 text-sm">
                  Login
                </Button>
              </Link>
            )}
              */}
          </div>
        </div>
      </div>
    </header>
  );
}
