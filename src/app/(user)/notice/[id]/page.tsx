'use client'

import { useEffect, useState, useRef } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Image from 'next/image'
import { formatDate } from '@/util/formatDate'
import { useEffect, useRef } from 'react'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { fetchNoticeDetail, NoticeItem } from '@/components/common/notice/api'
import NoticeDetailFetcher from './components/NoticeDetailFetcher'

export default function NoticeDetail() {
  const router = useRouter()
  const { id } = useParams()
  const noticeId = Number(id)
  const [noticeData, setNoticeData] = useState<NoticeItem | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const toastShown = useRef(false)

  useEffect(() => {
    if (Number.isNaN(noticeId)) {
      router.push('/notice')
      return
    }

    const fetchData = async () => {
      try {
        const response = await fetchNoticeDetail(noticeId)
        setNoticeData(response.result)
        setIsLoading(false)
      } catch (err) {
        setError('Failed to fetch Notice detail')
        setIsLoading(false)
      }
    }

    fetchData()
  }, [noticeId, router])

  const handleNavigation = (direction: 'prev' | 'next' | 'list') => {
    if (direction === 'list') {
      router.push('/notice')
      return
    }

    const newId = direction === 'prev' ? noticeId - 1 : noticeId + 1

    if (newId < 1) {
      if (!toastShown.current) {
        toast.error('This is the first notice.')
        toastShown.current = true
      }
      return
    }

    toast.dismiss()
    toastShown.current = false
    router.push(`/notice/${newId}`)
  }

  return (
    <div className="relative">

      {/* NoticeDetailFetcher Component */}
      <div className="mt-83 w-[700px] h-[638px] relative z-10">
        {noticeData ? (
          <NoticeDetailFetcher
            noticeData={noticeData}
            isLoading={isLoading}
            error={error}
          />
        ) : (
          <p>Notice data is not available.</p>
        )}
      </div>

      {/* Buttons */}
      <div className="absolute top-0 right-0 mt-130 flex justify-end z-20">
        <button
          type="button"
          className="w-24 h-24"
          onClick={() => handleNavigation('prev')}
          aria-label="Previous"
        >
          <Image
            className="mr-5"
            src="/images/left.svg"
            width={28}
            height={28}
            alt=""
          />
        </button>
        <button
          type="button"
          className="w-24 h-24"
          onClick={() => handleNavigation('list')}
          aria-label="List"
        >
          <Image
            className="mr-5"
            src="/images/list.svg"
            width={24}
            height={24}
            alt=""
          />
        </button>
        <button
          type="button"
          className="w-24 h-24"
          onClick={() => handleNavigation('next')}
          aria-label="Next"
        >
          <Image
            className="mr-5"
            src="/images/right.svg"
            width={28}
            height={28}
            alt=""
          />
        </button>
      </div>
    </div>
  )
}
