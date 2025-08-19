'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Building2, CheckCircle } from 'lucide-react'
import Link from 'next/link'

export default function FeaturedProducts({ showRating = true, gridCols = 3, showAll = false, selectedCategories = [], selectedTags = [], searchQuery = "" }) {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchAllProducts()
  }, [])

  const fetchAllProducts = async () => {
    try {
      setLoading(true)
      setError(null)



      // Fetch all products from Supabase
      const { data, error } = await supabase
        .from('products')
        .select(`
          *,
          company:companies(name, slug, website_url, logo_url, verified),
          product_categories:product_categories(
            category:categories(id, name, slug)
          ),
          product_tags:product_tags(
            tag:tags(id, name, slug)
          )
        `)
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Error fetching products:', error)
        setError(error.message)
        return
      }

      setProducts(data || [])
    } catch (err) {
      console.error('Error:', err)
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className={`grid sm:grid-cols-2 ${gridCols === 2 ? 'md:grid-cols-2' : 'md:grid-cols-3'} gap-6`}>
        {[...Array(12)].map((_, i) => (
          <Card key={i} className="animate-pulse h-[500px]">
            <div className="aspect-video bg-gray-200 rounded-t-lg"></div>
            <CardContent className="p-6">
              <div className="h-4 bg-gray-200 rounded mb-2"></div>
              <div className="h-6 bg-gray-200 rounded mb-4"></div>
              <div className="h-4 bg-gray-200 rounded mb-2"></div>
              <div className="h-4 bg-gray-200 rounded"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <div className="bg-red-50 border border-red-200 rounded-md p-4">
          <p className="text-red-700">Error loading products: {error}</p>
          <button 
            onClick={fetchAllProducts}
            className="mt-2 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No products found. Please check your database.</p>
      </div>
    )
  }

  // Filter products based on selected categories, tags, and search query
  const filteredProducts = products.filter(product => {
    // Filter by search query if provided
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim()
      const productName = product.name?.toLowerCase() || ""
      const productDescription = product.description?.toLowerCase() || ""
      const productTagline = product.tagline?.toLowerCase() || ""
      const productCategory = product.category?.name?.toLowerCase() || ""
      const productCategoryList = (product.product_categories || [])
        .map(pc => pc.category?.name?.toLowerCase())
        .filter(Boolean)
      const productTags = product.tags?.map(tag => tag.toLowerCase()) || []
      
      const hasMatch = 
        productName.includes(query) ||
        productDescription.includes(query) ||
        productTagline.includes(query) ||
        productCategory.includes(query) ||
        productCategoryList.some(c => c.includes(query)) ||
        productTags.some(tag => tag.includes(query))
      
      if (!hasMatch) {
        return false
      }
    }
    
    // Filter by categories if any are selected
    if (selectedCategories.length > 0) {
      const candidateValues = [
        product.category?.name,
        product.category?.slug,
        ...(product.product_categories || []).flatMap(pc => [pc.category?.name, pc.category?.slug])
      ]
        .filter(Boolean)
        .map(v => String(v).toLowerCase())

      const selectedLower = selectedCategories.map(v => String(v).toLowerCase())
      const matchesAny = candidateValues.some(v => selectedLower.includes(v))
      if (!matchesAny) return false
    }
    
    // Filter by tags if any are selected
    if (selectedTags.length > 0) {
      const productTagNames = [
        ...(Array.isArray(product.tags) ? product.tags : []),
        ...((product.product_tags || []).map(pt => pt?.tag?.name).filter(Boolean))
      ].map(t => String(t).toLowerCase())

      if (productTagNames.length === 0) {
        return false
      }

      const selectedLower = selectedTags.map(t => String(t).toLowerCase())
      const hasMatchingTag = selectedLower.some(tag => productTagNames.includes(tag))
      if (!hasMatchingTag) {
        return false
      }
    }
    
    return true
  })

  return (
    <>
      <div className={`grid sm:grid-cols-2 ${gridCols === 2 ? 'md:grid-cols-2' : 'md:grid-cols-3'} gap-6`}>
        {(showAll ? filteredProducts : filteredProducts.slice(0, 6)).map((product) => (
        <Card key={product.id} className="hover:shadow-lg transition-shadow overflow-hidden h-[500px] flex flex-col">
          {/* Product Image */}
          <div className="aspect-video bg-gradient-to-br from-purple-900 via-blue-900 to-purple-800 rounded-t-lg relative overflow-hidden">
            {product.banner_url ? (
              <img
                src={product.banner_url}
                alt={product.name}
                className="w-full h-full object-cover opacity-80"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <div className="text-white text-center">
                  <div className="text-4xl mb-2">🚀</div>
                  <div className="text-sm opacity-80">{product.name}</div>
                </div>
              </div>
            )}
            
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-900/50 via-blue-900/50 to-purple-800/50"></div>
            

            
            {/* Product Name Overlay */}
            <div className="absolute bottom-3 left-3 right-3">
              <div className="flex items-center gap-2 text-white">
                <div className="w-6 h-6 bg-white/20 rounded flex items-center justify-center text-xs">AI</div>
                <span className="text-sm font-medium line-clamp-1">{product.name}</span>
              </div>
            </div>
          </div>
          
          <CardContent className="p-6 flex flex-col flex-1">
            {/* Company Info */}
            <div className="flex items-center gap-2 mb-2">
              {product.company?.logo_url ? (
                <img 
                  src={product.company.logo_url} 
                  alt={product.company.name}
                  className="w-4 h-4 rounded"
                />
              ) : (
                <Building2 className="w-4 h-4 text-gray-400" />
              )}
              <span className="text-sm text-gray-500">
                {product.company?.name || 'Unknown Company'}
              </span>
              {product.company?.verified && (
                <CheckCircle className="w-4 h-4 text-green-500" />
              )}
            </div>
            
            {/* Product Name */}
            <h3 className="font-semibold text-lg mb-2 line-clamp-2">{product.name}</h3>
            
            {/* Tagline */}
            {product.tagline && (
              <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                {product.tagline}
              </p>
            )}
            
            {/* Categories as pills */}
            <div className="flex flex-wrap gap-2 mb-3">
              {(() => {
                const names = [
                  product?.category?.name,
                  ...(product?.product_categories || [])
                    .map(pc => pc?.category?.name)
                    .filter(Boolean)
                ].filter(Boolean)
                if (names.length === 0) {
                  return (
                    <Badge variant="secondary" className="text-xs px-3 py-1">Uncategorized</Badge>
                  )
                }
                return names.slice(0, 2).map((name, idx) => (
                  <Badge key={idx} variant="secondary" className="text-xs px-3 py-1">
                    {name}
                  </Badge>
                ))
              })()}
            </div>
            

            
            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-4 flex-1">
              {(() => {
                const tagNames = [
                  ...(product?.tags || []), // legacy array of strings
                  ...((product?.product_tags || [])
                    .map(pt => pt?.tag?.name)
                    .filter(Boolean))
                ]
                  .filter(Boolean)
                  .slice(0, 4)

                return tagNames.map((tag, index) => (
                  <Badge
                    key={`${tag}-${index}`}
                    variant="secondary"
                    className="text-xs px-3 py-1 min-w-[80px] justify-center truncate"
                  >
                    #{tag}
                  </Badge>
                ))
              })()}
            </div>
            
            {/* Action Button */}
            <div className="mt-auto">
              <Link href={`/tool/${product.slug || product.id}`} className="block">
                <Button size="sm" className="w-full">
                  View tool
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      ))}
      </div>
      

    </>
  )
}
