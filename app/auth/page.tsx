"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Apple, Facebook } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function AuthPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const handleSocialLogin = (provider: string) => {
    setIsLoading(true)

    // Simulate authentication delay
    setTimeout(() => {
      console.log(`Logging in with ${provider}`)
      setIsLoading(false)
      router.push("/app")
    }, 1000)
  }

  const handleEmailAuth = (type: "login" | "signup") => {
    setIsLoading(true)

    // Simulate authentication delay
    setTimeout(() => {
      console.log(`${type === "login" ? "Logging in" : "Signing up"} with email`)
      setIsLoading(false)
      router.push("/app")
    }, 1000)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <header className="p-4 border-b">
        <div className="flex items-center">
          <Link href="/app">
            <Button variant="ghost" size="icon" className="mr-2">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-xl font-bold">SwipeLocal</h1>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Welcome to SwipeLocal</CardTitle>
            <CardDescription>Sign in to save your preferences and experiences</CardDescription>
          </CardHeader>

          <CardContent>
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
              </TabsList>

              <TabsContent value="login" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email-login">Email</Label>
                  <Input id="email-login" type="email" placeholder="your@email.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password-login">Password</Label>
                  <Input id="password-login" type="password" />
                </div>
                <Button className="w-full" onClick={() => handleEmailAuth("login")} disabled={isLoading}>
                  {isLoading ? "Logging in..." : "Login"}
                </Button>
              </TabsContent>

              <TabsContent value="signup" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name-signup">Full Name</Label>
                  <Input id="name-signup" type="text" placeholder="Your Name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email-signup">Email</Label>
                  <Input id="email-signup" type="email" placeholder="your@email.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password-signup">Password</Label>
                  <Input id="password-signup" type="password" />
                </div>
                <Button className="w-full" onClick={() => handleEmailAuth("signup")} disabled={isLoading}>
                  {isLoading ? "Creating account..." : "Create Account"}
                </Button>
              </TabsContent>
            </Tabs>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <Button
                variant="outline"
                onClick={() => handleSocialLogin("Google")}
                disabled={isLoading}
                className="w-full"
              >
                <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
                Google
              </Button>
              <Button
                variant="outline"
                onClick={() => handleSocialLogin("Facebook")}
                disabled={isLoading}
                className="w-full"
              >
                <Facebook className="h-5 w-5 mr-2 text-blue-600" />
                Facebook
              </Button>
              <Button
                variant="outline"
                onClick={() => handleSocialLogin("Apple")}
                disabled={isLoading}
                className="w-full"
              >
                <Apple className="h-5 w-5 mr-2" />
                Apple
              </Button>
            </div>
          </CardContent>

          <CardFooter className="flex flex-col items-center text-center text-sm text-muted-foreground">
            <p>By continuing, you agree to SwipeLocal's Terms of Service and Privacy Policy.</p>
          </CardFooter>
        </Card>
      </main>
    </div>
  )
}

