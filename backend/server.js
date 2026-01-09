// 🔥 MUST BE FIRST — loads .env before anything else
import "dotenv/config";

import express from "express";
import cors from "cors";
import requestRoutes from "./routes/requestRoutes.js";

const app = express();

/* -------------------- MIDDLEWARE -------------------- */
app.use(cors());
app.use(express.json());

/* -------------------- ROUTES -------------------- */
app.use("/api/requests", requestRoutes);

// Health check
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    uptime: process.uptime(),
  });
});

/* -------------------- SERVER -------------------- */
const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`🚀 Backend server running on port ${PORT}`);
});

/* -------------------- ERROR HANDLING -------------------- */
server.on("error", (error) => {
  if (error.code === "EADDRINUSE") {
    console.error(`❌ Port ${PORT} is already in use`);
  } else {
    console.error("❌ Server error:", error);
  }
  process.exit(1);
});

/* -------------------- GRACEFUL SHUTDOWN -------------------- */
process.on("SIGINT", () => {
  console.log("🛑 SIGINT received. Shutting down gracefully...");
  server.close(() => process.exit(0));
});

process.on("SIGTERM", () => {
  console.log("🛑 SIGTERM received. Shutting down gracefully...");
  server.close(() => process.exit(0));
});
