import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { finalQuestion, finalCue } from '../content'
import { haptic } from '../utils/haptic'

type Stage = 'button' | 'flipping' | 'typing' | 'cue'

export function FinalPage() {
  const [stage, setStage] = useState<Stage>('button')
  const [typed, setTyped] = useState('')
  const [showCursor, setShowCursor] = useState(true)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  // Cursor blink
  useEffect(() => {
    const t = setInterval(() => setShowCursor((v) => !v), 530)
    return () => clearInterval(t)
  }, [])

  // Typewriter
  useEffect(() => {
    if (stage !== 'typing') return
    let i = 0
    setTyped('')
    intervalRef.current = setInterval(() => {
      if (i < finalQuestion.length) {
        setTyped(finalQuestion.slice(0, i + 1))
        i++
      } else {
        if (intervalRef.current) clearInterval(intervalRef.current)
        setTimeout(() => setStage('cue'), 1100)
      }
    }, 68)
    return () => { if (intervalRef.current) clearInterval(intervalRef.current) }
  }, [stage])

  const handleFlip = () => {
    haptic([15, 40, 30, 40, 15])
    setStage('flipping')
    setTimeout(() => setStage('typing'), 900)
  }

  return (
    <motion.div
      className="fixed inset-0 flex flex-col items-center justify-center bg-ink"
      style={{ zIndex: 40 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Subtle radial warmth */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 70% 60% at 50% 55%, rgba(20,12,8,0.7) 0%, transparent 80%)',
        }}
      />

      {/* Decorative top line */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            'linear-gradient(to right, transparent, rgba(201,169,97,0.15), transparent)',
        }}
      />

      {/* ── BUTTON STAGE ── */}
      <AnimatePresence mode="wait">
        {(stage === 'button' || stage === 'flipping') && (
          <motion.div
            key="button-screen"
            className="flex flex-col items-center"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{
              x: '-100%',
              rotateY: -14,
              opacity: 0,
              scale: 0.93,
              transition: { duration: 0.75, ease: [0.4, 0, 0.15, 1] },
            }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            style={{ perspective: '900px' }}
          >
            {/* Chapter indicator */}
            <p className="font-sans text-[9px] tracking-[0.55em] text-gold/30 uppercase mb-10">
              última página
            </p>

            {/* Decorative envelope / paper icon */}
            <motion.div
              className="mb-12"
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            >
              <svg width="48" height="36" viewBox="0 0 48 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="1" y="8" width="46" height="27" rx="2" stroke="#c9a961" strokeWidth="0.8" strokeOpacity="0.3" />
                <path d="M1 10 L24 24 L47 10" stroke="#c9a961" strokeWidth="0.8" strokeOpacity="0.3" fill="none" />
                <path d="M1 35 L20 22M47 35 L28 22" stroke="#c9a961" strokeWidth="0.5" strokeOpacity="0.12" />
                <circle cx="24" cy="24" r="4.5" fill="#7a1f2b" fillOpacity="0.7" />
              </svg>
            </motion.div>

            {/* The button */}
            <motion.button
              className="breathe px-8 py-3.5 font-sans text-[11px] tracking-[0.28em] uppercase text-cream/88 rounded-full"
              style={{ background: '#8b2c4e' }}
              onClick={handleFlip}
              whileTap={{ scale: 0.93, transition: { duration: 0.08 } }}
              disabled={stage === 'flipping'}
            >
              Voltea la última página
            </motion.button>

            {/* Rose page-turn crease shadow — visible during flip */}
            <AnimatePresence>
              {stage === 'flipping' && (
                <motion.div
                  className="fixed inset-y-0 right-0"
                  style={{ width: 3 }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <div
                    className="h-full"
                    style={{
                      background:
                        'linear-gradient(to left, rgba(139,44,78,0.5), rgba(139,44,78,0.08), transparent)',
                      width: 24,
                      position: 'absolute',
                      right: 0,
                    }}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}

        {/* ── QUESTION / CUE STAGE ── */}
        {(stage === 'typing' || stage === 'cue') && (
          <motion.div
            key="question-screen"
            className="flex flex-col items-center px-10 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {/* The typed question */}
            <div className="font-serif font-light text-cream/90 leading-[1.55]"
              style={{ fontSize: 'clamp(1.6rem, 7vw, 2.1rem)' }}
            >
              {typed.split('\n').map((line, i) => (
                <div key={i}>{line || ' '}</div>
              ))}
              {/* Blinking cursor — only while typing */}
              {stage === 'typing' && (
                <span
                  className="inline-block align-middle ml-0.5"
                  style={{
                    width: 2,
                    height: '1em',
                    background: '#8b2c4e',
                    opacity: showCursor ? 1 : 0,
                    verticalAlign: 'middle',
                    borderRadius: 1,
                    transition: 'opacity 0.1s',
                  }}
                />
              )}
            </div>

            {/* Decorative hairline */}
            <motion.div
              className="mt-8 mb-8"
              style={{
                width: 40,
                height: 1,
                background: 'linear-gradient(to right, transparent, rgba(201,169,97,0.3), transparent)',
              }}
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            />

            {/* The cue */}
            <AnimatePresence>
              {stage === 'cue' && (
                <motion.p
                  className="font-sans uppercase tracking-[0.55em] text-gold/45"
                  style={{ fontSize: 11 }}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1.4, ease: 'easeOut' }}
                >
                  {finalCue}
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom decorative line */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{
          background:
            'linear-gradient(to right, transparent, rgba(201,169,97,0.1), transparent)',
        }}
      />
    </motion.div>
  )
}
