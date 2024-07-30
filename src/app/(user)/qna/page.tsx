'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { useRouter, useSearchParams } from 'next/navigation'
import { notices as dummyNotices } from './data'

const ITEMS_PER_PAGE = 5

export default function Page() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const currentPage = parseInt(searchParams.get('page') || '1')
  const [searchTerm, setSearchTerm] = useState('')
  const [notices, setNotices] = useState(dummyNotices)
  const [filteredNotices, setFilteredNotices] = useState(dummyNotices)
  const totalPages = Math.ceil(notices.length / ITEMS_PER_PAGE)

  const paginatedNotices = filteredNotices.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  )

  const handleSearch = () => {
    const filtered = notices.filter((notice) =>
      notice.title.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    setFilteredNotices(filtered)
    router.push('/qna?page=1') // 검색 후 첫 페이지로 이동
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
          >
            검색
          </button>
        </div>
        <div className="mt-6 w-[742px] h-472px]">
          {paginatedNotices.map((notice) => (
            <React.Fragment key={notice.id}>
              <div className="mt-28 ml-21 w-[742px] border border-[#d5d1d1]" />
              <div className="ml-24 mt-18 w-[371px] h-[29px] text-20">
                <span
                  className={
                    notice.answered ? 'text-[#7dbc72]' : 'text-[#ffab2d]'
                  }
                >
                  {notice.answered ? '[답변완료]' : '[문의중]'}{' '}
                </span>
                <span className="">{notice.title}</span>
              </div>
              <div className="mt-11 ml-21 w-[150px] h-[14px] text-[#828282] text-10">
                <span className="w-[53px]">{notice.date}</span>
                <span className="ml-9 w-[1px]">|</span>
                <span className="ml-9 w-[40px]">{notice.author}</span>
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
      <div className="flex ml-265 mt-33 w-[787px] h-[28px] justify-center">
        <button
          className="w-[28px] h-[28px] text-center shadow-md bg-[#f1f2f6] rounded-4"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <Image
            src="/images/left.svg"
            alt="Previous"
            height={24}
            width={24}
          />
        </button>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            className={`w-[28px] h-[28px] text-center shadow-md ${
              currentPage === index + 1
                ? 'bg-[#ff9f00] text-[#ffffff]'
                : 'bg-[#f1f2f6]'
            } rounded-4`}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </button>
        ))}
        <button
          className="w-[28px] h-[28px] text-center shadow-md bg-[#f1f2f6] rounded-4"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          <Image src="/images/right.svg" alt="Next" height={24} width={24} />
        </button>
      </div>
      <button
        className="absolute w-[51px] h-[47px] text-28 font-bold bg-[#FFE4A3] text-[#ffffff] rounded flex items-center justify-center z-50"
        style={{ top: '647px', left: '1199px' }}
        onClick={handleClick}
      >
        +
      </button>
    </div>
  )
}
