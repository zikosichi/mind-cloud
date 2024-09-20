"use client";

import { useEffect } from "react";
import localFont from "next/font/local";
import "./globals.css";
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import { metadata } from "./metadata";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function RootLayout({ children }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.metaKey) {
        document.body.classList.add("command-key-pressed");
      }
    };

    const handleKeyUp = (e) => {
      if (!e.metaKey) {
        document.body.classList.remove("command-key-pressed");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    // Cleanup event listeners on component unmount
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
