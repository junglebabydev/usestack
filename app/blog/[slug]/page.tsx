"use client"

import { useEffect, useState } from "react"
import { use } from "react"
import Link from "next/link"
import { Calendar, Clock, ArrowLeft, Twitter, Linkedin, Globe, ExternalLink, Share2, BookOpen } from "lucide-react"
import { PublicLayout } from "@/components/layout/public-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { blogService } from "@/lib/blog-service"
import type { BlogPostWithAuthor } from "@/lib/types/blog"

export default function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params)
  const [post, setPost] = useState<BlogPostWithAuthor | null>(null)
  const [loading, setLoading] = useState(true)
  const [tableOfContents, setTableOfContents] = useState<{ id: string; text: string; level: number }[]>([])

  useEffect(() => {
    async function fetchPost() {
      try {
        const data = await blogService.getPostBySlug(slug)
        setPost(data)

        // Generate table of contents from content headings
        if (data?.content) {
          const headings = extractHeadings(data.content)
          setTableOfContents(headings)
        }
      } catch (error) {
        console.error("[v0] Failed to fetch blog post:", error)
        // Use mock data as fallback
        setPost(mockPost)
        setTableOfContents(extractHeadings(mockPost.content))
      } finally {
        setLoading(false)
      }
    }

    fetchPost()
  }, [slug])

  const publishedDate = post?.published_at
    ? new Date(post.published_at).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : null

  const shareUrl = typeof window !== "undefined" ? window.location.href : ""

  if (loading) {
    return (
      <PublicLayout>
        <div className="mx-auto max-w-4xl px-4 py-16 lg:px-8">
          <div className="animate-pulse space-y-8">
            <div className="h-8 w-24 rounded bg-muted" />
            <div className="h-12 w-3/4 rounded bg-muted" />
            <div className="h-64 w-full rounded-xl bg-muted" />
            <div className="space-y-4">
              <div className="h-4 w-full rounded bg-muted" />
              <div className="h-4 w-full rounded bg-muted" />
              <div className="h-4 w-2/3 rounded bg-muted" />
            </div>
          </div>
        </div>
      </PublicLayout>
    )
  }

  if (!post) {
    return (
      <PublicLayout>
        <div className="mx-auto max-w-4xl px-4 py-24 text-center lg:px-8">
          <BookOpen className="mx-auto mb-4 size-16 text-muted-foreground" />
          <h1 className="mb-4 text-3xl font-bold">Post Not Found</h1>
          <p className="mb-8 text-muted-foreground">
            The blog post you're looking for doesn't exist or has been removed.
          </p>
          <Button asChild>
            <Link href="/blog">
              <ArrowLeft className="mr-2 size-4" />
              Back to Blog
            </Link>
          </Button>
        </div>
      </PublicLayout>
    )
  }

  return (
    <PublicLayout>
      {/* Header */}
      <div className="border-b border-border bg-gradient-to-b from-background via-primary/5 to-background">
        <div className="mx-auto max-w-4xl px-4 py-8 lg:px-8">
          <Button asChild variant="ghost" size="sm" className="mb-6">
            <Link href="/blog">
              <ArrowLeft className="mr-2 size-4" />
              Back to Blog
            </Link>
          </Button>

          {/* Category Badge */}
          {post.category && (
            <Link
              href={`/blog?category=${post.category}`}
              className="mb-4 inline-block rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary hover:bg-primary/20"
            >
              {post.category}
            </Link>
          )}

          {/* Title */}
          <h1 className="mb-6 text-balance text-4xl font-bold leading-tight tracking-tight lg:text-5xl">
            {post.title}
          </h1>

          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            {publishedDate && (
              <div className="flex items-center gap-1.5">
                <Calendar className="size-4" />
                <span>{publishedDate}</span>
              </div>
            )}
            {post.reading_time_minutes && (
              <div className="flex items-center gap-1.5">
                <Clock className="size-4" />
                <span>{post.reading_time_minutes} min read</span>
              </div>
            )}
            <div className="flex items-center gap-1.5">
              <span>{post.view_count} views</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
        <div className="lg:grid lg:grid-cols-[1fr_250px] lg:gap-12">
          {/* Article Content */}
          <div className="mx-auto max-w-3xl">
            {/* Thumbnail */}
            {post.thumbnail_url && (
              <div className="mb-12 overflow-hidden rounded-xl">
                <img src={post.thumbnail_url || "/placeholder.svg"} alt={post.title} className="w-full object-cover" />
              </div>
            )}

            {/* TL;DR Summary */}
            <Card className="mb-12 border-l-4 border-l-primary bg-primary/5">
              <CardContent className="p-6">
                <h2 className="mb-3 flex items-center gap-2 text-lg font-semibold">
                  <BookOpen className="size-5" />
                  TL;DR
                </h2>
                <p className="text-sm leading-relaxed text-muted-foreground">{post.summary}</p>
              </CardContent>
            </Card>

            {/* Article Content */}
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <div dangerouslySetInnerHTML={{ __html: formatContent(post.content) }} />
            </div>

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="mt-12 flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <Link
                    key={tag}
                    href={`/blog?tag=${tag}`}
                    className="rounded-full bg-muted px-3 py-1 text-sm text-muted-foreground hover:bg-primary/10 hover:text-primary"
                  >
                    #{tag}
                  </Link>
                ))}
              </div>
            )}

            <Separator className="my-12" />

            {/* Author Info */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  {post.author.avatar_url ? (
                    <img
                      src={post.author.avatar_url || "/placeholder.svg"}
                      alt={post.author.name}
                      className="size-16 rounded-full object-cover"
                    />
                  ) : (
                    <div className="flex size-16 items-center justify-center rounded-full bg-primary/10 text-2xl font-semibold text-primary">
                      {post.author.name[0]}
                    </div>
                  )}
                  <div className="flex-1">
                    <h3 className="mb-1 text-lg font-semibold">{post.author.name}</h3>
                    {post.author.bio && <p className="mb-3 text-sm text-muted-foreground">{post.author.bio}</p>}
                    <div className="flex gap-2">
                      {post.author.twitter_handle && (
                        <Button asChild variant="outline" size="sm">
                          <a
                            href={`https://twitter.com/${post.author.twitter_handle}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Twitter className="size-4" />
                          </a>
                        </Button>
                      )}
                      {post.author.linkedin_url && (
                        <Button asChild variant="outline" size="sm">
                          <a href={post.author.linkedin_url} target="_blank" rel="noopener noreferrer">
                            <Linkedin className="size-4" />
                          </a>
                        </Button>
                      )}
                      {post.author.website_url && (
                        <Button asChild variant="outline" size="sm">
                          <a href={post.author.website_url} target="_blank" rel="noopener noreferrer">
                            <Globe className="size-4" />
                          </a>
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Related Tools/Stacks CTAs */}
            {(post.related_tools?.length || post.related_stacks?.length) && (
              <>
                <Separator className="my-12" />
                <div>
                  <h3 className="mb-6 text-2xl font-bold">Related Resources</h3>
                  <div className="grid gap-4 sm:grid-cols-2">
                    {post.related_tools?.map((item: any) => (
                      <Card key={item.product?.id} className="hover:border-primary/50">
                        <CardContent className="p-4">
                          <Link href={`/tool/${item.product?.slug}`} className="flex items-center gap-3">
                            {item.product?.logo_url && (
                              <img
                                src={item.product.logo_url || "/placeholder.svg"}
                                alt={item.product.name}
                                className="size-12 rounded-lg object-contain"
                              />
                            )}
                            <div className="flex-1">
                              <h4 className="font-semibold">{item.product?.name}</h4>
                              <p className="text-sm text-muted-foreground line-clamp-1">{item.product?.tagline}</p>
                            </div>
                            <ExternalLink className="size-4 text-muted-foreground" />
                          </Link>
                        </CardContent>
                      </Card>
                    ))}
                    {post.related_stacks?.map((item: any) => (
                      <Card key={item.stack?.id} className="hover:border-primary/50">
                        <CardContent className="p-4">
                          <Link href={`/stack/${item.stack?.slug}`} className="flex items-center gap-3">
                            <div className="flex size-12 items-center justify-center rounded-lg bg-primary/10 text-xl font-semibold text-primary">
                              {item.stack?.name[0]}
                            </div>
                            <div className="flex-1">
                              <h4 className="font-semibold">{item.stack?.name}</h4>
                              <p className="text-sm text-muted-foreground line-clamp-1">{item.stack?.description}</p>
                            </div>
                            <ExternalLink className="size-4 text-muted-foreground" />
                          </Link>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Sidebar */}
          <aside className="hidden lg:block">
            <div className="sticky top-24 space-y-6">
              {/* Share */}
              <Card>
                <CardContent className="p-4">
                  <h4 className="mb-3 font-semibold">Share this article</h4>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        window.open(`https://twitter.com/intent/tweet?url=${shareUrl}&text=${post.title}`, "_blank")
                      }}
                    >
                      <Twitter className="size-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`, "_blank")
                      }}
                    >
                      <Linkedin className="size-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        navigator.clipboard.writeText(shareUrl)
                      }}
                    >
                      <Share2 className="size-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Table of Contents */}
              {tableOfContents.length > 0 && (
                <Card>
                  <CardContent className="p-4">
                    <h4 className="mb-3 font-semibold">Table of Contents</h4>
                    <nav className="space-y-2 text-sm">
                      {tableOfContents.map((heading) => (
                        <a
                          key={heading.id}
                          href={`#${heading.id}`}
                          className="block text-muted-foreground hover:text-primary"
                          style={{ paddingLeft: `${(heading.level - 1) * 12}px` }}
                        >
                          {heading.text}
                        </a>
                      ))}
                    </nav>
                  </CardContent>
                </Card>
              )}
            </div>
          </aside>
        </div>
      </div>
    </PublicLayout>
  )
}

// Helper function to extract headings from content
function extractHeadings(content: string): { id: string; text: string; level: number }[] {
  const headingRegex = /<h([2-3])[^>]*id="([^"]*)"[^>]*>(.*?)<\/h\1>/gi
  const headings: { id: string; text: string; level: number }[] = []
  let match

  while ((match = headingRegex.exec(content)) !== null) {
    headings.push({
      level: Number.parseInt(match[1]),
      id: match[2],
      text: match[3].replace(/<[^>]*>/g, ""), // Strip HTML tags
    })
  }

  return headings
}

// Helper function to format content (convert markdown-like syntax to HTML)
function formatContent(content: string): string {
  // Basic formatting - in production, use a proper markdown parser like marked or remark
  return content
    .replace(/^## (.*$)/gim, '<h2 id="$1" class="mt-12 mb-4 text-3xl font-bold">$1</h2>')
    .replace(/^### (.*$)/gim, '<h3 id="$1" class="mt-8 mb-3 text-2xl font-semibold">$1</h3>')
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.*?)\*/g, "<em>$1</em>")
    .replace(/\[(.*?)\]$$(.*?)$$/g, '<a href="$2" class="text-primary hover:underline">$1</a>')
    .replace(/\n\n/g, "</p><p>")
    .replace(/^(.+)$/gm, "<p>$1</p>")
}

// Mock post for fallback
const mockPost: BlogPostWithAuthor = {
  id: "1",
  slug: "getting-started-with-ai-tools",
  title: "Getting Started with AI Tools: A Complete Guide",
  summary:
    "Learn how to choose the right AI tools for your workflow and maximize productivity with our comprehensive guide covering tool selection, implementation strategies, and best practices.",
  content: `
## Introduction

Artificial Intelligence tools have revolutionized how we work, create, and solve problems. This comprehensive guide will walk you through everything you need to know about getting started with AI tools.

## Understanding AI Tool Categories

Before diving into specific tools, it's essential to understand the different categories of AI tools available:

### Text Generation Tools

Tools like ChatGPT and Claude excel at generating written content, from emails to essays. These are perfect for content creators, marketers, and anyone who writes regularly.

### Image Generation Tools

Midjourney, DALL-E, and Stable Diffusion can create stunning visuals from text descriptions. These tools are invaluable for designers, marketers, and creative professionals.

### Code Generation Tools

GitHub Copilot and other coding assistants help developers write code faster and with fewer errors.

## How to Choose the Right Tool

When selecting an AI tool, consider these factors:

**1. Your Use Case** - What problem are you trying to solve?
**2. Budget** - Free vs paid options
**3. Learning Curve** - How much time can you invest in learning?
**4. Integration** - Does it work with your existing tools?

## Best Practices

Here are some tips for getting the most out of AI tools:

- Start small and experiment
- Learn prompt engineering basics
- Combine multiple tools for better results
- Stay updated on new features

## Conclusion

AI tools are powerful productivity enhancers when used correctly. Start with one tool, master it, then gradually expand your AI toolkit as needed.
  `,
  thumbnail_url: "/blog-ai-tools-guide.jpg",
  category: "Guide",
  tags: ["AI", "Productivity", "Getting Started"],
  meta_description: "A comprehensive guide to getting started with AI tools",
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
    bio: "AI tools expert and content creator helping thousands of people discover and master AI tools.",
    avatar_url: "/author-sarah.jpg",
    twitter_handle: "sarahchen",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
}
