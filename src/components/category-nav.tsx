import type { Category, CategoryId } from "../types"

interface CategoryNavProps {
  categories: Category[]
  activeCategory: CategoryId
  onSelect: (id: CategoryId) => void
}

export function CategoryNav({ categories, activeCategory, onSelect }: CategoryNavProps) {
  return (
    <nav className="ep-category-nav" role="tablist" aria-label="Emoji categories">
      {categories.map((cat) => (
        <button
          key={cat.id}
          type="button"
          role="tab"
          aria-selected={activeCategory === cat.id}
          aria-label={cat.label}
          title={cat.label}
          className={`ep-category-tab${activeCategory === cat.id ? " ep-category-tab--active" : ""}`}
          onClick={() => onSelect(cat.id)}
        >
          {cat.icon}
        </button>
      ))}
    </nav>
  )
}
