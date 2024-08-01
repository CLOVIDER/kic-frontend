'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'

export function SearchBar() {
  const [searchTerm, setSearchTerm] = useState('')
  const router = useRouter()

  const handleSearch = () => {
    router.push(`/qna?page=1&search=${encodeURIComponent(searchTerm)}`)
  }

  return (
    <div className="flex mt-26 w-[742px] h-[39px]">
      <div className="ml-21 w-[118px] h-[39px] text-32 font-inter font-bold">
        문의사항
      </div>
      <div className="p-3 mt-7 ml-53 w-[63px] h-[37px] rounded-3 border border-[#d5d1d1] text-center text-14">
        제목
      </div>
      <input
        className="p-3 ml-14 mt-7 w-[367px] h-[37px] rounded-3 border border-[#d5d1d1]"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button
        className="ml-14 mt-7 w-[117px] h-[37px] border border-[#ff9900] rounded-3 text-[#ff9900] font-bold text-14"
        onClick={handleSearch}
      >
        검색
      </button>
    </div>
  )
}