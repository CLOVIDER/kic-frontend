'use client'

import {
  Chip,
  ChipProps,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from '@nextui-org/react'
import { useCallback } from 'react'
import { useHistoryContext } from '../HistoryFetcher'
import { History, HistoryResponse } from '../HistoryFetcher/api'

export default function HistoryTable() {
  const columns = [
    { name: '신청날짜', uid: 'applicationDate' },
    { name: '아이명', uid: 'child' },
    { name: '원명', uid: 'kindergarten' },
    { name: '경쟁률', uid: 'competition' },
    { name: '결과', uid: 'result' },
  ]
  const statusColorMap: Record<string, ChipProps['color']> = {
    WIN: 'primary',
    LOSE: 'danger',
  }

  const renderCell = useCallback((user: History, columnKey: React.Key) => {
    const cellValue = user[columnKey as keyof History]

    switch (columnKey) {
      case 'applicationDate':
        return user.applicationDate
      case 'child':
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm">{user.childName}</p>
          </div>
        )
      case 'result':
        const displaytext = cellValue == 'WIN'? '당첨' :'미당첨'
        return (
          <Chip
            className="w-67 !max-w-67 h-21 px-8 text-14 font-bold"
            color={statusColorMap[user.result]}
            size="sm"
            variant="flat"
          >
            {displaytext} 
          </Chip>
        )
      case 'kindergarten':
        return user.kindergartenName

      default:
        return cellValue
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const {history} = useHistoryContext()

  return (
    <>
      <Table
        classNames={{
          wrapper: 'shadow-sm rounded py-30',
          thead: 'h-full border-b-2 border-[#F1F1F3] h-35',
          th: 'bg-transparent h-full',
        }}
      >
        <TableHeader
          columns={columns}
          className="flex items-center font-semibold"
        >
          {(column) => (
            <TableColumn
              className="text-center font-semibold text-[14px]"
              key={column.uid}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>

        <TableBody items={history}>
          {(item) => (
            <TableRow key={item.lotteryId} className="h-45">
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
