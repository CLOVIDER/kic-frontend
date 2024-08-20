'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { fetchNoticeDetail, NoticeItem } from '@/components/common/notice/api'
import NoticeDetailFetcher from '@/components/common/notice/NoticeDetailFetcher'

export default function NoticeDetail() {
  const router = useRouter()
  const { id } = useParams()
  const noticeId = Number(id)
  const [noticeData, setNoticeData] = useState<NoticeItem | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (Number.isNaN(noticeId)) {
      router.push('/admin/notice')
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

  return (
    <div>
      <div className="mt-83 w-[700px] h-[638px] relative z-10">
        {noticeData ? (
          <NoticeDetailFetcher
            noticeData={noticeData}
            isLoading={isLoading}
            error={error}
            noticeId={noticeId}
            isAdmin
          />
        ) : (
          <p>Notice data is not available.</p>
        )}
      </div>
    </div>
  )
}
