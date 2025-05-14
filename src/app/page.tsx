"use client";

import Link from "next/link";

export default function Home() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        background: "linear-gradient(to bottom, #f8f9fa, #e9ecef)",
        padding: "1rem",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "400px",
          textAlign: "center",
        }}
      >
        <div style={{ marginBottom: "2rem" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginBottom: "1rem",
            }}
          >
            <div
              style={{
                height: "96px",
                width: "96px",
                borderRadius: "50%",
                backgroundColor: "#333",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {/* Simple message icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                style={{ height: "48px", width: "48px", color: "white" }}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                />
              </svg>
            </div>
          </div>
          <h1
            style={{
              fontSize: "2.25rem",
              fontWeight: "bold",
              marginBottom: "0.5rem",
            }}
          >
            Chat-IO
          </h1>
          <p style={{ color: "#6c757d", marginBottom: "2rem" }}>
            Connect and chat with friends in a simple, modern interface
          </p>
        </div>

        <Link href="/auth" style={{ display: "block", width: "100%" }}>
          <button
            style={{
              width: "100%",
              padding: "1rem 1.5rem",
              fontSize: "1.125rem",
              backgroundColor: "#333",
              color: "white",
              fontWeight: "500",
              borderRadius: "0.375rem",
              border: "none",
              cursor: "pointer",
            }}
          >
            Get Started
          </button>
        </Link>
      </div>
    </div>
  );
}
