import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

function getAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  );
}

function generateSlug(name) {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

function authenticate(request) {
  const auth = request.headers.get("authorization") || "";
  const token = auth.replace("Bearer ", "").trim();
  return token === process.env.AGENT_API_KEY;
}

export async function POST(request) {
  if (!authenticate(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const {
    name,
    slug,
    tagline,
    description,
    website_url,
    logo_url,
    tool_thumbnail_url,
    tags,
    twitter_url,
    linkedin_url,
  } = body;

  if (!name || !tagline || !description || !website_url) {
    return NextResponse.json(
      { error: "Missing required fields: name, tagline, description, website_url" },
      { status: 400 }
    );
  }

  const supabase = getAdminClient();

  const finalSlug = slug || generateSlug(name);

  const { data, error } = await supabase
    .from("products")
    .insert({
      name: name.trim(),
      slug: finalSlug,
      tagline: tagline.trim(),
      description: description.trim(),
      website_url: website_url.trim(),
      logo_url: logo_url?.trim() || null,
      tool_thumbnail_url: tool_thumbnail_url?.trim() || null,
      tags: Array.isArray(tags) ? tags : null,
      twitter_url: twitter_url?.trim() || null,
      linkedin_url: linkedin_url?.trim() || null,
      is_verified: false,
    })
    .select()
    .single();

  if (error) {
    console.error("Agent tool create error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true, tool: data }, { status: 201 });
}
