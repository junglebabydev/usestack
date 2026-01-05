"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Search, ArrowRight, Calendar } from "lucide-react";
import Header from "@/components/header";
import { supabase } from "@/lib/supabase";

const categories = ["All", "Tools", "News", "Stacks"];

export default function BlogsPage() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    fetchBlogs();
  }, []);

  async function fetchBlogs() {
    setLoading(true);
    const { data, error } = await supabase
      .from("blogs")
      .select(`
        id,
        title,
        slug,
        summary,
        category,
        tags,
        thumbnail_url,
        created_at,
        users:created_by(
          id,
          name
        )
      `)
      .eq("status", "published")
      .order("created_at", { ascending: false });
    if (error) {
      console.error("Error fetching blogs:", error);
    } else {
      setBlogs(data ?? []);
    }
    setLoading(false);
  }

  // Filter blogs based on search and category
  const filteredBlogs = blogs.filter((blog) => {
    const matchesSearch =
      blog.title?.toLowerCase().includes(search.toLowerCase()) ||
      blog.summary?.toLowerCase().includes(search.toLowerCase());
    const matchesCategory =
      activeCategory === "All" ||
      blog.category?.toLowerCase() === activeCategory.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  // Get first letter for card header
  const getInitial = (title) => {
    return title?.charAt(0)?.toUpperCase() || "B";
  };

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Get category badge color
  const getCategoryColor = (category) => {
    switch (category?.toLowerCase()) {
      case "tools":
        return "bg-blue-100 text-blue-700";
      case "news":
        return "bg-green-100 text-green-700";
      case "stacks":
        return "bg-purple-100 text-purple-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-b from-blue-50/50 to-white">
        {/* Hero Section */}
        <section className="text-center py-16 px-6">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Blog
          </h1>
          <p className="text-gray-600 max-w-xl mx-auto">
            Insights, tutorials, and updates about AI tools and how to use them
            effectively.
          </p>
        </section>

        {/* Search and Filters */}
        <section className="max-w-6xl mx-auto px-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative w-full md:max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search articles..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Category Tabs */}
            <div className="flex items-center gap-1 bg-white border border-gray-200 rounded-lg p-1">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-4 py-1.5 text-sm font-medium rounded-md transition-colors ${
                    activeCategory === category
                      ? "bg-blue-600 text-white"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Article Count */}
          <p className="text-sm text-gray-500 mt-4">
            {filteredBlogs.length} article{filteredBlogs.length !== 1 ? "s" : ""}{" "}
            found
          </p>
        </section>

        {/* Blog Cards Grid */}
        <section className="max-w-6xl mx-auto px-6 pb-20">
          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="bg-white rounded-2xl border border-gray-100 overflow-hidden animate-pulse"
                >
                  <div className="h-40 bg-gradient-to-br from-blue-100 to-blue-50" />
                  <div className="p-5 space-y-3">
                    <div className="h-4 bg-gray-200 rounded w-1/4" />
                    <div className="h-5 bg-gray-200 rounded w-3/4" />
                    <div className="h-4 bg-gray-200 rounded w-full" />
                    <div className="h-4 bg-gray-200 rounded w-2/3" />
                  </div>
                </div>
              ))}
            </div>
          ) : filteredBlogs.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-gray-500">No articles found</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredBlogs.map((blog) => (
                <Link
                  key={blog.id}
                  href={`/blogs/${blog.slug}`}
                  className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300"
                >
                  {/* Card Header with Gradient */}
                  <div className="relative h-40 bg-gradient-to-br from-blue-200 via-blue-100 to-blue-50 flex items-center justify-center">
                    {blog.thumbnail_url ? (
                      <img
                        src={blog.thumbnail_url}
                        alt={blog.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-6xl font-bold text-blue-300/70">
                        {getInitial(blog.title)}
                      </span>
                    )}

                    {/* Category Badge */}
                    {blog.category && (
                      <span
                        className={`absolute top-3 right-3 px-2.5 py-1 text-xs font-medium rounded-full ${getCategoryColor(
                          blog.category
                        )}`}
                      >
                        {blog.category}
                      </span>
                    )}
                  </div>

                  {/* Card Content */}
                  <div className="p-5">
                    {/* Date */}
                    <div className="flex items-center gap-1.5 text-xs text-gray-400 mb-2">
                      <Calendar className="w-3.5 h-3.5" />
                      {formatDate(blog.created_at)}
                    </div>

                    {/* Title */}
                    <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                      {blog.title}
                    </h3>

                    {/* Summary */}
                    <p className="text-sm text-gray-500 line-clamp-2 mb-3">
                      {blog.summary}
                    </p>

                    {/* Tags */}
                    {blog.tags && blog.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mb-3">
                        {blog.tags.slice(0, 3).map((tag, index) => (
                          <span
                            key={index}
                            className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-full"
                          >
                            #{tag}
                          </span>
                        ))}
                        {blog.tags.length > 3 && (
                          <span className="px-2 py-0.5 text-gray-400 text-xs">
                            +{blog.tags.length - 3}
                          </span>
                        )}
                      </div>
                    )}

                    {/* Author */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {blog.users?.avatar_url ? (
                          <img
                            src={blog.users.avatar_url}
                            alt={blog.users.name}
                            className="w-7 h-7 rounded-full object-cover"
                          />
                        ) : (
                          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-xs font-medium">
                            {blog.users?.name?.charAt(0)?.toUpperCase() || "A"}
                          </div>
                        )}
                        <span className="text-sm text-gray-600">
                          {blog.users?.name || "Anonymous"}
                        </span>
                      </div>

                      <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>
      </main>
    </>
  );
}
