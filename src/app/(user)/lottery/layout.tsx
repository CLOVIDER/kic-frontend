import { StrictPropsWithChildren } from '@/type'
import { AsyncBoundaryWithQuery } from '@/react-utils'
import { RecruitStatusFetcher } from '@/app/(user)/lottery/fetcher/RecruitStatusFetcher'

export default function Layout({ children }: StrictPropsWithChildren) {
  return (
    <section className="relative w-full h-screen flex justify-center items-center">
      <div className="absolute left-1/4 h-492">
        <div className="absolute top-0 w-226 h-226 rounded-full bg-[#DDA82A] blur-[158.5px]" />

        <div className="flex justify-end">
          <div className="absolute bottom-0 w-226 h-226 rounded-full bg-[#FFAB2D] blur-[158.5px]" />
        </div>
      </div>

      <div className="absolute right-1/4 h-492 rotate-[90deg]">
        <div className="absolute top-0 w-226 h-226 rounded-full bg-[#DDA82A] blur-[158.5px]" />

        <div className="flex justify-end">
          <div className="absolute bottom-0 w-226 h-226 rounded-full bg-[#FFAB2D] blur-[158.5px]" />
        </div>
      </div>
      <AsyncBoundaryWithQuery>
        <RecruitStatusFetcher>{children}</RecruitStatusFetcher>
      </AsyncBoundaryWithQuery>
    </section>
  )
}
