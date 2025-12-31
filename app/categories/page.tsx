import { PublicLayout } from "@/components/layout/public-layout"
import { CategoryCard } from "@/components/categories/category-card"
import type { Category } from "@/lib/types"

// Mock data
const categories: Category[] = [
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
  {
    id: "7",
    slug: "video-generation",
    name: "Video Generation",
    description: "Create and edit videos using AI technology",
    count: 18,
  },
  {
    id: "8",
    slug: "audio-generation",
    name: "Audio & Voice",
    description: "AI-powered audio processing, music, and voice synthesis",
    count: 22,
  },
]

export default function CategoriesPage() {
  return (
    <PublicLayout>
      <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold tracking-tight">Browse by Category</h1>
          <p className="text-lg text-muted-foreground">Explore AI tools organized by use case and functionality</p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </div>
    </PublicLayout>
  )
}
