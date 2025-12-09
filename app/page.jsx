"use client";

import Header from "@/components/header";
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

import {
  Search,
  ArrowRight,
  Code,
  Image as ImageIcon,
  Music2,
  X,
  Video,
  MessageSquare,
  Bot,
  Gamepad2,
  FileText,
  Palette,
  Box,
  BarChart3,
  Zap,
  BookOpen,
  Briefcase,
  Settings,
  Brain,
  Users,
  Globe,
  Database,
  Cpu,
  Sparkles,
  Target,
  Lightbulb,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import FeaturedProducts from "@/components/featured-products";
import { supabase } from "@/lib/supabase";

export default function HomePage() {
  const getCategoryIcon = (name) => {
    const n = (name || "").toLowerCase();
    if (n.includes("code") || n.includes("dev") || n.includes("program"))
      return <Code className="w-5 h-5" />;
    if (
      n.includes("image") ||
      n.includes("photo") ||
      n.includes("design") ||
      n.includes("art")
    )
      return <ImageIcon className="w-5 h-5" />;
    if (n.includes("audio") || n.includes("music") || n.includes("voice"))
      return <Music2 className="w-5 h-5" />;
    if (n.includes("video")) return <Video className="w-5 h-5" />;
    if (
      n.includes("chat") ||
      n.includes("assistant") ||
      n.includes("bot") ||
      n.includes("companion")
    )
      return <MessageSquare className="w-5 h-5" />;
    if (n.includes("avatar")) return <Bot className="w-5 h-5" />;
    if (
      n.includes("document") ||
      n.includes("doc") ||
      n.includes("text") ||
      n.includes("writing")
    )
      return <FileText className="w-5 h-5" />;
    if (n.includes("game")) return <Gamepad2 className="w-5 h-5" />;
    if (n.includes("3d")) return <Box className="w-5 h-5" />;
    if (n.includes("analytics") || n.includes("data"))
      return <BarChart3 className="w-5 h-5" />;
    if (n.includes("automation") || n.includes("agents"))
      return <Zap className="w-5 h-5" />;
    if (
      n.includes("education") ||
      n.includes("tutorina") ||
      n.includes("tutoring")
    )
      return <BookOpen className="w-5 h-5" />;
    if (
      n.includes("business") ||
      n.includes("marketing") ||
      n.includes("marketina")
    )
      return <Briefcase className="w-5 h-5" />;
    if (n.includes("productivity") || n.includes("workflow"))
      return <Settings className="w-5 h-5" />;
    if (n.includes("ai") || n.includes("intelligence") || n.includes("machine"))
      return <Brain className="w-5 h-5" />;
    if (n.includes("social") || n.includes("community"))
      return <Users className="w-5 h-5" />;
    if (n.includes("web") || n.includes("website") || n.includes("online"))
      return <Globe className="w-5 h-5" />;
    if (n.includes("database") || n.includes("storage"))
      return <Database className="w-5 h-5" />;
    if (n.includes("hardware") || n.includes("device"))
      return <Cpu className="w-5 h-5" />;
    if (n.includes("creative") || n.includes("design"))
      return <Sparkles className="w-5 h-5" />;
    if (n.includes("goal") || n.includes("target") || n.includes("objective"))
      return <Target className="w-5 h-5" />;
    if (n.includes("idea") || n.includes("innovation"))
      return <Lightbulb className="w-5 h-5" />;
    return <Palette className="w-5 h-5" />;
  };

  const getCategoryIconBg = (name) => {
    const n = (name || "").toLowerCase();
    if (
      n.includes("code") ||
      n.includes("dev") ||
      n.includes("program") ||
      n.includes("codina")
    )
      return "bg-gradient-to-br from-blue-50 to-blue-100";
    if (
      n.includes("image") ||
      n.includes("photo") ||
      n.includes("design") ||
      n.includes("art")
    )
      return "bg-gradient-to-br from-pink-50 to-pink-100";
    if (n.includes("audio") || n.includes("music") || n.includes("voice"))
      return "bg-gradient-to-br from-purple-50 to-purple-100";
    if (n.includes("video")) return "bg-gradient-to-br from-red-50 to-red-100";
    if (
      n.includes("chat") ||
      n.includes("assistant") ||
      n.includes("bot") ||
      n.includes("companion")
    )
      return "bg-gradient-to-br from-green-50 to-green-100";
    if (n.includes("avatar"))
      return "bg-gradient-to-br from-indigo-50 to-indigo-100";
    if (
      n.includes("document") ||
      n.includes("doc") ||
      n.includes("text") ||
      n.includes("writing")
    )
      return "bg-gradient-to-br from-yellow-50 to-yellow-100";
    if (n.includes("game"))
      return "bg-gradient-to-br from-orange-50 to-orange-100";
    if (n.includes("3d")) return "bg-gradient-to-br from-cyan-50 to-cyan-100";
    if (
      n.includes("business") ||
      n.includes("marketing") ||
      n.includes("marketina")
    )
      return "bg-gradient-to-br from-emerald-50 to-emerald-100";
    if (n.includes("productivity") || n.includes("workflow"))
      return "bg-gradient-to-br from-violet-50 to-violet-100";
    if (n.includes("analytics") || n.includes("data"))
      return "bg-gradient-to-br from-teal-50 to-teal-100";
    if (n.includes("automation") || n.includes("agents"))
      return "bg-gradient-to-br from-rose-50 to-rose-100";
    if (
      n.includes("education") ||
      n.includes("tutorina") ||
      n.includes("tutoring")
    )
      return "bg-gradient-to-br from-amber-50 to-amber-100";
    if (n.includes("ai") || n.includes("intelligence") || n.includes("machine"))
      return "bg-gradient-to-br from-sky-50 to-sky-100";
    if (n.includes("social") || n.includes("community"))
      return "bg-gradient-to-br from-lime-50 to-lime-100";
    if (n.includes("web") || n.includes("website") || n.includes("online"))
      return "bg-gradient-to-br from-blue-50 to-blue-100";
    if (n.includes("database") || n.includes("storage"))
      return "bg-gradient-to-br from-slate-50 to-slate-100";
    if (n.includes("hardware") || n.includes("device"))
      return "bg-gradient-to-br from-gray-50 to-gray-100";
    if (n.includes("creative") || n.includes("design"))
      return "bg-gradient-to-br from-fuchsia-50 to-fuchsia-100";
    if (n.includes("goal") || n.includes("target") || n.includes("objective"))
      return "bg-gradient-to-br from-orange-50 to-orange-100";
    if (n.includes("idea") || n.includes("innovation"))
      return "bg-gradient-to-br from-yellow-50 to-yellow-100";
    if (n.includes("miscellaneous") || n.includes("utilities"))
      return "bg-gradient-to-br from-slate-50 to-slate-100";
    return "bg-gradient-to-br from-gray-50 to-gray-100";
  };
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [dbCategories, setDbCategories] = useState([]);
  const [categoryCounts, setCategoryCounts] = useState({});
  const [stacks, setStacks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const [categoriesRes, productCategoriesRes] = await Promise.all([
        supabase
          .from("categories")
          .select("id, name, slug")
          .order("name", { ascending: true }),
        supabase.from("product_category_jnc").select("category_id"),
      ]);

      if (!categoriesRes.error && categoriesRes.data) {
        setDbCategories(categoriesRes.data);
      } else {
        console.error("Error fetching categories:", categoriesRes.error);
      }

      if (!productCategoriesRes.error && productCategoriesRes.data) {
        const counts = {};
        productCategoriesRes.data.forEach((row) => {
          const id = row.category_id;
          counts[id] = (counts[id] || 0) + 1;
        });
        setCategoryCounts(counts);
      } else {
        console.error(
          "Error fetching product_categories:",
          productCategoriesRes.error
        );
      }
    };

    fetchData();
  }, []);

  // Fetch stacks and their products for the Recommended AI Stacks section
  useEffect(() => {
    const fetchStacks = async () => {
      const { data, error } = await supabase
        .from("stacks")
        .select(
          `
          id, name, description,
          product_stacks:product_stack_jnc(
            product:products(
              id, name, slug,
              product_categories:product_category_jnc(
                category:categories!product_category_jnc_category_id_fkey(name)
              )
            )
          )
        `
        )
        .order("created_at", { ascending: false })
        .limit(3);

      if (!error && data) {
        setStacks(data);
      } else {
        console.error("Error fetching stacks:", error);
      }
    };

    fetchStacks();
  }, []);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      router.push(`/explore?search=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      router.push("/explore");
    }
  };

  const clearSearch = () => {
    setSearchQuery("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-center text-center">
            {/* Top Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full mb-8 border border-gray-200">
              <Sparkles className="w-4 h-4 text-blue-500" />
              <span className="text-sm font-medium text-gray-700">
                Discover AI Tools That Actually Work
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6 max-w-4xl mx-auto leading-tight">
              Find the Perfect{" "}
              <span className="block">AI Tools for</span>
              <span className="block">Your Workflow</span>
            </h1>
            
            <p className="max-w-2xl mx-auto text-lg text-gray-500 mb-8">
              Curated directory of AI tools and agents for indie hackers, founders, and
              builders. Compare features, discover stacks, and ship faster.
            </p>

            {/* Search Bar */}
            <div className="w-full max-w-2xl mx-auto mb-8">
              <div className="relative flex items-center">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    placeholder="Search 500+ AI tools..."
                    className="pl-12 pr-12 py-3 text-base border border-gray-200 rounded-full h-14 bg-white text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 shadow-sm"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyPress={handleKeyPress}
                  />
                  {searchQuery && (
                    <button
                      onClick={clearSearch}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                      type="button"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Stats Badges */}
            <div className="flex flex-wrap items-center justify-center gap-6 mb-8">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                  <Zap className="w-4 h-4 text-green-600" />
                </div>
                <span className="text-sm font-medium text-gray-700">500+ Tools</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                  <Search className="w-4 h-4 text-blue-600" />
                </div>
                <span className="text-sm font-medium text-gray-700">50+ Categories</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-green-600" />
                </div>
                <span className="text-sm font-medium text-gray-700">20+ Curated Stacks</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Browse by Category */}
      <section className="py-20 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">
              Browse by Category
            </h2>
            <p className="text-gray-500">
              Explore AI tools organized by use case
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-8">
            {dbCategories.slice(0, 6).map((category, idx) => (
              <Link
                key={`${category.id}-${idx}`}
                href={`/explore?category=${category.slug || category.id}`}
                className="block"
              >
                <div className="group bg-white border border-gray-200 rounded-2xl p-5 hover:shadow-lg hover:border-blue-200 transition-all duration-300 cursor-pointer h-full">
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 bg-blue-50`}
                  >
                    <span className="text-blue-600">
                      {getCategoryIcon(category.name)}
                    </span>
                  </div>
                  <h3 className="font-semibold text-sm text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-xs text-gray-500">
                    {categoryCounts[category.id] || 0} tools
                  </p>
                  <div className="mt-3 flex items-center text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center">
            <Link href="/categories">
              <Button variant="outline" className="rounded-full px-6 py-2 border-gray-300 hover:border-gray-400 hover:bg-gray-50">
                View All Categories
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Tools & Agents */}
      <section className="py-16 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-1">
                Featured Tools
              </h2>
              <p className="text-gray-500">
                Top AI tools trusted by thousands of builders
              </p>
            </div>
            <Link href="/explore" className="flex items-center text-gray-600 hover:text-blue-600 transition-colors font-medium">
              View All
              <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>

          <FeaturedProducts showRating={false} gridCols={3} />
        </div>
      </section>

      {/* Curated Stacks */}
      <section className="py-16 bg-gray-50 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-1">
                Curated Stacks
              </h2>
              <p className="text-gray-500">
                Pre-built collections of AI tools for specific workflows
              </p>
            </div>
            <Link href="/explore" className="flex items-center text-gray-600 hover:text-blue-600 transition-colors font-medium">
              View All
              <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {stacks.map((stack, idx) => {
              const gradientClass =
                idx % 3 === 0
                  ? "bg-gradient-to-br from-orange-100 via-orange-50 to-yellow-50"
                  : idx % 3 === 1
                  ? "bg-gradient-to-br from-purple-100 via-purple-50 to-pink-50"
                  : "bg-gradient-to-br from-blue-100 via-blue-50 to-cyan-50";

              const products = (stack.product_stacks || [])
                .map((ps) => ps.product)
                .filter(Boolean);

              return (
                <Link key={stack.id} href={`/stack/${stack.id}`} className="block group">
                  <Card className="overflow-hidden border border-gray-200 h-full hover:shadow-lg transition-all duration-300 hover:border-blue-200">
                    {/* Gradient Header */}
                    <div className={`h-32 ${gradientClass}`}></div>
                    
                    <CardContent className="p-5 bg-white">
                      <h3 className="font-bold text-lg text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                        {stack.name}
                      </h3>
                      <p className="text-gray-500 text-sm mb-4 line-clamp-2">
                        {stack.description}
                      </p>
                      <div className="flex items-center text-gray-500 text-sm">
                        <Sparkles className="w-4 h-4 mr-2 text-green-500" />
                        <span>{products.length} tools included</span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white border-t border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Built something awesome?
          </h2>
          <p className="text-gray-500 text-lg mb-8 max-w-2xl mx-auto">
            Share your AI tool with thousands of builders and founders actively looking
            for solutions.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/submit-tool">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-6 py-3">
                Submit Your Tool
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <Link href="/newsletter">
              <Button variant="outline" className="rounded-lg px-6 py-3 border-gray-300">
                Subscribe to Newsletter
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
