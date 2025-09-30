"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import AdminLayout from "@/components/admin-layout";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Plus, Edit, Trash2, ExternalLink } from "lucide-react";

export default function AdminToolsListPage() {
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [tools, setTools] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    // Check if admin is logged in
    const adminStatus = localStorage.getItem("adminLoggedIn");
    if (adminStatus !== "true") {
      router.push("/");
      return;
    }
    setIsAdminLoggedIn(true);
    fetchTools();
  }, [router]);

  const fetchTools = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("products")
        .select("id, name, slug, tagline, website_url, created_at")
        .order("created_at", { ascending: false });
      if (error) throw error;
      setTools(data || []);
    } catch (error) {
      console.error("Error loading tools:", error);
      toast({
        title: "Error",
        description: "Failed to load tools",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (tool) => {
    if (!confirm(`Delete ${tool.name}? This cannot be undone.`)) return;
    try {
      // Clean up junctions
      await supabase
        .from("product_category_jnc")
        .delete()
        .eq("product_id", tool.id);
      await supabase
        .from("product_subcategory_jnc")
        .delete()
        .eq("product_id", tool.id);
      // Delete the product
      const { error } = await supabase
        .from("products")
        .delete()
        .eq("id", tool.id);
      if (error) throw error;
      toast({ title: "Deleted", description: `${tool.name} was deleted.` });
      fetchTools();
    } catch (error) {
      console.error("Delete failed:", error);
      toast({
        title: "Error",
        description: "Failed to delete tool",
        variant: "destructive",
      });
    }
  };

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
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">AI Tools</h1>
          <Link href="/admin/tools/new">
            <Button>
              <Plus className="h-4 w-4 mr-2" /> Add New Tool
            </Button>
          </Link>
        </div>

        <div className="flex items-center gap-3 mb-6">
          <Input
            placeholder="Search tools..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="max-w-sm"
          />
          <Button variant="outline" onClick={fetchTools}>
            Refresh
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            <div className="col-span-full text-muted-foreground">
              Loading...
            </div>
          ) : tools.length === 0 ? (
            <div className="col-span-full text-muted-foreground">
              No tools found
            </div>
          ) : (
            tools
              .filter((t) =>
                [t.name, t.tagline].some((v) =>
                  `${v}`.toLowerCase().includes(search.toLowerCase())
                )
              )
              .map((tool) => (
                <Card key={tool.id}>
                  <CardHeader>
                    <CardTitle className="text-lg">{tool.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {tool.tagline}
                    </p>
                    <div className="flex items-center justify-between">
                      <Link
                        href={`/tool/${tool.slug}`}
                        target="_blank"
                        className="text-sm text-primary flex items-center gap-1 hover:underline"
                      >
                        <ExternalLink className="h-3 w-3" /> View Tool
                      </Link>
                    </div>
                    <div className="flex items-center gap-2 pt-2 border-t">
                      <Link
                        href={`/admin/tools/${tool.id}/edit`}
                        className="flex-1"
                      >
                        <Button size="sm" variant="outline" className="w-full">
                          <Edit className="h-4 w-4 mr-2" /> Edit
                        </Button>
                      </Link>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDelete(tool)}
                        className="flex-1"
                      >
                        <Trash2 className="h-4 w-4 mr-2" /> Delete
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
