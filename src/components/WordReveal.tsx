import { motion } from 'framer-motion'
import { useMemo } from 'react'

interface Props {
  text: string
  isActive: boolean
  className?: string
}

export function WordReveal({ text, isActive, className }: Props) {
  const segments = useMemo(() => {
    let wordIdx = 0
    return text.split('\n').map((line) => ({
      words: line.split(' ').map((word) => ({ word, idx: wordIdx++ })),
    }))
  }, [text])

  return (
    <div className={className}>
      {segments.map((line, li) => (
        <p key={li} className="mb-[0.55em] last:mb-0">
          {line.words.map(({ word, idx }) => (
            <motion.span
              key={`${li}-${idx}`}
              className="inline-block"
              style={{ marginRight: '0.28em' }}
              initial={{ opacity: 0, y: 7 }}
              animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 7 }}
              transition={{
                delay: idx * 0.038,
                duration: 0.42,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
            >
              {word}
            </motion.span>
          ))}
        </p>
      ))}
    </div>
  )
}
