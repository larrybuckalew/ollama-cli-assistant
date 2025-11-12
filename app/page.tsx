import { Terminal, Zap, Shield, GitBranch, Check, ArrowRight, Download, Database, Network } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Link from "next/link"

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-md bg-primary" />
            <span className="text-xl font-semibold">Ollama CLI</span>
          </Link>
          <nav className="flex items-center gap-6">
            <Link href="/" className="text-sm font-medium text-foreground">
              Home
            </Link>
            <Link href="/models" className="text-sm text-muted-foreground hover:text-foreground">
              Models
            </Link>
            <Link href="/pricing" className="text-sm text-muted-foreground hover:text-foreground">
              Pricing
            </Link>
            <Link href="/contact" className="text-sm text-muted-foreground hover:text-foreground">
              Contact
            </Link>
            <Button size="sm">Get Started</Button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="border-b border-border py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
            <div>
              <h1 className="mb-6 text-5xl font-bold tracking-tight text-balance lg:text-6xl">
                Connect to <span className="text-primary">Any AI Model</span> Through One Powerful CLI
              </h1>
              <p className="mb-8 text-lg text-muted-foreground text-pretty lg:text-xl">
                Run Ollama, OpenAI, Claude, Gemini, and more from a single command-line interface. Download premium
                models from our curated marketplace or connect to your own endpoints.
              </p>
              <div className="flex flex-col items-start gap-4 sm:flex-row">
                <Button size="lg" className="w-full sm:w-auto" asChild>
                  <Link href="/register">
                    Get Started Free
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="w-full sm:w-auto bg-transparent" asChild>
                  <Link href="/models">Browse Models</Link>
                </Button>
              </div>
            </div>

            <div className="relative">
              <Card className="bg-card p-4 shadow-2xl">
                <div className="mb-3 flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-destructive" />
                  <div className="h-3 w-3 rounded-full bg-terminal-amber" />
                  <div className="h-3 w-3 rounded-full bg-terminal-green" />
                  <span className="ml-auto text-xs text-muted-foreground">ollama-cli v2.0</span>
                </div>
                <div className="font-mono text-sm space-y-2 bg-background/50 p-4 rounded">
                  <div className="text-terminal-green">$ ollama-cli models list</div>
                  <div className="text-muted-foreground">Available models:</div>
                  <div className="pl-4 space-y-1">
                    <div className="text-foreground">✓ llama-3.2-70b</div>
                    <div className="text-foreground">✓ gpt-4</div>
                    <div className="text-foreground">✓ claude-sonnet-4</div>
                    <div className="text-foreground">✓ gemini-pro</div>
                  </div>
                  <div className="text-terminal-green pt-2">$ ollama-cli chat --model llama-3.2-70b</div>
                  <div className="text-primary">Connected to Llama 3.2 70B</div>
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-terminal-green animate-pulse" />
                    <span className="text-muted-foreground text-xs">Ready...</span>
                  </div>
                </div>
              </Card>
              <div className="absolute -bottom-4 -right-4 h-32 w-32 rounded-full bg-primary/10 blur-3xl -z-10" />
              <div className="absolute -top-4 -left-4 h-32 w-32 rounded-full bg-terminal-green/10 blur-3xl -z-10" />
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-border py-20">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold lg:text-4xl">One CLI, Every Model</h2>
            <p className="text-lg text-muted-foreground">
              Seamlessly switch between providers without changing your workflow
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card className="p-6 text-center">
              <div className="mb-4 flex justify-center">
                <div className="rounded-lg bg-primary/10 p-3">
                  <Terminal className="h-8 w-8 text-primary" />
                </div>
              </div>
              <h3 className="mb-2 font-semibold">Ollama</h3>
              <p className="text-sm text-muted-foreground">Run models locally with full privacy</p>
            </Card>

            <Card className="p-6 text-center">
              <div className="mb-4 flex justify-center">
                <div className="rounded-lg bg-terminal-green/10 p-3">
                  <Network className="h-8 w-8 text-terminal-green" />
                </div>
              </div>
              <h3 className="mb-2 font-semibold">OpenAI</h3>
              <p className="text-sm text-muted-foreground">GPT-4, GPT-4o, and more</p>
            </Card>

            <Card className="p-6 text-center">
              <div className="mb-4 flex justify-center">
                <div className="rounded-lg bg-terminal-amber/10 p-3">
                  <Zap className="h-8 w-8 text-terminal-amber" />
                </div>
              </div>
              <h3 className="mb-2 font-semibold">Anthropic</h3>
              <p className="text-sm text-muted-foreground">Claude Sonnet, Opus, Haiku</p>
            </Card>

            <Card className="p-6 text-center">
              <div className="mb-4 flex justify-center">
                <div className="rounded-lg bg-primary/10 p-3">
                  <Database className="h-8 w-8 text-primary" />
                </div>
              </div>
              <h3 className="mb-2 font-semibold">Custom</h3>
              <p className="text-sm text-muted-foreground">Connect to any API endpoint</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Terminal Demo */}
      <section className="border-b border-border py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold lg:text-4xl">See It In Action</h2>
            <p className="text-lg text-muted-foreground">Simple commands, powerful results</p>
          </div>

          <div className="mx-auto max-w-4xl space-y-4">
            <Card className="bg-card p-6">
              <div className="mb-4 flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-destructive" />
                <div className="h-3 w-3 rounded-full bg-terminal-amber" />
                <div className="h-3 w-3 rounded-full bg-terminal-green" />
                <span className="ml-auto text-xs text-muted-foreground font-mono">~/projects/ai-app</span>
              </div>
              <div className="font-mono text-sm space-y-3">
                <div className="text-muted-foreground">
                  <span className="text-terminal-green">$</span> ollama-cli download llama-3.2-vision
                </div>
                <div className="pl-4 space-y-1">
                  <div className="text-muted-foreground">
                    Downloading from marketplace... <span className="text-terminal-green">✓</span>
                  </div>
                  <div className="text-muted-foreground">
                    Verifying model integrity... <span className="text-terminal-green">✓</span>
                  </div>
                  <div className="text-terminal-green">Model installed successfully (4.7 GB)</div>
                </div>
                <div className="pt-2 text-muted-foreground">
                  <span className="text-terminal-green">$</span> ollama-cli chat --model llama-3.2-vision --image
                  screenshot.png
                </div>
                <div className="pl-4">
                  <span className="text-primary">You:</span> Describe this screenshot
                </div>
                <div className="pl-4 text-terminal-green space-y-1">
                  <div>
                    <span className="text-primary">AI:</span> This screenshot shows a modern web application with...
                  </div>
                  <div className="text-muted-foreground">
                    a clean dashboard interface featuring data visualizations...
                  </div>
                </div>
              </div>
            </Card>

            <div className="grid gap-4 md:grid-cols-2">
              <Card className="p-4 bg-primary/5 border-primary/20">
                <div className="font-mono text-xs text-muted-foreground mb-2">Quick Start</div>
                <div className="font-mono text-sm">
                  <div className="text-terminal-green">$ npm install -g ollama-cli</div>
                  <div className="text-terminal-green mt-1">$ ollama-cli init</div>
                </div>
              </Card>
              <Card className="p-4 bg-terminal-green/5 border-terminal-green/20">
                <div className="font-mono text-xs text-muted-foreground mb-2">Switch Models</div>
                <div className="font-mono text-sm">
                  <div className="text-terminal-green">$ ollama-cli switch gpt-4</div>
                  <div className="text-muted-foreground mt-1 text-xs">Instantly switch providers</div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-border py-20">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold lg:text-4xl">Premium Model Marketplace</h2>
            <p className="text-lg text-muted-foreground">
              Download curated, optimized models for your specific use cases
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card className="p-6">
              <div className="mb-4 flex items-center justify-between">
                <Database className="h-8 w-8 text-primary" />
                <span className="text-xs font-semibold text-terminal-green">POPULAR</span>
              </div>
              <h3 className="mb-2 text-xl font-semibold">Code Assistant Pro</h3>
              <p className="mb-4 text-sm text-muted-foreground">
                Fine-tuned for code generation, debugging, and documentation
              </p>
              <div className="mb-4 flex items-baseline gap-1">
                <span className="text-2xl font-bold">$49</span>
                <span className="text-sm text-muted-foreground">one-time</span>
              </div>
              <Button className="w-full" size="sm">
                <Download className="mr-2 h-4 w-4" />
                Download
              </Button>
            </Card>

            <Card className="p-6">
              <div className="mb-4 flex items-center justify-between">
                <Database className="h-8 w-8 text-terminal-amber" />
                <span className="text-xs font-semibold text-primary">NEW</span>
              </div>
              <h3 className="mb-2 text-xl font-semibold">Vision Analyst</h3>
              <p className="mb-4 text-sm text-muted-foreground">
                Specialized in image analysis, OCR, and visual understanding
              </p>
              <div className="mb-4 flex items-baseline gap-1">
                <span className="text-2xl font-bold">$79</span>
                <span className="text-sm text-muted-foreground">one-time</span>
              </div>
              <Button className="w-full bg-transparent" size="sm" variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Download
              </Button>
            </Card>

            <Card className="p-6">
              <div className="mb-4 flex items-center justify-between">
                <Database className="h-8 w-8 text-terminal-green" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Legal Assistant</h3>
              <p className="mb-4 text-sm text-muted-foreground">
                Trained on legal documents, contracts, and compliance
              </p>
              <div className="mb-4 flex items-baseline gap-1">
                <span className="text-2xl font-bold">$149</span>
                <span className="text-sm text-muted-foreground">one-time</span>
              </div>
              <Button className="w-full bg-transparent" size="sm" variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Download
              </Button>
            </Card>
          </div>

          <div className="mt-8 text-center">
            <Button variant="outline" size="lg" asChild>
              <Link href="/models">
                View All Models
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="border-b border-border py-20">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold lg:text-4xl">Everything you need to run AI locally</h2>
            <p className="text-lg text-muted-foreground">Built for developers who value privacy and performance</p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <Card className="p-6">
              <Terminal className="mb-4 h-10 w-10 text-primary" />
              <h3 className="mb-2 text-xl font-semibold">Simple CLI</h3>
              <p className="text-sm text-muted-foreground">
                Intuitive commands that feel natural. Get started in seconds with our straightforward interface.
              </p>
            </Card>

            <Card className="p-6">
              <Zap className="mb-4 h-10 w-10 text-terminal-amber" />
              <h3 className="mb-2 text-xl font-semibold">Lightning Fast</h3>
              <p className="text-sm text-muted-foreground">
                Optimized performance with GPU acceleration and efficient model loading.
              </p>
            </Card>

            <Card className="p-6">
              <Shield className="mb-4 h-10 w-10 text-terminal-green" />
              <h3 className="mb-2 text-xl font-semibold">100% Private</h3>
              <p className="text-sm text-muted-foreground">
                Your data never leaves your machine. Complete privacy and security guaranteed.
              </p>
            </Card>

            <Card className="p-6">
              <GitBranch className="mb-4 h-10 w-10 text-primary" />
              <h3 className="mb-2 text-xl font-semibold">Version Control</h3>
              <p className="text-sm text-muted-foreground">
                Manage multiple model versions and switch between them seamlessly.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="border-b border-border py-20">
        <div className="container mx-auto px-4">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <h2 className="mb-6 text-3xl font-bold lg:text-4xl">Why developers choose Ollama CLI</h2>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <Check className="h-6 w-6 shrink-0 text-terminal-green" />
                  <div>
                    <h3 className="mb-1 font-semibold">Multi-provider support</h3>
                    <p className="text-sm text-muted-foreground">
                      Connect to Ollama, OpenAI, Claude, Gemini, and custom endpoints from one interface
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Check className="h-6 w-6 shrink-0 text-terminal-green" />
                  <div>
                    <h3 className="mb-1 font-semibold">Premium model marketplace</h3>
                    <p className="text-sm text-muted-foreground">
                      Access curated, fine-tuned models optimized for specific industries and use cases
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Check className="h-6 w-6 shrink-0 text-terminal-green" />
                  <div>
                    <h3 className="mb-1 font-semibold">Offline capable</h3>
                    <p className="text-sm text-muted-foreground">
                      Work anywhere without internet connectivity once models are downloaded
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Check className="h-6 w-6 shrink-0 text-terminal-green" />
                  <div>
                    <h3 className="mb-1 font-semibold">Active community</h3>
                    <p className="text-sm text-muted-foreground">
                      Join thousands of developers building with local AI models
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <Card className="flex items-center justify-center bg-muted p-12">
              <div className="text-center">
                <div className="mb-4 text-6xl font-bold text-primary">10K+</div>
                <div className="text-xl font-semibold">Active Developers</div>
                <div className="mt-2 text-sm text-muted-foreground">Building with Ollama CLI</div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <Card className="bg-primary/5 p-12 text-center">
            <h2 className="mb-4 text-3xl font-bold">Ready to get started?</h2>
            <p className="mb-8 text-lg text-muted-foreground">Join thousands of developers running AI models locally</p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button size="lg" asChild>
                <Link href="/register">Start Free Trial</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/pricing">View Pricing</Link>
              </Button>
            </div>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© 2025 Ollama CLI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}