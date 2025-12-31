import Link from "next/link"
import { Star } from "lucide-react"
import { PublicLayout } from "@/components/layout/public-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { Stack } from "@/lib/types"

const stacks: Stack[] = [
  {
    id: "1",
    slug: "content-creator-essentials",
    name: "Content Creator Essentials",
    description: "The ultimate AI toolkit for content creators, writers, and marketers",
    color: "#3B82F6",
    tools: [],
    created_at: "2024-01-01",
    updated_at: "2024-01-01",
  },
  {
    id: "2",
    slug: "developer-productivity",
    name: "Developer Productivity Stack",
    description: "Essential AI tools to supercharge your development workflow",
    color: "#8B5CF6",
    tools: [],
    created_at: "2024-01-01",
    updated_at: "2024-01-01",
  },
]

const stackToolIcons: Record<string, string[]> = {
  "content-creator-essentials": [
    "/chatgpt-logo-inspired.png",
    "/generic-abstract-logo.png",
    "/chatgpt-logo-inspired.png",
    "/generic-abstract-logo.png",
  ],
  "developer-productivity": [
    "/github-copilot-logo.png",
    "/chatgpt-logo-inspired.png",
    "/generic-abstract-logo.png",
    "/github-copilot-logo.png",
  ],
}

export default function StacksPage() {
  return (
    <PublicLayout>
      <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold tracking-tight">AI Tool Stacks</h1>
          <p className="text-lg text-muted-foreground">Curated collections of AI tools for specific workflows</p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {stacks.map((stack) => (
            <Link key={stack.id} href={`/stack/${stack.slug}`}>
              <Card className="group h-full transition-all hover:shadow-lg hover:border-primary/50">
                <div
                  className="relative h-24 w-full rounded-t-lg"
                  style={{
                    background: `linear-gradient(135deg, ${stack.color}20 0%, ${stack.color}40 100%)`,
                  }}
                >
                  <div className="flex h-full items-center justify-center gap-2 px-4">
                    {stackToolIcons[stack.slug]?.slice(0, 4).map((icon, index) => (
                      <div
                        key={index}
                        className="flex size-10 items-center justify-center overflow-hidden rounded-lg border-2 border-white bg-white shadow-sm transition-transform group-hover:scale-110"
                      >
                        <img src={icon || "/placeholder.svg"} alt="" className="size-8 object-contain" />
                      </div>
                    ))}
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="group-hover:text-primary">{stack.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-4 text-sm text-muted-foreground line-clamp-2">{stack.description}</p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Star className="size-3" />
                    <span>1.2k saves</span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </PublicLayout>
  )
}
