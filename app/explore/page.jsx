"use client"

import { useState, useEffect, useMemo } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import Header from "@/components/header"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Filter, Search } from "lucide-react"
// categories and tags are now fetched from Supabase
import FeaturedProducts from "@/components/featured-products"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { supabase } from "@/lib/supabase"

export default function ExplorePage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const initialCategory = searchParams.get("category")

  const [selectedCategories, setSelectedCategories] = useState(initialCategory ? [initialCategory] : [])
  const [selectedTags, setSelectedTags] = useState([])
  const [availableTags, setAvailableTags] = useState([])
  const [availableCategories, setAvailableCategories] = useState([])
  const [categoryCounts, setCategoryCounts] = useState({})
  const [searchQuery, setSearchQuery] = useState(searchParams.get("search") || "")

  const handleCategoryChange = (categoryId, checked) => {
    if (checked) {
      setSelectedCategories([...selectedCategories, categoryId])
    } else {
      setSelectedCategories(selectedCategories.filter((id) => id !== categoryId))
    }
  }

  const handleTagChange = (tag, checked) => {
    if (checked) {
      setSelectedTags([...selectedTags, tag])
    } else {
      setSelectedTags(selectedTags.filter((t) => t !== tag))
    }
  }

  const removeAllFilters = () => {
    setSelectedCategories([])
    setSelectedTags([])
    setSearchQuery("")
  }

  const handleSearch = () => {
    if (searchQuery.trim()) {
      const params = new URLSearchParams()
      if (searchQuery.trim()) params.set('search', searchQuery.trim())
      if (selectedCategories.length > 0) params.set('categories', selectedCategories.join(','))
      if (selectedTags.length > 0) params.set('tags', selectedTags.join(','))
      
      const queryString = params.toString()
      const newUrl = queryString ? `/explore?${queryString}` : '/explore'
      router.push(newUrl)
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  // Fetch categories and tags from Supabase
  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const [categoriesRes, productCategoriesRes, tagsRes] = await Promise.all([
          supabase.from('categories').select('id, name, slug').order('name', { ascending: true }),
          supabase.from('product_categories').select('category_id'),
          supabase.from('tags').select('name').order('name', { ascending: true })
        ])

        if (!categoriesRes.error && categoriesRes.data) {
          setAvailableCategories(categoriesRes.data)
        } else {
          console.error('Error fetching categories:', categoriesRes.error)
        }

        if (!productCategoriesRes.error && productCategoriesRes.data) {
          const counts = {}
          productCategoriesRes.data.forEach((row) => {
            counts[row.category_id] = (counts[row.category_id] || 0) + 1
          })
          setCategoryCounts(counts)
        } else {
          console.error('Error fetching product_categories:', productCategoriesRes.error)
        }

        if (!tagsRes.error && tagsRes.data) {
          setAvailableTags(tagsRes.data.map(t => t.name))
        } else {
          console.error('Error fetching tags:', tagsRes.error)
        }
      } catch (error) {
        console.error('Error fetching filters:', error)
      }
    }

    fetchFilters()
  }, [])

  // Memoized sorted lists to keep selected items at the top
  const sortedCategories = useMemo(() => {
    const originalIndex = new Map(availableCategories.map((c, i) => [c.id, i]))
    const bySelectedThenOriginal = (a, b) => {
      const aSel = selectedCategories.includes(a.slug)
      const bSel = selectedCategories.includes(b.slug)
      if (aSel !== bSel) return aSel ? -1 : 1
      return (originalIndex.get(a.id) ?? 0) - (originalIndex.get(b.id) ?? 0)
    }
    return [...availableCategories].sort(bySelectedThenOriginal)
  }, [availableCategories, selectedCategories])

  const sortedTags = useMemo(() => {
    const originalIndex = new Map(availableTags.map((t, i) => [t, i]))
    const bySelectedThenOriginal = (a, b) => {
      const aSel = selectedTags.includes(a)
      const bSel = selectedTags.includes(b)
      if (aSel !== bSel) return aSel ? -1 : 1
      return (originalIndex.get(a) ?? 0) - (originalIndex.get(b) ?? 0)
    }
    return [...availableTags].sort(bySelectedThenOriginal)
  }, [availableTags, selectedTags])

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Explore</h1>
          <p className="text-gray-600">Discover AI tools and agents by category</p>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="flex gap-3 max-w-2xl">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Search for AI tools, agents, or categories..."
                className="pl-12 py-3 text-base border-2 border-gray-200 rounded-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={handleKeyPress}
              />
            </div>
            <Button 
              className="rounded-full px-6 py-3"
              onClick={handleSearch}
            >
              Search
            </Button>
          </div>
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
                    {sortedCategories.map((category) => (
                      <div key={category.id} className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id={category.slug}
                            checked={selectedCategories.includes(category.slug)}
                            onCheckedChange={(checked) => handleCategoryChange(category.slug, checked)}
                          />
                          <label htmlFor={category.slug} className="text-sm">
                            {category.name}
                          </label>
                        </div>
                        <span className="text-xs text-gray-500">({categoryCounts[category.id] || 0})</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tags Filter */}
                <div className="mb-6">
                  <h4 className="font-medium mb-3">Tags</h4>
                  <div className="space-y-2 max-h-64 overflow-y-auto">
                    {sortedTags.map((tag) => (
                      <div key={tag} className="flex items-center space-x-2">
                        <Checkbox
                          id={`tag-${tag}`}
                          checked={selectedTags.includes(tag)}
                          onCheckedChange={(checked) => handleTagChange(tag, checked)}
                        />
                        <label htmlFor={`tag-${tag}`} className="text-sm">
                          #{tag}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Remove Filters Button */}
                {(selectedCategories.length > 0 || selectedTags.length > 0) && (
                  <div className="pt-4 border-t border-gray-200">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={removeAllFilters}
                      className="w-full"
                    >
                      Remove All Filters
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* All Tools & Agents */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">All Tools & Agents</h2>
                {(selectedCategories.length > 0 || selectedTags.length > 0 || searchQuery.trim()) && (
                  <div className="text-sm text-gray-600">
                    Filters applied: {searchQuery.trim() ? '1 search' : '0 searches'}, {selectedCategories.length} categories, {selectedTags.length} tags
                  </div>
                )}
              </div>
              <FeaturedProducts 
                gridCols={2} 
                showRating={false} 
                showAll={true} 
                selectedCategories={selectedCategories}
                selectedTags={selectedTags}
                searchQuery={searchQuery}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
