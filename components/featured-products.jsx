'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Star, ExternalLink, Building2, CheckCircle } from 'lucide-react'
import Link from 'next/link'

export default function FeaturedProducts() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchFeaturedProducts()
  }, [])

  const fetchFeaturedProducts = async () => {
    try {
      setLoading(true)
      setError(null)



      // Fetch featured products from Supabase
      const { data, error } = await supabase
        .from('products')
        .select(`
          *,
          company:companies(name, slug, website_url, logo_url, verified),
          category:categories(name, slug)
        `)
        .order('created_at', { ascending: false })
        .limit(6)

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
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <Card key={i} className="animate-pulse">
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
            onClick={fetchFeaturedProducts}
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

  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
      {products.map((product) => (
        <Card key={product.id} className="hover:shadow-lg transition-shadow overflow-hidden h-full flex flex-col">
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
            
            {/* Badges */}
            <div className="absolute top-3 left-3 flex gap-2">
              <Badge className="bg-black text-white text-xs px-2 py-1">
                {product.is_verified ? 'Verified' : 'New'}
              </Badge>
              <Badge variant="default" className="bg-blue-600 text-white text-xs px-2 py-1">
                {product.product_kind || 'Tool'}
              </Badge>
            </div>
            
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
            
            {/* Category */}
            <p className="text-sm text-gray-600 mb-3">
              {product.category?.name || 'Uncategorized'}
            </p>
            
            {/* Rating (placeholder for now) */}
            <div className="flex items-center gap-1 mb-4">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="font-medium">4.8</span>
              <span className="text-sm text-gray-500">(120)</span>
            </div>
            
            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-4 flex-1">
              {product.tags && product.tags.slice(0, 2).map((tag, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="text-xs px-3 py-1 min-w-[80px] justify-center truncate"
                >
                  #{tag}
                </Badge>
              ))}
            </div>
            
            {/* Action Button */}
            <div className="flex gap-2 mt-auto">
              <Link href={`/tool/${product.slug || product.id}`} className="flex-1">
                <Button size="sm" className="w-full">
                  View tool
                </Button>
              </Link>
              {product.company?.website_url && (
                <a
                  href={product.company.website_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
