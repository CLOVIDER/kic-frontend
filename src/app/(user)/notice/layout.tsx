import { PropsWithChildren } from 'react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '공지사항',
  description: '공지사항',
}

type LayoutProps = PropsWithChildren<object>

export default function NoticeLayout({ children }: LayoutProps) {
  return (
    <div className="flex justify-center w-full h-full overflow-scroll">
      {children}
    </div>
  )
}
