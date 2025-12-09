import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import "./globals.css"
import { Toaster } from "@/components/ui/toaster"
import SessionProvider from "@/components/session-provider"

/**
 * Metadata configuration for the application
 * @type {import('next').Metadata}
 */
export const metadata = {
  title: "obase - Discover the Best AI Tools & Agents",
  description:
    "Find, compare, and choose from thousands of AI-powered tools and agents to supercharge your workflow and boost productivity. Discover curated AI stacks for every use case.",
  keywords:
    "AI tools, AI agents, artificial intelligence, productivity tools, AI marketplace, machine learning tools, automation, AI software",
  authors: [{ name: "obase" }],
  creator: "obase",
  publisher: "obase",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://obase.dev"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "obase - Discover the Best AI Tools & Agents",
    description:
      "Find, compare, and choose from thousands of AI-powered tools and agents to supercharge your workflow and boost productivity.",
    url: "https://obase.dev",
    siteName: "obase",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "obase - Discover the Best AI Tools & Agents",
    description:
      "Find, compare, and choose from thousands of AI-powered tools and agents to supercharge your workflow and boost productivity.",
    creator: "@obase",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
  generator: "v0.dev",
}

/**
 * Root layout component for the application
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components to render
 * @returns {React.ReactElement} Root HTML structure
 */
export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <style>{`
html {
  font-family: ${GeistSans.style.fontFamily};
  --font-sans: ${GeistSans.variable};
  --font-mono: ${GeistMono.variable};
}
        `}</style>
      </head>
      <body suppressHydrationWarning>
        <SessionProvider>
          {children}
        </SessionProvider>
        <Toaster />
      </body>
    </html>
  )
}
