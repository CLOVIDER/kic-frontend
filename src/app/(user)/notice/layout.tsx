import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: '공지사항',
  description: '공지사항',
}

export default function NoticeLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="flex justify-center w-full h-full">
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, maximum-scale=5, minimum-scale=1, user-scalable=yes"
      />
      {children}
    </div>
  )
}
