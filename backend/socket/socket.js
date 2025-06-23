import { Server } from "socket.io";
import express from "express";
import http from "http";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: process.env.NODE_ENV === "production" 
      ? true // Allow all origins in production
      : ["http://localhost:5173", "http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true
  },
  transports: ["websocket", "polling"],
  pingTimeout: 60000,
  pingInterval: 25000
});

// Store user socket mapping for real-time features
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

  // Disconnect user event
  socket.on("disconnect", () => {
    console.log("User disconnected socketId:", socket.id);
    if (userId && userId !== "undefined") {
      delete userSocketMap[userId];
      console.log(`User ${userId} removed from mapping`);
      io.emit("getOnlineUsers", Object.keys(userSocketMap));
    }
  });
});

export { app, server, io };