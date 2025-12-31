// Common constants and configuration values

export const APP_CONFIG = {
  name: "obase",
  description: "Discover AI Tools & Stacks",
  url: "https://obase.com",
  defaultMetadata: {
    title: "obase - Discover AI Tools & Stacks",
    description:
      "Curated collections of AI tools and agents designed to work together. Save time, reduce costs, and boost productivity.",
  },
}

export const ROUTES = {
  home: "/",
  explore: "/explore",
  categories: "/categories",
  stacks: "/stacks",
  submitTool: "/submit-tool",
  waitlist: "/waitlist",
  newsletter: "/newsletter",
  tool: (slug: string) => `/tool/${slug}`,
  stack: (id: string) => `/stack/${id}`,
  category: (slug: string) => `/explore?category=${slug}`,
  admin: {
    dashboard: "/admin",
    tools: "/admin/tools",
    submissions: "/admin/submissions",
    stacks: "/admin/stacks",
    users: "/admin/users",
    waitlist: "/admin/waitlist",
    analytics: "/admin/analytics",
    settings: "/admin/settings",
  },
}

export const SOCIAL_LINKS = {
  twitter: "https://twitter.com/obase",
  github: "https://github.com/obase",
  linkedin: "https://linkedin.com/company/obase",
  discord: "https://discord.gg/obase",
}

export const PAGINATION = {
  defaultPageSize: 12,
  pageSizeOptions: [12, 24, 48, 96],
}
