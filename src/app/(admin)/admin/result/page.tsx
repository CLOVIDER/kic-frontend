'use client'

import { DropdownIcon, If, Input, Search } from '@/components'
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from '@nextui-org/react'
import { AsyncBoundaryWithQuery } from '@/react-utils'
import { useDeferredValue, useState } from 'react'
import LotteriesFetcher from './fetcher/ResultApplicationsFetcher'
import LotteryTable from './LotteryTable'
import { useKindergartenWthRecruitIdContext } from './fetcher/KindergartenWithRecruitIdFetcher'

export default function Page() {
  const { kindergartens } = useKindergartenWthRecruitIdContext()
  const [page, setPage] = useState<number>(1)
  const [searchInput, setSearchInput] = useState<string>('')
  const [kindergartenId, setKindergartenId] = useState<string>(
    kindergartens[0]?.kindergartenIds[0] || '',
  )
  const [classValue, setClassValue] = useState<string>(
    kindergartens[0]?.ageClasses[0] || 0,
  )
  const [recruitId, setRecruitId] = useState<number>(
    kindergartens[0]?.recruitIds[0] || 0,
  )
  const [kindergartenName, setKindergartenName] = useState<string>(
    kindergartens[0]?.kindergartenNm || '선택',
  )
  const deferredSearchInput = useDeferredValue(searchInput)

  return (
    <section className="w-[738px] flex flex-col gap-12">
      <header className="flex justify-between items-center">
        <div className="flex items-center gap-18">
          <h1 className="text-20 font-bold">추첨 목록</h1>

          <Dropdown isDisabled={kindergartens.length < 1}>
            <DropdownTrigger
              as="button"
              className="cursor-pointer w-210 h-33 bg-[#FEC46D] uppercase text-[white] flex justify-center items-center rounded-20"
            >
              <div className="flex justify-center items-center px-10">
                {`${kindergartenName} ${classValue}`.trim()}
                <p />
                <DropdownIcon />
              </div>
            </DropdownTrigger>

            <DropdownMenu>
              {kindergartens.flatMap(
                ({ kindergartenNm, recruitIds, ageClasses, kindergartenIds }) =>
                  recruitIds.map((rId, index) => (
                    <DropdownItem
                      key={`${kindergartenNm} ${rId} ${ageClasses[index]}`}
                      onClick={() => {
                        setKindergartenName(kindergartenNm)
                        setKindergartenId(kindergartenIds[index])
                        setClassValue(ageClasses[index])
                        setRecruitId(recruitIds[index])
                      }}
                      className="text-center text-13"
                    >
                      {`${kindergartenNm}  ${ageClasses[index]}`}
                    </DropdownItem>
                  )),
              )}
            </DropdownMenu>
          </Dropdown>
        </div>

        <Input
          disabled={kindergartens.length < 1}
          value={searchInput}
          onValueChange={setSearchInput}
          wrapperClassName="w-167 flex items-center px-14 rounded-42 border-[#FFAB2D] border-1"
          className="w-116 h-33 px-5 py-8 border-none rounded-42 placeholder:text-14"
          placeholder="검색하기"
          endContent={<Search />}
        />
      </header>

      <section className="w-full h-[505px] rounded-20 border-1 border-[#BDB6B6]">
        <If condition={kindergartens.length < 1}>
          <div className="font-semibold flex justify-center items-center h-full text-24">
            신청자 목록이 없어요..🤣
          </div>
        </If>

        <If condition={kindergartens.length >= 1}>
          <AsyncBoundaryWithQuery>
            <LotteriesFetcher
              kindergartenId={kindergartenId}
              page={page - 1}
              classValue={classValue}
              nameKo={deferredSearchInput}
            >
              <LotteryTable
                page={page - 1}
                setPage={setPage}
                recruitId={recruitId}
              />
            </LotteriesFetcher>
          </AsyncBoundaryWithQuery>
        </If>
      </section>
    </section>
  )
}
