'use client'

import { Loader2 } from "lucide-react"

export function Spinner({ size = "default", text = "Loading..." }: { size?: "small" | "default" | "large", text?: string }) {
  const sizeClasses = {
    small: "w-4 h-4",
    default: "w-6 h-6",
    large: "w-8 h-8"
  }

  return (
    <div className="flex items-center justify-center space-x-2">
      <Loader2 className={`animate-spin ${sizeClasses[size]}`} aria-hidden="true" />
      <span className="sr-only">{text}</span>
    </div>
  )
}