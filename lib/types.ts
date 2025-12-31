// Domain types for the AI tool discovery platform

export interface Tool {
  id: string
  slug: string
  name: string
  tagline: string
  description: string
  website_url: string
  logo_url?: string
  banner_url?: string
  tool_thumbnail_url?: string
  is_verified: boolean
  tags: Tag[]
  company?: Company
  categories: Category[]
  subcategories: SubCategory[]
  created_at: string
  updated_at: string
}

export interface Company {
  id: string
  slug: string
  name: string
  website_url?: string
  logo_url?: string
  verified: boolean
  team_size?: number
  funding_round?: string
  funding_amount?: number
  funding_info?: string
  founded_year?: number
}

export interface Category {
  id: string
  slug: string
  name: string
  description?: string
  count?: number
  icon?: string
}

export interface SubCategory {
  id: string
  slug: string
  name: string
  category_id: string
  count?: number
}

export interface Tag {
  id: string
  slug: string
  name: string
}

export interface Stack {
  id: string
  slug: string
  name: string
  description: string
  color?: string
  tools: Tool[]
  created_by?: string
  use_case?: string
  total_tools?: number
  average_rating?: number
  active_users?: number
  last_updated_days?: number
  created_at: string
  updated_at: string
}

export interface Submission {
  id: string
  tool_name: string
  tagline?: string
  description?: string
  website_url: string
  logo_url?: string
  company_name?: string
  company_website?: string
  categories: string[]
  subcategories: string[]
  tags: string[]
  submitter_name: string
  submitter_email: string
  submitter_message?: string
  status: "pending" | "approved" | "rejected"
  rejection_reason?: string
  submitted_at: string
  reviewed_at?: string
}

export interface User {
  id: string
  email: string
  name?: string
  role: "admin" | "user"
  created_at: string
}

export interface WaitlistEntry {
  id: string
  email: string
  name?: string
  message?: string
  created_at: string
}

export interface Workflow {
  id: string
  user_id?: string
  title: string
  description: string
  query: string
  steps: WorkflowStep[]
  tools: Tool[]
  created_at: string
  is_saved: boolean
}

export interface WorkflowStep {
  step: number
  title: string
  description: string
  tool_ids: string[]
  tips: string[]
}
