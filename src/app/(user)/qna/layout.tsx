import { PropsWithChildren } from 'react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '문의사항',
  description: '문의사항',
}

type LayoutProps = PropsWithChildren<object>

export default function NoticeLayout({ children }: LayoutProps) {
  return <main className="flex justify-center w-full h-full">{children}</main>
}
