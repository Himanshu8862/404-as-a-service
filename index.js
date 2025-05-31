const express = require("express");
const rateLimit = require("express-rate-limit");
const cors = require("cors");
const helmet = require("helmet");
const messages = require("./messages");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(helmet());

// Rate limit: 120 requests per minute per IP
const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 120,
  message: {
    error: "Rate limit exceeded. Please wait a moment and try again."
  }
});
app.use(limiter);

// Root endpoint
app.get("/", (req, res) => {
  const message = messages[Math.floor(Math.random() * messages.length)];
  res.status(404).json({ error: message });
});

// 404 fallback (non-GET or invalid paths)
app.use((req, res) => {
  res.status(404).json({ error: "404: This route doesn’t exist" });
});

// Start server
app.listen(PORT, () => {
  console.log(`404-as-a-service running at PORT ${PORT}`);
});
