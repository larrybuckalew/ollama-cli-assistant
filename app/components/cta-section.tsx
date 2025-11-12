import { Button } from "@/components/ui/button"
import { Check, ArrowRight } from "lucide-react"
import Link from "next/link"

export function CTASection() {
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center space-y-8">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
            Ready to transform your AI workflow?
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Join thousands of developers who have already upgraded their AI development experience.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Button size="lg" className="gap-2 text-base px-8" asChild>
              <Link href="/signup">
                Start Free Trial
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="text-base px-8" asChild>
              <Link href="/contact">Contact Sales</Link>
            </Button>
          </div>

          <div className="pt-8 grid md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <div className="flex items-center gap-3">
              <Check className="h-5 w-5 text-primary" />
              <span className="text-sm">No credit card required</span>
            </div>
            <div className="flex items-center gap-3">
              <Check className="h-5 w-5 text-primary" />
              <span className="text-sm">14-day free trial</span>
            </div>
            <div className="flex items-center gap-3">
              <Check className="h-5 w-5 text-primary" />
              <span className="text-sm">Cancel anytime</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}