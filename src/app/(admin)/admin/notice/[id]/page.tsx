// 'use client'

// import { useRouter, useParams } from 'next/navigation'
// import { notices as dummyNotices } from '@/components/data/Notice'
// import Image from 'next/image'
// import { formatDate } from '@/util/formatDate'
// import { useEffect, useState, useRef } from 'react'
// import toast, { Toaster } from 'react-hot-toast'

// export default function NoticeDetail() {
//   const router = useRouter()
//   const { id } = useParams()
//   const noticeId = Number(id)

//   useEffect(() => {
//     if (isNaN(noticeId)) {
//       router.push('/admin/notice')
//     }
//   }, [noticeId, router])

//   const noticeIndex = dummyNotices.findIndex(notice => notice.id === noticeId)
//   const toastShown = useRef(false)

//   if (noticeIndex === -1) {
//     return <div>Notice not found</div>
//   }

//   const notice = dummyNotices[noticeIndex]

//   const handleNavigation = (direction: 'prev' | 'next' | 'list') => {
//     if (direction === 'list') {
//       router.push('/admin/notice')
//       return
//     }

//     const newIndex = direction === 'prev' ? noticeIndex - 1 : noticeIndex + 1

//     if (newIndex < 0 || newIndex >= dummyNotices.length) {
//       if (!toastShown) {
//         toast.error(direction === 'prev' ? 'This is the first notice.' : 'This is the last notice.')
//         toastShown.current = true
//       }
//       return
//     }

//     toast.dismiss()
//     toastShown.current = false
//     router.push(`/admin/notice/${dummyNotices[newIndex].id}`)
//   }

//   return (
//     <div>
//       <Toaster position="top-center" reverseOrder={false} />
//       <div className="mt-83 w-[700px] h-[638px]">
//         <div className="flex h-[24px]">
//           <Image
//             src={notice.authorImgSrc}
//             className="w-24 h-24 rounded-[50%]"
//             alt={notice.author}
//             width={24}
//             height={24}/>
//           <div className="w-[600px] h-[24px] text-14 font-inter ml-10">
//             {notice.author}
//           </div>
//           <button className="w-[24px] h-[24px]" onClick={() => handleNavigation('prev')}>
//             <Image
//               className="mr-5"
//               src="/images/left.svg"
//               width={28}
//               height={28}
//               alt="" />
//           </button>
//           <button className="w-[24px] h-[24px]" onClick={() => handleNavigation('list')}>
//           <Image
//             className="mr-5"
//             src="/images/list.svg"
//             width={24}
//             height={24}
//             alt="" />
//           </button>
//           <button className="w-[24px] h-[24px]" onClick={() => handleNavigation('next')}>
//             <Image
//               className="mr-5"
//               src="/images/right.svg"
//               width={28}
//               height={28}
//               alt="" />
//           </button>
//         </div>
//         <div className="mt-16 h-[20px] text-14 text-[#ec8f03]">
//           {formatDate(notice.date)}
//         </div>
//         <div className="mt-16 max-h-[39px] text-32 text-[#000000] text-opacity-60 overflow-hidden">
//           {notice.title}
//         </div>
//         <div className="mt-16">
//           <Image
//             src={notice.contentImgSrc}
//             alt={notice.title}
//             width={700}
//             height={720}/>
//         </div>
//         <div className="mt-16">
//           {notice.content}
//         </div>
//       </div>
//     </div>
//   )
// }

'use client'

import { useRouter, useParams } from 'next/navigation'
import { notices as dummyNotices } from '@/components/data/Notice'
import Image from 'next/image'
import { formatDate } from '@/util/formatDate'
import { useEffect, useState, useRef } from 'react'
import toast, { Toaster } from 'react-hot-toast'

export default function NoticeDetail() {
  const router = useRouter()
  const { id } = useParams()
  const noticeId = Number(id)

  useEffect(() => {
    if (isNaN(noticeId)) {
      router.push('/admin/notice')
    }
  }, [noticeId, router])

  const noticeIndex = dummyNotices.findIndex(notice => notice.id === noticeId)
  const toastShown = useRef(false)

  if (noticeIndex === -1) {
    return <div>Notice not found</div>
  }

  const notice = dummyNotices[noticeIndex]

  const handleNavigation = (direction: 'prev' | 'next' | 'list') => {
    if (direction === 'list') {
      router.push('/admin/notice')
      return
    }

    const newIndex = direction === 'prev' ? noticeIndex - 1 : noticeIndex + 1

    if (newIndex < 0 || newIndex >= dummyNotices.length) {
      if (!toastShown.current) {
        toast.error(direction === 'prev' ? 'This is the first notice.' : 'This is the last notice.')
        toastShown.current = true
      }
      return
    }

    toast.dismiss()  // Dismiss any existing toasts
    toastShown.current = false
    router.push(`/admin/notice/${dummyNotices[newIndex].id}`)
  }

  return (
    <div>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="mt-83 w-[700px] h-[638px]">
        <div className="flex h-[24px]">
          <Image
            src={notice.authorImgSrc}
            className="w-24 h-24 rounded-[50%]"
            alt={notice.author}
            width={24}
            height={24}
          />
          <div className="w-[600px] h-[24px] text-14 font-inter ml-10">
            {notice.author}
          </div>
          <button className="w-[24px] h-[24px]" onClick={() => handleNavigation('prev')}>
            <Image
              className="mr-5"
              src="/images/left.svg"
              width={28}
              height={28}
              alt=""
            />
          </button>
          <button className="w-[24px] h-[24px]" onClick={() => handleNavigation('list')}>
            <Image
              className="mr-5"
              src="/images/list.svg"
              width={24}
              height={24}
              alt=""
            />
          </button>
          <button className="w-[24px] h-[24px]" onClick={() => handleNavigation('next')}>
            <Image
              className="mr-5"
              src="/images/right.svg"
              width={28}
              height={28}
              alt=""
            />
          </button>
        </div>
        <div className="mt-16 h-[20px] text-14 text-[#ec8f03]">
          {formatDate(notice.date)}
        </div>
        <div className="mt-16 max-h-[39px] text-32 text-[#000000] text-opacity-60 overflow-hidden">
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
        <div className="mt-16">
          {notice.content}
        </div>
      </div>
    </div>
  )
}
