import {
  type LucideIcon,
  FileText,
  ImageIcon,
  Code,
  Megaphone,
  Zap,
  BarChart3,
  Video,
  Music,
  Brain,
  Users,
  Mail,
  ShoppingCart,
  Briefcase,
  GraduationCap,
  Heart,
} from "lucide-react"

// Map category slugs to their corresponding icons
export const categoryIcons: Record<string, LucideIcon> = {
  "text-generation": FileText,
  "image-generation": ImageIcon,
  "developer-tools": Code,
  marketing: Megaphone,
  productivity: Zap,
  "data-analytics": BarChart3,
  "video-generation": Video,
  "audio-generation": Music,
  "ai-agents": Brain,
  "customer-support": Users,
  "email-marketing": Mail,
  "e-commerce": ShoppingCart,
  business: Briefcase,
  education: GraduationCap,
  healthcare: Heart,
}

// Get icon for a category slug, with fallback
export function getCategoryIcon(slug: string): LucideIcon {
  return categoryIcons[slug] || Brain
}
