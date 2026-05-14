import { motion } from 'framer-motion'

interface Props {
  progress: number
}

export function LoadingScreen({ progress }: Props) {
  return (
    <motion.div
      className="fixed inset-0 flex flex-col items-center justify-center bg-ink z-50"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.9, ease: 'easeInOut' }}
    >
      {/* Animated SVG envelope */}
      <motion.svg
        width="72"
        height="56"
        viewBox="0 0 72 56"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Body */}
        <rect x="1.5" y="16" width="69" height="38" rx="2.5" stroke="#c9a961" strokeWidth="1" strokeOpacity="0.5" />
        {/* Animated flap */}
        <motion.path
          fill="none"
          stroke="#c9a961"
          strokeWidth="1"
          strokeOpacity="0.5"
          animate={{
            d: [
              'M1.5 18 L36 40 L70.5 18',
              'M1.5 18 L36 18 L70.5 18',
              'M1.5 18 L36 40 L70.5 18',
            ],
          }}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
        />
        {/* Side fold lines */}
        <path d="M1.5 54 L34 38" stroke="#c9a961" strokeWidth="0.5" strokeOpacity="0.2" />
        <path d="M70.5 54 L38 38" stroke="#c9a961" strokeWidth="0.5" strokeOpacity="0.2" />
        {/* Wax dot */}
        <motion.circle
          cx="36"
          cy="38"
          r="5"
          fill="#7a1f2b"
          fillOpacity="0.7"
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.svg>

      {/* Progress bar */}
      <div className="mt-8 w-28 h-px bg-gold/10 relative overflow-hidden rounded-full">
        <motion.div
          className="absolute inset-y-0 left-0 bg-gold/50 rounded-full"
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.25 }}
        />
      </div>

      <p
        className="mt-3 font-sans text-[9px] tracking-[0.45em] text-gold/30 uppercase"
        style={{ letterSpacing: '0.45em' }}
      >
        preparando
      </p>
    </motion.div>
  )
}
