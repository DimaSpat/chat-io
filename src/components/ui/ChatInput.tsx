'use client';

import { useState } from "react";
import socket from "@/lib/socket";

export default function ChatInput() {
  const [message, setMessage] = useState<string>("");

  const sendMessage = (event: any): void => {
    event.preventDefault();
    socket.emit("message", message);
    setMessage("");
  };

  return (
      <div>
        <form>
          <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
          />
          <button onClick={sendMessage}>Send</button>
        </form>
      </div>
  );
}