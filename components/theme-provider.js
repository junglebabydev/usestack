"use client"
import { ThemeProvider as NextThemesProvider } from "next-themes"

/**
 * Theme provider component that wraps the application with theme context
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components
 * @param {Object} [props.otherProps] - Additional props passed to NextThemesProvider
 * @returns {React.ReactElement} Theme provider wrapper
 */
export function ThemeProvider({ children, ...props }) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
