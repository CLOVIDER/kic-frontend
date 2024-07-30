'use client'
import { Suspense, useMemo } from 'react'
import Image from 'next/image'
import { useRouter, useSearchParams } from 'next/navigation'
import { notices as dummyNotices } from '@/components/data/Notice'
import Pagination from '@/components/common/Pagination'

const ITEMS_PER_PAGE = 3

export default function NoticeList() {
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

  const handleNoticeClick = (id : number) => {
    router.push(`/admin/notice/${id}`)
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="absolute w-[1280px] h-[720px] bg-white flex-col flex justify-between">
        <div className="w-[695px] h-[575px] mt-62 ml-292 rounded-xl overflow-hidden">
          <div className="flex w-[742px] h-39">
            <div className="w-[118px] h-39 text-32 font-inter font-bold">
              공지사항
            </div>
          </div>
          <div className="mt-11 w-[695px] h-155">
            {paginatedNotices.map((notice) => (
              <div key={notice.id} onClick={() => handleNoticeClick(notice.id)} className="cursor-pointer">
                <div className="flex mt-20">
                  <div className="mt-8 w-[535px] h-136">
                    <div className="w-100 h-20 text-14">
                      {notice.kindergarten}
                    </div>
                    <div className="mt-5 w-535 h-29 text-20">
                      {notice.title}
                    </div>
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
        <button
          className="absolute w-51 h-47 text-28 font-bold bg-[#FFE4A3] text-[#ffffff] rounded flex items-center justify-center z-50 top-[650px] left-[1100px]"
          onClick={() => router.push('/admin/notice/write')}
        >
          +
        </button>
      </div>
    </Suspense>
  )
}
