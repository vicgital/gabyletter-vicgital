import { useEffect, useRef } from 'react'

interface Petal {
  x: number; y: number; vx: number; vy: number
  size: number; rotation: number; rotSpeed: number
  opacity: number; color: string
}

const COLORS = ['#8b2c4e', '#7a1a3e', '#a33a5e', '#6d2040', '#c45580']

function makePetal(w: number): Petal {
  return {
    x: Math.random() * w,
    y: -(Math.random() * 60 + 10),
    vx: (Math.random() - 0.5) * 1.2,
    vy: Math.random() * 1.2 + 0.6,
    size: Math.random() * 5 + 3,
    rotation: Math.random() * 360,
    rotSpeed: (Math.random() - 0.5) * 2.5,
    opacity: Math.random() * 0.45 + 0.2,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
  }
}

export function PetalEffect({ active }: { active: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const stateRef = useRef<{ petals: Petal[]; raf: number }>({ petals: [], raf: 0 })

  useEffect(() => {
    if (!active) return
    const canvas = canvasRef.current!
    const ctx = canvas.getContext('2d')!

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    stateRef.current.petals = Array.from({ length: 28 }, () => makePetal(canvas.width))

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      stateRef.current.petals.forEach((p, i) => {
        ctx.save()
        ctx.translate(p.x, p.y)
        ctx.rotate((p.rotation * Math.PI) / 180)
        ctx.globalAlpha = p.opacity
        ctx.fillStyle = p.color
        ctx.beginPath()
        ctx.ellipse(0, 0, p.size, p.size * 0.45, 0, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()

        p.x += p.vx + Math.sin(p.y * 0.02) * 0.3
        p.y += p.vy
        p.rotation += p.rotSpeed

        if (p.y > canvas.height + 20) {
          stateRef.current.petals[i] = makePetal(canvas.width)
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
