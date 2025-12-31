import { createBrowserClient } from "@supabase/ssr"

// Create a single supabase client for interacting with your database
export const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "",
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY || "",
)
