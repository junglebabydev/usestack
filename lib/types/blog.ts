export interface Author {
  id: string
  name: string
  email: string
  bio?: string
  avatar_url?: string
  twitter_handle?: string
  linkedin_url?: string
  website_url?: string
  created_at: string
  updated_at: string
}

export interface BlogPost {
  id: string
  slug: string
  title: string
  summary: string
  content: string
  thumbnail_url?: string
  author_id?: string
  category?: string
  tags: string[]
  meta_description?: string
  reading_time_minutes?: number
  published_at?: string
  is_published: boolean
  view_count: number
  created_at: string
  updated_at: string
  // Joined data
  author?: Author
  related_tools?: any[]
  related_stacks?: any[]
}

export interface BlogPostWithAuthor extends BlogPost {
  author: Author
}

export interface CreateBlogPostInput {
  title: string
  slug: string
  summary: string
  content: string
  thumbnail_url?: string
  author_id: string
  category?: string
  tags?: string[]
  meta_description?: string
  reading_time_minutes?: number
  is_published?: boolean
  published_at?: string
}

export interface UpdateBlogPostInput extends Partial<CreateBlogPostInput> {
  id: string
}
