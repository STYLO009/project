import makeWASocket from "@whiskeysockets/baileys";
import { useMultiFileAuthState } from "@whiskeysockets/baileys";
import qrcode from "qrcode-terminal";
import fetch from "node-fetch";

const GEMINI_API_KEY = "";
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;

// 🔍 Keywords to detect health-related queries
const HEALTH_KEYWORDS = [
  "disease", "symptom", "medicine", "doctor", "treatment", "health",
  "headache", "fever", "pain", "vaccine", "nutrition", "diet",
  "exercise", "covid", "diabetes", "heart", "skin", "mental health"
];

// Function to check if message is health-related
function isHealthQuery(text) {
  const lower = text.toLowerCase();
  return HEALTH_KEYWORDS.some((word) => lower.includes(word));
}

// Function to ask Gemini
async function askGemini(prompt) {
  try {
    const res = await fetch(GEMINI_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ role: "user", parts: [{ text: prompt }] }],
      }),
    });

    const data = await res.json();
    return (
      data.candidates?.[0]?.content?.parts?.[0]?.text ||
      "⚠️ Sorry, I couldn't generate a response."
    );
  } catch (err) {
    console.error("Gemini API error:", err);
    return "❌ Error connecting to Gemini API.";
  }
}

// Start the bot
async function startBot() {
  const { state, saveCreds } = await useMultiFileAuthState("./auth_info");
  const sock = makeWASocket({ auth: state });

  sock.ev.on("creds.update", saveCreds);

  sock.ev.on("connection.update", (update) => {
    const { connection, qr } = update;
    if (qr) {
      console.log("📲 Scan this QR code with WhatsApp:");
      qrcode.generate(qr, { small: true });
    }
    if (connection === "open") {
      console.log("✅ WhatsApp connected successfully!");
    }
  });

  // 📩 Listen for new messages
  sock.ev.on("messages.upsert", async ({ messages }) => {
    const msg = messages[0];
    if (!msg.message?.conversation) return;

    const userText = msg.message.conversation;
    console.log("User:", userText);

    if (!isHealthQuery(userText)) {
      // 🚫 Non-health query
      await sock.sendMessage(msg.key.remoteJid, { 
        text: "⚠️ I can only answer health-related questions. Please ask about symptoms, treatments, or wellness." 
      });
      return;
    }

    // ✅ Health-related → Ask Gemini
    const reply = await askGemini(userText);

    await sock.sendMessage(msg.key.remoteJid, { text: reply });
  });
}

startBot();
