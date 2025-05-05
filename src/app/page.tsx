'use client';

import { JSX } from "react";
import ChatInput from "@/components/ui/ChatInput";
import ChatOutput from "@/components/ui/ChatOutput";

export default function Home(): JSX.Element {
  return (
    <div>
      <ChatInput></ChatInput>
      <ChatOutput></ChatOutput>
    </div>
  );
}
