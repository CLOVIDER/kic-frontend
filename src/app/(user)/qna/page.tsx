import { qna } from '@/components/qna/data/qna'
import QnaPageClient from './components/QnaPageClient'

export default function Page() {
  return <QnaPageClient initialQna={qna} />
}
