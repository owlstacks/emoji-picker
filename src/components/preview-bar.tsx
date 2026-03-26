import type { EmojiData } from "../types"

interface PreviewBarProps {
  emoji: EmojiData | null
  showName: boolean
}

export function PreviewBar({ emoji, showName }: PreviewBarProps) {
  if (!emoji) {
    return (
      <div className="ep-preview ep-preview--empty">
        <span className="ep-preview-hint">Hover over an emoji to preview</span>
      </div>
    )
  }

  return (
    <div className="ep-preview">
      <span className="ep-preview-emoji">{emoji.emoji}</span>
      {showName && <span className="ep-preview-name">{emoji.name}</span>}
    </div>
  )
}
