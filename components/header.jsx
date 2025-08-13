"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ChevronDown } from "lucide-react"
import { categories } from "@/lib/data"

export default function Header() {
  const [showDropdown, setShowDropdown] = useState(false)

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">×</span>
              </div>
              <span className="text-xl font-bold text-gray-900">obase</span>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-gray-900 font-medium">
              Featured AI Tools & Agents
            </Link>

            {/* Categories Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setShowDropdown(true)}
              onMouseLeave={() => setShowDropdown(false)}
            >
              <button className="flex items-center text-gray-700 hover:text-gray-900 font-medium">
                Categories
                <ChevronDown className="ml-1 h-4 w-4" />
              </button>

              {showDropdown && (
                <div className="absolute top-full left-0 mt-1 w-64 bg-white rounded-md shadow-lg border border-gray-200 py-2 z-50">
                  {categories.map((category) => (
                    <Link
                      key={category.id}
                      href={`/categories?category=${category.id}`}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                    >
                      {category.name}
                    </Link>
                  ))}
                  <div className="border-t border-gray-100 mt-2 pt-2">
                    <Link
                      href="/categories"
                      className="block px-4 py-2 text-sm font-medium text-blue-600 hover:bg-gray-50"
                    >
                      View All Categories
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/** Newsletter temporarily hidden. Keep markup commented for easy re-enable.
            <Link href="/newsletter" className="text-gray-700 hover:text-gray-900 font-medium">
              Newsletter
            </Link>
            */}
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center space-x-3">
            <Link href="/submit-tool">
              <Button variant="default" size="sm" className="bg-blue-600 hover:bg-blue-700">
                Submit Tool
              </Button>
            </Link>
            <Button variant="outline" size="sm">
              Login / Sign up
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
