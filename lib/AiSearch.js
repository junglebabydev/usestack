import axios from "axios";
import { supabase } from "@/lib/supabase";


async function getAllTools(){
   const { data, error } = await supabase
    .from("products")
    .select("*");

  if (error) throw error;

  return data;
}
async function getRelevantTools(query, tools){
    const toolList = tools
    .map(
      (t, i) =>
        `${i + 1}. ${t.name} – ${t.tagline || t.description}`
    )
    .join("\n");

    const prompt = `You are an expert AI architect and product recommendation engine.

You have access to a catalog of ~400 tools. Each tool has:
- tool_id
- name
- description
- category
- subcategory
- tags
- use_cases

Your task:
Given a user's problem statement, recommend the best tools and return results ONLY in valid JSON format.

IMPORTANT: You MUST use Chain-of-Thought reasoning internally, following this forced process:
1) First, identify the primary problem and user intent.
2) Second, select "Core" tools stack or Single Tool that solves the main problem.
3) Rank the Tools of same type and select the best one
4) Fourth, outline the full data flow from Step 1 → Step N, showing how all tools connect.
5) Fifth, finalize and explain the complete flow list of recommended tools.

Rules:
- Perform step-by-step reasoning internally, but DO NOT show your chain-of-thought.
- Output ONLY JSON.
- The JSON must strictly follow this schema:
{
  "results": [
    { "tool_id": "", "rank": 1, "reason": "" }
  ]
}

Ranking Guidelines:
- rank=1 must always be the best Core tool
- Supporting tools must follow in rank order
- Reasons must be specific, short, and linked to user requirements
- Never include markdown, extra keys, or extra text outside JSON
Now solve for this user query:
 ${query}
`
   const response = await axios.post(
    "https://openrouter.ai/api/v1/chat/completions",
    {
      model: "google/gemini-2.5-flash",
      messages: [{ role: "user", content: prompt }],
      temperature: 0,
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
export async function getAiSearchResponse(query) {
  console.log("here-------");
  try {
    // Step 1: Get All the Tools
    const allTools = await getAllTools();
    
    // Step 2: Getting related Tools
    const ranked = await getRelevantTools(query, allTools);
    return {
      query,
      results: ranked.results,
    };
  } catch (err) {
    console.error("AI Search Error:", err);
    throw new Error("AI search failed");
  }
}


// Helper Function to remove any extra backtics(```) begore json
function cleanJsonString(str) {
  if (!str) return str;
  str = str.replace(/```[\s\S]*?{/m, "{"); 
  str = str.replace(/```/g, "");
  return str.trim();
}