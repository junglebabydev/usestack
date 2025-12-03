"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function ToolCard({ tool }) {
  const categoryNames = (tool.product_categories || [])
    .map((pc) => pc?.category?.name)
    .filter(Boolean);
  
  const tagNames = [
    ...(tool?.tags || []),
    ...(tool?.product_tags || [])
      .map((pt) => pt?.tag?.name)
      .filter(Boolean),
  ].filter(Boolean).slice(0, 3);

  const handleClick = () => {
    if (tool.website_url) {
      window.open(tool.website_url, '_blank');
    }
  };

  return (
    <Card
      className="hover:shadow-lg transition-shadow overflow-hidden h-[400px] flex flex-col cursor-pointer"
      onClick={handleClick}
    >
      {/* Product Image - Fixed height */}
      <div className="h-48 bg-gradient-to-br from-purple-900 via-blue-900 to-purple-800 rounded-t-lg relative overflow-hidden">
        {tool.tool_thumbnail_url ? (
          <div className="absolute inset-0">
            <img
              src={tool.tool_thumbnail_url}
              alt={`${tool.name} background`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/20"></div>
          </div>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/50 via-blue-900/50 to-purple-800/50 flex items-center justify-center">
            <div className="text-4xl text-white">🚀</div>
          </div>
        )}
      </div>

      <CardContent className="p-6 flex flex-col flex-1 min-h-0">
        {/* Product Name */}
        <h3 className="font-semibold text-lg mb-1 line-clamp-2 flex items-center">
          {tool.name}
        </h3>

        {/* Tagline */}
        <div className="h-10 mb-1">
          {tool.tagline && (
            <p className="text-sm text-gray-600 line-clamp-2">
              {tool.tagline}
            </p>
          )}
        </div>

        {/* Categories as pills */}
        <div className="h-8 mb-2 flex flex-wrap gap-2 overflow-hidden">
          {categoryNames.length === 0 ? (
            <Badge variant="secondary" className="text-xs px-3 py-1">
              Uncategorized
            </Badge>
          ) : (
            categoryNames.slice(0, 2).map((name, idx) => (
              <Badge key={idx} variant="secondary" className="text-xs px-3 py-1">
                {name}
              </Badge>
            ))
          )}
        </div>

        {/* Tags */}
        <div className="flex-1 min-h-0 mb-4">
          <div className="h-14 overflow-hidden">
            <div className="flex flex-wrap gap-2">
              {tagNames.map((tag, index) => (
                <Badge
                  key={`${tag}-${index}`}
                  variant="secondary"
                  className="text-xs px-3 py-1 min-w-[80px] justify-center truncate"
                >
                  #{tag}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
