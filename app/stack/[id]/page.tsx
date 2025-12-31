import { Bookmark, Share2, Users, Zap, Clock, Lightbulb, Target, Workflow, BookOpen } from "lucide-react"
import { PublicLayout } from "@/components/layout/public-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { SimpleBreadcrumb } from "@/components/ui/breadcrumb"
import type { Stack } from "@/lib/types"

const stack: Stack = {
  id: "1",
  slug: "general-assistance",
  name: "General Assistance",
  description: "General purpose assistance and support stack",
  color: "#3B82F6",
  use_case: "Perfect for general assistance",
  total_tools: 3,
  created_by: "AI Stack Team",
  average_rating: 4.7,
  active_users: 2500,
  last_updated_days: 2,
  tools: [
    {
      id: "1",
      slug: "perplexity",
      name: "Perplexity AI",
      tagline: "AI answer engine delivering real-time, accurate answers with trusted sources.",
      description: "AI answer engine with trusted sources",
      website_url: "https://perplexity.ai",
      logo_url: "/perplexity-ai-interface.jpg",
      tool_thumbnail_url: "/perplexity-ai-interface.jpg",
      is_verified: true,
      tags: [
        { id: "1", slug: "answers", name: "answers" },
        { id: "2", slug: "chat", name: "chat" },
      ],
      categories: [{ id: "1", slug: "productivity", name: "Productivity & Workflow Tools" }],
      subcategories: [],
      created_at: "2024-01-01",
      updated_at: "2024-01-01",
    },
    {
      id: "2",
      slug: "claude",
      name: "Claude",
      tagline: "Helpful, honest, and harmless AI assistant",
      description: "AI assistant by Anthropic",
      website_url: "https://claude.ai",
      logo_url: "/claude-ai-interface.png",
      tool_thumbnail_url: "/claude-ai-interface.png",
      is_verified: true,
      tags: [
        { id: "3", slug: "LLM", name: "LLM" },
        { id: "4", slug: "chat", name: "chat" },
      ],
      categories: [{ id: "1", slug: "productivity", name: "Productivity & Workflow Tools" }],
      subcategories: [],
      created_at: "2024-01-01",
      updated_at: "2024-01-01",
    },
    {
      id: "3",
      slug: "chatgpt",
      name: "ChatGPT",
      tagline: "ChatGPT: Your endlessly versatile conversational AI — discuss, learn, create, and more.",
      description: "Versatile conversational AI",
      website_url: "https://chat.openai.com",
      logo_url: "/chatgpt-logo-inspired.png",
      tool_thumbnail_url: "/chatgpt-interface.jpg",
      is_verified: true,
      tags: [
        { id: "5", slug: "LLM", name: "LLM" },
        { id: "6", slug: "chat", name: "chat" },
      ],
      categories: [{ id: "2", slug: "analytics", name: "Analytics & Data Tools" }],
      subcategories: [],
      created_at: "2024-01-01",
      updated_at: "2024-01-01",
    },
  ],
  created_at: "2024-01-01",
  updated_at: "2024-01-01",
}

const relatedStacks: Stack[] = [
  {
    id: "2",
    slug: "content-creators",
    name: "Content Creators",
    description: "Creative AI tools for video, audio, and visual content",
    color: "#EC4899",
    total_tools: 5,
    tools: [],
    created_at: "2024-01-01",
    updated_at: "2024-01-01",
  },
  {
    id: "3",
    slug: "business-productivity",
    name: "Business Productivity",
    description: "Professional-grade AI tools for streamlined workflows",
    color: "#8B5CF6",
    total_tools: 4,
    tools: [],
    created_at: "2024-01-01",
    updated_at: "2024-01-01",
  },
  {
    id: "4",
    slug: "indie-hackers",
    name: "Indie Hackers",
    description: "Lean AI tools for independent developers",
    color: "#10B981",
    total_tools: 6,
    tools: [],
    created_at: "2024-01-01",
    updated_at: "2024-01-01",
  },
]

const stackDetails = [
  {
    icon: Target,
    title: "What It's For",
    description:
      "This stack provides a complete solution for general assistance needs, combining conversational AI, research capabilities, and content generation to handle diverse queries effectively.",
  },
  {
    icon: Workflow,
    title: "How to Use",
    description:
      "Start with Perplexity for research and fact-checking, use Claude for detailed analysis and writing tasks, and leverage ChatGPT for brainstorming and quick responses. Switch between tools based on your specific needs.",
  },
  {
    icon: Lightbulb,
    title: "Key Benefits",
    description:
      "Access multiple AI models in one workflow, compare responses for accuracy, leverage each tool's strengths, and maintain continuity across different types of assistance tasks.",
  },
  {
    icon: BookOpen,
    title: "Best Practices",
    description:
      "Use Perplexity when you need cited sources, Claude for long-form content and complex reasoning, and ChatGPT for creative tasks. Export and share conversations between tools for comprehensive solutions.",
  },
]

export default function StackDetailPage() {
  return (
    <PublicLayout>
      <div className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
        <SimpleBreadcrumb
          items={[{ label: "Home", href: "/" }, { label: "AI Stacks", href: "/stacks" }, { label: stack.name }]}
          className="mb-6"
        />

        <div className="mb-8 overflow-hidden rounded-xl border border-border bg-gradient-to-br from-blue-50/50 to-purple-50/30 dark:from-blue-950/20 dark:to-purple-950/20">
          <div className="p-8 sm:p-12">
            <div className="flex items-start gap-6">
              {/* Large letter badge */}
              <div className="flex size-20 shrink-0 items-center justify-center rounded-2xl bg-blue-100 text-3xl font-bold text-primary dark:bg-blue-900/50">
                {stack.name.charAt(0)}
              </div>

              <div className="min-w-0 flex-1">
                <h1 className="mb-3 text-balance text-4xl font-bold tracking-tight">{stack.name}</h1>
                <p className="mb-6 text-pretty text-lg text-muted-foreground">{stack.description}</p>

                {/* Meta info with stats */}
                <div className="mb-6 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Zap className="size-4" />
                    <span>{stack.total_tools} Tools & Agents</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Users className="size-4" />
                    <span>{stack.use_case}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock className="size-4" />
                    <span>Updated {stack.last_updated_days} days ago</span>
                  </div>
                </div>

                {/* Created by info */}
                {stack.created_by && (
                  <div className="mb-6 inline-flex items-center gap-2 rounded-lg bg-background/60 px-3 py-1.5 text-sm backdrop-blur-sm">
                    <span className="text-muted-foreground">Created by</span>
                    <span className="font-medium">{stack.created_by}</span>
                  </div>
                )}

                {/* Action buttons */}
                <div className="flex flex-wrap gap-3">
                  <Button variant="outline" size="default">
                    <Share2 className="mr-2 size-4" />
                    Share
                  </Button>
                  <Button variant="outline" size="default">
                    <Bookmark className="mr-2 size-4" />
                    Save
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-12">
          {/* Main content */}
          <section>
            <h2 className="mb-4 text-2xl font-bold">Stack Overview</h2>
            <p className="text-pretty leading-relaxed text-muted-foreground">
              This curated collection of AI tools and agents is specifically designed for general assistance. Each tool
              has been carefully selected to work together seamlessly, providing you with a comprehensive solution for
              your workflow needs.
            </p>
          </section>

          <section>
            <h2 className="mb-6 text-2xl font-bold">Tools & Agents in this Stack</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {stack.tools.map((tool) => (
                <Card key={tool.id} className="group overflow-hidden transition-shadow hover:shadow-lg">
                  {/* Tool thumbnail/screenshot */}
                  <div className="aspect-video w-full overflow-hidden bg-muted">
                    <img
                      src={tool.tool_thumbnail_url || "/placeholder.svg?height=300&width=400"}
                      alt={`${tool.name} screenshot`}
                      className="size-full object-cover transition-transform group-hover:scale-105"
                    />
                  </div>

                  <CardContent className="p-5">
                    <div className="mb-3 flex items-start justify-between gap-2">
                      <h3 className="font-semibold leading-tight">{tool.name}</h3>
                      {tool.logo_url && (
                        <img
                          src={tool.logo_url || "/placeholder.svg"}
                          alt={`${tool.name} logo`}
                          className="size-8 shrink-0 rounded object-cover"
                        />
                      )}
                    </div>

                    <p className="mb-4 text-sm text-muted-foreground line-clamp-2">{tool.tagline}</p>

                    <div className="mb-4">
                      <p className="mb-2 text-xs font-medium text-muted-foreground">{tool.categories[0]?.name}</p>
                      <div className="flex flex-wrap gap-1.5">
                        {tool.tags.slice(0, 3).map((tag) => (
                          <Badge key={tag.id} variant="secondary" className="text-xs">
                            {tag.name}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Stack Guide */}
          <section>
            <h2 className="mb-6 text-2xl font-bold">Stack Guide</h2>
            <div className="grid gap-6 sm:grid-cols-2">
              {stackDetails.map((item, index) => {
                const IconComponent = item.icon
                return (
                  <Card key={index}>
                    <CardContent className="p-6">
                      <div className="mb-3 flex items-center gap-3">
                        <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
                          <IconComponent className="size-5 text-primary" />
                        </div>
                        <h3 className="text-lg font-semibold">{item.title}</h3>
                      </div>
                      <p className="text-pretty text-sm leading-relaxed text-muted-foreground">{item.description}</p>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </section>

          {/* Related Stacks - Now full width at bottom */}
          <section>
            <h2 className="mb-6 text-2xl font-bold">Related Stacks</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relatedStacks.map((relatedStack) => (
                <Card key={relatedStack.id} className="group transition-shadow hover:shadow-lg">
                  <CardContent className="p-6">
                    <h3 className="mb-2 text-lg font-semibold group-hover:text-primary">{relatedStack.name}</h3>
                    <p className="mb-4 text-sm text-muted-foreground line-clamp-2">{relatedStack.description}</p>
                    <Button asChild variant="outline" size="sm" className="w-full bg-transparent">
                      <a href={`/stack/${relatedStack.slug}`}>View Stack</a>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        </div>
      </div>
    </PublicLayout>
  )
}
