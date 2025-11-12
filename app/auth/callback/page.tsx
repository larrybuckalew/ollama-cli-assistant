"use client"

import { useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"

export default function AuthCallbackPage() {
  const searchParams = useSearchParams()
  const router = useRouter()

  useEffect(() => {
    const token = searchParams.get("token")

    if (token) {
      // Store the token in localStorage
      localStorage.setItem("authToken", token)

      // Redirect to the homepage
      router.push("/")
    } else {
      // Handle the case where there is no token
      // Maybe redirect to login with an error message
      router.push("/register?error=auth_failed")
    }
  }, [searchParams, router])

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold">Authenticating...</h1>
        <p className="text-muted-foreground">Please wait while we log you in.</p>
      </div>
    </div>
  )
}
