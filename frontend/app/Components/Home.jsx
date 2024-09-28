"use client";
import Link from "next/link";
import React from "react";      

function Home() {
  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      <div className="flex justify-center items-center gap-4">
        <Link href="/login" className="bg-blue-500 text-white px-4 py-2 rounded-md">Login</Link>
        <Link href="/signup" className="bg-green-500 text-white px-4 py-2 rounded-md">Signup</Link>
      </div>
    </div>
  );
}

export default Home;