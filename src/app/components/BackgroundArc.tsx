/**
 * Subtle background arc shape (abstraction of the Swarrow "C" mark)
 * Used as decorative background element in sections
 */

import svgPaths from '../../imports/svg-ajpuzfybt1'

interface BackgroundArcProps {
  color?: string
  opacity?: number
  className?: string
  flip?: boolean
}

export function BackgroundArc({
  color = 'var(--sc-navy)',
  opacity = 0.04,
  className = '',
  flip = false,
}: BackgroundArcProps) {
  return (
    <div
      className={`absolute pointer-events-none overflow-hidden ${className}`}
      style={{ transform: flip ? 'scaleX(-1)' : undefined }}
    >
      <svg viewBox="0 0 1487.86 1592" fill="none" className="w-full h-full" aria-hidden="true">
        <path d={svgPaths.p4210700} fill={color} fillOpacity={opacity} />
        <path d={svgPaths.p1edcb380} fill={color} fillOpacity={opacity} />
      </svg>
    </div>
  )
}
