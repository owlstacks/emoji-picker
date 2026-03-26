import type { SkinTone } from "../types"
import { SKIN_TONE_MODIFIERS } from "../types"

const SKIN_TONES: SkinTone[] = [
  "neutral",
  "light",
  "medium-light",
  "medium",
  "medium-dark",
  "dark",
]

const TONE_PREVIEW = "✋"

interface SkinToneSelectorProps {
  value: SkinTone
  onChange: (tone: SkinTone) => void
}

export function SkinToneSelector({ value, onChange }: SkinToneSelectorProps) {
  return (
    <div className="ep-skin-tones" role="radiogroup" aria-label="Skin tone">
      {SKIN_TONES.map((tone) => (
        <button
          key={tone}
          type="button"
          role="radio"
          aria-checked={value === tone}
          aria-label={`${tone} skin tone`}
          title={tone.charAt(0).toUpperCase() + tone.slice(1)}
          className={`ep-skin-tone-btn${value === tone ? " ep-skin-tone-btn--active" : ""}`}
          onClick={() => onChange(tone)}
        >
          {TONE_PREVIEW}{SKIN_TONE_MODIFIERS[tone]}
        </button>
      ))}
    </div>
  )
}
