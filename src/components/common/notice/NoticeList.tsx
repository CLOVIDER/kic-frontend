'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { NoticeItem } from '@/components/common/notice/api'
import { formatDate } from '@/util/formatDate2'
import { Link } from '@nextui-org/react'
import DeleteModal from './DeleteModal'

interface NoticeListProps {
  paginatedNotices: NoticeItem[]
  isAdmin?: boolean
}

export default function NoticeList({
  paginatedNotices,
  isAdmin = false,
}: NoticeListProps) {
  const router = useRouter()

  const handleNoticeClick = (id: number) => {
    if (isAdmin) {
      router.push(`/admin/notice/${id}`)
    } else {
      router.push(`/notice/${id}`)
    }
  }
  if (paginatedNotices.length === 0) {
    return (
      <div className="flex items-center justify-center h-[472px] text-lg text-gray-500">
        검색결과가 없습니다
      </div>
    )
  }

  return (
    <div className="mt-6 w-[695px] h-[472px]">
      {paginatedNotices.map((notice) => (
        <div
          key={notice.noticeId}
          onClick={() => handleNoticeClick(notice.noticeId)}
          onKeyPress={() => handleNoticeClick(notice.noticeId)}
          role="button"
          tabIndex={0}
          className="cursor-pointer"
        >
          <div className="flex mt-20">
            <div className="mt-8 w-[535px] h-136">
              <div className="mt-5 w-[535px] h-29 text-20">{notice.title}</div>
              <div className="mt-2 w-62 h-14 text-10 text-[#BDBDBD]">
                {formatDate(notice.createdAt)}
              </div>
              <div className="mt-10 w-[534px] h-56 text-10">
                {/* {notice.content} */}
              </div>
            </div>
            {notice.noticeImageList.length > 0 && (
              <div>
                <Image
                  className="ml-11"
                  src={notice.noticeImageList[0].image}
                  alt={notice.title}
                  width={150}
                  height={150}
                  priority
                />
              </div>
            )}
            {isAdmin && (
              <div className="ml-20 flex flex-col justify-center h-[136px]]">
                <div className="space-y-30">
                  <Link href={`/admin/notice/write/${notice.noticeId}`}>
                    <button
                      className="w-101 h-31 text-16 text-[#ffffff] rounded-16 bg-[#ffbb38]"
                      type="button"
                    >
                      수정하기
                    </button>
                  </Link>
                  <DeleteModal id={notice.noticeId}>
                    {(onOpen) => (
                      <button
                        className="mt-50 bg-[#FF7E6D] w-101 h-31 text-16 text-[#ffffff] rounded-16"
                        type="button"
                        onClick={onOpen}
                      >
                        질문삭제
                      </button>
                    )}
                  </DeleteModal>
                </div>
              </div>
            )}
          </div>
          <div className="mt-11 w-[695px] border-[#D5D1D1] border-[0.5px]" />
        </div>
      ))}
    </div>
  )
}
