'use client'

import { useEffect, useState } from 'react'
import { Button } from '@nextui-org/react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import cn from '@/util/cn'
import { fetchQnaDetail, QnaItem } from '@/components/qna'
import CancelModal from '@/components/common/qna/CancelModal'
import { QnaDetailFetcher } from '@/components/common/qna'

export default function QnaDetailPage() {
  const { id } = useParams()
  const [qnaData, setQnaData] = useState<QnaItem | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchQnaDetail(Number(id))
        setQnaData(response.result)
        setIsLoading(false)
      } catch (err) {
        setError('Failed to fetch QnA detail')
        setIsLoading(false)
      }
    }

    fetchData()
  }, [id])

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>{error}</div>
  if (!qnaData) return <div>문의사항을 찾을 수 없습니다.</div>

  return (
    <div className="w-[1280px] h-[720px] mt-40 bg-white flex-col flex justify-between">
      <div className="w-[787px] h-[707px] mt-39 ml-256 border-1 border-solid border-[#00000014] rounded-xl overflow-hidden shadow-md">
        <div className="ml-21 mt-22 w-[118px] h-[39px] text-32 font-inter font-bold">
          문의사항
        </div>
        <QnaDetailFetcher
          qnaData={qnaData}
          isLoading={isLoading}
          error={error}
        />
        <div className="flex ml-[443px] mt-8 w-324 h-31">
          <Link href="/admin/qna">
            <Button
              className="w-98 h-30 padding-3 rounded-16 border-1 text-15 leading-24 text-center bg-[#fff] border-[#ffc044] text-[#ffab2d]"
              type="button"
            >
              이전
            </Button>
          </Link>
          <Link href={`/admin/qna/answer/${qnaData.qnaId}`}>
            <Button
              className={cn(
                `ml-15 w-98 h-30 text-[16px] text-[#ffffff] rounded-[16px] ${
                  qnaData.isAnswerPresent ? 'bg-[#ffbb38]' : 'bg-[#7DBC72]'
                }`,
              )}
              type="button"
            >
              {qnaData.isAnswerPresent ? '답변수정' : '답변작성'}
            </Button>
          </Link>
          <CancelModal id={qnaData.qnaId}>
            {(onOpen) => (
              <Button
                className="ml-15 w-98 h-30 rounded-[16px] bg-[#FF7E6D] text-[#ffffff] text-[16px]"
                type="button"
                onClick={onOpen}
              >
                삭제
              </Button>
            )}
          </CancelModal>
        </div>
      </div>
    </div>
  )
}
