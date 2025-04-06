import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Compass, Map, BookmarkCheck, Filter, ChevronRight, ArrowRight } from "lucide-react"
import LandingHeader from "@/components/landing-header"
import LandingFooter from "@/components/landing-footer"

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <LandingHeader />

      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-b from-background to-muted">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  Discover Your City, One Swipe at a Time
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  SwipeLocal helps you find the best local experiences tailored to your interests. Explore hidden gems
                  and create unforgettable memories.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link href="/app">
                  <Button size="lg" className="gap-2">
                    Get Started
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link href="#features">
                  <Button size="lg" variant="outline">
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="relative w-[280px] h-[580px] md:w-[320px] md:h-[640px] rounded-[40px] border-8 border-foreground/10 overflow-hidden shadow-xl">
                <div className="absolute inset-0 bg-muted rounded-[32px] overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-full max-w-[250px] aspect-[3/4] rounded-xl bg-background shadow-lg transform rotate-[-5deg] translate-x-[-20px] translate-y-[-40px]">
                      <div className="w-full h-[60%] bg-primary/20 rounded-t-xl"></div>
                      <div className="p-4">
                        <div className="h-4 w-2/3 bg-foreground/10 rounded-full mb-2"></div>
                        <div className="h-3 w-full bg-foreground/10 rounded-full mb-2"></div>
                        <div className="h-3 w-4/5 bg-foreground/10 rounded-full"></div>
                      </div>
                    </div>
                    <div className="w-full max-w-[250px] aspect-[3/4] rounded-xl bg-background shadow-lg transform rotate-[5deg] translate-x-[40px] translate-y-[60px]">
                      <div className="w-full h-[60%] bg-secondary/20 rounded-t-xl"></div>
                      <div className="p-4">
                        <div className="h-4 w-2/3 bg-foreground/10 rounded-full mb-2"></div>
                        <div className="h-3 w-full bg-foreground/10 rounded-full mb-2"></div>
                        <div className="h-3 w-4/5 bg-foreground/10 rounded-full"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-background">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Explore with Ease</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                SwipeLocal makes discovering local experiences simple and fun.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 md:grid-cols-2 lg:grid-cols-4">
            <Card className="h-full">
              <CardHeader className="pb-2">
                <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <Compass className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Quick Discovery</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Find new experiences with our intuitive swipe interface. Left to skip, right to save.
                </CardDescription>
              </CardContent>
            </Card>
            <Card className="h-full">
              <CardHeader className="pb-2">
                <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <Map className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Personalized Suggestions</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Get recommendations based on your location and preferences for a tailored experience.
                </CardDescription>
              </CardContent>
            </Card>
            <Card className="h-full">
              <CardHeader className="pb-2">
                <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <BookmarkCheck className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Save Favorites</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Keep track of experiences you love and access them anytime in your saved collection.
                </CardDescription>
              </CardContent>
            </Card>
            <Card className="h-full">
              <CardHeader className="pb-2">
                <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <Filter className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Easy Navigation</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Browse through categories and switch between discovery and saved items effortlessly.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
        <div className="container px-4 md:px-6">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
            <div>
              <div className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Why Choose SwipeLocal?</h2>
                <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed">
                  Our app is designed to enhance your local experience and help you make the most of your city.
                </p>
              </div>
              <ul className="mt-8 grid gap-4">
                <li className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                    <ChevronRight className="h-4 w-4 text-primary" />
                  </div>
                  <span className="text-lg font-medium">Discover hidden gems that tourists miss</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                    <ChevronRight className="h-4 w-4 text-primary" />
                  </div>
                  <span className="text-lg font-medium">Save time with curated local experiences</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                    <ChevronRight className="h-4 w-4 text-primary" />
                  </div>
                  <span className="text-lg font-medium">Find activities that match your interests</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                    <ChevronRight className="h-4 w-4 text-primary" />
                  </div>
                  <span className="text-lg font-medium">Create memorable experiences with friends and family</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                    <ChevronRight className="h-4 w-4 text-primary" />
                  </div>
                  <span className="text-lg font-medium">No account required to start exploring</span>
                </li>
              </ul>
            </div>
            <div className="flex items-center justify-center">
              <div className="relative aspect-square w-full max-w-md overflow-hidden rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20 p-8">
                <div className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.5))]"></div>
                <div className="relative flex h-full flex-col items-center justify-center space-y-4 text-center">
                  <div className="h-40 w-40 rounded-full bg-background p-4 shadow-lg">
                    <div className="flex h-full w-full items-center justify-center rounded-full bg-primary/10">
                      <Compass className="h-20 w-20 text-primary" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold">Explore Your City</h3>
                  <p className="text-muted-foreground">SwipeLocal puts the best of your city at your fingertips</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-background border-t">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Ready to Explore?</h2>
              <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed">
                Start discovering amazing local experiences today with SwipeLocal.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Link href="/app">
                <Button size="lg" className="gap-2">
                  Get Started Now
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <LandingFooter />
    </div>
  )
}

