'use client'

import { useEffect, useState } from 'react'
import { Button } from '@nextui-org/react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { fetchQnaDetail, QnaItem } from '@/components/qna/api'
import QnaDetailFetcher from './components/QnaDetailFetcher'

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
      <div className="w-[787px] h-[602px] mt-39 ml-256 border-1 border-solid border-[#00000014] rounded-xl overflow-hidden shadow-md">
        <div className="ml-21 mt-22 w-[118px] h-[39px] text-32 font-inter font-bold">
          문의사항
        </div>
        <div className="ml-21 mt-25 w-[745px] h-467 rounded-20 shadow-md border-[rgba(0,0,0,0.08)] border-1 border-solid box-border overflow-hidden">
          <QnaDetailFetcher
            qnaData={qnaData}
            isLoading={isLoading}
            error={error}
          />
        </div>
        <div className="flex ml-[443px] mt-8 w-324 h-31">
          <Link href="/qna">
            <Button
              className="w-98 h-30 padding-3 rounded-16 border-1 text-15 leading-24 text-center bg-[#fff] border-[#ffc044] text-[#ffab2d]"
              type="button"
            >
              이전
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
