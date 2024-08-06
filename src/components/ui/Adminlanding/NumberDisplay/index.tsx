'use client'

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

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    let start = 0
    const end = number
    const duration = 1000
    const increment = end / (duration / 16)

    if (start < end) {
      const timer = setInterval(() => {
        start += increment
        if (start >= end) {
          clearInterval(timer)
          setDisplayNumber(end)
        } else {
          setDisplayNumber(Math.ceil(start))
        }
      }, 16)

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
