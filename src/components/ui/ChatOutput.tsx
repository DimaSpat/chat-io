'use client';

import {JSX, useEffect, useState} from "react";
import socket from "@/lib/socket";

export default function ChatOutput() {
  const [messages, setMessages] = useState<string[]>([]);

  useEffect((): void => {
    socket.on("existingMessages", (messages: string[]): void => {
      setMessages(messages);
    });

    socket.on("message", (message: string): void => {
      setMessages((prevMessages: string[]): string[] => [...prevMessages, message]);
    });
  }, []);

  return (
      <div>
        {messages.map((message: string, index: number): JSX.Element => (
            <div key={index}>{message}</div>
        ))}
      </div>
  );
}