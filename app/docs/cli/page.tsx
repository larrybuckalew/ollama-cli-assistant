import { Download, Terminal, Check, Copy } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Link from "next/link"

export default function CLIDocsPage() {
  return (
    <div className="min-h-screen bg-background">
      <section className="border-b border-border py-12">
        <div className="container mx-auto px-4">
          <h1 className="mb-4 text-4xl font-bold">Ollama CLI Documentation</h1>
          <p className="text-lg text-muted-foreground">
            Get started with the powerful Ollama CLI tool for your terminal.
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <Card className="p-8 mb-8">
            <div className="flex items-center gap-4 mb-6">
              <Download className="h-8 w-8 text-primary" />
              <div>
                <h2 className="text-2xl font-bold">Installation</h2>
                <p className="text-muted-foreground">Three simple steps to get started</p>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm">
                    1
                  </div>
                  <h3 className="text-lg font-semibold">Download the CLI</h3>
                </div>
                <Card className="bg-muted p-4">
                  <code className="text-sm">
                    curl -o ollama-cli.py https://ai.buckalewfinancial.com/downloads/ollama-cli.py
                  </code>
                </Card>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm">
                    2
                  </div>
                  <h3 className="text-lg font-semibold">Install Dependencies</h3>
                </div>
                <Card className="bg-muted p-4 space-y-2">
                  <code className="text-sm block">
                    curl -o requirements.txt https://ai.buckalewfinancial.com/downloads/requirements.txt
                  </code>
                  <code className="text-sm block">
                    pip install -r requirements.txt
                  </code>
                </Card>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm">
                    3
                  </div>
                  <h3 className="text-lg font-semibold">Run the CLI</h3>
                </div>
                <Card className="bg-muted p-4">
                  <code className="text-sm">
                    python ollama-cli.py chat
                  </code>
                </Card>
              </div>
            </div>

            <div className="mt-8">
              <Button asChild>
                <a href="/downloads/ollama-cli.py" download>
                  <Download className="mr-2 h-4 w-4" />
                  Download Now
                </a>
              </Button>
            </div>
          </Card>

          <Card className="p-8 mb-8">
            <h2 className="text-2xl font-bold mb-4">Usage Examples</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Start a chat session:</h3>
                <Card className="bg-muted p-3">
                  <code className="text-sm">python ollama-cli.py chat</code>
                </Card>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">List available models:</h3>
                <Card className="bg-muted p-3">
                  <code className="text-sm">python ollama-cli.py models list</code>
                </Card>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Use a specific model:</h3>
                <Card className="bg-muted p-3">
                  <code className="text-sm">python ollama-cli.py chat --model llama3.2</code>
                </Card>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Enable MCP support:</h3>
                <Card className="bg-muted p-3">
                  <code className="text-sm">python ollama-cli.py chat --mcp</code>
                </Card>
              </div>
            </div>
          </Card>

          <Card className="p-8">
            <h2 className="text-2xl font-bold mb-4">Features</h2>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="flex gap-3">
                <Check className="h-5 w-5 text-terminal-green shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold">Model Context Protocol (MCP)</h3>
                  <p className="text-sm text-muted-foreground">
                    Integrate with external tools and services
                  </p>
                </div>
              </div>
              
              <div className="flex gap-3">
                <Check className="h-5 w-5 text-terminal-green shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold">Multi-Model Support</h3>
                  <p className="text-sm text-muted-foreground">
                    Switch between different AI models easily
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <Check className="h-5 w-5 text-terminal-green shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold">Chat History</h3>
                  <p className="text-sm text-muted-foreground">
                    Save and resume your conversations
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <Check className="h-5 w-5 text-terminal-green shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold">Customizable</h3>
                  <p className="text-sm text-muted-foreground">
                    Configure models, prompts, and settings
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>
    </div>
  )
}
