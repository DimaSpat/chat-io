"use client";

import { type JSX, useEffect, useState, useRef } from "react";
import socket from "@/lib/socket";
import { useRouter } from "next/navigation";

export default function ChatOutput() {
  const [messages, setMessages] = useState<string[]>([]);
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const router = useRouter();

  // Function to scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    // Check if logged into an account
    if (localStorage.length === 0) {
      router.push("/auth");
    }

    // Check if socket is connected
    if (socket.connected) {
      console.log("Socket already connected on mount");
    } else {
      console.log("Socket not connected on mount, connecting...");
      socket.connect();
    }

    // Function to handle existing messages
    const handleExistingMessages = (messages: string[]): void => {
      console.log("Received existing messages:", messages);
      setMessages(messages);
      setIsConnected(true);
      // Scroll to bottom after messages load
      setTimeout(scrollToBottom, 100);
    };

    // Function to handle new messages
    const handleNewMessage = (message: string): void => {
      console.log("Received new message:", message);
      setMessages((prevMessages: string[]): string[] => {
        const updatedMessages = [...prevMessages, message];
        // Scroll to bottom after state update
        setTimeout(scrollToBottom, 100);
        return updatedMessages;
      });
    };

    // Register event handlers
    socket.on("existingMessages", handleExistingMessages);
    socket.on("message", handleNewMessage);

    // Request messages from server if connected
    if (socket.connected) {
      console.log("Requesting messages from server");
      socket.emit("getMessages");
    }

    // Cleanup function
    return () => {
      console.log("Cleaning up socket event listeners");
      socket.off("existingMessages", handleExistingMessages);
      socket.off("message", handleNewMessage);
    };
  }, []); // Empty dependency array to run only once on mount

  // Scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Handle errors
  if (error) {
    return (
      <div
        style={{
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          color: "#ef4444",
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
          style={{ marginBottom: "1rem", color: "#ef4444" }}
        >
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="8" x2="12" y2="12"></line>
          <line x1="12" y1="16" x2="12.01" y2="16"></line>
        </svg>
        <h1
          style={{
            fontSize: "1.25rem",
            fontWeight: "500",
            margin: "0 0 0.5rem 0",
          }}
        >
          Connection Error
        </h1>
        <p
          style={{
            fontSize: "0.875rem",
            margin: 0,
          }}
        >
          {error}
        </p>
        <button
          onClick={() => window.location.reload()}
          style={{
            marginTop: "1rem",
            padding: "0.5rem 1rem",
            backgroundColor: "#ef4444",
            color: "white",
            border: "none",
            borderRadius: "0.375rem",
            cursor: "pointer",
          }}
        >
          Retry Connection
        </button>
      </div>
    );
  }

  // Loading state
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
        <p
          style={{
            fontSize: "0.875rem",
            color: "#6c757d",
            margin: "0.5rem 0 0 0",
          }}
        >
          This may take a moment
        </p>

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

  // Empty state
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

  // Messages display
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
        // Simple logic to determine if message is from current user
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
      {/* Invisible div for scrolling to bottom */}
      <div ref={messagesEndRef} />
    </div>
  );
}
