import { PropsWithChildren } from 'react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '지원페이지',
  description: '지원페이지',
}

type LayoutProps = PropsWithChildren<object>

export default function AppLayout({ children }: LayoutProps) {
  return <div className="flex justify-center w-full h-screen">{children} </div>
}
