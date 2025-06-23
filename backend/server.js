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

const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();

// Cors options
const corsOptions = {
  origin: process.env.NODE_ENV === "production" 
    ? true // Allow all origins in production
    : "http://localhost:5173",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "Cookie"],
};

// Middleware
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
  });
});

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoute);
app.use("/api/user", userRoute);

// Serve static files in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "frontend/dist")));

  // Handle React routing - send all non-API requests to index.html
  app.get("*", (req, res) => {
    if (req.path.startsWith("/api")) {
      res.status(404).json({ message: "API route not found" });
    } else {
      res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
    }
  });
} else {
  app.get("/", (req, res) => {
    res.json({ message: "LetsTalk API is running in development mode!" });
  });
}

// Error handling middleware
app.use((error, req, res, next) => {
  console.error("Error:", error.stack);
  res.status(500).json({
    message: "Something went wrong",
    error: process.env.NODE_ENV === "production" ? {} : error.stack
  });
});

server.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  connectDB();
});