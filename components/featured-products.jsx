"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export default function FeaturedProducts({
  showRating = true,
  gridCols = 3,
  showAll = false,
  selectedCategories = [],
  selectedTags = [],
  searchQuery = "",
  onFilteredCountChange = null,
  onSearchQueryChange = null,
}) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAllProducts();
  }, []);

  // Notify parent component of filtered count changes
  useEffect(() => {
    if (onFilteredCountChange && products.length > 0) {
      const filteredProducts = products.filter((product) => {
        // Filter by search query if provided
        if (searchQuery.trim()) {
          const query = searchQuery.toLowerCase().trim();
          const productName = product.name?.toLowerCase() || "";
          const productDescription = product.description?.toLowerCase() || "";
          const productTagline = product.tagline?.toLowerCase() || "";
          const productCategory = product.category?.name?.toLowerCase() || "";
          const productCategoryList = (product.product_categories || [])
            .map((pc) => pc.category?.name?.toLowerCase())
            .filter(Boolean);
          const productTags =
            product.tags?.map((tag) => tag.toLowerCase()) || [];

          const hasMatch =
            productName.includes(query) ||
            productDescription.includes(query) ||
            productTagline.includes(query) ||
            productCategory.includes(query) ||
            productCategoryList.some((c) => c.includes(query)) ||
            productTags.some((tag) => tag.includes(query));

          if (!hasMatch) {
            return false;
          }
        }

        // Filter by categories if any are selected
        if (selectedCategories.length > 0) {
          const candidateValues = [
            product.category?.name,
            product.category?.slug,
            ...(product.product_categories || []).flatMap((pc) => [
              pc.category?.name,
              pc.category?.slug,
            ]),
          ]
            .filter(Boolean)
            .map((v) => String(v).toLowerCase());

          const selectedLower = selectedCategories.map((v) =>
            String(v).toLowerCase()
          );
          const matchesAny = candidateValues.some((v) =>
            selectedLower.includes(v)
          );
          if (!matchesAny) return false;
        }

        // Filter by tags if any are selected
        if (selectedTags.length > 0) {
          const productTagNames = [
            ...(Array.isArray(product.tags) ? product.tags : []),
            ...(product.product_tags || [])
              .map((pt) => pt?.tag?.name)
              .filter(Boolean),
          ].map((t) => String(t).toLowerCase());

          if (productTagNames.length === 0) {
            return false;
          }

          const selectedLower = selectedTags.map((t) =>
            String(t).toLowerCase()
          );
          const hasMatchingTag = selectedLower.some((tag) =>
            productTagNames.includes(tag)
          );
          if (!hasMatchingTag) {
            return false;
          }
        }

        return true;
      });

      onFilteredCountChange(filteredProducts.length);
    }
  }, [
    products,
    selectedCategories,
    selectedTags,
    searchQuery,
    onFilteredCountChange,
  ]);

  const fetchAllProducts = async () => {
    try {
      setLoading(true);
      setError(null);

      // Check if Supabase is properly configured
      if (
        !process.env.NEXT_PUBLIC_SUPABASE_URL ||
        !process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY
      ) {
        throw new Error(
          "Supabase environment variables are not configured. Please check your .env.local file."
        );
      }

      // Fetch all products from Supabase
      const { data, error } = await supabase
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
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Supabase error fetching products:", error);
        setError(`Database error: ${error.message}`);
        return;
      }

      console.log("Successfully fetched products:", data?.length || 0);
      setProducts(data || []);
    } catch (err) {
      console.error("Error fetching products:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div
        className={`grid sm:grid-cols-2 ${
          gridCols === 4 ? "md:grid-cols-4" : gridCols === 2 ? "md:grid-cols-2" : "md:grid-cols-3"
        } gap-6`}
      >
        {[...Array(gridCols === 4 ? 8 : 12)].map((_, i) => (
          <Card key={i} className="animate-pulse aspect-square rounded-2xl">
            <div className="h-40 bg-gray-200 rounded-t-2xl"></div>
            <CardContent className="p-4">
              <div className="h-4 bg-gray-200 rounded mb-2"></div>
              <div className="h-3 bg-gray-200 rounded mb-2 w-3/4"></div>
              <div className="h-5 bg-gray-200 rounded w-1/2"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <div className="bg-red-50 border border-red-200 rounded-md p-4 max-w-2xl mx-auto">
          <h3 className="text-red-800 font-semibold mb-2">
            Error loading products
          </h3>
          <p className="text-red-700 mb-4">{error}</p>
          {error.includes("environment variables") && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-md p-3 mb-4 text-left">
              <p className="text-yellow-800 text-sm">
                <strong>Setup required:</strong> Create a{" "}
                <code>.env.local</code> file in your project root with:
              </p>
              <pre className="text-xs text-yellow-700 mt-2 bg-yellow-100 p-2 rounded">
                {`NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY=your_supabase_anon_key_here`}
              </pre>
            </div>
          )}
          <button
            onClick={fetchAllProducts}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">
          No products found. Please check your database.
        </p>
      </div>
    );
  }

  // Filter products based on selected categories, tags, and search query
  const filteredProducts = products.filter((product) => {
    // Filter by search query if provided
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      const productName = product.name?.toLowerCase() || "";
      const productDescription = product.description?.toLowerCase() || "";
      const productTagline = product.tagline?.toLowerCase() || "";
      const productCategory = product.category?.name?.toLowerCase() || "";
      const productCategoryList = (product.product_categories || [])
        .map((pc) => pc.category?.name?.toLowerCase())
        .filter(Boolean);
      const productTags = product.tags?.map((tag) => tag.toLowerCase()) || [];

      const hasMatch =
        productName.includes(query) ||
        productDescription.includes(query) ||
        productTagline.includes(query) ||
        productCategory.includes(query) ||
        productCategoryList.some((c) => c.includes(query)) ||
        productTags.some((tag) => tag.includes(query));

      if (!hasMatch) {
        return false;
      }
    }

    // Filter by categories if any are selected
    if (selectedCategories.length > 0) {
      const candidateValues = [
        product.category?.name,
        product.category?.slug,
        ...(product.product_categories || []).flatMap((pc) => [
          pc.category?.name,
          pc.category?.slug,
        ]),
      ]
        .filter(Boolean)
        .map((v) => String(v).toLowerCase());

      const selectedLower = selectedCategories.map((v) =>
        String(v).toLowerCase()
      );
      const matchesAny = candidateValues.some((v) => selectedLower.includes(v));
      if (!matchesAny) return false;
    }

    // Filter by tags if any are selected
    if (selectedTags.length > 0) {
      const productTagNames = [
        ...(Array.isArray(product.tags) ? product.tags : []),
        ...(product.product_tags || [])
          .map((pt) => pt?.tag?.name)
          .filter(Boolean),
      ].map((t) => String(t).toLowerCase());

      if (productTagNames.length === 0) {
        return false;
      }

      const selectedLower = selectedTags.map((t) => String(t).toLowerCase());
      const hasMatchingTag = selectedLower.some((tag) =>
        productTagNames.includes(tag)
      );
      if (!hasMatchingTag) {
        return false;
      }
    }

    return true;
  });

  // Calculate Levenshtein distance for fuzzy matching
  const levenshteinDistance = (str1, str2) => {
    const matrix = [];
    for (let i = 0; i <= str2.length; i++) {
      matrix[i] = [i];
    }
    for (let j = 0; j <= str1.length; j++) {
      matrix[0][j] = j;
    }
    for (let i = 1; i <= str2.length; i++) {
      for (let j = 1; j <= str1.length; j++) {
        if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
          matrix[i][j] = matrix[i - 1][j - 1];
        } else {
          matrix[i][j] = Math.min(
            matrix[i - 1][j - 1] + 1,
            matrix[i][j - 1] + 1,
            matrix[i - 1][j] + 1
          );
        }
      }
    }
    return matrix[str2.length][str1.length];
  };

  // Generate search suggestions based on product names
  const generateSuggestions = (query) => {
    if (!query || query.length < 3) return [];

    const suggestions = [];
    const queryLower = query.toLowerCase();

    // Common AI tool names for fallback suggestions
    const commonTools = [
      "ChatGPT",
      "Claude",
      "Gemini",
      "Perplexity",
      "Midjourney",
      "DALL-E",
      "Stable Diffusion",
      "Jasper",
      "Copy.ai",
      "Notion AI",
      "Grammarly",
      "Otter.ai",
      "Descript",
      "Runway",
      "Figma",
      "Canva",
      "Loom",
    ];

    // Find products with similar names using multiple strategies
    products.forEach((product) => {
      const name = product.name?.toLowerCase() || "";
      if (!name) return;

      let score = 0;
      let shouldInclude = false;

      // Strategy 1: Exact substring match (highest priority)
      if (name.includes(queryLower)) {
        score = 100;
        shouldInclude = true;
      }
      // Strategy 2: Word starts with query
      else if (name.split(" ").some((word) => word.startsWith(queryLower))) {
        score = 80;
        shouldInclude = true;
      }
      // Strategy 3: Fuzzy matching with Levenshtein distance
      else {
        const words = name.split(" ");
        for (const word of words) {
          if (word.length >= 3) {
            const distance = levenshteinDistance(queryLower, word);
            const maxDistance = Math.max(1, Math.floor(word.length / 3));
            if (distance <= maxDistance) {
              score = Math.max(score, 60 - distance * 10);
              shouldInclude = true;
            }
          }
        }
      }

      // Strategy 4: Character-based similarity (for typos like "chatkpt" → "chatgpt")
      if (!shouldInclude && queryLower.length >= 4) {
        const commonChars = queryLower
          .split("")
          .filter((char) => name.includes(char));
        const similarity = commonChars.length / queryLower.length;
        if (similarity >= 0.6) {
          score = Math.max(score, similarity * 40);
          shouldInclude = true;
        }
      }

      if (shouldInclude && score > 0) {
        suggestions.push({ name: product.name, score });
      }
    });

    // Sort by score and get top suggestions
    let topSuggestions = suggestions
      .sort((a, b) => b.score - a.score)
      .slice(0, 3)
      .map((item) => item.name);

    // If we don't have enough suggestions, add common tools that match the query
    if (topSuggestions.length < 3) {
      commonTools.forEach((tool) => {
        const toolLower = tool.toLowerCase();
        if (topSuggestions.length >= 3) return;

        // Check if tool matches the query using similar logic
        let shouldAdd = false;

        if (
          toolLower.includes(queryLower) ||
          toolLower.split(" ").some((word) => word.startsWith(queryLower))
        ) {
          shouldAdd = true;
        } else if (queryLower.length >= 4) {
          const commonChars = queryLower
            .split("")
            .filter((char) => toolLower.includes(char));
          const similarity = commonChars.length / queryLower.length;
          if (similarity >= 0.6) {
            shouldAdd = true;
          }
        }

        if (shouldAdd && !topSuggestions.includes(tool)) {
          topSuggestions.push(tool);
        }
      });
    }

    return topSuggestions.slice(0, 3);
  };

  // Show no results message with suggestions if no products found
  if (
    filteredProducts.length === 0 &&
    (selectedCategories.length > 0 ||
      selectedTags.length > 0 ||
      searchQuery.trim())
  ) {
    const suggestions = searchQuery.trim()
      ? generateSuggestions(searchQuery)
      : [];

    return (
      <div className="text-center py-12">
        <div className="max-w-md mx-auto">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            No tools found
          </h3>
          <p className="text-gray-600 mb-6">
            We couldn't find any tools matching your search criteria.
          </p>

          {suggestions.length > 0 && (
            <div className="text-left">
              <p className="text-sm font-medium text-gray-700 mb-3">
                Did you mean:
              </p>
              <div className="space-y-2">
                {suggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      if (onSearchQueryChange) {
                        onSearchQueryChange(suggestion);
                      }
                    }}
                    className="block w-full text-left px-4 py-2 bg-gray-50 hover:bg-gray-100 rounded-lg text-sm text-gray-700 transition-colors"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="mt-6">
            <p className="text-sm text-gray-500 mb-4">
              Try adjusting your search or filters:
            </p>
            <ul className="text-sm text-gray-500 space-y-1">
              <li>• Check your spelling</li>
              <li>• Try different keywords</li>
              <li>• Remove some filters</li>
              <li>• Browse by category instead</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

  // Determine how many products to show based on gridCols
  const displayCount = gridCols === 4 ? 4 : (showAll ? filteredProducts.length : 6);
  const displayProducts = showAll ? filteredProducts : filteredProducts.slice(0, displayCount);

  return (
    <>
      <div
        className={`grid sm:grid-cols-2 ${
          gridCols === 4 ? "md:grid-cols-4" : gridCols === 2 ? "md:grid-cols-2" : "md:grid-cols-3"
        } gap-6`}
      >
        {displayProducts.map((product) => (
          <Link
            key={product.id}
            href={`/tool/${product.slug}`}
            className="block"
          >
            <Card
              className="bg-white border border-gray-200 hover:shadow-lg hover:border-blue-200 transition-all duration-300 overflow-hidden flex flex-col rounded-2xl cursor-pointer h-full"
            >
              {/* Tool Screenshot/Thumbnail - Full width */}
              <div className="h-28 flex-shrink-0 bg-gray-100 relative overflow-hidden">
                {product.tool_thumbnail_url ? (
                  <img
                    src={product.tool_thumbnail_url}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                ) : product.banner_url ? (
                  <img
                    src={product.banner_url}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                      <span className="text-white text-xl font-bold">
                        {product.name?.charAt(0)?.toUpperCase() || "?"}
                      </span>
                    </div>
                  </div>
                )}
              </div>

              <CardContent className="p-3 flex flex-col flex-1">
                {/* Product Name */}
                <h3 className="font-semibold text-sm text-gray-900 mb-1 line-clamp-1">
                  {product.name}
                </h3>

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
                        className="text-xs px-2 py-1 bg-gray-100 text-gray-700 border-0 rounded-full font-medium"
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
    </>
  );
}
