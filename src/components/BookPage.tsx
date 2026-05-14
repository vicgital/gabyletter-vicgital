import { motion } from 'framer-motion'
import { PageContent } from '../content'
import { MediaDisplay } from './MediaDisplay'
import { WordReveal } from './WordReveal'
import { ProgressDots } from './ProgressDots'
import { PetalEffect } from './PetalEffect'
import { SparkleEffect } from './SparkleEffect'

interface Props {
  page: PageContent
  pageIndex: number
  totalPages: number
  direction: number
  onNext: () => void
  onPrev: () => void
}

const variants = {
  initial: (dir: number) => ({
    x: dir > 0 ? '100%' : '-80%',
    rotateY: dir > 0 ? 9 : -9,
    opacity: dir > 0 ? 0.6 : 0.4,
    scale: 0.96,
  }),
  animate: {
    x: 0,
    rotateY: 0,
    opacity: 1,
    scale: 1,
  },
  exit: (dir: number) => ({
    x: dir > 0 ? '-28%' : '100%',
    rotateY: dir > 0 ? -9 : 9,
    opacity: 0,
    scale: 0.92,
  }),
}

export function BookPage({ page, pageIndex, totalPages, direction, onNext, onPrev }: Props) {
  const isLast = pageIndex === totalPages - 1

  return (
    <motion.div
      className="fixed inset-0 flex flex-col bg-ink-soft"
      style={{ perspective: '1200px', touchAction: 'none', zIndex: 10 }}
      custom={direction}
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.48, ease: [0.4, 0, 0.15, 1] }}
      onPanEnd={(_, info) => {
        if (Math.abs(info.offset.x) < 50 && Math.abs(info.velocity.x) < 250) return
        if (info.offset.x < -50 || info.velocity.x < -250) onNext()
        else if (info.offset.x > 50 || info.velocity.x > 250) onPrev()
      }}
    >
      {/* Page-crease shadow on left edge (simulates paper fold) */}
      <div
        className="pointer-events-none absolute top-0 left-0 bottom-0 z-30"
        style={{
          width: 18,
          background:
            'linear-gradient(to right, rgba(139,44,78,0.06), transparent)',
        }}
      />

      {/* Particle effects */}
      {page.effect === 'petals' && <PetalEffect active />}
      {page.effect === 'sparkles' && <SparkleEffect active />}

      {/* Back button */}
      {pageIndex > 0 && (
        <motion.button
          className="absolute z-40 flex items-center justify-center pt-safe pl-safe"
          style={{ top: 0, left: 0, padding: 'max(0.75rem, env(safe-area-inset-top)) 0 0 max(1rem, env(safe-area-inset-left))', width: 56, height: 72 }}
          onClick={onPrev}
          whileTap={{ scale: 0.85 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M12 4L6 10L12 16" stroke="#f5f1e8" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.35" />
          </svg>
        </motion.button>
      )}

      {/* Media — constrained so text + nav always fit on small phones */}
      <div className="flex-none pt-safe" style={{ paddingTop: 'env(safe-area-inset-top, 0px)', height: '44dvh' }}>
        <div className="h-full px-5 pt-3">
          <MediaDisplay
            type={page.media.type}
            src={page.media.src}
            alt={page.media.alt}
            isActive
          />
        </div>
      </div>

      {/* Text — flex-1, vertically centered */}
      <div className="flex-1 flex flex-col justify-center px-8 py-2">
        {/* Page numbering */}
        <motion.p
          className="font-sans text-[9px] tracking-[0.5em] text-gold/35 uppercase mb-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {String(pageIndex + 1).padStart(2, '0')} / {String(totalPages).padStart(2, '0')}
        </motion.p>

        <WordReveal
          text={page.text}
          isActive
          className="font-serif text-[1.17rem] leading-[1.75] text-cream/88 italic"
        />
      </div>

      {/* Bottom nav bar */}
      <div
        className="flex-none flex items-center justify-between px-6 pb-safe"
        style={{ paddingBottom: 'max(1.25rem, env(safe-area-inset-bottom))', paddingTop: '0.75rem' }}
      >
        <ProgressDots current={pageIndex} total={totalPages} />

        <motion.button
          className="breathe flex items-center gap-2 px-5 py-2.5 font-sans text-[10px] tracking-[0.22em] uppercase text-cream/90 rounded-full"
          style={{ background: '#8b2c4e', flexShrink: 0 }}
          onClick={onNext}
          whileTap={{ scale: 0.94, transition: { duration: 0.08 } }}
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.25 }}
        >
          {isLast ? 'Última página' : 'Siguiente'}
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M2 6h8M7 3l3 3-3 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.75" />
          </svg>
        </motion.button>
      </div>
    </motion.div>
  )
}
