import { Suspense } from "react"
import OnboardingModal from "@/components/onboarding-modal"
import LocationPrompt from "@/components/location-prompt"
import SwipeInterface from "@/components/swipe-interface"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import SavedExperiences from "@/components/saved-experiences"
import { Compass, BookmarkCheck } from "lucide-react"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center">
      <header className="w-full p-4 border-b">
        <h1 className="text-2xl font-bold text-center">SwipeLocal</h1>
      </header>

      <Suspense fallback={<div className="p-8 text-center">Loading experiences...</div>}>
        <Tabs defaultValue="discover" className="w-full max-w-md mx-auto">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="discover" className="flex items-center gap-2">
              <Compass className="w-4 h-4" />
              Discover
            </TabsTrigger>
            <TabsTrigger value="saved" className="flex items-center gap-2">
              <BookmarkCheck className="w-4 h-4" />
              Saved
            </TabsTrigger>
          </TabsList>
          <TabsContent value="discover" className="w-full">
            <SwipeInterface />
          </TabsContent>
          <TabsContent value="saved" className="w-full">
            <SavedExperiences />
          </TabsContent>
        </Tabs>
      </Suspense>

      <LocationPrompt />
      <OnboardingModal />
    </main>
  )
}

