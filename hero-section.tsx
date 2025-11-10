import { Button } from "@/components/ui/button"
import { Terminal, ArrowRight, Play } from "lucide-react"
import Link from "next/link"

export function HeroSection() {
  return (
    <section className="pt-32 pb-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-sm text-primary">
            <Terminal className="h-4 w-4" />
            <span className="font-mono">The Future of AI CLI Tools</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-balance">
            The most powerful
            <br />
            <span className="text-primary">Ollama CLI</span> for teams
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto text-balance">
            Empower your development workflow with advanced AI chat, MCP integrations, real-time token tracking, and
            enterprise-grade features.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Button size="lg" className="gap-2 text-base px-8" asChild>
              <Link href="/signup">
                Get Started Free
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="gap-2 text-base px-8 bg-transparent" asChild>
              <Link href="#demo">
                <Play className="h-4 w-4" />
                Watch Demo
              </Link>
            </Button>
          </div>

          <div className="pt-8">
            <p className="text-sm text-muted-foreground mb-4">Trusted by developers at</p>
            <div className="flex flex-wrap items-center justify-center gap-12 opacity-60">
              <div className="font-semibold text-lg">TechCorp</div>
              <div className="font-semibold text-lg">DevStudio</div>
              <div className="font-semibold text-lg">AILabs</div>
              <div className="font-semibold text-lg">CodeBase</div>
            </div>
          </div>

          {/* Terminal Preview */}
          <div className="pt-12 max-w-5xl mx-auto">
            <div className="rounded-lg border border-border bg-card overflow-hidden shadow-2xl">
              <div className="h-10 bg-secondary border-b border-border flex items-center px-4 gap-2">
                <div className="flex gap-1.5">
                  <div className="h-3 w-3 rounded-full bg-red-500/80" />
                  <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
                  <div className="h-3 w-3 rounded-full bg-green-500/80" />
                </div>
                <div className="flex-1 text-center text-sm text-muted-foreground font-mono">ollama-cli@latest</div>
              </div>
              <div className="p-6 font-mono text-sm space-y-3 bg-[#0a0a0a]">
                <div className="flex items-start gap-2">
                  <span className="text-primary">❯</span>
                  <span className="text-foreground">What is the Model Context Protocol?</span>
                </div>
                <div className="pl-4 text-muted-foreground leading-relaxed">
                  The Model Context Protocol (MCP) is an open standard that enables seamless integration between LLM
                  applications and external data sources...
                </div>
                <div className="flex items-center gap-3 text-xs text-muted-foreground pt-2">
                  <span>Tokens: 2,456</span>
                  <span>•</span>
                  <span>Input: 18</span>
                  <span>•</span>
                  <span>Output: 2,438</span>
                  <span>•</span>
                  <span className="text-green-500">MCP: Connected</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
