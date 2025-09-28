"use client";

// sample data
import Header from "@/components/header";
import { useEffect, useMemo, useRef, useState, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { LaserFlowBoxExample } from "./laserHero";
import LightRays from "./LaserFlow";

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
  ChevronLeft,
  ChevronRight,
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
// import { aiStacks } from "@/lib/data" // replaced by live stacks from DB
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

  // Embla carousel setup
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    containScroll: "trimSnaps",
    skipSnaps: false,
    dragFree: false,
  });

  const topCategories = dbCategories
    .sort((a, b) => (categoryCounts[b.id] || 0) - (categoryCounts[a.id] || 0))
    .slice(0, 5);

  // Embla carousel scroll functions
  const scrollPrev = useCallback(() => {
    if (emblaApi) {
      emblaApi.scrollPrev();
    }
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) {
      emblaApi.scrollNext();
    }
  }, [emblaApi]);

  // Ensure carousel is ready before rendering
  const [isCarouselReady, setIsCarouselReady] = useState(false);

  useEffect(() => {
    if (emblaApi) {
      setIsCarouselReady(true);
    }
  }, [emblaApi]);

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
    <div className="min-h-screen bg-black">
      <Header />
      {/* <LaserFlowBoxExample /> */}

      {/* Hero Section */}
      <div style={{ width: "100%", height: "100vh", position: "relative" }}>
        <LightRays
          raysOrigin="top-center"
          raysColor="#00ffff"
          raysSpeed={1.5}
          lightSpread={0.8}
          rayLength={1.2}
          followMouse={true}
          mouseInfluence={0.1}
          noiseAmount={0.1}
          distortion={0.05}
          className="custom-rays"
        />
        <section className="absolute inset-0 flex items-center justify-center top-20">
          {/* Content */}
          <div className="relative max-w-7xl mx-auto w-full">
            <div className="flex flex-col items-center justify-center px-8 text-center">
              <h1 className="text-[58px] font-bold text-white sm:text-4xl md:text-5xl mb-4 max-w-[600px] mx-auto relative z-10">
                Discover the Best{" "}
                <span
                  className="bg-gradient-to-r from-emerald-500 via-cyan-500 to-blue-500 bg-clip-text text-transparent"
                  style={{
                    background:
                      "linear-gradient(45deg,  #3b82f6,rgb(213, 23, 118),rgb(33, 173, 77) ,  #8b5cf6, #ec4899)",
                    backgroundSize: "400% 400%",
                    animation: "gradientShift 6s ease-in-out infinite",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  AI Tools & Agents
                </span>
              </h1>
              <p className="max-w-3xl mx-auto text-base text-gray-300 mb-6 relative z-10">
                Find, compare, and choose from thousands of AI-powered tools and
                agents to supercharge your workflow and boost productivity.
              </p>

              {/* Search Bar */}
              <div className="max-w-6xl mx-auto mb-6 relative z-10">
                <div className="flex gap-3">
                  <div className="relative flex-1">
                    <div className="moving-border">
                      <div className="relative">
                        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 z-10" />
                        <Input
                          placeholder="Search for AI tools, agents, or categories..."
                          className="pl-12 lg:w-[410px] pr-12 py-3 text-base border-0 rounded-full h-[58px] outline-none focus:outline-none focus:ring-0 focus-visible:ring-offset-[-2px] bg-transparent text-black placeholder-gray-400"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          onKeyPress={handleKeyPress}
                        />
                        {searchQuery && (
                          <button
                            onClick={clearSearch}
                            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-200 transition-colors z-10"
                            type="button"
                          >
                            <X className="w-5 h-5" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                  <Button
                    className="rounded-full px-6 py-3 h-[58px] text-[18px] bg-white text-black hover:bg-gray-200"
                    onClick={handleSearch}
                  >
                    Search
                  </Button>
                </div>
              </div>

              {/* Popular Categories */}
              <div className="max-w-6xl mx-auto relative z-10">
                <div className="bg-gradient-to-r ml-2 mb-4 from-indigo-500 via-white-500 to-pink-500 bg-clip-text text-transparent">
                  Popular categories
                </div>
                <div className="flex flex-col gap-3 mb-4">
                  {/* First row - 3 badges */}
                  <div className="flex justify-center gap-3">
                    {topCategories.slice(0, 3).map((category) => (
                      <Badge
                        key={category.id}
                        variant="secondary"
                        className="cursor-pointer font-[400] bg-[#bdbdbd] hover:bg-white text-black border-gray-600"
                        onClick={() =>
                          router.push(
                            `/explore?category=${category.slug || category.id}`
                          )
                        }
                      >
                        {category.name}
                      </Badge>
                    ))}
                  </div>
                  {/* Second row - 2 badges */}
                  <div className="flex justify-center gap-3">
                    {topCategories.slice(3, 5).map((category) => (
                      <Badge
                        key={category.id}
                        variant="secondary"
                        className="cursor-pointer font-[400] bg-[#bdbdbd] hover:bg-white text-black border-gray-600"
                        onClick={() =>
                          router.push(
                            `/explore?category=${category.slug || category.id}`
                          )
                        }
                      >
                        {category.name}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      {/* Browse by Category */}
      <section className="py-20 bg-gradient-to-br from-white via-gray-50 to-blue-50 relative">
        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 bg-black">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `repeating-linear-gradient(135deg, transparent, transparent 3px, rgba(156, 146, 172, 0.15) 3px, rgba(156, 146, 172, 0.15) 4px)`,
            }}
          ></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-white">
              Browse by{" "}
              <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                Category
              </span>
            </h2>
            {dbCategories.length > 0 && (
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={scrollPrev}
                  className="p-2 hover:bg-gray-50 transition-colors"
                  aria-label="Scroll left"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={scrollNext}
                  className="p-2 hover:bg-gray-50 transition-colors"
                  aria-label="Scroll right"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>

          <div className="relative w-full max-w-full pb-4">
            {dbCategories.length > 0 ? (
              <div
                ref={emblaRef}
                className="overflow-hidden scrollbar-hide w-full"
              >
                <div className="flex py-2">
                  {dbCategories.map((category, idx) => (
                    <div
                      key={`${category.id}-${idx}`}
                      className="flex-[0_0_200px] min-w-0 pl-4 first:pl-0"
                    >
                      <Link
                        href={`/explore?category=${
                          category.slug || category.id
                        }`}
                        className="block"
                      >
                        <div className="group hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer h-44 w-40 flex flex-col items-center justify-center text-center p-4 rounded-3xl border-0  bg-transparent mr-4 shadow-lg hover:shadow-2xl">
                          <div
                            className={`w-16 h-16 ${getCategoryIconBg(
                              category.name
                            )} rounded-full flex items-center justify-center text-3xl mb-3 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                          >
                            <span className="text-gray-700 drop-shadow-sm">
                              {getCategoryIcon(category.name)}
                            </span>
                          </div>
                          <h3 className="font-normal text-xs text-white line-clamp-2 leading-tight mb-1 group-hover:text-indigo-600 transition-colors duration-300 px-1">
                            {category.name}
                          </h3>
                          <p className="text-xs text-gray-500 font-medium">
                            {categoryCounts[category.id] || 0} tools available
                          </p>
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="flex gap-4 pb-4 overflow-x-auto scrollbar-hide w-full py-2">
                {dbCategories.map((category, idx) => (
                  <div
                    key={`${category.id}-${idx}`}
                    className="flex-[0_0_180px] min-w-0"
                  >
                    <Link
                      href={`/explore?category=${category.slug || category.id}`}
                      className="block"
                    >
                      <div className="group hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer h-44 w-40 flex flex-col items-center justify-center text-center p-4 rounded-3xl border-0 bg-gradient-to-br from-white to-gray-50 shadow-lg hover:shadow-2xl">
                        <div
                          className={`w-16 h-16 ${getCategoryIconBg(
                            category.name
                          )} rounded-2xl flex items-center justify-center text-3xl mb-3 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                        >
                          <span className="text-gray-700 drop-shadow-sm">
                            {getCategoryIcon(category.name)}
                          </span>
                        </div>
                        <h3 className="font-bold text-xs text-gray-900 line-clamp-2 leading-tight mb-1 group-hover:text-indigo-600 transition-colors duration-300 px-1">
                          {category.name}
                        </h3>
                        <p className="text-xs text-gray-500 font-medium">
                          {categoryCounts[category.id] || 0} tools available
                        </p>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Remove the View more/View less button section */}
        </div>
      </section>

      {/* Recommended AI Stacks */}
      <section className="py-20 bg-gradient-to-br from-gray-50 via-white to-purple-50 relative">
        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 bg-[#090b39]">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `repeating-linear-gradient(60deg, transparent, transparent 3px, rgba(156, 146, 172, 0.15) 3px, rgba(156, 146, 172, 0.15) 4px)`,
            }}
          ></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12">
            {/* <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Recommended AI Stacks
            </h2> */}
            <h2 className="text-3xl font-bold text-white">
              Recommended{" "}
              <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                AI Stacks
              </span>
            </h2>
            <p className="text-lg text-gray-500 mt-1">
              Curated collections of AI tools and agents for specific use cases
            </p>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {stacks.map((stack, idx) => {
              const colorClass =
                idx % 3 === 0
                  ? {
                      bg: "bg-white border-blue-200",
                      chip: "bg-blue-100 text-blue-600",
                    }
                  : idx % 3 === 1
                  ? {
                      bg: "bg-white border-emerald-200",
                      chip: "bg-emerald-100 text-emerald-600",
                    }
                  : {
                      bg: "bg-white border-purple-200",
                      chip: "bg-purple-100 text-purple-600",
                    };

              const products = (stack.product_stacks || [])
                .map((ps) => ps.product)
                .filter(Boolean)
                .slice(0, 4);

              return (
                <Card
                  key={stack.id}
                  className={`group hover:shadow-lg transition-all duration-300 overflow-hidden border-2 h-full flex flex-col ${colorClass.bg} rounded-2xl`}
                >
                  <CardContent className="p-6 flex flex-col h-full">
                    {/* Header */}
                    <div className="flex items-center gap-3 mb-4">
                      <div
                        className={`w-10 h-10 rounded-lg flex items-center justify-center text-lg font-bold ${colorClass.chip}`}
                      >
                        {stack.name.charAt(0)}
                      </div>
                      <h3 className="font-bold text-xl text-gray-900">
                        {stack.name}
                      </h3>
                    </div>

                    {/* Description */}
                    <p className="text-gray-600 mb-6 text-sm leading-relaxed">
                      {stack.description}
                    </p>

                    {/* Tools list */}
                    <div className="space-y-3 mb-6 flex-1">
                      {products.map((product) => {
                        const categoryName = (product.product_categories || [])
                          .map((pc) => pc?.category?.name)
                          .filter(Boolean)[0];
                        return (
                          <div
                            key={product.id}
                            className="bg-gray-50 rounded-lg p-4 border border-gray-100"
                          >
                            <div className="flex items-center justify-between">
                              <div>
                                <div className="font-medium text-gray-900">
                                  {product.name}
                                </div>
                                <div className="text-sm text-gray-500">
                                  {categoryName || "—"}
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <Badge
                                  variant="secondary"
                                  className="text-xs px-2 py-1 bg-blue-100 text-blue-700 hover:bg-blue-200"
                                >
                                  Tool
                                </Badge>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* View Complete Stack button */}
                    <Link href={`/stack/${stack.id}`} className="block mt-auto">
                      <Button className="w-full bg-black hover:bg-gray-800 text-white">
                        View Complete Stack
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Tools & Agents */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Featured Tools & Agents
              </h2>
              <p className="text-gray-600">
                Top-rated AI tools trusted by thousands of users
              </p>
            </div>
            <Link href="/explore">
              <Button variant="outline">View All</Button>
            </Link>
          </div>

          <FeaturedProducts showRating={false} gridCols={3} />
        </div>
      </section>
    </div>
  );
}
