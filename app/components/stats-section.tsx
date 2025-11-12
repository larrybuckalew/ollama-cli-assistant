import { Card } from "@/components/ui/card"
import { Users, Download, MessageSquare, Award } from "lucide-react"

export function StatsSection() {
  const stats = [
    {
      icon: Users,
      value: "10,000+",
      label: "Active Developers",
      description: "Building with Ollama CLI"
    },
    {
      icon: Download,
      value: "500K+",
      label: "Model Downloads",
      description: "From our marketplace"
    },
    {
      icon: MessageSquare,
      value: "2M+",
      label: "AI Conversations",
      description: "Processed daily"
    },
    {
      icon: Award,
      value: "99.9%",
      label: "Uptime",
      description: "Enterprise reliability"
    }
  ]

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index} className="p-6 text-center">
              <div className="mb-4 flex justify-center">
                <stat.icon className="h-8 w-8 text-primary" />
              </div>
              <div className="text-3xl font-bold mb-2">{stat.value}</div>
              <div className="font-semibold mb-1">{stat.label}</div>
              <div className="text-sm text-muted-foreground">{stat.description}</div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}