/**
 * Local file-based vector store.
 * Stores embeddings as JSON files — no external server needed.
 * Uses cosine similarity for search.
 *
 * Collections are stored as JSON files in Backend/data/vector_store/
 */

const fs = require("fs");
const path = require("path");

const STORE_DIR = path.join(__dirname, "..", "data", "vector_store");

// Ensure directory exists
if (!fs.existsSync(STORE_DIR)) {
  fs.mkdirSync(STORE_DIR, { recursive: true });
}

function collectionPath(name) {
  return path.join(STORE_DIR, `${name}.json`);
}

function loadCollection(name) {
  const p = collectionPath(name);
  if (!fs.existsSync(p)) return [];
  return JSON.parse(fs.readFileSync(p, "utf-8"));
}

function saveCollection(name, docs) {
  fs.writeFileSync(collectionPath(name), JSON.stringify(docs, null, 2));
}

/**
 * Cosine similarity between two vectors.
 */
function cosineSimilarity(a, b) {
  let dot = 0, magA = 0, magB = 0;
  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
    magA += a[i] * a[i];
    magB += b[i] * b[i];
  }
  return dot / (Math.sqrt(magA) * Math.sqrt(magB) + 1e-8);
}

/**
 * Add documents with pre-computed embeddings.
 * @param {string} collectionName
 * @param {{ id: string, text: string, embedding: number[], metadata?: object }[]} docs
 */
async function addDocuments(collectionName, docs) {
  const existing = loadCollection(collectionName);
  existing.push(...docs);
  saveCollection(collectionName, existing);
}

/**
 * Semantic query — returns top-k most similar documents.
 * @returns {{ id, document, metadata, distance }[]}
 */
async function query(collectionName, queryEmbedding, k = 5) {
  const docs = loadCollection(collectionName);
  if (docs.length === 0) return [];

  // Compute similarities
  const scored = docs.map((doc) => ({
    id: doc.id,
    document: doc.text,
    metadata: doc.metadata || {},
    similarity: cosineSimilarity(queryEmbedding, doc.embedding),
  }));

  // Sort by similarity descending, return top-k
  scored.sort((a, b) => b.similarity - a.similarity);
  return scored.slice(0, k).map((s) => ({
    id: s.id,
    document: s.document,
    metadata: s.metadata,
    distance: 1 - s.similarity, // convert to distance (lower = better)
  }));
}

/**
 * Delete and re-create a collection (just delete the file).
 */
async function resetCollection(name) {
  const p = collectionPath(name);
  if (fs.existsSync(p)) fs.unlinkSync(p);
}

module.exports = { addDocuments, query, resetCollection };
