import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { recipientName } from '../content'

interface Props {
  onStart: () => void
}

type State = 'sealed' | 'cracking' | 'open'

export function Cover({ onStart }: Props) {
  const [state, setState] = useState<State>('sealed')

  const handleTap = () => {
    if (state !== 'sealed') return
    setState('cracking')
    setTimeout(() => setState('open'), 900)
  }

  return (
    <motion.div
      className="fixed inset-0 flex flex-col items-center justify-center bg-ink z-30"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.7 }}
    >
      {/* Deep radial glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 70% 50% at 50% 60%, rgba(26,18,12,0.8) 0%, transparent 80%)',
        }}
      />

      <div className="relative z-10 flex flex-col items-center select-none">
        {/* Envelope */}
        <motion.div
          onClick={handleTap}
          initial={{ scale: 0.85, opacity: 0, y: 24 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.9, ease: [0.34, 1.4, 0.64, 1] }}
          className="relative cursor-pointer"
          style={{ width: 260, height: 186 }}
          whileTap={{ scale: 0.97 }}
        >
          <EnvelopeBody />
          <FlapWithSeal state={state} />
        </motion.div>

        {/* Tap hint */}
        <AnimatePresence>
          {state === 'sealed' && (
            <motion.p
              className="mt-7 font-sans text-[9px] tracking-[0.5em] text-gold/30 uppercase"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ delay: 1.2, duration: 0.9 }}
            >
              toca para abrir
            </motion.p>
          )}
        </AnimatePresence>

        {/* Content after opening */}
        <AnimatePresence>
          {state === 'open' && (
            <motion.div
              className="flex flex-col items-center mt-8"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.85, ease: 'easeOut' }}
            >
              <p
                className="font-sans text-[9px] uppercase tracking-[0.55em] text-gold/40 mb-3"
              >
                una carta para
              </p>
              <h1 className="font-display font-light text-[3.2rem] text-cream tracking-wide leading-none">
                {recipientName}
              </h1>
              <div
                className="mt-4 w-20 h-px"
                style={{
                  background:
                    'linear-gradient(to right, transparent, rgba(201,169,97,0.35), transparent)',
                }}
              />
              <motion.button
                className="breathe mt-9 px-7 py-3 font-sans text-[11px] tracking-[0.28em] uppercase text-cream/90 rounded-full"
                style={{ background: '#8b2c4e' }}
                onClick={onStart}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55, duration: 0.6 }}
                whileTap={{ scale: 0.95, transition: { duration: 0.1 } }}
              >
                Empezar a leer
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

function EnvelopeBody() {
  return (
    <svg
      className="absolute inset-0"
      width="260"
      height="186"
      viewBox="0 0 260 186"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="envBodyGrad" x1="130" y1="60" x2="130" y2="186" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#e8d9b8" />
          <stop offset="100%" stopColor="#d4c49a" />
        </linearGradient>
        <linearGradient id="shadowLeft" x1="0" y1="0" x2="130" y2="60" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#6b5230" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#6b5230" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="shadowRight" x1="260" y1="0" x2="130" y2="60" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#6b5230" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#6b5230" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Shadow beneath */}
      <ellipse cx="130" cy="183" rx="90" ry="8" fill="#000" fillOpacity="0.35" />

      {/* Body */}
      <rect x="1" y="60" width="258" height="124" rx="3" fill="url(#envBodyGrad)" />
      <rect x="1" y="60" width="258" height="124" rx="3" stroke="#c9a961" strokeWidth="0.8" strokeOpacity="0.55" />

      {/* Fold lines from bottom corners → center crease */}
      <line x1="1" y1="184" x2="130" y2="124" stroke="#c9a961" strokeWidth="0.6" strokeOpacity="0.35" />
      <line x1="259" y1="184" x2="130" y2="124" stroke="#c9a961" strokeWidth="0.6" strokeOpacity="0.35" />

      {/* Subtle inner vignette */}
      <rect x="1" y="60" width="130" height="124" fill="url(#shadowLeft)" />
      <rect x="130" y="60" width="129" height="124" fill="url(#shadowRight)" />
    </svg>
  )
}

function FlapWithSeal({ state }: { state: State }) {
  const isOpen = state === 'open' || state === 'cracking'
  const isCracking = state === 'cracking'

  return (
    <div
      className="absolute"
      style={{ top: 0, left: 0, right: 0, height: 128, perspective: '500px', WebkitPerspective: '500px' }}
    >
      {/* Flap — rotates around the top edge */}
      <motion.div
        className="absolute inset-0"
        style={{
          transformOrigin: '50% 0%',
          transformStyle: 'preserve-3d',
          WebkitTransformStyle: 'preserve-3d',
          backfaceVisibility: 'hidden',
          WebkitBackfaceVisibility: 'hidden',
        } as React.CSSProperties}
        animate={isOpen ? { rotateX: -178 } : { rotateX: 0 }}
        transition={{
          duration: isOpen ? 0.65 : 0,
          ease: [0.4, 0, 0.2, 1],
        }}
      >
        <svg
          width="260"
          height="128"
          viewBox="0 0 260 128"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="flapGrad" x1="130" y1="0" x2="130" y2="128" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#dfd0b0" />
              <stop offset="100%" stopColor="#c9b890" />
            </linearGradient>
          </defs>
          {/* Triangle pointing DOWN (sealed position) */}
          <path
            d="M0 2 L260 2 L130 112 Z"
            fill="url(#flapGrad)"
          />
          <path
            d="M0 2 L260 2 L130 112 Z"
            fill="none"
            stroke="#c9a961"
            strokeWidth="0.8"
            strokeOpacity="0.55"
          />
        </svg>

        {/* Wax seal — lives on flap, at its tip */}
        <div
          className="absolute"
          style={{ bottom: 14, left: '50%', transform: 'translateX(-50%)' }}
        >
          <WaxSeal cracking={isCracking} />
        </div>
      </motion.div>
    </div>
  )
}

function WaxSeal({ cracking }: { cracking: boolean }) {
  return (
    <motion.div
      animate={cracking ? { scale: [1, 1.18, 0.88, 1], rotate: [0, -3, 2, 0] } : {}}
      transition={{ duration: 0.45, ease: 'easeOut' }}
    >
      <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Outer glow */}
        <circle cx="22" cy="22" r="21" fill="#7a1f2b" fillOpacity="0.25" />
        {/* Main seal */}
        <circle cx="22" cy="22" r="18" fill="#7a1f2b" />
        {/* Highlight */}
        <ellipse cx="17" cy="16" rx="5" ry="3" fill="#fff" fillOpacity="0.07" transform="rotate(-25 17 16)" />
        {/* Inner decorative ring */}
        <circle cx="22" cy="22" r="13.5" fill="none" stroke="#c9a961" strokeWidth="0.7" strokeOpacity="0.5" />
        {/* Star / asterisk mark */}
        <g stroke="#c9a961" strokeWidth="1" strokeOpacity="0.65" strokeLinecap="round">
          <line x1="22" y1="15" x2="22" y2="29" />
          <line x1="15" y1="22" x2="29" y2="22" />
          <line x1="17.1" y1="17.1" x2="26.9" y2="26.9" />
          <line x1="26.9" y1="17.1" x2="17.1" y2="26.9" />
        </g>
        {/* Crack lines appear when cracking */}
        {cracking && (
          <>
            <motion.line
              x1="22" y1="4" x2="17" y2="18"
              stroke="#0a0a0a" strokeWidth="1.5" strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.25 }}
            />
            <motion.line
              x1="28" y1="7" x2="24" y2="19"
              stroke="#0a0a0a" strokeWidth="1" strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.2, delay: 0.06 }}
            />
          </>
        )}
      </svg>
    </motion.div>
  )
}
