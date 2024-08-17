'use client'

import DynamicBlockNote from '@/components/common/BlockNote/DynamicBlockNote'
import { useParams, useRouter } from 'next/navigation'
import { Button } from '@nextui-org/react'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import {
  fetchQnaDetail,
  updateQnaAnswer,
  getQnaAnswer,
  QnaItem,
} from '@/components/qna'
// import { PartialBlock } from '@blocknote/core'
import { toast } from 'react-toastify'
import QnaDetailFetcher from '@/app/(user)/qna/[id]/components/QnaDetailFetcher'
import { PartialBlock } from '@blocknote/core'

export default function AnswerClient() {
  const { id } = useParams()
  const [qnaData, setQnaData] = useState<QnaItem | null>(null)
  const [answer, setContent] = useState<string>('')
  const [isLoading, setIsLoading] = useState(true)
  const [errorMsg, setError] = useState<string | null>(null)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [initialEditorContent, setInitialEditorContent] = useState<
    PartialBlock[] | undefined
  >(undefined)
  const router = useRouter()

  const domainName = 'qna'

  useEffect(() => {
    // 컴포넌트가 마운트될 때 세션 스토리지에서 내용을 불러옵니다.
    const savedContent = sessionStorage.getItem('editorContent')
    if (savedContent) {
      setInitialEditorContent(JSON.parse(savedContent))
      setContent(savedContent)
    }

    // 컴포넌트가 언마운트될 때 세션 스토리지를 초기화합니다.
    return () => {
      sessionStorage.removeItem('editorContent')
    }
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      try {
        toast.info(`Starting to fetch QnA detail for ID:${id}`)
        const response = await fetchQnaDetail(Number(id))
        toast.info(`QnA Detail fetched successfully:${response}`)
        setQnaData(response.result)

        const answerResponse = await getQnaAnswer(Number(id))
        toast.info(`QnA Answer fetched successfully:${answerResponse}`)
        if (answerResponse !== null) {
          setContent(answerResponse.answer)
        } else {
          toast.warn('Answer not found in the response')
          setContent('') // Set to empty string or handle as needed
        }

        setIsLoading(false)
        toast.info('Loading state set to false')
      } catch (err) {
        toast.error(`Error during fetch:${err}`)
        setError(
          err instanceof Error ? err.message : 'An unknown error occurred',
        )
        setIsLoading(false)
      }
    }

    fetchData()
  }, [id])

  const handleSave = async () => {
    if (!id) return
    try {
      await updateQnaAnswer(Number(id), answer)
      toast.info('답변이 성공적으로 저장되었습니다.')
      router.push('/admin/qna')
    } catch (error) {
      toast.info('답변 저장에 실패했습니다.')
    }
  }

  if (isLoading) return <div>Loading...</div>
  if (errorMsg) return <div>{errorMsg}</div>
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
              error={errorMsg}
            />
          </div>
          <div className="mt-6 w-[746px] h-324 rounded-20 shadow-md border-[rgba(0,0,0,0.08)] border-1 border-solid box-border overflow-hidden">
            <DynamicBlockNote
              initialContent={answer}
              domainName={domainName}
              setContent={(content) => {
                setContent(content)
                sessionStorage.setItem('editorContent', content) // 내용이 변경될 때마다 세션 스토리지에 저장
              }}
            />
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
            onClick={handleSave}
          >
            저장
          </Button>
        </div>
      </div>
    </div>
  )
}
