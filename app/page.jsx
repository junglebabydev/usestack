import Header from "@/components/header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search, Star, ArrowRight } from "lucide-react"
import Link from "next/link"
import { aiStacks, categories, stats, popularSearches, tools } from "@/lib/data"

export default function HomePage() {
  const featuredTools = tools.slice(0, 6)
  const browseCategoriesData = categories.slice(0, 6)

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl mb-6">
            Discover the Best AI Tools & Agents
          </h1>
          <p className="max-w-3xl mx-auto text-lg text-gray-600 mb-8">
            Find, compare, and choose from thousands of AI-powered tools and agents to supercharge your workflow and
            boost productivity.
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Search for AI tools, agents, or categories..."
                className="pl-12 pr-20 py-4 text-lg border-2 border-gray-200 rounded-full"
              />
              <Button className="absolute right-2 top-1/2 transform -translate-y-1/2 rounded-full px-8">Search</Button>
            </div>
          </div>

          {/* Popular Searches */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
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

      {/* Recommended AI Stacks */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Recommended AI Stacks</h2>
            <p className="text-lg text-gray-600">Curated collections of AI tools and agents for specific use cases</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {aiStacks.slice(0, 4).map((stack) => (
              <Card
                key={stack.id}
                className={`border-2 ${
                  stack.color === "blue"
                    ? "border-blue-200 bg-blue-50"
                    : stack.color === "green"
                      ? "border-green-200 bg-green-50"
                      : stack.color === "purple"
                        ? "border-purple-200 bg-purple-50"
                        : "border-pink-200 bg-pink-50"
                }`}
              >
                <CardHeader>
                  <div className="flex items-center gap-3 mb-3">
                    <div
                      className={`w-12 h-12 rounded-lg flex items-center justify-center text-2xl ${
                        stack.color === "blue"
                          ? "bg-blue-100"
                          : stack.color === "green"
                            ? "bg-green-100"
                            : stack.color === "purple"
                              ? "bg-purple-100"
                              : "bg-pink-100"
                      }`}
                    >
                      {stack.icon}
                    </div>
                    <CardTitle className="text-xl">{stack.name}</CardTitle>
                  </div>
                  <CardDescription className="text-gray-600">{stack.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 mb-6">
                    {stack.tools.map((tool, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-white rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gray-900 rounded-lg"></div>
                          <div>
                            <div className="font-medium">{tool.name}</div>
                            <div className="text-sm text-gray-500">{tool.category}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant={tool.type === "Tool" ? "default" : "secondary"} className="text-xs">
                            {tool.type}
                          </Badge>
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm font-medium">{tool.rating}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Link href={`/stack/${stack.id}`}>
                    <Button className="w-full bg-black text-white hover:bg-gray-800">View Complete Stack</Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {aiStacks.slice(4, 6).map((stack) => (
              <Card
                key={stack.id}
                className={`border-2 ${
                  stack.color === "yellow" ? "border-yellow-200 bg-yellow-50" : "border-indigo-200 bg-indigo-50"
                }`}
              >
                <CardHeader>
                  <div className="flex items-center gap-3 mb-3">
                    <div
                      className={`w-12 h-12 rounded-lg flex items-center justify-center text-2xl ${
                        stack.color === "yellow" ? "bg-yellow-100" : "bg-indigo-100"
                      }`}
                    >
                      {stack.icon}
                    </div>
                    <CardTitle className="text-xl">{stack.name}</CardTitle>
                  </div>
                  <CardDescription className="text-gray-600">{stack.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 mb-6">
                    {stack.tools.slice(0, 4).map((tool, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-white rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gray-900 rounded-lg"></div>
                          <div>
                            <div className="font-medium">{tool.name}</div>
                            <div className="text-sm text-gray-500">{tool.category}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant={tool.type === "Tool" ? "default" : "secondary"} className="text-xs">
                            {tool.type}
                          </Badge>
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm font-medium">{tool.rating}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Link href={`/stack/${stack.id}`}>
                    <Button className="w-full bg-black text-white hover:bg-gray-800">View Complete Stack</Button>
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

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredTools.map((tool) => (
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
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-sm text-gray-500">{tool.provider}</span>
                  </div>
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
                    <div className="text-sm text-gray-600">Starting at {tool.pricing.startingPrice}</div>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {tool.tags.slice(0, 2).map((tag, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        #{tag}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Link href={`/tool/${tool.id}`} className="flex-1">
                      <Button size="sm" className="w-full">
                        View tool
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
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

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
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
    </div>
  )
}
