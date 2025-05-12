'use client';

import {JSX, useEffect, useState} from "react";
import {Metadata} from "next";
import {useRouter} from "next/navigation";

const metadata: Metadata = {
  title: 'Authentification',
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
        const response = await fetch('http://localhost:3001/api/auth/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data)
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
      <div>
        {isLoggingIn ?
          (
              <div>
                <h1>Logging in</h1>
                <form onSubmit={(event) => authenticate(event)}>
                  <input
                      type="text"
                      placeholder="Username"
                      onChange={(e) => setUser(e.target.value)}
                  />
                  <input
                      type="password"
                      placeholder="Password"
                      onChange={(e) => setPassword(e.target.value)}
                  />
                  <input type="submit" value="Login" />
                </form>
                <button onClick={() => setIsLoggingIn(false)}>Sign in</button>
              </div>
          )
            :
            (
                <div>
                  <h1>Sign in</h1>
                  <form onSubmit={(event) => authenticate(event)}>
                    <input
                        type="text"
                        placeholder="Username"
                        onChange={(e) => setUser(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <input type="submit" value="Login"/>
                  </form>
                  <button onClick={() => setIsLoggingIn(true)}>Log in</button>
                </div>
            )}
      </div>

  );
}
