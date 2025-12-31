"use client"

import type * as React from "react"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"

interface TagChipProps {
  children: React.ReactNode
  onRemove?: () => void
  variant?: "default" | "secondary" | "outline"
  className?: string
}

export function TagChip({ children, onRemove, variant = "secondary", className }: TagChipProps) {
  return (
    <Badge variant={variant} className={cn("gap-1", className)}>
      {children}
      {onRemove && (
        <button onClick={onRemove} className="ml-1 rounded-full hover:bg-muted-foreground/20" aria-label="Remove tag">
          <X className="size-3" />
        </button>
      )}
    </Badge>
  )
}
