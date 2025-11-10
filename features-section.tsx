import { Terminal, Plug, Activity, Settings, Zap, Shield } from "lucide-react"

export function FeaturesSection() {
  const features = [
    {
      icon: Terminal,
      title: "Advanced Chat Interface",
      description:
        "Beautiful, responsive chat UI with markdown rendering, syntax highlighting, and real-time streaming responses.",
    },
    {
      icon: Plug,
      title: "MCP Integration",
      description:
        "Connect to multiple Model Context Protocol servers. Seamlessly integrate external tools and data sources.",
    },
    {
      icon: Activity,
      title: "Token Tracking",
      description:
        "Real-time token usage analytics with detailed breakdowns of input/output costs and visual tracking.",
    },
    {
      icon: Settings,
      title: "Model Configuration",
      description:
        "Fine-tune temperature, max tokens, and other parameters. Switch between multiple Ollama models instantly.",
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Optimized performance with streaming responses, intelligent caching, and minimal latency.",
    },
    {
      icon: Shield,
      title: "Enterprise Security",
      description: "SOC 2 compliant with end-to-end encryption, audit logs, and role-based access control.",
    },
  ]

  return (
    <section id="features" className="py-24 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-balance">Everything you need to work with AI</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-balance">
            The complete platform to build, deploy, and scale AI-powered workflows with Ollama models.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group p-6 rounded-lg border border-border bg-card hover:bg-secondary transition-colors"
            >
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
