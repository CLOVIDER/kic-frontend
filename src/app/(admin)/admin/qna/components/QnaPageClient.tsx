'use client'

import Pagination from '@/components/common/Pagination'
import { useQnaList } from '../hooks/useQnaList'
import { QnaList } from './QnaList'
import { QnaItem } from '../type/QnaItem'

interface QnaPageClientProps {
  initialQna: QnaItem[]
}

export default function QnaPageClient({ initialQna }: QnaPageClientProps) {
  const {
    currentPage,
    searchTerm,
    setSearchTerm,
    paginatedNotices,
    totalPages,
    handleSearch,
    handlePageChange,
  } = useQnaList(initialQna)

  return (
    <div className="absolute w-[1280px] h-[720px] mt-40 bg-white flex-col flex justify-between">
      <div className="w-[787px] h-[602px] mt-40 ml-256 border-1 border-solid border-[#00000014] rounded-xl overflow-hidden shadow-md">
        <div className="flex mt-26 w-[787px] h-39">
          <div className="ml-21 w-118 h-39 text-32 font-inter font-bold">
            문의사항
          </div>
          <div className="p-3 mt-7 ml-53 w-63 h-37 rounded-3 border border-[#d5d1d1] text-center text-14">
            제목
          </div>
          <input
            className="p-3 ml-14 mt-7 w-367 h-37 rounded-3 border border-[#d5d1d1]"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            className="ml-14 mt-7 w-117 h-37 border border-[#ff9900] rounded-3 text-[#ff9900] font-bold text-14"
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
    </div>
  )
}
