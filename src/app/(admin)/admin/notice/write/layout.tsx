import { PropsWithChildren } from 'react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'notice - write (admin)',
  description: 'notice write page for administrator',
}

type LayoutProps = PropsWithChildren<unknown>

export default function Layout({ children }: LayoutProps) {
  return (
    <main className="h-full flex justify-center items-center bg-white">
      {children}
    </main>
  )
}
