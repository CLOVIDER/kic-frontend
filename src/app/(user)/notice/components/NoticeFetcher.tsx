'use client'

import { Suspense, useEffect, useState } from 'react'
import { fetchNotices, NoticeItem } from '@/components/common/notice/api'
import NoticeList from './NoticeList'

interface NoticeFetcherProps {
  currentPage: number
  itemsPerPage: number
  onPageChange: (page: number) => void
  totalPages: number
  setTotalPages: (pages: number) => void
  keyword: string
}

export default function NoticeFetcher({
  currentPage,
  itemsPerPage,
  setTotalPages,
  keyword,
}: NoticeFetcherProps) {
  const [notices, setNotices] = useState<NoticeItem[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchNotices(
          currentPage - 1,
          itemsPerPage,
          keyword,
        )

        setNotices(response.result.content)
        setTotalPages(response.result.totalPage)
        setError(null)
      } catch (fetchError) {
        setError('Failed to fetch Notice data')
      }
    }

    fetchData()
  }, [currentPage, itemsPerPage, setTotalPages, keyword])

  return (
    <div>
      {error && <div>{error}</div>}
      <Suspense>
        <NoticeList paginatedNotices={notices} />
      </Suspense>
    </div>
  )
}
