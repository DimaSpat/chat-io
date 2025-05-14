import { io } from "socket.io-client";

// Create a singleton socket instance
let socket: any;

// Initialize socket if it doesn't exist
const getSocket = () => {
  if (!socket) {
    // Connect to the server
    socket = io("http://localhost:3001", {
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
      autoConnect: true,
      forceNew: false,
    });

    // Add connection event handlers for debugging
    socket.on("connect", () => {
      console.log("Socket connected:", socket.id);
    });

    socket.on("connect_error", (err: any) => {
      console.error("Socket connection error:", err);
    });

    socket.on("disconnect", (reason: string) => {
      console.log("Socket disconnected:", reason);
    });
  }

  return socket;
};

export default getSocket();
