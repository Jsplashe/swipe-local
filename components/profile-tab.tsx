"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Settings, User, MapPin, Heart, X, Award } from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"

export default function ProfileTab() {
  // Use state instead of direct localStorage access
  const [userData, setUserData] = useState({
    username: "Urban Explorer",
    email: "explorer@example.com",
    avatar: null,
  })

  const [swipeStats, setSwipeStats] = useState({
    swipedRight: 32,
    swipedLeft: 47,
    saved: 18,
    visited: 5,
  })

  const [streak, setStreak] = useState(3)

  // Load data from localStorage on mount only
  useEffect(() => {
    const storedUserData = localStorage.getItem("user-data")
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData))
    }

    const storedSwipeStats = localStorage.getItem("swipe-stats")
    if (storedSwipeStats) {
      setSwipeStats(JSON.parse(storedSwipeStats))
    }

    const storedStreak = localStorage.getItem("swipe-streak")
    if (storedStreak) {
      setStreak(JSON.parse(storedStreak))
    }
  }, [])

  return (
    <div className="p-4 space-y-6">
      {/* Profile Header */}
      <div className="flex flex-col items-center text-center space-y-4">
        <Avatar className="h-24 w-24">
          <AvatarImage src={userData.avatar || ""} alt={userData.username} />
          <AvatarFallback className="text-2xl bg-primary/10">
            {userData.username.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div>
          <h2 className="text-xl font-bold">{userData.username}</h2>
          <p className="text-sm text-muted-foreground">{userData.email}</p>
        </div>
        <div className="flex items-center gap-1 text-sm bg-primary/10 px-3 py-1 rounded-full">
          <Award className="h-4 w-4 text-primary" />
          <span className="font-medium text-primary">{streak} Day Streak</span>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 gap-3">
        <Card>
          <CardHeader className="p-3">
            <CardTitle className="text-sm">Swiped Right</CardTitle>
          </CardHeader>
          <CardContent className="p-3 pt-0">
            <div className="flex items-center gap-2">
              <Heart className="h-5 w-5 text-green-500" />
              <span className="text-2xl font-bold">{swipeStats.swipedRight}</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="p-3">
            <CardTitle className="text-sm">Swiped Left</CardTitle>
          </CardHeader>
          <CardContent className="p-3 pt-0">
            <div className="flex items-center gap-2">
              <X className="h-5 w-5 text-destructive" />
              <span className="text-2xl font-bold">{swipeStats.swipedLeft}</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="p-3">
            <CardTitle className="text-sm">Saved</CardTitle>
          </CardHeader>
          <CardContent className="p-3 pt-0">
            <div className="flex items-center gap-2">
              <Heart className="h-5 w-5 text-primary fill-primary" />
              <span className="text-2xl font-bold">{swipeStats.saved}</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="p-3">
            <CardTitle className="text-sm">Visited</CardTitle>
          </CardHeader>
          <CardContent className="p-3 pt-0">
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-blue-500" />
              <span className="text-2xl font-bold">{swipeStats.visited}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3">
        <Link href="/app?tab=settings">
          <Button variant="outline" className="w-full flex items-center gap-2">
            <Settings className="h-4 w-4" />
            Edit Preferences
          </Button>
        </Link>
        <Link href="/auth">
          <Button variant="secondary" className="w-full flex items-center gap-2">
            <User className="h-4 w-4" />
            Account Settings
          </Button>
        </Link>
      </div>

      {/* Badges Section */}
      <div className="space-y-3">
        <h3 className="font-medium">Your Badges</h3>
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
          <div className="flex-shrink-0 bg-background border rounded-lg p-3 w-24 text-center">
            <div className="text-2xl mb-1">🔥</div>
            <div className="font-medium text-xs">3-Day Streak</div>
          </div>
          <div className="flex-shrink-0 bg-background border rounded-lg p-3 w-24 text-center">
            <div className="text-2xl mb-1">🧭</div>
            <div className="font-medium text-xs">Explorer</div>
          </div>
          <div className="flex-shrink-0 bg-background border rounded-lg p-3 w-24 text-center">
            <div className="text-2xl mb-1">❤️</div>
            <div className="font-medium text-xs">Super Saver</div>
          </div>
          <div className="flex-shrink-0 bg-background border rounded-lg p-3 w-24 text-center opacity-40">
            <div className="text-2xl mb-1">🌟</div>
            <div className="font-medium text-xs">Locked</div>
          </div>
        </div>
      </div>
    </div>
  )
}

