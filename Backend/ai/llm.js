/**
 * LLM provider abstraction.
 * Supports: Groq (default), Hugging Face Inference API, Cloudflare Workers AI.
 * Provider is selected via LLM_PROVIDER env var.
 */

const Groq = require("groq-sdk");

const PROVIDER = (process.env.LLM_PROVIDER || "groq").toLowerCase();

/* ───── Groq ───── */
function groqClient() {
  if (!process.env.GROQ_API_KEY) throw new Error("GROQ_API_KEY is not set");
  return new Groq({ apiKey: process.env.GROQ_API_KEY });
}

async function groqChat(messages, opts = {}) {
  const client = groqClient();
  const res = await client.chat.completions.create({
    model: opts.model || "llama-3.1-8b-instant",
    messages,
    temperature: opts.temperature ?? 0.3,
    max_tokens: opts.max_tokens ?? 1024,
  });
  return res.choices[0].message.content;
}

/* ───── Hugging Face ───── */
async function hfChat(messages, opts = {}) {
  const key = process.env.HF_API_KEY;
  if (!key) throw new Error("HF_API_KEY is not set");

  const model = opts.model || "mistralai/Mistral-7B-Instruct-v0.3";
  const prompt = messages.map((m) => `${m.role}: ${m.content}`).join("\n") + "\nassistant:";

  const res = await fetch(
    `https://api-inference.huggingface.co/models/${model}`,
    {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        inputs: prompt,
        parameters: { max_new_tokens: opts.max_tokens ?? 1024, temperature: opts.temperature ?? 0.3 },
      }),
    }
  );
  if (!res.ok) throw new Error(`HF API error: ${res.status} ${await res.text()}`);
  const data = await res.json();
  return Array.isArray(data) ? data[0].generated_text.split("assistant:").pop().trim() : data.generated_text;
}

/* ───── Cloudflare Workers AI ───── */
async function cfChat(messages, opts = {}) {
  const accountId = process.env.CLOUDFLARE_ACCOUNT_ID;
  const token = process.env.CLOUDFLARE_API_TOKEN;
  if (!accountId || !token) throw new Error("CLOUDFLARE_ACCOUNT_ID / CLOUDFLARE_API_TOKEN not set");

  const model = opts.model || "@cf/meta/llama-3.1-8b-instruct";
  const res = await fetch(
    `https://api.cloudflare.com/client/v4/accounts/${accountId}/ai/run/${model}`,
    {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify({ messages }),
    }
  );
  if (!res.ok) throw new Error(`CF API error: ${res.status} ${await res.text()}`);
  const data = await res.json();
  return data.result.response;
}

/* ───── Unified interface ───── */
async function chatCompletion(messages, opts = {}) {
  switch (PROVIDER) {
    case "groq":
      return groqChat(messages, opts);
    case "hf":
      return hfChat(messages, opts);
    case "cloudflare":
      return cfChat(messages, opts);
    default:
      throw new Error(`Unknown LLM_PROVIDER: ${PROVIDER}. Use groq, hf, or cloudflare.`);
  }
}

module.exports = { chatCompletion };
