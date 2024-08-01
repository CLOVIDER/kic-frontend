'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Pagination from '@/components/common/Pagination'
import { QnaList } from './QnaList'
import { QnaItem } from '../type/QnaItem'

const ITEMS_PER_PAGE = 5

interface QnaPageClientProps {
  initialQna: QnaItem[]
}

export default function QnaPageClient({ initialQna }: QnaPageClientProps) {
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

  return (
    <div className="absolute w-[1280px] h-[720px] bg-white flex-col flex justify-between">
      <div className="w-[787px] h-[602px] mt-39 ml-256 border-1 border-solid border-[#00000014] rounded-xl overflow-hidden shadow-md">
        <div className="flex mt-26 w-[742px] h-[39px]">
          <div className="ml-21 w-[118px] h-[39px] text-32 font-inter font-bold">
            문의사항
          </div>
          <div className="p-3 mt-7 ml-53 w-[63px] h-[37px] rounded-3 border border-[#d5d1d1] text-center text-14">
            제목
          </div>
          <input
            className="p-3 ml-14 mt-7 w-[367px] h-[37px] rounded-3 border border-[#d5d1d1]"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            className="ml-14 mt-7 w-[117px] h-[37px] border border-[#ff9900] rounded-3 text-[#ff9900] font-bold text-14"
            onClick={handleSearch}
            type="button"
          >
            검색
          </button>
        </div>
        <QnaList paginatedNotices={paginatedNotices} />
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
      <button
        className="absolute w-[51px] h-[47px] text-28 font-bold bg-[#FFE4A3] text-[#ffffff] rounded flex items-center justify-center z-50"
        style={{ top: '647px', left: '1199px' }}
        onClick={handleClick}
        type="button"
      >
        +
      </button>
    </div>
  )
}
