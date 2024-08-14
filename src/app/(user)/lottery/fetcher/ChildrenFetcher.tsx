import { generateContext } from '@/react-utils'
import { GetLotteriesEmployeeResponse } from '@/app/(user)/lottery/api/index'
import { StrictPropsWithChildren } from '@/type'
import { useGetLotteriesEmployee } from '../queries'

export const [ChildrenProvider, useChildrenContext] = generateContext<{
  childrenInfo: GetLotteriesEmployeeResponse
}>({
  name: 'children',
})

export function ChildrenFetcher({ children }: StrictPropsWithChildren) {
  const { data } = useGetLotteriesEmployee()

  return <ChildrenProvider childrenInfo={data}>{children}</ChildrenProvider>
}
