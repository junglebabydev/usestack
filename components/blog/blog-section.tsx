"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ArrowRight, BookOpen } from "lucide-react"
import { Button } from "@/components/ui/button"
import { BlogCard } from "./blog-card"
import { blogService } from "@/lib/blog-service"
import type { BlogPost } from "@/lib/types/blog"

export function BlogSection() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchPosts() {
      try {
        const data = await blogService.getRecentPosts(3)
        setPosts(data)
      } catch (error) {
        console.error("[v0] Failed to fetch blog posts:", error)
        // Use mock data as fallback
        setPosts(mockBlogPosts)
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [])

  if (loading) {
    return (
      <section className="border-t border-border bg-muted/30 py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">Latest from the Blog</h2>
              <p className="mt-2 text-muted-foreground">Insights, tutorials, and updates about AI tools</p>
            </div>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-96 animate-pulse rounded-xl bg-muted" />
            ))}
          </div>
        </div>
      </section>
    )
  }

  if (posts.length === 0) {
    return null
  }

  return (
    <section className="border-t border-border bg-muted/30 py-16">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm">
              <BookOpen className="size-4 text-primary" />
              <span className="font-semibold text-primary">Blog</span>
            </div>
            <h2 className="text-3xl font-bold tracking-tight">Latest from the Blog</h2>
            <p className="mt-2 text-muted-foreground">Insights, tutorials, and updates about AI tools</p>
          </div>
          <Button asChild variant="ghost" className="hidden sm:flex">
            <Link href="/blog">
              View All <ArrowRight className="ml-2 size-4" />
            </Link>
          </Button>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
        <div className="mt-8 text-center sm:hidden">
          <Button asChild variant="outline">
            <Link href="/blog">
              View All Posts <ArrowRight className="ml-2 size-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

// Mock data for fallback
const mockBlogPosts: BlogPost[] = [
  {
    id: "1",
    slug: "getting-started-with-ai-tools",
    title: "Getting Started with AI Tools: A Complete Guide",
    summary:
      "Learn how to choose the right AI tools for your workflow and maximize productivity with our comprehensive guide.",
    content: "",
    thumbnail_url: "/blog-ai-tools-guide.jpg",
    category: "Guide",
    tags: ["AI", "Productivity", "Getting Started"],
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
  {
    id: "2",
    slug: "top-chatgpt-alternatives-2024",
    title: "Top ChatGPT Alternatives You Should Try in 2024",
    summary:
      "Discover powerful ChatGPT alternatives that offer unique features and capabilities for different use cases.",
    content: "",
    thumbnail_url: "/blog-chatgpt-alternatives.jpg",
    category: "Reviews",
    tags: ["ChatGPT", "AI Chat", "Tools"],
    reading_time_minutes: 6,
    published_at: new Date(Date.now() - 86400000).toISOString(),
    is_published: true,
    view_count: 0,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    author: {
      id: "2",
      name: "Michael Torres",
      email: "michael@example.com",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
  },
  {
    id: "3",
    slug: "building-content-creator-stack",
    title: "How to Build the Perfect Content Creator AI Stack",
    summary:
      "A step-by-step guide to selecting and combining AI tools for content creation, from ideation to publishing.",
    content: "",
    thumbnail_url: "/blog-content-creator-stack.jpg",
    category: "Tutorial",
    tags: ["Content Creation", "Stacks", "Workflow"],
    reading_time_minutes: 10,
    published_at: new Date(Date.now() - 172800000).toISOString(),
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
