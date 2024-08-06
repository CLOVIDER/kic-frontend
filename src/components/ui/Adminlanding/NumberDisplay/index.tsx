import { useEffect, useState } from 'react'
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
  const [displayNumber, setDisplayNumber] = useState(0)

  useEffect(() => {
    let start = 0
    const end = number
    const duration = 1000 // 애니메이션 지속 시간 (ms)
    const increment = end / (duration / 16) // 한 프레임당 증가량 (16ms 간격으로 업데이트)

    if (start < end) {
      const timer = setInterval(() => {
        start += increment
        if (start >= end) {
          clearInterval(timer)
          setDisplayNumber(end)
        } else {
          setDisplayNumber(Math.ceil(start)) // 소수점 올림
        }
      }, 16) // 16ms 마다 업데이트

      return () => clearInterval(timer)
    }
  }, [number])

  return (
    <div className="flex flex-col">
      <span className="text-18 h-15">{title}</span>
      <span className={`text-60 h-56 font-bold ${podkova.className}`}>
        {displayNumber}
      </span>
    </div>
  )
}
