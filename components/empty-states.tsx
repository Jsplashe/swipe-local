import { Compass, BookmarkCheck, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface EmptyStateProps {
  type: "no-swipes" | "no-saved"
}

export default function EmptyState({ type }: EmptyStateProps) {
  if (type === "no-swipes") {
    return (
      <div className="flex flex-col items-center justify-center text-center p-8 h-[60vh]">
        <div className="bg-muted/50 p-6 rounded-full mb-4">
          <Calendar className="h-12 w-12 text-muted-foreground" />
        </div>
        <h3 className="text-xl font-semibold mb-2">No More Swipes Today</h3>
        <p className="text-muted-foreground mb-6 max-w-xs">
          You've reached your daily swipe limit. Come back tomorrow for new experiences!
        </p>
        <div className="flex gap-4">
          <Link href="/app?tab=saved">
            <Button variant="outline">
              <BookmarkCheck className="mr-2 h-4 w-4" />
              View Saved
            </Button>
          </Link>
          <Link href="/app?tab=settings">
            <Button variant="outline">Adjust Limit</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center justify-center text-center p-8 h-[60vh]">
      <div className="bg-muted/50 p-6 rounded-full mb-4">
        <BookmarkCheck className="h-12 w-12 text-muted-foreground" />
      </div>
      <h3 className="text-xl font-semibold mb-2">No Saved Experiences Yet</h3>
      <p className="text-muted-foreground mb-6 max-w-xs">
        Swipe right on experiences you like to save them here for later!
      </p>
      <Link href="/app?tab=discover">
        <Button>
          <Compass className="mr-2 h-4 w-4" />
          Start Discovering
        </Button>
      </Link>
    </div>
  )
}

