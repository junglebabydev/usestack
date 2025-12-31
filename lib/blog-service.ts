import { supabase } from "./supabase"
import type { BlogPost, BlogPostWithAuthor, Author, CreateBlogPostInput, UpdateBlogPostInput } from "./types/blog"

export const blogService = {
  // Get published blog posts with pagination
  async getPublishedPosts(limit = 10, offset = 0): Promise<BlogPost[]> {
    const { data, error } = await supabase
      .from("blog_posts")
      .select(`
        *,
        author:authors(*)
      `)
      .eq("is_published", true)
      .order("published_at", { ascending: false })
      .range(offset, offset + limit - 1)

    if (error) throw error
    return data || []
  },

  // Get recent posts for homepage
  async getRecentPosts(limit = 4): Promise<BlogPost[]> {
    return this.getPublishedPosts(limit, 0)
  },

  // Get single blog post by slug
  async getPostBySlug(slug: string): Promise<BlogPostWithAuthor | null> {
    const { data, error } = await supabase
      .from("blog_posts")
      .select(`
        *,
        author:authors(*),
        related_tools:blog_post_tools(
          product:products(*)
        ),
        related_stacks:blog_post_stacks(
          stack:stacks(*)
        )
      `)
      .eq("slug", slug)
      .eq("is_published", true)
      .single()

    if (error) throw error

    // Increment view count
    if (data) {
      await this.incrementViewCount(data.id)
    }

    return data
  },

  // Get posts by category
  async getPostsByCategory(category: string, limit = 10): Promise<BlogPost[]> {
    const { data, error } = await supabase
      .from("blog_posts")
      .select(`
        *,
        author:authors(*)
      `)
      .eq("category", category)
      .eq("is_published", true)
      .order("published_at", { ascending: false })
      .limit(limit)

    if (error) throw error
    return data || []
  },

  // Get posts by tag
  async getPostsByTag(tag: string, limit = 10): Promise<BlogPost[]> {
    const { data, error } = await supabase
      .from("blog_posts")
      .select(`
        *,
        author:authors(*)
      `)
      .contains("tags", [tag])
      .eq("is_published", true)
      .order("published_at", { ascending: false })
      .limit(limit)

    if (error) throw error
    return data || []
  },

  // Search blog posts
  async searchPosts(query: string): Promise<BlogPost[]> {
    const { data, error } = await supabase
      .from("blog_posts")
      .select(`
        *,
        author:authors(*)
      `)
      .or(`title.ilike.%${query}%,summary.ilike.%${query}%,content.ilike.%${query}%`)
      .eq("is_published", true)
      .order("published_at", { ascending: false })
      .limit(10)

    if (error) throw error
    return data || []
  },

  // Increment view count
  async incrementViewCount(postId: string): Promise<void> {
    await supabase.rpc("increment_blog_view_count", { post_id: postId })
  },

  // Admin functions
  async getAllPosts(): Promise<BlogPost[]> {
    const { data, error } = await supabase
      .from("blog_posts")
      .select(`
        *,
        author:authors(*)
      `)
      .order("created_at", { ascending: false })

    if (error) throw error
    return data || []
  },

  async createPost(input: CreateBlogPostInput): Promise<BlogPost> {
    const { data, error } = await supabase.from("blog_posts").insert(input).select().single()

    if (error) throw error
    return data
  },

  async updatePost(input: UpdateBlogPostInput): Promise<BlogPost> {
    const { id, ...updates } = input
    const { data, error } = await supabase.from("blog_posts").update(updates).eq("id", id).select().single()

    if (error) throw error
    return data
  },

  async deletePost(postId: string): Promise<void> {
    const { error } = await supabase.from("blog_posts").delete().eq("id", postId)

    if (error) throw error
  },

  // Author functions
  async getAllAuthors(): Promise<Author[]> {
    const { data, error } = await supabase.from("authors").select("*").order("name")

    if (error) throw error
    return data || []
  },

  async createAuthor(author: Omit<Author, "id" | "created_at" | "updated_at">): Promise<Author> {
    const { data, error } = await supabase.from("authors").insert(author).select().single()

    if (error) throw error
    return data
  },
}

// Helper function to calculate reading time
export function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200
  const wordCount = content.trim().split(/\s+/).length
  return Math.ceil(wordCount / wordsPerMinute)
}

// Helper function to generate slug from title
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
}
