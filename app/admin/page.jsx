"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Package,
  Users,
  BarChart3,
  Settings,
  Plus,
  ExternalLink,
  Database,
  FileText,
} from "lucide-react";
import Link from "next/link";

export default function AdminDashboard() {
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Check if admin is logged in
    const adminStatus = localStorage.getItem("adminLoggedIn");
    if (adminStatus !== "true") {
      router.push("/");
      return;
    }
    setIsAdminLoggedIn(true);
  }, [router]);

  if (!isAdminLoggedIn) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Access Denied
          </h1>
          <p className="text-gray-600">
            Please log in as admin to access this page.
          </p>
        </div>
      </div>
    );
  }

  const adminModules = [
    {
      id: "stacks",
      title: "AI Stacks Management",
      description:
        "Create and manage curated collections of AI tools and agents",
      icon: <Package className="w-8 h-8" />,
      href: "/admin/stacks",
      color: "bg-blue-500",
      stats: "Manage stacks",
    },
    {
      id: "products",
      title: "Products Management",
      description:
        "Add, edit, and manage AI tools and products in the database",
      icon: <Database className="w-8 h-8" />,
      href: "/admin/products",
      color: "bg-green-500",
      stats: "Coming soon",
      disabled: true,
    },
    {
      id: "categories",
      title: "Categories Management",
      description: "Organize and manage product categories and classifications",
      icon: <FileText className="w-8 h-8" />,
      href: "/admin/categories",
      color: "bg-purple-500",
      stats: "Coming soon",
      disabled: true,
    },
    {
      id: "analytics",
      title: "Analytics Dashboard",
      description:
        "View platform statistics, user engagement, and performance metrics",
      icon: <BarChart3 className="w-8 h-8" />,
      href: "/admin/analytics",
      color: "bg-orange-500",
      stats: "Coming soon",
      disabled: true,
    },
    {
      id: "users",
      title: "User Management",
      description: "Manage user accounts, permissions, and platform access",
      icon: <Users className="w-8 h-8" />,
      href: "/admin/users",
      color: "bg-indigo-500",
      stats: "Coming soon",
      disabled: true,
    },
    {
      id: "settings",
      title: "Platform Settings",
      description:
        "Configure platform-wide settings, integrations, and preferences",
      icon: <Settings className="w-8 h-8" />,
      href: "/admin/settings",
      color: "bg-gray-500",
      stats: "Coming soon",
      disabled: true,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Admin Dashboard
          </h1>
          <p className="text-gray-600">
            Manage your AI tool discovery platform from this central hub
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Package className="w-6 h-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">
                    Active Stacks
                  </p>
                  <p className="text-2xl font-bold text-gray-900">3</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Database className="w-6 h-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">
                    Total Products
                  </p>
                  <p className="text-2xl font-bold text-gray-900">150+</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <BarChart3 className="w-6 h-6 text-purple-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">
                    Categories
                  </p>
                  <p className="text-2xl font-bold text-gray-900">12</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Admin Modules */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Admin Modules
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {adminModules.map((module) => (
              <Card
                key={module.id}
                className={`hover:shadow-lg transition-all duration-300 ${
                  module.disabled ? "opacity-60" : "hover:scale-105"
                }`}
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div
                      className={`p-3 ${module.color} text-white rounded-lg`}
                    >
                      {module.icon}
                    </div>
                    {module.disabled && (
                      <Badge variant="secondary" className="text-xs">
                        Coming Soon
                      </Badge>
                    )}
                  </div>
                  <CardTitle className="text-xl">{module.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">{module.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">
                      {module.stats}
                    </span>
                    {module.disabled ? (
                      <Button variant="outline" disabled>
                        <Settings className="w-4 h-4 mr-2" />
                        Coming Soon
                      </Button>
                    ) : (
                      <Link href={module.href}>
                        <Button className="bg-blue-600 hover:bg-blue-700">
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Open
                        </Button>
                      </Link>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Plus className="w-5 h-5 mr-2 text-blue-600" />
                  Create New Stack
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Quickly create a new curated collection of AI tools for
                  specific use cases.
                </p>
                <Link href="/admin/stacks">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">
                    Go to Stacks Manager
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart3 className="w-5 h-5 mr-2 text-green-600" />
                  Platform Overview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  View platform statistics and performance metrics (coming
                  soon).
                </p>
                <Button variant="outline" disabled className="w-full">
                  Analytics Dashboard
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Recent Activity */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Recent Activity
          </h2>
          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">
                    Stack "Business Productivity" was updated
                  </span>
                  <span className="text-xs text-gray-400">2 hours ago</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">
                    New stack "Early Startups" was created
                  </span>
                  <span className="text-xs text-gray-400">1 day ago</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">
                    Stack "Solopreneur" was created
                  </span>
                  <span className="text-xs text-gray-400">2 days ago</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
