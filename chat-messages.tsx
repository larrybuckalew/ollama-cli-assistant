"use client"

import { useEffect, useRef } from "react"
import type { UIMessage } from "ai"
import { User, Bot, Loader2 } from "lucide-react"
import Markdown from "react-markdown"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism"

interface ChatMessagesProps {
  messages: UIMessage[]
  status: string
}

export function ChatMessages({ messages, status }: ChatMessagesProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  return (
    <div className="flex h-full flex-col overflow-y-auto p-6">
      {messages.length === 0 && (
        <div className="flex h-full flex-col items-center justify-center text-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <Bot className="h-8 w-8 text-primary" />
          </div>
          <h2 className="mb-2 text-2xl font-semibold text-foreground">Welcome to Ollama CLI</h2>
          <p className="max-w-md text-pretty text-muted-foreground">
            Start a conversation with your local AI models. Advanced features like MCP integration and token tracking
            are ready to use.
          </p>
        </div>
      )}

      {messages.map((message) => (
        <div
          key={message.id}
          className={`mb-6 flex gap-4 ${message.role === "user" ? "justify-end" : "justify-start"}`}
        >
          {message.role === "assistant" && (
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10">
              <Bot className="h-4 w-4 text-primary" />
            </div>
          )}

          <div
            className={`max-w-[70%] rounded-lg px-4 py-3 ${
              message.role === "user" ? "bg-primary text-primary-foreground" : "bg-card border border-border"
            }`}
          >
            {message.parts.map((part, index) => {
              if (part.type === "text") {
                return (
                  <div key={index} className="prose prose-invert max-w-none">
                    <Markdown
                      components={{
                        code(props) {
                          const { children, className, ...rest } = props
                          const match = /language-(\w+)/.exec(className || "")
                          return match ? (
                            <SyntaxHighlighter style={vscDarkPlus} language={match[1]} PreTag="div">
                              {String(children).replace(/\n$/, "")}
                            </SyntaxHighlighter>
                          ) : (
                            <code {...rest} className={`${className} rounded bg-muted px-1.5 py-0.5 font-mono text-sm`}>
                              {children}
                            </code>
                          )
                        },
                      }}
                    >
                      {part.text}
                    </Markdown>
                  </div>
                )
              }
              return null
            })}
          </div>

          {message.role === "user" && (
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent/10">
              <User className="h-4 w-4 text-accent" />
            </div>
          )}
        </div>
      ))}

      {status === "in_progress" && (
        <div className="mb-6 flex gap-4">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10">
            <Bot className="h-4 w-4 text-primary" />
          </div>
          <div className="flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-3">
            <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Thinking...</span>
          </div>
        </div>
      )}

      <div ref={messagesEndRef} />
    </div>
  )
}
