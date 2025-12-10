"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"
import { User, Settings, Box } from "lucide-react"

export default function DashboardPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem("authToken")
    if (!token) {
      router.push("/login")
    } else {
      setIsLoading(false)
    }
  }, [router])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p>Loading...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold tracking-tight">Welcome to your Dashboard</h1>
          <p className="text-muted-foreground">Manage your account, models, and settings here.</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card className="p-6 flex flex-col items-center text-center">
            <User className="h-12 w-12 mb-4 text-primary" />
            <h3 className="text-xl font-semibold mb-2">Account Settings</h3>
            <p className="text-muted-foreground text-sm">Update your profile and email preferences.</p>
          </Card>

          <Card className="p-6 flex flex-col items-center text-center">
            <Box className="h-12 w-12 mb-4 text-primary" />
            <h3 className="text-xl font-semibold mb-2">My Models</h3>
            <p className="text-muted-foreground text-sm">View and manage your purchased models.</p>
          </Card>

          <Card className="p-6 flex flex-col items-center text-center">
            <Settings className="h-12 w-12 mb-4 text-primary" />
            <h3 className="text-xl font-semibold mb-2">API & Integrations</h3>
            <p className="text-muted-foreground text-sm">Manage your API keys and connect to other services.</p>
          </Card>
        </div>
      </main>
    </div>
  )
}
