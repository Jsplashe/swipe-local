"use client"

import { useState } from "react"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { useLocalStorage } from "@/hooks/use-local-storage"
import { cn } from "@/lib/utils"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { RefreshCw, Save } from "lucide-react"
import { toast } from "@/hooks/use-toast"

export default function SettingsPage() {
  // Default settings
  const defaultSettings = {
    distance: 10,
    categories: ["food", "art", "outdoors", "nightlife", "shopping", "music"],
    swipeLimit: 20,
  }

  // Get settings from local storage or use defaults
  const [settings, setSettings] = useLocalStorage("swipelocal-settings", defaultSettings)

  // Local state for UI - initialize from props instead of directly from localStorage
  const [distance, setDistance] = useState(() => settings.distance)
  const [swipeLimit, setSwipeLimit] = useState(() => settings.swipeLimit)
  const [selectedCategories, setSelectedCategories] = useState<string[]>(() => [...settings.categories])

  // Available categories
  const allCategories = [
    { id: "food", name: "Food", icon: "🍽️" },
    { id: "drinks", name: "Drinks", icon: "🍹" },
    { id: "art", name: "Art", icon: "🎨" },
    { id: "outdoors", name: "Outdoors", icon: "🌳" },
    { id: "nightlife", name: "Nightlife", icon: "🍸" },
    { id: "shopping", name: "Shopping", icon: "🛍️" },
    { id: "music", name: "Music", icon: "🎵" },
    { id: "events", name: "Events", icon: "🎪" },
  ]

  // Toggle category selection
  const toggleCategory = (categoryId: string) => {
    if (selectedCategories.includes(categoryId)) {
      setSelectedCategories(selectedCategories.filter((id) => id !== categoryId))
    } else {
      setSelectedCategories([...selectedCategories, categoryId])
    }
  }

  // Save settings
  const saveSettings = () => {
    const newSettings = {
      distance,
      categories: selectedCategories,
      swipeLimit,
    }
    setSettings(newSettings)
    toast({
      title: "Settings saved",
      description: "Your preferences have been updated.",
    })
  }

  // Reset to defaults
  const resetToDefaults = () => {
    setDistance(defaultSettings.distance)
    setSelectedCategories(defaultSettings.categories)
    setSwipeLimit(defaultSettings.swipeLimit)
    setSettings(defaultSettings)
    toast({
      title: "Settings reset",
      description: "Your preferences have been reset to default values.",
    })
  }

  return (
    <div className="p-4 space-y-8">
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Settings</h2>
        <p className="text-muted-foreground">Customize your SwipeLocal experience</p>
      </div>

      {/* Your Preferences Summary Card */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Your Preferences</CardTitle>
          <CardDescription>Current settings for your SwipeLocal experience</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Swipe Distance</span>
            <Badge variant="secondary">{distance} miles</Badge>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Daily Swipe Limit</span>
            <Badge variant="secondary">{swipeLimit} swipes</Badge>
          </div>
          <div>
            <span className="text-sm font-medium block mb-2">Selected Categories</span>
            <div className="flex flex-wrap gap-1">
              {selectedCategories.map((catId) => {
                const category = allCategories.find((c) => c.id === catId)
                return category ? (
                  <Badge key={catId} variant="outline" className="text-xs">
                    {category.icon} {category.name}
                  </Badge>
                ) : null
              })}
            </div>
          </div>
        </CardContent>
      </Card>

      <Separator />

      {/* Distance Filter */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <Label htmlFor="distance">Distance</Label>
          <span className="text-sm font-medium">{distance} miles</span>
        </div>
        <Slider
          id="distance"
          min={1}
          max={50}
          step={1}
          value={[distance]}
          onValueChange={(value) => setDistance(value[0])}
          className="w-full"
        />
      </div>

      {/* Category Selection */}
      <div className="space-y-4">
        <Label>Categories</Label>
        <div className="flex flex-wrap gap-2">
          {allCategories.map((category) => (
            <Badge
              key={category.id}
              variant={selectedCategories.includes(category.id) ? "default" : "outline"}
              className={cn(
                "cursor-pointer text-sm py-1.5 px-3",
                selectedCategories.includes(category.id) ? "bg-primary" : "hover:bg-muted",
              )}
              onClick={() => toggleCategory(category.id)}
            >
              <span className="mr-1">{category.icon}</span> {category.name}
            </Badge>
          ))}
        </div>
      </div>

      {/* Swipe Limit */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <Label htmlFor="swipe-limit">Daily Swipe Limit</Label>
          <span className="text-sm font-medium">{swipeLimit} swipes</span>
        </div>
        <Slider
          id="swipe-limit"
          min={5}
          max={100}
          step={5}
          value={[swipeLimit]}
          onValueChange={(value) => setSwipeLimit(value[0])}
          className="w-full"
        />
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col gap-2 sm:flex-row pt-4">
        <Button onClick={saveSettings} className="flex-1 gap-2">
          <Save className="h-4 w-4" />
          Save Settings
        </Button>
        <Button variant="outline" onClick={resetToDefaults} className="flex-1 gap-2">
          <RefreshCw className="h-4 w-4" />
          Reset to Default
        </Button>
      </div>
    </div>
  )
}

