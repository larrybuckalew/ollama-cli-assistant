export function StatsSection() {
  const stats = [
    { value: "10x", label: "Faster workflows", company: "TechCorp" },
    { value: "99.9%", label: "Uptime guarantee", company: "DevStudio" },
    { value: "500K+", label: "Queries processed", company: "AILabs" },
    { value: "50+", label: "MCP integrations", company: "CodeBase" },
  ]

  return (
    <section className="py-20 border-y border-border">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center space-y-2">
              <div className="text-4xl md:text-5xl font-bold text-primary">{stat.value}</div>
              <div className="text-muted-foreground">{stat.label}</div>
              <div className="text-sm font-semibold">{stat.company}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
