interface SearchBarProps {
  value: string
  onChange: (value: string) => void
  placeholder: string
  autoFocus: boolean
}

export function SearchBar({ value, onChange, placeholder, autoFocus }: SearchBarProps) {
  return (
    <div className="ep-search">
      <input
        type="text"
        className="ep-search-input"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        autoFocus={autoFocus}
        aria-label="Search emojis"
      />
      {value && (
        <button
          type="button"
          className="ep-search-clear"
          onClick={() => onChange("")}
          aria-label="Clear search"
        >
          ✕
        </button>
      )}
    </div>
  )
}
