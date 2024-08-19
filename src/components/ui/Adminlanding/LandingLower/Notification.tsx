'use client'

import { useAdminNoticeContext } from '@/app/(admin)/components/adminFetcher/adminContext'
import { Plus } from '@/components/common'
import Link from 'next/link'

export default function Notification() {
  const { notices } = useAdminNoticeContext()

  return (
    <div className="relative w-360 bg-white px-30 py-20 rounded-20 shadow-md border border-[#F2F2F2]">
      <div className="text-red-500 font-bold mb-4 flex items-center text-[#EA7465]">
        <span className="mr-4">▼ </span> 공지사항
        <Link
          href="admin/notice"
          className="flex items-center justify-center w-23 h-23 right-15 top-17 absolute bg-[#ffa5a5] rounded-50"
        >
          <Plus width={10} />
        </Link>
      </div>
      <div className="pt-5 ml-3">
        {notices?.map(({ noticeId, title, createdAt }) => (
          <div
            key={noticeId}
            className="mb-4 flex flex-row gap-10 whitespace-nowrap items-cente text-11 font-semiboldr"
          >
            <p className="pt-2 w-auto">{noticeId}</p>
            <h3 className="text-14 w-200 overflow-hidden text-ellipsis ">
              {title}
            </h3>
            <p className="">{new Date(createdAt).toLocaleDateString()}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
