import Image from 'next/image'
import { NoticeItem } from '@/components/common/notice/api'
import { formatDate } from '@/util/formatDate2'

interface NoticeDetailFetcherProps {
  noticeData: NoticeItem
  isLoading: boolean
  error: string | null
}

export default function NoticeDetailFetcher({
  noticeData,
  isLoading,
  error,
}: NoticeDetailFetcherProps) {
  if (isLoading) return <div>Loading...</div>
  if (error) return <div>{error}</div>
  if (!noticeData) return <div>공지사항을 찾을 수 없습니다.</div>

  return (
    <div className="mt-83 w-[700px] h-[638px]">
      <div className="mt-16 h-20 text-14 text-[#ec8f03]">
        {formatDate(noticeData.createdAt)}
      </div>
      <div className="mt-16 max-h-39 text-32 text-[#000000] text-opacity-60 overflow-hidden">
        {noticeData.title}
      </div>
      {noticeData.noticeImageList.length > 0 && (
        <div className="mt-16">
          <Image
            src={noticeData.noticeImageList[0].image}
            alt={noticeData.title}
            width={700}
            height={720}
          />
        </div>
      )}
      <div className="mt-16">{noticeData.content}</div>
    </div>
  )
}
