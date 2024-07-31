import { Suspense } from 'react'
import NoticeList from './components/AdminNoticeList'

export default function NoticePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <NoticeList />
    </Suspense>
  )
}
