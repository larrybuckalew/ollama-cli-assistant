import { Mail, MessageSquare, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import Link from "next/link"

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-md bg-primary" />
            <span className="text-xl font-semibold">Ollama CLI</span>
          </Link>
          <nav className="flex items-center gap-6">
            <Link href="/" className="text-sm text-muted-foreground hover:text-foreground">
              Home
            </Link>
            <Link href="/pricing" className="text-sm text-muted-foreground hover:text-foreground">
              Pricing
            </Link>
            <Link href="/contact" className="text-sm font-medium text-foreground">
              Contact
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="border-b border-border py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="mb-4 text-5xl font-bold tracking-tight text-balance">Get in Touch</h1>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground text-pretty">
            Have questions about Ollama CLI? Want to request a demo? We're here to help.
          </p>
        </div>
      </section>

      {/* Contact Options */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid gap-6 md:grid-cols-3">
            <Card className="flex flex-col items-center p-6 text-center">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <Mail className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 font-semibold">Email Us</h3>
              <p className="mb-4 text-sm text-muted-foreground">Get a response within 24 hours</p>
              <a href="mailto:hello@ollama-cli.com" className="text-sm text-primary hover:underline">
                hello@ollama-cli.com
              </a>
            </Card>

            <Card className="flex flex-col items-center p-6 text-center">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-terminal-green/10">
                <MessageSquare className="h-6 w-6 text-terminal-green" />
              </div>
              <h3 className="mb-2 font-semibold">Live Chat</h3>
              <p className="mb-4 text-sm text-muted-foreground">Chat with our team in real-time</p>
              <Button size="sm" variant="outline">
                Start Chat
              </Button>
            </Card>

            <Card className="flex flex-col items-center p-6 text-center">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-terminal-amber/10">
                <Calendar className="h-6 w-6 text-terminal-amber" />
              </div>
              <h3 className="mb-2 font-semibold">Schedule a Demo</h3>
              <p className="mb-4 text-sm text-muted-foreground">Book a personalized walkthrough</p>
              <Button size="sm" variant="outline">
                Book Demo
              </Button>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl">
            <Card className="p-8">
              <h2 className="mb-6 text-2xl font-bold">Send us a message</h2>
              <form className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" placeholder="John" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" placeholder="Doe" required />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="john@example.com" required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="company">Company (Optional)</Label>
                  <Input id="company" placeholder="Acme Inc" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="inquiryType">Inquiry Type</Label>
                  <select
                    id="inquiryType"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    required
                  >
                    <option value="">Select an option</option>
                    <option value="demo">Request a Demo</option>
                    <option value="sales">Sales Inquiry</option>
                    <option value="support">Technical Support</option>
                    <option value="partnership">Partnership</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea id="message" placeholder="Tell us more about your needs..." rows={6} required />
                </div>

                <Button type="submit" size="lg" className="w-full">
                  Send Message
                </Button>
              </form>
            </Card>
          </div>
        </div>
      </section>

      {/* Additional Info */}
      <section className="border-t border-border py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-8 text-center text-3xl font-bold">Enterprise Support</h2>
            <div className="grid gap-6 md:grid-cols-2">
              <Card className="p-6">
                <h3 className="mb-2 font-semibold">Dedicated Account Manager</h3>
                <p className="text-sm text-muted-foreground">
                  Enterprise customers get a dedicated account manager for personalized support and guidance.
                </p>
              </Card>
              <Card className="p-6">
                <h3 className="mb-2 font-semibold">24/7 Priority Support</h3>
                <p className="text-sm text-muted-foreground">
                  Get round-the-clock support with guaranteed response times and priority issue resolution.
                </p>
              </Card>
              <Card className="p-6">
                <h3 className="mb-2 font-semibold">Custom Onboarding</h3>
                <p className="text-sm text-muted-foreground">
                  Tailored training sessions and onboarding processes to get your team up to speed quickly.
                </p>
              </Card>
              <Card className="p-6">
                <h3 className="mb-2 font-semibold">SLA Guarantees</h3>
                <p className="text-sm text-muted-foreground">
                  Service level agreements with uptime guarantees and performance commitments.
                </p>
              </Card>
            </div>
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