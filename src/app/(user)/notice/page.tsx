import { Suspense } from 'react'
import NoticeList from './components/NoticeList'

export default function NoticePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <NoticeList />
    </Suspense>
  )
}
