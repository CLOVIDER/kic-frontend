interface HeaderProps {
  title: string
}

export default function QnaHeader({ title }: HeaderProps) {
  return (
    <div className="ml-21 mt-22 w-[118px] h-[39px] text-32 font-inter font-bold">
      {title}
    </div>
  )
}
