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
import { ArrowLeft, ArrowRight, X } from "lucide-react"
import { useLocalStorage } from "@/hooks/use-local-storage"

export default function OnboardingModal() {
  const [open, setOpen] = useState(false)
  const [step, setStep] = useState(0)
  const [onboardingComplete, setOnboardingComplete] = useLocalStorage("onboarding-complete", false)

  useEffect(() => {
    // Only show onboarding if it hasn't been completed
    if (!onboardingComplete) {
      setOpen(true)
    }
  }, [onboardingComplete])

  const steps = [
    {
      title: "Welcome to SwipeLocal",
      description: "Discover amazing local experiences with a simple swipe.",
      icon: "👋",
    },
    {
      title: "Swipe to Discover",
      description: "Swipe right to save experiences you like, swipe left to skip.",
      icon: "👆",
    },
    {
      title: "Save Your Favorites",
      description: "Find all your saved experiences in the Saved tab.",
      icon: "❤️",
    },
  ]

  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep(step + 1)
    } else {
      handleComplete()
    }
  }

  const handlePrevious = () => {
    if (step > 0) {
      setStep(step - 1)
    }
  }

  const handleComplete = () => {
    setOnboardingComplete(true)
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{steps[step].title}</DialogTitle>
          <DialogDescription>{steps[step].description}</DialogDescription>
        </DialogHeader>
        <div className="flex justify-center py-8">
          <div className="text-6xl">{steps[step].icon}</div>
        </div>
        <div className="flex justify-center gap-2 mb-4">
          {steps.map((_, index) => (
            <div key={index} className={`h-2 w-2 rounded-full ${index === step ? "bg-primary" : "bg-muted"}`} />
          ))}
        </div>
        <DialogFooter className="flex sm:justify-between gap-2">
          <div className="flex gap-2">
            {step > 0 && (
              <Button variant="outline" size="icon" onClick={handlePrevious}>
                <ArrowLeft className="h-4 w-4" />
              </Button>
            )}
            <Button variant="outline" size="icon" onClick={handleComplete}>
              <X className="h-4 w-4" />
            </Button>
          </div>
          <Button onClick={handleNext}>
            {step < steps.length - 1 ? (
              <>
                Next
                <ArrowRight className="ml-2 h-4 w-4" />
              </>
            ) : (
              <>Get Started</>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

