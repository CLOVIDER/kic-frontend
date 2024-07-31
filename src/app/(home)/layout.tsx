import { AsyncBoundaryWithQuery } from '@/react-utils'
import HomeFallback from './components/HomeFallback'
import { HomeFetcher } from './components/HomeFetcher'

export default function layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <AsyncBoundaryWithQuery pendingFallback={<div> Loading...</div>}>
      <HomeFallback>
        <HomeFetcher>
          <main className="h-full w-full">{children}</main>
        </HomeFetcher>
      </HomeFallback>
    </AsyncBoundaryWithQuery>
  )
}
