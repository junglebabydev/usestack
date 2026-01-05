"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Search, Plus, MoreVertical } from "lucide-react";
import { supabase } from "@/lib/supabase";

export default function Page() {
  const router = useRouter();
  const [blogs, setBlogs] = useState([]); 
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchBlogs();
  }, []);

  async function fetchBlogs() {
    const { data, error } = await supabase
      .from("blogs")
      .select(`
        id,
        title,
        status,
        created_at,
        users:created_by (
          id,
          name
        )
      `)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching blogs:", error);
      return;
    }

    const formattedBlogs = data.map((blog) => ({
      id: blog.id,
      title: blog.title,
      status: blog.status,
      created_at: blog.created_at,
      author: blog.users?.name ?? "—",
      users: blog.users,
    }));

    setBlogs(formattedBlogs);
  }

  const filteredBlogs = blogs.filter((blog) =>
    blog.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Blog Posts</h1>
          <p className="text-sm text-muted-foreground">
            Manage your blog content
          </p>
        </div>

        <button
          onClick={() => router.push("/admin/blogs/new")}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700"
        >
          <Plus size={16} />
          New Post
        </button>
      </div>

      {/* Search */}
      <div className="relative w-full max-w-sm">
        <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
        <input
          placeholder="Search posts..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9 pr-3 py-2 w-full rounded-md border text-sm focus:outline-none"
        />
      </div>

      {/* Table */}
      <div className="rounded-lg border bg-white overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-muted/50 border-b">
            <tr className="text-left">
              <th className="px-4 py-3">Title</th>
              <th className="px-4 py-3">Author</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Created</th>
              <th className="px-4 py-3 text-right"></th>
            </tr>
          </thead>

          <tbody>
            {filteredBlogs.map((blog) => (
              <tr key={blog.id} className="border-b last:border-none">
                <td className="px-4 py-3 font-medium">
                  {blog.title}
                </td>

                <td className="px-4 py-3">
                  {blog.author}
                </td>

                <td className="px-4 py-3">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      blog.status === "published"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {blog.status === "published" ? "Published" : "Pending"}
                  </span>
                </td>

                <td className="px-4 py-3 text-muted-foreground">
                  {new Date(blog.created_at).toLocaleDateString()}
                </td>

                <td className="px-4 py-3 text-right">
                  <MoreVertical className="w-4 h-4 text-muted-foreground cursor-pointer" />
                </td>
              </tr>
            ))}

            {filteredBlogs.length === 0 && (
              <tr>
                <td
                  colSpan={5}
                  className="px-4 py-6 text-center text-muted-foreground"
                >
                  No blogs found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
