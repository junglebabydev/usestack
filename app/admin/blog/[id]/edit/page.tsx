"use client"

import type React from "react"

import { useState, useEffect, use } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Save, Eye } from "lucide-react"
import Link from "next/link"
import { AdminLayout } from "@/components/layout/admin-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { blogService, calculateReadingTime } from "@/lib/blog-service"
import type { Author, BlogPost } from "@/lib/types/blog"
import { supabase } from "@/lib/supabase"

export default function EditBlogPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [loadingPost, setLoadingPost] = useState(true)
  const [authors, setAuthors] = useState<Author[]>([])

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    summary: "",
    content: "",
    thumbnail_url: "",
    author_id: "",
    category: "",
    tags: "",
    meta_description: "",
    is_published: false,
  })

  useEffect(() => {
    async function fetchData() {
      try {
        const [authorsData, postData] = await Promise.all([
          blogService.getAllAuthors(),
          supabase.from("blog_posts").select("*").eq("id", id).single(),
        ])

        setAuthors(authorsData)

        if (postData.data) {
          const post = postData.data as BlogPost
          setFormData({
            title: post.title,
            slug: post.slug,
            summary: post.summary,
            content: post.content,
            thumbnail_url: post.thumbnail_url || "",
            author_id: post.author_id || "",
            category: post.category || "",
            tags: post.tags?.join(", ") || "",
            meta_description: post.meta_description || "",
            is_published: post.is_published,
          })
        }
      } catch (error) {
        console.error("[v0] Failed to fetch data:", error)
      } finally {
        setLoadingPost(false)
      }
    }

    fetchData()
  }, [id])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const reading_time_minutes = calculateReadingTime(formData.content)

      await blogService.updatePost({
        id,
        ...formData,
        tags: formData.tags
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean),
        reading_time_minutes,
        published_at: formData.is_published ? new Date().toISOString() : undefined,
      })

      router.push("/admin/blog")
    } catch (error) {
      console.error("[v0] Failed to update post:", error)
      alert("Failed to update blog post")
    } finally {
      setLoading(false)
    }
  }

  if (loadingPost) {
    return (
      <AdminLayout>
        <div className="flex h-96 items-center justify-center">
          <div className="size-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button asChild variant="ghost" size="icon">
              <Link href="/admin/blog">
                <ArrowLeft className="size-4" />
              </Link>
            </Button>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Edit Blog Post</h1>
              <p className="text-muted-foreground">Update your blog article</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button type="button" variant="outline" asChild>
              <Link href={`/blog/${formData.slug}`} target="_blank">
                <Eye className="mr-2 size-4" />
                View Post
              </Link>
            </Button>
            <Button type="submit" disabled={loading}>
              <Save className="mr-2 size-4" />
              {loading ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_300px]">
          {/* Main Content - Same as new post page */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Post Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Same form fields as new post page */}
                <div className="space-y-2">
                  <Label htmlFor="title">Title *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="slug">Slug *</Label>
                  <Input
                    id="slug"
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="summary">Summary *</Label>
                  <Textarea
                    id="summary"
                    value={formData.summary}
                    onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                    rows={3}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="content">Content *</Label>
                  <Textarea
                    id="content"
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    rows={20}
                    required
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar - Same as new post page */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Publishing</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="is_published">Published</Label>
                  <Switch
                    id="is_published"
                    checked={formData.is_published}
                    onCheckedChange={(checked) => setFormData({ ...formData, is_published: checked })}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Metadata</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="author_id">Author *</Label>
                  <Select
                    value={formData.author_id}
                    onValueChange={(value) => setFormData({ ...formData, author_id: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {authors.map((author) => (
                        <SelectItem key={author.id} value={author.id}>
                          {author.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Input
                    id="category"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tags">Tags</Label>
                  <Input
                    id="tags"
                    value={formData.tags}
                    onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="thumbnail_url">Thumbnail URL</Label>
                  <Input
                    id="thumbnail_url"
                    value={formData.thumbnail_url}
                    onChange={(e) => setFormData({ ...formData, thumbnail_url: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="meta_description">Meta Description</Label>
                  <Textarea
                    id="meta_description"
                    value={formData.meta_description}
                    onChange={(e) => setFormData({ ...formData, meta_description: e.target.value })}
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </form>
    </AdminLayout>
  )
}
