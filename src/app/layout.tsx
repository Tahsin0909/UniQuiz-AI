import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/shared/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "UniQuiz-AI",
  description: "UniQuiz AI is an intelligent PDF to Quiz generator designed specifically for universities, professors, and students. Using advanced AI-powered processing, the app converts lecture notes, research papers, and study materials into interactive multiple-choice quizzes within seconds. ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="light">
      <body
        style={
          {
            background:
              "linear-gradient(50deg, #032E5CFF 37.44%, #36719BFF 67.11%)",
          }}
        className={`${geistSans.variable} ${geistMono.variable} antialiased `}
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}
