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
      <div
          style={{
            width: "100%",
          }}
      >
        <form
            style={{
              display: "flex",
              gap: "0.5rem",
            }}
            onSubmit={sendMessage}
        >
          <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message..."
              style={{
                flex: 1,
                padding: "0.75rem 1rem",
                borderRadius: "1.5rem",
                border: "1px solid #e5e7eb",
                fontSize: "1rem",
                outline: "none",
                transition: "border-color 0.2s",
              }}
          />
          <button
              type="submit"
              style={{
                backgroundColor: "#333",
                color: "white",
                border: "none",
                borderRadius: "1.5rem",
                padding: "0.75rem 1.5rem",
                fontSize: "1rem",
                fontWeight: "500",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "background-color 0.2s",
              }}
          >
          <>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ marginRight: "0.25rem" }}
            >
              <line x1="22" y1="2" x2="11" y2="13"></line>
              <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
            </svg>
            Send
          </>
          </button>
        </form>
      </div>
  )
}