'use client'

import { useSearchParams } from 'next/navigation'
import KindergartenDetail from './components/KindergartenDetail'
import KindergartenList from './components/KindergartenList'

export default function Page() {
  const searchParams = useSearchParams()

  return searchParams.get('id') ? <KindergartenDetail /> : <KindergartenList />
}
