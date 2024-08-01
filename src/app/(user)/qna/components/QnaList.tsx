'use client'

import React from 'react'
import { useSearchParams } from 'next/navigation'
import { notices } from '../data'

const ITEMS_PER_PAGE = 5

export function QnaList() {
  const searchParams = useSearchParams()
  const currentPage = parseInt(searchParams.get('page') || '1', 10)
  const searchTerm = searchParams.get('search') || ''

  const filteredNotices = notices.filter((notice) =>
    notice.title.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const paginatedNotices = filteredNotices.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  )

  return (
    <div className="mt-6 w-[742px] h-472px]">
      {paginatedNotices.map((notice) => (
        <React.Fragment key={notice.id}>
          <div className="mt-28 ml-21 w-[742px] border border-[#d5d1d1]" />
          <div className="ml-24 mt-18 w-[371px] h-[29px] text-20">
            <span
              className={notice.answered ? 'text-[#7dbc72]' : 'text-[#ffab2d]'}
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
  )
}
