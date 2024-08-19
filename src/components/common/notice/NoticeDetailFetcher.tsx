import Image from 'next/image'
import { fetchNotices, NoticeItem } from '@/components/common/notice/api'
import { formatDate } from '@/util/formatDate2'
import { BlockNoteViewer } from '@/components/common/BlockNote'
import { useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'

interface NoticeDetailFetcherProps {
  noticeData: NoticeItem
  isLoading: boolean
  error: string | null
  noticeId: number
  isAdmin?: boolean
}

export default function NoticeDetailFetcher({
  noticeData,
  isLoading,
  error,
  noticeId,
  isAdmin = false,
}: NoticeDetailFetcherProps) {
  const router = useRouter()
  const toastShown = useRef(false)
  const [totalNotices, setTotalNotices] = useState<number | null>(null) // 전체 공지사항 개수를 위한 상태

  // 전체 공지사항 개수를 가져오는 useEffect
  useEffect(() => {
    const fetchTotalNotices = async () => {
      try {
        const response = await fetchNotices(0, 1) // 페이지당 1개의 공지만 가져와서 totalElements를 확인
        setTotalNotices(response.result.totalElements)
      } catch (fetcherror) {
        console.error('Failed to fetch total notice count:', fetcherror)
      }
    }

    fetchTotalNotices()
  }, [])
  const handleNavigation = (direction: 'prev' | 'next' | 'list') => {
    if (direction === 'list') {
      if (isAdmin) {
        router.push(`/admin/notice`)
      } else {
        router.push(`/notice`)
      }
      return
    }

    const newId = direction === 'prev' ? noticeId - 1 : noticeId + 1

    if (newId < 1) {
      if (!toastShown.current) {
        toast.error('첫번째 공지사항입니다!')
        toastShown.current = true
      }
      return
    }

    if (totalNotices !== null && newId > totalNotices) {
      if (!toastShown.current) {
        toast.error('마지막 공지사항입니다!')
        toastShown.current = true
      }
      return
    }

    if (totalNotices === null) {
      toast.error('Failed to fetch total notice count.')
    }

    toast.dismiss()
    toastShown.current = false
    if (isAdmin) {
      router.push(`/admin/notice/${newId}`)
    } else {
      router.push(`/notice/${newId}`)
    }
  }
  if (isLoading) return <div>Loading...</div>
  if (error) return <div>{error}</div>
  if (!noticeData) return <div>공지사항을 찾을 수 없습니다.</div>

  return (
    <div className="mt-83 w-[700px] h-[638px]">
      <div className="mt-16 h-20 text-14 text-[#ec8f03]">
        {formatDate(noticeData.createdAt)}
      </div>
      <div>
        <div className="mt-16 max-h-39 text-32 text-[#000000] text-opacity-60 overflow-hidden">
          {noticeData.title}
        </div>
        <div className="flex flex justify-end z-20">
          <button
            type="button"
            className="w-24 h-24"
            onClick={() => handleNavigation('prev')}
            aria-label="Previous"
          >
            <Image
              className="mr-5"
              src="/images/left.svg"
              width={28}
              height={28}
              alt=""
            />
          </button>
          <button
            type="button"
            className="w-24 h-24"
            onClick={() => handleNavigation('list')}
            aria-label="List"
          >
            <Image
              className="mr-5"
              src="/images/list.svg"
              width={24}
              height={24}
              alt=""
            />
          </button>
          <button
            type="button"
            className="w-24 h-24"
            onClick={() => handleNavigation('next')}
            aria-label="Next"
          >
            <Image
              className="mr-5"
              src="/images/right.svg"
              width={28}
              height={28}
              alt=""
            />
          </button>
        </div>
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
      <div className="mt-16 overflow-y-auto">
        <BlockNoteViewer data={noticeData.content} />
      </div>
    </div>
  )
}
