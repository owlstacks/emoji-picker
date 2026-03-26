import { useMemo } from "react"
import type { CategoryId, EmojiEntry } from "../types"
import { EMOJI_DATA } from "../data/emojis"

/**
 * Pre-builds a flat searchable list and filters it by query.
 * Matching runs against name + keywords — case-insensitive.
 */
export function useEmojiSearch(
  query: string,
  activeCategories: Exclude<CategoryId, "recent">[]
) {
  const flatList = useMemo(() => {
    const list: (EmojiEntry & { category: Exclude<CategoryId, "recent"> })[] = []
    for (const cat of activeCategories) {
      const entries = EMOJI_DATA[cat]
      if (entries) {
        for (const entry of entries) {
          list.push({ ...entry, category: cat })
        }
      }
    }
    return list
  }, [activeCategories])

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return null // null = not searching
    return flatList.filter(
      (e) =>
        e.name.toLowerCase().includes(q) ||
        e.keywords.some((k) => k.toLowerCase().includes(q))
    )
  }, [query, flatList])

  return results
}
