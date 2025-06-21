import { Server } from "socket.io";
import express from "express";
import http from "http";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin:
      process.env.NODE_ENV === "production"
        ? process.env.FRONTEND_URL || true
        : ["http://localhost:5173", "http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true
  },
  transports: ["websocket", "polling"],
  pingTimeout: 60000,
  pingInterval: 25000
});

// Store user socket maping for real-time features
const userSocketMap = {};

// Get receiver socket id
export const getReceiverSocketId = (receiverId) => {
  return userSocketMap[receiverId];
};

io.on("connection", (socket) => {
  console.log("User connected socketid:", socket.id);

  // Get userId from socket handshake query and update usersocketmap
  const userId = socket.handshake.query.userId;
  if (userId && userId !== "undefined") {
    userSocketMap[userId] = socket.id;
    console.log(`User ${userId} mapped to socket ${socket.id}`);

  // Generate emit event to update the online users list to all clients
  io.emit("getOnlineUsers", Object.keys(userSocketMap));
  }
});

  // Disconnect user event
  socket.on("disconnect", () => {
    console.log("User disconnected socketId:", socket.id);
    delete userSocketMap[userId];
    console.log(`User ${userId} removed from mapping`);

    io.emit("getOnlineUsers", Object.keys(userSocketMap));
    console.log("📡 Online users updated:", Object.keys(userSocketMap).length);

    socket.on("error", (error) => {
    console.error("Socket error:", error);
  });

  // Handle connection errors
  socket.on("connect_error", (error) => {
    console.error("Connection error:", error);
  });
  })

export { app, server, io };
