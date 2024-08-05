'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { qna } from '../data'

const ITEMS_PER_PAGE = 5

export default function useQnaLogic() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const currentPage = parseInt(searchParams.get('page') || '1', 10)
  const [searchTerm, setSearchTerm] = useState('')
  const [qnas] = useState(qna)
  const [filteredNotices, setFilteredNotices] = useState(qna)
  const totalPages = Math.ceil(qnas.length / ITEMS_PER_PAGE)

  const paginatedNotices = filteredNotices.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  )

  const handleSearch = () => {
    const filtered = qnas.filter((item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    setFilteredNotices(filtered)
    router.push('/qna?page=1')
  }

  const handlePageChange = (page: number) => {
    router.push(`/qna?page=${page}`)
  }

  const handleClick = () => {
    const path = '/qna/write'
    router.push(path)
  }

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
