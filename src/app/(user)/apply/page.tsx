'use client'

import { Suspense, useEffect, useState } from 'react'
import { useHomePage } from '@/app/(home)/components/api/queries'
import { useRouter } from 'next/navigation'
import LeftSection from './components/LeftSection'
import ApplicationForm from './components/ApplicationForm'

export default function Page() {
  const router = useRouter()
  const { data } = useHomePage()
  const [hasCheckedStatus, setHasCheckedStatus] = useState(false)
  useEffect(() => {
    if (data?.recruitStatus && !hasCheckedStatus) {
      console.log(data)
      if (data.recruitStatus === '모집없음') {
        alert('신청기간이 아닙니다.')
        router.push('/')
      }
      setHasCheckedStatus(true)
    }
  }, [data, hasCheckedStatus, router])

  if (data?.recruitStatus === '모집없음') {
    return null
  }
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="flex flex-row justify-center gap-220 mt-150 ml-190 w-full">
        <LeftSection />
        <ApplicationForm />
      </div>
    </Suspense>
  )
}
