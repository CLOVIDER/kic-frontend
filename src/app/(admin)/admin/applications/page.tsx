'use client'

import { DropdownIcon, Input, Search } from '@/components'
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from '@nextui-org/react'
import { AsyncBoundaryWithQuery } from '@/react-utils'
import { useDeferredValue, useState } from 'react'
import ApplicationTable from './ApplicationTable'
import ApplicationsFetcher from './fetcher/ApplicationsFetcher'

const filterStatus = ['ALL', 'ACCEPT', 'UNACCEPT', 'WAIT'] as const
const filterMAP = {
  ALL: 'ALL',
  ACCEPT: '승인',
  UNACCEPT: '미승인',
  WAIT: '승인대기',
} as const

export default function Page() {
  const [page, setPage] = useState<number>(1)
  const [filter, setFilter] = useState<(typeof filterStatus)[number]>('ALL')
  const [searchInput, setSearchInput] = useState<string>('')
  const deferredSearchInput = useDeferredValue(searchInput)

  return (
    <section className="w-[738px] flex flex-col gap-12">
      <header className="flex justify-between items-center">
        <div className="flex items-center gap-18">
          <h1 className="text-20 font-bold">종료된 신청자 목록</h1>

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
              {filterStatus.map((status) => (
                <DropdownItem
                  onClick={() => setFilter(status)}
                  key={status}
                  className="text-center"
                >
                  {filterMAP[status]}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
        </div>

        <Input
          value={searchInput}
          onValueChange={setSearchInput}
          wrapperClassName="w-167 flex items-center px-14 rounded-42 border-[#FFAB2D] border-1"
          className="w-116 h-33 px-5 py-8 border-none rounded-42 placeholder:text-14"
          placeholder="검색하기"
          endContent={<Search />}
        />
      </header>

      <section className="w-full h-[505px] rounded-20 border-1 border-[#BDB6B6]">
        <AsyncBoundaryWithQuery>
          <ApplicationsFetcher
            page={page - 1}
            filter={filter}
            q={deferredSearchInput}
          >
            <ApplicationTable page={page} setPage={setPage} />
          </ApplicationsFetcher>
        </AsyncBoundaryWithQuery>
      </section>
    </section>
  )
}
