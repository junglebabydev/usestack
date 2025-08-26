import Header from "@/components/header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Users, Zap, TrendingUp, Clock } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"
import { supabase } from "@/lib/supabase"

const relatedStacks = [
  { name: "Content Creators", description: "Creative AI tools for video, audio, and visual content", color: "pink" },
  {
    name: "Business Productivity",
    description: "Professional-grade AI tools for streamlined workflows",
    color: "purple",
  },
  { name: "Indie Hackers", description: "Lean AI tools for independent developers", color: "yellow" },
]

export default async function StackDetailPage({ params }) {
  // Fetch stack from DB (by id or slug)
  const { data: stackData, error } = await supabase
    .from('stacks')
    .select(`
      id, name, slug, description,
      product_stacks:product_stacks(
        sort_order,
        product:products(
          id, name, slug, tagline,
          product_categories:product_categories_final(
            category:categories_final(name)
          )
        )
      )
    `)
    .eq('id', params.id)
    .single()

  if (error || !stackData) {
    notFound()
  }

  const stackProducts = (stackData.product_stacks || [])
    .sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0))
    .map(ps => ps.product)
    .filter(Boolean)

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex text-sm text-gray-500 mb-6">
          <span>Home</span>
          <span className="mx-2">/</span>
          <span>AI Stacks</span>
          <span className="mx-2">/</span>
          <span className="text-gray-900">{stackData.name}</span>
        </nav>

        {/* Stack Header */}
        <div
          className={`rounded-lg p-8 mb-8 ${
            stackData.color === "blue"
              ? "bg-blue-50 border-blue-200"
              : stackData.color === "green"
                ? "bg-green-50 border-green-200"
                : stackData.color === "purple"
                  ? "bg-purple-50 border-purple-200"
                  : stackData.color === "pink"
                    ? "bg-pink-50 border-pink-200"
                    : stackData.color === "yellow"
                      ? "bg-yellow-50 border-yellow-200"
                      : "bg-indigo-50 border-indigo-200"
          } border-2`}
        >
          <div className="flex items-start gap-6">
            <div
              className={`w-16 h-16 rounded-xl flex items-center justify-center text-3xl ${
                "bg-blue-100"
              }`}
            >
              {stackData.name?.charAt(0) || 'S'}
            </div>
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900 mb-3">{stackData.name}</h1>
              <p className="text-lg text-gray-700 mb-6">{stackData.description}</p>

              <div className="flex items-center gap-6 mb-6">
                <div className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-gray-600" />
                  <span className="text-gray-600">{stackProducts.length} Tools & Agents</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-gray-600" />
                  <span className="text-gray-600">Perfect for {stackData.name.toLowerCase()}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-gray-600">4.7 average rating</span>
                </div>
              </div>

              <div className="flex gap-3">
                <Button size="lg" className="bg-black text-white hover:bg-gray-800">
                  Get Complete Stack
                </Button>
                <Button variant="outline" size="lg">
                  Save Stack
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Stack Overview */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Stack Overview</h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                This curated collection of AI tools and agents is specifically designed for{" "}
                {stackData.name.toLowerCase()}. Each tool has been carefully selected to work together seamlessly,
                providing you with a comprehensive solution for your workflow needs.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-gray-50 rounded-lg text-center">
                  <div className="text-2xl font-bold text-gray-900">{stackProducts.length}</div>
                  <div className="text-sm text-gray-600">Tools & Agents</div>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg text-center">
                  <div className="text-2xl font-bold text-gray-900">4.7</div>
                  <div className="text-sm text-gray-600">Average Rating</div>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg text-center">
                  <div className="text-2xl font-bold text-gray-900">2.5K+</div>
                  <div className="text-sm text-gray-600">Users</div>
                </div>
              </div>
            </div>

            {/* Tools in Stack */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Tools & Agents in this Stack</h2>
              <div className="space-y-6">
                {stackProducts.map((tool) => {
                  const categoryName = (tool.product_categories || [])
                    .map(pc => pc?.category?.name)
                    .filter(Boolean)[0]
                  return (
                  <Card key={tool.id} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-6">
                        <div className="w-16 h-16 bg-gray-900 rounded-lg flex-shrink-0"></div>
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <div className="flex items-center gap-2 mb-2">
                                <Badge variant="default">Tool</Badge>
                                {categoryName && <Badge variant="outline">{categoryName}</Badge>}
                              </div>
                              <h3 className="text-xl font-semibold text-gray-900 mb-2">{tool.name}</h3>
                              {tool.tagline && <p className="text-gray-600 mb-3">{tool.tagline}</p>}
                            </div>
                            <div className="text-right"></div>
                          </div>

                          

                          <div className="flex items-center justify-between">
                            <div className="text-sm text-gray-500"></div>
                            <div className="flex gap-2">
                              <Link href={`/tool/${tool.slug || tool.id}`}>
                                <Button variant="outline" size="sm">
                                  View Details
                                </Button>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  )
                })}
              </div>
            </div>

            {/* Why This Stack */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Why This Stack Works</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 bg-gray-50 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">Seamless Integration</h3>
                  <p className="text-gray-600 text-sm">
                    All tools in this stack are designed to work together, with compatible APIs and shared data formats.
                  </p>
                </div>
                <div className="p-6 bg-gray-50 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">Cost Effective</h3>
                  <p className="text-gray-600 text-sm">
                    Get better value by using this curated stack instead of individual tool subscriptions.
                  </p>
                </div>
                <div className="p-6 bg-gray-50 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">Proven Results</h3>
                  <p className="text-gray-600 text-sm">
                    Thousands of {stackData.name.toLowerCase()} have successfully used this combination.
                  </p>
                </div>
                <div className="p-6 bg-gray-50 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">Expert Curated</h3>
                  <p className="text-gray-600 text-sm">
                    Selected by industry experts who understand the specific needs of {stackData.name.toLowerCase()}.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Related Stacks */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  Related Stacks
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {relatedStacks.map((stack, index) => (
                  <div key={index} className="p-3 bg-gray-50 rounded-lg">
                    <h4 className="font-medium text-sm text-gray-900 mb-1">{stack.name}</h4>
                    <p className="text-xs text-gray-600 mb-2">{stack.description}</p>
                    <Button variant="outline" size="sm" className="w-full bg-transparent">
                      View Stack
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Stack Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  Stack Statistics
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Total Tools</span>
                  <span className="font-medium">{stackProducts.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Average Rating</span>
                  <span className="font-medium">4.7/5</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Active Users</span>
                  <span className="font-medium">2.5K+</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Last Updated</span>
                  <span className="font-medium">2 days ago</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
