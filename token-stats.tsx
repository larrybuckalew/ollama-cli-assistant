"use client"

import type { UIMessage } from "ai"
import { Activity, TrendingUp } from "lucide-react"

interface TokenStatsProps {
  messages: UIMessage[]
}

export function TokenStats({ messages }: TokenStatsProps) {
  // Calculate approximate token count (rough estimation: ~4 chars per token)
  const totalTokens = messages.reduce((acc, msg) => {
    const textContent = msg.parts
      .filter((part) => part.type === "text")
      .map((part) => part.text)
      .join("")
    return acc + Math.ceil(textContent.length / 4)
  }, 0)

  const inputTokens = messages
    .filter((msg) => msg.role === "user")
    .reduce((acc, msg) => {
      const textContent = msg.parts
        .filter((part) => part.type === "text")
        .map((part) => part.text)
        .join("")
      return acc + Math.ceil(textContent.length / 4)
    }, 0)

  const outputTokens = totalTokens - inputTokens

  return (
    <div className="mb-3 flex items-center gap-4 text-xs text-muted-foreground">
      <div className="flex items-center gap-1.5">
        <Activity className="h-3.5 w-3.5" />
        <span className="font-mono">Total: {totalTokens.toLocaleString()}</span>
      </div>
      <div className="flex items-center gap-1.5">
        <TrendingUp className="h-3.5 w-3.5 text-accent" />
        <span className="font-mono">In: {inputTokens.toLocaleString()}</span>
      </div>
      <div className="flex items-center gap-1.5">
        <TrendingUp className="h-3.5 w-3.5 rotate-180 text-primary" />
        <span className="font-mono">Out: {outputTokens.toLocaleString()}</span>
      </div>
    </div>
  )
}
