"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import AdminLayout from "@/components/admin-layout";
import KPICards from "@/components/kpi-cards";
import ChartsSection from "@/components/charts-section";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Database } from "lucide-react";
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

  return (
  
      <div className="space-y-6 ">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            AI Tools Admin Dashboard
          </h1>
          <p className="text-muted-foreground">
            Manage your AI tool discovery platform, curate stacks, and monitor
            user engagement
          </p>
        </div>

        {/* KPI Cards */}
        <KPICards />

        {/* Charts and Analytics */}
        <ChartsSection />

        {/* Quick Actions */}
        <div>
          <h2 className="text-2xl font-bold tracking-tight mb-6">
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Plus className="w-5 h-5 mr-2 text-primary" />
                  Create AI Stack
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Quickly create a new curated collection of AI tools for
                  specific use cases like content creation, coding, or design.
                </p>
                <Link href="/admin/stacks">
                  <Button className="w-full bg-primary hover:bg-primary/90">
                    Go to Stacks Manager
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Database className="w-5 h-5 mr-2 text-green-600" />
                  Add New AI Tool
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Add a new AI tool to the discovery database with proper
                  categorization and metadata.
                </p>
                <Link href="/admin/tools">
                  <Button variant="outline" className="w-full">
                    Add AI Tool
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
  );
}
