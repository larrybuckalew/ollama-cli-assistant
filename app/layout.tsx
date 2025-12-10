import type React from "react" 
import type { Metadata } from "next" 
import { Geist, Geist_Mono } from "next/font/google" 
import AppNav from "@/components/app-nav" 
import AppFooter from "@/components/app-footer" 
import "./globals.css" 

const geistSans = Geist({ subsets: ["latin"] })
const geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Ollama CLI - Advanced AI Terminal for Developers",
  description:
    "The most powerful Ollama CLI with MCP integration, real-time token tracking, and advanced features for professional developers.",
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={`${geistSans.className} antialiased`} suppressHydrationWarning>
        <AppNav />
        {children}
        <AppFooter />
      </body>
    </html>
  )
}
