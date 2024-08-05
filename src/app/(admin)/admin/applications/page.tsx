'use client'

import { DropdownIcon, Input, Search } from '@/components'
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Table,
  TableHeader,
  TableColumn,
  TableCell,
  TableRow,
  TableBody,
  Chip,
  ChipProps,
  Pagination,
} from '@nextui-org/react'
import { useCallback } from 'react'

const statusColorMap: Record<string, ChipProps['color']> = {
  승인: 'success',
  미승인: 'danger',
  승인대기: 'warning',
}

const columns = [
  { name: '신청날짜', uid: 'applyDate' },
  { name: '이름', uid: 'name' },
  { name: '사원번호', uid: 'id' },
  { name: '신청서', uid: 'application' },
  { name: '상태', uid: 'status' },
]

const users = [
  {
    id: 1,
    applyDate: 'Tony Reichert',
    name: 'CEO',
    status: '승인',
    application: '29',
  },
  {
    id: 2,
    applyDate: 'Zoey Lang',
    name: 'Technical Lead',
    status: '미승인',
    application: '25',
  },
  {
    id: 3,
    applyDate: 'Jane Fisher',
    name: 'Senior Developer',
    status: '승인',
    application: '22',
  },
  {
    id: 4,
    applyDate: 'William Howard',
    name: 'Community Manager',
    status: '승인대기',
    application: '28',
  },
  {
    id: 5,
    applyDate: 'Kristen Copper',
    name: 'Sales Manager',
    status: '승인',
    application: '24',
  },
  {
    id: 6,
    applyDate: 'Tony Reichert',
    name: 'CEO',
    status: '승인',
    application: '29',
  },
  {
    id: 7,
    applyDate: 'Zoey Lang',
    name: 'Technical Lead',
    status: '미승인',
    application: '25',
  },
  {
    id: 8,
    applyDate: 'Jane Fisher',
    name: 'Senior Developer',
    status: '승인',
    application: '22',
  },
  {
    id: 9,
    applyDate: 'William Howard',
    name: 'Community Manager',
    status: '승인대기',
    application: '28',
  },
  {
    id: 10,
    applyDate: 'Kristen Copper',
    name: 'Sales Manager',
    status: '승인',
    application: '24',
  },
]

type UserType = (typeof users)[number]

export default function Page() {
  const renderCell = useCallback((user: UserType, columnKey: React.Key) => {
    const cellValue = user[columnKey as keyof UserType]

    switch (columnKey) {
      case 'applyDate':
        return user.applyDate
      case 'name':
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm">{user.name}</p>
          </div>
        )
      case 'status':
        return (
          <Chip
            className="w-67 !max-w-67 h-21 px-8 text-14 font-bold"
            color={statusColorMap[user.status]}
            size="sm"
            variant="flat"
          >
            {cellValue}
          </Chip>
        )
      default:
        return cellValue
    }
  }, [])

  return (
    <section className="w-[738px] flex flex-col gap-12">
      <header className="flex justify-between items-center">
        <div className="flex items-center gap-18">
          <h1 className="text-20 font-bold">신청자 목록</h1>

          <Dropdown>
            <DropdownTrigger
              as="button"
              className="cursor-pointer w-120 h-33 bg-[#FEC46D] uppercase text-[white] flex justify-center items-center rounded-20"
            >
              <div className="flex justify-center items-center gap-10">
                <p>All</p>
                <DropdownIcon />
              </div>
            </DropdownTrigger>

            <DropdownMenu>
              {/* TODO: 동적할당 및 상태 관리 */}
              <DropdownItem className="text-center">햇빛 어린이집</DropdownItem>
              <DropdownItem className="text-center">따뜻 어린이집</DropdownItem>
              <DropdownItem className="text-center">
                컴포즈 어린이집
              </DropdownItem>
              <DropdownItem className="text-center">커피 어린이집</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>

        <Input
          wrapperClassName="w-167 flex items-center px-14 rounded-42 border-[#FFAB2D] border-1"
          className="w-116 h-33 px-5 py-8 border-none rounded-42 placeholder:text-14"
          placeholder="검색하기"
          endContent={<Search />}
        />
      </header>

      <section className="w-full h-[505px] rounded-20 border-1 border-[#BDB6B6]">
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
      </section>

      {/* TODO: 상태 관리 데이터 추가 */}
      <Pagination
        classNames={{
          base: 'flex justify-center',
          wrapper: 'gap-2',
          cursor: 'border-1 w-28 h-28 !rounded-4 bg-[#FF9F00]',
          item: 'w-28 h-28 !rounded-4',
          next: 'w-28 h-28 !rounded-4',
          prev: 'w-28 h-28 !rounded-4',
        }}
        total={10}
        initialPage={1}
        showShadow
        showControls
      />
    </section>
  )
}
