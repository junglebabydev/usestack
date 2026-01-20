"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Sparkles, Star, Zap, ArrowRight } from "lucide-react";

export default function SponsoredTools({ gridCols = 4 }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchSponsoredProducts();
  }, []);

  const fetchSponsoredProducts = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch ads from the ads table where visiblity is true
      const { data: adsData, error: adsError } = await supabase
        .from("ads")
        .select("tool_id")
        .eq("visibility", true)
        .order("created_at", { ascending: false })
        .limit(4);

      if (adsError) {
        console.error("Supabase error fetching ads:", adsError);
        setError(`Database error: ${adsError.message}`);
        return;
      }

      if (!adsData || adsData.length === 0) {
        setProducts([]);
        return;
      }

      // Extract tool IDs from ads
      const toolIds = adsData.map((ad) => ad.tool_id).filter(Boolean);

      if (toolIds.length === 0) {
        setProducts([]);
        return;
      }

      // Fetch the product details for these tool IDs
      const { data: productsData, error: productsError } = await supabase
        .from("products")
        .select(
          `
          *,
          company:companies(name, slug, website_url, logo_url, verified),
          product_categories:product_category_jnc(
            category:categories!product_category_jnc_category_id_fkey(id, name, slug)
          ),
          product_tags:product_tags_jnc(
            tag:tags!product_tags_jnc_tag_id_fkey(id, name, slug)
          )
        `
        )
        .in("id", toolIds);

      if (productsError) {
        console.error("Supabase error fetching sponsored products:", productsError);
        setError(`Database error: ${productsError.message}`);
        return;
      }

      // Sort products to match the order from ads table
      const sortedProducts = toolIds
        .map((id) => productsData?.find((p) => p.id === id))
        .filter(Boolean);

      setProducts(sortedProducts);
    } catch (err) {
      console.error("Error fetching sponsored products:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="py-16 bg-gradient-to-br from-blue-50/50 via-indigo-50/30 to-blue-50/50 border-t border-blue-100/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-xl shadow-lg">
                <Zap className="w-5 h-5 text-white fill-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-1">
                  Sponsored Tools
                </h2>
                <p className="text-gray-500">
                  Premium AI tools recommended by our partners
                </p>
              </div>
            </div>
          </div>
          <div
            className={`grid sm:grid-cols-2 ${
              gridCols === 4 ? "md:grid-cols-4" : "md:grid-cols-3"
            } gap-6`}
          >
            {[...Array(4)].map((_, i) => (
              <Card key={i} className="animate-pulse aspect-square rounded-2xl">
                <div className="h-40 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-t-2xl"></div>
                <CardContent className="p-4">
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded mb-2 w-3/4"></div>
                  <div className="h-5 bg-gray-200 rounded w-1/2"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error || products.length === 0) {
    return null; // Hide the section completely if there's an error or no products
  }

  return (
    <section className="py-16 bg-gradient-to-br from-blue-50/50 via-indigo-50/30 to-blue-50/50 border-t border-blue-100/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 mb-8">
          <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-xl shadow-lg">
            <Zap className="w-5 h-5 text-white fill-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-1">
              Sponsored Tools
            </h2>
            <p className="text-gray-500">
              Premium AI tools recommended by our partners
            </p>
          </div>
        </div>
        <div
          className={`grid sm:grid-cols-2 ${
            gridCols === 4 ? "md:grid-cols-4" : "md:grid-cols-3"
          } gap-6`}
        >
      {products.map((product) => (
        <Link
          key={product.id}
          href={`/tool/${product.slug}`}
          className="block group"
        >
          <Card
            className="bg-white border-2 border-blue-200 hover:shadow-xl hover:border-blue-300 transition-all duration-300 overflow-hidden flex flex-col rounded-2xl cursor-pointer h-full relative"
          >
            {/* Sponsored Badge - Premium feel */}
            <div className="absolute top-3 right-3 z-10">
              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full shadow-lg">
                <Zap className="w-3.5 h-3.5 text-white fill-white" />
                <span className="text-xs font-semibold text-white">Sponsored</span>
              </div>
            </div>

            {/* Tool Screenshot/Thumbnail - Full width with gradient overlay */}
            <div className="h-28 flex-shrink-0 bg-gray-100 relative overflow-hidden">
              {product.tool_thumbnail_url ? (
                <img
                  src={product.tool_thumbnail_url}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              ) : product.banner_url ? (
                <img
                  src={product.banner_url}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-blue-50 via-indigo-50 to-blue-50 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center shadow-lg">
                    <span className="text-white text-xl font-bold">
                      {product.name?.charAt(0)?.toUpperCase() || "?"}
                    </span>
                  </div>
                </div>
              )}
              {/* Subtle gradient overlay at bottom */}
              <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-white/50 to-transparent"></div>
            </div>

            <CardContent className="p-3 flex flex-col flex-1">
              {/* Product Name with star icon */}
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-semibold text-sm text-gray-900 line-clamp-1 group-hover:text-blue-600 transition-colors">
                  {product.name}
                </h3>
                <Star className="w-4 h-4 text-blue-400 fill-blue-400 flex-shrink-0" />
              </div>

              {/* Description */}
              <p className="text-gray-500 text-xs mb-2 line-clamp-2">
                {product.tagline || product.description || "AI-powered tool"}
              </p>

              {/* Category Badge */}
              <div className="mb-1.5 mt-auto">
                {(() => {
                  const categoryName = product?.category?.name || 
                    (product?.product_categories || [])[0]?.category?.name;
                  return categoryName ? (
                    <Badge
                      variant="secondary"
                      className="text-xs px-2 py-1 bg-blue-50 text-blue-700 border-0 rounded-full font-medium"
                    >
                      {categoryName}
                    </Badge>
                  ) : null;
                })()}
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5">
                {(() => {
                  const tagNames = [
                    ...(product?.tags || []),
                    ...(product?.product_tags || [])
                      .map((pt) => pt?.tag?.name)
                      .filter(Boolean),
                  ]
                    .filter(Boolean)
                    .slice(0, 2);

                  return tagNames.map((tag, index) => (
                    <Badge
                      key={`${tag}-${index}`}
                      variant="outline"
                      className="text-xs px-2 py-1 bg-gray-50 text-gray-600 border-gray-200 rounded-full"
                    >
                      {tag}
                    </Badge>
                  ));
                })()}
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
        </div>
      </div>
    </section>
  );
}
