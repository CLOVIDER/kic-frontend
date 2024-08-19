'use client'

import { useState } from 'react'
import { Pagination } from '@nextui-org/react'
import NoticeFetcher from '@/components/common/notice/NoticeFetcher'

const ITEMS_PER_PAGE = 3

export default function Page() {
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [keyword] = useState('')

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  return (
    <div className="absolute w-[1280px] h-[720px] bg-white flex-col flex justify-between">
      <div className="w-[695px] h-[575px] mt-62 ml-292 rounded-xl overflow-hidden">
        <div className="flex w-[742px] h-39">
          <div className="w-118 h-39 text-32 font-inter font-bold">
            공지사항
          </div>
        </div>
        <NoticeFetcher
          currentPage={currentPage}
          itemsPerPage={ITEMS_PER_PAGE}
          onPageChange={handlePageChange}
          totalPages={totalPages}
          setTotalPages={setTotalPages}
          keyword={keyword}
        />
      </div>
      <div className="w-[695px] ml-292 mt-4">
        <Pagination
          total={totalPages}
          initialPage={1}
          page={currentPage}
          onChange={handlePageChange}
          showControls
          showShadow
          color="warning"
          classNames={{
            base: 'flex justify-center',
            wrapper: 'gap-2',
            cursor: 'border-none w-28 h-28 !rounded-[4] bg-[#FF9F00]',
            item: 'w-28 h-28 !rounded-[4]',
            next: 'w-28 h-28 !rounded-[4] font-bold',
            prev: 'w-28 h-28 !rounded-[4]',
          }}
        />
      </div>
    </div>
  )
}
