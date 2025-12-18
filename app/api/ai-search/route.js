import axios from "axios";
import { supabase } from "@/lib/supabase";

async function getQueryData(query) {
 const prompt = `
You are an intent classification engine for an AI tools discovery platform.

User Query:
"${query}"

Your task:
Identify the MOST relevant intent from the lists below.

STRICT RULES:
- Use ONLY values from the provided lists
- DO NOT invent new values
- Select ONLY highly relevant items
- Max: 3 categories, 5 subcategories, 8 tags
- If unsure, select fewer items (precision > recall)
- Output MUST be valid JSON only
- No explanations, no markdown, no extra text

Allowed Categories:
["Analytics & Data Tools","Audio & Voice Tools","Automation & Agents","Business & Marketing Tools","Chat & Conversational Assistants","Developer & Coding Tools","Education & Tutoring Tools","Image & Art Generators","Miscellaneous Tools & Utilities","Productivity & Workflow Tools","Text & Writing Tools","Video & Animation Tools"]

Allowed Subcategories:
["Advertising assistants","Agentic task automation","AI pair-programming","Analytics dashboards","Article generation","Avatars","Chatbots","Code completion","Code review","Copywriting","Customer support bots","Dashboards","Data forecasting","Design assets","Digital coworkers","Educational content generators","FAQs","File summarizers","Illustrations","Image editing","Lead scoring","Learning assistants","Meeting assistants","Music synthesis","Niche AI utilities","Project planning","Prompt engineering","Proofreading","Proposal assistants","SEO tools","Speech enhancement","Style transfer","Task automation","Translation","Trend prediction","Tutoring","Video creation","Video summarization","Voiceover generation"]

Allowed Tags:
["ads","assistant","automation","blog","chat","content","copywriting","creative","design","docs","editing","generative","grammar","image","marketing","meetings","planning","prompts","publishing","search","SEO","social","summarize","tasks","tools","transcription","tts","video","voiceover","write","vector","retrieval"]

Return EXACTLY this JSON structure:
{
  "categories": [],
  "subcategories": [],
  "tags": []
}
`;

  const response = await axios.post(
    "https://openrouter.ai/api/v1/chat/completions",
    {
      model: "anthropic/claude-3-haiku",
      messages: [{ role: "user", content: prompt }],
      temperature: 0,
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
      },
    }
  );

  const raw = cleanJsonString(response.data.choices[0].message.content);
  return JSON.parse(raw);
}

async function generateWorkflow(query, tools) {
  const toolList = tools
    .map(
      (t, i) =>
        `[ID:${t.id}] ${t.name} – ${t.tagline || t.description?.substring(0, 100)}`
    )
    .join("\n");

 const prompt = `
You are an AI workflow planner.

User Goal:
"${query}"

Available Tools:
${toolList}

Your task:
Design a clear, practical workflow that helps the user achieve the goal using ONLY the tools listed above.

WORKFLOW REQUIREMENTS:
- Create 3 to 5 logical steps
- Steps must be actionable and ordered
- Each step must clearly state WHAT is done and WHY
- Each step must recommend 1–3 tools

TOOL USAGE RULES:
- Use ONLY tool IDs from the provided list
- For EACH tool, write a ONE-LINE explanation of what the tool does IN THAT STEP
- Do NOT repeat generic taglines
- Be specific to the step’s purpose

PRO TIPS:
- 2–3 concise, practical tips per step
- Tips should improve results, speed, or accuracy

OUTPUT RULES:
- Return VALID JSON only
- No markdown
- No extra text
- Follow the exact schema below

Required JSON format:
{
  "workflow": {
    "title": "Short, clear workflow title",
    "description": "1–2 sentences describing the overall workflow outcome",
    "steps": [
      {
        "stepNumber": 1,
        "title": "Clear action-based step title",
        "description": "What happens in this step and why it matters",
        "tools": [
          {
            "id": "tool-id-from-list",
            "stepDescription": "One line explaining exactly what this tool does in this step"
          }
        ],
        "proTips": [
          "Actionable tip 1",
          "Actionable tip 2"
        ]
      }
    ]
  }
}
`;

  const response = await axios.post(
    "https://openrouter.ai/api/v1/chat/completions",
    {
      model: "anthropic/claude-3-haiku",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.3,
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
      },
    }
  );

  return JSON.parse(
    cleanJsonString(response.data.choices[0].message.content)
  );
}

async function getFilteredTools(intent) {
  let query = supabase.from("products").select(`
    id,
    name,
    tagline,
    description,
    slug,
    logo_url,
    tool_thumbnail_url,
    website_url,
    tags,
    is_verified,
    product_categories:product_category_jnc(
      category:categories!product_category_jnc_category_id_fkey(id, name, slug)
    ),
    product_tags:product_tags_jnc(
      tag:tags!product_tags_jnc_tag_id_fkey(id, name, slug)
    )
  `);

  // Note: You may need to adjust filtering based on your actual DB schema
  const { data, error } = await query.limit(50);

  if (error) throw error;
  return data;
}

function cleanJsonString(str) {
  if (!str) return str;
  str = str.replace(/```[\s\S]*?{/m, "{");
  str = str.replace(/```/g, "");
  return str.trim();
}

export async function POST(request) {
  try {
    const {decodedQuery:query} = await request.json();
        
    if (!query) {
      return Response.json({ error: "Query is required" }, { status: 400 });
    }

    // Step 1: Intent extraction
    const intent = await getQueryData(query);
    
    // Step 2: DB filtering - get full tool details
    const tools = await getFilteredTools(intent);
    
    if (!tools?.length) {
      return Response.json({ error: "No matching tools found", workflowId: null }, { status: 200 });
    }

    // Step 3: Generate workflow with steps and tool recommendations
    const workflowData = await generateWorkflow(query, tools);
    
    // Check if workflow was generated
    if (!workflowData?.workflow) {
      return Response.json({ error: "Failed to generate workflow", workflowId: null }, { status: 200 });
    }
    
    // Step 4: Enrich workflow steps with full tool data
    const workflow = workflowData.workflow;
    const allToolIds = new Set();
    
    // Ensure steps exist
    if (!workflow.steps || !Array.isArray(workflow.steps)) {
      workflow.steps = [];
    }
    
    workflow.steps = workflow.steps.map((step) => {
      // Handle new format with tools array containing {id, stepDescription}
      const stepToolsData = step.tools || [];
      const enrichedTools = stepToolsData
        .map((toolRef) => {
          const toolId = typeof toolRef === 'object' ? toolRef.id : toolRef;
          const stepDescription = typeof toolRef === 'object' ? toolRef.stepDescription : null;
          const tool = tools.find((t) => t.id === parseInt(toolId, 10));
          if (tool) {
            allToolIds.add(tool.id);
            return {
              ...tool,
              stepDescription: stepDescription || tool.tagline || tool.description?.substring(0, 60),
            };
          }
          return null;
        })
        .filter(Boolean);
      
      return {
        ...step,
        tools: enrichedTools,
      };
    });

    // Get all unique tools used in the workflow
    const allTools = Array.from(allToolIds)
      .map((id) => tools.find((t) => t.id === id))
      .filter(Boolean);

    // Step 5: Save workflow to database
    const workflowResponse = {
      workflow,
      tools: allTools,
    };

    const { data: savedWorkflow, error: insertError } = await supabase
      .from("workflows")
      .insert({
        query: query,
        response: workflowResponse,
      })
      .select("id")
      .single();

    if (insertError) {
      console.error("DB Insert Error:", insertError);
      // Still return the workflow even if save fails
      return Response.json({
        ...workflowResponse,
        workflowId: null,
        saved: false,
      });
    }
    return Response.json({
      workflowId: savedWorkflow.id,
      saved: true,
    });
  } catch (err) {
    return Response.json(
      { error: "AI search failed", details: err.message },
      { status: 500 }
    );
  }
}
