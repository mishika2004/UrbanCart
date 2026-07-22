/**
 * Customer Support Agent.
 * Uses RAG over the support knowledge base + order lookup.
 * System prompt enforces factual answers only — never invents policy.
 */

const { chatCompletion } = require("./llm");
const { searchFaq, lookupOrder, createSupportTicket } = require("./tools");

const SYSTEM_PROMPT = `You are UrbanCart's customer support assistant. Follow these rules strictly:

IDENTITY & TONE
- You are friendly, professional, and empathetic.
- Greet users warmly. Use simple language.

ANSWERING RULES
- ONLY answer using the knowledge-base snippets provided in the CONTEXT section.
- If no relevant context is found, say: "I don't have that information. Let me connect you with our support team."
- NEVER invent policies, prices, or order statuses.
- When citing info, mention the source (e.g., "Per our shipping policy…").

ORDER LOOKUP
- If the user asks about an order, use the ORDER DATA provided.
- If no order data is available, ask them to provide their Order ID.
- Never guess order statuses.

ESCALATION
- If you cannot confidently answer, offer to create a support ticket.
- For complaints, refund disputes, or sensitive issues, always escalate.

SAFETY
- NEVER ask for full credit/debit card numbers, CVV, or passwords.
- If a user shares sensitive data, tell them to never share such info in chat.
- Mask any sensitive info in your responses.

FORMAT
- Keep responses concise (under 200 words).
- Use bullet points for multi-item answers.
- Be direct and helpful.`;

/**
 * Handle a support chat turn.
 * @param {string} userMessage
 * @param {string|null} orderId - optional order to look up
 * @param {Array} conversationHistory - prior messages [{role, content}]
 * @returns {{ reply: string, sources: string[], escalated: boolean }}
 */
async function handleSupportChat(userMessage, orderId = null, conversationHistory = []) {
  // 1. Search knowledge base
  const kbResults = await searchFaq(userMessage);
  const contextSnippets = kbResults.map((r, i) => `[${r.source}] ${r.content}`).join("\n\n");

  // 2. Optionally look up order
  let orderContext = "";
  if (orderId) {
    const orderData = await lookupOrder(orderId);
    orderContext = `\nORDER DATA:\n${JSON.stringify(orderData, null, 2)}`;
  }

  // 3. Build messages
  const messages = [
    { role: "system", content: SYSTEM_PROMPT },
    {
      role: "system",
      content: `CONTEXT (from knowledge base):\n${contextSnippets || "No relevant articles found."}\n${orderContext}`,
    },
    ...conversationHistory.slice(-10), // Keep last 10 turns
    { role: "user", content: userMessage },
  ];

  // 4. Get LLM response
  const reply = await chatCompletion(messages, { temperature: 0.2, max_tokens: 512 });

  // 5. Detect escalation need
  const escalated =
    kbResults.length === 0 ||
    reply.toLowerCase().includes("support team") ||
    reply.toLowerCase().includes("support ticket") ||
    reply.toLowerCase().includes("connect you");

  const sources = kbResults.map((r) => r.source);

  return { reply, sources, escalated };
}

/**
 * Escalate: create a support ticket.
 */
async function escalateToHuman(summary, conversationHistory, userContact) {
  const convoText = conversationHistory.map((m) => `${m.role}: ${m.content}`).join("\n");
  return createSupportTicket(summary, convoText, userContact);
}

module.exports = { handleSupportChat, escalateToHuman };
