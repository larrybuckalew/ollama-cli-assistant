"use client"

import { Database, Download, Star, TrendingUp, Check, Filter, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import Header from "@/components/header"

export default function ModelsPage() {
  const categories = [
    { name: "All Models", count: 47 },
    { name: "Code", count: 12 },
    { name: "Vision", count: 8 },
    { name: "Legal", count: 5 },
    { name: "Medical", count: 6 },
    { name: "Finance", count: 9 },
    { name: "Creative", count: 7 },
  ]

  const models = [
    {
      name: "Code Assistant Pro",
      description: "Fine-tuned for code generation, debugging, documentation, and technical writing",
      category: "Code",
      size: "7B",
      downloads: 12500,
      rating: 4.9,
      price: 49,
      popular: true,
      features: ["Code completion", "Bug detection", "Documentation", "Multi-language"],
    },
    {
      name: "Vision Analyst",
      description: "Specialized in image analysis, OCR, document understanding, and visual content generation",
      category: "Vision",
      size: "13B",
      downloads: 8900,
      rating: 4.8,
      price: 79,
      new: true,
      features: ["Image analysis", "OCR", "Scene understanding", "Visual reasoning"],
    },
    {
      name: "Legal Assistant",
      description: "Trained on legal documents, contracts, compliance requirements, and case law",
      category: "Legal",
      size: "30B",
      downloads: 4200,
      rating: 4.9,
      price: 149,
      features: ["Contract analysis", "Legal research", "Compliance", "Case summarization"],
    },
    {
      name: "Medical Advisor",
      description: "Healthcare-focused model for medical research, diagnosis support, and patient care",
      category: "Medical",
      size: "20B",
      downloads: 5800,
      rating: 4.7,
      price: 199,
      features: ["Medical terminology", "Research analysis", "Drug interactions", "Clinical notes"],
    },
    {
      name: "Financial Analyst Pro",
      description: "Specialized in financial modeling, market analysis, risk assessment, and reporting",
      category: "Finance",
      size: "13B",
      downloads: 6700,
      rating: 4.8,
      price: 89,
      features: ["Financial modeling", "Market analysis", "Risk assessment", "Report generation"],
    },
    {
      name: "Creative Writer",
      description: "Optimized for creative writing, storytelling, content creation, and marketing copy",
      category: "Creative",
      size: "13B",
      downloads: 9200,
      rating: 4.6,
      price: 59,
      features: ["Story writing", "Marketing copy", "Dialogue", "Character development"],
    },
    {
      name: "Data Science Suite",
      description: "Comprehensive model for data analysis, statistics, visualization recommendations",
      category: "Code",
      size: "7B",
      downloads: 7100,
      rating: 4.8,
      price: 69,
      popular: true,
      features: ["Data analysis", "Statistical methods", "Visualization", "ML workflows"],
    },
    {
      name: "Multilingual Translator",
      description: "Advanced translation model supporting 50+ languages with cultural context awareness",
      category: "Creative",
      size: "20B",
      downloads: 11300,
      rating: 4.9,
      price: 99,
      popular: true,
      features: ["50+ languages", "Cultural context", "Idiomatic expressions", "Technical translation"],
    },
  ]

  const handleDownload = (model: (typeof models)[0]) => {
    const modelJson = JSON.stringify(model, null, 2)
    const blob = new Blob([modelJson], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${model.name.toLowerCase().replace(/\s+/g, "-")}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="border-b border-border py-16">
        <div className="container mx-auto px-4">
          <div className="mb-8 text-center">
            <h1 className="mb-4 text-4xl font-bold tracking-tight lg:text-5xl">Model Marketplace</h1>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              Download curated, fine-tuned AI models optimized for specific industries and use cases
            </p>
          </div>

          <div className="mx-auto max-w-2xl">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Search models..." className="pl-10" />
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 lg:grid-cols-[250px_1fr]">
            {/* Sidebar */}
            <div>
              <Card className="p-6 sticky top-20">
                <div className="mb-4 flex items-center gap-2">
                  <Filter className="h-5 w-5" />
                  <h3 className="font-semibold">Categories</h3>
                </div>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category.name}
                      className="flex w-full items-center justify-between rounded-md px-3 py-2 text-sm hover:bg-muted"
                    >
                      <span>{category.name}</span>
                      <span className="text-xs text-muted-foreground">{category.count}</span>
                    </button>
                  ))}
                </div>

                <div className="mt-6 border-t pt-6">
                  <h3 className="mb-4 font-semibold">Price Range</h3>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm">
                      <input type="checkbox" className="rounded" />
                      <span>Free</span>
                    </label>
                    <label className="flex items-center gap-2 text-sm">
                      <input type="checkbox" className="rounded" />
                      <span>Under $50</span>
                    </label>
                    <label className="flex items-center gap-2 text-sm">
                      <input type="checkbox" className="rounded" />
                      <span>$50 - $100</span>
                    </label>
                    <label className="flex items-center gap-2 text-sm">
                      <input type="checkbox" className="rounded" />
                      <span>Over $100</span>
                    </label>
                  </div>
                </div>

                <div className="mt-6 border-t pt-6">
                  <h3 className="mb-4 font-semibold">Model Size</h3>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm">
                      <input type="checkbox" className="rounded" />
                      <span>Small (7B)</span>
                    </label>
                    <label className="flex items-center gap-2 text-sm">
                      <input type="checkbox" className="rounded" />
                      <span>Medium (13B)</span>
                    </label>
                    <label className="flex items-center gap-2 text-sm">
                      <input type="checkbox" className="rounded" />
                      <span>Large (20B+)</span>
                    </label>
                  </div>
                </div>
              </Card>
            </div>

            {/* Models Grid */}
            <div>
              <div className="mb-6 flex items-center justify-between">
                <p className="text-sm text-muted-foreground">{models.length} models available</p>
                <select className="rounded-md border border-border bg-background px-3 py-2 text-sm">
                  <option>Most Popular</option>
                  <option>Newest</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Highest Rated</option>
                </select>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                {models.map((model) => (
                  <Card key={model.name} className="p-6">
                    <div className="mb-4 flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="rounded-lg bg-primary/10 p-2">
                          <Database className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold">{model.name}</h3>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="text-xs">
                              {model.size}
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              {model.category}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      {model.popular && <Badge className="bg-terminal-green text-white">Popular</Badge>}
                      {model.new && <Badge className="bg-primary">New</Badge>}
                    </div>

                    <p className="mb-4 text-sm text-muted-foreground">{model.description}</p>

                    <div className="mb-4 space-y-2">
                      <div className="text-xs font-medium text-muted-foreground">KEY FEATURES</div>
                      <div className="flex flex-wrap gap-2">
                        {model.features.slice(0, 3).map((feature) => (
                          <div key={feature} className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Check className="h-3 w-3 text-terminal-green" />
                            {feature}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mb-4 flex items-center gap-4 border-t pt-4">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-terminal-amber text-terminal-amber" />
                        <span className="text-sm font-medium">{model.rating}</span>
                      </div>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Download className="h-4 w-4" />
                        <span>{model.downloads.toLocaleString()} downloads</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-2xl font-bold">${model.price}</div>
                        <div className="text-xs text-muted-foreground">one-time purchase</div>
                      </div>
                      <Button onClick={() => handleDownload(model)}>
                        <Download className="mr-2 h-4 w-4" />
                        Download
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>

              <div className="mt-12 text-center">
                <Button variant="outline" size="lg">
                  Load More Models
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t border-border py-16">
        <div className="container mx-auto px-4">
          <Card className="bg-primary/5 p-12 text-center">
            <TrendingUp className="mx-auto mb-4 h-12 w-12 text-primary" />
            <h2 className="mb-4 text-2xl font-bold">Want to sell your own models?</h2>
            <p className="mb-6 text-muted-foreground">
              Join our marketplace as a model creator and reach thousands of developers
            </p>
            <Button size="lg" asChild>
              <Link href="/contact">Become a Creator</Link>
            </Button>
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