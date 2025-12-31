"use client"

import { useEffect, useState } from "react"
import { useSearchParams, useParams } from "next/navigation"
import Link from "next/link"
import {
  ArrowRight,
  Bookmark,
  Share2,
  Sparkles,
  CheckCircle2,
  ExternalLink,
  ChevronRight,
  Loader2,
  ArrowLeft,
  TrendingUp,
  Star,
  Users,
} from "lucide-react"
import { PublicLayout } from "@/components/layout/public-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import type { Tool, Stack } from "@/lib/types"

interface WorkflowStep {
  step: number
  title: string
  description: string
  tools: Tool[]
  tips: string[]
}

export default function WorkflowPage() {
  const params = useParams()
  const id = params.id as string
  const searchParams = useSearchParams()
  const query = searchParams.get("q") || ""

  const [isLoading, setIsLoading] = useState(true)
  const [isSaved, setIsSaved] = useState(false)
  const [workflow, setWorkflow] = useState<{
    title: string
    description: string
    steps: WorkflowStep[]
    recommendedTools: Tool[]
    relatedStacks: Stack[]
    trendingTools: Tool[]
  } | null>(null)

  useEffect(() => {
    // Simulate AI processing and workflow generation
    const generateWorkflow = async () => {
      setIsLoading(true)

      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Mock workflow data - in production, this would come from AI API
      const mockWorkflow = {
        title: "Social Media Content Automation Workflow",
        description:
          "A complete workflow to automate your social media content creation, scheduling, and analytics. This stack combines content generation, image creation, scheduling tools, and analytics platforms.",
        steps: [
          {
            step: 1,
            title: "Generate Content Ideas & Copy",
            description:
              "Use AI writing tools to brainstorm content ideas and create engaging social media copy that resonates with your audience.",
            tools: [
              {
                id: "1",
                slug: "chatgpt",
                name: "ChatGPT",
                tagline: "Generate engaging content ideas and copy",
                description: "AI-powered content generation",
                website_url: "https://chat.openai.com",
                logo_url: "/chatgpt-logo-inspired.png",
                is_verified: true,
                tags: [{ id: "1", slug: "writing", name: "Writing" }],
                categories: [{ id: "1", slug: "text-generation", name: "Text Generation" }],
                subcategories: [],
                created_at: "2024-01-01",
                updated_at: "2024-01-01",
              },
              {
                id: "2",
                slug: "jasper",
                name: "Jasper",
                tagline: "Marketing-focused AI copywriter",
                description: "AI content platform for marketing teams",
                website_url: "https://jasper.ai",
                logo_url: "/generic-abstract-logo.png",
                is_verified: true,
                tags: [{ id: "2", slug: "marketing", name: "Marketing" }],
                categories: [{ id: "2", slug: "marketing", name: "Marketing" }],
                subcategories: [],
                created_at: "2024-01-01",
                updated_at: "2024-01-01",
              },
            ],
            tips: [
              "Create content calendars 2-4 weeks in advance",
              "Use templates to maintain brand consistency",
              "A/B test different content formats",
            ],
          },
          {
            step: 2,
            title: "Create Visual Assets",
            description:
              "Design eye-catching graphics, images, and videos for your social posts using AI-powered design tools.",
            tools: [
              {
                id: "3",
                slug: "midjourney",
                name: "Midjourney",
                tagline: "AI-powered image generation",
                description: "Create stunning visuals from text",
                website_url: "https://midjourney.com",
                logo_url: "/generic-abstract-logo.png",
                is_verified: true,
                tags: [{ id: "3", slug: "image-gen", name: "Image Gen" }],
                categories: [{ id: "3", slug: "image-generation", name: "Image Generation" }],
                subcategories: [],
                created_at: "2024-01-01",
                updated_at: "2024-01-01",
              },
              {
                id: "4",
                slug: "canva",
                name: "Canva",
                tagline: "Design platform with AI features",
                description: "Create social media graphics easily",
                website_url: "https://canva.com",
                logo_url: "/generic-abstract-logo.png",
                is_verified: false,
                tags: [{ id: "4", slug: "design", name: "Design" }],
                categories: [{ id: "4", slug: "design", name: "Design" }],
                subcategories: [],
                created_at: "2024-01-01",
                updated_at: "2024-01-01",
              },
            ],
            tips: [
              "Maintain consistent brand colors and fonts",
              "Optimize image sizes for each platform",
              "Create multiple variations for testing",
            ],
          },
          {
            step: 3,
            title: "Schedule & Publish",
            description:
              "Automate your posting schedule across multiple social media platforms to maintain consistency.",
            tools: [
              {
                id: "5",
                slug: "buffer",
                name: "Buffer",
                tagline: "Social media scheduling made simple",
                description: "Schedule posts across all platforms",
                website_url: "https://buffer.com",
                logo_url: "/generic-abstract-logo.png",
                is_verified: true,
                tags: [{ id: "5", slug: "scheduling", name: "Scheduling" }],
                categories: [{ id: "5", slug: "social-media", name: "Social Media" }],
                subcategories: [],
                created_at: "2024-01-01",
                updated_at: "2024-01-01",
              },
            ],
            tips: [
              "Post during peak engagement times",
              "Use platform-specific best practices",
              "Maintain a consistent posting schedule",
            ],
          },
          {
            step: 4,
            title: "Track & Optimize",
            description:
              "Monitor performance metrics and use AI insights to continuously improve your content strategy.",
            tools: [
              {
                id: "6",
                slug: "analytics-tool",
                name: "Analytics Pro",
                tagline: "AI-powered social analytics",
                description: "Track and optimize social performance",
                website_url: "https://example.com",
                logo_url: "/generic-abstract-logo.png",
                is_verified: false,
                tags: [{ id: "6", slug: "analytics", name: "Analytics" }],
                categories: [{ id: "6", slug: "analytics", name: "Analytics" }],
                subcategories: [],
                created_at: "2024-01-01",
                updated_at: "2024-01-01",
              },
            ],
            tips: [
              "Review analytics weekly to spot trends",
              "Focus on engagement over vanity metrics",
              "Use insights to refine your strategy",
            ],
          },
        ],
        recommendedTools: [],
        relatedStacks: [
          {
            id: "1",
            name: "Content Creator Essentials",
            slug: "content-creator-essentials",
            description: "Complete toolkit for content creators",
            color: "#F59E0B",
            tools: [],
            tool_count: 5,
            created_at: "2024-01-01",
            updated_at: "2024-01-01",
          },
          {
            id: "2",
            name: "Marketing Automation Stack",
            slug: "marketing-automation",
            description: "Automate your entire marketing workflow",
            color: "#10B981",
            tools: [],
            tool_count: 7,
            created_at: "2024-01-01",
            updated_at: "2024-01-01",
          },
        ],
        trendingTools: [
          {
            id: "7",
            slug: "trending-ai-1",
            name: "AI Assistant Pro",
            tagline: "Your personal AI productivity assistant",
            description: "Boost productivity with AI",
            website_url: "https://example.com",
            logo_url: "/generic-abstract-logo.png",
            is_verified: true,
            tags: [{ id: "7", slug: "productivity", name: "Productivity" }],
            categories: [{ id: "7", slug: "productivity", name: "Productivity" }],
            subcategories: [],
            created_at: "2024-01-01",
            updated_at: "2024-01-01",
          },
          {
            id: "8",
            slug: "trending-ai-2",
            name: "Smart Scheduler",
            tagline: "AI-powered scheduling and calendar management",
            description: "Never miss a meeting again",
            website_url: "https://example.com",
            logo_url: "/generic-abstract-logo.png",
            is_verified: false,
            tags: [{ id: "8", slug: "scheduling", name: "Scheduling" }],
            categories: [{ id: "8", slug: "productivity", name: "Productivity" }],
            subcategories: [],
            created_at: "2024-01-01",
            updated_at: "2024-01-01",
          },
        ],
      }

      // Combine all tools for recommended section
      mockWorkflow.recommendedTools = mockWorkflow.steps.flatMap((step) => step.tools)

      setWorkflow(mockWorkflow)
      setIsLoading(false)
    }

    generateWorkflow()
  }, [query])

  const handleSave = () => {
    // TODO: Implement save functionality with auth
    setIsSaved(!isSaved)
  }

  const handleShare = () => {
    // TODO: Implement share functionality
    if (navigator.share) {
      navigator.share({
        title: workflow?.title || "AI Workflow",
        url: window.location.href,
      })
    }
  }

  if (isLoading) {
    return (
      <PublicLayout>
        <div className="mx-auto max-w-4xl px-4 py-24">
          <div className="flex flex-col items-center justify-center gap-4 text-center">
            <div className="flex size-16 items-center justify-center rounded-full bg-primary/10">
              <Loader2 className="size-8 animate-spin text-primary" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Analyzing your needs...</h2>
              <p className="mt-2 text-muted-foreground">
                Our AI is finding the perfect tools and creating a custom workflow for you
              </p>
            </div>
            <div className="mt-4 space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="size-4 text-primary" />
                <span>Understanding your requirements</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="size-4 text-primary" />
                <span>Matching with 500+ AI tools</span>
              </div>
              <div className="flex items-center gap-2">
                <Loader2 className="size-4 animate-spin text-primary" />
                <span>Creating your workflow...</span>
              </div>
            </div>
          </div>
        </div>
      </PublicLayout>
    )
  }

  if (!workflow) {
    return (
      <PublicLayout>
        <div className="mx-auto max-w-4xl px-4 py-24 text-center">
          <h2 className="text-2xl font-bold">Workflow not found</h2>
          <p className="mt-2 text-muted-foreground">We couldn't generate a workflow for your request.</p>
          <Button asChild className="mt-6">
            <Link href="/">Try Again</Link>
          </Button>
        </div>
      </PublicLayout>
    )
  }

  return (
    <PublicLayout>
      <div className="border-b border-border bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
          <Button asChild variant="ghost" size="sm" className="mb-4">
            <Link href="/">
              <ArrowLeft className="mr-2 size-4" />
              Back to Home
            </Link>
          </Button>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex-1">
              <div className="mb-3 flex items-center gap-2">
                <div className="flex size-8 items-center justify-center rounded-lg bg-primary/10">
                  <Sparkles className="size-4 text-primary" />
                </div>
                <Badge variant="secondary">AI Generated</Badge>
              </div>
              <h1 className="mb-3 text-3xl font-bold tracking-tight lg:text-4xl">{workflow.title}</h1>
              <p className="text-lg text-muted-foreground">{workflow.description}</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={handleSave}>
                <Bookmark className={`mr-2 size-4 ${isSaved ? "fill-current" : ""}`} />
                {isSaved ? "Saved" : "Save"}
              </Button>
              <Button variant="outline" size="sm" onClick={handleShare}>
                <Share2 className="mr-2 size-4" />
                Share
              </Button>
            </div>
          </div>

          {/* Auth Alert */}
          <Alert className="mt-6">
            <Sparkles className="size-4" />
            <AlertDescription>
              <Link href="/login" className="font-medium underline">
                Sign in
              </Link>{" "}
              to save this workflow and track your progress
            </AlertDescription>
          </Alert>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
          {/* Main Content */}
          <div className="space-y-8">
            <div>
              <h2 className="mb-6 text-2xl font-bold">Getting Started</h2>
              <div className="space-y-6">
                {workflow.steps.map((step, index) => (
                  <Card key={step.step} className="overflow-hidden">
                    <CardHeader className="bg-muted/50">
                      <div className="flex items-start gap-4">
                        <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-foreground">
                          {step.step}
                        </div>
                        <div className="flex-1">
                          <CardTitle className="mb-2">{step.title}</CardTitle>
                          <CardDescription className="text-base">{step.description}</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-6">
                      {/* Recommended Tools for this step */}
                      <div className="mb-6">
                        <h4 className="mb-4 font-semibold">Recommended Tools:</h4>
                        <div className="space-y-3">
                          {step.tools.map((tool) => (
                            <div
                              key={tool.id}
                              className="flex items-center gap-4 rounded-lg border border-border p-4 transition-all hover:border-primary hover:bg-accent/50"
                            >
                              <div className="flex size-12 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-border bg-background">
                                <img
                                  src={tool.logo_url || "/placeholder.svg"}
                                  alt={tool.name}
                                  className="size-10 object-contain"
                                />
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center gap-2">
                                  <h5 className="font-semibold">{tool.name}</h5>
                                  {tool.is_verified && (
                                    <Badge variant="secondary" className="text-xs">
                                      Verified
                                    </Badge>
                                  )}
                                </div>
                                <p className="text-sm text-muted-foreground">{tool.tagline}</p>
                              </div>
                              <div className="flex gap-2">
                                <Button asChild variant="outline" size="sm">
                                  <Link href={`/tool/${tool.slug}`}>Details</Link>
                                </Button>
                                <Button asChild size="sm">
                                  <a href={tool.website_url} target="_blank" rel="noopener noreferrer">
                                    Visit <ExternalLink className="ml-2 size-3" />
                                  </a>
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Tips */}
                      <div className="rounded-lg bg-muted/50 p-4">
                        <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold">
                          <Sparkles className="size-4 text-primary" />
                          Pro Tips
                        </h4>
                        <ul className="space-y-2">
                          {step.tips.map((tip, tipIndex) => (
                            <li key={tipIndex} className="flex items-start gap-2 text-sm text-muted-foreground">
                              <ChevronRight className="mt-0.5 size-4 shrink-0 text-primary" />
                              <span>{tip}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* All Recommended Tools Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Complete Tool Stack</CardTitle>
                <CardDescription>
                  All {workflow.recommendedTools.length} tools recommended for this workflow
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 sm:grid-cols-2">
                  {workflow.recommendedTools.map((tool) => (
                    <Link
                      key={tool.id}
                      href={`/tool/${tool.slug}`}
                      className="flex items-center gap-3 rounded-lg border border-border p-3 transition-all hover:border-primary hover:bg-accent/50"
                    >
                      <div className="flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-border bg-background">
                        <img
                          src={tool.logo_url || "/placeholder.svg"}
                          alt={tool.name}
                          className="size-8 object-contain"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <h5 className="truncate font-semibold">{tool.name}</h5>
                          {tool.is_verified && <CheckCircle2 className="size-3 shrink-0 text-primary" />}
                        </div>
                        <p className="truncate text-sm text-muted-foreground">{tool.tagline}</p>
                      </div>
                      <ChevronRight className="size-4 shrink-0 text-muted-foreground" />
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* CTA */}
            <Card className="border-primary/20 bg-primary/5">
              <CardContent className="flex flex-col items-center gap-4 py-8 text-center">
                <Sparkles className="size-8 text-primary" />
                <div>
                  <h3 className="mb-2 text-xl font-bold">Ready to get started?</h3>
                  <p className="text-muted-foreground">Sign in to save this workflow and track your progress</p>
                </div>
                <div className="flex gap-3">
                  <Button asChild size="lg">
                    <Link href="/login">Sign In to Save</Link>
                  </Button>
                  <Button asChild variant="outline" size="lg">
                    <Link href="/">
                      Create Another Workflow <ArrowRight className="ml-2 size-4" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            {/* Related Stacks */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Sparkles className="size-4 text-primary" />
                  Related Stacks
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {workflow.relatedStacks.map((stack) => (
                  <Link
                    key={stack.id}
                    href={`/stack/${stack.id}`}
                    className="block rounded-lg border border-border p-3 transition-all hover:border-primary hover:bg-accent/50"
                  >
                    <h4 className="mb-1 font-semibold">{stack.name}</h4>
                    <p className="mb-2 text-xs text-muted-foreground">{stack.description}</p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Sparkles className="size-3" />
                      <span>{stack.tool_count} tools</span>
                    </div>
                  </Link>
                ))}
                <Button asChild variant="outline" size="sm" className="w-full bg-transparent">
                  <Link href="/stacks">
                    View All Stacks <ChevronRight className="ml-2 size-3" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Trending Tools */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <TrendingUp className="size-4 text-primary" />
                  Trending Now
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {workflow.trendingTools.map((tool) => (
                  <Link
                    key={tool.id}
                    href={`/tool/${tool.slug}`}
                    className="flex items-start gap-3 rounded-lg border border-border p-3 transition-all hover:border-primary hover:bg-accent/50"
                  >
                    <div className="flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-border bg-background">
                      <img
                        src={tool.logo_url || "/placeholder.svg"}
                        alt={tool.name}
                        className="size-8 object-contain"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="mb-1 flex items-center gap-1">
                        <h5 className="truncate text-sm font-semibold">{tool.name}</h5>
                        {tool.is_verified && <CheckCircle2 className="size-3 shrink-0 text-primary" />}
                      </div>
                      <p className="line-clamp-2 text-xs text-muted-foreground">{tool.tagline}</p>
                    </div>
                  </Link>
                ))}
                <Button asChild variant="outline" size="sm" className="w-full bg-transparent">
                  <Link href="/explore">
                    Explore All Tools <ChevronRight className="ml-2 size-3" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Featured Product/Ad */}
            <Card className="border-primary/30 bg-gradient-to-br from-primary/5 to-primary/10">
              <CardContent className="p-6">
                <div className="mb-3 flex items-center gap-2">
                  <Badge variant="secondary" className="text-xs">
                    Featured
                  </Badge>
                  <Star className="size-3 fill-primary text-primary" />
                </div>
                <h4 className="mb-2 font-bold">AI Workflow Builder Pro</h4>
                <p className="mb-4 text-sm text-muted-foreground">
                  Create, save, and share unlimited AI workflows. Collaborate with your team and track progress.
                </p>
                <div className="mb-4 flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-primary">$29</span>
                  <span className="text-sm text-muted-foreground">/month</span>
                </div>
                <Button asChild className="w-full">
                  <a href="https://example.com" target="_blank" rel="noopener noreferrer">
                    Learn More <ExternalLink className="ml-2 size-3" />
                  </a>
                </Button>
              </CardContent>
            </Card>

            {/* Community Spotlight */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Users className="size-4 text-primary" />
                  Community Spotlight
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="rounded-lg bg-muted/50 p-3">
                  <p className="mb-2 text-sm">"This workflow saved me 10+ hours per week on content creation!"</p>
                  <p className="text-xs text-muted-foreground">— Sarah K., Content Creator</p>
                </div>
                <div className="rounded-lg bg-muted/50 p-3">
                  <p className="mb-2 text-sm">"The AI recommendations are spot-on. Highly recommend!"</p>
                  <p className="text-xs text-muted-foreground">— Mike T., Marketing Manager</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </PublicLayout>
  )
}
