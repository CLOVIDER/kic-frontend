'use client'

import { KeyboardEvent, Fragment } from 'react'
import { useRouter } from 'next/navigation'
import { QnaItem } from '../type/QnaItem'

interface QnaListProps {
  paginatedNotices: QnaItem[]
}

export function QnaList({ paginatedNotices }: QnaListProps) {
  const router = useRouter()
  const handleNoticeClick = (id: number) => {
    router.push(`/admin/qna/${id}`)
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
    <div className="mt-6 w-[742px] h-472px]">
      {paginatedNotices.map((item) => (
        <Fragment key={item.id}>
          <div className="mt-20 ml-21 w-[728px] border border-[#d5d1d1]" />
          <div className="flex">
            <div
              key={item.id}
              onClick={() => handleNoticeClick(item.id)}
              onKeyDown={(event) => handleKeyPress(event, item.id)}
              role="button"
              tabIndex={0}
              className="cursor-pointer"
            >
              <div className="ml-24 mt-18 w-[600px] h-[29px] text-20 font-bold">
                <span
                  className={
                    item.answered ? 'text-[#7dbc72]' : 'text-[#ffab2d]'
                  }
                >
                  {item.answered ? '[답변완료]' : '[문의중]'}{' '}
                </span>
                <span className="font-bold">{item.title}</span>
              </div>
              <div className="mt-11 ml-21 w-[150px] h-[14px] text-[#828282] text-10">
                <span className="w-[53px]">{item.date}</span>
                <span className="ml-9 w-[1px]">|</span>
                <span className="ml-9 w-[40px]">{item.author}</span>
              </div>
            </div>
            <div className="mt-8 ml-20 w-85">
              <button
                className={`w-101 h-31 text-16 text-[#ffffff] rounded-16 ${
                  item.answered ? 'bg-[#ffbb38]' : 'bg-[#7DBC72]'
                }`}
                type="button"
              >
                {item.answered ? '답변수정' : '답변작성'}
              </button>
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
