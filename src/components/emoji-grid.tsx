import type { EmojiData, EmojiEntry, SkinTone, CategoryId } from "../types"
import { useVirtualGrid } from "../hooks/use-virtual-grid"
import { EmojiButton } from "./emoji-button"
import { EMOJI_DATA } from "../data/emojis"

interface EmojiGridProps {
  /** Emojis to render — when null, renders by activeCategory */
  searchResults: (EmojiEntry & { category: CategoryId })[] | null
  activeCategory: Exclude<CategoryId, "recent">
  recentEmojis: EmojiData[]
  showRecent: boolean
  skinTone: SkinTone
  columns: number
  emojiSize: number
  viewportHeight: number
  onEmojiClick: (data: EmojiData) => void
  onEmojiHover: (data: EmojiData | null) => void
  /** Ref callback so parent can trigger scrollToRow */
  onVirtualRef?: (api: { scrollToRow: (row: number) => void }) => void
}

export function EmojiGrid({
  searchResults,
  activeCategory,
  recentEmojis,
  showRecent,
  skinTone,
  columns,
  emojiSize,
  viewportHeight,
  onEmojiClick,
  onEmojiHover,
  onVirtualRef,
}: EmojiGridProps) {
  // Build the flat list of emojis to display
  let emojis: EmojiEntry[]

  if (searchResults !== null) {
    emojis = searchResults
  } else if (activeCategory === "recent" as string) {
    // Map EmojiData to EmojiEntry for the recent list
    emojis = recentEmojis.map((e) => ({
      emoji: e.originalEmoji,
      name: e.name,
      keywords: [],
      skinTone: false,
    }))
  } else {
    emojis = EMOJI_DATA[activeCategory] ?? []
  }

  const { totalHeight, visibleRows, containerRef, scrollToRow } = useVirtualGrid({
    totalItems: emojis.length,
    columns,
    rowHeight: emojiSize,
    viewportHeight,
    overscan: 3,
  })

  // Expose scrollToRow to parent
  if (onVirtualRef) {
    onVirtualRef({ scrollToRow })
  }

  if (emojis.length === 0) {
    return (
      <div className="ep-grid-empty" style={{ height: viewportHeight }}>
        <span className="ep-grid-empty-text">
          {searchResults !== null ? "No emojis found" : "No recent emojis"}
        </span>
      </div>
    )
  }

  return (
    <div
      ref={containerRef}
      className="ep-grid-scroll"
      style={{ height: viewportHeight }}
      role="grid"
      aria-label="Emoji grid"
    >
      <div style={{ height: totalHeight, position: "relative" }}>
        {visibleRows.map((row) => {
          const startIdx = row.index * columns
          const rowEmojis = emojis.slice(startIdx, startIdx + columns)

          return (
            <div
              key={row.index}
              className="ep-grid-row"
              role="row"
              style={{
                position: "absolute",
                top: row.top,
                height: emojiSize,
                display: "flex",
              }}
            >
              {rowEmojis.map((entry, colIdx) => (
                <EmojiButton
                  key={`${row.index}-${colIdx}`}
                  entry={entry}
                  skinTone={skinTone}
                  emojiSize={emojiSize}
                  onClick={onEmojiClick}
                  onHover={onEmojiHover}
                />
              ))}
            </div>
          )
        })}
      </div>
    </div>
  )
}
