"use client"

import { Button } from "@/components/ui/button"

interface ThemeToggleProps {
  theme: "light" | "dark"
  onToggle: () => void
}

export function ThemeToggle({ theme, onToggle }: ThemeToggleProps) {
  return (
    <Button
      variant="outline"
      onClick={onToggle}
      className={`${
        theme === "dark"
          ? "bg-gray-800 text-white border-gray-600 hover:bg-gray-700"
          : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
      }`}
    >
      {theme === "dark" ? "☀️" : "🌙"}
    </Button>
  )
}
