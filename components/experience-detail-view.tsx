"use client"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Heart, Share2, X, MapPin } from "lucide-react"
import type { Experience } from "@/data/experiences"
import { useLocalStorage } from "@/hooks/use-local-storage"
import Image from "next/image"

interface ExperienceDetailViewProps {
  experience: Experience | null
  isOpen: boolean
  onClose: () => void
}

export default function ExperienceDetailView({ experience, isOpen, onClose }: ExperienceDetailViewProps) {
  const [savedExperiences, setSavedExperiences] = useLocalStorage<Experience[]>("saved-experiences", [])

  if (!experience) return null

  const isSaved = savedExperiences.some((exp) => exp.id === experience.id)

  const toggleSave = () => {
    if (isSaved) {
      setSavedExperiences(savedExperiences.filter((exp) => exp.id !== experience.id))
    } else {
      setSavedExperiences([...savedExperiences, experience])
    }
  }

  const handleShare = () => {
    // Non-functional for now, but could implement Web Share API in the future
    alert("Share functionality would go here in a real app")
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

  // Generate random opening hours for demo purposes
  const generateOpeningHours = () => {
    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
    const hours = []

    for (const day of days) {
      // Some experiences might be closed on certain days
      if (day === "Monday" && ["2", "5", "8"].includes(experience.id)) {
        hours.push({ day, hours: "Closed" })
        continue
      }

      const openHour = Math.floor(Math.random() * 5) + 8 // 8 AM to 12 PM
      const closeHour = Math.floor(Math.random() * 6) + 17 // 5 PM to 10 PM

      const openTime = `${openHour}:00 ${openHour >= 12 ? "PM" : "AM"}`
      const closeTime = `${closeHour}:00 ${closeHour >= 12 ? "PM" : "AM"}`

      hours.push({ day, hours: `${openTime} - ${closeTime}` })
    }

    return hours
  }

  const openingHours = generateOpeningHours()

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-auto">
        <DialogHeader className="flex flex-row items-center justify-between">
          <div className="space-y-1.5">
            <DialogTitle className="text-2xl">{experience.name}</DialogTitle>
            <DialogDescription>
              <Badge variant="outline" className="text-sm">
                {getCategoryEmoji(experience.category)} {experience.category}
              </Badge>
            </DialogDescription>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose} className="absolute right-4 top-4">
            <X className="h-4 w-4" />
          </Button>
        </DialogHeader>

        <div className="space-y-6">
          {/* Featured Image */}
          <div className="relative w-full h-64 overflow-hidden rounded-md">
            <Image
              src={experience.imageUrl || "/placeholder.svg"}
              alt={experience.name}
              fill
              className="object-cover"
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <h3 className="text-lg font-medium">About this experience</h3>
            <p className="text-muted-foreground">
              {experience.description}
              {/* Extended description for detail view */} This unique local experience offers visitors a chance to
              immerse themselves in the local culture and create lasting memories. Whether you're a tourist exploring
              the area or a local looking for something new, this is an opportunity you won't want to miss.
            </p>
          </div>

          {/* Location with Map */}
          <div className="space-y-2">
            <h3 className="text-lg font-medium">Location</h3>
            <div className="flex items-center gap-2 text-muted-foreground mb-2">
              <MapPin className="h-4 w-4" />
              <span>{experience.location}, Downtown Area</span>
            </div>
            <div className="relative w-full h-40 bg-muted rounded-md overflow-hidden">
              {/* Static map placeholder - in a real app, this would be an actual map */}
              <div className="absolute inset-0 flex items-center justify-center bg-secondary/20">
                <div className="relative w-full h-full">
                  <div className="absolute inset-0 bg-grid-gray-300/20"></div>
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                    <MapPin className="h-4 w-4 text-primary-foreground" />
                  </div>
                  <div className="absolute bottom-2 right-2 bg-background/80 px-2 py-1 rounded text-xs">Map View</div>
                </div>
              </div>
            </div>
          </div>

          {/* Opening Hours */}
          <div className="space-y-2">
            <h3 className="text-lg font-medium">Opening Hours</h3>
            <div className="grid grid-cols-2 gap-2 text-sm">
              {openingHours.map((item) => (
                <div key={item.day} className="flex justify-between">
                  <span className="font-medium">{item.day}</span>
                  <span className="text-muted-foreground">{item.hours}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 pt-4">
            <Button variant={isSaved ? "default" : "outline"} className="flex-1" onClick={toggleSave}>
              <Heart className={`mr-2 h-4 w-4 ${isSaved ? "fill-current" : ""}`} />
              {isSaved ? "Saved" : "Save"}
            </Button>
            <Button variant="outline" className="flex-1" onClick={handleShare}>
              <Share2 className="mr-2 h-4 w-4" />
              Share
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

