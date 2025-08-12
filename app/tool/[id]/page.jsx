import Header from "@/components/header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Star,
  ExternalLink,
  Heart,
  Share2,
  Flag,
  TrendingUp,
  Clock,
  MapPin,
  Calendar,
  Users,
  Globe,
  MessageSquare,
  ThumbsUp,
  User,
} from "lucide-react"
import { tools } from "@/lib/data"
import { notFound } from "next/navigation"

const trendingTools = [
  { name: "AI Content Writer", category: "Writing & Content", rating: 4.8 },
  { name: "Design Assistant", category: "Design & Creative", rating: 4.6 },
  { name: "Code Generator", category: "Code & Development", rating: 4.9 },
]

const latestNews = [
  { title: "New AI Writing Features Released", date: "2 days ago" },
  { title: "Platform Security Update", date: "1 week ago" },
  { title: "Community Milestone: 50K Users", date: "2 weeks ago" },
]

const getCategoryImage = (category) => {
  const categoryImages = {
    "Writing & Content": "/ai-writing-tool-interface.png",
    "Design & Creative": "/logo-design-ai-interface.png",
    "Code & Development": "/code-generation-ai-interface.png",
    "Marketing & SEO": "/futuristic-ai-interface.png",
    "Image Generation": "/futuristic-ai-interface.png",
    "Chatbots & Automation": "/futuristic-ai-interface.png",
  }
  return categoryImages[category] || "/futuristic-ai-interface.png"
}

const sampleReviews = [
  {
    id: 1,
    user: "Sarah Johnson",
    avatar: "SJ",
    rating: 5,
    date: "2 days ago",
    comment:
      "This tool has completely transformed my content creation workflow. The AI understands context perfectly and maintains my brand voice consistently.",
    helpful: 12,
  },
  {
    id: 2,
    user: "Mike Chen",
    avatar: "MC",
    rating: 4,
    date: "1 week ago",
    comment:
      "Great tool overall! The interface is intuitive and the results are impressive. Would love to see more customization options in future updates.",
    helpful: 8,
  },
  {
    id: 3,
    user: "Emily Rodriguez",
    avatar: "ER",
    rating: 5,
    date: "2 weeks ago",
    comment:
      "Outstanding quality and speed. I've tried many similar tools but this one stands out for its accuracy and ease of use. Highly recommended!",
    helpful: 15,
  },
]

const socialFeeds = [
  {
    platform: "X (Twitter)",
    posts: [
      {
        user: "@techwriter_pro",
        content:
          "Just tried the new AI writing tool and I'm blown away! Generated a 2000-word article in minutes with perfect SEO optimization. #AIWriting #ContentCreation",
        likes: 45,
        retweets: 12,
        time: "2h",
      },
      {
        user: "@marketing_guru",
        content:
          "The brand voice consistency feature is a game-changer. Finally, an AI tool that actually understands my company's tone! 🚀",
        likes: 32,
        retweets: 8,
        time: "5h",
      },
    ],
  },
  {
    platform: "LinkedIn",
    posts: [
      {
        user: "Jennifer Smith, Content Manager",
        content:
          "Our team's productivity has increased by 300% since implementing this AI writing solution. The quality is consistently high and it integrates seamlessly with our existing workflow.",
        likes: 89,
        comments: 23,
        time: "1d",
      },
    ],
  },
]

const teamMembers = [
  {
    name: "Alex Thompson",
    role: "Co-Founder & CEO",
    avatar: "AT",
    bio: "Former Google AI researcher with 10+ years in machine learning and natural language processing.",
    linkedin: "#",
  },
  {
    name: "Maria Garcia",
    role: "Co-Founder & CTO",
    avatar: "MG",
    bio: "PhD in Computer Science from Stanford. Previously led AI initiatives at Microsoft and OpenAI.",
    linkedin: "#",
  },
  {
    name: "David Kim",
    role: "Head of Product",
    avatar: "DK",
    bio: "Product strategist with experience at Notion and Figma. Passionate about user-centric AI design.",
    linkedin: "#",
  },
]

export default function ToolDetailPage({ params }) {
  const toolData = tools.find((tool) => tool.id === Number.parseInt(params.id))

  if (!toolData) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex text-sm text-gray-500 mb-6">
          <span>Home</span>
          <span className="mx-2">/</span>
          <span>{toolData.category}</span>
          <span className="mx-2">/</span>
          <span className="text-gray-900">{toolData.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-7 gap-8">
          {/* Main Content - Tool Info */}
          <div className="lg:col-span-5">
            <div className="flex items-start justify-between mb-6">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-3">
                  <Badge variant={toolData.badge === "Top Rated" ? "default" : "secondary"}>{toolData.badge}</Badge>
                  <Badge variant="outline">{toolData.type}</Badge>
                  <span className="text-gray-500">•</span>
                  <span className="text-gray-600">{toolData.category}</span>
                </div>
                <h1 className="text-3xl font-bold text-gray-900 mb-3">{toolData.name}</h1>
                <p className="text-gray-600 text-lg leading-relaxed mb-4">{toolData.description}</p>

                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center gap-1">
                    <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold text-lg">{toolData.rating}</span>
                    <span className="text-gray-500">({toolData.reviews} reviews)</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <span>by</span>
                    <Badge variant="outline" className="bg-gray-50">
                      {toolData.provider}
                    </Badge>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Try Tool
                  </Button>
                  <Button variant="outline" size="lg">
                    <Heart className="w-4 h-4 mr-2" />
                    Save
                  </Button>
                  <Button variant="outline" size="lg">
                    <Share2 className="w-4 h-4 mr-2" />
                    Share
                  </Button>
                  <Button variant="outline" size="lg">
                    <Flag className="w-4 h-4 mr-2" />
                    Report
                  </Button>
                </div>
              </div>
            </div>

            <div className="w-full mb-6">
              <div className="relative aspect-video bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 rounded-lg overflow-hidden">
                <img
                  src={getCategoryImage(toolData.category) || "/placeholder.svg"}
                  alt={`${toolData.name} interface preview`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4">
                  <Badge className="bg-black/50 text-white border-0">{toolData.badge}</Badge>
                </div>
                <div className="absolute bottom-4 right-4">
                  <Badge variant="secondary" className="bg-white/90 text-gray-900">
                    AI
                  </Badge>
                </div>
              </div>
            </div>

            <div className="mt-8">
              {/* Tabs */}
              <div className="bg-white rounded-lg shadow-sm border">
                <Tabs defaultValue="overview" className="w-full">
                  <TabsList className="w-full justify-start border-b rounded-none bg-transparent p-0">
                    <TabsTrigger
                      value="overview"
                      className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-transparent"
                    >
                      Overview
                    </TabsTrigger>
                    <TabsTrigger
                      value="about"
                      className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-transparent"
                    >
                      About
                    </TabsTrigger>
                    <TabsTrigger
                      value="social-feeds"
                      className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-transparent"
                    >
                      Social Feeds
                    </TabsTrigger>
                    <TabsTrigger
                      value="team"
                      className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-transparent"
                    >
                      Team
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="overview" className="p-6">
                    <div className="space-y-8">
                      <div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Description</h2>
                        <p className="text-gray-700 leading-relaxed mb-6">{toolData.description}</p>
                      </div>

                      {/* Quick Stats */}
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-4">Quick Stats</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                          <div className="bg-blue-50 p-4 rounded-lg text-center">
                            <div className="text-2xl font-bold text-blue-600">{toolData.rating}</div>
                            <div className="text-sm text-gray-600">Rating</div>
                          </div>
                          <div className="bg-green-50 p-4 rounded-lg text-center">
                            <div className="text-2xl font-bold text-green-600">{toolData.reviews}</div>
                            <div className="text-sm text-gray-600">Reviews</div>
                          </div>
                          <div className="bg-purple-50 p-4 rounded-lg text-center">
                            <div className="text-2xl font-bold text-purple-600">{toolData.languages.length}</div>
                            <div className="text-sm text-gray-600">Languages</div>
                          </div>
                          <div className="bg-orange-50 p-4 rounded-lg text-center">
                            <div className="text-2xl font-bold text-orange-600">{toolData.integrations.length}</div>
                            <div className="text-sm text-gray-600">Integrations</div>
                          </div>
                        </div>
                      </div>

                      {/* Use Cases */}
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-4">Use Cases</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                          {toolData.features.map((feature, index) => (
                            <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                              <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                              <span className="text-gray-700">{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Key Features as Pills */}
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-4">Key Features</h3>
                        <div className="flex flex-wrap gap-2">
                          {toolData.tags.map((tag, index) => (
                            <Badge key={index} variant="secondary" className="px-3 py-1 text-sm">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="about" className="p-6">
                    <div className="space-y-6">
                      <div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">About {toolData.provider}</h2>
                        <p className="text-gray-700 leading-relaxed mb-6">
                          {toolData.provider} has been at the forefront of AI technology, creating innovative tools that
                          help businesses and individuals achieve their goals more efficiently. Our commitment to
                          excellence and user satisfaction drives everything we do.
                        </p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div className="flex items-center gap-3">
                            <Globe className="w-5 h-5 text-gray-400" />
                            <div>
                              <div className="font-semibold text-gray-900">Website</div>
                              <div className="text-blue-600">
                                www.{toolData.provider.toLowerCase().replace(/\s+/g, "")}.com
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-3">
                            <Calendar className="w-5 h-5 text-gray-400" />
                            <div>
                              <div className="font-semibold text-gray-900">Founded in</div>
                              <div className="text-gray-600">2019</div>
                            </div>
                          </div>

                          <div className="flex items-center gap-3">
                            <MapPin className="w-5 h-5 text-gray-400" />
                            <div>
                              <div className="font-semibold text-gray-900">Location</div>
                              <div className="text-gray-600">San Francisco, CA</div>
                            </div>
                          </div>

                          <div className="flex items-center gap-3">
                            <Users className="w-5 h-5 text-gray-400" />
                            <div>
                              <div className="font-semibold text-gray-900">Team Size</div>
                              <div className="text-gray-600">50-100 employees</div>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <div>
                            <h3 className="font-semibold text-gray-900 mb-2">Target Audience</h3>
                            <p className="text-gray-600">{toolData.targetAudience}</p>
                          </div>

                          <div>
                            <h3 className="font-semibold text-gray-900 mb-2">Supported Languages</h3>
                            <div className="flex flex-wrap gap-2">
                              {toolData.languages.map((lang, index) => (
                                <Badge key={index} variant="secondary">
                                  {lang}
                                </Badge>
                              ))}
                            </div>
                          </div>

                          <div>
                            <h3 className="font-semibold text-gray-900 mb-2">Integrations</h3>
                            <div className="flex flex-wrap gap-2">
                              {toolData.integrations.map((integration, index) => (
                                <Badge key={index} variant="outline">
                                  {integration}
                                </Badge>
                              ))}
                            </div>
                          </div>

                          <div>
                            <h3 className="font-semibold text-gray-900 mb-2">API Available</h3>
                            <Badge variant={toolData.apiAvailable ? "default" : "secondary"}>
                              {toolData.apiAvailable ? "Yes" : "No"}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="social-feeds" className="p-6">
                    <div className="space-y-8">
                      <div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Social Feeds</h2>

                        {socialFeeds.map((platform, platformIndex) => (
                          <div key={platformIndex} className="mb-8">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                              <MessageSquare className="w-5 h-5" />
                              {platform.platform}
                            </h3>

                            <div className="space-y-4">
                              {platform.posts.map((post, postIndex) => (
                                <div key={postIndex} className="bg-gray-50 p-4 rounded-lg">
                                  <div className="flex items-start gap-3">
                                    <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                                      {post.user.charAt(1).toUpperCase()}
                                    </div>
                                    <div className="flex-1">
                                      <div className="flex items-center gap-2 mb-2">
                                        <span className="font-semibold text-gray-900">{post.user}</span>
                                        <span className="text-gray-500 text-sm">• {post.time}</span>
                                      </div>
                                      <p className="text-gray-700 mb-3">{post.content}</p>
                                      <div className="flex items-center gap-4 text-sm text-gray-500">
                                        <div className="flex items-center gap-1">
                                          <ThumbsUp className="w-4 h-4" />
                                          <span>{post.likes}</span>
                                        </div>
                                        {post.retweets && (
                                          <div className="flex items-center gap-1">
                                            <Share2 className="w-4 h-4" />
                                            <span>{post.retweets}</span>
                                          </div>
                                        )}
                                        {post.comments && (
                                          <div className="flex items-center gap-1">
                                            <MessageSquare className="w-4 h-4" />
                                            <span>{post.comments}</span>
                                          </div>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="team" className="p-6">
                    <div className="space-y-6">
                      <div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Meet the Team</h2>
                        <p className="text-gray-600 mb-8">
                          Get to know the talented individuals behind {toolData.provider} who are passionate about
                          creating innovative AI solutions.
                        </p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {teamMembers.map((member, index) => (
                          <div key={index} className="bg-white border rounded-lg p-6 text-center">
                            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg mx-auto mb-4">
                              {member.avatar}
                            </div>
                            <h3 className="font-semibold text-gray-900 mb-1">{member.name}</h3>
                            <p className="text-blue-600 text-sm mb-3">{member.role}</p>
                            <p className="text-gray-600 text-sm mb-4">{member.bio}</p>
                            <Button variant="outline" size="sm" className="w-full bg-transparent">
                              <User className="w-4 h-4 mr-2" />
                              View LinkedIn
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </div>

            <div className="mt-8">
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Reviews</h2>
                  <Button variant="outline">Write a Review</Button>
                </div>

                <div className="space-y-6">
                  {sampleReviews.map((review) => (
                    <div key={review.id} className="border-b border-gray-200 pb-6 last:border-b-0">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                          {review.avatar}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="font-semibold text-gray-900">{review.user}</span>
                            <div className="flex items-center gap-1">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-4 h-4 ${
                                    i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                                  }`}
                                />
                              ))}
                            </div>
                            <span className="text-gray-500 text-sm">• {review.date}</span>
                          </div>
                          <p className="text-gray-700 mb-3">{review.comment}</p>
                          <div className="flex items-center gap-2 text-sm text-gray-500">
                            <Button variant="ghost" size="sm" className="h-auto p-0 text-gray-500 hover:text-gray-700">
                              <ThumbsUp className="w-4 h-4 mr-1" />
                              Helpful ({review.helpful})
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="border-gray-200 shadow-lg bg-white">
              <CardHeader className="pb-4 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-blue-100">
                <CardTitle className="flex items-center gap-2 text-lg font-semibold text-gray-900">
                  <TrendingUp className="w-5 h-5 text-blue-600" />
                  Trending Tools
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 pt-5">
                {trendingTools.map((tool, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-4 p-4 rounded-lg hover:bg-blue-50 transition-colors border border-transparent hover:border-blue-200 hover:shadow-sm"
                  >
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 shadow-sm">
                      {index + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm text-gray-900 truncate leading-tight mb-1">{tool.name}</p>
                      <p className="text-xs text-gray-600 mb-2">{tool.category}</p>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-xs font-medium text-gray-700">{tool.rating}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="border-gray-200 shadow-lg bg-white">
              <CardHeader className="pb-4 border-b border-gray-100 bg-gradient-to-r from-green-50 to-green-100">
                <CardTitle className="flex items-center gap-2 text-lg font-semibold text-gray-900">
                  <Clock className="w-5 h-5 text-green-600" />
                  Latest News
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 pt-5">
                {latestNews.map((news, index) => (
                  <div
                    key={index}
                    className="p-4 rounded-lg hover:bg-green-50 transition-colors border border-transparent hover:border-green-200 hover:shadow-sm"
                  >
                    <p className="font-semibold text-sm text-gray-900 leading-tight mb-2">{news.title}</p>
                    <p className="text-xs text-gray-500 font-medium">{news.date}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            <div className="h-32"></div>
          </div>
        </div>
      </div>
    </div>
  )
}
