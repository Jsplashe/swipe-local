export interface Experience {
  id: string
  name: string
  description: string
  category: string
  location: string
  imageUrl: string
}

export const experiences: Experience[] = [
  {
    id: "1",
    name: "Artisan Coffee Workshop",
    description: "Learn the art of coffee brewing from local experts in this hands-on workshop.",
    category: "food",
    location: "Downtown",
    imageUrl: "/placeholder.svg?height=400&width=600",
  },
  {
    id: "2",
    name: "Street Art Walking Tour",
    description: "Discover hidden murals and graffiti masterpieces with a local artist as your guide.",
    category: "art",
    location: "Arts District",
    imageUrl: "/placeholder.svg?height=400&width=600",
  },
  {
    id: "3",
    name: "Sunset Kayak Adventure",
    description: "Paddle through calm waters as the sun sets over the horizon. Perfect for beginners!",
    category: "outdoors",
    location: "Harbor Bay",
    imageUrl: "/placeholder.svg?height=400&width=600",
  },
  {
    id: "4",
    name: "Underground Jazz Club",
    description: "Experience the city's best-kept secret: a speakeasy jazz club with craft cocktails.",
    category: "nightlife",
    location: "Midtown",
    imageUrl: "/placeholder.svg?height=400&width=600",
  },
  {
    id: "5",
    name: "Farmers Market Food Tour",
    description: "Sample the freshest local produce and artisanal foods at our award-winning market.",
    category: "food",
    location: "Market Square",
    imageUrl: "/placeholder.svg?height=400&width=600",
  },
  {
    id: "6",
    name: "Vintage Boutique Crawl",
    description: "Explore curated vintage shops and find unique treasures with styling tips from experts.",
    category: "shopping",
    location: "Fashion District",
    imageUrl: "/placeholder.svg?height=400&width=600",
  },
  {
    id: "7",
    name: "Rooftop Yoga Session",
    description: "Find your zen with skyline views in this beginner-friendly outdoor yoga class.",
    category: "outdoors",
    location: "City Center",
    imageUrl: "/placeholder.svg?height=400&width=600",
  },
  {
    id: "8",
    name: "Local Brewery Tour",
    description: "Taste craft beers and learn about the brewing process from master brewers.",
    category: "nightlife",
    location: "Brewery District",
    imageUrl: "/placeholder.svg?height=400&width=600",
  },
  {
    id: "9",
    name: "Interactive Art Installation",
    description: "Immerse yourself in this limited-time digital art experience that responds to movement.",
    category: "art",
    location: "Modern Art Museum",
    imageUrl: "/placeholder.svg?height=400&width=600",
  },
  {
    id: "10",
    name: "Live Music at The Basement",
    description: "Catch emerging local bands in an intimate venue with great acoustics.",
    category: "music",
    location: "Underground",
    imageUrl: "/placeholder.svg?height=400&width=600",
  },
]

