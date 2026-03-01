import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

function getAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  );
}

function generateSlug(title) {
  return title
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

  const { title, summary, content, category, slug, status, tags, thumbnail_url, meta_description } = body;

  if (!title || !summary || !content || !category) {
    return NextResponse.json(
      { error: "Missing required fields: title, summary, content, category" },
      { status: 400 }
    );
  }

  const VALID_CATEGORIES = ["Tool", "Stack", "News"];
  if (!VALID_CATEGORIES.includes(category)) {
    return NextResponse.json(
      { error: `category must be one of: ${VALID_CATEGORIES.join(", ")}` },
      { status: 400 }
    );
  }

  const supabase = getAdminClient();

  // Look up the agent user's ID so posts are attributed correctly
  let created_by = null;
  if (process.env.AGENT_EMAIL) {
    const { data: agentUser } = await supabase
      .from("users")
      .select("id")
      .eq("email", process.env.AGENT_EMAIL)
      .single();
    if (agentUser) created_by = agentUser.id;
  }

  const finalSlug = slug || generateSlug(title);

  const { data, error } = await supabase
    .from("blogs")
    .insert({
      title,
      slug: finalSlug,
      summary,
      content,
      category,
      status: status || "pending",
      tags: Array.isArray(tags) ? tags : [],
      thumbnail_url: thumbnail_url || null,
      meta_description: meta_description || null,
      created_by,
    })
    .select()
    .single();

  if (error) {
    console.error("Agent blog create error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true, blog: data }, { status: 201 });
}
