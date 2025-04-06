"use client"

import { useState } from "react"
import { MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import type { Experience } from "@/data/experiences"
import ExperienceDetailView from "./experience-detail-view"

interface MapViewProps {
  experiences: Experience[]
}

export default function MapView({ experiences }: MapViewProps) {
  const [selectedPin, setSelectedPin] = useState<Experience | null>(null)
  const [detailViewOpen, setDetailViewOpen] = useState(false)

  const openDetailView = (experience: Experience) => {
    setSelectedPin(experience)
    setDetailViewOpen(true)
  }

  const closeDetailView = () => {
    setDetailViewOpen(false)
  }

  const closePinPreview = () => {
    setSelectedPin(null)
  }

  // Generate random positions for pins
  const generatePinPosition = (id: string) => {
    // Use the id to generate a consistent position
    const idNum = Number.parseInt(id, 10) || 0
    const x = 10 + ((idNum * 17) % 80) // 10-90% of width
    const y = 15 + ((idNum * 23) % 70) // 15-85% of height

    return { x, y }
  }

  return (
    <div className="relative w-full h-[70vh] bg-muted/30 rounded-lg overflow-hidden">
      {/* Static map background with grid */}
      <div className="absolute inset-0 bg-grid-gray-300/20"></div>

      {/* Map pins */}
      {experiences.map((experience) => {
        const position = generatePinPosition(experience.id)
        return (
          <div
            key={experience.id}
            className="absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2 transition-all hover:scale-110"
            style={{
              left: `${position.x}%`,
              top: `${position.y}%`,
            }}
            onClick={() => setSelectedPin(experience)}
          >
            <div className="flex flex-col items-center">
              <div
                className={`w-8 h-8 rounded-full ${selectedPin?.id === experience.id ? "bg-primary" : "bg-secondary"} flex items-center justify-center shadow-md`}
              >
                <MapPin
                  className={`h-5 w-5 ${selectedPin?.id === experience.id ? "text-primary-foreground" : "text-secondary-foreground"}`}
                />
              </div>
              <div className="w-2 h-2 bg-foreground/80 rounded-full mt-0.5 shadow-sm"></div>
            </div>
          </div>
        )
      })}

      {/* Selected pin info card */}
      {selectedPin && (
        <Card className="absolute bottom-4 left-4 right-4 max-w-md mx-auto shadow-lg">
          <CardContent className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold">{selectedPin.name}</h3>
                <p className="text-sm text-muted-foreground">{selectedPin.location}</p>
              </div>
              <div className="flex gap-2">
                <Button size="sm" onClick={() => openDetailView(selectedPin)}>
                  View Details
                </Button>
                <Button size="sm" variant="ghost" onClick={closePinPreview}>
                  Close
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Map controls */}
      <div className="absolute top-4 right-4 bg-background/90 backdrop-blur-sm rounded-md shadow-md p-2">
        <div className="text-xs font-medium mb-1">Map View</div>
        <div className="flex flex-col gap-1">
          <Button size="sm" variant="ghost" className="h-8 justify-start">
            <span className="text-xs">Zoom In</span>
          </Button>
          <Button size="sm" variant="ghost" className="h-8 justify-start">
            <span className="text-xs">Zoom Out</span>
          </Button>
        </div>
      </div>

      {/* Detail view modal */}
      <ExperienceDetailView experience={selectedPin} isOpen={detailViewOpen} onClose={closeDetailView} />
    </div>
  )
}

