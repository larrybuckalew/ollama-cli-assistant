import { Card } from "@/components/ui/card"
import { Terminal, Zap, Shield, GitBranch, Database, Network, Activity, Settings } from "lucide-react"

export function FeaturesSection() {
  const features = [
    {
      icon: Terminal,
      title: "Advanced CLI Interface",
      description: "Powerful command-line tools with intuitive syntax and comprehensive help system."
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Optimized performance with GPU acceleration and efficient model loading."
    },
    {
      icon: Shield,
      title: "Enterprise Security",
      description: "Bank-level security with end-to-end encryption and compliance certifications."
    },
    {
      icon: GitBranch,
      title: "Version Control",
      description: "Manage multiple model versions and switch between them seamlessly."
    },
    {
      icon: Database,
      title: "Model Marketplace",
      description: "Access curated, fine-tuned models optimized for specific industries and use cases."
    },
    {
      icon: Network,
      title: "MCP Integration",
      description: "Connect to external data sources and APIs through the Model Context Protocol."
    },
    {
      icon: Activity,
      title: "Real-time Analytics",
      description: "Monitor token usage, performance metrics, and system health in real-time."
    },
    {
      icon: Settings,
      title: "Advanced Configuration",
      description: "Fine-tune model parameters, customize interfaces, and optimize workflows."
    }
  ]

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
            Everything you need for AI development
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Built for developers who demand the best tools for their AI workflows.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
              <div className="mb-4">
                <feature.icon className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}