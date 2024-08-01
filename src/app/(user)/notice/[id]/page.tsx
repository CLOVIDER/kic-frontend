'use client'

import { useRouter, useParams } from 'next/navigation'
import { notices as dummyNotices } from '@/components/data/Notice'
import Image from 'next/image'
import { formatDate } from '@/util/formatDate'
import { useEffect, useRef } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function NoticeDetail() {
  const router = useRouter()
  const { id } = useParams()
  const noticeId = Number(id)

  useEffect(() => {
    if (Number.isNaN(noticeId)) {
      router.push('/notice')
    }
  }, [noticeId, router])

  const noticeIndex = dummyNotices.findIndex((notice) => notice.id === noticeId)
  const toastShown = useRef(false)

  if (noticeIndex === -1) {
    return <div>Notice not found</div>
  }

  const notice = dummyNotices[noticeIndex]

  const handleNavigation = (direction: 'prev' | 'next' | 'list') => {
    if (direction === 'list') {
      router.push('/notice')
      return
    }

    const newIndex = direction === 'prev' ? noticeIndex - 1 : noticeIndex + 1

    if (newIndex < 0 || newIndex >= dummyNotices.length) {
      if (!toastShown.current) {
        toast.error(
          direction === 'prev'
            ? 'This is the first notice.'
            : 'This is the last notice.',
        )
        toastShown.current = true
      }
      return
    }

    toast.dismiss()
    toastShown.current = false
    router.push(`/notice/${dummyNotices[newIndex].id}`)
  }

  return (
    <div>
      <ToastContainer position="top-center" autoClose={5000} />
      <div className="mt-83 w-[700px] h-[638px]">
        <div className="flex h-24">
          <Image
            src={notice.authorImgSrc}
            className="w-24 h-24 rounded-[50%]"
            alt={notice.author}
            width={24}
            height={24}
          />
          <div className="w-[600px] h-24 text-14 font-inter ml-10">
            {notice.author}
          </div>
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
        <div className="mt-16 h-20 text-14 text-[#ec8f03]">
          {formatDate(notice.date)}
        </div>
        <div className="mt-16 max-h-39 text-32 text-[#000000] text-opacity-60 overflow-hidden">
          {notice.title}
        </div>
        <div className="mt-16">
          <Image
            src={notice.contentImgSrc}
            alt={notice.title}
            width={700}
            height={720}
          />
        </div>
        <div className="mt-16">{notice.content}</div>
      </div>
    </div>
  )
}
