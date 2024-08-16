import cn from '@/util/cn'
import { QnaItem } from '@/components/qna'
import blocknote from '@/components/common/BlockNote'

interface QnaDetailFetcherProps {
  qnaData: QnaItem
  isLoading: boolean
  error: string | null
}

export default function QnaDetailFetcher({
  qnaData,
  isLoading,
  error,
}: QnaDetailFetcherProps) {
  if (isLoading) return <div>Loading...</div>
  if (error) return <div>{error}</div>
  if (!qnaData) return <div>문의사항을 찾을 수 없습니다.</div>

  return (
    <div>
      <div className="ml-20 mt-6 w-[745px] flex flex-row items-center justify-start py-0 px-5 box-border gap-2.5 text-left text-base text-dimgray font-noto-sans">
        <div className="text-16 w-30 h-24 font-bold">제목</div>
        <div className="ml-4 w-220 h-24 text-16 text-black flex items-center shrink-0">
          {qnaData.title}
        </div>
        <div className="ml-4 w-45 text-16 font-bold">작성자</div>
        <div className="ml-4 w-50 text-16 text-black">{qnaData.writerName}</div>
        <div className="ml-4 w-59 text-16 font-bold">작성일자</div>
        <div className="ml-4 w-93 text-16 text-black">{qnaData.createdAt}</div>
        <div className="ml-4 w-59 text-16 font-bold">공개여부</div>
        <div
          className={cn(
            `relative w-45 text-16 ${
              qnaData.isVisibility === '0' ? 'text-[#ff0000]' : 'text-[#7DBC72]'
            }`,
          )}
        >
          {qnaData.isVisibility === '0' ? '비공개' : '공개'}
        </div>
      </div>
      <div className="ml-16 mt-4 w-[712px] relative max-w-full border-solid border-[#D5D1D1] border-[0.3px] overflow-hidden" />
      <div className="ml-20 mt-5 px-5">
        <div className="font-bold mb-2">내용</div>
        <blocknote data={qnaData.question} />
      </div>
    </div>
  )
}
