"use client"

import type React from "react"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, X } from "lucide-react"
import { cn } from "@/lib/utils"

interface SearchAndFiltersProps {
  onSearch: (term: string) => void
  onFilterChange: (categories: string[]) => void
}

export default function SearchAndFilters({ onSearch, onFilterChange }: SearchAndFiltersProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])

  // Available categories
  const categories = [
    { id: "food", name: "Food", icon: "🍽️" },
    { id: "drinks", name: "Drinks", icon: "🍹" },
    { id: "art", name: "Art", icon: "🎨" },
    { id: "outdoors", name: "Outdoors", icon: "🌳" },
    { id: "nightlife", name: "Nightlife", icon: "🍸" },
    { id: "events", name: "Events", icon: "🎪" },
  ]

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value
    setSearchTerm(term)
    onSearch(term)
  }

  const toggleCategory = (categoryId: string) => {
    let newCategories: string[]

    if (selectedCategories.includes(categoryId)) {
      newCategories = selectedCategories.filter((id) => id !== categoryId)
    } else {
      newCategories = [...selectedCategories, categoryId]
    }

    setSelectedCategories(newCategories)
    onFilterChange(newCategories)
  }

  const clearFilters = () => {
    setSelectedCategories([])
    setSearchTerm("")
    onSearch("")
    onFilterChange([])
  }

  return (
    <div className="space-y-4 px-4 py-2">
      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search experiences..."
          className="pl-8 pr-10"
          value={searchTerm}
          onChange={handleSearch}
        />
        {searchTerm && (
          <button
            className="absolute right-2.5 top-2.5 text-muted-foreground hover:text-foreground"
            onClick={() => {
              setSearchTerm("")
              onSearch("")
            }}
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {categories.map((category) => (
          <Badge
            key={category.id}
            variant={selectedCategories.includes(category.id) ? "default" : "outline"}
            className={cn(
              "cursor-pointer whitespace-nowrap",
              selectedCategories.includes(category.id) ? "bg-primary" : "hover:bg-muted",
            )}
            onClick={() => toggleCategory(category.id)}
          >
            <span className="mr-1">{category.icon}</span> {category.name}
          </Badge>
        ))}

        {(selectedCategories.length > 0 || searchTerm) && (
          <Badge variant="outline" className="cursor-pointer whitespace-nowrap hover:bg-muted" onClick={clearFilters}>
            <X className="h-3 w-3 mr-1" /> Clear All
          </Badge>
        )}
      </div>
    </div>
  )
}

