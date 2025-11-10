"use client"

import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { X } from "lucide-react"
import { Card } from "@/components/ui/card"
import { useState } from "react"

interface SettingsPanelProps {
  onClose: () => void
}

export function SettingsPanel({ onClose }: SettingsPanelProps) {
  const [temperature, setTemperature] = useState([0.7])
  const [maxTokens, setMaxTokens] = useState([2048])
  const [streamResponse, setStreamResponse] = useState(true)
  const [syntaxHighlighting, setSyntaxHighlighting] = useState(true)

  return (
    <div className="w-80 border-l border-border bg-card">
      <div className="flex items-center justify-between border-b border-border px-4 py-3">
        <h2 className="font-semibold text-foreground">Settings</h2>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>

      <div className="space-y-6 p-4">
        <Card className="p-4">
          <h3 className="mb-4 font-medium text-sm text-foreground">Model Parameters</h3>

          <div className="space-y-4">
            <div>
              <div className="mb-2 flex items-center justify-between">
                <Label htmlFor="temperature" className="text-xs">
                  Temperature
                </Label>
                <span className="font-mono text-xs text-muted-foreground">{temperature[0].toFixed(1)}</span>
              </div>
              <Slider
                id="temperature"
                value={temperature}
                onValueChange={setTemperature}
                min={0}
                max={2}
                step={0.1}
                className="w-full"
              />
              <p className="mt-1 text-xs text-muted-foreground">Controls randomness in responses</p>
            </div>

            <div>
              <div className="mb-2 flex items-center justify-between">
                <Label htmlFor="max-tokens" className="text-xs">
                  Max Tokens
                </Label>
                <span className="font-mono text-xs text-muted-foreground">{maxTokens[0]}</span>
              </div>
              <Slider
                id="max-tokens"
                value={maxTokens}
                onValueChange={setMaxTokens}
                min={256}
                max={8192}
                step={256}
                className="w-full"
              />
              <p className="mt-1 text-xs text-muted-foreground">Maximum response length</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <h3 className="mb-4 font-medium text-sm text-foreground">Interface</h3>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="stream" className="text-xs">
                  Stream Response
                </Label>
                <p className="text-xs text-muted-foreground">Show text as it generates</p>
              </div>
              <Switch id="stream" checked={streamResponse} onCheckedChange={setStreamResponse} />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="syntax" className="text-xs">
                  Syntax Highlighting
                </Label>
                <p className="text-xs text-muted-foreground">Highlight code blocks</p>
              </div>
              <Switch id="syntax" checked={syntaxHighlighting} onCheckedChange={setSyntaxHighlighting} />
            </div>
          </div>
        </Card>

        <Button className="w-full bg-transparent" variant="outline">
          Reset to Defaults
        </Button>
      </div>
    </div>
  )
}
