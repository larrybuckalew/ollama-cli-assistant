"use client"

import { useState, useEffect } from "react"
import { Download, Trash2, Database, Check, Loader2, HardDrive, Cpu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface InstalledModel {
  name: string
  size: number
  modified_at: string
  details: {
    parameter_size: string
    quantization_level: string
  }
}

const AVAILABLE_MODELS = [
  { name: "qwen2:0.5b", size: "352MB", params: "0.5B", desc: "Tiny model, fast responses, limited RAM" },
  { name: "phi", size: "1.6GB", params: "2.7B", desc: "Microsoft Phi - Excellent for coding" },
  { name: "gemma:2b", size: "1.7GB", params: "2B", desc: "Google Gemma - Balanced performance" },
  { name: "llama3.2", size: "2.0GB", params: "3B", desc: "Meta Llama 3.2 - Good general purpose" },
  { name: "mistral", size: "4.1GB", params: "7B", desc: "Mistral - High quality responses" },
  { name: "llama3", size: "4.7GB", params: "8B", desc: "Meta Llama 3 - Very capable model" },
  { name: "codellama", size: "3.8GB", params: "7B", desc: "Meta CodeLlama - Specialized for code" },
  { name: "deepseek-coder", size: "3.8GB", params: "6.7B", desc: "DeepSeek - Advanced code generation" },
]

export default function BrowseModelsPage() {
  const [installedModels, setInstalledModels] = useState<InstalledModel[]>([])
  const [loading, setLoading] = useState(true)
  const [downloading, setDownloading] = useState<string | null>(null)
  const [deleting, setDeleting] = useState<string | null>(null)

  useEffect(() => {
    fetchInstalledModels()
  }, [])

  const fetchInstalledModels = async () => {
    try {
      const response = await fetch("/api/ollama/models")
      const data = await response.json()
      setInstalledModels(data.models || [])
    } catch (error) {
      console.error("Error fetching models:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleDownload = async (modelName: string) => {
    setDownloading(modelName)
    try {
      const response = await fetch("/api/ollama/pull", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: modelName })
      })
      if (response.ok) {
        await fetchInstalledModels()
        alert(`Model ${modelName} downloaded successfully!`)
      } else {
        alert("Failed to download model")
      }
    } catch (error) {
      console.error("Download error:", error)
      alert("Error downloading model")
    } finally {
      setDownloading(null)
    }
  }

  const handleDelete = async (modelName: string) => {
    if (!confirm(`Delete model ${modelName}?`)) return

    setDeleting(modelName)
    try {
      const response = await fetch(`/api/ollama/models/${encodeURIComponent(modelName)}`, {
        method: "DELETE"
      })
      if (response.ok) {
        await fetchInstalledModels()
      } else {
        alert("Failed to delete model")
      }
    } catch (error) {
      console.error("Delete error:", error)
      alert("Error deleting model")
    } finally {
      setDeleting(null)
    }
  }

  const isInstalled = (modelName: string) => {
    return installedModels.some(m => m.name.startsWith(modelName))
  }

  const formatSize = (bytes: number) => {
    return (bytes / (1024 * 1024 * 1024)).toFixed(2) + " GB"
  }

  return (
    <div className="min-h-screen bg-background">
      <section className="border-b border-border py-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="mb-4 text-4xl font-bold tracking-tight">Free Ollama Models</h1>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              Download and run open-source AI models locally on your machine
            </p>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          {/* Installed Models */}
          <div className="mb-12">
            <h2 className="mb-6 text-2xl font-bold">Installed Models</h2>
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin" />
              </div>
            ) : installedModels.length === 0 ? (
              <Card className="p-8 text-center">
                <Database className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
                <p className="text-muted-foreground">No models installed yet. Download one below!</p>
              </Card>
            ) : (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {installedModels.map((model) => (
                  <Card key={model.name} className="p-6">
                    <div className="mb-4 flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold">{model.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {model.details.parameter_size} • {model.details.quantization_level}
                        </p>
                      </div>
                      <Badge variant="outline" className="bg-green-500/10 text-green-500">
                        <Check className="mr-1 h-3 w-3" />
                        Installed
                      </Badge>
                    </div>
                    <div className="mb-4 flex items-center gap-2 text-sm text-muted-foreground">
                      <HardDrive className="h-4 w-4" />
                      {formatSize(model.size)}
                    </div>
                    <Button
                      variant="destructive"
                      size="sm"
                      className="w-full"
                      onClick={() => handleDelete(model.name)}
                      disabled={deleting === model.name}
                    >
                      {deleting === model.name ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      ) : (
                        <Trash2 className="mr-2 h-4 w-4" />
                      )}
                      Delete
                    </Button>
                  </Card>
                ))}
              </div>
            )}
          </div>

          {/* Available Models */}
          <div>
            <h2 className="mb-6 text-2xl font-bold">Available Models</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {AVAILABLE_MODELS.map((model) => {
                const installed = isInstalled(model.name)
                return (
                  <Card key={model.name} className="p-6">
                    <div className="mb-4">
                      <div className="mb-2 flex items-center justify-between">
                        <h3 className="font-semibold">{model.name}</h3>
                        {installed && (
                          <Badge variant="outline" className="bg-green-500/10 text-green-500">
                            <Check className="mr-1 h-3 w-3" />
                            Installed
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">{model.desc}</p>
                    </div>
                    <div className="mb-4 space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <Cpu className="h-4 w-4 text-muted-foreground" />
                        <span>{model.params} parameters</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <HardDrive className="h-4 w-4 text-muted-foreground" />
                        <span>{model.size} download</span>
                      </div>
                    </div>
                    <Button
                      className="w-full"
                      onClick={() => handleDownload(model.name)}
                      disabled={downloading === model.name || installed}
                      variant={installed ? "outline" : "default"}
                    >
                      {downloading === model.name ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Downloading...
                        </>
                      ) : installed ? (
                        <>
                          <Check className="mr-2 h-4 w-4" />
                          Installed
                        </>
                      ) : (
                        <>
                          <Download className="mr-2 h-4 w-4" />
                          Download
                        </>
                      )}
                    </Button>
                  </Card>
                )
              })}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
