"use client"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ChevronDown, Settings, Plug } from "lucide-react"

interface ChatHeaderProps {
  onMcpToggle: () => void
  onSettingsToggle: () => void
  selectedModel: string
  onModelChange: (model: string) => void
}

const OLLAMA_MODELS = [
  { id: "llama3.2", name: "Llama 3.2" },
  { id: "llama3.1", name: "Llama 3.1" },
  { id: "mistral", name: "Mistral" },
  { id: "codellama", name: "Code Llama" },
  { id: "phi3", name: "Phi-3" },
  { id: "gemma2", name: "Gemma 2" },
]

export function ChatHeader({ onMcpToggle, onSettingsToggle, selectedModel, onModelChange }: ChatHeaderProps) {
  const currentModel = OLLAMA_MODELS.find((m) => m.id === selectedModel)

  return (
    <header className="flex items-center justify-between border-b border-border bg-card px-6 py-4">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
          <span className="font-mono text-lg font-bold text-primary-foreground">O</span>
        </div>
        <div>
          <h1 className="text-lg font-semibold text-foreground">Ollama CLI</h1>
          <p className="text-sm text-muted-foreground">Advanced AI Interface</p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="gap-2 bg-transparent">
              <span className="font-mono text-sm">{currentModel?.name}</span>
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            {OLLAMA_MODELS.map((model) => (
              <DropdownMenuItem key={model.id} onClick={() => onModelChange(model.id)} className="font-mono">
                {model.name}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <Button variant="outline" size="icon" onClick={onMcpToggle} title="MCP Connections">
          <Plug className="h-4 w-4" />
        </Button>

        <Button variant="outline" size="icon" onClick={onSettingsToggle} title="Settings">
          <Settings className="h-4 w-4" />
        </Button>
      </div>
    </header>
  )
}