import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Category } from "@/lib/types"
import { getCategoryIcon } from "@/lib/category-icons"
import { cn } from "@/lib/utils"

interface CategoryCardProps {
  category: Category
  className?: string
}

export function CategoryCard({ category, className }: CategoryCardProps) {
  const Icon = getCategoryIcon(category.slug)

  return (
    <Link href={`/explore?category=${category.slug}`}>
      <Card className={cn("group h-full transition-all hover:shadow-lg hover:border-primary/50", className)}>
        <CardHeader className="pb-3">
          <div className="mb-2 flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <Icon className="size-5" />
          </div>
          <div className="flex items-start justify-between gap-2">
            <CardTitle className="text-base leading-snug">{category.name}</CardTitle>
            <ArrowRight className="size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1" />
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          {category.description && (
            <p className="mb-2 text-xs text-muted-foreground line-clamp-2">{category.description}</p>
          )}
          {category.count !== undefined && (
            <Badge variant="secondary" className="text-xs">
              {category.count} {category.count === 1 ? "tool" : "tools"}
            </Badge>
          )}
        </CardContent>
      </Card>
    </Link>
  )
}
