import { useState, useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import { LoadingScreen } from './components/LoadingScreen'
import { Cover } from './components/Cover'
import { BookPage } from './components/BookPage'
import { FinalPage } from './components/FinalPage'
import { pages } from './content'
import { preloadAllMedia } from './utils/preload'
import { haptic } from './utils/haptic'

type Phase = 'loading' | 'cover' | 'book' | 'final'

export default function App() {
  const [phase, setPhase] = useState<Phase>('loading')
  const [currentPage, setCurrentPage] = useState(0)
  const [direction, setDirection] = useState(1)
  const [progress, setProgress] = useState(0)
  const [busy, setBusy] = useState(false)

  useEffect(() => {
    preloadAllMedia(pages, setProgress)
      .then(() => setTimeout(() => setPhase('cover'), 350))
      .catch(() => setTimeout(() => setPhase('cover'), 350))
  }, [])

  const navigate = (dir: 1 | -1) => {
    if (busy) return
    setBusy(true)
    setTimeout(() => setBusy(false), 520)

    if (dir === 1 && currentPage >= pages.length - 1) {
      haptic([20, 40, 20])
      setPhase('final')
      return
    }
    if (dir === -1 && currentPage <= 0) return

    haptic(dir === 1 ? 18 : 12)
    setDirection(dir)
    setCurrentPage((p) => p + dir)
  }

  const startReading = () => {
    haptic(30)
    setDirection(1)
    setCurrentPage(0)
    setPhase('book')
  }

  return (
    <div className="grain fixed inset-0 bg-ink overflow-hidden">
      {/* Persistent ambient glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 90% 55% at 50% 110%, rgba(139,44,78,0.07) 0%, transparent 65%)',
        }}
      />

      {/*
       * Two separate AnimatePresence instances:
       *   1. z-20 — non-book phases (loading, cover, final) with fade
       *   2. z-10 — book pages with page-turn (BookPage is direct motion child)
       * When transitioning book→final, FinalPage (z-20) fades over the exiting
       * BookPage (z-10), creating a clean phase transition.
       */}

      {/* Non-book phases */}
      <AnimatePresence mode="wait">
        {phase === 'loading' && (
          <LoadingScreen key="loading" progress={progress} />
        )}
        {phase === 'cover' && (
          <Cover key="cover" onStart={startReading} />
        )}
        {phase === 'final' && <FinalPage key="final" />}
      </AnimatePresence>

      {/* Book pages — sync so enter/exit overlap for page-turn feel */}
      <AnimatePresence mode="sync" custom={direction}>
        {phase === 'book' && (
          <BookPage
            key={`page-${currentPage}`}
            page={pages[currentPage]}
            direction={direction}
            pageIndex={currentPage}
            totalPages={pages.length}
            onNext={() => navigate(1)}
            onPrev={() => navigate(-1)}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
