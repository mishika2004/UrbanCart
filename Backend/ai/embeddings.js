/**
 * Local embeddings using @xenova/transformers (all-MiniLM-L6-v2).
 * Runs entirely on CPU — no API key needed.
 * First call downloads the model (~23 MB) and caches it locally.
 */

const { pipeline } = require("@xenova/transformers");

let extractor = null;

async function getExtractor() {
  if (!extractor) {
    extractor = await pipeline("feature-extraction", "Xenova/all-MiniLM-L6-v2");
  }
  return extractor;
}

/**
 * Embed a single string → Float32Array (384 dims).
 */
async function embedText(text) {
  const ext = await getExtractor();
  const output = await ext(text, { pooling: "mean", normalize: true });
  return Array.from(output.data);
}

/**
 * Embed an array of strings → array of float arrays.
 */
async function embedTexts(texts) {
  const results = [];
  for (const t of texts) {
    results.push(await embedText(t));
  }
  return results;
}

module.exports = { embedText, embedTexts };
