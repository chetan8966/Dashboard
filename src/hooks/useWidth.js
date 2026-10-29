import { useEffect, useRef, useState } from 'react'

// Tracks an element's rendered width so the SVG charts can scale horizontally
// while keeping fixed vertical metrics and crisp text.
export default function useWidth(initial) {
  const ref = useRef(null)
  const [width, setWidth] = useState(initial)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const ro = new ResizeObserver(([entry]) => setWidth(entry.contentRect.width))
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  return [ref, width]
}
