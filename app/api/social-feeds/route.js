import { createClient } from "@supabase/supabase-js";
import puppeteer from "puppeteer";

// ---------- Helpers to normalize URLs ----------
function extractTwitterHandle(url) {
  if (!url) return null;
  try {
    const u = new URL(url);
    const parts = u.pathname.split("/").filter(Boolean);
    return parts[0] || null;
  } catch {
    return null;
  }
}

// ---------- Twitter via Nitter RSS ----------
async function fetchTwitterViaNitter(product) {
  const nitterInstances = [
    "https://nitter.net",
    "https://nitter.poast.org",
    "https://nitter.fdn.fr",
    "https://nitter.cz",
    "https://nitter.nl",
    "https://nitter.salastil.com",
  ];

  const handle = extractTwitterHandle(product.twitter_url);

  for (const instance of nitterInstances) {
    try {
      const query = handle
        ? `/${handle}/rss`
        : `/search/rss?q=${encodeURIComponent(product.name)}`;

      const rssUrl = `${instance}${query}`;

      const response = await fetch(rssUrl, {
        headers: { "User-Agent": "Mozilla/5.0" },
      });

      if (!response.ok) continue;

      const xmlText = await response.text();
      const items = xmlText.match(/<item>[\s\S]*?<\/item>/g) || [];
      const posts = [];

      items.slice(0, 5).forEach((item, i) => {
        const titleMatch = item.match(
          /<title>(?:<!\[CDATA\[)?(.*?)(?:\]\]>)?<\/title>/
        );
        const linkMatch = item.match(/<link>(.*?)<\/link>/);
        const pubDateMatch = item.match(/<pubDate>(.*?)<\/pubDate>/);

        if (titleMatch) {
          posts.push({
            id: `twitter_${i + 1}`,
            text: titleMatch[1],
            url: linkMatch ? linkMatch[1] : null,
            time: pubDateMatch ? pubDateMatch[1] : null,
            platform: "twitter",
            _source: "nitter_rss",
          });
        }
      });

      if (posts.length > 0) return posts;
    } catch (err) {
    }
  }

  return [];
}

// ---------- LinkedIn functionality removed ----------
// LinkedIn scraping was removed due to anti-bot protection
// LinkedIn requires authentication and blocks automated access

// ---------- Supabase client (lazy) ----------
let _supabase = null;
function getSupabase() {
  if (!_supabase) {
    _supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    );
  }
  return _supabase;
}

// ---------- API Route ----------
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const productId = searchParams.get("productId");
  const platform = searchParams.get("platform") || "twitter";

  if (!productId) {
    return Response.json({ error: "Product ID is required" }, { status: 400 });
  }

  try {
    const { data: product, error: productError } = await getSupabase()
      .from("products")
      .select("name, twitter_url, linkedin_url")
      .eq("id", productId)
      .single();

    if (productError || !product) {
      console.error("Product fetch error:", productError);
      return Response.json({ error: "Product not found" }, { status: 404 });
    }


    let feeds = [];
    if (platform === "twitter") {
      feeds = await fetchTwitterViaNitter(product);
    } else if (platform === "linkedin") {
      // LinkedIn functionality removed - return empty array
      feeds = [];
    }

    return Response.json(feeds);
  } catch (err) {
    console.error("Error fetching feeds:", err);
    return Response.json({ error: "Failed to fetch feeds" }, { status: 500 });
  }
}
