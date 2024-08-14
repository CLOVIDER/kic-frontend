'use client'

import React, { useEffect, useState } from 'react'
import { ToastContainer } from 'react-toastify'
import { useRouter } from 'next/navigation'
import LeftSection from './components/LeftSection'
import ApplicationForm from './components/ApplicationForm'
import 'react-toastify/dist/ReactToastify.css'
import { getApplicationData } from './api'

export default function Page() {
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    async function checkApplicationStatus() {
      const applicationStatus = await getApplicationData()

      if (applicationStatus.id === null) {
        setLoading(false)
      } else {
        router.push('/apply/application')
      }
    }

    checkApplicationStatus()
  }, [router])

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div className="absolute w-[1280px] h-[720px] bg-white flex justify-between">
      <LeftSection />
      <ApplicationForm />
      <ToastContainer />
    </div>
  )
}
