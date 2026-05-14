import { motion } from 'framer-motion'
import { BookPage } from './BookPage'
import { PageContent } from '../content'

interface Props {
  page: PageContent
  pageIndex: number
  totalPages: number
  direction: number
  onNext: () => void
  onPrev: () => void
}

export function BookStage(props: Props) {
  return (
    <motion.div
      className="fixed inset-0"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
      style={{ zIndex: 10 }}
    >
      <BookPage {...props} />
    </motion.div>
  )
}
