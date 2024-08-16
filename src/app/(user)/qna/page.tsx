'use client'

import { useState } from 'react'
import { Button, Pagination } from '@nextui-org/react'
import Link from 'next/link'
import { QnaFetcher } from '@/components/common/qna'

const ITEMS_PER_PAGE = 5

export default function Page() {
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [keyword, setKeyword] = useState('')

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const handleSearch = () => {
    setCurrentPage(1)
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  return (
    <div className="absolute w-[1280px] h-[720px] mt-40 bg-white flex-col flex justify-between">
      <div className="w-[787px] h-[602px] mt-40 ml-256 border-1 border-solid border-[#00000014] rounded-xl overflow-hidden shadow-md">
        <div className="flex mt-26 w-[787px] h-[39px]">
          <div className="ml-21 w-[118px] h-[39px] text-32 font-inter font-bold">
            문의사항
          </div>
          <div className="p-3 mt-7 ml-53 w-[63px] h-[37px] rounded-3 border border-[#d5d1d1] text-center text-14">
            제목
          </div>
          <input
            className="p-3 ml-14 mt-7 w-[367px] h-[37px] rounded-3 border border-[#d5d1d1]"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <Button
            className="ml-14 mt-7 w-[117px] h-[37px] border bg-white border-[#ff9900] rounded-[3px] text-[#ff9900] font-bold text-[14px]"
            type="button"
            onClick={handleSearch}
          >
            검색
          </Button>
        </div>
        <QnaFetcher
          currentPage={currentPage}
          itemsPerPage={ITEMS_PER_PAGE}
          onPageChange={handlePageChange}
          totalPages={totalPages}
          setTotalPages={setTotalPages}
          keyword={keyword}
        />
      </div>
      <div className="w-[787px] ml-256 mt-4">
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
      <Link href="/qna/write">
        <Button
          className="absolute w-[51px] h-[47px] text-[28px] font-bold bg-[#FFE4A3] text-[#ffffff] rounded flex items-center justify-center z-50"
          style={{ top: '647px', left: '1199px' }}
          type="button"
        >
          +
        </Button>
      </Link>
    </div>
  )
}
