'use client'

import { useParams } from 'next/navigation'
import { notices as dummyNotices } from '@/components/data/Notice'
import Image from 'next/image'
import { formatDate } from '@/util/formatDate'

export default function NoticeDetail() {
  const { id } = useParams()
  const noticeId = Number(id)

  if (Number.isNaN(noticeId)) {
    return <div>Notice not found</div>
  }

  const notice = dummyNotices.find((n) => n.id === noticeId)

  if (!notice) {
    return <div>Notice not found</div>
  }

  return (
    <div>
      <div className="mt-83 w-[700px] h-[638px]">
        <div className="flex h-24">
          <Image
            src={notice.authorImgSrc}
            className="w-24 h-24 rounded-[50%]"
            alt={notice.author}
            width={24}
            height={24}
          />
          <div className="w-[700px] h-24 text-14 font-inter ml-10">
            {notice.author}
          </div>
        </div>
        <div className="mt-16 h-20 text-14 text-[#ec8f03]">
          {formatDate(notice.date)}
        </div>
        <div className="mt-16 max-h-39 text-32 text-[#000000] text-opacity-60 overflow-hidden">
          {notice.title}
        </div>
        <div className="mt-16">
          <Image
            src={notice.contentImgSrc}
            alt={notice.title}
            width={700}
            height={720}
          />
        </div>
        <div className="mt-16">{notice.content}</div>
      </div>
    </div>
  )
}
