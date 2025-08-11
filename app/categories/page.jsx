"use client"

import { useState, useMemo } from "react"
import { useSearchParams } from "next/navigation"
import Header from "@/components/header"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Filter, Star, ArrowRight } from "lucide-react"
import Link from "next/link"
import { categories, tools } from "@/lib/data"

export default function CategoriesPage() {
  const searchParams = useSearchParams()
  const initialCategory = searchParams.get("category")

  const [searchQuery, setSearchQuery] = useState("")
  const [selectedType, setSelectedType] = useState("all")
  const [selectedCategories, setSelectedCategories] = useState(initialCategory ? [initialCategory] : [])
  const [selectedRating, setSelectedRating] = useState("any")
  const [selectedPricing, setSelectedPricing] = useState("any")

  // Filter tools based on selected filters
  const filteredTools = useMemo(() => {
    return tools.filter((tool) => {
      // Search query filter
      if (
        searchQuery &&
        !tool.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !tool.description.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !tool.category.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return false
      }

      // Type filter
      if (selectedType === "tools" && tool.type !== "Tool") return false
      if (selectedType === "agents" && tool.type !== "Agent") return false

      // Category filter
      if (selectedCategories.length > 0) {
        const categoryMatch = selectedCategories.some((catId) => {
          const category = categories.find((c) => c.id === catId)
          return category && tool.category === category.name
        })
        if (!categoryMatch) return false
      }

      // Rating filter
      if (selectedRating !== "any") {
        const minRating = Number.parseFloat(selectedRating)
        if (tool.rating < minRating) return false
      }

      // Pricing filter
      if (selectedPricing !== "any") {
        if (selectedPricing === "free" && !tool.pricing.startingPrice.toLowerCase().includes("free")) return false
        if (selectedPricing === "paid" && tool.pricing.startingPrice.toLowerCase().includes("free")) return false
      }

      return true
    })
  }, [searchQuery, selectedType, selectedCategories, selectedRating, selectedPricing])

  const handleCategoryChange = (categoryId, checked) => {
    if (checked) {
      setSelectedCategories([...selectedCategories, categoryId])
    } else {
      setSelectedCategories(selectedCategories.filter((id) => id !== categoryId))
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Categories</h1>
          <p className="text-gray-600">Explore AI tools and agents by category</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <div className="lg:w-80 space-y-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Filter className="w-5 h-5" />
                  <h3 className="font-semibold">Filters</h3>
                </div>

                {/* Type Filter */}
                <div className="mb-6">
                  <h4 className="font-medium mb-3">Type</h4>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="all"
                        checked={selectedType === "all"}
                        onCheckedChange={() => setSelectedType("all")}
                      />
                      <label htmlFor="all" className="text-sm">
                        All
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="tools"
                        checked={selectedType === "tools"}
                        onCheckedChange={() => setSelectedType("tools")}
                      />
                      <label htmlFor="tools" className="text-sm">
                        Tools Only
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="agents"
                        checked={selectedType === "agents"}
                        onCheckedChange={() => setSelectedType("agents")}
                      />
                      <label htmlFor="agents" className="text-sm">
                        Agents Only
                      </label>
                    </div>
                  </div>
                </div>

                {/* Categories Filter */}
                <div className="mb-6">
                  <h4 className="font-medium mb-3">Categories</h4>
                  <div className="space-y-2 max-h-64 overflow-y-auto">
                    {categories.map((category) => (
                      <div key={category.id} className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id={category.id}
                            checked={selectedCategories.includes(category.id)}
                            onCheckedChange={(checked) => handleCategoryChange(category.id, checked)}
                          />
                          <label htmlFor={category.id} className="text-sm">
                            {category.name}
                          </label>
                        </div>
                        <span className="text-xs text-gray-500">({category.count})</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Rating Filter */}
                <div className="mb-6">
                  <h4 className="font-medium mb-3">Rating</h4>
                  <Select value={selectedRating} onValueChange={setSelectedRating}>
                    <SelectTrigger>
                      <SelectValue placeholder="Any Rating" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="any">Any Rating</SelectItem>
                      <SelectItem value="4.5">4.5+ Stars</SelectItem>
                      <SelectItem value="4.0">4.0+ Stars</SelectItem>
                      <SelectItem value="3.5">3.5+ Stars</SelectItem>
                      <SelectItem value="3.0">3.0+ Stars</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Pricing Filter */}
                <div className="mb-6">
                  <h4 className="font-medium mb-3">Pricing</h4>
                  <Select value={selectedPricing} onValueChange={setSelectedPricing}>
                    <SelectTrigger>
                      <SelectValue placeholder="Any Pricing" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="any">Any Pricing</SelectItem>
                      <SelectItem value="free">Free</SelectItem>
                      <SelectItem value="paid">Paid</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Search Bar */}
            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  placeholder="Search categories..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* All Categories Grid */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">All Categories</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {categories.map((category) => (
                  <Link key={category.id} href={`/categories?category=${category.id}`}>
                    <Card className="hover:shadow-md transition-shadow cursor-pointer">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-2xl">
                              {category.icon}
                            </div>
                            <div>
                              <h3 className="font-semibold text-lg text-gray-900">{category.name}</h3>
                              <p className="text-sm text-gray-500">{category.count} tools</p>
                              <div className="flex flex-wrap gap-1 mt-2">
                                {category.subcategories.slice(0, 2).map((sub) => (
                                  <Badge key={sub} variant="secondary" className="text-xs">
                                    {sub}
                                  </Badge>
                                ))}
                                {category.subcategories.length > 2 && (
                                  <Badge variant="secondary" className="text-xs">
                                    +{category.subcategories.length - 2} more
                                  </Badge>
                                )}
                              </div>
                            </div>
                          </div>
                          <ArrowRight className="w-5 h-5 text-gray-400" />
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>

            {/* Featured Tools & Agents */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Tools & Agents</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {filteredTools.slice(0, 4).map((tool) => (
                  <Card key={tool.id} className="hover:shadow-lg transition-shadow overflow-hidden">
                    <div className="aspect-video bg-gradient-to-br from-purple-900 via-blue-900 to-purple-800 rounded-t-lg relative overflow-hidden">
                      <img
                        src="/futuristic-ai-interface.png"
                        alt={tool.name}
                        className="w-full h-full object-cover opacity-80"
                      />
                      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/50 via-blue-900/50 to-purple-800/50"></div>
                      <div className="absolute top-3 left-3 flex gap-2">
                        <Badge className="bg-black text-white text-xs px-2 py-1">{tool.badge}</Badge>
                        <Badge variant="default" className="bg-blue-600 text-white text-xs px-2 py-1">
                          {tool.type}
                        </Badge>
                      </div>
                      <div className="absolute bottom-3 left-3 right-3">
                        <div className="flex items-center gap-2 text-white">
                          <div className="w-6 h-6 bg-white/20 rounded flex items-center justify-center text-xs">AI</div>
                          <span className="text-sm font-medium">{tool.name}</span>
                        </div>
                      </div>
                    </div>
                    <CardContent className="p-6">
                      <h3 className="font-semibold text-lg mb-2 line-clamp-2">{tool.name}</h3>
                      <p className="text-sm text-gray-600 mb-3">
                        {tool.category} • {tool.subcategory}
                      </p>
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="font-medium">{tool.rating}</span>
                          <span className="text-sm text-gray-500">({tool.reviews})</span>
                        </div>
                        <div className="text-sm text-gray-600">{tool.pricing.startingPrice}</div>
                      </div>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {tool.tags.slice(0, 2).map((tag, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            #{tag}
                          </Badge>
                        ))}
                      </div>
                      <Link href={`/tool/${tool.id}`}>
                        <Button size="sm" className="w-full">
                          View Tool
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {filteredTools.length > 4 && (
                <div className="text-center mt-8">
                  <Button variant="outline" size="lg">
                    Load More Tools
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
