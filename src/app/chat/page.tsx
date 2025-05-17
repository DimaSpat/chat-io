"use client";

import React, {JSX} from "react";
import ChatInput from "@/components/ui/ChatInput";
import ChatOutput from "@/components/ui/ChatOutput";
import {Metadata} from "next";

const metadata: Metadata = {
  title: 'Authentification',
};

export default function Home(): JSX.Element {

  return (
      <div>

        <div
            style={{
              display: "flex",
              flexDirection: "column",
              height: "100vh",
              backgroundColor: "#f8f9fa",
            }}
        >
          {/* Header */}
          <header
              style={{
                padding: "1rem",
                backgroundColor: "white",
                borderBottom: "1px solid #e5e7eb",
                boxShadow: "0 1px 2px rgba(0, 0, 0, 0.05)",
              }}
          >
            <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
            >
              <h1
                  style={{
                    fontSize: "1.5rem",
                    fontWeight: "bold",
                    margin: 0,
                  }}
              >
                Chat-IO
              </h1>

              <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                  }}
              >
            <span
                style={{
                  fontSize: "0.875rem",
                  color: "#6c757d",
                }}
            >
              Logged in as <span style={{fontWeight: "500"}}>{localStorage.getItem("user")}</span>
            </span>
              </div>
            </div>
          </header>

          {/* Chat container */}
          <div
              style={{
                display: "flex",
                flexDirection: "column",
                flex: 1,
                overflow: "hidden",
              }}
          >
            {/* Chat output takes most of the space */}
            <div
                style={{
                  flex: 1,
                  overflow: "hidden",
                  padding: "1rem",
                }}
            >
              <ChatOutput/>
            </div>

            {/* Chat input fixed at bottom */}
            <div
                style={{
                  padding: "1rem",
                  backgroundColor: "white",
                  borderTop: "1px solid #e5e7eb",
                }}
            >
              <ChatInput/>
            </div>
          </div>
        </div>
      </div>
  );
}