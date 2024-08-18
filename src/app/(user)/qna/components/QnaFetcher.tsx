'use client'

import { useEffect, useState } from 'react'
import { fetchQnas, QnaItem as ApiQnaItem } from '@/components/qna'
import QnaList from './QnaList'

interface QnaFetcherProps {
  currentPage: number
  itemsPerPage: number
  onPageChange: (page: number) => void
  totalPages: number
  setTotalPages: (pages: number) => void
  keyword: string
}

export default function QnaFetcher({
  currentPage,
  itemsPerPage,
  setTotalPages,
  keyword,
}: QnaFetcherProps) {
  const [qnas, setQnas] = useState<ApiQnaItem[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchQnas(
          currentPage - 1,
          itemsPerPage,
          'TITLE',
          keyword,
        )

        const fetchedQnas = response.result.content.map((item: ApiQnaItem) => ({
          qnaId: item.qnaId,
          title: item.title,
          question: item.question,
          isAnswerPresent: item.isAnswerPresent,
          isVisibility: item.isVisibility,
          createdAt: item.createdAt,
          writerName: item.writerName,
        }))

        setQnas(fetchedQnas)
        setTotalPages(response.result.totalPage)
        setError(null)
      } catch (fetchError) {
        setError('Failed to fetch QnA data')
      }
    }

    fetchData()
  }, [currentPage, itemsPerPage, setTotalPages, keyword])

  return (
    <div>
      {error && <div>{error}</div>}
      <QnaList paginatedNotices={qnas} />
    </div>
  )
}
