'use client'

import { useNotice } from '@/app/(admin)/components/adminFetcher/queries'

export default function Notification() {
  const { data: notice } = useNotice()

  return (
    <div className="w-300 bg-white px-30 py-20 rounded-32 shadow-md">
      <div className="text-red-500 font-bold mb-4 flex items-center text-[#EA7465]">
        <span className="mr-4">▼ </span> 공지사항
      </div>
      <div className="pl-10 pt-5">
        {notice?.map(({ noticeId, title, createdAt }) => (
          <div
            key={noticeId}
            className="mb-4 flex flex-row gap-20 whitespace-nowrap items-cente text-11 font-semiboldr"
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
