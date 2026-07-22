/**
 * Index support knowledge base markdown files into ChromaDB.
 *
 * Usage:  node scripts/indexKb.js
 *         npm run ai:index:kb
 */

const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const { embedText } = require("../ai/embeddings");
const { resetCollection, addDocuments } = require("../ai/vectorStore");

const KB_DIR = path.join(__dirname, "..", "data", "support_kb");
const CHUNK_SIZE = 600; // characters per chunk (roughly 100-150 words)

/**
 * Split markdown text into overlapping chunks.
 */
function chunkText(text, source) {
  const chunks = [];
  const paragraphs = text.split(/\n\n+/);
  let current = "";

  for (const para of paragraphs) {
    if ((current + "\n\n" + para).length > CHUNK_SIZE && current.length > 0) {
      chunks.push({ text: current.trim(), source });
      current = para;
    } else {
      current = current ? current + "\n\n" + para : para;
    }
  }
  if (current.trim()) chunks.push({ text: current.trim(), source });
  return chunks;
}

async function main() {
  console.log("📚 Indexing support knowledge base...\n");

  // Read all markdown files
  const files = fs.readdirSync(KB_DIR).filter((f) => f.endsWith(".md"));
  if (files.length === 0) {
    console.log("No .md files found in", KB_DIR);
    process.exit(1);
  }

  // Chunk all files
  const allChunks = [];
  for (const file of files) {
    const content = fs.readFileSync(path.join(KB_DIR, file), "utf-8");
    const source = file.replace(".md", "");
    const chunks = chunkText(content, source);
    allChunks.push(...chunks);
    console.log(`  ✅ ${file} → ${chunks.length} chunks`);
  }

  console.log(`\n📝 Total chunks: ${allChunks.length}`);
  console.log("🔄 Generating embeddings (this may take a moment on first run)...\n");

  // Embed and prepare documents
  const docs = [];
  for (let i = 0; i < allChunks.length; i++) {
    const chunk = allChunks[i];
    const embedding = await embedText(chunk.text);
    docs.push({
      id: uuidv4(),
      text: chunk.text,
      embedding,
      metadata: { source: chunk.source },
    });
    process.stdout.write(`  Embedded ${i + 1}/${allChunks.length}\r`);
  }
  console.log();

  // Reset collection and add documents
  await resetCollection("support_kb");
  await addDocuments("support_kb", docs);

  console.log(`\n✅ Knowledge base indexed! ${docs.length} chunks in "support_kb" collection.`);
  process.exit(0);
}

main().catch((err) => {
  console.error("❌ KB indexing failed:", err);
  process.exit(1);
});
