"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronDown, Settings, LogOut } from "lucide-react";
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
  const [showDropdown, setShowDropdown] = useState(false);
  const [dbCategories, setDbCategories] = useState([]);
  const [isLoginDialogOpen, setIsLoginDialogOpen] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [loginCredentials, setLoginCredentials] = useState({
    username: "",
    password: "",
  });
  const [loginError, setLoginError] = useState("");

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

    // Check if admin is already logged in (from localStorage)
    const adminStatus = localStorage.getItem("adminLoggedIn");
    if (adminStatus === "true") {
      setIsAdminLoggedIn(true);
    }
  }, []);

  const handleLogin = () => {
    if (
      loginCredentials.username === "admin" &&
      loginCredentials.password === "admin"
    ) {
      setIsAdminLoggedIn(true);
      setIsLoginDialogOpen(false);
      setLoginError("");
      setLoginCredentials({ username: "", password: "" });
      localStorage.setItem("adminLoggedIn", "true");
      // Redirect to admin dashboard
      router.push("/admin");
    } else {
      setLoginError(
        "Invalid credentials. Use username: admin, password: admin"
      );
    }
  };

  const handleLogout = () => {
    setIsAdminLoggedIn(false);
    localStorage.removeItem("adminLoggedIn");
    // Redirect to homepage
    router.push("/");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleLogin();
    }
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

            {/* Action Buttons */}
            <div className="flex items-center space-x-3">
              {isAdminLoggedIn ? (
                <div className="flex items-center space-x-3">
                  <Link href="/admin">
                    <Button variant="outline" size="sm">
                      <Settings className="w-4 h-4 mr-2" />
                      Dashboard
                    </Button>
                  </Link>
                  <Button variant="outline" size="sm" onClick={handleLogout}>
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </Button>
                </div>
              ) : (
                <Dialog
                  open={isLoginDialogOpen}
                  onOpenChange={setIsLoginDialogOpen}
                >
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm">
                      <Settings className="w-4 h-4 mr-2" />
                      Admin
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-md">
                    <DialogHeader>
                      <DialogTitle>Admin Login</DialogTitle>
                      <DialogDescription>
                        Enter your admin credentials to access the dashboard
                      </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Username
                        </label>
                        <Input
                          placeholder="Enter username"
                          value={loginCredentials.username}
                          onChange={(e) =>
                            setLoginCredentials({
                              ...loginCredentials,
                              username: e.target.value,
                            })
                          }
                          onKeyPress={handleKeyPress}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Password
                        </label>
                        <Input
                          type="password"
                          placeholder="Enter password"
                          value={loginCredentials.password}
                          onChange={(e) =>
                            setLoginCredentials({
                              ...loginCredentials,
                              password: e.target.value,
                            })
                          }
                          onKeyPress={handleKeyPress}
                        />
                      </div>

                      {loginError && (
                        <div className="text-red-600 text-sm">{loginError}</div>
                      )}

                      <div className="text-xs text-gray-500">
                        Demo credentials: username: admin, password: admin
                      </div>
                    </div>

                    <div className="flex justify-end space-x-2 mt-6">
                      <Button
                        variant="outline"
                        onClick={() => {
                          setIsLoginDialogOpen(false);
                          setLoginError("");
                          setLoginCredentials({ username: "", password: "" });
                        }}
                      >
                        Cancel
                      </Button>
                      <Button
                        onClick={handleLogin}
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        Login
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
