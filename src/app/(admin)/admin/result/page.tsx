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
import { useKindergartensContext } from '@/app/(user)/kindergarten/fetcher/KindergartensFetcher'
import LotteriesFetcher from './fetcher/ResultApplicationsFetcher'
import LotteryTable from './LotteryTable'

export default function Page() {
  const { kindergartens } = useKindergartensContext()
  const [page, setPage] = useState<number>(0)
  const [searchInput, setSearchInput] = useState<string>('')
  const [kindergartenId, setKindergartenId] = useState<number>(0)
  const [classValue, setClassValue] = useState<'INFANT' | 'TODDLER' | 'KID'>(
    'INFANT',
  )
  const deferredSearchInput = useDeferredValue(searchInput)

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

            {/* TODO: 분반 정보 불러오기 */}
            <DropdownMenu>
              {kindergartens.map(({ kindergartenId: kId, kindergartenNm }) => (
                <DropdownItem
                  key={kId}
                  onClick={() => setKindergartenId(kId)}
                  className="text-center"
                >
                  {kindergartenNm}
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
          <LotteriesFetcher
            kindergartenId={0}
            page={page}
            classValue={classValue}
            q={deferredSearchInput}
          >
            <LotteryTable page={page} setPage={setPage} />
          </LotteriesFetcher>
        </AsyncBoundaryWithQuery>
      </section>
    </section>
  )
}
