import { useCallback, useEffect, useState } from "react"
import type { EmojiData } from "../types"

const STORAGE_KEY = "emoji-picker-recent"

/**
 * Persists a list of recently-used emojis in localStorage.
 * Falls back gracefully when storage is unavailable (SSR, incognito, etc.).
 */
export function useRecentEmojis(maxItems: number) {
  const [recent, setRecent] = useState<EmojiData[]>([])

  // Hydrate from localStorage on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) {
        const parsed = JSON.parse(raw) as EmojiData[]
        if (Array.isArray(parsed)) {
          setRecent(parsed.slice(0, maxItems))
        }
      }
    } catch {
      // Storage unavailable
    }
  }, [maxItems])

  const addRecent = useCallback(
    (emoji: EmojiData) => {
      setRecent((prev) => {
        const filtered = prev.filter((e) => e.emoji !== emoji.emoji)
        const next = [emoji, ...filtered].slice(0, maxItems)
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
        } catch {
          // Storage full / unavailable
        }
        return next
      })
    },
    [maxItems]
  )

  return { recent, addRecent }
}
