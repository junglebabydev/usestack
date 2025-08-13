import Header from "@/components/header"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search, Star, ArrowRight } from "lucide-react"
import Link from "next/link"
import { aiStacks, categories, stats, popularSearches } from "@/lib/data"
import FeaturedProducts from "@/components/featured-products"

export default function HomePage() {
  const browseCategoriesData = categories.slice(0, 6)

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
                />
              </div>
              <Button className="rounded-full px-6 py-3">Search</Button>
            </div>
          </div>

          {/* Popular Searches */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            <span className="text-gray-600 mr-2">Popular searches:</span>
            {popularSearches.map((search) => (
              <Badge key={search} variant="secondary" className="cursor-pointer hover:bg-gray-200">
                {search}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-gray-900 mb-2">{stats.totalTools}</div>
              <div className="text-gray-600">AI Tools & Agents</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-gray-900 mb-2">{stats.happyUsers}</div>
              <div className="text-gray-600">Happy Users</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-gray-900 mb-2">{stats.categories}</div>
              <div className="text-gray-600">Categories</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-gray-900 mb-2">{stats.averageRating}</div>
              <div className="text-gray-600">Average Rating</div>
            </div>
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
            {browseCategoriesData.map((category) => (
              <Link key={category.id} href={`/categories?category=${category.id}`}>
                <Card className="hover:shadow-md transition-shadow cursor-pointer h-full">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-2xl">
                          {category.icon}
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg text-gray-900">{category.name}</h3>
                          <p className="text-sm text-gray-500">{category.count} tools available</p>
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
            <Button variant="outline" size="lg">
              View All Categories
            </Button>
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
            {aiStacks.slice(0, 3).map((stack) => (
              <Card
                key={stack.id}
                className={`overflow-hidden border-2 h-full flex flex-col ${
                  stack.color === "blue"
                    ? "bg-blue-50 border-blue-200"
                    : stack.color === "green"
                      ? "bg-green-50 border-green-200"
                      : "bg-purple-50 border-purple-200"
                }`}
              >
                <CardContent className="p-6 flex flex-col h-full">
                  {/* Header with icon and title */}
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className={`w-10 h-10 rounded-lg flex items-center justify-center text-xl ${
                        stack.color === "blue"
                          ? "bg-blue-100 text-blue-600"
                          : stack.color === "green"
                            ? "bg-green-100 text-green-600"
                            : "bg-purple-100 text-purple-600"
                      }`}
                    >
                      {stack.icon}
                    </div>
                    <h3 className="font-bold text-xl text-gray-900">{stack.name}</h3>
                  </div>

                  {/* Description */}
                  <p className="text-gray-600 mb-6 text-sm leading-relaxed">{stack.description}</p>

                  {/* Tools list */}
                  <div className="space-y-3 mb-6 flex-1">
                    {stack.tools.slice(0, 4).map((tool, index) => (
                      <div key={index} className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium text-gray-900">{tool.name}</div>
                            <div className="text-sm text-gray-500">{tool.category}</div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge
                              variant={tool.type === "Tool" ? "default" : "secondary"}
                              className={`text-xs px-2 py-1 ${
                                tool.type === "Tool"
                                  ? "bg-blue-100 text-blue-700 hover:bg-blue-200"
                                  : "bg-purple-100 text-purple-700 hover:bg-purple-200"
                              }`}
                            >
                              {tool.type}
                            </Badge>
                            <div className="flex items-center gap-1">
                              <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                              <span className="text-sm font-medium">{tool.rating}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* View Complete Stack button */}
                  <Link href={`/stack/${stack.id}`} className="block mt-auto">
                    <Button className="w-full bg-black hover:bg-gray-800 text-white">View Complete Stack</Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
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
            <Link href="/categories">
              <Button variant="outline">View All</Button>
            </Link>
          </div>

          <FeaturedProducts />
        </div>
      </section>
    </div>
  )
}
