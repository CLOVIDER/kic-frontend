import { Dispatch, SetStateAction, useCallback, useState } from 'react'
import {
  Table,
  TableHeader,
  TableColumn,
  TableCell,
  TableRow,
  TableBody,
  Chip,
  ChipProps,
  Pagination,
  useDisclosure,
} from '@nextui-org/react'
import ApproveModal from '@/app/(admin)/components/Approve'
import { useApplicationsContext } from '../fetcher/ApplicationsFetcher'
import { GetApplicationsResponse } from '../api'

const statusColorMap: Record<string, ChipProps['color']> = {
  승인: 'success',
  미승인: 'danger',
  승인대기: 'warning',
}

const columns = [
  { name: '신청날짜', uid: 'createdAt' },
  { name: '이름', uid: 'nameKo' },
  { name: '사원번호', uid: 'employeeNo' },
  { name: '상태', uid: 'isAccept' },
]

type Application = GetApplicationsResponse['content'][number]

export default function ApplicationTable({
  page,
  setPage,
}: {
  page: number
  setPage: Dispatch<SetStateAction<number>>
}) {
  const {
    applications: { content, totalPage },
  } = useApplicationsContext()

  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const [selectedApplication, setSelectedApplication] =
    useState<Application | null>(null)

  const handleRowClick = (application: Application) => {
    setSelectedApplication(application)
    onOpen()
  }

  const renderCell = useCallback(
    (application: Application, columnKey: React.Key) => {
      const cellValue = application[columnKey as keyof Application]

      switch (columnKey) {
        case 'createdAt':
          return application.createdAt
        case 'name':
          return (
            <div className="flex flex-col">
              <p className="text-bold text-sm">{application.nameKo}</p>
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
          wrapper: 'shadow-none !rounded-20 h-495',
          thead: 'h-full border-b-2 border-[#F1F1F3] h-35',
          th: 'bg-transparent h-full',
        }}
        aria-label="table"
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
            <TableRow
              // FIXME: href
              onClick={() => handleRowClick(item)}
              key={item.applicationId}
              className="h-45 cursor-pointer"
            >
              {(columnKey) => (
                <TableCell className="text-center">
                  {renderCell(item, columnKey)}
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>

      <div className="mt-30" />

      {selectedApplication && (
        <ApproveModal
          application={selectedApplication}
          isOpen={isOpen}
          onOpenChange={onOpenChange}
        />
      )}

      <Pagination
        page={page}
        onChange={setPage}
        classNames={{
          base: 'flex justify-center',
          wrapper: 'gap-2',
          cursor: 'border-1 w-28 h-28 !rounded-4 bg-[#FF9F00]',
          item: 'w-28 h-28 !rounded-4',
          next: 'w-28 h-28 !rounded-4',
          prev: 'w-28 h-28 !rounded-4',
        }}
        total={totalPage}
        initialPage={1}
        showShadow
        showControls
      />
    </>
  )
}
