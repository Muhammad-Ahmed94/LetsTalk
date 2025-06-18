import { Server } from "socket.io";
import express from "express";
import http from "http";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST"],
  },
});

// Store user socket maping for real-time features
const userSocketMap = {};

// Get receiver socket id
export const getReceiverSocketId = (receiverId) => {
  return userSocketMap[receiverId];
}

io.on("connection", (socket) => {
  console.log("User connected socketid:", socket.id);

  // Get userId from socket handshake query and update usersocketmap
  const userId = socket.handshake.query.userId;
  if(userId !== "undefined") {
    userSocketMap[userId] = socket.id;
  };

  // Generate emit event to update the online users list to all clients
  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  // Disconnect user event
  socket.on("disconnect", () => {
    console.log("User disconnected socketId:", socket.id);
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  })
});

export { app, server, io };
