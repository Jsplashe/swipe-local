import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Compass } from "lucide-react"

export default function LandingHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Compass className="h-6 w-6" />
          <span className="font-bold text-xl">SwipeLocal</span>
        </Link>
        <nav className="hidden md:flex gap-6 items-center">
          <Link
            href="#features"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Features
          </Link>
          <Link href="#" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
            About
          </Link>
          <Link href="#" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
            Contact
          </Link>
        </nav>
        <div className="flex items-center gap-2">
          <Link href="/auth">
            <Button variant="outline" className="hidden sm:inline-flex">
              Sign In
            </Button>
          </Link>
          <Link href="/app">
            <Button>Get Started</Button>
          </Link>
        </div>
      </div>
    </header>
  )
}

