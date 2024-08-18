import { StatusBox } from '@/components'
import { AsyncBoundaryWithQuery } from '@/react-utils'
import { ChildResultFetcher, HistoryFetcher } from './components/HistoryFetcher'
import ChildResultCards from './components/ChildResultCard/ChildResultCards'
import HistoryTable from './components/HistoryTable'

export default function History() {
  return (
    <div className="flex flex-col w-full mx-200 overflow-y-auto">
      <section className="relative flex flex-col items-start">
        <AsyncBoundaryWithQuery>
          <StatusBox className="bg-[#FFE4A3] border border-[#A0A5A9] w-500 h-auto z-20 absolute !rounded-16 shadow-sm pt-0 pb-0" />
        </AsyncBoundaryWithQuery>

        <div className="border border-[#A0A5A9] p-30 rounded-10 mt-80 pt-100 gap-20 bg-white custom-box-shadow z-10 w-[1000px] flex flex-wrap">
          <AsyncBoundaryWithQuery>
            <ChildResultFetcher>
              <ChildResultCards />
            </ChildResultFetcher>
          </AsyncBoundaryWithQuery>
        </div>
      </section>

      <div className="w-full">
        <AsyncBoundaryWithQuery>
          <HistoryFetcher>
            <HistoryTable />
          </HistoryFetcher>
        </AsyncBoundaryWithQuery>
      </div>
    </div>
  )
}
