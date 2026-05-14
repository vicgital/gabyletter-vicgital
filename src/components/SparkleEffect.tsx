import { useEffect, useRef } from 'react'

interface Sparkle {
  x: number; y: number; size: number
  opacity: number; maxOpacity: number
  fadingIn: boolean; speed: number; color: string
}

const COLORS = ['#c9a961', '#c9a961', '#8b2c4e', '#e8c878', '#a37830']

function makeSparkle(w: number, h: number): Sparkle {
  return {
    x: Math.random() * w,
    y: Math.random() * h,
    size: Math.random() * 1.8 + 0.5,
    opacity: 0,
    maxOpacity: Math.random() * 0.38 + 0.08,
    fadingIn: true,
    speed: Math.random() * 0.006 + 0.002,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
  }
}

export function SparkleEffect({ active }: { active: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const stateRef = useRef<{ sparks: Sparkle[]; raf: number }>({ sparks: [], raf: 0 })

  useEffect(() => {
    if (!active) return
    const canvas = canvasRef.current!
    const ctx = canvas.getContext('2d')!

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    stateRef.current.sparks = Array.from({ length: 50 }, () =>
      makeSparkle(canvas.width, canvas.height),
    )

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      stateRef.current.sparks.forEach((s, i) => {
        // Draw a 4-point star
        ctx.save()
        ctx.globalAlpha = s.opacity
        ctx.fillStyle = s.color
        ctx.translate(s.x, s.y)
        ctx.beginPath()
        for (let j = 0; j < 4; j++) {
          ctx.rotate(Math.PI / 2)
          ctx.moveTo(0, 0)
          ctx.lineTo(s.size * 3, 0)
        }
        ctx.arc(0, 0, s.size, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()

        if (s.fadingIn) {
          s.opacity += s.speed
          if (s.opacity >= s.maxOpacity) s.fadingIn = false
        } else {
          s.opacity -= s.speed
          if (s.opacity <= 0) {
            stateRef.current.sparks[i] = makeSparkle(canvas.width, canvas.height)
          }
        }
      })
      stateRef.current.raf = requestAnimationFrame(draw)
    }
    draw()

    return () => cancelAnimationFrame(stateRef.current.raf)
  }, [active])

  if (!active) return null

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 20 }}
    />
  )
}
