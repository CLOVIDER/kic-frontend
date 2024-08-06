'use client'

import { DropdownIcon, Input, Search } from '@/components'
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Pagination,
} from '@nextui-org/react'
import { AsyncBoundaryWithQuery } from '@/react-utils'
import { useState } from 'react'
import ApplicationTable from './ApplicationTable'
import { useKindergartensContext } from './fetcher/KindergartensFetcher'
import ApplicationsFetcher from './fetcher/ApplicationsFetcher'

export default function Page() {
  const { kindergartens } = useKindergartensContext()
  const [page, setPage] = useState<number>(0)

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
                <p>ALL</p>
                <DropdownIcon />
              </div>
            </DropdownTrigger>

            <DropdownMenu>
              {kindergartens.map(({ kindergartenId, kindergartenNm }) => (
                <DropdownItem key={kindergartenId} className="text-center">
                  {kindergartenNm}
                </DropdownItem>
              ))}
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
        <AsyncBoundaryWithQuery>
          <ApplicationsFetcher page={page}>
            <ApplicationTable />
          </ApplicationsFetcher>
        </AsyncBoundaryWithQuery>
      </section>

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
        total={10}
        initialPage={1}
        showShadow
        showControls
      />
    </section>
  )
}
