import { AsyncBoundaryWithQuery } from '@/react-utils'
import InfoCard from './InfoCard'
import EmployeeFetcher, {
  ChildFetcher,
  DocumentFetcher,
} from './ApplicationContext/fetcher'
import ChildCards from './ChildCards'
import Document from './Document'
import './application.css'

export default function Application({
  id,
  type,
}: {
  id?: number
  type: 'admin' | 'user'
}) {
  return (
    <div className="bg-[#FFFDF5] border border-[#BDB6B6] w-[800px] rounded-10 p-10 flex flex-col shadow-sm">
      <div className="flex flex-row p-20 gap-100">
        <p className="title">사원 정보</p>
        <AsyncBoundaryWithQuery>
          <EmployeeFetcher id={id}>
            <InfoCard />
          </EmployeeFetcher>
        </AsyncBoundaryWithQuery>
      </div>

      <div className="flex flex-row p-20 gap-100 my-10">
        <p className="title">신청 정보</p>
        <AsyncBoundaryWithQuery>
          <ChildFetcher id={id}>
            <ChildCards />
          </ChildFetcher>
        </AsyncBoundaryWithQuery>
      </div>

      <div className="flex flex-row p-20 gap-100">
        <div className="flex flex-col items-end">
          <p className="title">증빙 서류</p>
          <p className="text-12 text-[#E86565]">
            {id ? '모두 체크하시면 자동 승인 됩니다.' : ''}
          </p>
        </div>

        <AsyncBoundaryWithQuery>
          <DocumentFetcher id={id}>
            <Document applicationID={id} type={type} />
          </DocumentFetcher>
        </AsyncBoundaryWithQuery>
      </div>
    </div>
  )
}
