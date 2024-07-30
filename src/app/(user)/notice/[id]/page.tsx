// import type { NextPage } from 'next';
// const BlogPostCard:NextPage = () => {
// return (
// <div className="w-full relative h-[638px] flex flex-col items-start justify-start gap-[16px] text-left text-sm text-black font-text-sm-semibold">
// <div className="flex flex-row items-center justify-start gap-[10px]">
// <img className="w-6 relative rounded-[50%] h-6 object-cover" alt="" src="Ellipse.png" />
// <div className="w-[76px] relative leading-[20px] flex items-center overflow-hidden text-ellipsis whitespace-nowrap h-5 shrink-0">관리자</div>
// </div>
// <div className="self-stretch relative leading-[20px] font-semibold text-darkorange">Tuesday , 2 Jan 2024</div>
// <div className="self-stretch flex flex-row items-start justify-start text-[32px] text-gray">
// <b className="flex-1 relative">[모집] 미르 어린이집 24년도</b>
// </div>
// <img className="self-stretch relative max-w-full overflow-hidden h-[720px] shrink-0 object-cover" alt="" src="image 9.png" />
// </div>);
// };
// export default BlogPostCard;
'use client'

import { useParams } from 'next/navigation'
import { notices as dummyNotices } from '@/components/data/Notice'
import Image from 'next/image'
import { formatDate } from '@/util/formatDate'

export default function NoticeDetail() {
  const { id } = useParams()
  const noticeId = Number(id)

  // 유효한 숫자가 아닌 경우
  if (isNaN(noticeId)) {
    return <div>Notice not found</div>
  }

  // Find the notice based on the ID
  const notice = dummyNotices.find(notice => notice.id === noticeId)

  if (!notice) {
    return <div>Notice not found</div>
  }

  return (
    <div>
      {/* <h1>{notice.title}</h1>
      <p>{notice.date}</p>
      <p>{notice.kindergarten}</p>
      <p>{notice.content}</p>
      <img src={notice.imageSrc} alt={notice.title} /> */}
      <div className="mt-83 w-[700px] h-[638px]">
        <div className="flex h-[24px]">
          <Image
            src={notice.authorImgSrc}
            className="w-24 h-24 rounded-[50%]"
            alt={notice.author}
            width={24}
            height={24}/>
          <div className="w-[700px] h-[24px] text-14 font-inter ml-10">
            {notice.author}
          </div>
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
            height={720}/>
        </div>
        <div className="mt-16">
          {notice.content}
        </div>
      </div>
    </div>
  )
}