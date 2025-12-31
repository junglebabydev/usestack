"use client"

import type React from "react"

import { useState } from "react"
import { Loader2, CheckCircle2, Mail } from "lucide-react"
import { PublicLayout } from "@/components/layout/public-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"

export default function NewsletterPage() {
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
          <h1 className="mb-4 text-3xl font-bold">Welcome Aboard!</h1>
          <p className="mb-8 text-lg text-muted-foreground">
            You're subscribed! Check your email for a confirmation link.
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
      <div className="mx-auto max-w-4xl px-4 py-16 lg:px-8">
        <div className="mb-12 text-center">
          <div className="mb-6 flex justify-center">
            <div className="flex size-16 items-center justify-center rounded-full bg-gradient-to-br from-chart-1 to-chart-2">
              <Mail className="size-8 text-white" />
            </div>
          </div>
          <h1 className="mb-4 text-4xl font-bold tracking-tight">AI Tool Weekly Newsletter</h1>
          <p className="text-lg text-muted-foreground">
            Get the latest AI tools, trends, and insights delivered to your inbox every week
          </p>
        </div>

        <Card className="mb-12 p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
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

            <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 size-4 animate-spin" />
                  Subscribing...
                </>
              ) : (
                "Subscribe to Newsletter"
              )}
            </Button>
          </form>
        </Card>

        <div className="grid gap-6 sm:grid-cols-3">
          <Card className="p-6 text-center">
            <div className="mb-3 text-3xl font-bold text-primary">10K+</div>
            <p className="text-sm text-muted-foreground">Weekly Readers</p>
          </Card>
          <Card className="p-6 text-center">
            <div className="mb-3 text-3xl font-bold text-primary">5+</div>
            <p className="text-sm text-muted-foreground">New Tools Weekly</p>
          </Card>
          <Card className="p-6 text-center">
            <div className="mb-3 text-3xl font-bold text-primary">100%</div>
            <p className="text-sm text-muted-foreground">Free Forever</p>
          </Card>
        </div>
      </div>
    </PublicLayout>
  )
}
