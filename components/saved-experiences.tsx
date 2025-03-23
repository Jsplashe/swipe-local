"use client"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLocalStorage } from "@/hooks/use-local-storage"
import type { Experience } from "@/data/experiences"

export default function SavedExperiences() {
  const [savedExperiences, setSavedExperiences] = useLocalStorage<Experience[]>("saved-experiences", [])

  const removeExperience = (id: string) => {
    setSavedExperiences(savedExperiences.filter((exp) => exp.id !== id))
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

  if (savedExperiences.length === 0) {
    return (
      <div className="text-center p-8 flex flex-col items-center gap-4">
        <p className="text-muted-foreground">You haven't saved any experiences yet.</p>
        <p>Swipe right on experiences you like to save them here!</p>
      </div>
    )
  }

  return (
    <div className="grid gap-4 p-4">
      {savedExperiences.map((experience) => (
        <Card key={experience.id} className="overflow-hidden">
          <div className="flex h-32">
            <div className="w-1/3 bg-cover bg-center" style={{ backgroundImage: `url(${experience.imageUrl})` }} />
            <CardContent className="w-2/3 p-3 relative">
              <div className="flex justify-between items-start">
                <h3 className="font-semibold">{experience.name}</h3>
                <Badge variant="outline" className="text-xs">
                  {getCategoryEmoji(experience.category)} {experience.category}
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground line-clamp-2 mt-1">{experience.description}</p>
              <div className="absolute bottom-3 right-3">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 rounded-full hover:bg-destructive/10"
                  onClick={() => removeExperience(experience.id)}
                >
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </div>
            </CardContent>
          </div>
        </Card>
      ))}
    </div>
  )
}

