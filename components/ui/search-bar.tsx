"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { Search } from "lucide-react"
import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"

export interface SearchBarProps extends React.InputHTMLAttributes<HTMLInputElement> {
  containerClassName?: string
  redirectOnSearch?: boolean
  onSearch?: (value: string) => void
}

const SearchBar = React.forwardRef<HTMLInputElement, SearchBarProps>(
  (
    { className, containerClassName, redirectOnSearch = true, onSearch, value: controlledValue, onChange, ...props },
    ref,
  ) => {
    const [internalValue, setInternalValue] = React.useState("")
    const router = useRouter()

    const value = controlledValue !== undefined ? controlledValue : internalValue
    const isControlled = controlledValue !== undefined

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault()
      const searchValue = typeof value === "string" ? value : ""

      if (onSearch) {
        onSearch(searchValue)
      } else if (searchValue.trim() && redirectOnSearch) {
        router.push(`/explore?q=${encodeURIComponent(searchValue)}`)
      }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!isControlled) {
        setInternalValue(e.target.value)
      }
      onChange?.(e)
    }

    return (
      <form onSubmit={handleSubmit} className={cn("relative w-full", containerClassName)}>
        <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          ref={ref}
          type="search"
          className={cn("pl-9", className)}
          value={value}
          onChange={handleChange}
          {...props}
        />
      </form>
    )
  },
)
SearchBar.displayName = "SearchBar"

export { SearchBar }
