import { AsyncBoundaryWithQuery } from '@/react-utils'
import { StrictPropsWithChildren } from '@/type'
import KindergartensFetcher from './fetcher/KindergartensFetcher'

export default function Layout({ children }: StrictPropsWithChildren) {
  return (
    <section className="w-full h-full flex justify-center items-center">
      <AsyncBoundaryWithQuery>
        <KindergartensFetcher>{children}</KindergartensFetcher>
      </AsyncBoundaryWithQuery>
    </section>
  )
}
