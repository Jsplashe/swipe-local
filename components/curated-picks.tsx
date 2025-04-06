"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { trendingExperiences } from "@/data/experiences"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"

export default function CuratedPicks() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)

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
    <div className="px-4 py-2">
      <h2 className="text-lg font-semibold mb-3">Trending Now</h2>
      <ScrollArea className="w-full whitespace-nowrap pb-4">
        <div className="flex gap-4">
          {trendingExperiences.map((experience) => (
            <Card
              key={experience.id}
              className="w-[250px] flex-shrink-0 overflow-hidden transition-all duration-200 hover:shadow-md"
              onMouseEnter={() => setHoveredCard(experience.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div
                className="w-full h-32 bg-cover bg-center transition-transform duration-300"
                style={{
                  backgroundImage: `url(${experience.imageUrl})`,
                  transform: hoveredCard === experience.id ? "scale(1.05)" : "scale(1)",
                }}
              />
              <CardContent className="p-3">
                <div className="flex justify-between items-start">
                  <h3 className="font-semibold">{experience.name}</h3>
                  <Badge variant="outline" className="text-xs">
                    {getCategoryEmoji(experience.category)} {experience.category}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground line-clamp-2 mt-1">{experience.description}</p>
                <div className="mt-2">
                  <Badge variant="secondary" className="text-xs">
                    🔥 Trending
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  )
}

