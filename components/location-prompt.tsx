"use client"

import { useState, useEffect } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { MapPin } from "lucide-react"
import { useLocalStorage } from "@/hooks/use-local-storage"

export default function LocationPrompt() {
  const [open, setOpen] = useState(false)
  const [locationGranted, setLocationGranted] = useLocalStorage("location-granted", false)

  useEffect(() => {
    // Only show the prompt if location hasn't been granted yet
    if (!locationGranted) {
      setOpen(true)
    }
  }, [locationGranted])

  const handleAllowLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // In a real app, you would use these coordinates to fetch nearby experiences
          console.log("Location granted:", position.coords.latitude, position.coords.longitude)
          setLocationGranted(true)
          setOpen(false)
        },
        (error) => {
          console.error("Error getting location:", error)
          // Still close the dialog even if user denies browser permission
          setOpen(false)
        },
      )
    } else {
      console.error("Geolocation is not supported by this browser")
      setOpen(false)
    }
  }

  const handleSkip = () => {
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Enable location</DialogTitle>
          <DialogDescription>
            SwipeLocal uses your location to find experiences near you. Allow location access for the best
            recommendations.
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-center py-6">
          <div className="bg-primary/10 p-6 rounded-full">
            <MapPin className="h-12 w-12 text-primary" />
          </div>
        </div>
        <DialogFooter className="flex flex-col sm:flex-row gap-2">
          <Button variant="outline" onClick={handleSkip} className="sm:w-full">
            Skip for now
          </Button>
          <Button onClick={handleAllowLocation} className="sm:w-full">
            Allow location
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

