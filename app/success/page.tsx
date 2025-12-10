"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { CheckCircle } from "lucide-react"

export default function SuccessPage() {
  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-20 flex items-center justify-center">
        <Card className="max-w-lg w-full p-8 text-center">
          <CheckCircle className="h-16 w-16 text-terminal-green mx-auto mb-6" />
          <h1 className="text-3xl font-bold mb-4">Payment Successful!</h1>
          <p className="text-muted-foreground mb-8">
            Thank you for your purchase. Your model is now available in your dashboard.
          </p>
          <Button asChild size="lg">
            <Link href="/dashboard">Go to Dashboard</Link>
          </Button>
        </Card>
      </main>
    </div>
  )
}
