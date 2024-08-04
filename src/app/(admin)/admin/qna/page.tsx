import { qna } from './data'
import QnaPageClient from './components/QnaPageClient'

export default function Page() {
  return <QnaPageClient initialQna={qna} />
}
