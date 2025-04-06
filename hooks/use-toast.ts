// Simplified toast hook for the demo
export function toast({ title, description }: { title: string; description?: string }) {
  console.log(`Toast: ${title}${description ? ` - ${description}` : ""}`)
  // In a real app, this would show a toast notification
  // For this demo, we'll just log to console
}

