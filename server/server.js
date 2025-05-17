const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const { createServer } = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const PORT = 3001;
const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

const Message = require("./models/Message.ts");
const authRoutes = require("./routes/auth.js");

const messages = [];

dotenv.config();

async function init() {
    try {
        console.log("Server initialising...");

        // Connect to database
        await mongoose.connect("mongodb+srv://admin:admin@cluster.3gnwk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster")
            .then(() => console.log("Connected to MongoDB"));

        // Fetch from database
        const dbMessages = await Message.find().lean();

        for (let index = 0; index < dbMessages.length; index++) {
            messages.push(dbMessages[index].text);
        }

        console.log("Messages fetched from database");
    } catch (err) {
        console.error("Error initialising server:", err);
    }

    // Socket.io server
    httpServer.listen(PORT);
}

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);

init().then(() => console.log(`Server successfully started on port ${PORT}`));

io.on("connection", (socket) => {
    io.emit("existingMessages", messages);

    console.log(`User connected: ${socket.id}`);

    socket.on("message", async (message) => {
        try {
            const newDBMssage = await Message.create({ text: message });

            console.log("Message saved to database:", newDBMssage);

            newDBMssage.save();
            messages.push(newDBMssage.text);

            socket.broadcast.emit("message", newDBMssage.text);
        } catch (error) {
            console.error("Error sending message:", error);
        }
    });

    socket.on("disconnect", () => {
        console.log(`User disconnected: ${socket.id}`);
    })
});

