/**
 * Shared tool functions for AI agents.
 * These are called by the agent handlers to fetch real data.
 */

const Product = require("../models/products.models");
const Order = require("../models/order.models");
const SupportTicket = require("../models/supportTicket.models");
const { embedText } = require("./embeddings");
const { query } = require("./vectorStore");

/**
 * Look up an order by its MongoDB _id.
 */
async function lookupOrder(orderId) {
  try {
    const order = await Order.findById(orderId).populate("products.productId");
    if (!order) return { found: false, message: "Order not found. Please check the order ID." };
    return {
      found: true,
      orderId: order._id,
      status: order.status,
      totalAmount: order.totalAmount,
      createdAt: order.createdAt,
      products: order.products.map((p) => ({
        name: p.productId?.name || "Unknown",
        quantity: p.quantity,
        price: p.price,
      })),
      address: order.address,
    };
  } catch (err) {
    return { found: false, message: "Invalid order ID format or lookup failed." };
  }
}

/**
 * Search the FAQ / support knowledge base using semantic similarity.
 */
async function searchFaq(queryText, k = 3) {
  try {
    const embedding = await embedText(queryText);
    const results = await query("support_kb", embedding, k);
    return results.map((r) => ({
      content: r.document,
      source: r.metadata?.source || "knowledge base",
      relevance: (1 - r.distance).toFixed(3),
    }));
  } catch (err) {
    console.error("FAQ search error:", err.message);
    return [];
  }
}

/**
 * Semantic product search over the product catalog embeddings.
 */
async function semanticProductSearch(queryText, k = 5) {
  try {
    const embedding = await embedText(queryText);
    const results = await query("product_catalog", embedding, k);
    const productIds = results.map((r) => r.metadata?.productId).filter(Boolean);
    const products = await Product.find({ _id: { $in: productIds } });
    // Maintain relevance order
    return productIds.map((pid) => products.find((p) => p._id.toString() === pid)).filter(Boolean);
  } catch (err) {
    console.error("Product search error:", err.message);
    return [];
  }
}

/**
 * Get full product details by ID.
 */
async function getProductDetails(productId) {
  try {
    const product = await Product.findById(productId);
    if (!product) return null;
    return product.toObject();
  } catch {
    return null;
  }
}

/**
 * Find similar products to a given product.
 */
async function similarProducts(productId, k = 4) {
  try {
    const product = await Product.findById(productId);
    if (!product) return [];
    const text = `${product.name} ${product.description || ""} ${product.category}`;
    const embedding = await embedText(text);
    const results = await query("product_catalog", embedding, k + 1);
    // Filter out the product itself
    const productIds = results
      .map((r) => r.metadata?.productId)
      .filter((pid) => pid && pid !== productId.toString())
      .slice(0, k);
    const products = await Product.find({ _id: { $in: productIds } });
    return productIds.map((pid) => products.find((p) => p._id.toString() === pid)).filter(Boolean);
  } catch (err) {
    console.error("Similar products error:", err.message);
    return [];
  }
}

/**
 * Create a support ticket for human escalation.
 */
async function createSupportTicket(summary, conversation, userContact) {
  const ticket = new SupportTicket({
    summary,
    conversation: conversation || "No conversation provided",
    userContact: userContact || "Not provided",
  });
  const saved = await ticket.save();
  return { ticketId: saved._id, status: saved.status, message: "Support ticket created. A human agent will follow up." };
}

/**
 * Get best-selling / highest-rated products as a fallback.
 */
async function getBestSellers(k = 5) {
  return Product.find().sort({ rating: -1 }).limit(k);
}

module.exports = {
  lookupOrder,
  searchFaq,
  semanticProductSearch,
  getProductDetails,
  similarProducts,
  createSupportTicket,
  getBestSellers,
};
