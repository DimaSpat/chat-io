const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
app.use(cors());
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

const messages = [];

io.on("connection", (socket) => {
    io.emit("existingMessages", messages);

    console.log(`User connected: ${socket.id}`);

    socket.on("message", (message) => {
        messages.push(message);
        io.emit("message", message);
    });

    socket.on("disconnect", () => {
        console.log(`User disconnected: ${socket.id}`);
    })
});

const PORT = 3001;
httpServer.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});