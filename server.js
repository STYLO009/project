const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const twilio = require('twilio');

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Twilio credentials (replace with your actual ones)
const accountSid = "";
const authToken = "";
const twilioPhone = ""; // Your Twilio phone number
const client = twilio(accountSid, authToken);

// File paths
const filepathl = path.join(process.cwd(), 'login.txt');
const filepaths = path.join(process.cwd(), 'signup.txt');

// Temporary OTP storage (session-like)
const otpStore = {}; // { "email/username": { otp: "123456", expires: 1234567890 } }

// Step 1: Signup request (send OTP)
app.post("/api/signup", async (req, res) => {
  const { username, email, password, phone } = req.body;

  const otp = Math.floor(100000 + Math.random() * 900000); // 6-digit OTP

  try {
    const message = await client.messages.create({
      body: `Your OTP is ${otp}`,
      from: twilioPhone,   // Your Twilio number e.g. "+1415XXXXXXX"
      to: phone            // Must be in +91XXXXXXXXXX format
    });

    console.log("✅ OTP sent:", message.sid);

    res.json({ success: true, message: "OTP sent to phone" });
  } catch (err) {
    console.error("❌ Twilio error:", err);

    // Send only one response
    if (!res.headersSent) {
      res.status(400).json({ success: false, message: "Failed to send OTP", error: err.message });
    }
  }
});


// Step 2: Verify OTP
app.post('/api/verify', (req, res) => {
    const { email, otp } = req.body;
    const session = otpStore[email];

    if (!session) {
        return res.status(400).json({ success: false, message: "No OTP session found" });
    }

    if (Date.now() > session.expires) {
        delete otpStore[email];
        return res.status(400).json({ success: false, message: "OTP expired" });
    }

    if (session.otp !== otp) {
        return res.status(400).json({ success: false, message: "Invalid OTP" });
    }

    // Save user after successful OTP verification
    const userData = {
        username: session.username,
        email: session.email,
        password: session.password,
    };
    const data = JSON.stringify(userData) + '\n';

    fs.appendFile(filepaths, data, (err) => {
        if (err) {
            console.error("❌ Data save failed:", err);
            return res.status(500).json({ success: false, message: "Network failed" });
        }
        console.log("✅ User registered:", data);
        delete otpStore[email];
        res.json({ success: true, message: "User registered successfully" });
    });
});

// Step 3: Login
app.post('/api/login', (req, res) => {
    const { username, email, password } = req.body;

    fs.readFile(filepaths, 'utf8', (err, fileData) => {
        if (err || !fileData) {
            return res.status(400).json({ success: false, message: "User not found. Please sign up first." });
        }

        const users = fileData
            .trim()
            .split('\n')
            .filter((line) => line.length > 0)
            .map((line) => JSON.parse(line));

        const found = users.find(
            (u) => u.username === username && u.email === email && u.password === password
        );

        if (!found) {
            return res.status(400).json({ success: false, message: "Invalid credentials" });
        }

        const data = JSON.stringify(found) + '\n';
        fs.appendFile(filepathl, data, (err) => {
            if (err) {
                console.error("❌ Data save failed:", err);
                return res.status(500).json({ success: false, message: "Network failed" });
            }
            console.log("✅ Login successful:", data);
            res.json({ success: true, message: "Login successful" });
        });
    });
});

// API: Fetch all login records
app.get('/api/data', (req, res) => {
    fs.readFile(filepathl, 'utf8', (err, data) => {
        if (err) {
            console.error("❌ File read failed:", err);
            return res.status(500).json({ success: false, message: "Network failed" });
        }

        const records = data
            .trim()
            .split('\n')
            .filter((line) => line.length > 0)
            .map((line) => JSON.parse(line));

        res.json({ success: true, records });
    });
});

// Test route
app.get('/', (req, res) => {
    res.send("🚀 Express backend is running with Twilio OTP!");
});

app.get('/ping', (req, res) => {
  res.send("✅ Server is alive");
});


app.listen(port, () => console.log(`Server is running on ${port}`));
