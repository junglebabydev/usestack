"use client"

import type React from "react"

import { useState } from "react"
import { Loader2, CheckCircle2 } from "lucide-react"
import { PublicLayout } from "@/components/layout/public-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function SubmitToolPage() {
  const [isAutoFetching, setIsAutoFetching] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [autoFetchUrl, setAutoFetchUrl] = useState("")

  const handleAutoFetch = async () => {
    setIsAutoFetching(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsAutoFetching(false)
    // In production, populate form fields with fetched data
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsSubmitting(false)
    setIsSubmitted(true)
  }

  if (isSubmitted) {
    return (
      <PublicLayout>
        <div className="mx-auto max-w-2xl px-4 py-16 text-center">
          <div className="mb-6 flex justify-center">
            <div className="flex size-16 items-center justify-center rounded-full bg-gradient-to-br from-chart-1 to-chart-2">
              <CheckCircle2 className="size-8 text-white" />
            </div>
          </div>
          <h1 className="mb-4 text-3xl font-bold">Thank You!</h1>
          <p className="mb-8 text-lg text-muted-foreground">
            Your tool submission has been received. We'll review it and get back to you within 2-3 business days.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Button onClick={() => setIsSubmitted(false)}>Submit Another Tool</Button>
            <Button asChild variant="outline">
              <a href="/explore">Explore Tools</a>
            </Button>
          </div>
        </div>
      </PublicLayout>
    )
  }

  return (
    <PublicLayout>
      <div className="mx-auto max-w-3xl px-4 py-12 lg:px-8">
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold tracking-tight">Submit Your AI Tool</h1>
          <p className="text-lg text-muted-foreground">Share your tool with thousands of builders and founders</p>
        </div>

        {/* Auto Fetch */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Quick Start: Auto-Fetch from URL</CardTitle>
            <CardDescription>Enter your tool's website and we'll automatically fill in the details</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-3">
              <Input
                placeholder="https://yourtool.com"
                value={autoFetchUrl}
                onChange={(e) => setAutoFetchUrl(e.target.value)}
                disabled={isAutoFetching}
              />
              <Button onClick={handleAutoFetch} disabled={isAutoFetching || !autoFetchUrl}>
                {isAutoFetching ? (
                  <>
                    <Loader2 className="mr-2 size-4 animate-spin" />
                    Fetching...
                  </>
                ) : (
                  "Auto Fetch"
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Manual Form */}
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Tool Details */}
          <Card>
            <CardHeader>
              <CardTitle>Tool Details</CardTitle>
              <CardDescription>Basic information about your AI tool</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="tool-name">
                  Tool Name <Badge variant="destructive">Required</Badge>
                </Label>
                <Input id="tool-name" placeholder="e.g., ChatGPT" required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="tagline">
                  Tagline <Badge variant="destructive">Required</Badge>
                </Label>
                <Input id="tagline" placeholder="Short description (60 characters max)" maxLength={60} required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">
                  Description <Badge variant="destructive">Required</Badge>
                </Label>
                <Textarea
                  id="description"
                  placeholder="Detailed description of your tool, its features, and benefits"
                  rows={5}
                  required
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="website">
                    Website URL <Badge variant="destructive">Required</Badge>
                  </Label>
                  <Input id="website" type="url" placeholder="https://yourtool.com" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="logo">Logo URL</Label>
                  <Input id="logo" type="url" placeholder="https://yourtool.com/logo.png" />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="twitter">Twitter/X URL</Label>
                  <Input id="twitter" type="url" placeholder="https://x.com/yourtool" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="linkedin">LinkedIn URL</Label>
                  <Input id="linkedin" type="url" placeholder="https://linkedin.com/company/..." />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Company Details */}
          <Card>
            <CardHeader>
              <CardTitle>Company Details</CardTitle>
              <CardDescription>Information about the company behind the tool</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="company-name">Company Name</Label>
                <Input id="company-name" placeholder="e.g., OpenAI" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="company-website">Company Website</Label>
                <Input id="company-website" type="url" placeholder="https://yourcompany.com" />
              </div>
            </CardContent>
          </Card>

          {/* Categories & Tags */}
          <Card>
            <CardHeader>
              <CardTitle>Categories & Tags</CardTitle>
              <CardDescription>Help users discover your tool</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="categories">
                  Categories <Badge variant="destructive">Required</Badge>
                </Label>
                <Input id="categories" placeholder="e.g., Text Generation, Developer Tools" required />
                <p className="text-xs text-muted-foreground">Separate multiple categories with commas</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="tags">Tags</Label>
                <Input id="tags" placeholder="e.g., NLP, Chatbot, AI Assistant" />
                <p className="text-xs text-muted-foreground">Separate multiple tags with commas</p>
              </div>
            </CardContent>
          </Card>

          {/* Submitter Info */}
          <Card>
            <CardHeader>
              <CardTitle>Your Information</CardTitle>
              <CardDescription>We'll use this to contact you about your submission</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="submitter-name">
                    Your Name <Badge variant="destructive">Required</Badge>
                  </Label>
                  <Input id="submitter-name" placeholder="John Doe" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="submitter-email">
                    Your Email <Badge variant="destructive">Required</Badge>
                  </Label>
                  <Input id="submitter-email" type="email" placeholder="john@example.com" required />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Additional Message</Label>
                <Textarea id="message" placeholder="Anything else you'd like us to know?" rows={3} />
              </div>
            </CardContent>
          </Card>

          {/* Submit */}
          <div className="flex justify-end">
            <Button type="submit" size="lg" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 size-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                "Submit Tool"
              )}
            </Button>
          </div>
        </form>
      </div>
    </PublicLayout>
  )
}
