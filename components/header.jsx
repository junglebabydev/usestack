"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronDown, Settings, LogOut, User, Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { supabase } from "@/lib/supabase";

export default function Header() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [showDropdown, setShowDropdown] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [dbCategories, setDbCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const { data, error } = await supabase
        .from("categories")
        .select("id, name, slug")
        .order("name", { ascending: true });

      if (!error && data) {
        setDbCategories(data);
      } else {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleLogout = async () => {
    setShowProfileDropdown(false);
    await signOut({ callbackUrl: "/" });
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">×</span>
              </div>
              <span className="text-xl font-bold text-gray-900">obase</span>
            </Link>
          </div>

          {/* Navigation and Action Buttons */}
          <div className="flex items-center space-x-8">
            {/* Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link
                href="/"
                className="text-gray-700 hover:text-gray-900 font-medium"
              >
                Home
              </Link>

              {/* Explore Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setShowDropdown(true)}
                onMouseLeave={() => setShowDropdown(false)}
              >
                <button className="flex items-center text-gray-700 hover:text-gray-900 font-medium">
                  Explore
                  <ChevronDown className="ml-1 h-4 w-4" />
                </button>

                {showDropdown && (
                  <div className="absolute top-full left-0 w-64 bg-white rounded-b-md shadow-lg border border-gray-200 py-2 z-50">
                    {dbCategories.slice(0, 10).map((category) => (
                      <Link
                        key={category.id}
                        href={`/explore?category=${
                          category.slug || category.id
                        }`}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                      >
                        {category.name}
                      </Link>
                    ))}
                    <div className="border-t border-gray-100 mt-2 pt-2">
                      <Link
                        href="/explore"
                        className="block px-4 py-2 text-sm font-medium text-blue-600 hover:bg-gray-50"
                      >
                        Explore
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              <Link
                href="/submit-tool"
                className="text-gray-700 hover:text-gray-900 font-medium"
              >
                Submit Tool
              </Link>
            </nav>

            {/* Auth Section */}
            <div className="flex items-center space-x-3">
              {status === "loading" ? (
                <Loader2 className="h-5 w-5 animate-spin text-gray-400" />
              ) : session ? (
                // User is logged in - show profile dropdown
                <div
                  className="relative"
                  onMouseEnter={() => setShowProfileDropdown(true)}
                  onMouseLeave={() => setShowProfileDropdown(false)}
                >
                  <button className="flex items-center space-x-2 p-1 rounded-full hover:bg-gray-100 transition-colors">
                    <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center">
                      <span className="text-sm font-medium">
                        {session.user?.name?.[0]?.toUpperCase() || session.user?.email?.[0]?.toUpperCase() || "U"}
                      </span>
                    </div>
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
                // User is not logged in - show login button
                <Link href="/login">
                  <Button variant="outline" size="sm">
                    <User className="w-4 h-4 mr-2" />
                    Login
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
