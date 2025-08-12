"use client"

import { useState } from "react"
import Header from "../../components/header"
import { Button } from "../../components/ui/button"
import { Search, Twitter, Linkedin, Instagram, Rss } from "lucide-react"

export default function NewsletterPage() {
  const [email, setEmail] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle newsletter signup
    console.log("Newsletter signup:", email)
  }

  const articles = [
    {
      id: 1,
      title: "Meta's mind-reading movie AI",
      subtitle: "PLUS: KAIST AI designs cancer drugs from scratch",
      image: "/ai-brain-reading.png",
      author: "Rowan Cheung, +1",
      authorImage: "/professional-headshot.png",
    },
    {
      id: 2,
      title: "OpenAI's GPT-5 crisis mode",
      subtitle: "PLUS: Google, NASA creating AI doctor for astronauts in space",
      image: "/gpt-5-crisis-chart.png",
      author: "Zach Mink, +1",
      authorImage: "/professional-headshot.png",
    },
    {
      id: 3,
      title: "OpenAI launches GPT-5 to all ChatGPT users",
      subtitle: "PLUS: Google's new AI can understand animal sounds",
      image: "/gpt-5-gradient.png",
      author: "Rowan Cheung, +1",
      authorImage: "/professional-headshot.png",
    },
    {
      id: 4,
      title: "U.S. Govt gets ChatGPT for a buck",
      subtitle: "PLUS: Google doubles down on education with guided learning",
      image: "/us-flag-chatgpt.png",
      author: "Rowan Cheung, +1",
      authorImage: "/professional-headshot.png",
    },
    {
      id: 5,
      title: "Google's AI builds playable worlds in real time",
      subtitle: "PLUS: OpenAI releases its highly anticipated open weights model",
      image: "/ai-game-worlds.png",
      author: "Rowan Cheung, +1",
      authorImage: "/professional-headshot.png",
    },
    {
      id: 6,
      title: "ChatGPT will sense when you're not okay",
      subtitle: "PLUS: Google releases a benchmark to agents on gaming",
      image: "/chatgpt-emotional-ai.png",
      author: "Rowan Cheung, +1",
      authorImage: "/professional-headshot.png",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section */}
      <div className="bg-white">
        <div className="max-w-4xl mx-auto px-4 py-16 text-center">
          {/* Logo */}
          <div className="mb-8">
            <div className="w-20 h-20 bg-black rounded-lg flex items-center justify-center mx-auto mb-6">
              <span className="text-white font-bold text-2xl">AI</span>
            </div>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">The AI Tools Newsletter</h1>

          {/* Value Proposition */}
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            Get the latest AI news, understand why it matters, and learn how to apply it in your work — all in just 5
            minutes a day. Join 1,000,000+ subscribers.
          </p>

          {/* Email Signup Form */}
          <form onSubmit={handleSubmit} className="max-w-md mx-auto mb-8">
            <div className="flex gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
              <Button
                type="submit"
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg"
              >
                Join Free
              </Button>
            </div>
          </form>

          {/* Author Info */}
          <div className="text-left max-w-md mx-auto mb-8">
            <p className="text-sm text-gray-500 mb-2">Written by</p>
            <p className="text-gray-900 font-medium">AI Tools Team, +1</p>
          </div>

          {/* Social Connect */}
          <div className="text-right max-w-md mx-auto">
            <p className="text-sm text-gray-500 mb-3">Connect</p>
            <div className="flex justify-end gap-2">
              <Button variant="outline" size="sm" className="w-10 h-10 p-0 rounded-full bg-transparent">
                <Twitter className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="sm" className="w-10 h-10 p-0 rounded-full bg-transparent">
                <Linkedin className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="sm" className="w-10 h-10 p-0 rounded-full bg-transparent">
                <Instagram className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="sm" className="w-10 h-10 p-0 rounded-full bg-transparent">
                <Rss className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Search Section */}
      <div className="bg-white border-t border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search posts..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Articles Grid */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article) => (
            <article
              key={article.id}
              className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="aspect-video bg-gray-100">
                <img
                  src={article.image || "/placeholder.svg"}
                  alt={article.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">{article.title}</h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{article.subtitle}</p>
                <div className="flex items-center gap-2">
                  <img
                    src={article.authorImage || "/placeholder.svg"}
                    alt={article.author}
                    className="w-6 h-6 rounded-full"
                  />
                  <span className="text-sm text-gray-700">{article.author}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}
