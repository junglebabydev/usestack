"use client"


// sample data
import Header from "@/components/header"
import { useEffect, useMemo, useRef, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search, ArrowRight, Code, Image as ImageIcon, Music2, Video, MessageSquare, Bot, Gamepad2, FileText, Palette, Box, ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
// import { aiStacks } from "@/lib/data" // replaced by live stacks from DB
import FeaturedProducts from "@/components/featured-products"
import { supabase } from "@/lib/supabase"

export default function HomePage() {
  const getCategoryIcon = (name) => {
    const n = (name || "").toLowerCase()
    if (n.includes('code') || n.includes('dev') || n.includes('program')) return <Code className="w-5 h-5" />
    if (n.includes('image') || n.includes('photo') || n.includes('design')) return <ImageIcon className="w-5 h-5" />
    if (n.includes('audio') || n.includes('music')) return <Music2 className="w-5 h-5" />
    if (n.includes('video')) return <Video className="w-5 h-5" />
    if (n.includes('chat') || n.includes('assistant') || n.includes('bot') || n.includes('companion')) return <MessageSquare className="w-5 h-5" />
    if (n.includes('avatar')) return <Bot className="w-5 h-5" />
    if (n.includes('document') || n.includes('doc')) return <FileText className="w-5 h-5" />
    if (n.includes('game')) return <Gamepad2 className="w-5 h-5" />
    if (n.includes('3d')) return <Box className="w-5 h-5" />
    return <Palette className="w-5 h-5" />
  }
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [dbCategories, setDbCategories] = useState([])
  const [categoryCounts, setCategoryCounts] = useState({})
  const [stacks, setStacks] = useState([])
  const containerRef = useRef(null)
  const originalWidthRef = useRef(0)
  const [isCarouselPaused, setIsCarouselPaused] = useState(false)
  const rafIdRef = useRef(null)
  const lastTimeRef = useRef(0)

  const topCategories = dbCategories
    .sort((a, b) => (categoryCounts[b.id] || 0) - (categoryCounts[a.id] || 0))
    .slice(0, 5)

  // Prepare duplicated list for infinite looping
  const loopCategories = useMemo(() => {
    if (!dbCategories || dbCategories.length === 0) return []
    return [...dbCategories, ...dbCategories]
  }, [dbCategories])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const updateOriginalWidth = () => {
      // Half of scrollWidth because we rendered the list twice
      originalWidthRef.current = container.scrollWidth / 2
    }

    updateOriginalWidth()

    const handleLoopOnScroll = () => {
      const width = originalWidthRef.current
      if (width === 0) return
      if (container.scrollLeft >= width) {
        container.scrollLeft -= width
      } else if (container.scrollLeft <= 0) {
        container.scrollLeft += width
      }
    }

    container.addEventListener('scroll', handleLoopOnScroll)
    window.addEventListener('resize', updateOriginalWidth)

    return () => {
      container.removeEventListener('scroll', handleLoopOnScroll)
      window.removeEventListener('resize', updateOriginalWidth)
    }
  }, [dbCategories])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    if (isCarouselPaused) return

    const speedPxPerSecond = 80 // adjust for desired speed

    const animate = (timestamp) => {
      if (!lastTimeRef.current) lastTimeRef.current = timestamp
      const deltaMs = timestamp - lastTimeRef.current
      lastTimeRef.current = timestamp

      const width = originalWidthRef.current || container.scrollWidth / 2
      let next = container.scrollLeft + (speedPxPerSecond * deltaMs) / 1000
      if (next >= width) next -= width
      container.scrollLeft = next

      rafIdRef.current = requestAnimationFrame(animate)
    }

    rafIdRef.current = requestAnimationFrame(animate)
    return () => {
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current)
      lastTimeRef.current = 0
    }
  }, [isCarouselPaused, dbCategories])

  useEffect(() => {
    const fetchData = async () => {
      const [categoriesRes, productCategoriesRes] = await Promise.all([
        supabase
          .from('categories_final')
          .select('id, name, slug')
          .order('name', { ascending: true }),
        supabase
          .from('product_categories_final')
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
              product_categories:product_categories_final(
                category:categories_final(name)
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

  const handleScroll = (direction) => {
    const container = containerRef.current
    if (container) {
      const scrollAmount = 400
      const width = originalWidthRef.current || container.scrollWidth / 2
      let target = direction === 'left'
        ? container.scrollLeft - scrollAmount
        : container.scrollLeft + scrollAmount

      // Wrap-around logic for infinite loop
      if (target >= width) target -= width
      if (target < 0) target += width

      container.scrollTo({
        left: target,
        behavior: 'smooth'
      })
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 text-center">
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
          <div className="flex flex-wrap justify-center gap-3 mb-4">
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
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Browse by Category</h2>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleScroll('left')}
                className="p-2"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleScroll('right')}
                className="p-2"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="relative">
            <div 
              ref={containerRef}
              className="flex space-x-4 overflow-x-auto scrollbar-hide pb-4"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              onMouseEnter={() => setIsCarouselPaused(true)}
              onMouseLeave={() => setIsCarouselPaused(false)}
              onTouchStart={() => setIsCarouselPaused(true)}
              onTouchEnd={() => setIsCarouselPaused(false)}
            >
              {loopCategories.map((category, idx) => (
                <Link key={`${category.id}-${idx}`} href={`/explore?category=${category.slug || category.id}`}>
                  <Card className="hover:shadow-md transition-shadow cursor-pointer h-40 w-40 flex-shrink-0 flex flex-col items-center justify-center text-center p-4 rounded-2xl border border-gray-200">
                    <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-2xl mb-2">
                      {getCategoryIcon(category.name)}
                    </div>
                    <h3 className="font-semibold text-sm text-gray-900 line-clamp-2 leading-snug">{category.name}</h3>
                    <p className="text-xs text-gray-500">{categoryCounts[category.id] || 0} tools available</p>
                </Card>
              </Link>
            ))}
          </div>
          </div>

          {/* Remove the View more/View less button section */}
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
