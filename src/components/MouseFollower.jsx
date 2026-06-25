import { useEffect, useRef } from 'react'

export function MouseFollower() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const glowRef = useRef(null)

  useEffect(() => {
    const finePointer = window.matchMedia('(pointer: fine)')
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (!finePointer.matches) return undefined

    const dot = dotRef.current
    const ring = ringRef.current
    const glow = glowRef.current
    const target = { x: -120, y: -120 }
    const ringPosition = { x: -120, y: -120 }
    const glowPosition = { x: -120, y: -120 }
    let frameId

    document.documentElement.classList.add('has-custom-cursor')

    const render = () => {
      ringPosition.x += (target.x - ringPosition.x) * 0.18
      ringPosition.y += (target.y - ringPosition.y) * 0.18
      glowPosition.x += (target.x - glowPosition.x) * 0.075
      glowPosition.y += (target.y - glowPosition.y) * 0.075
      ring.style.transform = `translate3d(${ringPosition.x - 21}px, ${ringPosition.y - 21}px, 0) scale(var(--cursor-scale))`
      glow.style.transform = `translate3d(${glowPosition.x - 260}px, ${glowPosition.y - 260}px, 0)`
      frameId = requestAnimationFrame(render)
    }

    const handlePointerMove = (event) => {
      target.x = event.clientX
      target.y = event.clientY
      dot.style.transform = `translate3d(${event.clientX - 4}px, ${event.clientY - 4}px, 0)`
      if (reducedMotion.matches) {
        ring.style.transform = `translate3d(${event.clientX - 21}px, ${event.clientY - 21}px, 0) scale(var(--cursor-scale))`
      }
      const interactive = event.target instanceof Element ? event.target.closest('a, button, input, textarea') : null
      ring.style.setProperty('--cursor-scale', interactive ? '1.55' : '1')
      ring.classList.toggle('is-interactive', Boolean(interactive))
      dot.classList.toggle('is-interactive', Boolean(interactive))
      dot.classList.add('is-visible')
      ring.classList.add('is-visible')
      glow.classList.toggle('is-visible', !reducedMotion.matches)
    }

    const handlePointerLeave = () => {
      dot.classList.remove('is-visible')
      ring.classList.remove('is-visible')
      glow.classList.remove('is-visible')
    }

    window.addEventListener('pointermove', handlePointerMove, { passive: true })
    document.documentElement.addEventListener('mouseleave', handlePointerLeave)
    if (!reducedMotion.matches) frameId = requestAnimationFrame(render)

    return () => {
      if (frameId) cancelAnimationFrame(frameId)
      window.removeEventListener('pointermove', handlePointerMove)
      document.documentElement.removeEventListener('mouseleave', handlePointerLeave)
      document.documentElement.classList.remove('has-custom-cursor')
    }
  }, [])

  return (
    <div className="mouse-effects" aria-hidden="true">
      <span ref={glowRef} className="cursor-glow" />
      <span ref={ringRef} className="cursor-ring" />
      <span ref={dotRef} className="cursor-dot" />
    </div>
  )
}
