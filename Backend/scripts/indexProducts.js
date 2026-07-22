/**
 * Index product catalog into ChromaDB for semantic search.
 *
 * Usage:  node scripts/indexProducts.js
 *         npm run ai:index:products
 *
 * Requires MongoDB to be running and seeded with products.
 */

require("dotenv").config();
const { v4: uuidv4 } = require("uuid");
const initializeDatabase = require("../db/db.connect");
const Product = require("../models/products.models");
const { embedText } = require("../ai/embeddings");
const { resetCollection, addDocuments } = require("../ai/vectorStore");

async function main() {
  console.log("🛍️  Indexing product catalog...\n");

  // Connect to MongoDB
  await initializeDatabase();
  console.log("  ✅ Connected to MongoDB");

  // Fetch all products
  const products = await Product.find();
  if (products.length === 0) {
    console.log("  ⚠️  No products found. Run 'npm run seed' first.");
    process.exit(1);
  }
  console.log(`  ✅ Found ${products.length} products\n`);
  console.log("🔄 Generating embeddings...\n");

  // Build embedding text for each product and embed
  const docs = [];
  for (let i = 0; i < products.length; i++) {
    const p = products[i];
    const text = [p.name, p.description || "", p.category].filter(Boolean).join(" — ");
    const embedding = await embedText(text);
    docs.push({
      id: uuidv4(),
      text,
      embedding,
      metadata: { productId: p._id.toString() },
    });
    process.stdout.write(`  Embedded ${i + 1}/${products.length}\r`);
  }
  console.log();

  // Reset and load
  await resetCollection("product_catalog");
  await addDocuments("product_catalog", docs);

  console.log(`\n✅ Product catalog indexed! ${docs.length} products in "product_catalog" collection.`);
  process.exit(0);
}

main().catch((err) => {
  console.error("❌ Product indexing failed:", err);
  process.exit(1);
});
