"use client";

import { type JSX, useEffect, useState } from "react";
import type { Metadata } from "next";
import { useRouter } from "next/navigation";

const metadata: Metadata = {
  title: "Authentication",
};

export default function Home(): JSX.Element {
  const [user, setUser] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState<boolean>(false);

  const router = useRouter();

  async function authenticate(event: any): Promise<void> {
    event.preventDefault();
    const data = { user, password, isLoggingIn };

    if (user != null && password != null) {
      try {
        const response = await fetch("http://localhost:3001/api/auth/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        console.log(response);

        if (response.status === 200) {
          localStorage.setItem("user", user);
          router.push("/chat");
        }
      } catch (error) {
        console.error(error);
      }
    }
  }

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      router.push("/chat");
    }
  }, [router]);

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
          backgroundColor: "white",
          borderRadius: "1rem",
          boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
          width: "100%",
          maxWidth: "400px",
          overflow: "hidden",
        }}
      >
        {/* Tabs */}
        <div
          style={{
            display: "flex",
            borderBottom: "1px solid #e5e7eb",
          }}
        >
          <button
            style={{
              flex: 1,
              padding: "1rem",
              textAlign: "center",
              fontWeight: "500",
              backgroundColor: isLoggingIn ? "#f8f9fa" : "transparent",
              color: isLoggingIn ? "#333" : "#6c757d",
              border: "none",
              cursor: "pointer",
              borderBottom: isLoggingIn ? "2px solid #333" : "none",
            }}
            onClick={() => setIsLoggingIn(true)}
          >
            Log in
          </button>
          <button
            style={{
              flex: 1,
              padding: "1rem",
              textAlign: "center",
              fontWeight: "500",
              backgroundColor: !isLoggingIn ? "#f8f9fa" : "transparent",
              color: !isLoggingIn ? "#333" : "#6c757d",
              border: "none",
              cursor: "pointer",
              borderBottom: !isLoggingIn ? "2px solid #333" : "none",
            }}
            onClick={() => setIsLoggingIn(false)}
          >
            Sign up
          </button>
        </div>

        <div style={{ padding: "2rem" }}>
          <h1
            style={{
              fontSize: "1.5rem",
              fontWeight: "bold",
              marginBottom: "1.5rem",
              textAlign: "center",
              color: "#333",
            }}
          >
            {isLoggingIn ? "Welcome Back" : "Create Account"}
          </h1>

          <form
            onSubmit={(event) => authenticate(event)}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1.25rem",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
              }}
            >
              <label
                htmlFor="username"
                style={{
                  fontSize: "0.875rem",
                  fontWeight: "500",
                  color: "#4b5563",
                }}
              >
                Username
              </label>
              <input
                id="username"
                type="text"
                placeholder="Enter your username"
                onChange={(e) => setUser(e.target.value)}
                style={{
                  padding: "0.75rem",
                  borderRadius: "0.5rem",
                  border: "1px solid #d1d5db",
                  fontSize: "1rem",
                  width: "100%",
                  outline: "none",
                  transition: "border-color 0.2s",
                }}
              />
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
              }}
            >
              <label
                htmlFor="password"
                style={{
                  fontSize: "0.875rem",
                  fontWeight: "500",
                  color: "#4b5563",
                }}
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  padding: "0.75rem",
                  borderRadius: "0.5rem",
                  border: "1px solid #d1d5db",
                  fontSize: "1rem",
                  width: "100%",
                  outline: "none",
                  transition: "border-color 0.2s",
                }}
              />
            </div>

            <button
              type="submit"
              style={{
                marginTop: "0.5rem",
                padding: "0.75rem",
                backgroundColor: "#333",
                color: "white",
                border: "none",
                borderRadius: "0.5rem",
                fontSize: "1rem",
                fontWeight: "500",
                cursor: "pointer",
                transition: "background-color 0.2s",
              }}
            >
              {isLoggingIn ? "Log in" : "Sign up"}
            </button>
          </form>

          <p
            style={{
              marginTop: "1.5rem",
              fontSize: "0.875rem",
              color: "#6c757d",
              textAlign: "center",
            }}
          >
            {isLoggingIn
              ? "Don't have an account?"
              : "Already have an account?"}{" "}
            <button
              onClick={() => setIsLoggingIn(!isLoggingIn)}
              style={{
                background: "none",
                border: "none",
                color: "#333",
                fontWeight: "500",
                cursor: "pointer",
                padding: 0,
                fontSize: "0.875rem",
                textDecoration: "underline",
              }}
            >
              {isLoggingIn ? "Sign up" : "Log in"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
