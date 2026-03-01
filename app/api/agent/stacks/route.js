import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { GoogleGenAI } from "@google/genai";

function getAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  );
}

function generateSlug(name) {
  return name.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");
}

function authenticate(request) {
  const auth = request.headers.get("authorization") || "";
  return auth.replace("Bearer ", "").trim() === process.env.AGENT_API_KEY;
}

// Use Gemini to suggest tools for a stack based on a text description
async function suggestStackFromText(description, existingTools) {
  const ai = new GoogleGenAI(process.env.GEMINI_API_KEY);
  const toolList = existingTools.map((t) => `${t.name} (slug: ${t.slug})`).join(", ");

  const prompt = `You are a stack curation assistant. Given a use case description and a list of available AI tools,
suggest the best tools to include in a stack and explain the used_for role of each tool.

Use case: "${description}"

Available tools (name and slug): ${toolList}

Return ONLY valid JSON (no markdown) in this exact structure:
{
  "name": "suggested stack name (3-6 words)",
  "description": "1-2 sentence description of this stack",
  "tools": [
    { "slug": "tool-slug", "used_for": "one sentence explaining why this tool is in the stack" }
  ]
}

Rules:
- Only suggest tools from the available list (use the exact slug)
- Choose 3-7 tools maximum
- The stack name should be descriptive and actionable`;

  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: prompt,
  });

  let raw = response.text.trim().replace(/```[\s\S]*?{/m, "{").replace(/```/g, "").trim();
  return JSON.parse(raw);
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

  const supabase = getAdminClient();
  const mode = body.mode || "manual";

  try {
    let stackName = body.name;
    let stackDescription = body.description;
    let toolList = body.tools || []; // [{ slug_or_name, used_for }] or [{ slug, used_for }]

    // ── MODE: suggest ────────────────────────────────────────────────────
    // Pass free-text description; Gemini picks tools from the existing DB
    // Body: { mode: "suggest", prompt: "I need a stack for outbound sales automation" }
    if (mode === "suggest") {
      if (!body.prompt) {
        return NextResponse.json({ error: "prompt is required for mode: suggest" }, { status: 400 });
      }

      // Fetch all available tools
      const { data: allTools } = await supabase
        .from("products")
        .select("id, name, slug")
        .order("name");

      const suggestion = await suggestStackFromText(body.prompt, allTools || []);
      stackName = body.name || suggestion.name;
      stackDescription = body.description || suggestion.description;
      toolList = suggestion.tools; // [{ slug, used_for }]
    }

    // ── MODE: manual / suggest (after AI fills in name/description) ───────
    // Body: { name, description, tools: [{ slug, used_for }] }
    if (!stackName || !stackDescription) {
      return NextResponse.json(
        { error: "name and description are required (or use mode: suggest with a prompt)" },
        { status: 400 }
      );
    }

    // Create the stack
    const { data: stack, error: stackError } = await supabase
      .from("stacks")
      .insert({
        name: stackName.trim(),
        slug: generateSlug(stackName),
        description: stackDescription.trim(),
        is_public: body.is_public ?? false,
        created_by: 1,
      })
      .select()
      .single();

    if (stackError) throw stackError;

    // Resolve tools and create junctions
    if (toolList.length > 0) {
      const slugsOrNames = toolList.map((t) => t.slug || t.slug_or_name || t.name).filter(Boolean);

      // Fetch matching products by slug first, then by name
      const { data: bySlug } = await supabase
        .from("products")
        .select("id, name, slug")
        .in("slug", slugsOrNames);

      const { data: byName } = await supabase
        .from("products")
        .select("id, name, slug")
        .in("name", slugsOrNames);

      const allMatched = [...(bySlug || []), ...(byName || [])];
      const uniqueProducts = Object.values(
        Object.fromEntries(allMatched.map((p) => [p.id, p]))
      );

      if (uniqueProducts.length > 0) {
        const junctions = uniqueProducts.map((product) => {
          const toolEntry = toolList.find(
            (t) =>
              (t.slug || t.slug_or_name || t.name) === product.slug ||
              (t.slug || t.slug_or_name || t.name) === product.name
          );
          return {
            stack_id: stack.id,
            product_id: product.id,
            stack_name: stack.name,
            product_name: product.name,
            used_for: toolEntry?.used_for || null,
          };
        });

        const { error: jErr } = await supabase.from("product_stack_jnc").insert(junctions);
        if (jErr) throw jErr;
      }
    }

    return NextResponse.json({ success: true, stack }, { status: 201 });

  } catch (err) {
    console.error("Agent stack create error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
