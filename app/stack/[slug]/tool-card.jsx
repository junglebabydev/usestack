"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export default function ToolCard({ tool }) {
  const categoryName = (tool.product_categories || [])[0]?.category?.name;
  
  const tagNames = [
    ...(tool?.tags || []),
    ...(tool?.product_tags || [])
      .map((pt) => pt?.tag?.name)
      .filter(Boolean),
  ].filter(Boolean).slice(0, 2);

  return (
    <Link href={`/tool/${tool.slug || tool.id}`} className="block h-full">
      <Card className="bg-white border border-gray-200 hover:shadow-lg hover:border-blue-200 transition-all duration-300 overflow-hidden flex flex-col rounded-2xl cursor-pointer h-full">
        {/* Tool Screenshot/Thumbnail */}
        <div className="h-28 flex-shrink-0 bg-gray-100 relative overflow-hidden">
          {tool.tool_thumbnail_url ? (
            <img
              src={tool.tool_thumbnail_url}
              alt={tool.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                <span className="text-white text-xl font-bold">
                  {tool.name?.charAt(0)?.toUpperCase() || "?"}
                </span>
              </div>
            </div>
          )}
        </div>

        <CardContent className="p-3 flex flex-col flex-1">
          {/* Product Name */}
          <h3 className="font-semibold text-sm text-gray-900 mb-1 line-clamp-1">
            {tool.name}
          </h3>

          {/* Description */}
          <p className="text-gray-500 text-xs mb-2 line-clamp-2">
            {tool.tagline || "AI-powered tool"}
          </p>

          {/* Category Badge */}
          {categoryName && (
            <div className="mb-1.5 mt-auto">
              <Badge
                variant="secondary"
                className="text-xs px-2 py-1 bg-gray-100 text-gray-700 border-0 rounded-full font-medium"
              >
                {categoryName}
              </Badge>
            </div>
          )}

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5">
            {tagNames.map((tag, index) => (
              <Badge
                key={`${tag}-${index}`}
                variant="outline"
                className="text-xs px-2 py-1 bg-gray-50 text-gray-600 border-gray-200 rounded-full"
              >
                {tag}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
