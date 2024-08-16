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
import { useKindergartensContext } from '@/app/kindergarten/fetcher/KindergartensFetcher'
import LotteriesFetcher from './fetcher/ResultApplicationsFetcher'
import LotteryTable from './LotteryTable'

export default function Page() {
  const { kindergartens } = useKindergartensContext()
  const [page, setPage] = useState<number>(1)
  const [searchInput, setSearchInput] = useState<string>('')
  const [kindergartenId, setKindergartenId] = useState<number>(
    kindergartens[0].kindergartenId,
  )
  const [classValue, setClassValue] = useState<string>('1')
  const [kindergartenName, setKindergartenName] = useState<string>(
    kindergartens[0].kindergartenNm,
  )
  const [className, setClassName] = useState<string>(
    kindergartens[0].kindergartenClass[0].className,
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
              className="cursor-pointer w-210 h-33 bg-[#FEC46D] uppercase text-[white] flex justify-center items-center rounded-20"
            >
              <div className="flex justify-center items-center px-10">
                {`${kindergartenName} ${className} ${classValue}세`.trim()}
                <p />
                <DropdownIcon />
              </div>
            </DropdownTrigger>

            <DropdownMenu>
              {kindergartens.flatMap((kindergarten) =>
                kindergarten.kindergartenClass.map(
                  ({
                    className: kindergartenClassName,
                    ageClass,
                    ageClassString,
                  }) => (
                    <DropdownItem
                      key={`${kindergartenClassName}`}
                      onClick={() => {
                        setKindergartenName(kindergarten.kindergartenNm)
                        setKindergartenId(kindergarten.kindergartenId)
                        setClassValue(ageClass)
                        setClassName(kindergartenClassName)
                      }}
                      className="text-center text-13"
                    >
                      {`${kindergarten.kindergartenNm}  ${kindergartenClassName} ${ageClassString}`}
                    </DropdownItem>
                  ),
                ),
              )}
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
            kindergartenId={kindergartenId}
            page={page - 1}
            classValue={classValue}
            accountId={deferredSearchInput}
          >
            <LotteryTable page={page} setPage={setPage} />
          </LotteriesFetcher>
        </AsyncBoundaryWithQuery>
      </section>
    </section>
  )
}
