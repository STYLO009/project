import makeWASocket from "@whiskeysockets/baileys";
import { useMultiFileAuthState } from "@whiskeysockets/baileys";
import qrcode from "qrcode-terminal";
import fetch from "node-fetch";

// 🔑 Replace with your Gemini API Key
const GEMINI_API_KEY = "";
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;

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
      qrcode.generate(qr, { small: true }); // ✅ Display QR in terminal
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

    // 🤖 Get AI response from Gemini
    const reply = await askGemini(userText);

    // Send reply back to WhatsApp
    await sock.sendMessage(msg.key.remoteJid, { text: reply });
  });
}

startBot();
