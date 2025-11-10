"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Send, Paperclip } from "lucide-react"

interface ChatInputProps {
  onSend: (message: { text: string }) => void
  isLoading: boolean
}

export function ChatInput({ onSend, isLoading }: ChatInputProps) {
  const [input, setInput] = useState("")
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    onSend({ text: input })
    setInput("")

    // Reset textarea height
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value)
    // Auto-resize textarea
    e.target.style.height = "auto"
    e.target.style.height = `${e.target.scrollHeight}px`
  }

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <div className="flex items-end gap-2">
        <div className="relative flex-1">
          <Textarea
            ref={textareaRef}
            value={input}
            onChange={handleInput}
            onKeyDown={handleKeyDown}
            placeholder="Message Ollama..."
            className="min-h-[60px] max-h-[200px] resize-none pr-12 font-sans"
            disabled={isLoading}
          />
          <Button type="button" variant="ghost" size="icon" className="absolute bottom-2 right-2 h-8 w-8">
            <Paperclip className="h-4 w-4" />
          </Button>
        </div>
        <Button type="submit" size="icon" className="h-[60px] w-[60px]" disabled={!input.trim() || isLoading}>
          <Send className="h-5 w-5" />
        </Button>
      </div>
      <p className="mt-2 text-xs text-muted-foreground">
        Press <kbd className="rounded bg-muted px-1.5 py-0.5 font-mono">Enter</kbd> to send,{" "}
        <kbd className="rounded bg-muted px-1.5 py-0.5 font-mono">Shift + Enter</kbd> for new line
      </p>
    </form>
  )
}
