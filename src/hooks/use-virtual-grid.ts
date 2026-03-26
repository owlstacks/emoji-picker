import { useMemo, useRef, useState, useCallback, useEffect } from "react"

interface UseVirtualGridOptions {
  /** Total number of items */
  totalItems: number
  /** Number of columns in the grid */
  columns: number
  /** Height of each row in pixels */
  rowHeight: number
  /** Height of the scrollable viewport in pixels */
  viewportHeight: number
  /** Extra rows to render above/below the visible area */
  overscan?: number
}

interface VirtualGridResult {
  /** Total height of the scrollable content */
  totalHeight: number
  /** The slice of row indices to render */
  visibleRows: { index: number; top: number }[]
  /** Ref to attach to the scrollable container */
  containerRef: React.RefObject<HTMLDivElement | null>
  /** Call this to programmatically scroll to a row */
  scrollToRow: (rowIndex: number) => void
}

/**
 * Lightweight virtual-scroll hook for a grid layout.
 * Only rows inside the viewport (+ overscan) are rendered.
 */
export function useVirtualGrid({
  totalItems,
  columns,
  rowHeight,
  viewportHeight,
  overscan = 3,
}: UseVirtualGridOptions): VirtualGridResult {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [scrollTop, setScrollTop] = useState(0)

  const totalRows = Math.ceil(totalItems / columns)
  const totalHeight = totalRows * rowHeight

  const visibleRows = useMemo(() => {
    const startRow = Math.max(0, Math.floor(scrollTop / rowHeight) - overscan)
    const visibleCount = Math.ceil(viewportHeight / rowHeight) + 2 * overscan
    const endRow = Math.min(totalRows - 1, startRow + visibleCount)

    const rows: { index: number; top: number }[] = []
    for (let i = startRow; i <= endRow; i++) {
      rows.push({ index: i, top: i * rowHeight })
    }
    return rows
  }, [scrollTop, rowHeight, viewportHeight, totalRows, overscan])

  const handleScroll = useCallback(() => {
    if (containerRef.current) {
      setScrollTop(containerRef.current.scrollTop)
    }
  }, [])

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    el.addEventListener("scroll", handleScroll, { passive: true })
    return () => el.removeEventListener("scroll", handleScroll)
  }, [handleScroll])

  const scrollToRow = useCallback(
    (rowIndex: number) => {
      if (containerRef.current) {
        containerRef.current.scrollTop = rowIndex * rowHeight
      }
    },
    [rowHeight]
  )

  return { totalHeight, visibleRows, containerRef, scrollToRow }
}
