"use client"

import { useState } from "react"
import { ChatHeader } from "./chat-header"
import { ChatMessages } from "./chat-messages"
import { ChatInput } from "./chat-input"
import { TokenStats } from "./token-stats"
import { McpPanel } from "./mcp-panel"
import { SettingsPanel } from "./settings-panel"
import { useChat } from "@ai-sdk/react"
import { DefaultChatTransport, type UIMessage } from "ai"

export function ChatInterface() {
  const [showMcp, setShowMcp] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [selectedModel, setSelectedModel] = useState("llama3.2")

  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({ api: "/api/chat" }),
  })

  return (
    <div className="flex h-screen flex-col">
      <ChatHeader
        onMcpToggle={() => setShowMcp(!showMcp)}
        onSettingsToggle={() => setShowSettings(!showSettings)}
        selectedModel={selectedModel}
        onModelChange={setSelectedModel}
      />

      <div className="flex flex-1 overflow-hidden">
        {/* Main Chat Area */}
        <div className="flex flex-1 flex-col">
          <div className="flex-1 overflow-hidden">
            <ChatMessages messages={messages} status={status} />
          </div>

           <div className="border-t border-border bg-card p-4">
             <TokenStats messages={messages} />
             <ChatInput onSend={(message) => sendMessage({ text: message }, { body: { model: selectedModel } })} isLoading={status === "streaming"} />
           </div>
        </div>

        {/* Side Panels */}
        {showMcp && <McpPanel onClose={() => setShowMcp(false)} />}
        {showSettings && <SettingsPanel onClose={() => setShowSettings(false)} />}
      </div>
    </div>
  )
}