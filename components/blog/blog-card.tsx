import Link from "next/link"
import { Calendar, Clock, ArrowRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import type { BlogPost } from "@/lib/types/blog"

interface BlogCardProps {
  post: BlogPost
}

export function BlogCard({ post }: BlogCardProps) {
  const publishedDate = post.published_at
    ? new Date(post.published_at).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : null

  return (
    <Link href={`/blog/${post.slug}`} className="group block">
      <Card className="overflow-hidden border-border bg-card transition-all hover:border-primary/50 hover:shadow-lg">
        {/* Thumbnail */}
        <div className="relative aspect-[16/9] w-full overflow-hidden bg-muted">
          {post.thumbnail_url ? (
            <img
              src={post.thumbnail_url || "/placeholder.svg"}
              alt={post.title}
              className="size-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="flex size-full items-center justify-center bg-gradient-to-br from-primary/20 to-accent/20">
              <span className="text-6xl font-bold text-primary/30">{post.title[0]}</span>
            </div>
          )}
          {/* Category Badge */}
          {post.category && (
            <div className="absolute right-3 top-3">
              <span className="rounded-full bg-background/90 px-3 py-1 text-xs font-medium backdrop-blur-sm">
                {post.category}
              </span>
            </div>
          )}
        </div>

        <CardContent className="p-6">
          {/* Meta Info */}
          <div className="mb-3 flex items-center gap-4 text-xs text-muted-foreground">
            {publishedDate && (
              <div className="flex items-center gap-1.5">
                <Calendar className="size-3.5" />
                <span>{publishedDate}</span>
              </div>
            )}
            {post.reading_time_minutes && (
              <div className="flex items-center gap-1.5">
                <Clock className="size-3.5" />
                <span>{post.reading_time_minutes} min read</span>
              </div>
            )}
          </div>

          {/* Title */}
          <h3 className="mb-2 text-xl font-semibold leading-tight transition-colors group-hover:text-primary line-clamp-2">
            {post.title}
          </h3>

          {/* Summary */}
          <p className="mb-4 text-sm text-muted-foreground line-clamp-3">{post.summary}</p>

          {/* Author */}
          {post.author && (
            <div className="flex items-center gap-3">
              {post.author.avatar_url ? (
                <img
                  src={post.author.avatar_url || "/placeholder.svg"}
                  alt={post.author.name}
                  className="size-8 rounded-full object-cover"
                />
              ) : (
                <div className="flex size-8 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                  {post.author.name[0]}
                </div>
              )}
              <div className="flex-1">
                <p className="text-sm font-medium">{post.author.name}</p>
              </div>
              <ArrowRight className="size-4 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
            </div>
          )}
        </CardContent>
      </Card>
    </Link>
  )
}
