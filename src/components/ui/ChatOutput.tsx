"use client";

import { type JSX, useEffect, useState } from "react";
import socket from "@/lib/socket";
import { useRouter } from "next/navigation";

export default function ChatOutput() {
  const [messages, setMessages] = useState<string[]>([]);
  const [isConnected, setIsConnected] = useState<boolean>(false);

  useEffect((): void => {
    socket.on("existingMessages", (messages: string[]): void => {
      setMessages(messages);
      setIsConnected(true);
    });

    socket.on("message", (message: string): void => {
      setMessages((prevMessages: string[]): string[] => [
        ...prevMessages,
        message,
      ]);
    });
  });

  if (!isConnected) {
    return (
      <div
        style={{
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            width: "40px",
            height: "40px",
            border: "3px solid #e5e7eb",
            borderTopColor: "#333",
            borderRadius: "50%",
            animation: "spin 1s linear infinite",
            marginBottom: "1rem",
          }}
        />
        <h1
          style={{
            fontSize: "1.25rem",
            fontWeight: "500",
            color: "#6c757d",
            margin: 0,
          }}
        >
          Connecting to chat...
        </h1>

        <style jsx>{`
          @keyframes spin {
            to {
              transform: rotate(360deg);
            }
          }
        `}</style>
      </div>
    );
  }

  if (messages.length === 0) {
    return (
      <div
        style={{
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          color: "#6c757d",
          textAlign: "center",
          padding: "2rem",
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="64"
          height="64"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ marginBottom: "1rem", color: "#d1d5db" }}
        >
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
        </svg>
        <h1
          style={{
            fontSize: "1.25rem",
            fontWeight: "500",
            margin: "0 0 0.5rem 0",
          }}
        >
          No messages yet
        </h1>
        <p
          style={{
            fontSize: "0.875rem",
            margin: 0,
          }}
        >
          Be the first to start the conversation!
        </p>
      </div>
    );
  }

  return (
    <div
      style={{
        height: "100%",
        overflowY: "auto",
        display: "flex",
        flexDirection: "column",
        gap: "0.75rem",
        paddingRight: "0.5rem",
      }}
    >
      {messages.map((message: string, index: number): JSX.Element => {
        // Simple logic to determine if message is from current user (for demo purposes)
        // In a real app, you'd have proper user IDs
        const isCurrentUser = message.startsWith(
          localStorage.getItem("user") || "",
        );

        return (
          <div
            key={index}
            style={{
              alignSelf: isCurrentUser ? "flex-end" : "flex-start",
              maxWidth: "70%",
              backgroundColor: isCurrentUser ? "#333" : "white",
              color: isCurrentUser ? "white" : "#333",
              padding: "0.75rem 1rem",
              borderRadius: "1rem",
              borderBottomLeftRadius: isCurrentUser ? "1rem" : "0.25rem",
              borderBottomRightRadius: isCurrentUser ? "0.25rem" : "1rem",
              boxShadow: "0 1px 2px rgba(0, 0, 0, 0.05)",
              border: isCurrentUser ? "none" : "1px solid #e5e7eb",
              wordBreak: "break-word",
            }}
          >
            {message}
          </div>
        );
      })}
    </div>
  );
}
