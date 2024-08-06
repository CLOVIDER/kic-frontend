import {
  Table,
  TableHeader,
  TableColumn,
  TableCell,
  TableRow,
  TableBody,
  Chip,
  ChipProps,
} from '@nextui-org/react'
import { useCallback } from 'react'
import { useApplicationsContext } from '../fetcher/ApplicationsFetcher'
import { GetApplicationsResponse } from '../api'

const statusColorMap: Record<string, ChipProps['color']> = {
  승인: 'success',
  미승인: 'danger',
  승인대기: 'warning',
}

const columns = [
  { name: '신청날짜', uid: 'createdAt' },
  { name: '이름', uid: 'accountId' },
  { name: '사원번호', uid: 'employeeNo' },
  { name: '신청서', uid: 'application' },
  { name: '상태', uid: 'isAccept' },
]

// const users = [
//   {
//     id: 1,
//     createdAt: 'Tony Reichert',
//     accountId: 'CEO',
//     isAccept: '승인',
//     application: '29',
//   },
//   {
//     id: 2,
//     createdAt: 'Zoey Lang',
//     accountId: 'Technical Lead',
//     isAccept: '미승인',
//     application: '25',
//   },
//   {
//     id: 3,
//     createdAt: 'Jane Fisher',
//     accountId: 'Senior Developer',
//     isAccept: '승인',
//     application: '22',
//   },
//   {
//     id: 4,
//     createdAt: 'William Howard',
//     accountId: 'Community Manager',
//     isAccept: '승인대기',
//     application: '28',
//   },
//   {
//     id: 5,
//     createdAt: 'Kristen Copper',
//     accountId: 'Sales Manager',
//     isAccept: '승인',
//     application: '24',
//   },
//   {
//     id: 6,
//     createdAt: 'Tony Reichert',
//     accountId: 'CEO',
//     isAccept: '승인',
//     application: '29',
//   },
//   {
//     id: 7,
//     createdAt: 'Zoey Lang',
//     accountId: 'Technical Lead',
//     isAccept: '미승인',
//     application: '25',
//   },
//   {
//     id: 8,
//     createdAt: 'Jane Fisher',
//     accountId: 'Senior Developer',
//     isAccept: '승인',
//     application: '22',
//   },
//   {
//     id: 9,
//     createdAt: 'William Howard',
//     accountId: 'Community Manager',
//     isAccept: '승인대기',
//     application: '28',
//   },
//   {
//     id: 10,
//     createdAt: 'Kristen Copper',
//     accountId: 'Sales Manager',
//     isAccept: '승인',
//     application: '24',
//   },
// ]

type Application = GetApplicationsResponse['content'][number]

export default function ApplicationTable() {
  const {
    applications: { content },
  } = useApplicationsContext()

  const renderCell = useCallback(
    (application: Application, columnKey: React.Key) => {
      const cellValue = application[columnKey as keyof Application]

      switch (columnKey) {
        case 'createdAt':
          return application.createdAt
        case 'name':
          return (
            <div className="flex flex-col">
              <p className="text-bold text-sm">{application.accountId}</p>
            </div>
          )
        case 'isAccept':
          return (
            <Chip
              className="w-67 !max-w-67 h-21 px-8 text-14 font-bold"
              color={statusColorMap[application.isAccept]}
              size="sm"
              variant="flat"
            >
              {cellValue}
            </Chip>
          )
        default:
          return cellValue
      }
    },
    [],
  )

  return (
    <>
      <Table
        classNames={{
          base: 'rounded-20',
          wrapper: 'shadow-none !rounded-20',
          thead: 'h-full border-b-2 border-[#F1F1F3] h-35',
          th: 'bg-transparent h-full',
        }}
      >
        <TableHeader columns={columns} className="flex items-center">
          {(column) => (
            <TableColumn className="text-center" key={column.uid}>
              {column.name}
            </TableColumn>
          )}
        </TableHeader>

        <TableBody items={content}>
          {(item) => (
            <TableRow key={item.applicationId} className="h-45">
              {(columnKey) => (
                <TableCell className="text-center">
                  {renderCell(item, columnKey)}
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  )
}
