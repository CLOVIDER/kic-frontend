'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { useRouter, useSearchParams } from 'next/navigation'
import NoticeLayout from './notice-layout'
import { notices as dummyNotices } from './data/Notice'
import Pagination from './Pagination'

const ITEMS_PER_PAGE = 3

export default function NoticeList() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const currentPage = parseInt(searchParams.get('page') || '1', 10)
  const [title, setTitle] = useState('')
  const [notices] = useState(dummyNotices)
  const totalPages = Math.ceil(notices.length / ITEMS_PER_PAGE)

  const paginatedNotices = notices.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  )

  const handlePageChange = (page: number) => {
    router.push(`/notice/?page=${page}`)
  }

  return (
    <NoticeLayout>
      <div className="absolute w-[1280px] h-[720px] bg-white flex-col flex justify-between">
        <div className="w-[695px] h-[575px] mt-62 ml-292 rounded-xl overflow-hidden">
          <div className="flex w-[742px] h-[39px]">
            <div className="w-[118px] h-[39px] text-32 font-inter font-bold">
              공지사항
            </div>
          </div>
          <div className="mt-11 w-[695px] h-[155px]">
            {paginatedNotices.map((notice) => (
              <React.Fragment key={notice.id}>
                <div className="flex mt-20">
                  <div className="mt-8 w-[535px] h-[136px]">
                    <div className="w-[100px] h-[20px] text-14">
                      {notice.kindergarten}
                    </div>
                    <div className="mt-5 w-[535px] h-[29px] text-20">
                      {notice.title}
                    </div>
                    <div className="mt-2 w-[52px] h-[14px] text-10 text-[#BDBDBD]">
                      {notice.date}
                    </div>
                    <div className="mt-10 w-[534px] h-[56px] text-10">
                      {notice.content}
                    </div>
                  </div>
                  <div>
                    <Image
                      className="ml-11"
                      src="/images/temp.png"
                      alt=""
                      width={150}
                      height={150}
                      priority
                    />
                  </div>
                </div>
                <div className="mt-11 w-[695px] border-[#D5D1D1] border-[0.5px]" />
              </React.Fragment>
            ))}
          </div>
        </div>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
        <button
          className="absolute w-[51px] h-[47px] text-28 font-bold bg-[#FFE4A3] text-[#ffffff] rounded flex items-center justify-center z-50"
          style={{ top: '647px', left: '1199px' }}
          onClick={() => console.log('Button Clicked')}
        >
          +
        </button>
      </div>
    </NoticeLayout>
  )
}
