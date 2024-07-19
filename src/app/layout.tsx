import type { Metadata } from 'next'
import localFont from 'next/font/local'
import { NextUIProvider } from '@nextui-org/react'
import '../styles/globals.css'
import Header from '@/components/Header'

const Pretendard = localFont({
  src: './fonts/PretendardVariable.woff2',
  display: 'swap',
  weight: '45 920',
})

export const metadata: Metadata = {
  title: 'Kids In Company - 사내 어린이집 추첨 서비스',
  description: 'gcu-kea-team4 사내어린이집 추첨 서비스',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko">
      <body className={Pretendard.className}>
        <NextUIProvider>
          <Header />
          {children}
        </NextUIProvider>
      </body>
    </html>
  )
}
