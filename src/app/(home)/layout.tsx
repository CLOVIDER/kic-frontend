import { AsyncBoundaryWithQuery } from '@/react-utils'
import HomeFallback from './components/HomeFallback'

export default function layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <AsyncBoundaryWithQuery pendingFallback={<div> Loading...</div>}>
      <HomeFallback>
        <main className="h-full w-full">{children}</main>
      </HomeFallback>
    </AsyncBoundaryWithQuery>
  )
}
