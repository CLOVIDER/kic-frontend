'use client'

import { KeyboardEvent, Fragment } from 'react'
import { useRouter } from 'next/navigation'
import cn from '@/util/cn'
import { QnaItem } from '@/components/qna/api'
import Link from 'next/link'

interface QnaListProps {
  paginatedNotices: QnaItem[]
}

export default function QnaList({ paginatedNotices }: QnaListProps) {
  const router = useRouter()
  const handleClick = (id: number) => {
    router.push(`/admin/qna/${id}`)
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

  return (
    <div className="mt-6 w-[742px] h-[472px]">
      {paginatedNotices.map((item) => (
        <Fragment key={item.qnaId}>
          <div className="mt-19 ml-21 w-[742px] border border-[#d5d1d1]" />
          <div className="flex">
            <div
              onClick={() => handleClick(item.qnaId)}
              onKeyDown={(event) => handleKeyPress(event, item.qnaId)}
              role="button"
              tabIndex={0}
              className="cursor-pointer"
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
              </div>
              <div className="mt-11 ml-21 w-[150px] h-[14px] text-[#828282] text-10">
                <span className="w-[53px]">{item.createdAt}</span>
                <span className="ml-9 w-[1px]">|</span>
                <span className="ml-9 w-[40px]">{item.writerName}</span>
              </div>
            </div>
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
              >
                질문삭제
              </button>
            </div>
          </div>
        </Fragment>
      ))}
    </div>
  )
}
