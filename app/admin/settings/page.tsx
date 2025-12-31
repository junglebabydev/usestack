"use client"

import { useState } from "react"
import { Save } from "lucide-react"
import { AdminLayout } from "@/components/layout/admin-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export default function AdminSettingsPage() {
  const [isSaving, setIsSaving] = useState(false)

  const handleSave = async () => {
    setIsSaving(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsSaving(false)
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
            <p className="text-muted-foreground">Manage platform configuration</p>
          </div>
          <Button onClick={handleSave} disabled={isSaving}>
            <Save className="mr-2 size-4" />
            {isSaving ? "Saving..." : "Save Changes"}
          </Button>
        </div>

        {/* General Settings */}
        <Card>
          <CardHeader>
            <CardTitle>General Settings</CardTitle>
            <CardDescription>Basic platform configuration</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="site-name">Site Name</Label>
              <Input id="site-name" defaultValue="AI ToolHub" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="site-tagline">Site Tagline</Label>
              <Input id="site-tagline" defaultValue="Discover the Best AI Tools & Agents" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="site-description">Site Description</Label>
              <Textarea
                id="site-description"
                rows={3}
                defaultValue="Find, compare, and assemble AI tools & agents into stacks that solve real workflows."
              />
            </div>
          </CardContent>
        </Card>

        {/* Feature Flags */}
        <Card>
          <CardHeader>
            <CardTitle>Feature Flags</CardTitle>
            <CardDescription>Enable or disable platform features</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Public Submissions</Label>
                <p className="text-sm text-muted-foreground">Allow users to submit tools via public form</p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>User Reviews</Label>
                <p className="text-sm text-muted-foreground">Enable user reviews and ratings for tools</p>
              </div>
              <Switch />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Newsletter Signup</Label>
                <p className="text-sm text-muted-foreground">Show newsletter signup forms</p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Waitlist</Label>
                <p className="text-sm text-muted-foreground">Accept waitlist signups</p>
              </div>
              <Switch defaultChecked />
            </div>
          </CardContent>
        </Card>

        {/* Email Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Email Settings</CardTitle>
            <CardDescription>Configure email notifications</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="from-email">From Email</Label>
              <Input id="from-email" type="email" defaultValue="hello@aitoolhub.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="from-name">From Name</Label>
              <Input id="from-name" defaultValue="AI ToolHub" />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>New Submission Notifications</Label>
                <p className="text-sm text-muted-foreground">Email admins when new tools are submitted</p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Weekly Digest</Label>
                <p className="text-sm text-muted-foreground">Send weekly summary to subscribers</p>
              </div>
              <Switch defaultChecked />
            </div>
          </CardContent>
        </Card>

        {/* SEO Settings */}
        <Card>
          <CardHeader>
            <CardTitle>SEO & Meta</CardTitle>
            <CardDescription>Search engine optimization settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="meta-title">Default Meta Title</Label>
              <Input id="meta-title" defaultValue="AI ToolHub - Discover the Best AI Tools & Agents" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="meta-description">Default Meta Description</Label>
              <Textarea
                id="meta-description"
                rows={2}
                defaultValue="Find, compare, and assemble AI tools & agents into stacks. Built for indie hackers and founders."
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="og-image">Open Graph Image URL</Label>
              <Input id="og-image" type="url" placeholder="https://example.com/og-image.jpg" />
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}
