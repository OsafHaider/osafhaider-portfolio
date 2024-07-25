"use client";
import { JetBrains_Mono } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";
import "./globals.css";
// Components
import Header from "@/components/Header";
import Pagetransition from "@/components/Pagetransition";
import Stairtransition from "@/components/Stairtransition";
import { User } from "@/context/User";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
  variable: "--font-jetbrainsMono",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={jetbrainsMono.variable}>
        <User>
          <Header />
          <Stairtransition />
          <Pagetransition>{children}</Pagetransition>
          <Toaster />
        </User>
      </body>
    </html>
  );
}
