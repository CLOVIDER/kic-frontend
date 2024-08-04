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
    router.push(`/qna/${id}`)
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
          <div
            key={item.id}
            onClick={() => handleNoticeClick(item.id)}
            onKeyDown={(event) => handleKeyPress(event, item.id)}
            role="button"
            tabIndex={0}
            className="cursor-pointer"
          >
            <div className="mt-28 ml-21 w-[742px] border border-[#d5d1d1]" />
            <div className="ml-24 mt-18 w-[600px] h-[29px] text-20">
              <span
                className={item.answered ? 'text-[#7dbc72]' : 'text-[#ffab2d]'}
              >
                {item.answered ? '[답변완료]' : '[문의중]'}{' '}
              </span>
              <span className="">{item.title}</span>
            </div>
            <div className="mt-11 ml-21 w-[150px] h-[14px] text-[#828282] text-10">
              <span className="w-[53px]">{item.date}</span>
              <span className="ml-9 w-[1px]">|</span>
              <span className="ml-9 w-[40px]">{item.author}</span>
            </div>
          </div>
        </Fragment>
      ))}
    </div>
  )
}
