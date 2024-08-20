'use client'

import { KeyboardEvent, useMemo } from 'react'
import Image from 'next/image'
import { useRouter, useSearchParams } from 'next/navigation'
import { notices as dummyNotices } from '@/components/data/Notice'
import Pagination from '@/components/common/Pagination'
import { Button } from '@nextui-org/react'

const ITEMS_PER_PAGE = 3

export default function AdminNoticeList() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const currentPage = parseInt(searchParams.get('page') || '1', 10)
  const notices = useMemo(() => dummyNotices, [])
  const totalPages = useMemo(
    () => Math.ceil(notices.length / ITEMS_PER_PAGE),
    [notices.length],
  )
  const paginatedNotices = useMemo(
    () =>
      notices.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE,
      ),
    [notices, currentPage],
  )

  const handlePageChange = (page: number) => {
    router.push(`/admin/notice/?page=${page}`)
  }

  const handleNoticeClick = (id: number) => {
    router.push(`/admin/notice/${id}`)
  }

  function handleKeyPress(
    event: KeyboardEvent<HTMLDivElement>,
    id: number,
  ): void {
    if (event.key === 'Enter' || event.key === ' ') {
      handleNoticeClick(id)
    }
  }

  return (
    <div className="h-full flex flex-col justify-center items-center">
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
        <div className="mt-11 w-[695px] h-155">
          {paginatedNotices.map((notice) => (
            <div
              key={notice.id}
              onClick={() => handleNoticeClick(notice.id)}
              onKeyDown={(event) => handleKeyPress(event, notice.id)}
              role="button"
              tabIndex={0}
              className="cursor-pointer"
            >
              <div className="flex mt-20">
                <div className="mt-8 w-[535px] h-136">
                  <div className="w-100 h-20 text-14">
                    {notice.kindergarten}
                  </div>
                  <div className="mt-5 w-535 h-29 text-20">{notice.title}</div>
                  <div className="mt-2 w-52 h-14 text-10 text-[#BDBDBD]">
                    {notice.date}
                  </div>
                  <div className="mt-10 w-[534px] h-56 text-10">
                    {notice.content}
                  </div>
                </div>
                <div>
                  <Image
                    className="ml-11"
                    src={notice.imageSrc}
                    alt={notice.title}
                    width={150}
                    height={150}
                    priority
                  />
                </div>
              </div>
              <div className="mt-11 w-[695px] border-[#D5D1D1] border-[0.5px]" />
            </div>
          ))}
        </div>
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  )
}
