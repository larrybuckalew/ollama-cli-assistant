import Header from "@/components/header"

export default function PricingPage() {
  const plans = [
    {
      name: "Free",
      price: "$0",
      description: "Perfect for individual developers getting started",
      features: [
        "Run models locally",
        "Access to free open-source models",
        "Basic CLI interface",
        "Community support",
        "Single machine deployment",
        "Connect to OpenAI, Claude, Gemini",
      ],
      cta: "Get Started",
      popular: false,
    },
    {
      name: "Pro",
      price: "$29",
      description: "For professionals managing multiple projects",
      features: [
        "Everything in Free",
        "20% discount on marketplace models",
        "Priority model downloads",
        "Advanced CLI features",
        "Model version management",
        "Multi-machine sync",
        "Email support",
        "Custom model configurations",
        "MCP integrations",
      ],
      cta: "Start Free Trial",
      popular: true,
    },
    {
      name: "Enterprise",
      price: "Custom",
      description: "For teams requiring advanced features and support",
      features: [
        "Everything in Pro",
        "40% discount on all marketplace models",
        "Private model hosting",
        "Bulk model licensing",
        "Dedicated support",
        "Custom model hosting",
        "SSO & advanced security",
        "SLA guarantees",
        "Training & onboarding",
        "Compliance certifications",
      ],
      cta: "Contact Sales",
      popular: false,
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="border-b border-border py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="mb-4 text-5xl font-bold tracking-tight text-balance">Simple, Transparent Pricing</h1>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground text-pretty">
            Choose the plan that fits your needs. All plans include access to our core CLI tools and model library.
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-3">
            {plans.map((plan) => (
              <Card
                key={plan.name}
                className={`relative flex flex-col p-8 ${
                  plan.popular ? "border-primary shadow-lg shadow-primary/20" : ""
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-primary px-4 py-1 text-xs font-semibold text-primary-foreground">
                    Most Popular
                  </div>
                )}

                <div className="mb-6">
                  <h3 className="mb-2 text-2xl font-bold">{plan.name}</h3>
                  <p className="text-sm text-muted-foreground">{plan.description}</p>
                </div>

                <div className="mb-6">
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    {plan.price !== "Custom" && <span className="text-muted-foreground">/month</span>}
                  </div>
                </div>

                <ul className="mb-8 flex-1 space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <Check className="h-5 w-5 shrink-0 text-terminal-green" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button asChild variant={plan.popular ? "default" : "outline"} size="lg" className="w-full">
                  <Link href={plan.name === "Enterprise" ? "/contact" : "/register"}>{plan.cta}</Link>
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="border-t border-border py-20">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-3xl font-bold">Frequently Asked Questions</h2>
          <div className="mx-auto grid max-w-3xl gap-8">
            <div>
              <h3 className="mb-2 font-semibold">Can I switch plans later?</h3>
              <p className="text-muted-foreground">
                Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing
                cycle.
              </p>
            </div>
            <div>
              <h3 className="mb-2 font-semibold">How do model purchases work?</h3>
              <p className="text-muted-foreground">
                Models in our marketplace are one-time purchases. Once you buy a model, you own it forever and can
                download it as many times as you need. Pro and Enterprise subscribers get automatic discounts on all
                model purchases.
              </p>
            </div>
            <div>
              <h3 className="mb-2 font-semibold">What payment methods do you accept?</h3>
              <p className="text-muted-foreground">
                We accept all major credit cards, PayPal, and can arrange invoice billing for Enterprise customers.
              </p>
            </div>
            <div>
              <h3 className="mb-2 font-semibold">Is there a free trial?</h3>
              <p className="text-muted-foreground">
                The Free plan is available forever with no credit card required. Pro plan includes a 14-day free trial.
              </p>
            </div>
            <div>
              <h3 className="mb-2 font-semibold">Can I use my own API keys?</h3>
              <p className="text-muted-foreground">
                Yes! You can connect your own API keys for OpenAI, Claude, Gemini, and other providers at no additional
                cost.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t border-border py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-4 text-3xl font-bold">Ready to get started?</h2>
          <p className="mb-8 text-lg text-muted-foreground">Join thousands of developers using Ollama CLI</p>
          <div className="flex items-center justify-center gap-4">
            <Button size="lg" asChild>
              <Link href="/">Start Free</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/contact">Talk to Sales</Link>
            </Button>
          </div>
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