import type { Metadata } from 'next'
import localFont from 'next/font/local'
import { cn, NextUIProvider } from '@nextui-org/react'
import { Header } from '@/components/common'
import '../styles/globals.css'
import '../styles/button.css'
import { Suspense } from 'react'
import { GlobalErrorBoundary } from '@/react-utils/ErrorBoundary'
import QueryProvider from './lib/QueryProvider'

const Pretendard = localFont({
  src: './fonts/PretendardVariable.woff2',
  display: 'swap',
  weight: '45 920',
})

export const metadata: Metadata = {
  title: 'Kids In Company - 사내 어린이집 추첨 서비스',
  description: 'gcu-kea-team4 사내 어린이집 추첨 서비스',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko">
      <body className={cn('overflow-hidden', Pretendard.className)}>
        <GlobalErrorBoundary renderFallback={<>로딩이 발생했어요 !</>}>
          {/* /* TODO: fallback 컴포넌트 구현 */}
          <Suspense fallback={<>loading..</>}>
            <QueryProvider>
              <NextUIProvider className="h-[calc(100%-54px)]">
                <Header />
                {children}
              </NextUIProvider>
            </QueryProvider>
          </Suspense>
        </GlobalErrorBoundary>
      </body>
    </html>
  )
}
