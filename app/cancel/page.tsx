"use client"

import Link from "next/link"
import Header from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { XCircle } from "lucide-react"

export default function CancelPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-20 flex items-center justify-center">
        <Card className="max-w-lg w-full p-8 text-center">
          <XCircle className="h-16 w-16 text-destructive mx-auto mb-6" />
          <h1 className="text-3xl font-bold mb-4">Payment Canceled</h1>
          <p className="text-muted-foreground mb-8">
            Your payment was not processed. You have not been charged.
          </p>
          <Button asChild size="lg" variant="outline">
            <Link href="/models">Return to Marketplace</Link>
          </Button>
        </Card>
      </main>
    </div>
  )
}
