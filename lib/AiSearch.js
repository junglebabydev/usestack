import axios from "axios";
import { supabase } from "@/lib/supabase";

async function getQueryData(query) {
  const prompt = `
You are an intent extraction system for an AI tools search platform.
User query: "${query}"
Rules:
- Use ONLY values from the provided lists
- No new values
- Max 3 categories, 5 subcategories, 8 tags
- Return JSON only

Categories:["Analytics & Data Tools","Audio & Voice Tools","Automation & Agents","Business & Marketing Tools","Chat & Conversational Assistants","Developer & Coding Tools","Education & Tutoring Tools","Image & Art Generators","Miscellaneous Tools & Utilities","Productivity & Workflow Tools","Text & Writing Tools","Video & Animation Tools"]

Subcategories:["Advertising assistants","Agentic task automation","AI pair-programming","Analytics dashboards","Article generation","Avatars","Chatbots","Code completion","Code review","Copywriting","Customer support bots","Dashboards","Data forecasting","Design assets","Digital coworkers","Educational content generators","FAQs","File summarizers","Illustrations","Image editing","Lead scoring","Learning assistants","Meeting assistants","Music synthesis","Niche AI utilities","Project planning","Prompt engineering","Proofreading","Proposal assistants","SEO tools","Speech enhancement","Style transfer","Task automation","Translation","Trend prediction","Tutoring","Video creation","Video summarization","Voiceover generation"]

Tags:["ads","assistant","automation","blog","chat","content","copywriting","creative","design","docs","editing","generative","grammar","image","marketing","meetings","planning","prompts","publishing","search","SEO","social","summarize","tasks","tools","transcription","tts","video","voiceover","write","vector","retrieval"]

JSON format:{"categories":[],"subcategories":[],"tags":[]}
`;

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

  const raw = cleanJsonString(response.data.choices[0].message.content);
  return JSON.parse(raw);
}

async function getFilteredTools(categories ,subcategories,tags) {
  let query = supabase.from("tools").select(`
    id,
    name,
    tagline,
    description,
    category,
    subcategories,
    tags
  `);

  if (intent.categories?.length) {
    query = query.in("category", intent.categories);
  }

  if (intent.tags?.length) {
    query = query.overlaps("tags", intent.tags);
  }

  const { data, error } = await query.limit(30);

  if (error) throw error;
  return data;
}
async function rankAndSummarize(query, tools) {
  const toolList = tools
    .map(
      (t, i) =>
        `${i + 1}. ${t.name} – ${t.tagline || t.description}`
    )
    .join("\n");

  const prompt = `
User need: "${query}"

Available tools:
${toolList}

Task:
- Rank tools by relevance
- Briefly explain why each tool fits
- Return JSON only

JSON format:
{
  "results": [
    { "tool_id": "", "rank": 1, "reason": "" }
  ]
}
`;

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
    console.log("here1");
  try {
    // Step 1: Intent extraction
    const intent = await getQueryData(query);
    console.log("here2");
    
    // Step 2: DB filtering
    const tools = await getFilteredTools(intent);
    if (!tools?.length) return { results: [] };
    console.log("here3");

    // Step 3: Ranking + summary
    const ranked = await rankAndSummarize(query, tools);
     console.log("ranked", ranked);
    return {
      query,
      intent,
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
