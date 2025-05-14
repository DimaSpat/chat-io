"use client";

import { useEffect } from "react";
import socket from "@/lib/socket";

export default function SocketManger() {
  useEffect(() => {
    socket.connect();

    socket.on("connect", () => {
      console.log("Connected to server");
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from server");
    });

    socket.on("chat message", (msg) => {
      console.log("Message received: " + msg);
    });

    return () => {
      socket.off("message");
      socket.off("connect");
      socket.disconnect();
    };
  }, []);

  return null;
}
