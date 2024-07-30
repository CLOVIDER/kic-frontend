import { Podkova } from 'next/font/google'

const podkova = Podkova({
  subsets: ['latin'],
})

export default function NumberDisplay({
  title,
  number,
}: {
  title: string
  number: number
}) {
  return (
    <div className="flex flex-col">
      <span className="text-15 h-15">{title}</span>
      <span className={`text-56 h-56 font-bold ${podkova.className}`}>
        {number}
      </span>
    </div>
  )
}
