"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Search, Sparkles, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

const examplePrompts = [
  "I need to automate my social media content creation and scheduling",
  "Help me build a customer support chatbot with AI",
  "I want to create video content from blog posts automatically",
  "Find tools to help me write better marketing copy and emails",
  "I need a complete workflow for AI-powered data analysis",
  "Build an automated lead generation system with AI",
]

export function AiPromptSearch() {
  const router = useRouter()
  const [prompt, setPrompt] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!prompt.trim()) return

    setIsLoading(true)

    // Generate a workflow ID and navigate to results
    const workflowId = Date.now().toString()
    router.push(`/workflow/${workflowId}?q=${encodeURIComponent(prompt)}`)
  }

  const handleExampleClick = (example: string) => {
    setPrompt(example)
  }

  return (
    <div className="space-y-6">
      {/* Main Prompt Input */}
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative">
          <Textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="E.g., I need to create and schedule social media content for my startup..."
            className="min-h-[120px] resize-none pr-12 text-base"
            disabled={isLoading}
          />
          <div className="absolute bottom-3 right-3">
            <Sparkles className="size-5 text-muted-foreground" />
          </div>
        </div>
        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-muted-foreground">
            <span className="font-medium">Tip:</span> Be specific about your goals and constraints
          </p>
          <Button type="submit" size="lg" disabled={isLoading || !prompt.trim()} className="sm:w-auto">
            {isLoading ? (
              <>
                <Loader2 className="mr-2 size-4 animate-spin" />
                Finding Tools...
              </>
            ) : (
              <>
                <Search className="mr-2 size-4" />
                Find My Tools
              </>
            )}
          </Button>
        </div>
      </form>

      {/* Example Prompts */}
      <div>
        <p className="mb-3 text-sm font-medium text-muted-foreground">Try these examples:</p>
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {examplePrompts.map((example, index) => (
            <button
              key={index}
              onClick={() => handleExampleClick(example)}
              className="group rounded-lg border border-border bg-card p-3 text-left text-sm transition-all hover:border-primary hover:bg-primary/5"
              disabled={isLoading}
            >
              <div className="flex items-start gap-2">
                <Sparkles className="mt-0.5 size-4 shrink-0 text-muted-foreground transition-colors group-hover:text-primary" />
                <span className="line-clamp-2 text-muted-foreground transition-colors group-hover:text-foreground">
                  {example}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
