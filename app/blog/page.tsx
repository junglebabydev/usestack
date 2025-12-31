"use client"

import { useEffect, useState } from "react"
import { Search, Filter } from "lucide-react"
import { PublicLayout } from "@/components/layout/public-layout"
import { BlogCard } from "@/components/blog/blog-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { blogService } from "@/lib/blog-service"
import type { BlogPost } from "@/lib/types/blog"

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  // Get unique categories from posts
  const categories = Array.from(new Set(posts.map((p) => p.category).filter(Boolean)))

  useEffect(() => {
    async function fetchPosts() {
      try {
        const data = await blogService.getPublishedPosts(50)
        setPosts(data)
        setFilteredPosts(data)
      } catch (error) {
        console.error("[v0] Failed to fetch blog posts:", error)
        // Use mock data as fallback
        setPosts(mockPosts)
        setFilteredPosts(mockPosts)
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [])

  useEffect(() => {
    let filtered = posts

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(
        (post) =>
          post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          post.summary.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    // Filter by category
    if (selectedCategory) {
      filtered = filtered.filter((post) => post.category === selectedCategory)
    }

    setFilteredPosts(filtered)
  }, [searchQuery, selectedCategory, posts])

  return (
    <PublicLayout>
      {/* Header */}
      <section className="border-b border-border bg-gradient-to-b from-background via-primary/5 to-background py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-4 text-balance text-5xl font-bold tracking-tight">Blog</h1>
            <p className="text-pretty text-lg text-muted-foreground">
              Insights, tutorials, and updates about AI tools and how to use them effectively.
            </p>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="border-b border-border bg-background py-8">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            {/* Search */}
            <div className="relative flex-1 md:max-w-md">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search articles..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Category Filter */}
            {categories.length > 0 && (
              <div className="flex flex-wrap gap-2">
                <Button
                  variant={selectedCategory === null ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(null)}
                >
                  All
                </Button>
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category!)}
                  >
                    {category}
                  </Button>
                ))}
              </div>
            )}
          </div>

          {/* Results count */}
          <div className="mt-4 text-sm text-muted-foreground">
            {loading ? "Loading..." : `${filteredPosts.length} article${filteredPosts.length !== 1 ? "s" : ""} found`}
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          {loading ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="h-96 animate-pulse rounded-xl bg-muted" />
              ))}
            </div>
          ) : filteredPosts.length === 0 ? (
            <div className="py-24 text-center">
              <Filter className="mx-auto mb-4 size-12 text-muted-foreground" />
              <h3 className="mb-2 text-lg font-semibold">No articles found</h3>
              <p className="text-muted-foreground">Try adjusting your search or filters</p>
              <Button
                className="mt-6"
                onClick={() => {
                  setSearchQuery("")
                  setSelectedCategory(null)
                }}
              >
                Clear Filters
              </Button>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredPosts.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          )}
        </div>
      </section>
    </PublicLayout>
  )
}

// Mock data for fallback
const mockPosts: BlogPost[] = [
  {
    id: "1",
    slug: "getting-started-with-ai-tools",
    title: "Getting Started with AI Tools: A Complete Guide",
    summary: "Learn how to choose the right AI tools for your workflow and maximize productivity.",
    content: "",
    thumbnail_url: "/blog-ai-tools-guide.jpg",
    category: "Guide",
    tags: ["AI", "Productivity"],
    reading_time_minutes: 8,
    published_at: new Date().toISOString(),
    is_published: true,
    view_count: 0,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    author: {
      id: "1",
      name: "Sarah Chen",
      email: "sarah@example.com",
      avatar_url: "/author-sarah.jpg",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
  },
]
