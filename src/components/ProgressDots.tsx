import { motion } from 'framer-motion'

interface Props {
  current: number
  total: number
}

export function ProgressDots({ current, total }: Props) {
  return (
    <div className="flex items-center gap-1.5">
      {Array.from({ length: total }).map((_, i) => (
        <motion.div
          key={i}
          className="rounded-full"
          animate={{
            width: i === current ? 18 : 6,
            height: 6,
            backgroundColor: i === current ? '#8b2c4e' : 'rgba(201,169,97,0.22)',
          }}
          transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
        />
      ))}
    </div>
  )
}
