'use client'

import { useAdminNoticeContext } from '@/app/(admin)/components/adminFetcher/adminContext'

export default function Notification() {
  const { notices } = useAdminNoticeContext()

  return (
    <div className="w-360 bg-white px-30 py-20 rounded-20 shadow-md border border-[#F2F2F2]">
      <div className="text-red-500 font-bold mb-4 flex items-center text-[#EA7465]">
        <span className="mr-4">▼ </span> 공지사항
      </div>
      <div className="pt-5">
        {notices?.map(({ noticeId, title, createdAt }) => (
          <div
            key={noticeId}
            className="mb-4 flex flex-row gap-10 whitespace-nowrap items-cente text-11 font-semiboldr"
          >
            <p className="pt-2">{noticeId}</p>
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
