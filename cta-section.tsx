import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

export function CTASection() {
  return (
    <section id="demo" className="py-24 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="rounded-2xl border border-border bg-gradient-to-br from-primary/5 to-accent/5 p-12 text-center space-y-6">
          <h2 className="text-4xl md:text-5xl font-bold text-balance">Start building with Ollama CLI today</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-balance">
            Join thousands of developers using the most powerful AI CLI tool. Get started in minutes with our free tier.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Button size="lg" className="gap-2 text-base px-8" asChild>
              <Link href="/signup">
                Get Started Free
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="text-base px-8 bg-transparent" asChild>
              <Link href="/contact">Request Demo</Link>
            </Button>
          </div>
          <p className="text-sm text-muted-foreground pt-2">No credit card required • Free tier available forever</p>
        </div>
      </div>
    </section>
  )
}
