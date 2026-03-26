import { memo } from "react"
import type { EmojiData, EmojiEntry, SkinTone } from "../types"
import { SKIN_TONE_MODIFIERS } from "../types"

interface EmojiButtonProps {
  entry: EmojiEntry
  skinTone: SkinTone
  emojiSize: number
  onClick: (data: EmojiData) => void
  onHover: (data: EmojiData | null) => void
}

function applySkintone(emoji: string, skinTone: SkinTone): string {
  if (skinTone === "neutral") return emoji
  const modifier = SKIN_TONE_MODIFIERS[skinTone]
  // Insert the modifier after the first code point
  const codePoints = [...emoji]
  if (codePoints.length === 0) return emoji
  return codePoints[0] + modifier + codePoints.slice(1).join("")
}

export const EmojiButton = memo(function EmojiButton({
  entry,
  skinTone,
  emojiSize,
  onClick,
  onHover,
}: EmojiButtonProps) {
  const renderedEmoji = entry.skinTone
    ? applySkintone(entry.emoji, skinTone)
    : entry.emoji

  const data: EmojiData = {
    emoji: renderedEmoji,
    name: entry.name,
    originalEmoji: entry.emoji,
    skinTone,
  }

  return (
    <button
      type="button"
      className="ep-emoji-btn"
      style={{ width: emojiSize, height: emojiSize, fontSize: emojiSize * 0.65 }}
      title={entry.name}
      aria-label={entry.name}
      onClick={() => onClick(data)}
      onMouseEnter={() => onHover(data)}
      onMouseLeave={() => onHover(null)}
    >
      {renderedEmoji}
    </button>
  )
})
