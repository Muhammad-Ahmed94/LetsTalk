import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";

import authRoutes from "./routes/auth.route.js";
import messageRoute from "./routes/message.route.js";
import userRoute from "./routes/user.route.js";

import connectDB from "./lib/db.js";
import { app, server } from "./socket/socket.js";

dotenv.config();

const PORT = process.env.PORT || 8000;

const __dirname = path.resolve();

// Cors options
const corsOptions = {
  origin:
    process.env.NODE_ENV === "production"
      ? process.env.FRONTEND_URL || true
      : "http://localhost:5173",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowHeaders: ["Content-Type", "Authorization", "Cookie"],
};

// Middle-ware
app.use(cors(corsOptions));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(cookieParser());

// Health endpoint check
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    message: "Letstalk server is running",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || "development"
  })
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoute);
app.use("/api/user", userRoute);

// For production serve static frontend files
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.json({ message: "LetsTalk API is running in development mode!" });
  });
}

// Error handling middleware
app.use((error, req, res, next) => {
  console.error("Error", error.stack);
  res.status(500).json({
    message: "Something went wrong -- Error handling middleware",
    error: process.env.NODE_ENV === "production" ? {} : error.stack
  });
});

// 404 handler
app.use("*", (req, res) => {
  if(req.originalUrl.startsWith("/api")) {
    res.status(404).json({message: "Api route not found"})
  } else {
    res.status(404).sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  }
});

// ✔ Graceful shutdown
// process.on('SIGTERM', () => {
//   console.log('SIGTERM received, shutting down gracefully');
//   server.close(() => {
//     console.log('Process terminated');
//   });
// });

server.listen(PORT, () => {
  console.log(`Server running on port:${PORT}`);
  console.log(`📍 Environment: ${process.env.NODE_ENV || 'development'}`);
  connectDB();
});
