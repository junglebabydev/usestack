import Link from "next/link"
import { ArrowRight, Sparkles, Bot } from "lucide-react"
import { PublicLayout } from "@/components/layout/public-layout"
import { Button } from "@/components/ui/button"
import { ToolCard } from "@/components/tools/tool-card"
import { CategoryCard } from "@/components/categories/category-card"
import { AiPromptSearch } from "@/components/ai/ai-prompt-search"
import { BlogSection } from "@/components/blog/blog-section"
import type { Tool, Category } from "@/lib/types"

// Mock data - replace with actual Supabase queries
const featuredTools: Tool[] = [
  {
    id: "1",
    slug: "chatgpt",
    name: "ChatGPT",
    tagline: "Conversational AI that understands context and generates human-like responses",
    description: "Advanced language model for natural conversations",
    website_url: "https://chat.openai.com",
    logo_url: "/chatgpt-logo-inspired.png",
    is_verified: true,
    tags: [
      { id: "1", slug: "nlp", name: "NLP" },
      { id: "2", slug: "chatbot", name: "Chatbot" },
    ],
    categories: [{ id: "1", slug: "text-generation", name: "Text Generation" }],
    subcategories: [],
    created_at: "2024-01-01",
    updated_at: "2024-01-01",
  },
  {
    id: "2",
    slug: "midjourney",
    name: "Midjourney",
    tagline: "AI-powered art generator creating stunning images from text prompts",
    description: "Create beautiful AI-generated artwork",
    website_url: "https://midjourney.com",
    logo_url: "/generic-abstract-logo.png",
    is_verified: true,
    tags: [{ id: "3", slug: "image-gen", name: "Image Gen" }],
    categories: [{ id: "2", slug: "image-generation", name: "Image Generation" }],
    subcategories: [],
    created_at: "2024-01-01",
    updated_at: "2024-01-01",
  },
  {
    id: "3",
    slug: "github-copilot",
    name: "GitHub Copilot",
    tagline: "Your AI pair programmer that suggests code in real-time",
    description: "AI-powered code completion and suggestions",
    website_url: "https://github.com/features/copilot",
    logo_url: "/github-copilot-logo.png",
    is_verified: true,
    tags: [{ id: "4", slug: "coding", name: "Coding" }],
    categories: [{ id: "3", slug: "developer-tools", name: "Developer Tools" }],
    subcategories: [],
    created_at: "2024-01-01",
    updated_at: "2024-01-01",
  },
]

const popularCategories: Category[] = [
  {
    id: "1",
    slug: "text-generation",
    name: "Text Generation",
    description: "AI tools for writing, content creation, and text processing",
    count: 42,
  },
  {
    id: "2",
    slug: "image-generation",
    name: "Image Generation",
    description: "Create stunning visuals with AI-powered image generation",
    count: 38,
  },
  {
    id: "3",
    slug: "developer-tools",
    name: "Developer Tools",
    description: "AI-powered coding assistants and development utilities",
    count: 35,
  },
  {
    id: "4",
    slug: "marketing",
    name: "Marketing",
    description: "AI tools for marketing automation and content strategy",
    count: 29,
  },
  {
    id: "5",
    slug: "productivity",
    name: "Productivity",
    description: "Boost your workflow with AI productivity tools",
    count: 31,
  },
  {
    id: "6",
    slug: "data-analytics",
    name: "Data & Analytics",
    description: "AI-powered data analysis and business intelligence",
    count: 24,
  },
]

const featuredStacks = [
  {
    id: "1",
    slug: "content-creator-essentials",
    name: "Content Creator Essentials",
    description: "The ultimate AI toolkit for content creators, writers, and marketers.",
    color: "#F97316",
    toolCount: 5,
    toolIcons: [
      "/chatgpt-logo-inspired.png",
      "/generic-abstract-logo.png",
      "/chatgpt-logo-inspired.png",
      "/generic-abstract-logo.png",
    ],
  },
  {
    id: "2",
    slug: "developer-productivity",
    name: "Developer Productivity Stack",
    description: "Essential AI tools for modern developers to code faster and smarter.",
    color: "#8B5CF6",
    toolCount: 6,
    toolIcons: [
      "/github-copilot-logo.png",
      "/chatgpt-logo-inspired.png",
      "/generic-abstract-logo.png",
      "/github-copilot-logo.png",
    ],
  },
  {
    id: "3",
    slug: "startup-growth-stack",
    name: "Startup Growth Stack",
    description: "All-in-one AI tools for startups to grow from 0 to 1.",
    color: "#0EA5E9",
    toolCount: 7,
    toolIcons: [
      "/chatgpt-logo-inspired.png",
      "/generic-abstract-logo.png",
      "/chatgpt-logo-inspired.png",
      "/generic-abstract-logo.png",
    ],
  },
]

export default function HomePage() {
  return (
    <PublicLayout>
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-border bg-gradient-to-b from-background via-primary/5 to-background">
        <div className="absolute inset-0 bg-grid-white/5 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:py-28 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-sm">
              <Bot className="size-4 text-primary" />
              <span className="font-semibold text-primary">AI-Powered Tool Discovery</span>
            </div>
            <h1 className="mb-6 text-balance text-5xl font-bold leading-tight tracking-tight sm:text-6xl lg:text-7xl">
              Tell us what you need,
              <br />
              <span className="text-gradient-ai">we'll find the perfect tools</span>
            </h1>
            <p className="mx-auto mb-12 max-w-2xl text-pretty text-lg text-muted-foreground sm:text-xl">
              Describe your workflow, goals, or problem. Our AI will recommend the best tools and show you exactly how
              to use them together.
            </p>

            <AiPromptSearch />
          </div>
        </div>
      </section>

      {/* Featured Stacks */}
      <section className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Curated Stacks</h2>
            <p className="mt-2 text-muted-foreground">Pre-built collections of AI tools for specific workflows</p>
          </div>
          <Button asChild variant="ghost">
            <Link href="/stacks">
              View All <ArrowRight className="ml-2 size-4" />
            </Link>
          </Button>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredStacks.map((stack) => (
            <Link
              key={stack.id}
              href={`/stack/${stack.slug}`}
              className="group block overflow-hidden rounded-xl border border-border bg-card transition-all hover:shadow-lg"
            >
              <div
                className="relative h-32 w-full transition-all group-hover:h-36"
                style={{
                  background: `linear-gradient(135deg, ${stack.color}30 0%, ${stack.color}60 100%)`,
                }}
              >
                <div className="flex h-full items-center justify-center gap-2 px-4">
                  {stack.toolIcons.slice(0, 4).map((icon, index) => (
                    <div
                      key={index}
                      className="flex size-12 items-center justify-center overflow-hidden rounded-lg border-2 border-white bg-white shadow-sm transition-transform group-hover:scale-110"
                    >
                      <img src={icon || "/placeholder.svg"} alt="" className="size-10 object-contain" />
                    </div>
                  ))}
                </div>
              </div>
              <div className="p-6">
                <h3 className="mb-2 text-xl font-semibold group-hover:text-primary">{stack.name}</h3>
                <p className="mb-4 text-sm text-muted-foreground line-clamp-2">{stack.description}</p>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Sparkles className="size-4" />
                  <span>{stack.toolCount} tools included</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Tools */}
      <section className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Featured Tools</h2>
            <p className="mt-2 text-muted-foreground">Top AI tools trusted by thousands of builders</p>
          </div>
          <Button asChild variant="ghost">
            <Link href="/explore">
              View All <ArrowRight className="ml-2 size-4" />
            </Link>
          </Button>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredTools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      </section>

      {/* Popular Categories */}
      <section className="border-t border-border bg-muted/30 py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold tracking-tight">Browse by Category</h2>
            <p className="mt-2 text-muted-foreground">Explore AI tools organized by use case</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {popularCategories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
          <div className="mt-8 text-center">
            <Button asChild variant="outline" size="lg">
              <Link href="/categories">
                View All Categories <ArrowRight className="ml-2 size-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <BlogSection />

      {/* CTA Section */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-7xl px-4 py-24 text-center lg:px-8">
          <div className="mx-auto max-w-2xl">
            <h2 className="mb-4 text-balance text-4xl font-bold tracking-tight">Built something awesome?</h2>
            <p className="mb-8 text-pretty text-lg text-muted-foreground">
              Share your AI tool with thousands of builders and founders actively looking for solutions.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button asChild size="lg">
                <Link href="/submit-tool">
                  Submit Your Tool <ArrowRight className="ml-2 size-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/newsletter">Subscribe to Newsletter</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </PublicLayout>
  )
}
