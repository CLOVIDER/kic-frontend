'use client'

import { useState } from 'react'
import { Button, Pagination } from '@nextui-org/react'
import NoticeFetcher from '@/components/common/notice/NoticeFetcher'
import { useRouter } from 'next/navigation'

const ITEMS_PER_PAGE = 3

export default function Page() {
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [keyword] = useState('')
  const router = useRouter()

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  return (
    <div className="w-[1280px] h-[720px] bg-white flex flex-col justify-center items-center">
      <div className="w-[695px] h-[575px] flex flex-col items-start  rounded-xl">
        <div className="flex flex-row h-39 justify-end items-center">
          <p className="text-32 font-inter font-bold whitespace-nowrap">
            공지사항
          </p>
          <Button
            type="button"
            className="ml-540 mt-5 w-45 h-40 text-[30px] font-bold bg-[#FFE4A3] text-[#ffffff] rounded flex items-center justify-center"
            onClick={() => router.push('/admin/notice/write')}
          >
            +
          </Button>
        </div>
        <NoticeFetcher
          currentPage={currentPage}
          itemsPerPage={ITEMS_PER_PAGE}
          onPageChange={handlePageChange}
          totalPages={totalPages}
          setTotalPages={setTotalPages}
          keyword={keyword}
          isAdmin
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
