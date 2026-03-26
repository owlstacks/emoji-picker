import type { Category, CategoryId } from "../types"

export const CATEGORIES: Category[] = [
  { id: "recent", label: "Recently Used", icon: "🕐" },
  { id: "smileys", label: "Smileys & Emotion", icon: "😀" },
  { id: "people", label: "People & Body", icon: "👋" },
  { id: "animals", label: "Animals & Nature", icon: "🐱" },
  { id: "food", label: "Food & Drink", icon: "🍔" },
  { id: "travel", label: "Travel & Places", icon: "✈️" },
  { id: "activities", label: "Activities", icon: "⚽" },
  { id: "objects", label: "Objects", icon: "💡" },
  { id: "symbols", label: "Symbols", icon: "❤️" },
  { id: "flags", label: "Flags", icon: "🏁" },
]

export const DEFAULT_CATEGORIES: CategoryId[] = [
  "smileys",
  "people",
  "animals",
  "food",
  "travel",
  "activities",
  "objects",
  "symbols",
  "flags",
]

export function getCategoryById(id: CategoryId): Category | undefined {
  return CATEGORIES.find((c) => c.id === id)
}
