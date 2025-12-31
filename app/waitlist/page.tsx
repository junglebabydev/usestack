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

export default function WaitlistPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))
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
          <h1 className="mb-4 text-3xl font-bold">You're on the List!</h1>
          <p className="mb-8 text-lg text-muted-foreground">
            Thanks for joining our waitlist. We'll keep you updated on new features and tools.
          </p>
          <Button asChild>
            <a href="/explore">Explore Tools</a>
          </Button>
        </div>
      </PublicLayout>
    )
  }

  return (
    <PublicLayout>
      <div className="mx-auto max-w-2xl px-4 py-16 lg:px-8">
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold tracking-tight">Join the Waitlist</h1>
          <p className="text-lg text-muted-foreground">
            Be the first to know about new AI tools, features, and exclusive content
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Get Early Access</CardTitle>
            <CardDescription>Join thousands of builders staying ahead of the AI curve</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" placeholder="John Doe" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="john@example.com" required />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="interest">What are you building?</Label>
                <Textarea id="interest" placeholder="Tell us about your project or interests..." rows={4} />
              </div>

              <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 size-4 animate-spin" />
                    Joining...
                  </>
                ) : (
                  "Join Waitlist"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </PublicLayout>
  )
}
