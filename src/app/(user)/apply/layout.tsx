import { StrictPropsWithChildren } from '@/type'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: '어린이집 추첨 신청하기',
  description: 'KIC - 신청하기 페이지',
}

export default function Layout({ children }: StrictPropsWithChildren) {
  return <main className="w-full h-full">{children}</main>
}
