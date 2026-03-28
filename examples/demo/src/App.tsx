import { useState } from "react"
import { EmojiPicker } from "@alihesari/emoji-picker"
import "@alihesari/emoji-picker/styles.css"
import type { EmojiData, Theme } from "@alihesari/emoji-picker"
import "./styles.css"

export function App() {
  const [theme, setTheme] = useState<Theme>("auto")
  const [selected, setSelected] = useState<EmojiData | null>(null)
  const [log, setLog] = useState<EmojiData[]>([])
  const [width, setWidth] = useState(350)
  const [height, setHeight] = useState(450)
  const [columns, setColumns] = useState(8)
  const [emojiSize, setEmojiSize] = useState(40)
  const [searchDisabled, setSearchDisabled] = useState(false)
  const [skinTonesDisabled, setSkinTonesDisabled] = useState(false)

  const handleEmojiClick = (emoji: EmojiData) => {
    setSelected(emoji)
    setLog((prev) => [emoji, ...prev].slice(0, 20))
  }

  return (
    <div className={`demo ${theme === "dark" ? "demo--dark" : ""}`}>
      <header className="demo-header">
        <h1>
          <span className="demo-logo">😊</span> @alihesari/emoji-picker
        </h1>
        <p className="demo-subtitle">
          A fast, lightweight, zero-dependency emoji picker for React
        </p>
        <div className="demo-badges">
          <a href="https://www.npmjs.com/package/@alihesari/emoji-picker">
            <img
              alt="npm version"
              src="https://img.shields.io/npm/v/@alihesari/emoji-picker?style=flat-square"
            />
          </a>
          <a href="https://github.com/alihesari/emoji-picker">
            <img
              alt="GitHub"
              src="https://img.shields.io/github/stars/alihesari/emoji-picker?style=flat-square"
            />
          </a>
        </div>
      </header>

      <main className="demo-main">
        <div className="demo-picker-section">
          <EmojiPicker
            onEmojiClick={handleEmojiClick}
            theme={theme}
            width={width}
            height={height}
            columns={columns}
            emojiSize={emojiSize}
            searchDisabled={searchDisabled}
            skinTonesDisabled={skinTonesDisabled}
            autoFocusSearch
          />
        </div>

        <aside className="demo-controls">
          <h2>Controls</h2>

          <div className="control-group">
            <label>Theme</label>
            <div className="control-buttons">
              {(["auto", "light", "dark"] as Theme[]).map((t) => (
                <button
                  key={t}
                  className={theme === t ? "active" : ""}
                  onClick={() => setTheme(t)}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div className="control-group">
            <label>Width: {width}px</label>
            <input
              type="range"
              min={280}
              max={500}
              value={width}
              onChange={(e) => setWidth(Number(e.target.value))}
            />
          </div>

          <div className="control-group">
            <label>Height: {height}px</label>
            <input
              type="range"
              min={300}
              max={600}
              value={height}
              onChange={(e) => setHeight(Number(e.target.value))}
            />
          </div>

          <div className="control-group">
            <label>Columns: {columns}</label>
            <input
              type="range"
              min={4}
              max={12}
              value={columns}
              onChange={(e) => setColumns(Number(e.target.value))}
            />
          </div>

          <div className="control-group">
            <label>Emoji Size: {emojiSize}px</label>
            <input
              type="range"
              min={24}
              max={56}
              value={emojiSize}
              onChange={(e) => setEmojiSize(Number(e.target.value))}
            />
          </div>

          <div className="control-group">
            <label>
              <input
                type="checkbox"
                checked={searchDisabled}
                onChange={(e) => setSearchDisabled(e.target.checked)}
              />
              Hide Search
            </label>
          </div>

          <div className="control-group">
            <label>
              <input
                type="checkbox"
                checked={skinTonesDisabled}
                onChange={(e) => setSkinTonesDisabled(e.target.checked)}
              />
              Hide Skin Tones
            </label>
          </div>

          <h2>Output</h2>
          {selected ? (
            <div className="demo-output">
              <span className="demo-output-emoji">{selected.emoji}</span>
              <div className="demo-output-details">
                <strong>{selected.name}</strong>
                <code>skinTone: {selected.skinTone}</code>
              </div>
            </div>
          ) : (
            <p className="demo-hint">Click an emoji to see output</p>
          )}

          <h2>Event Log</h2>
          <div className="demo-log">
            {log.length === 0 ? (
              <p className="demo-hint">Emojis you click will appear here</p>
            ) : (
              log.map((e, i) => (
                <span key={i} className="demo-log-item" title={e.name}>
                  {e.emoji}
                </span>
              ))
            )}
          </div>
        </aside>
      </main>

      <footer className="demo-footer">
        <a href="https://github.com/alihesari/emoji-picker">GitHub</a>
        <span>·</span>
        <a href="https://www.npmjs.com/package/@alihesari/emoji-picker">npm</a>
        <span>·</span>
        <span>MIT © Ali Hesari</span>
      </footer>
    </div>
  )
}
