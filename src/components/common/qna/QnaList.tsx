'use client'

import { KeyboardEvent, Fragment } from 'react'
import { useRouter } from 'next/navigation'
import cn from '@/util/cn'
import { QnaItem, deleteQna } from '@/components/qna'
import { FaLock, FaLockOpen } from 'react-icons/fa'
import Link from 'next/link'
import { toast } from 'react-toastify'

interface QnaListProps {
  paginatedNotices: QnaItem[]
  isAdmin?: boolean
}

export default function QnaList({
  paginatedNotices,
  isAdmin = false,
}: QnaListProps) {
  const router = useRouter()

  const handleClick = (id: number) => {
    router.push(`/qna/${id}`)
  }

  function handleKeyPress(
    event: KeyboardEvent<HTMLDivElement>,
    id: number,
  ): void {
    if (event.key === 'Enter' || event.key === ' ') {
      handleClick(id)
    }
  }

  if (paginatedNotices.length === 0) {
    return (
      <div className="flex items-center justify-center h-[472px] text-lg text-gray-500">
        검색결과가 없습니다
      </div>
    )
  }

  async function deleteQuestion(id: number) {
    try {
      await deleteQna(id)
      window.location.reload()
    } catch (error) {
      toast.error('Failed to delete question')
    }
  }

  return (
    <div className="mt-6 w-[742px] h-[472px]">
      {paginatedNotices.map((item) => (
        <Fragment key={item.qnaId}>
          <div className="mt-19 ml-21 w-[742px] border border-[#d5d1d1]" />
          <div className="flex min-h-[85px]">
            {' '}
            {/* 고정된 최소 높이를 설정 */}
            <div
              onClick={() => handleClick(item.qnaId)}
              onKeyDown={(event) => handleKeyPress(event, item.qnaId)}
              role="button"
              tabIndex={0}
              className="cursor-pointer flex-grow"
            >
              <div className="ml-24 mt-18 w-[600px] h-29 text-20">
                <span
                  className={cn(
                    item.answer ? 'text-[#7dbc72]' : 'text-[#ffab2d]',
                  )}
                >
                  {item.answer ? '[답변완료]' : '[문의중]'}{' '}
                </span>
                <span className="">{item.title}</span>
                <span className="ml-15 text-[#565656] text-12">
                  {item.isVisibility === '1' ? (
                    <FaLockOpen className="mr-2 inline-block" />
                  ) : (
                    <FaLock className="mr-2 inline-block" />
                  )}
                  {item.isVisibility === '1' ? '공개' : '비공개'}
                </span>
              </div>
              <div className="mt-11 ml-21 w-[150px] h-[14px] text-[#828282] text-10">
                <span className="w-[53px]">{item.createdAt}</span>
                <span className="ml-9 w-[1px]">|</span>
                <span className="ml-9 w-[40px]">{item.writerName}</span>
              </div>
            </div>
            {isAdmin && (
              <div className="mt-8 ml-20 w-85 h-73">
                <Link href={`/admin/qna/answer/${item.qnaId}`}>
                  <button
                    className={`w-101 h-31 text-16 text-[#ffffff] rounded-16 ${
                      item.answer ? 'bg-[#ffbb38]' : 'bg-[#7DBC72]'
                    }`}
                    type="button"
                  >
                    {item.answer ? '답변수정' : '답변작성'}
                  </button>
                </Link>
                <button
                  className="mt-11 bg-[#FF7E6D] w-101 h-31 text-16 text-[#ffffff] rounded-16"
                  type="button"
                  onClick={() => deleteQuestion(item.qnaId)}
                >
                  질문삭제
                </button>
              </div>
            )}
          </div>
        </Fragment>
      ))}
    </div>
  )
}
