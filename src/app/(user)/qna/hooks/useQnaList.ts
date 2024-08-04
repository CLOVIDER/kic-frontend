import { useState, useCallback } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { QnaItem } from '../type/QnaItem'

const ITEMS_PER_PAGE = 5

export function useQnaList(initialQna: QnaItem[]) {
  const searchParams = useSearchParams()
  const router = useRouter()
  const currentPage = parseInt(searchParams.get('page') || '1', 10)
  const [searchTerm, setSearchTerm] = useState('')
  const [qnas] = useState(initialQna)
  const [filteredNotices, setFilteredNotices] = useState(initialQna)
  const totalPages = Math.ceil(qnas.length / ITEMS_PER_PAGE)

  const paginatedNotices = filteredNotices.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  )

  const handleSearch = useCallback(() => {
    const filtered = qnas.filter((item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    setFilteredNotices(filtered)
    router.push('/qna?page=1')
  }, [qnas, searchTerm, router])

  const handlePageChange = useCallback(
    (page: number) => {
      router.push(`/qna?page=${page}`)
    },
    [router],
  )

  const handleClick = useCallback(() => {
    router.push('/qna/write')
  }, [router])

  return {
    currentPage,
    searchTerm,
    setSearchTerm,
    paginatedNotices,
    totalPages,
    handleSearch,
    handlePageChange,
    handleClick,
  }
}
