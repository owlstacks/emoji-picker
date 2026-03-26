// ─── Skin Tones ───
export type SkinTone = "neutral" | "light" | "medium-light" | "medium" | "medium-dark" | "dark"

export const SKIN_TONE_MODIFIERS: Record<SkinTone, string> = {
  neutral: "",
  light: "\u{1F3FB}",
  "medium-light": "\u{1F3FC}",
  medium: "\u{1F3FD}",
  "medium-dark": "\u{1F3FE}",
  dark: "\u{1F3FF}",
}

// ─── Categories ───
export type CategoryId =
  | "recent"
  | "smileys"
  | "people"
  | "animals"
  | "food"
  | "travel"
  | "activities"
  | "objects"
  | "symbols"
  | "flags"

export interface Category {
  id: CategoryId
  label: string
  icon: string
}

// ─── Emoji ───
export interface EmojiEntry {
  /** The emoji character(s) */
  emoji: string
  /** Human-readable name */
  name: string
  /** Search keywords */
  keywords: string[]
  /** Whether this emoji supports skin tone modifiers */
  skinTone?: boolean
}

export interface EmojiData {
  /** The emoji character(s) — with skin tone applied if applicable */
  emoji: string
  /** Human-readable name */
  name: string
  /** The original emoji without skin tone */
  originalEmoji: string
  /** Which skin tone was applied */
  skinTone: SkinTone
}

// ─── Component Props ───
export type Theme = "light" | "dark" | "auto"

export interface PreviewConfig {
  /** Show emoji preview on hover */
  enabled?: boolean
  /** Show emoji name */
  showName?: boolean
}

export interface EmojiPickerProps {
  /** Called when an emoji is clicked */
  onEmojiClick: (emoji: EmojiData) => void
  /** Width in pixels */
  width?: number
  /** Height in pixels */
  height?: number
  /** Color theme */
  theme?: Theme
  /** Categories to display (defaults to all) */
  categories?: CategoryId[]
  /** Placeholder text for the search input */
  searchPlaceholder?: string
  /** Disable skin tone selector */
  skinTonesDisabled?: boolean
  /** Default skin tone */
  defaultSkinTone?: SkinTone
  /** Preview configuration */
  previewConfig?: PreviewConfig
  /** Disable the search bar */
  searchDisabled?: boolean
  /** Enable recent emojis category */
  recentEnabled?: boolean
  /** Max items in the recent list */
  maxRecent?: number
  /** Auto-focus the search input on open */
  autoFocusSearch?: boolean
  /** Extra CSS class on the root element */
  className?: string
  /** Inline styles on the root element */
  style?: React.CSSProperties
  /** Number of columns in the emoji grid */
  columns?: number
  /** Size of each emoji button in pixels */
  emojiSize?: number
}
