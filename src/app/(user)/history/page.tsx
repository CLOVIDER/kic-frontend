'use client'

import { StatusBox } from '@/components'
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
import { AsyncBoundaryWithQuery } from '@/react-utils'
import ChildResultCard from './components/ChildResultCard'

export default function History() {
  const columns = [
    { name: '신청날짜', uid: 'applyDate' },
    { name: '아이명', uid: 'child' },
    { name: '원명', uid: 'kindergarten' },
    { name: '경쟁률', uid: 'rate' },
    { name: '결과', uid: 'result' },
  ]
  const statusColorMap: Record<string, ChipProps['color']> = {
    당첨: 'success',
    미당첨: 'danger',
  }
  const users = [
    {
      id: 1,
      applyDate: '2024.12.12',
      kindergarten: '햇빛어린이집 3세반',
      child: 'CEO',
      result: '당첨',
      rate: '2.9',
    },
    {
      id: 2,
      applyDate: '2012.1.2',
      kindergarten: '새빛어린이집 4세반',
      child: 'Technical Lead',
      result: '미당첨',
      rate: '2.5',
    },
  ]

  const kids = [
    {
      id: 1,
      classes: ['햇빛어린이집 3세반', '햇빛어린이집 3세반'],
      name: '공에엉',
      results: ['당첨', '대기 3번'],
    },
    {
      id: 2,
      classes: ['햇빛어린이집 3세반', '햇빛어린이집 3세반'],
      name: '이주에',
      results: ['대기 8번', '등록'],
    },
  ]

  type UserType = (typeof users)[number]

  const renderCell = useCallback((user: UserType, columnKey: React.Key) => {
    const cellValue = user[columnKey as keyof UserType]

    switch (columnKey) {
      case 'applyDate':
        return user.applyDate
      case 'child':
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm">{user.child}</p>
          </div>
        )
      case 'result':
        return (
          <Chip
            className="w-67 !max-w-67 h-21 px-8 text-14 font-bold"
            color={statusColorMap[user.result]}
            size="sm"
            variant="flat"
          >
            {cellValue}
          </Chip>
        )
      case 'kindergarten':
        return user.kindergarten

      default:
        return cellValue
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="flex flex-col w-full mx-200">
      <section className="relative flex flex-col items-start">
        <AsyncBoundaryWithQuery>
          <StatusBox className="bg-[#FFE4A3]  h-145 border border-[#A0A5A9] w-500 z-20 absolute !rounded-16 shadow-sm" />
        </AsyncBoundaryWithQuery>
        <div className="border border-[#A0A5A9] p-30 rounded-10 mt-80 pt-100 gap-20 bg-white custom-box-shadow z-10 w-[1000px] flex flex-wrap">
          {kids.map(({ name, results, classes }) => (
            <ChildResultCard
              key={name}
              name={name}
              results={results}
              classes={classes}
            />
          ))}
        </div>
      </section>

      <div className="w-full">
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

          <TableBody items={users}>
            {(item) => (
              <TableRow key={item.id} className="h-45">
                {(columnKey) => (
                  <TableCell className="text-center">
                    {renderCell(item, columnKey)}
                  </TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
