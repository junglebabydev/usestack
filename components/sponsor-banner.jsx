"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { ExternalLink } from "lucide-react";

export default function SponsorBanner() {
  const [sponsor, setSponsor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSponsor = async () => {
      try {
        const { data, error } = await supabase
          .from("company_ads")
          .select("company_name, thumbnail_url, company_url, description, visibility")
          .eq("visibility", true)
          .limit(1);

        console.log("Company ads data:", data, "Error:", error);

        if (error) {
          console.error("Error fetching company ads:", error);
          setError(error.message);
        } else if (data && data.length > 0) {
          setSponsor(data[0]);
        }
      } catch (err) {
        console.error("Error fetching sponsor:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSponsor();
  }, []);

  // Don't show anything if no sponsor data
  if (!loading && !sponsor) {
    return null;
  }

  if (loading) {
    return (
      <section className="py-8 bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="max-w-[95%] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-40 bg-gray-200 rounded-2xl"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-8 bg-gradient-to-r from-blue-50 to-indigo-50">
      <div className="max-w-[95%] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-4">
          <span className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full uppercase tracking-wide">
            Sponsored Label
          </span>
        </div>
        
        <a
          href={sponsor.company_url}
          target="_blank"
          rel="noopener noreferrer"
          className="block group"
        >
          <div className="relative overflow-hidden rounded-2xl bg-white border border-gray-200 hover:shadow-xl transition-all duration-300 cursor-pointer">
            {/* Banner Image */}
            {sponsor.thumbnail_url && (
              <div className="relative w-full h-64 sm:h-80 md:h-96 overflow-hidden">
                <img
                  src={sponsor.thumbnail_url}
                  alt={sponsor.company_name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* Content Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-2xl sm:text-3xl font-bold mb-2 text-gray-900">
                        {sponsor.company_name}
                      </h3>
                      {sponsor.description && (
                        <p className="text-sm sm:text-base text-gray-700 max-w-2xl line-clamp-2">
                          {sponsor.description}
                        </p>
                      )}
                    </div>
                    <div className="hidden sm:flex items-center gap-2 bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-full text-sm font-medium text-white transition-colors">
                      Visit Website
                      <ExternalLink className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Fallback if no thumbnail */}
            {!sponsor.thumbnail_url && (
              <div className="p-8 flex items-center justify-between bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
                <div>
                  <h3 className="text-2xl sm:text-3xl font-bold mb-2">
                    {sponsor.company_name}
                  </h3>
                  {sponsor.description && (
                    <p className="text-sm sm:text-base text-blue-100 max-w-2xl">
                      {sponsor.description}
                    </p>
                  )}
                </div>
                <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium group-hover:bg-white/30 transition-colors">
                  Visit Website
                  <ExternalLink className="w-4 h-4" />
                </div>
              </div>
            )}
          </div>
        </a>
      </div>
    </section>
  );
}
