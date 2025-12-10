"use client"

import { useState, useRef, useEffect } from "react"
import { Terminal, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"

interface Message {
  type: "user" | "assistant" | "system"
  content: string
}

export default function TryCLIPage() {
  const [messages, setMessages] = useState<Message[]>([
    { type: "system", content: "🚀 Ollama CLI Interactive Demo" },
    { type: "system", content: "Type a message to chat with the AI..." },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const terminalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [messages])

  const handleSend = async () => {
    if (!input.trim() || isLoading) return

    const userMessage = input.trim()
    setInput("")
    setMessages((prev) => [...prev, { type: "user", content: userMessage }])
    setIsLoading(true)

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [{ role: "user", content: userMessage }],
          model: "llama3.2",
        }),
      })

      if (!response.ok) throw new Error("Failed to get response")

      const reader = response.body?.getReader()
      if (!reader) throw new Error("No response body")

      let assistantMessage = ""
      setMessages((prev) => [...prev, { type: "assistant", content: "" }])

      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        const chunk = new TextDecoder().decode(value)
        const lines = chunk.split("\n").filter((line) => line.trim())

        for (const line of lines) {
          if (line.startsWith("data: ")) {
            const data = line.slice(6)
            if (data === "[DONE]") continue

            try {
              const parsed = JSON.parse(data)
              if (parsed.content) {
                assistantMessage += parsed.content
                setMessages((prev) => {
                  const newMessages = [...prev]
                  newMessages[newMessages.length - 1] = {
                    type: "assistant",
                    content: assistantMessage,
                  }
                  return newMessages
                })
              }
            } catch (e) {
              console.error("Parse error:", e)
            }
          }
        }
      }
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          type: "system",
          content: `Error: ${error instanceof Error ? error.message : "Unknown error"}`,
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <section className="border-b border-border py-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3 mb-2">
            <Terminal className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold">Try Ollama CLI</h1>
          </div>
          <p className="text-muted-foreground">
            Experience the CLI in your browser - no installation required!
          </p>
        </div>
      </section>

      <section className="py-8">
        <div className="container mx-auto px-4 max-w-5xl">
          <Card className="overflow-hidden">
            <div className="bg-card/50 backdrop-blur-sm p-3 border-b border-border flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-destructive" />
              <div className="h-3 w-3 rounded-full bg-terminal-amber" />
              <div className="h-3 w-3 rounded-full bg-terminal-green" />
              <span className="ml-auto text-xs text-muted-foreground font-mono">
                ollama-cli v2.0 (web demo)
              </span>
            </div>

            <div
              ref={terminalRef}
              className="bg-background/95 p-6 h-[500px] overflow-y-auto font-mono text-sm space-y-3"
            >
              {messages.map((msg, i) => (
                <div key={i} className="space-y-1">
                  {msg.type === "system" && (
                    <div className="text-terminal-green">{msg.content}</div>
                  )}
                  {msg.type === "user" && (
                    <>
                      <div className="text-primary">$ {msg.content}</div>
                    </>
                  )}
                  {msg.type === "assistant" && (
                    <div className="text-foreground whitespace-pre-wrap pl-2">
                      {msg.content}
                      {isLoading && i === messages.length - 1 && (
                        <span className="inline-block w-2 h-4 bg-primary animate-pulse ml-1" />
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="bg-card/30 backdrop-blur-sm p-4 border-t border-border">
              <div className="flex gap-2">
                <div className="flex-1 flex items-center gap-2 bg-background rounded-md px-3 py-2">
                  <span className="text-terminal-green font-mono">$</span>
                  <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSend()}
                    placeholder="Type your message..."
                    className="border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
                    disabled={isLoading}
                  />
                </div>
                <Button onClick={handleSend} disabled={isLoading || !input.trim()}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Press Enter to send • This is a demo connected to our API
              </p>
            </div>
          </Card>

          <div className="mt-6 text-center">
            <p className="text-muted-foreground mb-4">
              Want the full experience? Download the CLI for your terminal!
            </p>
            <div className="flex gap-4 justify-center">
              <Button asChild>
                <a href="/downloads/ollama-cli.py" download>
                  Download CLI
                </a>
              </Button>
              <Button variant="outline" asChild>
                <a href="/docs/cli">View Documentation</a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
