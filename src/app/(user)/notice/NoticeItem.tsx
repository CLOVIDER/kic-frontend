import Image from 'next/image'

interface NoticeItemProps {
  id: number
  kindergarten: string
  title: string
  date: string
  content: string
  imageSrc: string
}

export default function NoticeItem({
  kindergarten,
  title,
  date,
  content,
  imageSrc,
}: NoticeItemProps) {
  return (
    <>
      <div className="flex">
        <div className="w-[535px] h-136">
          <div className="mt-8 w-90 h-20 text-14">{kindergarten}</div>
          <div className="mt-5 w-[535px] h-29 text-20">{title}</div>
          <div className="text-10 text-[#bdbdbd]">{date}</div>
          <div className="mt-10 w-534 h-56 text-10">{content}</div>
        </div>
        <Image
          className="rounded-5 w-150 h-150"
          src={imageSrc}
          alt=""
          width={150}
          height={150}
        />
      </div>
      <div className="mt-11 border-[#D5D1D1] border-1 border-solid w-[695px]" />
    </>
  )
}
