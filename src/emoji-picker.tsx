import { useState, useCallback, useRef, useMemo, useEffect } from "react"
import type { CategoryId, EmojiData, EmojiPickerProps, SkinTone, Category } from "./types"
import { DEFAULT_CATEGORIES, getCategoryById } from "./data/categories"
import { useEmojiSearch } from "./hooks/use-emoji-search"
import { useRecentEmojis } from "./hooks/use-recent-emojis"
import { CategoryNav } from "./components/category-nav"
import { SearchBar } from "./components/search-bar"
import { SkinToneSelector } from "./components/skin-tone-selector"
import { PreviewBar } from "./components/preview-bar"
import { EmojiGrid } from "./components/emoji-grid"

const DEFAULT_WIDTH = 350
const DEFAULT_HEIGHT = 450
const DEFAULT_COLUMNS = 8
const DEFAULT_EMOJI_SIZE = 40

// Heights for internal layout calculation
const SEARCH_HEIGHT = 44
const CATEGORY_NAV_HEIGHT = 40
const PREVIEW_HEIGHT = 44
const SKIN_TONE_HEIGHT = 36

export function EmojiPicker({
  onEmojiClick,
  width = DEFAULT_WIDTH,
  height = DEFAULT_HEIGHT,
  theme = "auto",
  categories: enabledCategories,
  searchPlaceholder = "Search emojis…",
  skinTonesDisabled = false,
  defaultSkinTone = "neutral",
  previewConfig = { enabled: true, showName: true },
  searchDisabled = false,
  recentEnabled = true,
  maxRecent = 30,
  autoFocusSearch = false,
  className,
  style,
  columns = DEFAULT_COLUMNS,
  emojiSize = DEFAULT_EMOJI_SIZE,
}: EmojiPickerProps) {
  // ── State ──
  const [searchQuery, setSearchQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState<CategoryId>(
    recentEnabled ? "recent" : (enabledCategories?.[0] ?? DEFAULT_CATEGORIES[0])
  )
  const [skinTone, setSkinTone] = useState<SkinTone>(defaultSkinTone)
  const [hoveredEmoji, setHoveredEmoji] = useState<EmojiData | null>(null)

  const virtualRef = useRef<{ scrollToRow: (row: number) => void } | null>(null)

  // ── Categories ──
  const categoryIds: CategoryId[] = useMemo(() => {
    const base = enabledCategories ?? DEFAULT_CATEGORIES
    return recentEnabled ? ["recent", ...base] : base
  }, [enabledCategories, recentEnabled])

  const categoryObjects: Category[] = useMemo(
    () => categoryIds.map((id) => getCategoryById(id)).filter(Boolean) as Category[],
    [categoryIds]
  )

  // Active categories excluding "recent" (for search)
  const searchableCategories = useMemo(
    () => categoryIds.filter((id): id is Exclude<CategoryId, "recent"> => id !== "recent"),
    [categoryIds]
  )

  // ── Hooks ──
  const searchResults = useEmojiSearch(searchQuery, searchableCategories)
  const { recent, addRecent } = useRecentEmojis(maxRecent)

  // ── Handlers ──
  const handleEmojiClick = useCallback(
    (data: EmojiData) => {
      if (recentEnabled) addRecent(data)
      onEmojiClick(data)
    },
    [onEmojiClick, addRecent, recentEnabled]
  )

  const handleCategorySelect = useCallback(
    (id: CategoryId) => {
      setActiveCategory(id)
      setSearchQuery("")
      // Scroll grid to top when switching categories
      virtualRef.current?.scrollToRow(0)
    },
    []
  )

  const handleSearchChange = useCallback((value: string) => {
    setSearchQuery(value)
  }, [])

  const handleVirtualRef = useCallback(
    (api: { scrollToRow: (row: number) => void }) => {
      virtualRef.current = api
    },
    []
  )

  // ── Layout calculation ──
  const showPreview = previewConfig?.enabled ?? true
  const showSearch = !searchDisabled
  const showSkinTones = !skinTonesDisabled

  let gridHeight = height
  if (showSearch) gridHeight -= SEARCH_HEIGHT
  gridHeight -= CATEGORY_NAV_HEIGHT
  if (showPreview) gridHeight -= PREVIEW_HEIGHT
  if (showSkinTones) gridHeight -= SKIN_TONE_HEIGHT
  gridHeight = Math.max(gridHeight, 100)

  // ── Theme attribute ──
  const themeAttr = theme === "auto" ? undefined : theme

  // Keyboard navigation for the root container
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = rootRef.current
    if (!el) return

    const handleKeyDown = (e: KeyboardEvent) => {
      // Escape clears search
      if (e.key === "Escape" && searchQuery) {
        e.preventDefault()
        setSearchQuery("")
      }
    }

    el.addEventListener("keydown", handleKeyDown)
    return () => el.removeEventListener("keydown", handleKeyDown)
  }, [searchQuery])

  return (
    <div
      ref={rootRef}
      className={`ep-root${className ? ` ${className}` : ""}`}
      data-theme={themeAttr}
      style={{ width, height, ...style }}
      role="dialog"
      aria-label="Emoji picker"
    >
      {showSearch && (
        <SearchBar
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder={searchPlaceholder}
          autoFocus={autoFocusSearch}
        />
      )}

      <CategoryNav
        categories={categoryObjects}
        activeCategory={activeCategory}
        onSelect={handleCategorySelect}
      />

      <EmojiGrid
        searchResults={searchResults}
        activeCategory={activeCategory === "recent" ? searchableCategories[0] : activeCategory}
        recentEmojis={recent}
        showRecent={recentEnabled && activeCategory === "recent"}
        skinTone={skinTone}
        columns={columns}
        emojiSize={emojiSize}
        viewportHeight={gridHeight}
        onEmojiClick={handleEmojiClick}
        onEmojiHover={setHoveredEmoji}
        onVirtualRef={handleVirtualRef}
      />

      {showSkinTones && (
        <SkinToneSelector value={skinTone} onChange={setSkinTone} />
      )}

      {showPreview && (
        <PreviewBar
          emoji={hoveredEmoji}
          showName={previewConfig?.showName ?? true}
        />
      )}
    </div>
  )
}
