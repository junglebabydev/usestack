"use client"

import { useState } from "react"
import { X, SlidersHorizontal } from "lucide-react"
import { PublicLayout } from "@/components/layout/public-layout"
import { SearchBar } from "@/components/ui/search-bar"
import { ToolCard } from "@/components/tools/tool-card"
import { ToolCardSkeleton } from "@/components/tools/tool-card-skeleton"
import { EmptyState } from "@/components/ui/empty-state"
import { TagChip } from "@/components/ui/tag-chip"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import type { Tool, Category, Tag } from "@/lib/types"

// Mock data
const allTools: Tool[] = [
  {
    id: "1",
    slug: "chatgpt",
    name: "ChatGPT",
    tagline: "Conversational AI that understands context and generates human-like responses",
    description: "Advanced language model",
    website_url: "https://chat.openai.com",
    is_verified: true,
    tags: [{ id: "1", slug: "nlp", name: "NLP" }],
    categories: [{ id: "1", slug: "text-generation", name: "Text Generation" }],
    subcategories: [],
    created_at: "2024-01-01",
    updated_at: "2024-01-01",
  },
]

const categories: Category[] = [
  { id: "1", slug: "text-generation", name: "Text Generation", count: 42 },
  { id: "2", slug: "image-generation", name: "Image Generation", count: 38 },
  { id: "3", slug: "developer-tools", name: "Developer Tools", count: 35 },
  { id: "4", slug: "marketing", name: "Marketing", count: 29 },
]

const tags: Tag[] = [
  { id: "1", slug: "nlp", name: "NLP" },
  { id: "2", slug: "chatbot", name: "Chatbot" },
  { id: "3", slug: "image-gen", name: "Image Gen" },
  { id: "4", slug: "coding", name: "Coding" },
]

export default function ExplorePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const filteredTools = allTools // In production, filter based on state

  const toggleCategory = (categoryId: string) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId) ? prev.filter((id) => id !== categoryId) : [...prev, categoryId],
    )
  }

  const toggleTag = (tagId: string) => {
    setSelectedTags((prev) => (prev.includes(tagId) ? prev.filter((id) => id !== tagId) : [...prev, tagId]))
  }

  const clearFilters = () => {
    setSelectedCategories([])
    setSelectedTags([])
    setSearchQuery("")
  }

  const hasFilters = selectedCategories.length > 0 || selectedTags.length > 0 || searchQuery

  const FilterSidebar = () => (
    <div className="space-y-6">
      <div>
        <h3 className="mb-4 text-sm font-semibold">Categories</h3>
        <div className="space-y-3">
          {categories.map((category) => (
            <div key={category.id} className="flex items-center gap-2">
              <Checkbox
                id={`category-${category.id}`}
                checked={selectedCategories.includes(category.id)}
                onCheckedChange={() => toggleCategory(category.id)}
              />
              <Label
                htmlFor={`category-${category.id}`}
                className="flex flex-1 items-center justify-between text-sm font-normal cursor-pointer"
              >
                <span>{category.name}</span>
                <span className="text-muted-foreground">({category.count})</span>
              </Label>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-border pt-6">
        <h3 className="mb-4 text-sm font-semibold">Tags</h3>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <TagChip
              key={tag.id}
              variant={selectedTags.includes(tag.id) ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => toggleTag(tag.id)}
            >
              {tag.name}
            </TagChip>
          ))}
        </div>
      </div>
    </div>
  )

  return (
    <PublicLayout>
      <div className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="mb-4 text-4xl font-bold tracking-tight">Explore AI Tools</h1>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="flex-1">
              <SearchBar
                placeholder="Search tools..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onSearch={setSearchQuery}
              />
            </div>
            {/* Mobile Filter Button */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="lg:hidden bg-transparent">
                  <SlidersHorizontal className="mr-2 size-4" />
                  Filters
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px]">
                <SheetHeader className="mb-6">
                  <SheetTitle>Filters</SheetTitle>
                </SheetHeader>
                <FilterSidebar />
              </SheetContent>
            </Sheet>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Desktop Sidebar */}
          <aside className="hidden w-64 shrink-0 lg:block">
            <div className="sticky top-24">
              <FilterSidebar />
            </div>
          </aside>

          {/* Main Content */}
          <div className="min-w-0 flex-1">
            {/* Active Filters */}
            {hasFilters && (
              <div className="mb-6 flex flex-wrap items-center gap-2">
                <span className="text-sm text-muted-foreground">Active filters:</span>
                {selectedCategories.map((catId) => {
                  const category = categories.find((c) => c.id === catId)
                  return category ? (
                    <TagChip key={catId} onRemove={() => toggleCategory(catId)}>
                      {category.name}
                    </TagChip>
                  ) : null
                })}
                {selectedTags.map((tagId) => {
                  const tag = tags.find((t) => t.id === tagId)
                  return tag ? (
                    <TagChip key={tagId} onRemove={() => toggleTag(tagId)}>
                      {tag.name}
                    </TagChip>
                  ) : null
                })}
                <Button variant="ghost" size="sm" onClick={clearFilters}>
                  Clear all <X className="ml-1 size-3" />
                </Button>
              </div>
            )}

            {/* Results Count */}
            <div className="mb-6">
              <p className="text-sm text-muted-foreground">
                Showing {filteredTools.length} {filteredTools.length === 1 ? "tool" : "tools"}
              </p>
            </div>

            {/* Tools Grid */}
            {isLoading ? (
              <div className="grid gap-6 sm:grid-cols-2">
                {Array.from({ length: 6 }).map((_, i) => (
                  <ToolCardSkeleton key={i} />
                ))}
              </div>
            ) : filteredTools.length > 0 ? (
              <div className="grid gap-6 sm:grid-cols-2">
                {filteredTools.map((tool) => (
                  <ToolCard key={tool.id} tool={tool} />
                ))}
              </div>
            ) : (
              <EmptyState
                title="No tools found"
                description="Try adjusting your filters or search query"
                action={{
                  label: "Clear filters",
                  onClick: clearFilters,
                }}
              />
            )}
          </div>
        </div>
      </div>
    </PublicLayout>
  )
}
