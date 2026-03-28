# @alihesari/emoji-picker

A fast, lightweight, zero-dependency emoji picker for React.

<p align="center">
  <img src="https://raw.githubusercontent.com/alihesari/emoji-picker/main/media/screenshot-light.png" alt="Emoji Picker Light Theme" width="350" height="349" />
  <img src="https://raw.githubusercontent.com/alihesari/emoji-picker/main/media/screenshot-dark.png" alt="Emoji Picker Dark Theme" width="350" />
</p>

<p align="center">
  <img src="https://raw.githubusercontent.com/alihesari/emoji-picker/main/media/demo.gif" alt="Emoji Picker Demo" width="600" />
</p>

- **Virtual scrolling** — renders only visible rows for buttery-smooth performance
- **Skin tone support** — per-emoji skin tone modifiers
- **Search** — instant filtering across names and keywords
- **Recent emojis** — localStorage-backed recently-used list
- **Full accessibility** — ARIA roles, keyboard navigation, focus management
- **Themeable** — light / dark / auto via CSS custom properties
- **Tiny** — zero runtime dependencies, tree-shakeable ESM + CJS
- **TypeScript** — complete type definitions included

## Installation

```bash
# npm
npm install @alihesari/emoji-picker

# pnpm
pnpm add @alihesari/emoji-picker

# yarn
yarn add @alihesari/emoji-picker
```

> Peer dependencies: `react >=18` and `react-dom >=18`.

## Quick Start

```tsx
import { EmojiPicker } from "@alihesari/emoji-picker";
import "@alihesari/emoji-picker/styles.css";

function App() {
  return (
    <EmojiPicker
      onEmojiClick={(emoji) => {
        console.log(emoji.emoji); // 😎
        console.log(emoji.name);  // "smiling face with sunglasses"
      }}
    />
  );
}
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `onEmojiClick` | `(emoji: EmojiData) => void` | **required** | Called when an emoji is clicked |
| `width` | `number` | `350` | Width in pixels |
| `height` | `number` | `450` | Height in pixels |
| `theme` | `"light" \| "dark" \| "auto"` | `"auto"` | Color theme (`auto` follows system) |
| `categories` | `CategoryId[]` | all categories | Which categories to display |
| `searchPlaceholder` | `string` | `"Search emojis…"` | Placeholder for the search input |
| `searchDisabled` | `boolean` | `false` | Hide the search bar |
| `skinTonesDisabled` | `boolean` | `false` | Hide the skin tone selector |
| `defaultSkinTone` | `SkinTone` | `"neutral"` | Default skin tone |
| `recentEnabled` | `boolean` | `true` | Enable the Recent category |
| `maxRecent` | `number` | `30` | Max number of recent emojis to store |
| `autoFocusSearch` | `boolean` | `false` | Auto-focus search on mount |
| `previewConfig` | `PreviewConfig` | `{ enabled: true, showName: true }` | Configure the preview bar |
| `columns` | `number` | `8` | Number of columns in the grid |
| `emojiSize` | `number` | `40` | Size of each emoji button (px) |
| `className` | `string` | — | Extra CSS class on root |
| `style` | `CSSProperties` | — | Inline styles on root |

## Types

```ts
interface EmojiData {
  emoji: string;        // The rendered emoji (with skin tone applied)
  name: string;         // Human-readable name
  originalEmoji: string; // Emoji without skin tone
  skinTone: SkinTone;   // Which skin tone was applied
}

type SkinTone = "neutral" | "light" | "medium-light" | "medium" | "medium-dark" | "dark";

type CategoryId =
  | "recent" | "smileys" | "people" | "animals" | "food"
  | "travel" | "activities" | "objects" | "symbols" | "flags";
```

## Theming

All colours use CSS custom properties. Override them on `.ep-root` or a parent:

```css
.my-picker {
  --ep-bg: #1a1a2e;
  --ep-border: #16213e;
  --ep-text: #eaeaea;
  --ep-text-secondary: #888;
  --ep-hover-bg: #16213e;
  --ep-active-bg: #0f3460;
  --ep-input-bg: #0a0a1a;
  --ep-input-border: #16213e;
  --ep-radius: 12px;
}
```

```tsx
<EmojiPicker className="my-picker" onEmojiClick={handleClick} />
```

### Available custom properties

| Property | Description |
| --- | --- |
| `--ep-bg` | Background colour |
| `--ep-border` | Border & divider colour |
| `--ep-text` | Primary text colour |
| `--ep-text-secondary` | Secondary/muted text |
| `--ep-hover-bg` | Hover background |
| `--ep-active-bg` | Active/selected background |
| `--ep-input-bg` | Search input background |
| `--ep-input-border` | Search input border |
| `--ep-radius` | Root border radius |
| `--ep-font-family` | Font family |

## Keyboard Navigation

- **Escape** — clears the search query
- **Tab** — navigates between search, categories, and the grid
- Standard focus management with `:focus-visible` outlines

## Comparison with emoji-picker-react

| Feature | @alihesari/emoji-picker | emoji-picker-react |
| --- | --- | --- |
| Runtime dependencies | **0** | 5+ |
| Virtual scrolling | **Built-in** | No |
| Bundle size (gzipped) | **~25KB** | ~90KB |
| CSS-in-JS | **No** (CSS custom props) | Yes |
| SSR safe | **Yes** | Partial |
| TypeScript | **Full** | Full |
| Tree-shakeable | **Yes** | Partial |

## Development

```bash
# Install dependencies
pnpm install

# Build
pnpm build

# Dev (watch mode)
pnpm dev

# Type check
pnpm typecheck
```

## License

MIT © [Ali Hesari](https://github.com/alihesari)
