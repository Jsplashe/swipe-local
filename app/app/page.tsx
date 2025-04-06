import { Suspense } from "react"
import OnboardingModal from "@/components/onboarding-modal"
import LocationPrompt from "@/components/location-prompt"
import SwipeInterface from "@/components/swipe-interface"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import SavedExperiences from "@/components/saved-experiences"
import SettingsPage from "@/components/settings-page"
import ProfileTab from "@/components/profile-tab"
import { Compass, BookmarkCheck, Settings, User } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function AppPage() {
  return (
    <main className="flex min-h-screen flex-col items-center">
      <header className="w-full p-4 border-b flex items-center justify-between">
        <Link href="/">
          <Button variant="ghost" size="sm">
            Back to Home
          </Button>
        </Link>
        <h1 className="text-2xl font-bold text-center">SwipeLocal</h1>
        <div className="w-[73px]"></div> {/* Spacer for centering */}
      </header>

      <Suspense fallback={<div className="p-8 text-center">Loading experiences...</div>}>
        <Tabs defaultValue="discover" className="w-full max-w-md mx-auto">
          <TabsList className="grid w-full grid-cols-4 mb-4">
            <TabsTrigger value="discover" className="flex items-center gap-2">
              <Compass className="w-4 h-4" />
              Discover
            </TabsTrigger>
            <TabsTrigger value="saved" className="flex items-center gap-2">
              <BookmarkCheck className="w-4 h-4" />
              Saved
            </TabsTrigger>
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <User className="w-4 h-4" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings className="w-4 h-4" />
              Settings
            </TabsTrigger>
          </TabsList>
          <TabsContent value="discover" className="w-full">
            <SwipeInterface />
          </TabsContent>
          <TabsContent value="saved" className="w-full">
            <SavedExperiences />
          </TabsContent>
          <TabsContent value="profile" className="w-full">
            <ProfileTab />
          </TabsContent>
          <TabsContent value="settings" className="w-full">
            <SettingsPage />
          </TabsContent>
        </Tabs>
      </Suspense>

      <LocationPrompt />
      <OnboardingModal />
    </main>
  )
}

