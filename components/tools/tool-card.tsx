import Link from "next/link"
import { ExternalLink, CheckCircle2 } from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { Tool } from "@/lib/types"
import { cn } from "@/lib/utils"

interface ToolCardProps {
  tool: Tool
  className?: string
}

export function ToolCard({ tool, className }: ToolCardProps) {
  return (
    <Card className={cn("group flex h-full flex-col transition-shadow hover:shadow-lg", className)}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            {tool.logo_url ? (
              <img
                src={tool.logo_url || "/placeholder.svg"}
                alt={`${tool.name} logo`}
                className="size-12 rounded-lg object-cover"
              />
            ) : (
              <div className="flex size-12 items-center justify-center rounded-lg bg-gradient-to-br from-chart-1 to-chart-2 text-lg font-bold text-white">
                {tool.name.charAt(0)}
              </div>
            )}
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <Link href={`/tool/${tool.slug}`} className="font-semibold hover:underline">
                  {tool.name}
                </Link>
                {tool.is_verified && <CheckCircle2 className="size-4 text-chart-1" aria-label="Verified" />}
              </div>
              {tool.company && <p className="text-xs text-muted-foreground">{tool.company.name}</p>}
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex-1 pb-3">
        <p className="line-clamp-2 text-sm text-muted-foreground">{tool.tagline}</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {tool.categories.slice(0, 2).map((category) => (
            <Badge key={category.id} variant="secondary" className="text-xs">
              {category.name}
            </Badge>
          ))}
        </div>
        {tool.tags.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1">
            {tool.tags.slice(0, 3).map((tag) => (
              <Badge key={tag.id} variant="outline" className="text-xs">
                {tag.name}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>

      <CardFooter className="flex gap-2 pt-3">
        <Button asChild variant="outline" size="sm" className="flex-1 bg-transparent">
          <Link href={`/tool/${tool.slug}`}>Learn More</Link>
        </Button>
        <Button asChild size="sm" className="flex-1">
          <a href={tool.website_url} target="_blank" rel="noopener noreferrer">
            Visit <ExternalLink className="ml-1 size-3" />
          </a>
        </Button>
      </CardFooter>
    </Card>
  )
}
