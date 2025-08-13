"use client"

import { useState } from "react"
import { useSearchParams } from "next/navigation"
import Header from "@/components/header"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Filter, ArrowRight } from "lucide-react"
import Link from "next/link"
import { categories } from "@/lib/data"
import FeaturedProducts from "@/components/featured-products"

export default function CategoriesPage() {
  const searchParams = useSearchParams()
  const initialCategory = searchParams.get("category")

  const [selectedCategories, setSelectedCategories] = useState(initialCategory ? [initialCategory] : [])



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
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="flex-1">


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

            {/* All Tools & Agents */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">All Tools & Agents</h2>
              <FeaturedProducts />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
