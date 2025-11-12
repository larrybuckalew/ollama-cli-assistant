"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { X, Plus, Wifi, WifiOff } from "lucide-react"
import { Card } from "@/components/ui/card"

interface McpPanelProps {
  onClose: () => void
}

interface McpConnection {
  id: string
  name: string
  url: string
  status: "connected" | "disconnected"
}

export function McpPanel({ onClose }: McpPanelProps) {
  const [connections, setConnections] = useState<McpConnection[]>([
    {
      id: "1",
      name: "File System",
      url: "mcp://localhost:3001/fs",
      status: "connected",
    },
  ])
  const [showAddForm, setShowAddForm] = useState(false)
  const [newConnection, setNewConnection] = useState({ name: "", url: "" })

  const handleAddConnection = () => {
    if (newConnection.name && newConnection.url) {
      setConnections([
        ...connections,
        {
          id: Date.now().toString(),
          ...newConnection,
          status: "disconnected",
        },
      ])
      setNewConnection({ name: "", url: "" })
      setShowAddForm(false)
    }
  }

  const toggleConnection = (id: string) => {
    setConnections(
      connections.map((conn) =>
        conn.id === id
          ? {
              ...conn,
              status: conn.status === "connected" ? "disconnected" : "connected",
            }
          : conn,
      ),
    )
  }

  return (
    <div className="w-80 border-l border-border bg-card">
      <div className="flex items-center justify-between border-b border-border px-4 py-3">
        <h2 className="font-semibold text-foreground">MCP Connections</h2>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>

      <div className="p-4">
        <div className="mb-4 flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            {connections.filter((c) => c.status === "connected").length} Active
          </p>
          <Button size="sm" variant="outline" onClick={() => setShowAddForm(!showAddForm)}>
            <Plus className="h-4 w-4" />
          </Button>
        </div>

        {showAddForm && (
          <Card className="mb-4 p-4">
            <div className="space-y-3">
              <div>
                <Label htmlFor="mcp-name" className="text-xs">
                  Connection Name
                </Label>
                <Input
                  id="mcp-name"
                  placeholder="My MCP Server"
                  value={newConnection.name}
                  onChange={(e) => setNewConnection({ ...newConnection, name: e.target.value })}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="mcp-url" className="text-xs">
                  Server URL
                </Label>
                <Input
                  id="mcp-url"
                  placeholder="mcp://localhost:3001"
                  value={newConnection.url}
                  onChange={(e) => setNewConnection({ ...newConnection, url: e.target.value })}
                  className="mt-1"
                />
              </div>
              <div className="flex gap-2">
                <Button size="sm" onClick={handleAddConnection} className="flex-1">
                  Add
                </Button>
                <Button size="sm" variant="outline" onClick={() => setShowAddForm(false)} className="flex-1">
                  Cancel
                </Button>
              </div>
            </div>
          </Card>
        )}

        <div className="space-y-2">
          {connections.map((conn) => (
            <Card key={conn.id} className="p-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium text-sm text-foreground">{conn.name}</h3>
                    {conn.status === "connected" ? (
                      <Wifi className="h-3.5 w-3.5 text-accent" />
                    ) : (
                      <WifiOff className="h-3.5 w-3.5 text-muted-foreground" />
                    )}
                  </div>
                  <p className="mt-1 font-mono text-xs text-muted-foreground">{conn.url}</p>
                </div>
                <Button
                  size="sm"
                  variant={conn.status === "connected" ? "default" : "outline"}
                  onClick={() => toggleConnection(conn.id)}
                  className="ml-2"
                >
                  {conn.status === "connected" ? "Disconnect" : "Connect"}
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}