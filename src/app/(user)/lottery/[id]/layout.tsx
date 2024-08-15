import { AsyncBoundaryWithQuery } from '@/react-utils'
import { StrictPropsWithChildren } from '@/type'
import { ResultFetcher } from '../fetcher/ResultFetcher'

export default function Layout({
  children,
  params: { id },
}: StrictPropsWithChildren<{
  params: { id: string }
}>) {
  return (
    <AsyncBoundaryWithQuery>
      <ResultFetcher id={Number(id)}>{children}</ResultFetcher>
    </AsyncBoundaryWithQuery>
  )
}
