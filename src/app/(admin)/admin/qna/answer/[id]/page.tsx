'use client'

import DynamicBlockNoteEditor from '@/components/common/BlockNote/DynamicBlockNoteEditor'
import { useParams } from 'next/navigation'
import { Button } from '@nextui-org/react'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { fetchQnaDetail, QnaItem } from '@/components/qna/api'
import QnaDetailFetcher from '../../../../../(user)/qna/[id]/components/QnaDetailFetcher'

export default function AnswerClient() {
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
    <div className="absolute w-[1280px] h-[720px] mt-50 bg-white justify-between">
      <div className="w-[787px] h-[648px] mt-10 ml-256 border-1 border-solid border-[#00000014] rounded-xl overflow-hidden shadow-md">
        <div className="ml-22 mt-11">
          <div className="w-251 h-39">
            <span className="text-32 leading-39">문의사항 답변 작성</span>
          </div>
          <div className="mt-6 w-[746px] h-213 rounded-20 shadow-md border-[rgba(0,0,0,0.08)] border-1 border-solid box-border overflow-hidden">
            <QnaDetailFetcher
              qnaData={qnaData}
              isLoading={isLoading}
              error={error}
            />
          </div>
          <div className="mt-6 w-[746px] h-324 rounded-20 shadow-md border-[rgba(0,0,0,0.08)] border-1 border-solid box-border overflow-hidden">
            <DynamicBlockNoteEditor />
          </div>
        </div>
        <div className="flex ml-[556px] mt-8 w-211 h-31">
          <Link href="/admin/qna">
            <Button
              className="w-98 h-30 padding-3 rounded-16 border-1 text-15 leading-24 text-center bg-[#fff] border-[#ffc044] text-[#ffab2d]"
              type="button"
            >
              작성취소
            </Button>
          </Link>
          <Button
            className="ml-15 w-98 h-30 padding-3 rounded-16 text-15 leading-24 text-center shadow-md [background:linear-gradient(90deg,_#ffbb38,_#ffe39f)] text-[#ffffff]"
            type="button"
          >
            저장
          </Button>
        </div>
      </div>
    </div>
  )
}
