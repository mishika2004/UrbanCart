/**
 * Smoke test for AI endpoints.
 * Run with the backend already running on port 3000:
 *   node scripts/testAI.js
 */

const BASE = process.env.API_URL || "http://localhost:3000";

async function test(name, url, body) {
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const data = await res.json();
    if (res.ok && data.data) {
      console.log(`✅ PASS  ${name}`);
      console.log(`   Reply: ${(data.data.reply || JSON.stringify(data.data)).substring(0, 120)}...\n`);
    } else {
      console.log(`❌ FAIL  ${name} — status ${res.status}`);
      console.log(`   ${JSON.stringify(data).substring(0, 200)}\n`);
    }
  } catch (err) {
    console.log(`❌ FAIL  ${name} — ${err.message}\n`);
  }
}

async function main() {
  console.log("🧪 AI Smoke Tests\n");
  console.log(`   Backend: ${BASE}\n`);

  await test(
    "Support Chat — Shipping Policy",
    `${BASE}/api/ai/support-chat`,
    { message: "What is your return policy?" }
  );

  await test(
    "Recommend Chat — Product Search",
    `${BASE}/api/ai/recommend-chat`,
    { message: "I need shoes under 2000 rupees" }
  );

  await test(
    "Support Chat — Order Lookup (fake ID)",
    `${BASE}/api/ai/support-chat`,
    { message: "What is the status of my order?", orderId: "000000000000000000000000" }
  );

  console.log("Done!");
}

main();
