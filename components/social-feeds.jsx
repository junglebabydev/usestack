"use client";

import { useState, useEffect } from "react";

export default function SocialFeeds({ productId, toolName }) {
  const [feeds, setFeeds] = useState({ twitter: [] }); // LinkedIn removed
  const [activeTab, setActiveTab] = useState("twitter");
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(null);

  useEffect(() => {
    const fetchFeeds = async () => {
      try {
        setLoading(true);

        // Fetch Twitter feeds only (LinkedIn removed)
        const twitterResponse = await fetch(
          `/api/social-feeds?productId=${productId}&platform=twitter`
        );
        const twitterData = await twitterResponse.json();

        setFeeds({
          twitter: Array.isArray(twitterData) ? twitterData : [],
        });

        setLastUpdated(new Date().toLocaleString());
      } catch (error) {
        console.error("Error fetching social feeds:", error);
        // Fallback to empty state
        setFeeds({ twitter: [] });
      } finally {
        setLoading(false);
      }
    };

    if (productId) {
      fetchFeeds();
    }
  }, [productId]);

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="flex gap-2">
          <div className="h-10 w-24 bg-gray-200 rounded-full animate-pulse"></div>
          <div className="h-10 w-20 bg-gray-200 rounded-full animate-pulse"></div>
        </div>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="bg-white p-4 rounded-lg border animate-pulse"
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                <div className="h-4 w-20 bg-gray-200 rounded"></div>
                <div className="h-4 w-8 bg-gray-200 rounded"></div>
              </div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab("twitter")}
            className={`px-4 py-2 rounded-full transition-colors ${
              activeTab === "twitter"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            X (Twitter)
          </button>
          {/* LinkedIn tab commented out - functionality removed */}
          {/* <button
            onClick={() => setActiveTab("linkedin")}
            className={`px-4 py-2 rounded-full transition-colors ${
              activeTab === "linkedin"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            LinkedIn
          </button> */}
        </div>

        {lastUpdated && (
          <div className="text-xs text-gray-500">
            Updated: {lastUpdated} •
            <span className="text-blue-600 ml-1">
              {feeds[activeTab][0]?._source === "twitter_api" ||
              feeds[activeTab][0]?._source === "linkedin_api"
                ? "Real social media posts"
                : feeds[activeTab][0]?._source === "rss_feed" ||
                  feeds[activeTab][0]?._source === "third_party_api"
                ? "Real posts from RSS/API"
                : "Simulated content for demonstration"}
            </span>
          </div>
        )}
      </div>

      <div className="space-y-4">
        {feeds[activeTab].length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No social media mentions found for {toolName}
          </div>
        ) : (
          feeds[activeTab].map((post, index) => (
            <div
              key={post.id || index}
              className="bg-white p-4 rounded-lg border hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-2 mb-2">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-semibold ${
                    activeTab === "twitter" ? "bg-blue-500" : "bg-blue-600"
                  }`}
                >
                  {post.author?.charAt(0)?.toUpperCase() || "U"}
                </div>
                <span className="font-semibold text-gray-900">
                  @{post.author}
                </span>
                <span className="text-gray-500 text-sm">{post.time}</span>
              </div>
              <p className="text-gray-800 mb-3">{post.text}</p>
              <div className="flex gap-4 text-sm text-gray-500">
                <span className="flex items-center gap-1">
                  👍 {typeof post.likes === "number" ? post.likes : 0}
                </span>
                <span className="flex items-center gap-1">
                  🔄 {typeof post.shares === "number" ? post.shares : 0}
                </span>
                {post.comments && typeof post.comments === "number" && (
                  <span className="flex items-center gap-1">
                    💬 {post.comments}
                  </span>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
