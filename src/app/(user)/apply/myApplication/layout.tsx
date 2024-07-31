import { StrictPropsWithChildren } from '@/type'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: '어린이집 신청서 조회',
  description: 'KIC - 신청하기 페이지',
}

export default function Layout({ children }: StrictPropsWithChildren) {
  return (
    <main className="w-full h-screen flex justify-center items-center bg-[#FBFBFB]">
      {children}
    </main>
  )
}
