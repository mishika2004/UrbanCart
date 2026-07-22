/**
 * Product Recommendation Agent.
 * Uses semantic search over product embeddings + conversational discovery.
 */

const { chatCompletion } = require("./llm");
const { semanticProductSearch, similarProducts, getProductDetails, getBestSellers } = require("./tools");

const SYSTEM_PROMPT = `You are UrbanCart's shopping assistant. Help customers discover products they'll love.

RULES
- Ask clarifying questions when the request is vague (budget, category, size, brand, use-case).
- Recommend products ONLY from the PRODUCT RESULTS provided in context.
- Never claim a product is "in stock", "on sale", or has a discount unless the data explicitly says so.
- Show product names, prices (₹), ratings, and categories.
- If no matching products are found, suggest the user try different keywords or browse categories.
- For "trending" or "best sellers" requests, use the BEST SELLERS data provided.

FORMAT
- Present products as a numbered list with:  Name — ₹Price — ⭐Rating — Category
- Keep responses concise and enthusiastic.
- Maximum 5 product recommendations per response.

SAFETY
- Never ask for personal financial information.
- Don't make up product features not in the data.`;

/**
 * Format products for the LLM context.
 */
function formatProducts(products) {
  if (!products || products.length === 0) return "No matching products found.";
  return products
    .map(
      (p, i) =>
        `${i + 1}. ${p.name} — ₹${p.price} — ⭐${p.rating} — Category: ${p.category}${p.description ? " — " + p.description : ""} [ID: ${p._id}]`
    )
    .join("\n");
}

/**
 * Handle a recommendation chat turn.
 * @param {string} userMessage
 * @param {string|null} productId - optional product for "similar products"
 * @param {Array} conversationHistory - prior messages [{role, content}]
 * @returns {{ reply: string, products: object[] }}
 */
async function handleRecommendChat(userMessage, productId = null, conversationHistory = []) {
  let productResults = [];
  let contextLabel = "PRODUCT RESULTS";

  // Detect intent
  const lowerMsg = userMessage.toLowerCase();
  const wantsSimilar = productId || lowerMsg.includes("similar") || lowerMsg.includes("like this");
  const wantsTrending =
    lowerMsg.includes("trending") ||
    lowerMsg.includes("best seller") ||
    lowerMsg.includes("popular") ||
    lowerMsg.includes("top rated");

  if (wantsSimilar && productId) {
    // Similar products flow
    productResults = await similarProducts(productId, 5);
    const srcProduct = await getProductDetails(productId);
    contextLabel = srcProduct
      ? `SIMILAR PRODUCTS (to "${srcProduct.name}")`
      : "SIMILAR PRODUCTS";
  } else if (wantsTrending) {
    // Best sellers flow
    productResults = await getBestSellers(5);
    contextLabel = "BEST SELLERS (by rating)";
  } else {
    // General semantic search
    productResults = await semanticProductSearch(userMessage, 5);
  }

  // Build messages
  const messages = [
    { role: "system", content: SYSTEM_PROMPT },
    {
      role: "system",
      content: `${contextLabel}:\n${formatProducts(productResults)}`,
    },
    ...conversationHistory.slice(-10),
    { role: "user", content: userMessage },
  ];

  const reply = await chatCompletion(messages, { temperature: 0.4, max_tokens: 512 });

  return {
    reply,
    products: productResults.map((p) => ({
      _id: p._id,
      name: p.name,
      price: p.price,
      rating: p.rating,
      category: p.category,
      image: p.image,
    })),
  };
}

module.exports = { handleRecommendChat };
