import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'KIC - 관리자',
  description: '관리자 랜딩페이지',
}

export default function layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <main className="h-screen flex justify-center items-center">
      {children}
    </main>
  )
}
