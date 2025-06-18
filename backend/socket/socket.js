import { Server } from "socket.io";
import express from "express";
import http from "http";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5000"],
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("a user connected socketID", socket.id);

  // socket.on() is used to listen to events on both client and server side.
  socket.on("disconnect", () => {
    console.log("User disconnected socket id", socket.id);
  });
});
export { app, server, io };
