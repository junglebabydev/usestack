import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

function getAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  );
}

function authenticate(request) {
  const auth = request.headers.get("authorization") || "";
  return auth.replace("Bearer ", "").trim() === process.env.AGENT_API_KEY;
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

  const { type } = body;
  if (!type || !["tool_ad", "company_ad"].includes(type)) {
    return NextResponse.json(
      { error: 'type is required: "tool_ad" or "company_ad"' },
      { status: 400 }
    );
  }

  const supabase = getAdminClient();

  // ── TYPE: tool_ad ──────────────────────────────────────────────────────
  // Sponsors an existing tool (shows it as a featured/sponsored listing)
  // Body: { type: "tool_ad", tool_slug: "cursor" }
  //    or { type: "tool_ad", tool_name: "Cursor" }
  if (type === "tool_ad") {
    const { tool_slug, tool_name } = body;
    if (!tool_slug && !tool_name) {
      return NextResponse.json(
        { error: "tool_slug or tool_name is required for type: tool_ad" },
        { status: 400 }
      );
    }

    // Look up the product
    let query = supabase.from("products").select("id, name, slug");
    if (tool_slug) query = query.eq("slug", tool_slug);
    else query = query.ilike("name", tool_name);

    const { data: product, error: lookupErr } = await query.single();
    if (lookupErr || !product) {
      return NextResponse.json(
        { error: `Tool not found: ${tool_slug || tool_name}` },
        { status: 404 }
      );
    }

    const { data, error } = await supabase
      .from("ads")
      .insert({ tool_id: product.id, visibility: body.visibility ?? true })
      .select()
      .single();

    if (error) {
      console.error("Agent sponsored tool_ad error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(
      { success: true, ad: data, tool: { id: product.id, name: product.name, slug: product.slug } },
      { status: 201 }
    );
  }

  // ── TYPE: company_ad ───────────────────────────────────────────────────
  // Creates a banner/company sponsored listing
  // Body: { type: "company_ad", company_name, thumbnail_url, company_url, description }
  if (type === "company_ad") {
    const { company_name, thumbnail_url, company_url, description } = body;

    if (!company_name || !thumbnail_url) {
      return NextResponse.json(
        { error: "company_name and thumbnail_url are required for type: company_ad" },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from("company_ads")
      .insert({
        company_name,
        thumbnail_url,
        company_url: company_url || null,
        description: description || null,
        visibility: body.visibility ?? true,
      })
      .select()
      .single();

    if (error) {
      console.error("Agent sponsored company_ad error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, ad: data }, { status: 201 });
  }
}
