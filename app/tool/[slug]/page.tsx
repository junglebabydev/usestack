import { ExternalLink, CheckCircle2, TrendingUp, Calendar, Users, DollarSign, Building2 } from "lucide-react"
import { PublicLayout } from "@/components/layout/public-layout"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Breadcrumb } from "@/components/ui/breadcrumb"
import type { Tool } from "@/lib/types"

// Mock data - replace with Supabase query
const tool: Tool = {
  id: "1",
  slug: "chatgpt",
  name: "ChatGPT",
  tagline: "Conversational AI that understands context and generates human-like responses",
  description: `ChatGPT is an advanced language model developed by OpenAI that can engage in natural conversations, answer questions, help with writing, coding, and much more. It uses state-of-the-art transformer architecture to understand context and generate human-like responses.

The tool is designed to assist with a wide variety of tasks including content creation, code generation, problem-solving, and learning. Whether you're a developer, writer, student, or business professional, ChatGPT can help streamline your workflow and boost productivity.

Key capabilities include natural language understanding, context retention across conversations, code generation and debugging, creative writing assistance, and multilingual support.`,
  website_url: "https://chat.openai.com",
  logo_url: "/chatgpt-logo-inspired.png",
  banner_url: "/placeholder.svg?height=400&width=1200",
  is_verified: true,
  tags: [
    { id: "1", slug: "nlp", name: "NLP" },
    { id: "2", slug: "chatbot", name: "Chatbot" },
    { id: "3", slug: "conversational-ai", name: "Conversational AI" },
  ],
  categories: [{ id: "1", slug: "text-generation", name: "Text Generation" }],
  subcategories: [],
  company: {
    id: "1",
    slug: "openai",
    name: "OpenAI",
    website_url: "https://openai.com",
    verified: true,
    team_size: 500,
    funding_round: "Series C",
    funding_amount: 10000000000,
    founded_year: 2015,
  },
  created_at: "2024-01-01",
  updated_at: "2024-01-01",
}

const trendingTools: Tool[] = [
  {
    id: "2",
    slug: "claude",
    name: "Claude",
    tagline: "AI assistant focused on being helpful, harmless, and honest",
    description: "Advanced AI assistant",
    website_url: "https://claude.ai",
    is_verified: true,
    tags: [],
    categories: [{ id: "1", slug: "text-generation", name: "Text Generation" }],
    subcategories: [],
    created_at: "2024-01-01",
    updated_at: "2024-01-01",
  },
]

const latestNews = [
  { id: "1", title: "OpenAI announces GPT-5 preview", date: "2024-01-15", url: "#" },
  { id: "2", title: "AI coding assistants see 200% growth", date: "2024-01-14", url: "#" },
  { id: "3", title: "New multimodal AI capabilities released", date: "2024-01-13", url: "#" },
]

export default function ToolDetailPage() {
  return (
    <PublicLayout>
      <div className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
        <Breadcrumb
          items={[{ label: "Home", href: "/" }, { label: "Explore", href: "/explore" }, { label: tool.name }]}
          className="mb-6"
        />

        <div className="flex flex-col gap-8 lg:flex-row">
          {/* Main Content */}
          <div className="min-w-0 flex-1">
            {/* Hero Section */}
            <div className="mb-8 overflow-hidden rounded-xl border border-border bg-card">
              {tool.banner_url && (
                <div className="h-48 w-full overflow-hidden bg-gradient-to-br from-chart-1/20 to-chart-2/20">
                  <img
                    src={tool.banner_url || "/placeholder.svg"}
                    alt={`${tool.name} banner`}
                    className="size-full object-cover opacity-80"
                  />
                </div>
              )}
              <div className="p-6 sm:p-8">
                <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
                  {tool.logo_url && (
                    <img
                      src={tool.logo_url || "/placeholder.svg"}
                      alt={`${tool.name} logo`}
                      className="size-20 shrink-0 rounded-xl border border-border object-cover"
                    />
                  )}
                  <div className="min-w-0 flex-1">
                    <div className="mb-2 flex flex-wrap items-center gap-2">
                      <h1 className="text-3xl font-bold">{tool.name}</h1>
                      {tool.is_verified && <CheckCircle2 className="size-6 text-chart-1" aria-label="Verified" />}
                    </div>
                    <p className="mb-4 text-balance text-lg text-muted-foreground">{tool.tagline}</p>
                    <div className="flex flex-wrap gap-2">
                      <Button size="lg" asChild>
                        <a href={tool.website_url} target="_blank" rel="noopener noreferrer">
                          Visit Website <ExternalLink className="ml-2 size-4" />
                        </a>
                      </Button>
                      <Button size="lg" variant="outline">
                        Save to Collection
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Meta Info */}
                <div className="mt-6 flex flex-wrap gap-6 border-t border-border pt-6 text-sm">
                  {tool.company && (
                    <div>
                      <span className="text-muted-foreground">Company: </span>
                      <span className="font-medium">{tool.company.name}</span>
                    </div>
                  )}
                  <div className="flex flex-wrap gap-2">
                    {tool.categories.map((category) => (
                      <Badge key={category.id} variant="secondary">
                        {category.name}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {tool.tags.map((tag) => (
                      <Badge key={tag.id} variant="outline">
                        {tag.name}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <Tabs defaultValue="about" className="w-full">
              <TabsList className="w-full justify-start">
                <TabsTrigger value="about">About</TabsTrigger>
                <TabsTrigger value="social">Social Feeds</TabsTrigger>
                <TabsTrigger value="team">Team</TabsTrigger>
              </TabsList>

              <TabsContent value="about" className="mt-6 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Description</CardTitle>
                  </CardHeader>
                  <CardContent className="prose prose-sm max-w-none dark:prose-invert">
                    {tool.description.split("\n\n").map((paragraph, i) => (
                      <p key={i} className="mb-4 leading-relaxed text-foreground">
                        {paragraph}
                      </p>
                    ))}
                  </CardContent>
                </Card>

                {tool.company && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Company Information</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-6 sm:grid-cols-2">
                        <div className="flex items-start gap-3">
                          <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                            <Building2 className="size-5 text-primary" />
                          </div>
                          <div>
                            <span className="text-sm text-muted-foreground">Company</span>
                            <p className="font-semibold">{tool.company.name}</p>
                          </div>
                        </div>

                        {tool.company.website_url && (
                          <div className="flex items-start gap-3">
                            <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                              <ExternalLink className="size-5 text-primary" />
                            </div>
                            <div>
                              <span className="text-sm text-muted-foreground">Website</span>
                              <p className="font-semibold">
                                <a
                                  href={tool.company.website_url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-primary hover:underline"
                                >
                                  {tool.company.website_url.replace(/^https?:\/\//, "")}
                                </a>
                              </p>
                            </div>
                          </div>
                        )}

                        {tool.company.team_size && (
                          <div className="flex items-start gap-3">
                            <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                              <Users className="size-5 text-primary" />
                            </div>
                            <div>
                              <span className="text-sm text-muted-foreground">Employees</span>
                              <p className="font-semibold">{tool.company.team_size}+</p>
                            </div>
                          </div>
                        )}

                        {tool.company.funding_round && (
                          <div className="flex items-start gap-3">
                            <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                              <DollarSign className="size-5 text-primary" />
                            </div>
                            <div>
                              <span className="text-sm text-muted-foreground">Funding Round</span>
                              <p className="font-semibold">{tool.company.funding_round}</p>
                              {tool.company.funding_amount && (
                                <p className="text-sm text-muted-foreground">
                                  ${(tool.company.funding_amount / 1000000000).toFixed(1)}B raised
                                </p>
                              )}
                            </div>
                          </div>
                        )}

                        {tool.company.founded_year && (
                          <div className="flex items-start gap-3">
                            <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                              <Calendar className="size-5 text-primary" />
                            </div>
                            <div>
                              <span className="text-sm text-muted-foreground">Founded In</span>
                              <p className="font-semibold">{tool.company.founded_year}</p>
                            </div>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>

              <TabsContent value="social" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Social Feeds</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Social feed integration coming soon. Check back later for updates from {tool.name}.
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="team" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Team</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">Team information will be displayed here once available.</p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <aside className="w-full shrink-0 lg:w-80">
            <div className="sticky top-24 space-y-6">
              {/* Trending Tools */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <TrendingUp className="size-5" />
                    Trending Tools
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {trendingTools.map((trendingTool) => (
                    <a
                      key={trendingTool.id}
                      href={`/tool/${trendingTool.slug}`}
                      className="group flex items-center gap-3 rounded-lg border border-border p-3 transition-colors hover:bg-muted"
                    >
                      <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-chart-1 to-chart-2 text-sm font-bold text-white">
                        {trendingTool.name.charAt(0)}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate font-medium group-hover:text-primary">{trendingTool.name}</p>
                        <p className="truncate text-xs text-muted-foreground">{trendingTool.tagline}</p>
                      </div>
                    </a>
                  ))}
                </CardContent>
              </Card>

              {/* Latest AI News */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Calendar className="size-5" />
                    Latest AI News
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {latestNews.map((news) => (
                    <a
                      key={news.id}
                      href={news.url}
                      className="group block rounded-lg border border-border p-3 transition-colors hover:bg-muted"
                    >
                      <p className="mb-1 font-medium leading-snug group-hover:text-primary">{news.title}</p>
                      <p className="text-xs text-muted-foreground">{news.date}</p>
                    </a>
                  ))}
                </CardContent>
              </Card>
            </div>
          </aside>
        </div>
      </div>
    </PublicLayout>
  )
}
