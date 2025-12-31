"use client"

import { useState } from "react"
import { Plus, Search, MoreVertical, Edit, Trash2, ExternalLink } from "lucide-react"
import { AdminLayout } from "@/components/layout/admin-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link"
import type { Stack } from "@/lib/types"

// Mock data
const stacks: Stack[] = [
  {
    id: "1",
    slug: "content-creator-essentials",
    name: "Content Creator Essentials",
    description: "The ultimate AI toolkit for content creators, writers, and marketers",
    color: "#3B82F6",
    tools: [],
    created_at: "2024-01-01",
    updated_at: "2024-01-15",
  },
  {
    id: "2",
    slug: "developer-productivity",
    name: "Developer Productivity Stack",
    description: "Essential AI tools to supercharge your development workflow",
    color: "#8B5CF6",
    tools: [],
    created_at: "2024-01-02",
    updated_at: "2024-01-14",
  },
]

export default function AdminStacksPage() {
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Stacks</h1>
            <p className="text-muted-foreground">Manage curated tool collections</p>
          </div>
          <Button asChild>
            <Link href="/admin/stacks/new">
              <Plus className="mr-2 size-4" />
              Create Stack
            </Link>
          </Button>
        </div>

        {/* Search */}
        <Card>
          <CardHeader className="pb-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search stacks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
          </CardHeader>
        </Card>

        {/* Stacks Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {stacks.map((stack) => (
            <Card key={stack.id} className="overflow-hidden">
              <div
                className="h-24"
                style={{
                  background: `linear-gradient(135deg, ${stack.color}20 0%, ${stack.color}40 100%)`,
                }}
              />
              <CardContent className="p-6">
                <div className="mb-4">
                  <h3 className="mb-2 text-lg font-semibold">{stack.name}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">{stack.description}</p>
                </div>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>{stack.tools?.length || 0} tools</span>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="size-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem asChild>
                        <Link href={`/stack/${stack.slug}`}>
                          <ExternalLink className="mr-2 size-4" />
                          View Public Page
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Edit className="mr-2 size-4" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-destructive">
                        <Trash2 className="mr-2 size-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </AdminLayout>
  )
}
