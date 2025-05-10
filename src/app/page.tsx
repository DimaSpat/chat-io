'use client';

import { JSX } from "react";
import Link from "next/link";

export default function Home(): JSX.Element {
  return (
    <div>
      <h1>Home Page</h1>
      <Link href={"/auth"}>Authenticate</Link>
    </div>
  );
}
