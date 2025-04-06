"use client"

import { useState, useEffect } from "react"
import { useSwipeable } from "react-swipeable"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { X, Heart, MapIcon, List, Search, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLocalStorage } from "@/hooks/use-local-storage"
import { type Experience, experiences } from "@/data/experiences"
import SearchAndFilters from "./search-and-filters"
import MapView from "./map-view"
import EmptyState from "./empty-states"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export default function SwipeInterface() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState<string | null>(null)
  const [savedExperiences, setSavedExperiences] = useLocalStorage<Experience[]>("saved-experiences", [])
  const [swipeCount, setSwipeCount] = useLocalStorage<number>("daily-swipe-count", 0)
  const [settings] = useLocalStorage("swipelocal-settings", {
    distance: 10,
    categories: ["food", "art", "outdoors", "nightlife", "shopping", "music"],
    swipeLimit: 20,
  })

  // New state for search and filters
  const [searchTerm, setSearchTerm] = useState("")
  const [activeFilters, setActiveFilters] = useState<string[]>([])
  const [filteredExperiences, setFilteredExperiences] = useState(experiences)

  // New state for view toggle
  const [viewMode, setViewMode] = useState<"swipe" | "map">("swipe")

  // Apply filters to experiences
  useEffect(() => {
    let result = [...experiences]

    // Apply search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase()
      result = result.filter(
        (exp) =>
          exp.name.toLowerCase().includes(term) ||
          exp.description.toLowerCase().includes(term) ||
          exp.location.toLowerCase().includes(term),
      )
    }

    // Apply category filters
    if (activeFilters.length > 0) {
      result = result.filter((exp) => activeFilters.includes(exp.category))
    }

    setFilteredExperiences(result)
    // Only reset index if we have results and the current index is invalid
    if (result.length > 0 && currentIndex >= result.length) {
      setCurrentIndex(0)
    }
  }, [searchTerm, activeFilters, experiences])

  // Reset swipe count at midnight
  useEffect(() => {
    const now = new Date()
    const tomorrow = new Date(now)
    tomorrow.setDate(tomorrow.getDate() + 1)
    tomorrow.setHours(0, 0, 0, 0)

    const timeUntilMidnight = tomorrow.getTime() - now.getTime()

    const timer = setTimeout(() => {
      setSwipeCount(0)
    }, timeUntilMidnight)

    return () => clearTimeout(timer)
  }, [setSwipeCount])

  const currentExperience = filteredExperiences[currentIndex]

  const handlers = useSwipeable({
    onSwipedLeft: () => handleSwipe("left"),
    onSwipedRight: () => handleSwipe("right"),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  })

  const handleSwipe = (dir: string) => {
    // Check if user has reached their daily swipe limit
    if (swipeCount >= settings.swipeLimit) {
      return
    }

    setDirection(dir)
    setSwipeCount(swipeCount + 1)

    if (dir === "right") {
      // Only save if not already saved
      if (!savedExperiences.some((exp) => exp.id === currentExperience.id)) {
        setSavedExperiences([...savedExperiences, currentExperience])
      }
    }

    setTimeout(() => {
      setDirection(null)
      if (currentIndex < filteredExperiences.length - 1) {
        setCurrentIndex(currentIndex + 1)
      } else {
        // Reset to beginning when we run out of cards
        setCurrentIndex(0)
      }
    }, 300)
  }

  const handleSearch = (term: string) => {
    setSearchTerm(term)
  }

  const handleFilterChange = (categories: string[]) => {
    setActiveFilters(categories)
  }

  // Check if user has reached their daily swipe limit
  const hasReachedSwipeLimit = swipeCount >= settings.swipeLimit

  // Check if there are no experiences after filtering
  const noExperiencesFound = filteredExperiences.length === 0

  const getCategoryEmoji = (category: string) => {
    switch (category) {
      case "food":
        return "🍽️"
      case "art":
        return "🎨"
      case "outdoors":
        return "🌳"
      case "nightlife":
        return "🍸"
      case "shopping":
        return "🛍️"
      case "music":
        return "🎵"
      case "drinks":
        return "🍹"
      case "events":
        return "🎪"
      default:
        return "✨"
    }
  }

  return (
    <div className="w-full flex flex-col">
      {/* Search and Filters */}
      <SearchAndFilters onSearch={handleSearch} onFilterChange={handleFilterChange} />

      {/* View Toggle with Header */}
      <div className="px-4 py-2 space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium">View Mode</h3>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Info className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-xs">Switch between card swipe view and map view</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <ToggleGroup
          type="single"
          value={viewMode}
          onValueChange={(value) => value && setViewMode(value as "swipe" | "map")}
          className="bg-muted/30 p-1 rounded-md"
        >
          <ToggleGroupItem
            value="swipe"
            aria-label="Swipe View"
            className={`flex-1 ${viewMode === "swipe" ? "bg-background shadow-sm" : ""}`}
          >
            <List className="h-4 w-4 mr-2" />
            Swipe
          </ToggleGroupItem>
          <ToggleGroupItem
            value="map"
            aria-label="Map View"
            className={`flex-1 ${viewMode === "map" ? "bg-background shadow-sm" : ""}`}
          >
            <MapIcon className="h-4 w-4 mr-2" />
            Map
          </ToggleGroupItem>
        </ToggleGroup>
      </div>

      {/* Swipe Counter */}
      <div className="px-4 py-2 flex justify-between items-center">
        <div className="text-xs text-muted-foreground">
          <span className="font-medium">{swipeCount}</span> of{" "}
          <span className="font-medium">{settings.swipeLimit}</span> daily swipes used
        </div>
        <div className="text-xs text-muted-foreground">
          <span className="font-medium">{filteredExperiences.length}</span> experiences found
        </div>
      </div>

      {/* Content based on  experiences found
        </div>
      </div>
      
      {/* Content based on view mode */}
      {viewMode === "swipe" ? (
        <div {...handlers} className="w-full flex flex-col items-center justify-center gap-4 px-4 py-2">
          {hasReachedSwipeLimit ? (
            <EmptyState type="no-swipes" />
          ) : noExperiencesFound ? (
            <div className="text-center p-8 h-[60vh] flex flex-col items-center justify-center">
              <div className="bg-muted/50 p-6 rounded-full mb-4">
                <Search className="h-12 w-12 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">No Experiences Found</h3>
              <p className="text-muted-foreground mb-6 max-w-xs">
                Try adjusting your filters or search term to find more experiences.
              </p>
              <Button
                onClick={() => {
                  setSearchTerm("")
                  setActiveFilters([])
                }}
              >
                Clear Filters
              </Button>
            </div>
          ) : (
            <>
              <div className="relative w-full h-[70vh] max-h-[600px]">
                <Card
                  className={`absolute inset-0 overflow-hidden transition-all duration-300 shadow-lg
                    ${direction === "left" ? "translate-x-[-120%] rotate-[-20deg]" : ""}
                    ${direction === "right" ? "translate-x-[120%] rotate-[20deg]" : ""}
                  `}
                >
                  <div
                    className="w-full h-[60%] bg-cover bg-center"
                    style={{ backgroundImage: `url(${currentExperience.imageUrl})` }}
                  />
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h2 className="text-xl font-bold">{currentExperience.name}</h2>
                      <Badge variant="outline" className="text-sm">
                        {getCategoryEmoji(currentExperience.category)} {currentExperience.category}
                      </Badge>
                    </div>
                    <p className="text-muted-foreground mb-4">{currentExperience.description}</p>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <span>📍 {currentExperience.location}</span>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="flex justify-center gap-4 w-full">
                <Button
                  variant="outline"
                  size="lg"
                  className="rounded-full h-14 w-14 p-0 border-2 border-destructive"
                  onClick={() => handleSwipe("left")}
                >
                  <X className="h-6 w-6 text-destructive" />
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="rounded-full h-14 w-14 p-0 border-2 border-green-500"
                  onClick={() => handleSwipe("right")}
                >
                  <Heart className="h-6 w-6 text-green-500" />
                </Button>
              </div>
            </>
          )}
        </div>
      ) : (
        <div className="px-4 py-2">
          <MapView experiences={filteredExperiences} />
        </div>
      )}
    </div>
  )
}

