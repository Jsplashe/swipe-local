import Link from "next/link"
import { Compass } from "lucide-react"

export default function LandingFooter() {
  return (
    <footer className="w-full border-t py-6 md:py-0">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
        <div className="flex items-center gap-2">
          <Compass className="h-5 w-5" />
          <p className="text-sm leading-loose text-center md:text-left">
            &copy; {new Date().getFullYear()} SwipeLocal. All rights reserved.
          </p>
        </div>
        <nav className="flex gap-4 sm:gap-6">
          <Link href="#" className="text-sm font-medium hover:underline underline-offset-4">
            About
          </Link>
          <Link href="#" className="text-sm font-medium hover:underline underline-offset-4">
            Privacy
          </Link>
          <Link href="#" className="text-sm font-medium hover:underline underline-offset-4">
            Terms
          </Link>
          <Link href="/auth" className="text-sm font-medium hover:underline underline-offset-4">
            Sign In
          </Link>
        </nav>
      </div>
    </footer>
  )
}

