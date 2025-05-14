"use client";

import { useState } from "react";
import socket from "@/lib/socket";

export default function ChatInput() {
  const [message, setMessage] = useState<string>("");
  const [isSending, setIsSending] = useState<boolean>(false);

  const sendMessage = async (event: any): Promise<void> => {
    event.preventDefault();

    // Don't send empty messages
    if (message.trim() === "") return;

    try {
      setIsSending(true);

      // Get username from localStorage
      const username = localStorage.getItem("user") || "Anonymous";

      // Format message with username
      const formattedMessage = `${username}: ${message}`;

      // Emit message event
      console.log("Sending message:", formattedMessage);
      socket.emit("message", formattedMessage);

      // Clear input
      setMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setIsSending(false);
    }
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
          disabled={isSending}
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
          disabled={isSending || message.trim() === ""}
          style={{
            backgroundColor: "#333",
            color: "white",
            border: "none",
            borderRadius: "1.5rem",
            padding: "0.75rem 1.5rem",
            fontSize: "1rem",
            fontWeight: "500",
            cursor:
              isSending || message.trim() === "" ? "not-allowed" : "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "background-color 0.2s",
            opacity: isSending || message.trim() === "" ? 0.7 : 1,
          }}
        >
          {isSending ? (
            <span>Sending...</span>
          ) : (
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
          )}
        </button>
      </form>
    </div>
  );
}
