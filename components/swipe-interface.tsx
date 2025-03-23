"use client"

import { useState } from "react"
import { useSwipeable } from "react-swipeable"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { X, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLocalStorage } from "@/hooks/use-local-storage"
import { type Experience, experiences } from "@/data/experiences"

export default function SwipeInterface() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState<string | null>(null)
  const [savedExperiences, setSavedExperiences] = useLocalStorage<Experience[]>("saved-experiences", [])

  const currentExperience = experiences[currentIndex]

  const handlers = useSwipeable({
    onSwipedLeft: () => handleSwipe("left"),
    onSwipedRight: () => handleSwipe("right"),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  })

  const handleSwipe = (dir: string) => {
    setDirection(dir)

    if (dir === "right") {
      setSavedExperiences([...savedExperiences, currentExperience])
    }

    setTimeout(() => {
      setDirection(null)
      if (currentIndex < experiences.length - 1) {
        setCurrentIndex(currentIndex + 1)
      } else {
        // Reset to beginning when we run out of cards
        setCurrentIndex(0)
      }
    }, 300)
  }

  if (!currentExperience) {
    return <div className="text-center p-8">No more experiences to show!</div>
  }

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
      default:
        return "✨"
    }
  }

  return (
    <div {...handlers} className="w-full flex flex-col items-center justify-center gap-4 px-4 py-2">
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
    </div>
  )
}

