"use client"


// sample data
import Header from "@/components/header"
import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search, ArrowRight } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
// import { aiStacks } from "@/lib/data" // replaced by live stacks from DB
import FeaturedProducts from "@/components/featured-products"
import { supabase } from "@/lib/supabase"

export default function HomePage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [dbCategories, setDbCategories] = useState([])
  const [showAllCategories, setShowAllCategories] = useState(false)
  const [categoryCounts, setCategoryCounts] = useState({})
  const [stacks, setStacks] = useState([])

  const browseCategoriesData = dbCategories.slice(0, 10)
  const topCategories = [...dbCategories]
    .sort((a, b) => (categoryCounts[b.id] || 0) - (categoryCounts[a.id] || 0))
    .slice(0, 5)

  useEffect(() => {
    const fetchData = async () => {
      const [categoriesRes, productCategoriesRes] = await Promise.all([
        supabase
          .from('categories')
          .select('id, name, slug')
          .order('name', { ascending: true }),
        supabase
          .from('product_categories')
          .select('category_id')
      ])

      if (!categoriesRes.error && categoriesRes.data) {
        setDbCategories(categoriesRes.data)
      } else {
        console.error('Error fetching categories:', categoriesRes.error)
      }

      if (!productCategoriesRes.error && productCategoriesRes.data) {
        const counts = {}
        productCategoriesRes.data.forEach((row) => {
          const id = row.category_id
          counts[id] = (counts[id] || 0) + 1
        })
        setCategoryCounts(counts)
      } else {
        console.error('Error fetching product_categories:', productCategoriesRes.error)
      }
    }

    fetchData()
  }, [])

  // Fetch stacks and their products for the Recommended AI Stacks section
  useEffect(() => {
    const fetchStacks = async () => {
      const { data, error } = await supabase
        .from('stacks')
        .select(`
          id, name, slug, description,
          product_stacks:product_stacks(
            sort_order,
            product:products(
              id, name, slug,
              product_categories:product_categories(
                category:categories(name)
              )
            )
          )
        `)
        .order('created_at', { ascending: false })
        .order('sort_order', { foreignTable: 'product_stacks', ascending: true })
        .limit(3)

      if (!error && data) {
        setStacks(data)
      } else {
        console.error('Error fetching stacks:', error)
      }
    }

    fetchStacks()
  }, [])

  const handleSearch = () => {
    if (searchQuery.trim()) {
      router.push(`/explore?search=${encodeURIComponent(searchQuery.trim())}`)
    } else {
      router.push('/explore')
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl md:text-5xl mb-4">
            Discover the Best AI Tools & Agents
          </h1>
          <p className="max-w-3xl mx-auto text-base text-gray-600 mb-6">
            Find, compare, and choose from thousands of AI-powered tools and agents to supercharge your workflow and
            boost productivity.
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-6">
            <div className="flex gap-3">
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

          {/* Popular Categories */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            <span className="text-gray-600 mr-2">Popular categories:</span>
            {topCategories.map((category) => (
              <Badge
                key={category.id}
                variant="secondary"
                className="cursor-pointer hover:bg-gray-200"
                onClick={() => router.push(`/explore?category=${category.slug || category.id}`)}
              >
                {category.name}
              </Badge>
            ))}
          </div>
        </div>
      </section>



      {/* Browse by Category */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Browse by Category</h2>
            <p className="text-lg text-gray-600">Explore AI tools organized by functionality and use case</p>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8">
            {(showAllCategories ? dbCategories : browseCategoriesData).map((category) => (
              <Link key={category.id} href={`/explore?category=${category.slug || category.id}`}>
                <Card className="hover:shadow-md transition-shadow cursor-pointer h-full">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div>
                          <h3 className="font-semibold text-lg text-gray-900">{category.name}</h3>
                          <p className="text-sm text-gray-500">{categoryCounts[category.id] || 0} tools available</p>
                        </div>
                      </div>
                      <ArrowRight className="w-5 h-5 text-gray-400" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          <div className="text-center">
            {dbCategories.length > 10 && (
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => setShowAllCategories(prev => !prev)}
              >
                {showAllCategories ? 'View less' : 'View more'}
              </Button>
            )}
          </div>
        </div>
      </section>

      {/* Recommended AI Stacks */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Recommended AI Stacks</h2>
            <p className="text-lg text-gray-600">Curated collections of AI tools and agents for specific use cases</p>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {stacks.map((stack, idx) => {
              const colorClass = idx % 3 === 0
                ? { bg: 'bg-blue-50 border-blue-200', chip: 'bg-blue-100 text-blue-600' }
                : idx % 3 === 1
                  ? { bg: 'bg-green-50 border-green-200', chip: 'bg-green-100 text-green-600' }
                  : { bg: 'bg-purple-50 border-purple-200', chip: 'bg-purple-100 text-purple-600' }

              const products = (stack.product_stacks || []).map(ps => ps.product).filter(Boolean).slice(0, 4)

              return (
                <Card
                  key={stack.id}
                  className={`overflow-hidden border-2 h-full flex flex-col ${colorClass.bg}`}
                >
                  <CardContent className="p-6 flex flex-col h-full">
                    {/* Header */}
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-xl ${colorClass.chip}`}>
                        {stack.name.charAt(0)}
                      </div>
                      <h3 className="font-bold text-xl text-gray-900">{stack.name}</h3>
                    </div>

                    {/* Description */}
                    <p className="text-gray-600 mb-6 text-sm leading-relaxed">{stack.description}</p>

                    {/* Tools list */}
                    <div className="space-y-3 mb-6 flex-1">
                      {products.map((product) => {
                        const categoryName = (product.product_categories || [])
                          .map(pc => pc?.category?.name)
                          .filter(Boolean)[0]
                        return (
                          <div key={product.id} className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
                            <div className="flex items-center justify-between">
                              <div>
                                <div className="font-medium text-gray-900">{product.name}</div>
                                <div className="text-sm text-gray-500">{categoryName || '—'}</div>
                              </div>
                              <div className="flex items-center gap-2">
                                <Badge variant="secondary" className="text-xs px-2 py-1 bg-blue-100 text-blue-700 hover:bg-blue-200">Tool</Badge>
                              </div>
                            </div>
                          </div>
                        )
                      })}
                    </div>

                    {/* View Complete Stack button */}
                    <Link href={`/stack/${stack.id}`} className="block mt-auto">
                      <Button className="w-full bg-black hover:bg-gray-800 text-white">View Complete Stack</Button>
                    </Link>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Featured Tools & Agents */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Featured Tools & Agents</h2>
              <p className="text-gray-600">Top-rated AI tools trusted by thousands of users</p>
            </div>
            <Link href="/explore">
              <Button variant="outline">View All</Button>
            </Link>
          </div>

                        <FeaturedProducts showRating={false} gridCols={3} />
        </div>
      </section>
    </div>
  )
}
