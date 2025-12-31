"use client"

import { useState } from "react"
import { Plus, Search, Filter, MoreVertical, ExternalLink, Edit, Trash2, Wrench } from "lucide-react"
import { AdminLayout } from "@/components/layout/admin-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { EmptyState } from "@/components/ui/empty-state"
import Link from "next/link"
import type { Tool } from "@/lib/types"

// Mock data
const tools: Tool[] = [
  {
    id: "1",
    slug: "chatgpt",
    name: "ChatGPT",
    tagline: "Conversational AI assistant",
    description: "",
    website_url: "https://chat.openai.com",
    is_verified: true,
    tags: [],
    categories: [{ id: "1", slug: "text", name: "Text Generation" }],
    subcategories: [],
    company: { id: "1", slug: "openai", name: "OpenAI", verified: true },
    created_at: "2024-01-01",
    updated_at: "2024-01-15",
  },
]

export default function AdminToolsPage() {
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Tools</h1>
            <p className="text-muted-foreground">Manage your AI tool directory</p>
          </div>
          <Button asChild>
            <Link href="/admin/tools/new">
              <Plus className="mr-2 size-4" />
              Add Tool
            </Link>
          </Button>
        </div>

        {/* Filters */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex flex-col gap-4 sm:flex-row">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search tools..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
              <Button variant="outline">
                <Filter className="mr-2 size-4" />
                Filters
              </Button>
            </div>
          </CardHeader>
        </Card>

        {/* Tools Table */}
        <Card>
          <CardContent className="p-0">
            {tools.length === 0 ? (
              <EmptyState
                icon={<Wrench className="size-12" />}
                title="No tools yet"
                description="Get started by adding your first AI tool"
                action={{
                  label: "Add Tool",
                  onClick: () => (window.location.href = "/admin/tools/new"),
                }}
              />
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Tool</TableHead>
                    <TableHead>Company</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Updated</TableHead>
                    <TableHead className="w-[50px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tools.map((tool) => (
                    <TableRow key={tool.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="flex size-10 items-center justify-center rounded-lg bg-gradient-to-br from-chart-1 to-chart-2 text-sm font-bold text-white">
                            {tool.name.charAt(0)}
                          </div>
                          <div>
                            <p className="font-medium">{tool.name}</p>
                            <p className="text-sm text-muted-foreground line-clamp-1">{tool.tagline}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        {tool.company ? (
                          <span className="text-sm">{tool.company.name}</span>
                        ) : (
                          <span className="text-sm text-muted-foreground">—</span>
                        )}
                      </TableCell>
                      <TableCell>
                        {tool.categories[0] && <Badge variant="secondary">{tool.categories[0].name}</Badge>}
                      </TableCell>
                      <TableCell>
                        {tool.is_verified ? (
                          <Badge variant="success">Verified</Badge>
                        ) : (
                          <Badge variant="secondary">Unverified</Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        <span className="text-sm text-muted-foreground">
                          {new Date(tool.updated_at).toLocaleDateString()}
                        </span>
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreVertical className="size-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem asChild>
                              <Link href={`/tool/${tool.slug}`}>
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
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}
