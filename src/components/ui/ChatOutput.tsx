'use client';

import {JSX, use, useEffect, useState} from "react";
import socket from "@/lib/socket";
import {useRouter} from "next/navigation";

export default function ChatOutput() {
  const [messages, setMessages] = useState<string[]>([]);
  const [isConnected, setIsConnected] = useState<boolean>(false);

  const router = useRouter();

  useEffect((): void => {
    console.log(1);

    socket.on("existingMessages", (messages: string[]): void => {
      setMessages(messages);
      setIsConnected(true);
      console.log(2);
    });

    socket.on("message", (message: string): void => {
      setMessages((prevMessages: string[]): string[] => [...prevMessages, message]);
    });
  }, []);



  if (!isConnected) {
    return (
        <div>
          <h1>Loading...</h1>
        </div>
    );
  }

  if (messages.length === 0) {
    return (
        <div>
          <h1>There isn't messages yet</h1>
        </div>
    );
  }

  return (
      <div>
        {messages.map((message: string, index: number): JSX.Element => (
            <div key={index}>{message}</div>
        ))}
      </div>
  );
}